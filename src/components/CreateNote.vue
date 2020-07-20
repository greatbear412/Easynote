<template>
  <div class="create-note">
    <p class="tags">
      <tag></tag>
      <input class="tags" type="text" v-model="tag" />
    </p>
    <textarea class="content" cols="30" rows="10" v-model="content"></textarea>
  </div>
</template>

<script>
import cache from '@/api/cache'
import Tag from './tag'
export default {
  name: 'CreateNote',
  data () {
    return {
      tag: '',
      content: ''
    }
  },
  components: {
    tag: Tag
  },
  methods: {
    create () {
      cache
        .createNotes(this.tag, this.content)
        .then(res => {
          this.clear()
        })
        .catch(err => console.log(err))
    },
    clear () {
      this.tag = ''
      this.content = ''
    }
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
</style>
