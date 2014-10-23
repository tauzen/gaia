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

  // exporting APDUs
  window.APDU = {
    getResponse: new window.SECommand(0x00, 0xC0, 0x00, 0x00, new Uint8Array()),
    readBinary: new window.SECommand(0x00, 0xB0, 0x00, 0x00, new Uint8Array()),
    selectODF: new window.SECommand(0x00, 0xA4, 0x00, 0x04, new Uint8Array([0x50, 0x31]))
  };

  window.AID = {
    pkcs15: 'a000000063504b43532d3135'
  };
  
  function log(msg) {
    console.log(msg);
    var li = document.createElement('li');
    li.textContent = new Date() + ' ' + msg;
    document.getElementById('log').appendChild(li);
  }

  function logResponse(response) {
    log('Got response from SIM: (SW1:'+ response.sw1 +
        ', SW2:' + response.sw2 + ', data:' + window.byte2hexString(response.data) +')');
  }

  function checkResponse(response, expectedSw1, expectedSw2, expectedData) {
    var sw1Check = response.sw1 === expectedSw1;
    var sw2Check = response.sw2 === expectedSw2;
    var dataCheck = window.byte2hexString(response.data) === expectedData;
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
  window.navigator.seManager.getSEReaders()
  .then((readers) => {
    log('Get SEReaders, using reader 0 to open session.');
    return readers[0].openSession();
  })
  .then((session) => {
    log('Session opened, exporting as |window.testSESession| for manual testing via WebIDE console.');
    window.testSESession = session;
    
    log('Opening channel to pkcs15, AID: ' + window.AID.pkcs15);
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
    checkResponse(response, 0x61, 0x24, '');

    log('Reading select ODF response');
    return response.channel.transmit(window.APDU.getResponse);
  })
  .then((response) => {
    logResponse(response);
    checkResponse(response, 0x90, 0x00, selectODFResp);

    log('Closing channel');
    return response.channel.close();
  })
  .then(() => log('Channel closed. Test finished.'))
  .catch(() => log('Promise chain broken, test failed'));
});
