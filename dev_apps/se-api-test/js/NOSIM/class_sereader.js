'use stricts';

var SETest = {
  get test11Button() {
    delete this.test11Button;
    return this.test11Button = document.getElementById('test1-1');
  },

  get reset11Button() {
    delete this.reset11Button;
    return this.reset11Button = document.getElementById('reset1-1');
  },

  init: function () {
    this.test11Button.addEventListener('click', this.test11Case.bind(this));
    this.reset11Button.addEventListener('click', this.reset11Case.bind(this));
  },

  uninit: function() {
    this.test11Button.removeEventListener('click', this.test11Case.bind(this));
    this.reset11Button.removeEventListener('click', this.reset11Case.bind(this));
  },

  test11Case: function() {
    recordLogs("logs1-1", "Start testing ...");
    this.test11Button.disabled = true;
    if (!window.navigator.seManager) {
      recordLogs("logs1-1", "SecureElement API is not present");
      updateResultStatus("result1-1", "Red", "Fail");
    }
    else {
      recordLogs("logs1-1", "Get SEReaders");
      window.navigator.seManager.getSEReaders()
      .then((readers) => {
        recordLogs("logs1-1", "Check if SE present");
        var result = readers[0].isSEPresent;
	recordLogs("logs1-1", "isSEPresent: " + result);
        if (result == true) {
          updateResultStatus("result1-1", "Red", "Fail");
        }
        else {
          updateResultStatus("result1-1", "Green", "Pass");
        }
      })
      .catch((err) => {
         recordLogs("logs1-1", "error:" + err);
         updateResultStatus("result1-1", "Red", "Fail");
      });
    }
  },

  reset11Case: function() {
    this.test11Button.disabled = false;
    updateResultStatus("result1-1", "Black", "None"); 
    clearLogs("logs1-1");
  },

};

window.addEventListener('load', SETest.init.bind(SETest));
window.addEventListener('unload', SETest.uninit.bind(SETest));
