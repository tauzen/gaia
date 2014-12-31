'use stricts';

var UITest = {
  get NOSIMtests() {
    delete this.NOSIMtests;
    return this.NOSIMtests = document.getElementById('NOSIM-tests');
  },
  get SIMtests() {
    delete this.SIMtests;
    return this.SIMtests = document.getElementById('SIM-tests');
  },
  get iframe() {
    delete this.iframe;
    return this.iframe = document.getElementById('test-iframe');
  },
  get backHeader() {
    delete this.backHeader;
    return this.backHeader = document.getElementById('test-panel-header');
  },
  get panelTitle() {
    delete this.panelTitle;
    return this.panelTitle = document.getElementById('test-panel-title');
  },
  get tabs() {
    delete this.tabs;
    return this.tabs = document.querySelectorAll('[role="tab"]');
  },
  get NOSIMTab() {
    delete this.NOSIMTab;
    return this.NOSIMTab = document.getElementById('NOSIM');
  },
  get SIMTab() {
    delete this.SIMTab;
    return this.SIMTab = document.getElementById('SIM');
  },
  currentTab: 'NOSIM',
  handleNotificationMessage: function(message) {
    if (!message.clicked) {
      return;
    }
    this.bringSelfToForeground();
  },
  bringSelfToForeground: function() {
    navigator.mozApps.getSelf().onsuccess = function gotSelf(evt) {
      var app = evt.target.result;
      app.launch();
    };
  },
  handleActivity: function(activity) {
    if (activity.source.name != 'internal-system-engineering-mode') {
      return;
    }
    //TODO use mozEngineeringMode API to do something
  },
  init: function ut_init() {
    this.iframe.addEventListener('load', this);
    this.iframe.addEventListener('unload', this);
    document.body.addEventListener('transitionend', this);
    window.addEventListener('keyup', this);
    window.addEventListener('hashchange', this);
    this.backHeader.addEventListener('action', this);

    navigator.mozSetMessageHandler('notification', function(msg) {
      this.handleNotificationMessage(msg);
    }.bind(this));

    navigator.mozSetMessageHandler('activity', function(activity) {
      this.handleActivity(activity);
    }.bind(this));

    var name = this.getNameFromHash();
    if (name) {
      this.openTest(name);
    }
    else {
      // if no test is specified, load UI tests list (select UI tab)
      window.location.hash = 'NOSIM';
    }
  },
  uninit: function ut_uninit() {
    this.iframe.removeEventListener('load', this);
    this.iframe.removeEventListener('unload', this);
    document.body.removeEventListener('transitionend', this);
    window.removeEventListener('keyup', this);
    window.removeEventListener('hashchange', this);
    this.backHeader.removeEventListener('action', this);
  },
  getNameFromHash: function ut_getNameFromHash() {
    return (/\btest=(.+)(&|$)/.exec(window.location.hash) || [])[1];
  },
  handleEvent: function ut_handleEvent(ev) {
    switch (ev.type) {
      case 'action':
        if (ev.target != this.backHeader) {
          return;
        }
        if (window.location.hash) {
          window.location.hash = '';
        }
        break;
      case 'load':
        this.iframe.contentWindow.addEventListener('keyup', this);
        break;
      case 'unload':
        this.iframe.contentWindow.removeEventListener('keyup', this);
        break;
      case 'hashchange':
        if (window.location.hash == '#NOSIM')
        {
          this.NOSIMtests.classList.remove('invisible');
          AccessibilityHelper.setAriaSelected(this.NOSIMTab, this.tabs);
          if (!this.SIMtests.classList.contains('invisible'))
            this.SIMtests.classList.add('invisible');
        }
        else if (window.location.hash == '#SIM')
        {
          this.SIMtests.classList.remove('invisible');
          AccessibilityHelper.setAriaSelected(this.SIMTab, this.tabs);
          if (!this.NOSIMtests.classList.contains('invisible'))
            this.NOSIMtests.classList.add('invisible');
        }
        else
        {
          var name = this.getNameFromHash();
          if (!name) {
            this.closeTest();
            return;
          }
          this.panelTitle.textContent = name;
          this.openTest(name);
        }
        break;
      case 'transitionend':
        var name = this.getNameFromHash();
        if (!name)
          this.iframe.src = 'about:blank';
        break;
    }
  },
  openTest: function ut_openTest(name) {
    // save tab name from URL
    // e.g. '#test=UI/empty' => 'UI'
    this.currentTab = (/=\b(.+)\//.exec(window.location.hash) || [])[1];
    document.body.classList.add('test');

    var self = this;
    window.setTimeout(function openTestPage() {
      self.iframe.src = './tests_html/' + name + '.html';
    }, 200);
  },
  closeTest: function ut_closeTest() {
    var isOpened = document.body.classList.contains('test');
    if (!isOpened)
      return false;
    document.body.classList.remove('test');

    // select tab after close test iframe
    window.location.hash = this.currentTab;
    return true;
  }
};

window.addEventListener('load', UITest.init.bind(UITest));
