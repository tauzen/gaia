/* globals Utils, APDU, AID  */

window.addEventListener('DOMContentLoaded', function() {
  'use strict';
  
  function log(msg) {
    console.log(msg);
    var li = document.createElement('li');
    li.textContent = msg;
    document.getElementById('log').appendChild(li);
  }

  function logResponse(response) {
    log('Got response from SIM: (SW1:'+ response.sw1 +
        ', SW2:' + response.sw2 + ', data:' +
        Utils.byte2hexString(response.data) +')');
  }

  function updateTestStatus(id, status, message) {
    var div = document.getElementById(id);
    div.className = status;
    div.querySelector('.msg').textContent = message;
  }

  function checkResponse(response, expectedSw1, expectedSw2, expectedData) {
    var sw1Check = response.sw1 === expectedSw1;
    var sw2Check = response.sw2 === expectedSw2;
    var dataCheck = (expectedData) ?
      Utils.byte2hexString(response.data) === expectedData : true;
    if (sw1Check && sw2Check && dataCheck) {
      log('Response valid!');
      return true;
    } else {
      log('Test failed, SW1: ' + sw1Check + ', SW2: ' + sw2Check +
          ', data: ' + dataCheck);
      return false;
    }
  }

  log('Testing SIM access using  applet');
  updateTestStatus('test-init', 'pending', 'in progress');
  window.navigator.seManager.getSEReaders()
  .then((readers) => {
    log('Get SEReaders, using reader 0 to open session.');
    return readers[0].openSession();
  })
  .then((session) => {
    log('Session opened, saving as window.testSESession for testing.');
    updateTestStatus('test-init', 'success', 'Got SESession, END. OK.');
    window.testSESession = session;
    
    updateTestStatus('test-channel-resp', 'pending', 'in progress');
    log('Opening channel to ppse, AID' + AID.ppse);
    return session.openLogicalChannel(Utils.hexString2byte(AID.ppse));
  })
  .then((channel) => {
    log('Channel to PPSE opened, checking SELECT response (openResponse)');
    if(channel.openResponse) {
      log('Select response is: ' +
          Utils.byte2hexString(channel.selectResponse));
      updateTestStatus('test-channel-resp', 'success',
                       'Got SELECT response, END. OK.');
    } else {
      log('Select response not available');
      updateTestStatus('test-channel-resp', 'error',
                       'No SELECT response, END, FAILED.');
    }
    log('Closing channel to PPSE');
    return channel.close();
  })
  .then(() => {
    log('Closed channel to PPSE');
    updateTestStatus('test-pkcs', 'pending', 'in progress');
    log('Opening channel to pkcs15, AID: ' + AID.pkcs15);
    return window.testSESession
                 .openLogicalChannel(Utils.hexString2byte(AID.pkcs15));
  })
  .then((channel) => {
    log('Channel opened, selecting ODF');
    return channel.transmit(APDU.selectODF);
  })
  .then((response) => {
    logResponse(response);
    // the selectResponse data of EF_ODF is variable depending on the used SIM
    // types (Gemalto, G&D, etc.), therefore, not to compare response data.
    if (checkResponse(response, 0x90, 0x00, '')) {
      updateTestStatus('test-pkcs', 'success', 'Valid ODF response, END. OK.');
    } else {
      updateTestStatus('test-pkcs', 'error',
                       'Not valid ODF response, END. FAILED.');
    }

    log('Closing channel to pkcs15');
    return response.channel.close();
  })
  .then(() => {
    log('Channel closed. Starting CRS test.');
    updateTestStatus('test-crs', 'pending', 'in progress');

    return window.testSESession
                 .openLogicalChannel(Utils.hexString2byte(AID.crs));
  })
  .then((channel) => {
    log('Channel to CRS opened. Transmiting GET DATA command.');

    return channel.transmit(APDU.CRS.getData);
  })
  .then((resp) => {
    logResponse(resp);
    if (checkResponse(resp, 0x90, 0x00)) {
      updateTestStatus('test-crs', 'success', 'Got 9000 from CRS, END. OK.');
    } else {
      updateTestStatus('test-crs', 'error',
                       'Did not get 9000 from CRS, END. FAILED');
    }
    return resp.channel.close();
  })
  .then(() => {
    log('Starting two channel test');
    updateTestStatus('test-double-channel', 'pending', 'Starting test');
    log('Opening channel to CRS');
    return window.testSESession
                 .openLogicalChannel(Utils.hexString2byte(AID.crs));
  })
  .then((channel) => {
    if(!channel) {
      log('Channel to CRS not opened');
      updateTestStatus('test-double-channel', 'error',
                       'Channel to CRS not opened, test failed.');
      return Promise.reject();
    }
    // not elegant, for test purpose only
    window.crsChannel = channel;
    updateTestStatus('test-double-channel', 'pending', 'CRS channel opnened');
    log('CRS channel opened, opening channel to PKCS15');
    return window.testSESession
                 .openLogicalChannel(Utils.hexString2byte(AID.PKCS15));
  })
  .then((channel) => {
    if(!channel) {
      log('Channel to PKCS15 not opened');
      updateTestStatus('test-double-channel', 'error',
                       'Channel to PKCS15 not opened, test failed.');
      return Promise.reject();
    }

    window.pkcsChannel = channel;
    log('PKCS15 channel opened');
    updateTestStatus('test-double-channel', 'pending',
                     'PKCS channel opnened, two channels open now, closing');
    log('Calling SESession.closeAll()');
    return window.testSESession.closeAll();
  })
  .then(() => {
    log('closing finished, checking if everything is closed');
    if(window.testSESession.isClosed && window.crsChannel.isClosed &&
       window.pkcsChannel.isClosed) {
      updateTestStatus('test-double-channel', 'success',
                       'Closed everything, success.');
    } else {
      updateTestStatus('test-double-channel', 'error',
                       'Objects not closed, failed.');
      return Promise.reject();
    }
  })
  .then(() => log('Channel closed, tests finished.'))
  .catch(() => {
    log('Promise chain broken, test failed');
    window.testSESession.closeAll();
  });
});
