<template>
  <div class="popup-gitlab">
    <p>Gitlab</p>
    <button v-on:click="download">Download</button>
  </div>
</template>

<script>
export default {
  name: 'Gitlab',
  data: () => {
    return {
      executedDownloadScript: false,
    };
  },
  methods: {
    getCurrentActiveTab() {
      return browser.tabs.query({
        active: true,
        currentWindow: true,
      });
    },
    download() {
      console.log('download');
      if (!this.executedDownloadScript) {
        this.executedDownloadScript = true;
        let currenting = this.getCurrentActiveTab();
        let currentTab;

        let executing = currenting.then(tab => {
          currentTab = tab;
          return browser.tabs.executeScript(tab.id, {
            file: '/content-scripts/download.js',
          });
        });
        executing
          .then(() => {
            console.log('success');
            console.log('current tab id = ' + currentTab.id);
            browser.runtime.sendMessage(currentTab.id, {
              type: 'download_gitlab_issues',
              payload: null,
            });
          })
          .catch(() => {
            console.log('failed');
            this.executedDownloadScript = false;
          });
      }
    },
  },
};
</script>

<style scoped></style>
