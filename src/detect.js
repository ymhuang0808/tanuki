import Detector from './detector';
import debug from 'debug';

global.browser = require('webextension-polyfill');

let gieDebug = debug('gie:detect');

gieDebug('detect.js');
console.log('detect.js');

window.addEventListener('message', e => {
  console.log(e);
  if (e.source === window && e.data.gitlabIssuesExporter) {
    console.log('Browser send message');
    // let message = new GieMessage('issues_list_page', null);
    browser.runtime.sendMessage({
      type: 'issues_list_page',
      payload: null,
    });
  }
});

let detector = new Detector();
detector.detect(window);
