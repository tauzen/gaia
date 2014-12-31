'use stricts';

var SETest = {
  get test21Button() {
    delete this.test21Button;
    return this.test21Button = document.getElementById('test2-1');
  },

  get reset21Button() {
    delete this.reset21Button;
    return this.reset21Button = document.getElementById('reset2-1');
  },

  get test22Button() {
    delete this.test22Button;
    return this.test22Button = document.getElementById('test2-2');
  },

  get reset22Button() {
    delete this.reset22Button;
    return this.reset22Button = document.getElementById('reset2-2');
  },

  get test23Button() {
    delete this.test23Button;
    return this.test23Button = document.getElementById('test2-3');
  },

  get reset23Button() {
    delete this.reset23Button;
    return this.reset23Button = document.getElementById('reset2-3');
  },

  get test24Button() {
    delete this.test24Button;
    return this.test24Button = document.getElementById('test2-4');
  },

  get reset24Button() {
    delete this.reset24Button;
    return this.reset24Button = document.getElementById('reset2-4');
  },

  get test25Button() {
    delete this.test25Button;
    return this.test25Button = document.getElementById('test2-5');
  },

  get reset25Button() {
    delete this.reset25Button;
    return this.reset25Button = document.getElementById('reset2-5');
  },

  init: function () {
    this.test21Button.addEventListener('click', this.test21Case.bind(this));
    this.reset21Button.addEventListener('click', this.reset21Case.bind(this));
    this.test22Button.addEventListener('click', this.test22Case.bind(this));
    this.reset22Button.addEventListener('click', this.reset22Case.bind(this));
    this.test23Button.addEventListener('click', this.test23Case.bind(this));
    this.reset23Button.addEventListener('click', this.reset23Case.bind(this));
    this.test24Button.addEventListener('click', this.test24Case.bind(this));
    this.reset24Button.addEventListener('click', this.reset24Case.bind(this));
    this.test25Button.addEventListener('click', this.test25Case.bind(this));
    this.reset25Button.addEventListener('click', this.reset25Case.bind(this));
  },

  uninit: function() {
    this.test21Button.removeEventListener('click', this.test21Case.bind(this));
    this.reset21Button.removeEventListener('click', this.reset21Case.bind(this));
    this.test22Button.removeEventListener('click', this.test22Case.bind(this));
    this.reset22Button.removeEventListener('click', this.reset22Case.bind(this));
    this.test23Button.removeEventListener('click', this.test23Case.bind(this));
    this.reset23Button.removeEventListener('click', this.reset23Case.bind(this));
    this.test24Button.removeEventListener('click', this.test24Case.bind(this));
    this.reset24Button.removeEventListener('click', this.reset24Case.bind(this));
    this.test25Button.removeEventListener('click', this.test25Case.bind(this));
    this.reset25Button.removeEventListener('click', this.reset25Case.bind(this));
  },

  // Test #2-1
  test21Case: function() {
    recordLogs("logs2-1", "Start testing ...");
    this.test21Button.disabled = true;
    if (!window.navigator.seManager) {
      recordLogs("logs2-1", "SecureElement API is not present");
      updateResultStatus("result2-1", "Red", "Fail");
    }
    else {
      recordLogs("logs2-1", "Get SEReaders");
      window.navigator.seManager.getSEReaders()
      .then((readers) => {
        recordLogs("logs2-1", "Check if SE present");
        var result = readers[0].isSEPresent;
	recordLogs("logs2-1", "isSEPresent: " + result);
        if (result == false) {
          updateResultStatus("result2-1", "Red", "Fail");
        }
        else {
          updateResultStatus("result2-1", "Green", "Pass");
        }
      })
      .catch((err) => {
        recordLogs("logs2-1", "error:" + err);
        updateResultStatus("result2-1", "Red", "Fail");
      });
    }
  },

  reset21Case: function() {
    this.test21Button.disabled = false;
    updateResultStatus("result2-1", "Black", "None"); 
    clearLogs("logs2-1");
  },

  // Test #2-2
  test22Case: function() {
    recordLogs("logs2-2", "Start testing ...");
    this.test22Button.disabled = true;
    if (!window.navigator.seManager) {
      recordLogs("logs2-2", "SecureElement API is not present");
      updateResultStatus("result2-2", "Red", "Fail");
    }
    else {
      recordLogs("logs2-2", "Get SEReaders");
       window.navigator.seManager.getSEReaders()
      .then((readers) => {
         window.reader = readers[0];
         recordLogs("logs2-2", "Open a session");
         return readers[0].openSession();
         })
      .then((session)=> {
        if (session) {
          updateResultStatus("result2-2", "Green", "Pass");
        }
        else {
          updateResultStatus("result2-2", "Red", "Fail");
        }
        window.reader.closeAll();
      })
      .catch((err) => {
        recordLogs("logs2-2", "error:" + err);
        updateResultStatus("result2-2", "Red", "Fail");
        window.reader.closeAll();
      });
    }
  },

  reset22Case: function() {
    this.test22Button.disabled = false;
    updateResultStatus("result2-2", "Black", "None");
    clearLogs("logs2-2");
  },

  // Test #2-3
  test23Case: function() {
    recordLogs("logs2-3", "Start testing ...");
    this.test23Button.disabled = true;
    if (!window.navigator.seManager) {
      recordLogs("logs2-3", "SecureElement API is not present");
      updateResultStatus("result2-3", "Red", "Fail");
    }
    else {
      var failed = false;
      recordLogs("logs2-3", "Get SEReaders");
      window.navigator.seManager.getSEReaders()
      .then((readers) => {
        recordLogs("logs2-3", "try to open two sessions");
        recordLogs("logs2-3", "Open 1st session...");
        window.reader = readers[0];
        return readers[0].openSession();
      })
      .then((session) => {
        window.testSESession1 = session;
        recordLogs("logs2-3", "Open 2nd session...");
        return window.reader.openSession();
      })
      .then((session) => {
        window.testSESession2 = session;
        if (window.testSESession1 === window.testSESession2) {
          recordLogs("logs2-3", "Session instances s1 and s2 are the same, failing");
          failed = true;
        }

        recordLogs("logs2-3", "Execute reader.closeAll()");
        return window.reader.closeAll();
      })
      .then(() => {
        recordLogs("logs2-3", "Check if all sessions have been closed");
        if(!window.testSESession1.isClosed || !window.testSESession2.isClosed){
          recordLogs("logs2-3", "Sessions have not been closed");
          failed = true;
        }

        updateResultStatus("result2-3", "Green", (failed) ? "Fail" : "Pass");
      })
      .catch((err) => {
        recordLogs("logs2-3", "error:" + err);
        updateResultStatus("result2-3", "Red", "Fail");
        window.reader.closeAll();
      });
    }
  },

  reset23Case: function() {
    this.test23Button.disabled = false;
    updateResultStatus("result2-3", "Black", "None");
    clearLogs("logs2-3");
  },

  // Test #2-4
  test24Case: function() {
    recordLogs("logs2-4", "Start testing ...");
    this.test24Button.disabled = true;
    if (!window.navigator.seManager) {
      recordLogs("logs2-4", "SecureElement API is not present");
      updateResultStatus("result2-4", "Red", "Fail");
    }
    else {
      recordLogs("logs2-4", "Execute seManager.getSEReaders()");
      window.navigator.seManager.getSEReaders()
      .then((readers) => {
        recordLogs("logs2-4", "Open one session");
        window.reader = readers[0];
        return readers[0].openSession();
      })
      .then((session) => {
        window.testSESession = session;
        recordLogs("logs2-4", "try to open two logical channels");
        recordLogs("logs2-4", "Open the 1st. logical channel to CRS applet...");
        return session.openLogicalChannel(hexString2byte(window.AID.CRS));
      })
      .then((channel) => {
        recordLogs("logs2-4", "1st. channel opened to CRS applet...");
        window.channel1 = channel;
        return window.testSESession;
       })   
      .then((session) => {
        recordLogs("logs2-4", "Open the 2nd. logical channel to PPSE applet...");
        return session.openLogicalChannel(hexString2byte(window.AID.PPSE));    
      })
      .then((channel) => {
        recordLogs("logs2-4", "2nd. channel opened to PPSE applet...");
        window.channel2 = channel;
        recordLogs("logs2-4", "Call SEReader.closeAll()...");         
        return window.reader.closeAll();
      })   
      .then(() => {
        recordLogs("logs2-4", "Check if all sessions and channels have been closed");
        recordLogs("logs2-4", "window.testSESession.isClosed = " + window.testSESession.isClosed);
        recordLogs("logs2-4", "window.channel1.isClosed = " + window.channel1.isClosed);
        recordLogs("logs2-4", "window.channel2.isClosed = " + window.channel2.isClosed);
        if ((window.testSESession.isClosed && window.channel1.isClosed && window.channel2.isClosed) == false) {
          recordLogs("logs2-4", "Sessions or channels have not been closed");
          updateResultStatus("result2-4", "Red", "Fail");
        }
        else {
          updateResultStatus("result2-4", "Green", "Pass");
        }
      })
      .catch((err) => {
        recordLogs("logs2-4", "error:" + err);
        updateResultStatus("result2-4", "Red", "Fail");
        window.reader.closeAll();
      });
    }
  },

  reset24Case: function() {
    this.test24Button.disabled = false;
    updateResultStatus("result2-4", "Black", "None");
    clearLogs("logs2-4");
  },

  // Test #2-5
  test25Case: function() {
    recordLogs("logs2-5", "Start testing ...");
    this.test25Button.disabled = true;
    if (!window.navigator.seManager) {
      recordLogs("logs2-5", "SecureElement API is not present");
      updateResultStatus("result2-5", "Red", "Fail");
    }
    else {
      recordLogs("logs2-5", "Get SEReaders");
      window.navigator.seManager.getSEReaders()
      .then((readers) => {
        recordLogs("logs2-5", "Check SE type");
        var result = readers[0].type;
        recordLogs("logs2-5", "SE type: " + result);
        if (result == "uicc") {
          updateResultStatus("result2-5", "Green", "Pass");
        }
        else {
          recordLogs("logs2-5", "Incorrect SE type");
          updateResultStatus("result2-5", "Red", "Fail");
        }
      })
      .catch((err) => {
        recordLogs("logs2-5", "error:" + err);
        updateResultStatus("result2-5", "Red", "Fail");
      });
    }
  },

  reset25Case: function() {
    this.test25Button.disabled = false;
    updateResultStatus("result2-5", "Black", "None");
    clearLogs("logs2-5");
  },

};

window.addEventListener('load', SETest.init.bind(SETest));
window.addEventListener('unload', SETest.uninit.bind(SETest));
