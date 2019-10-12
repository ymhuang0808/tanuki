import csvDownloadListener from './csv-download-listener';

global.browser = require('webextension-polyfill');

export function gitlabIssuesListener(message, sender) {
  console.log('gitlabIssuesListener');
  console.log(message);
  if (message.type !== 'issues_list_page') {
    return;
  }
  browser.browserAction.setPopup({
    tabId: sender.tab.id,
    popup: 'popup/popup.html#/gitlab',
  });
}

export function downloadIssuesListener(message, sender) {
  console.log('downloadIssueListener');
  console.log(message);
  console.log('sender');
  console.log(sender);
  if (message.type !== 'download_gitlab_issues') {
    console.log('message type is not match');
    return;
  }

  let downloadOptions = message.payload.downloadOptions;
  console.log(downloadOptions);
  let downloading = browser.downloads.download(downloadOptions);
  downloading.then(
    id => {
      console.log('downloading CSV, id = ' + id);
    },
    error => {
      console.log(error);
    }
  );

  if (!browser.downloads.onChanged.hasListener(csvDownloadListener)) {
    browser.downloads.onChanged.addListener(csvDownloadListener);
  }
}
