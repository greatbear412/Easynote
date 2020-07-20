<template>
  <div class="node-item">
    <div class="tags">
      <p>
        <tag></tag>
        <span class="content" v-for="(tag,index) in tags" :key="index">{{tag}}</span>
      </p>
    </div>
    <div class="note">{{content}}</div>
    <el-button @click="deleteNotes()" class="delete-btn" type="danger" icon="el-icon-delete"></el-button>
  </div>
</template>

<script>
import cache from '@/api/cache'
import Tag from './tag'
export default {
  name: 'NoteItem',
  props: {
    tags: Array,
    content: String,
    id: Number
  },
  components: {
    tag: Tag
  },
  methods: {
    deleteNotes () {
      cache
        .deleteNotes(this.id)
        .then(res => {
          this.$emit('update-node-list')
        })
        .catch(err => console.log(err))
    }
  }
}
</script>

<style lang="less" scoped>
.node-item {
  position: relative;

  &:hover {
    .delete-btn {
      opacity: 1;
    }
  }
}

.tags {
  p {
    margin: 0;
    display: flex;
    align-items: center;
  }

  .content {
    background: #6eb0be;
    color: #fff;
    border-radius: 8px;
    padding: 2px 8px;
    margin-right: 10px;
    font-size: 14px;
    font-family: -apple;
  }
}

.note {
  font-size: 22px;
  font-weight: 500;
  color: #12344d;
  white-space: pre-line;
}

.delete-btn {
  position: absolute;
  bottom: 0;
  right: 10vw;
  top: 0;
  height: 40px;
  margin: auto;
  padding: 10px;
  opacity: 0;

  i {
    font-size: 18px;
  }
}
</style>
