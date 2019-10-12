import { gitlabIssuesListener, downloadIssuesListener } from './browser-listeners';

global.browser = require('webextension-polyfill');

browser.runtime.onMessage.addListener(gitlabIssuesListener);
browser.runtime.onMessage.addListener(downloadIssuesListener);
