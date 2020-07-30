<template>
  <div class="create-note">
    <p class="tags">
      <tag></tag>
      <input class="tags" type="text" v-model="tag" />
    </p>
    <div class="date-box" v-if="showDate">
      <el-date-picker
        v-model="date"
        type="daterange"
        range-separator="~"
        start-placeholder="开始"
        end-placeholder="结束"
        prefix-icon="date-icon el-icon-date"
        value-format="yyyy-MM-dd"
        format="yyyy年MM月dd日"
      ></el-date-picker>
    </div>
    <textarea class="content" cols="30" rows="10" v-model="content"></textarea>
  </div>
</template>

<script>
import Tag from './tag'
export default {
  name: 'CreateNote',
  data () {
    return {
      tag: '',
      date: ['', ''],
      content: '',
      showDate: this.$parent.showDate
    }
  },
  components: {
    tag: Tag
  }
}
</script>

<style lang="less" scoped>
.tags {
  display: inline-flex;
  align-items: center;
  input {
    border: none;
    margin: 8px 0;
    border-bottom: 1px solid #6fb0be;
    padding: 8px;
    &:hover,
    &:focus {
      outline: none;
    }
    padding: 8px;
    color: #12344d;
  }
}

.content {
  border-color: #6fb0be;
  border-radius: 4px;
  &:hover,
  &:focus {
    outline: none;
  }
  padding: 8px;
  color: #12344d;
  resize: none;
  margin-top: 10px;
  font-size: 20px;

  &::-webkit-scrollbar {
    width: 8px;
    background-color: #eee;
    border-radius: 8px;
    cursor: pointer;
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

.date-box {
  .el-range-editor.el-input__inner {
    border: none;
  }

  /deep/ .date-icon {
    font-size: 18px;
    color: #6eb0be;
  }
}
</style>
