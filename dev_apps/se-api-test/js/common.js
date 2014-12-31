'use strict';

window.AID = {
  CRS: "A00000015143525300",
  PPSE: "325041592E5359532E4444463031",
  PKCS15: "A000000063504b43532d3135",
  AID_Illegal_1: "A0000001",
  AID_Illegal_2: "A00000015143525300100010006000000A",
  AID_Nonexisting: "A000000151435253FF"
};

window.APDU = {
  // gets the response from SIM, can be used to retireve channel select
  PPSE: {
    getTemplate: new SECommand(0x80, 0xD4, 0x01, 0x00, new Uint8Array())
  },
  PKCS15: {
    getResponse: new SECommand(0x00, 0xC0, 0x00, 0x00, new Uint8Array()),
    readBinary: new SECommand(0x00, 0xB0, 0x00, 0x00, new Uint8Array()),
    selectODF: new SECommand(0x00, 0xA4, 0x00, 0x04, new Uint8Array([0x50, 0x31]))
  },
  CRS: {
    // Get applet version number and global update counter
    getData: new SECommand(0x80, 0xCA, 0x00, 0xA5, new Uint8Array()),
    // Get status of applets and Security Domains only.
    // The ISD is ignored. Get first or only occurrence
    getStatusAll1st: new SECommand(0x80, 0xF2, 0x40, 0x00,
      new Uint8Array([
        0x4F, 0x00, // applet AID, empty here
        0x5C, 0x03, // tag list to be returned
        0x4F, // AID
        0x9F, 0x70  // applet life cycle state - first byte;
                    // contactless activation state - second byte
      ])),
    // Get status of applets and Security Domains only.
    // The ISD is ignored. Get next occurrence(s), if SW is 63h10h
    getStatusAllNext: new SECommand(0x80, 0xF2, 0x40, 0x01,
      new Uint8Array([0x4F, 0x00, 0x5C, 0x03, 0x4F, 0x9F, 0x70])),
    // Get status of applet identified with AID
    getStatusAID: (aid) => {
      return new SECommand(0x81, 0xF2, 0x40, 0x00,
        joinUint8Arrays(
          [0x4F, 0x0F], // applet AID
          hexString2byte(aid),
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
      return new SECommand(0x80, 0xF0, 0x01, 0x00,
        joinUint8Arrays([0x4F, 0x0F], hexString2byte(aid)));
    },
    fastPayOn: (aid) => {
      return new SECommand(0x80, 0xF0, 0x01, 0x01,
        joinUint8Arrays([0x4F, 0x0F], hexString2byte(aid)));
    },
    nfcActivate: new SECommand(0x80, 0xF0, 0x04, 0x80,
                                      new Uint8Array([0x80, 0x01, 0x40])),
    nfcDeactivate: new SECommand(0x80, 0xF0, 0x04, 0x00,
                                        new Uint8Array([0x80, 0x01, 0x40]))
  }
};

function updateResultStatus(id, color, wording) {
  var result = document.getElementById(id);
  result.style.color = color;
  result.textContent = wording;
}

function recordLogs(id, message) {
  var li = document.createElement('li');

  var events = document.getElementById(id);
  var html = message;

  li.innerHTML = html;
  events.appendChild(li);
}

function clearLogs(id) {
  var events = document.getElementById(id);
  while (events.firstChild) {
    events.removeChild(events.firstChild);
  }
}

function checkResponse(id, response, expectedSw1, expectedSw2, expectedData) {
  var sw1Check = response.sw1 === expectedSw1;
  var sw2Check = response.sw2 === expectedSw2;
  var dataCheck = (expectedData) ? byte2hexString(response.data) === expectedData : true;
  if (sw1Check && sw2Check && dataCheck) {
    recordLogs(id, 'Response valid!');
    return true;
  } else {
    recordLogs(id, 'Test failed, SW1: ' + sw1Check + ', SW2: ' + sw2Check + ', data: ' + dataCheck);
    return false;
  }
}

function hexString2byte(str) {
  var a = [];
  for(var i = 0, len = str.length; i < len; i+=2) {
    a.push(parseInt(str.substr(i, 2), 16));
  }
  return new Uint8Array(a);
}

function byte2hexString(uint8arr) {
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
}

function joinUint8Arrays() {
  var args = Array.prototype.slice.call(arguments);
  var length = args.reduce(function(a, b) { return a + b.length; }, 0);
  var out = new Uint8Array(length);

  args.reduce(function(previousLen, buffer) {
    out.set(buffer, previousLen);
    return previousLen + buffer.length;
  }, 0);

  return out;
}
