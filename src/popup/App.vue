<template>
  <div class="popup p-4">
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style lang="scss">
@import '~tailwindcss/tailwind';

.popup {
  min-width: 240px;
  width: auto;
}
</style>
