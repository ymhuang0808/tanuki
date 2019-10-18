<template>
  <div class="popup-gitlab flex flex-col justify-center">
    <p class="text-center text-white font-bold mb-4 -mt-4 -mx-4 p-4 bg-gi-purple">GitLab issues</p>
    <button class="text-sm text-white bg-gi-orange p-2 rounded inline-flex items-center justify-center" v-on:click="download">
      <svg class="mr-2 text-white fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
        <path
          class="heroicon-ui"
          d="M11 14.59V3a1 1 0 0 1 2 0v11.59l3.3-3.3a1 1 0 0 1 1.4 1.42l-5 5a1 1 0 0 1-1.4 0l-5-5a1 1 0 0 1 1.4-1.42l3.3 3.3zM3 17a1 1 0 0 1 2 0v3h14v-3a1 1 0 0 1 2 0v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3z"
        />
      </svg>
      Download
    </button>
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
