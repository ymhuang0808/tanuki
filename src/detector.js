export default class Detector {
  detect(win) {
    if (!this.isGitLabCharacteristic()) {
      console.log('Not GitLab');
      return;
    }

    if (!this.isIssuesListUrl()) {
      console.log('Not in issue list url');
      return;
    }

    console.log('Is GitLab');

    win.postMessage({
      gitlabIssuesExporter: true,
      isEnable: true,
    });
  }

  isGitLabCharacteristic() {
    let gitlabMeta = document.querySelector("head meta[property='og:site_name'][content='GitLab']");
    let headerElement = document.querySelector('header.navbar-gitlab');
    return gitlabMeta && headerElement;
  }

  isIssuesListUrl() {
    let rssFeedElement = this.getRssFeedElement();
    return rssFeedElement !== null;
  }

  getRssFeedElement() {
    if (this.rssFeedElement === undefined || this.rssFeedElement == null) {
      this.rssFeedElement = document.querySelector('div#content-body div.nav-controls.issues-nav-controls > a:first-child');
    }

    return this.rssFeedElement;
  }
}
