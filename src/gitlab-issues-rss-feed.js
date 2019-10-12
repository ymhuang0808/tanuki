import axios from 'axios';
import { xml2js } from 'xml-js';
import GitlabIssue from './gitlab-issue';

export default class GitlabIssuesRssFeed {
  constructor() {
    this.issuesList = [];
  }

  setUrl(urlString) {
    let url = new URL(urlString);
    let paramString = url.search.slice(1);
    let params = new URLSearchParams(paramString);
    params.delete('page');
    let withoutPageParamUrl = `${url.protocol}//${url.host}${url.pathname}`;
    withoutPageParamUrl += !params.values().next().done ? `?${params.toString()}` : '';
    this.url = withoutPageParamUrl;
    return this;
  }

  fetchIssuesList() {
    let page = 1;
    let issueList = [];
    return this.fetchIssueListAllPages(issueList, page);
  }

  fetchIssueListAllPages(issuesList, page) {
    let currentURL = `${this.url}&page=${page}`;
    let downloading = this.download(currentURL);
    let self = this;

    return new Promise(resolve => {
      downloading.then(issues => {
        page++;
        let filtered = issues.filter(currentIssue => {
          let result = issuesList.find(issue => {
            return issue.id === currentIssue.id;
          });
          return !result;
        });

        issuesList = issuesList.concat(filtered);
        if (filtered.length !== 0) {
          return resolve(self.fetchIssueListAllPages(issuesList, page));
        }

        return resolve(issuesList);
      });
    });
  }

  download(url) {
    return axios.get(url).then(response => {
      let xml = response.data;
      let result = xml2js(xml, { compact: true });
      let gitlabIssues = result.feed.entry.map(item => {
        return new GitlabIssue(item);
      });
      return gitlabIssues;
    });
  }
}
