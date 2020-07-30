<template>
  <div class="note">
    <div class="note-list">
      <note-item
        class="item"
        v-for="item in nodeData"
        :key="item._id"
        :id="item._id"
        :tags="item.tags"
        :content="item.content"
        @update-node-list="getNotes()"
      ></note-item>
    </div>
    <div class="create-button" @click="open()">
      <svg aria-hidden="true" class="icon">
        <use xlink:href="#icon-Addto" />
      </svg>
    </div>
  </div>
</template>

<script>
import cache from '@/api/cache'
import CreateNote from '@/components/CreateNote'
import NoteItem from '@/components/NoteItem'
export default {
  name: 'Note',
  components: {
    'note-item': NoteItem
  },
  data () {
    return {
      nodeData: []
    }
  },
  mounted () {
    setTimeout(() => {
      this.getNotes()
    }, 500)
  },
  methods: {
    getNotes () {
      cache
        .getData('note')
        .then(res => {
          this.nodeData = res.map(item => {
            item.tags = item.tags.split(' ')
            return item
          })
        })
        .catch(err => console.log(err))
    },
    open () {
      const h = this.$createElement
      this.$msgbox({
        message: h(CreateNote, { key: cache.key++ }),
        confirmButtonText: '提交',
        confirmButtonClass: 'sn-primary-btn',
        showDate: false,
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            const data = instance.$children[instance.$children.length - 1]
            if (data.content) this.create(data.tag, data.content)
            this.getNotes()
            done()
          } else {
            done()
          }
        }
      })
    },
    create (tag, content) {
      cache
        .createNotes(tag, content)
        .then()
        .catch(err => console.log(err))
    }
  }
}
</script>

<style lang="less" scoped>
.note-list {
  .item {
    padding: 20px 0;
  }
}

.create-button {
  position: fixed;
  bottom: 2vh;
  left: 0;
  right: 0;
  margin: auto;
  width: 50px;
  height: 50px;

  &:hover {
    cursor: pointer;
  }

  .icon {
    width: 100%;
    height: 100%;
  }
}
</style>
