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
  
  function log(msg) {
    console.log(msg);
    var li = document.createElement('li');
    li.textContent = new Date() + ' ' + msg;
    document.getElementById('log').appendChild(li);
  }

  var ppasAIDStr = '325041592E5359532E4444463031';
  var ppseAIDByte = window.hexString2byte(ppasAIDStr);
  var getTemplateAPDU = new window.SECommand(0x80, 0xD4, 0x01, 0x00, new Uint8Array());
  var expectedResponse = '6F23840E325041592E5359532E4444463031A511BF0C0E610C4F07A0000000041010870101';

  log('Testing SIM access using PPSE applet');
  window.navigator.seManager.getSEReaders()
  .then((readers) => {
    log('Get SEReaders, using reader 0 to open session.');
    return readers[0].openSession();
  })
  .then((session) => {
    log('Session opened, exporting as |window.testSESession| for manual testing via WebIDE console.');
    window.testSESession = session;
    
    log('Opening channel to PPSE, AID: ' + ppasAIDStr);
    return session.openLogicalChannel(ppseAIDByte);
  })
  .then((channel) => {
    log('Channel opened, sending APDU: (CLA:' + getTemplateAPDU.cla + ', INS:' + getTemplateAPDU.ins + 
        ' P1:' + getTemplateAPDU.p1 + ', P2:' + getTemplateAPDU.p2 + ', data:' + getTemplateAPDU.data + ')');
    return channel.transmit(getTemplateAPDU);
  })
  .then((response) => {
    log('Got response from SIM: (SW1:'+ response.sw1 + 
        ', SW2:' + response.sw2 + ', data:' + byte2hexString(response.data) +')');
    
    var sw1Check = response.sw1 === 0x90;
    var sw2Check = response.sw2 === 0x00; 
    var dataCheck = byte2hexString(response.data) === expectedResponse;
    if (sw1Check && sw2Check && dataCheck) {
      log('Response valid!');
    } else {
      log('Test failed, SW1: ' + sw1Check + ', SW2: ' + sw2Check + ', data: ' + dataCheck);
    }

    log('Closing logical channel');
    return response.channel.close();
  })
  .then(() => log('Channel closed. Test finished.'))
  .catch(() => log('Promise chain broken, test failed'));
});
