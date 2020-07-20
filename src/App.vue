<template>
  <div id="app">
    <Header />
    <router-view class="rv" />
  </div>
</template>

<script>
import Header from '@/components/Header.vue'

// @ is an alias to /src
export default {
  name: 'learn',
  components: {
    Header
  }
}
</script>

<style lang="less">
body {
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
}

.rv {
  position: absolute;
  top: 80px;
  bottom: 0;
  overflow: auto;
  left: 0;
  right: 0;
  padding-left: 40vh;
  text-align: left;
  &::-webkit-scrollbar {
    width: 8px;
    background-color: #eee;
    border-radius: 8px;
  }

  &::-webkit-scrollbar-track {
    background-color: #eee;
  }

  &::-webkit-scrollbar-thumb {
    background: #6fb0be;
  }
  &::-webkit-scrollbar-thumb:vertical {
    height: 12px;
    background-color: #6fb0be;
    -webkit-border-radius: 8px;
  }
}

#app {
  font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

.sn-primary-btn {
  color: #fff;
  background-color: #6fb0be;
  border-color: #6fb0be;
  &:hover,
  &:focus {
    color: #fff;
    background-color: #52a9bb;
    border-color: #52a9bb;
    cursor: pointer;
  }
}
</style>
