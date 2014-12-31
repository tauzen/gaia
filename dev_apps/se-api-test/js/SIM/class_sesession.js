'use stricts';

var SETest = {
  get test31Button() {
    delete this.test31Button;
    return this.test31Button = document.getElementById('test3-1');
  },

  get reset31Button() {
    delete this.reset31Button;
    return this.reset31Button = document.getElementById('reset3-1');
  },

  get test32Button() {
    delete this.test32Button;
    return this.test32Button = document.getElementById('test3-2');
  },

  get reset32Button() {
    delete this.reset32Button;
    return this.reset32Button = document.getElementById('reset3-2');
  },

  get test33Button() {
    delete this.test33Button;
    return this.test33Button = document.getElementById('test3-3');
  },

  get reset33Button() {
    delete this.reset33Button;
    return this.reset33Button = document.getElementById('reset3-3');
  },

  get test34Button() {
    delete this.test34Button;
    return this.test34Button = document.getElementById('test3-4');
  },

  get reset34Button() {
    delete this.reset34Button;
    return this.reset34Button = document.getElementById('reset3-4');
  },

  get test35Button() {
    delete this.test35Button;
    return this.test35Button = document.getElementById('test3-5');
  },

  get reset35Button() {
    delete this.reset35Button;
    return this.reset35Button = document.getElementById('reset3-5');
  },

  get test36Button() {
    delete this.test36Button;
    return this.test36Button = document.getElementById('test3-6');
  },

  get reset36Button() {
    delete this.reset36Button;
    return this.reset36Button = document.getElementById('reset3-6');
  },

  get test37Button() {
    delete this.test37Button;
    return this.test37Button = document.getElementById('test3-7');
  },

  get reset37Button() {
    delete this.reset37Button;
    return this.reset37Button = document.getElementById('reset3-7');
  },

  get test38Button() {
    delete this.test38Button;
    return this.test38Button = document.getElementById('test3-8');
  },

  get reset38Button() {
    delete this.reset38Button;
    return this.reset38Button = document.getElementById('reset3-8');
  },

  get test39Button() {
    delete this.test39Button;
    return this.test39Button = document.getElementById('test3-9');
  },

  get reset39Button() {
    delete this.reset39Button;
    return this.reset39Button = document.getElementById('reset3-9');
  },

  get test310Button() {
    delete this.test310Button;
    return this.test310Button = document.getElementById('test3-10');
  },

  get reset310Button() {
    delete this.reset310Button;
    return this.reset310Button = document.getElementById('reset3-10');
  },

  get test311Button() {
    delete this.test311Button;
    return this.test311Button = document.getElementById('test3-11');
  },

  get reset311Button() {
    delete this.reset311Button;
    return this.reset311Button = document.getElementById('reset3-11');
  },

  init: function () {
    this.test31Button.addEventListener('click', this.test31Case.bind(this));
    this.reset31Button.addEventListener('click', this.reset31Case.bind(this));
    this.test32Button.addEventListener('click', this.test32Case.bind(this));
    this.reset32Button.addEventListener('click', this.reset32Case.bind(this));
    this.test33Button.addEventListener('click', this.test33Case.bind(this));
    this.reset33Button.addEventListener('click', this.reset33Case.bind(this));
    this.test34Button.addEventListener('click', this.test34Case.bind(this));
    this.reset34Button.addEventListener('click', this.reset34Case.bind(this));
    this.test35Button.addEventListener('click', this.test35Case.bind(this));
    this.reset35Button.addEventListener('click', this.reset35Case.bind(this));
    this.test36Button.addEventListener('click', this.test36Case.bind(this));
    this.reset36Button.addEventListener('click', this.reset36Case.bind(this));
    this.test37Button.addEventListener('click', this.test37Case.bind(this));
    this.reset37Button.addEventListener('click', this.reset37Case.bind(this));
    this.test38Button.addEventListener('click', this.test38Case.bind(this));
    this.reset38Button.addEventListener('click', this.reset38Case.bind(this));
    this.test39Button.addEventListener('click', this.test39Case.bind(this));
    this.reset39Button.addEventListener('click', this.reset39Case.bind(this));
    this.test310Button.addEventListener('click', this.test310Case.bind(this));
    this.reset310Button.addEventListener('click', this.reset310Case.bind(this));
    this.test311Button.addEventListener('click', this.test311Case.bind(this));
    this.reset311Button.addEventListener('click', this.reset311Case.bind(this));
  },

  uninit: function() {
    this.test31Button.removeEventListener('click', this.test31Case.bind(this));
    this.reset31Button.removeEventListener('click', this.reset31Case.bind(this));
    this.test32Button.removeEventListener('click', this.test32Case.bind(this));
    this.reset32Button.removeEventListener('click', this.reset32Case.bind(this));
    this.test33Button.removeEventListener('click', this.test33Case.bind(this));
    this.reset33Button.removeEventListener('click', this.reset33Case.bind(this));
    this.test34Button.removeEventListener('click', this.test34Case.bind(this));
    this.reset34Button.removeEventListener('click', this.reset34Case.bind(this));
    this.test35Button.removeEventListener('click', this.test35Case.bind(this));
    this.reset35Button.removeEventListener('click', this.reset35Case.bind(this));
    this.test36Button.removeEventListener('click', this.test36Case.bind(this));
    this.reset36Button.removeEventListener('click', this.reset36Case.bind(this));
    this.test37Button.removeEventListener('click', this.test37Case.bind(this));
    this.reset37Button.removeEventListener('click', this.reset37Case.bind(this));
    this.test38Button.removeEventListener('click', this.test38Case.bind(this));
    this.reset38Button.removeEventListener('click', this.reset38Case.bind(this));
    this.test39Button.removeEventListener('click', this.test39Case.bind(this));
    this.reset39Button.removeEventListener('click', this.reset39Case.bind(this));
    this.test310Button.removeEventListener('click', this.test310Case.bind(this));
    this.reset310Button.removeEventListener('click', this.reset310Case.bind(this));
    this.test311Button.removeEventListener('click', this.test311Case.bind(this));
    this.reset311Button.removeEventListener('click', this.reset311Case.bind(this));
  },

  // Test #3-1
  test31Case: function() {
    recordLogs("logs3-1", "Start testing ...");
    this.test31Button.disabled = true;
    if (!window.navigator.seManager) {
      recordLogs("logs3-1", "SecureElement API is not present");
      updateResultStatus("result3-1", "Red", "Fail");
    }
    else {
      recordLogs("logs3-1", "Get SEReaders");
      window.navigator.seManager.getSEReaders()
      .then((readers) => {
        window.reader = readers[0];
        recordLogs("logs3-1", "Open one session");
        return readers[0].openSession();
      })
      .then((session) => {
        recordLogs("logs3-1", "Check if reader object from session instance is equal to reader instance");
        if (window.reader != session.reader) { 
          updateResultStatus("result3-1", "Red", "Fail");
        }
        else {
          updateResultStatus("result3-1", "Green", "Pass");
        }
        window.reader.closeAll();
      })
      .catch((err) => {
        recordLogs("logs3-1", "error:" + err);
        updateResultStatus("result3-1", "Red", "Fail");
        window.reader.closeAll();
      });
    }
  },

  reset31Case: function() {
    this.test31Button.disabled = false;
    updateResultStatus("result3-1", "Black", "None");
    clearLogs("logs3-1");
  },

  // Test #3-2
  test32Case: function() {
    recordLogs("logs3-2", "Start testing ...");
    this.test32Button.disabled = true;
    if (!window.navigator.seManager) {
      recordLogs("logs3-2", "SecureElement API is not present");
      updateResultStatus("result3-2", "Red", "Fail");
    }
    else {
      recordLogs("logs3-2", "Get SEReaders");
      window.navigator.seManager.getSEReaders()
      .then((readers) => {
        window.reader = readers[0];
        recordLogs("logs3-2", "Open one session");
        return readers[0].openSession();
      })
      .then((session) => {
        recordLogs("logs3-2", "Check open session status");
        if (session.isClosed == false) {
          updateResultStatus("result3-2", "Green", "Pass");
        }
        else {
          updateResultStatus("result3-2", "Red", "Fail");
        }
        window.reader.closeAll();
      })
      .catch((err) => {
        recordLogs("logs3-2", "error:" + err);
        updateResultStatus("result3-2", "Red", "Fail");
        window.reader.closeAll();
      });
    }
  },

  reset32Case: function() {
    this.test32Button.disabled = false;
    updateResultStatus("result3-2", "Black", "None");
    clearLogs("logs3-2");
  },

  // Test #3-3 
  test33Case: function() {
    recordLogs("logs3-3", "Start testing ...");
    this.test33Button.disabled = true;
    if (!window.navigator.seManager) {
      recordLogs("logs3-3", "SecureElement API is not present");
      updateResultStatus("result3-3", "Red", "Fail");
    }
    else {
      recordLogs("logs3-3", "Get SEReaders");
      window.navigator.seManager.getSEReaders()
      .then((readers) => {
        window.reader = readers[0];
        recordLogs("logs3-3", "Open one session");
        return readers[0].openSession();
      })
      .then((session) => {
        recordLogs("logs3-3", "Open one logical channel to CRS applet ...");
        return session.openLogicalChannel(hexString2byte(window.AID.CRS));
      })
      .then((channel) => {
        updateResultStatus("result3-3", "Green", "Pass");
        window.reader.closeAll();
      })
      .catch((err) => {
        recordLogs("logs3-3", "error:" + err); 
        updateResultStatus("result3-3", "Red", "Fail");
        window.reader.closeAll();
      });
    }
  },

  reset33Case: function() {
    this.test33Button.disabled = false;
    updateResultStatus("result3-3", "Black", "None");
    clearLogs("logs3-3");
  },

  // Test #3-4
  test34Case: function() {
    recordLogs("logs3-4", "Start testing ...");
    this.test34Button.disabled = true;
    if (!window.navigator.seManager) {
      recordLogs("logs3-4", "SecureElement API is not present");
      updateResultStatus("result3-4", "Red", "Fail");
    }
    else {
      recordLogs("logs3-4", "Get SEReaders");
      window.navigator.seManager.getSEReaders()
      .then((readers) => {
        window.reader = readers[0];
        recordLogs("logs3-4", "Open one session");
        return readers[0].openSession();
      })
      .then((session) => {
        recordLogs("logs3-4", "Open one logical channel to an illegal applet (length of AID is less than 5)");
        return session.openLogicalChannel(hexString2byte(window.AID.AID_Illegal_1));
      })
      .then((channel) => {
        recordLogs("logs3-4", "Do not catch an error");
        updateResultStatus("result3-4", "Red", "Fail");
        window.reader.closeAll();
      })
      .catch((err) => {
        recordLogs("logs3-4", "error:" + err);
        // Should update later after confirmed error method and error type
        if (err.name == "SEGenericError") {
          updateResultStatus("result3-4", "Green", "Pass");
        }
        else {
          recordLogs("logs3-4", "Incorrect error type");
          updateResultStatus("result3-4", "Red", "Fail");
        }
        window.reader.closeAll();
      });
    }
  },

  reset34Case: function() {
    this.test34Button.disabled = false;
    updateResultStatus("result3-4", "Black", "None");
    clearLogs("logs3-4");
  },

  // Test #3-5
  test35Case: function() {
    recordLogs("logs3-5", "Start testing ...");
    this.test35Button.disabled = true;
    if (!window.navigator.seManager) {
      recordLogs("logs3-5", "SecureElement API is not present");
      updateResultStatus("result3-5", "Red", "Fail");
    }
    else {
      recordLogs("logs3-5", "Get SEReaders");
      window.navigator.seManager.getSEReaders()
      .then((readers) => {
        window.reader = readers[0];
        recordLogs("logs3-5", "Open one session");
        return readers[0].openSession();
      })
      .then((session) => {
        recordLogs("logs3-5", "Open one logical channel to an illegal applet (length of AID is more than 16)");
        return session.openLogicalChannel(hexString2byte(window.AID.AID_Illegal_2));
      })
      .then((channel) => {
        recordLogs("logs3-5", "Do not catch an error");
        updateResultStatus("result3-5", "Red", "Fail");
        window.reader.closeAll();
      })
      .catch((err) => {
        recordLogs("logs3-5", "error:" + err);
        // Should update later after confirmed error method and error type
        if (err.name == "SEGenericError") {
          updateResultStatus("result3-5", "Green", "Pass");
        }
        else {
          recordLogs("logs3-5", "Incorrect error type");
          updateResultStatus("result3-5", "Red", "Fail");
        }
        window.reader.closeAll();
      });
    }
  },

  reset35Case: function() {
    this.test35Button.disabled = false;
    updateResultStatus("result3-5", "Black", "None");
    clearLogs("logs3-5");
  },

  // Test #3-6
  test36Case: function() {
    recordLogs("logs3-6", "Start testing ...");
    this.test36Button.disabled = true;
    if (!window.navigator.seManager) {
      recordLogs("logs3-6", "SecureElement API is not present");
      updateResultStatus("result3-6", "Red", "Fail");
    }
    else {
      recordLogs("logs3-6", "Get SEReaders");
      window.navigator.seManager.getSEReaders()
      .then((readers) => {
        window.reader = readers[0];
        recordLogs("logs3-6", "Open one session");
        return readers[0].openSession();
      })
      .then((session) => {
        recordLogs("logs3-6", "Open one logical channel with an AID which is not available on SE");
        return session.openLogicalChannel(hexString2byte(window.AID.AID_Nonexisting));
      })
      .then((channel) => {
        recordLogs("logs3-6", "Do not catch an error");
        updateResultStatus("result3-6", "Red", "Fail");
        window.reader.closeAll();
      })
      .catch((err) => {
        recordLogs("logs3-6", "error:" + err);
        // Should update later after confirmed error method and error type
        if (err.name == "SEGenericError") {
          updateResultStatus("result3-6", "Green", "Pass");
        }
        else {
          recordLogs("logs3-6", "Incorrect error type");
          updateResultStatus("result3-6", "Red", "Fail");
        }
        window.reader.closeAll();
      });
    }
  },

  reset36Case: function() {
    this.test36Button.disabled = false;
    updateResultStatus("result3-6", "Black", "None");
    clearLogs("logs3-6");
  },

  // Test #3-7
  test37Case: function() {
    recordLogs("logs3-7", "Start testing ...");
    this.test37Button.disabled = true;
    if (!window.navigator.seManager) {
      recordLogs("logs3-7", "SecureElement API is not present");
      updateResultStatus("result3-7", "Red", "Fail");
    }
    else {
      recordLogs("logs3-7", "Get SEReaders");
      window.navigator.seManager.getSEReaders()
      .then((readers) => {
        window.reader = readers[0];
        recordLogs("logs3-7", "Open one session");
        return readers[0].openSession();
      })
      .then((session) => {
        window.testSession = session;
        recordLogs("logs3-7", "Close session via reader.closeAll()");
        return window.reader.closeAll();
      })
      .then(() => {
        recordLogs("logs3-7", "Try to open a channel via session that already been closed");
        return window.testSession.openLogicalChannel(hexString2byte(window.AID.CRS));
      })
      .then((channel) => {
        recordLogs("logs3-7", "Do not catch an error");
        updateResultStatus("result3-7", "Red", "Fail");
      })
      .catch((err) => {
        recordLogs("logs3-7", "error:" + err);
        // Should update later after confirmed error method and error type
        if (err.name == "SEGenericError") {
          updateResultStatus("result3-7", "Green", "Pass");
        }
        else {
          recordLogs("logs3-7", "Incorrect error type");
          updateResultStatus("result3-7", "Red", "Fail");
        }
        window.reader.closeAll();
      });
    }
  },

  reset37Case: function() {
    this.test37Button.disabled = false;
    updateResultStatus("result3-7", "Black", "None");
    clearLogs("logs3-7");
  },

  // Test #3-8
  test38Case: function() {
    recordLogs("logs3-8", "Start testing ...");
    this.test38Button.disabled = true;
    if (!window.navigator.seManager) {
      recordLogs("logs3-8", "SecureElement API is not present");
      updateResultStatus("result3-8", "Red", "Fail");
    }
    else {
      recordLogs("logs3-8", "Get SEReaders");
      window.navigator.seManager.getSEReaders()
      .then((readers) => {
        window.reader = readers[0];
        recordLogs("logs3-8", "Open one session");
        return readers[0].openSession();
      })
      .then((session) => {
        recordLogs("logs3-8", "Open a logical channel to PKCS15 applet which is under access control");
        return session.openLogicalChannel(hexString2byte(window.AID.PKCS15));
      })
      .then((channel) => {
        recordLogs("logs3-8", "Do not catch an error that could not open channel to PKCS15 applet");
        updateResultStatus("result3-8", "Red", "Fail");
        window.reader.closeAll();
      })
      .catch((err) => {
        recordLogs("logs3-8", "error:" + err);
        // Should update later after confirmed error method and error type
        if (err.name == "SEGenericError") {
          updateResultStatus("result3-8", "Green", "Pass");
        }
        else {
          recordLogs("logs3-8", "Incorrect error type");
          updateResultStatus("result3-8", "Red", "Fail");
        }
        window.reader.closeAll();
      });
    }
  },

  reset38Case: function() {
    this.test38Button.disabled = false;
    updateResultStatus("result3-8", "Black", "None");
    clearLogs("logs3-8");
  },

  // Test #3-9
  test39Case: function() {
    recordLogs("logs3-9", "Start testing ...");
    this.test39Button.disabled = true;
    if (!window.navigator.seManager) {
      recordLogs("logs3-9", "SecureElement API is not present");
      updateResultStatus("result3-9", "Red", "Fail");
    }
    else {
      recordLogs("logs3-9", "Get SEReaders");
      window.navigator.seManager.getSEReaders()
      .then((readers) => {
        window.reader = readers[0];
        recordLogs("logs3-9", "Open one session");
        return readers[0].openSession();
      })
      .then((session) => {
        window.testSession = session;
        recordLogs("logs3-9", "Open first channel to CRS applet...");
        return session.openLogicalChannel(hexString2byte(window.AID.CRS));
      })
      .then((channel) => {
        recordLogs("logs3-9", "Open second channel to CRS applet...");
        return window.testSession.openLogicalChannel(hexString2byte(window.AID.CRS));
      })
      .then((channel) => {
        recordLogs("logs3-9", "Open third channel to CRS applet...");
        return window.testSession.openLogicalChannel(hexString2byte(window.AID.CRS));
      })
      .then((channel) => {
        recordLogs("logs3-9", "Open fourth channel to CRS applet...");
        return window.testSession.openLogicalChannel(hexString2byte(window.AID.CRS));
      })
      .then((channel) => {
        recordLogs("logs3-9", "Do not catch an error when open channels that over maximum capacity (max = 3)");
        updateResultStatus("result3-9", "Red", "Fail");
        window.reader.closeAll();
      })
      .catch((err) => {
        recordLogs("logs3-9", "error:" + err);
        // Should update later after confirmed error method and error type
        if (err.name == "SEGenericError") {
          updateResultStatus("result3-9", "Green", "Pass");
        }
        else {
          recordLogs("logs3-9", "Incorrect error type");
          updateResultStatus("result3-9", "Red", "Fail");
        }
        window.reader.closeAll();
      });
    }
  },

  reset39Case: function() {
    this.test39Button.disabled = false;
    updateResultStatus("result3-9", "Black", "None");
    clearLogs("logs3-9");
  },

  // Test #3-10
  test310Case: function() {
    recordLogs("logs3-10", "Start testing ...");
    this.test310Button.disabled = true;
    if (!window.navigator.seManager) {
      recordLogs("logs3-10", "SecureElement API is not present");
      updateResultStatus("result3-10", "Red", "Fail");
    }
    else {
      recordLogs("logs3-10", "Get SEReaders");
      window.navigator.seManager.getSEReaders()
      .then((readers) => {
        window.reader = readers[0];
        recordLogs("logs3-10", "Open one session");
        return readers[0].openSession();
      })
      .then((session) => {
        window.testSession = session;
        recordLogs("logs3-10", "Open one logical channel to CRS applet ...");
        return session.openLogicalChannel(hexString2byte(window.AID.CRS));
      })
      .then((channel) => {
        window.channel1 = channel;
        recordLogs("logs3-10", "Close channel via session.closeAll()");
        return window.testSession.closeAll();
      })
      .then(() => {
        if (window.channel1.isClosed == true) {
          updateResultStatus("result3-10", "Green", "Pass")
        }
        else {
          recordLogs("logs3-10", "Channel did not been closed");
          updateResultStatus("result3-10", "Red", "Fail");
        }
        window.reader.closeAll();
      })
      .catch((err) => {
        recordLogs("logs3-10", "error:" + err);
        updateResultStatus("result3-10", "Red", "Fail");
        window.reader.closeAll();
      });
    }
  },

  reset310Case: function() {
    this.test310Button.disabled = false;
    updateResultStatus("result3-10", "Black", "None");
    clearLogs("logs3-10");
  },

  // Test #3-11
  test311Case: function() {
    recordLogs("logs3-11", "Start testing ...");
    this.test311Button.disabled = true;
    if (!window.navigator.seManager) {
      recordLogs("logs3-11", "SecureElement API is not present");
      updateResultStatus("result3-11", "Red", "Fail");
    }
    else {
      recordLogs("logs3-11", "Get SEReaders");
      window.navigator.seManager.getSEReaders()
      .then((readers) => {
        window.reader = readers[0];
        recordLogs("logs3-11", "Open one session");
        return readers[0].openSession();
      })
      .then((session) => {
        window.testSession = session;
        recordLogs("logs3-11", "Open one logical channel to CRS applet ...");
        return session.openLogicalChannel(hexString2byte(window.AID.CRS));
      })
      .then((channel) => {
        window.channel1 = channel;
        recordLogs("logs3-11", "Open one logical channel to PPSE applet ...");
        return window.testSession.openLogicalChannel(hexString2byte(window.AID.PPSE));
      })
      .then((channel) => {
        window.channel2 = channel;
        recordLogs("logs3-11", "Close channels via session.closeAll()");
        return window.testSession.closeAll();
      })
      .then(() => {
        if ((window.channel1.isClosed && window.channel2.isClosed) == true) {
          updateResultStatus("result3-11", "Green", "Pass")
        }
        else {
          recordLogs("logs3-11", "Channels did not been closed");
          updateResultStatus("result3-11", "Red", "Fail");
        }
        window.reader.closeAll();
      })
      .catch((err) => {
        recordLogs("logs3-11", "error:" + err);
        updateResultStatus("result3-11", "Red", "Fail");
        window.reader.closeAll();
      });
    }
  },

  reset311Case: function() {
    this.test311Button.disabled = false;
    updateResultStatus("result3-11", "Black", "None");
    clearLogs("logs3-11");
  },  

};

window.addEventListener('load', SETest.init.bind(SETest));
window.addEventListener('unload', SETest.uninit.bind(SETest));
