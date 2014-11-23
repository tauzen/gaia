window.addEventListener('DOMContentLoaded', function() {
  'use strict';

  // exporting functions for easier manual testing
  window.byte2hexString = function byte2hexString(uint8arr) {
    if (!uint8arr) {
      return '';
    }

    var hexStr = '';
    for (var i = 0; i < uint8arr.length; i++) {
      var hex = (uint8arr[i] & 0xff).toString(16);
      hex = (hex.length === 1) ? '0' + hex : hex;
      hexStr += hex;
    }
    return hexStr.toUpperCase();
  };

  window.hexString2byte = function hexString2byte(str) {
    var a = [];
    for(var i = 0, len = str.length; i < len; i+=2) {
      a.push(parseInt(str.substr(i,2),16));
    }
    return new Uint8Array(a);
  };

  window.joinUint8Arrays = function joinUint8Arrays() {
    var args = Array.prototype.slice.call(arguments);
    var length = args.reduce(function(a, b) { return a + b.length; }, 0);
    var out = new Uint8Array(length);

    args.reduce(function(previousLen, buffer) {
      out.set(buffer, previousLen);
      return previousLen + buffer.length;
    }, 0);

    return out;
  };

  // exporting APDUs
  window.APDU = {
    // gets the response from SIM, can be used to retireve channel select
    getResponse: new window.SECommand(0x00, 0xC0, 0x00, 0x00, new Uint8Array()),
    readBinary: new window.SECommand(0x00, 0xB0, 0x00, 0x00, new Uint8Array()),
    selectODF: new window.SECommand(0x00, 0xA4, 0x00, 0x04, new Uint8Array([0x50, 0x31])),
    CRS: {
      // Get applet version number and global update counter
      getData: new window.SECommand(0x80, 0xCA, 0x00, 0xA5, new Uint8Array()),
      // Get status of applets and Security Domains only.
      // The ISD is ignored. Get first or only occurrence
      getStatusAll1st: new window.SECommand(0x80, 0xF2, 0x40, 0x00,
        new Uint8Array([
          0x4F, 0x00, // applet AID, empty here
          0x5C, 0x03, // tag list to be returned
          0x4F, // AID
          0x9F, 0x70  // applet life cycle state - first byte;
                      // contactless activation state - second byte
        ])),
      // Get status of applets and Security Domains only.
      // The ISD is ignored. Get next occurrence(s), if SW is 63h10h
      getStatusAllNext: new window.SECommand(0x80, 0xF2, 0x40, 0x01,
        new Uint8Array([0x4F, 0x00, 0x5C, 0x03, 0x4F, 0x9F, 0x70])),
      // Get status of applet identified with AID
      getStatusAID: (aid) => {
        return new window.SECommand(0x81, 0xF2, 0x40, 0x00,
          window.joinUint8Arrays(
            [0x4F, 0x0F], // applet AID
            window.hexString2byte(aid),
            [0x5C, 0x04,  // tag list
             0x4F, // AID
             0x9F, // applet lifecycle state
             0x70, // contactless activation state
             0x81 // selection priority
            ]
          )
        );
      },
      fastPayOff: (aid) => {
        return new window.SECommand(0x80, 0xF0, 0x01, 0x00,
          window.joinUint8Arrays([0x4F, 0x0F], window.hexString2byte(aid)));
      },
      fastPayOn: (aid) => {
        return new window.SECommand(0x80, 0xF0, 0x01, 0x01,
          window.joinUint8Arrays([0x4F, 0x0F], window.hexString2byte(aid)));
      },
      nfcActivate: new window.SECommand(0x80, 0xF0, 0x04, 0x80,
                                        new Uint8Array([0x80, 0x01, 0x40])),
      nfcDeactivate: new window.SECommand(0x80, 0xF0, 0x04, 0x00,
                                          new Uint8Array([0x80, 0x01, 0x40]))
    }
  };

  window.AID = {
    pkcs15: 'a000000063504b43532d3135',
    crs: 'A00000015143525300',
  };
  
  function log(msg) {
    console.log(msg);
    var li = document.createElement('li');
    li.textContent = msg;
    document.getElementById('log').appendChild(li);
  }

  function logResponse(response) {
    log('Got response from SIM: (SW1:'+ response.sw1 +
        ', SW2:' + response.sw2 + ', data:' + window.byte2hexString(response.data) +')');
  }

  function updateTestStatus(id, status, message) {
    var div = document.getElementById(id);
    div.className = status;
    div.querySelector('.msg').textContent = message;
  }

  function checkResponse(response, expectedSw1, expectedSw2, expectedData) {
    var sw1Check = response.sw1 === expectedSw1;
    var sw2Check = response.sw2 === expectedSw2;
    var dataCheck = (expectedData) ? window.byte2hexString(response.data) === expectedData : true;
    if (sw1Check && sw2Check && dataCheck) {
      log('Response valid!');
      return true;
    } else {
      log('Test failed, SW1: ' + sw1Check + ', SW2: ' + sw2Check + ', data: ' + dataCheck);
      return false;
    }
  }

  var selectODFResp = '62228202412183025031A503C001408A01058B066F060101000180020010810200228800';

  log('Testing SIM access using  applet');
  updateTestStatus('test-init', 'pending', 'in progress');
  window.navigator.seManager.getSEReaders()
  .then((readers) => {
    log('Get SEReaders, using reader 0 to open session.');
    return readers[0].openSession();
  })
  .then((session) => {
    log('Session opened, exporting as |window.testSESession| for manual testing via WebIDE console.');
    updateTestStatus('test-init', 'success', 'Got SESession, END. OK.');
    window.testSESession = session;
    
    log('Opening channel to pkcs15, AID: ' + window.AID.pkcs15);
    updateTestStatus('test-pkcs', 'pending', 'in progress');
    return session.openLogicalChannel(window.hexString2byte(window.AID.pkcs15));
  })
  .then((channel) => {
    log('Channel opened, getting SELECT response');
    return channel.transmit(window.APDU.getResponse);
  })
  .then((response) => {
    logResponse(response);
    
    log('Selecting ODF');
    return response.channel.transmit(window.APDU.selectODF);
  })
  .then((response) => {
    logResponse(response);
    //the length of  select EF_ODF response is variable, therefore, only to compare the sw1.
    checkResponse(response, 0x61, response.sw2, '');

    log('Reading select ODF response');
    return response.channel.transmit(window.APDU.getResponse);
  })
  .then((response) => {
    logResponse(response);
    //the selectResponse data of EF_ODF is variable depending on the used SIM types(Gemalto, G&D, etc.), therefore, not to compare response data.
    if (checkResponse(response, 0x90, 0x00, '')) {
      updateTestStatus('test-pkcs', 'success', 'Valid ODF response, END. OK.');
    } else {
      updateTestStatus('test-pkcs', 'error', 'Not valid ODF response, END. FAILED.');
    }

    log('Closing channel to pkcs15');
    return response.channel.close();
  })
  .then(() => {
    log('Channel closed. Starting CRS test.');
    updateTestStatus('test-crs', 'pending', 'in progress');

    return window.testSESession.openLogicalChannel(window.hexString2byte(window.AID.crs));
  })
  .then((channel) => {
    log('Channel to CRS opened. Transmiting GET DATA command.');

    return channel.transmit(window.APDU.CRS.getData);
  })
  .then((resp) => {
    logResponse(resp);
    if (checkResponse(resp, 0x90, 0x00)) {
      updateTestStatus('test-crs', 'success', 'Got 9000 from CRS, END. OK.');
    } else {
      updateTestStatus('test-crs', 'error', 'Did not get 9000 from CRS, END. FAILED');
    }
    return resp.channel.close();
  })
  .then(() => log('Channel closed, tests finished.'))
  .catch(() => {
    log('Promise chain broken, test failed');
    window.testSESession.closeAll();
  });
});
