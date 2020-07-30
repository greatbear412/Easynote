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
@theme-color:#6fb0be;
@theme-color-deep:#52a9bb;
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
  padding: 0 40vh;
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
    background: @theme-color;
  }
  &::-webkit-scrollbar-thumb:vertical {
    height: 12px;
    background-color: @theme-color;
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
  background-color: @theme-color;
  border-color: @theme-color;
  &:hover,
  &:focus {
    color: #fff;
    background-color: @theme-color-deep;
    border-color: @theme-color-deep;
    cursor: pointer;
  }
}

.el-date-table td.end-date span, .el-date-table td.start-date span {
  background-color: @theme-color
}

.el-date-table td.today span {
  color: @theme-color-deep;
}

.mgt4{
  margin-top: 4px !important;
}
</style>
