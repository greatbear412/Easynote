<template>
  <div class="calender">
    <full-calendar
      first-day="1"
      :events="fcEvents"
      locale="zh"
      @eventClick="eventClick"
      @dayClick="dayClick"
      @moreClick="moreClick"
    >
      <template v-slot:fc-body-card class="fc-body-card">
        <div
          class="fc-body-card"
          v-show="showDetail"
          :style="{left: mouse.left + 'px', top: mouse.top + 'px'}"
        >
          <p class="fc-event-box event-date">
            <span>{{curEvent.start}} ~ {{curEvent.end}}</span>
          </p>
          <p class="fc-event-box event-content mgt4" v-if="curEvent.YOUR_DATA">
            <i class="icon circle"></i>
            <span>{{ curEvent.YOUR_DATA }}</span>
          </p>
          <p class="actions">
            <svg v-if="!curEvent.finish" aria-hidden="true" class="icon finish" @click="updateEvent('finish')">
              <use xlink:href="#icon-finish" />
            </svg>
            <svg v-else aria-hidden="true" class="icon finish" @click="updateEvent('nope')">
              <use xlink:href="#icon-cancel-line" />
            </svg>
            <el-button
              @click="deleteEvent()"
              class="delete-btn"
              type="danger"
              icon="el-icon-delete"
            ></el-button>
          </p>
        </div>
      </template>
    </full-calendar>
  </div>
</template>

<script>
import cache from '@/api/cache'
import CreateNote from '@/components/CreateNote'
import fullCalendar from 'vue-fullcalendar'
import { slimObject } from '@/utils/index'
export default {
  name: 'Calendar',
  components: {
    'full-calendar': fullCalendar
  },
  data () {
    return {
      fcEvents: [],
      curEvent: { cssClass: [] },
      showDetail: false,
      mouse: {
        left: 0,
        top: 0
      }
    }
  },
  mounted () {
    setTimeout(() => {
      this.getEvents()
    }, 500)
  },
  methods: {
    getEvents () {
      cache
        .getData('calendar')
        .then(res => {
          console.log(res)
          this.fcEvents = res
        })
        .catch(err => console.log(err))
    },
    dayClick (day) {
      if (this.showDetail) {
        this.showDetail = false
      } else {
        const h = this.$createElement
        this.$msgbox({
          message: h(CreateNote, { key: cache.key++ }),
          confirmButtonText: '提交',
          confirmButtonClass: 'sn-primary-btn',
          showDate: true,
          day: day,
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              const data = instance.$children[instance.$children.length - 1]
              if (data.tag) this.create(data.tag, data.content, data.date)
              this.getEvents()
              done()
            } else {
              done()
            }
          }
        })
      }
    },
    create (title, content, date) {
      cache
        .createEvent(title, content, date)
        .then()
        .catch(err => console.log(err))
    },
    eventClick (event, jsEvent, pos) {
      // if (event.YOUR_DATA) {
      this.showDetail = true
      this.mouse = pos
      this.curEvent = event
      // }
    },
    moreClick (day, events, jsEvent) {
      this.showDetail = false
    },
    deleteEvent () {
      cache
        .deleteEvent(this.curEvent._id)
        .then(res => {
          this.getEvents()
          this.showDetail = false
        })
        .catch(err => console.log(err))
    },
    updateEvent (cssClass) {
      let data = Object.assign(this.curEvent, {
        cssClass: cssClass,
        finish: cssClass === 'finish',
        updateTime: new Date().toLocaleString()
      })
      data = slimObject(data, ['cellIndex', 'isShow'])
      cache
        .finishEvent(this.curEvent._id, data)
        .then(res => {
          this.getEvents()
          this.showDetail = false
        })
        .catch(err => console.log(err))
    }
  }
}
</script>

<style lang="less" scoped>
.fc-body-card {
  position: absolute;
  z-index: 99;
  background: #fff;
  padding: 18px;
  line-height: 24px;
  border-radius: 4px;
  -moz-box-shadow: 0px 2px 5px #333333;
  -webkit-box-shadow: 0px 2px 5px #333333;
  box-shadow: 0px 2px 5px #333333;
  white-space: pre;
}

.fc-event-box {
  display: flex;
  align-items: baseline;
  padding-right: 100px;

  .icon {
    width: 26px;
    height: 26px;
    margin-right: 8px;
  }

  .circle {
    border-radius: 50%;
    background: #008057;
    width: 8px;
    height: 8px;
    display: inline-block;
  }

  &.event-date {
    color: #484848;
  }
}

.actions {
  display: flex;
  align-items: center;
  justify-content: flex-end;

  .finish {
    width: 24px;
    height: 24px;
    opacity: 0.5;
    &:hover {
      cursor: pointer;
      opacity: 1;
    }
  }
  .delete-btn {
    padding: 4px;
    opacity: 0.5;
    &:hover {
      opacity: 1;
    }
  }
}

/deep/ .event-item {
  background-color: #f0fd0d !important;

  &.finish {
    background-color: #a3ff85 !important;
  }
}
</style>
