import Detector from '../detector';
import GitlabIssuesRssFeed from '../gitlab-issues-rss-feed';
import { stringify } from 'csv';

global.browser = require('webextension-polyfill');
window.URL = window.URL || window.webkitURL;

(() => {
  const detector = new Detector();
  console.log('download.js');
  let element = detector.getRssFeedElement();
  let url = element.href;
  let rssFeed = new GitlabIssuesRssFeed();
  let fetchIssuesList = rssFeed.setUrl(url).fetchIssuesList();
  fetchIssuesList.then(issuesList => {
    console.log(issuesList);
    console.log('csv');
    stringify(issuesList, { header: true, columns: { id: 'id', title: 'title' } }, (err, output) => {
      if (err) {
        // TODO: display error message
        return;
      }

      let objectURL = window.URL.createObjectURL(new Blob([output], { type: 'text/csv' }));

      browser.runtime.sendMessage({
        type: 'download_gitlab_issues',
        payload: {
          downloadOptions: {
            url: objectURL,
            filename: 'gitlab-issues.csv',
            saveAs: true,
          },
        },
      });
    });
  });
})();
