<template>
  <div class="atlas-container">
    <div class="atlas-info" v-if="handleInfo">
      <div class="atlas-info-content">
        <router-link :to="`user?id=${info.sender.id}`">
          <div
            class="atlas-info-content-userpic bg-reset"
            :style="{backgroundImage:`url(${info.sender.avatar})`}"
          ></div>
          <div class="atlas-info-content-text">
            <h3>{{info.sender.username}}</h3>
            <div class="atlas-info-date-score">
              <span>{{transDate(info.created_at)}}</span>
              <i>●</i>
              <span>浏览 {{info.visit_count}}</span>
            </div>
          </div>
        </router-link>
      </div>
      <h2>{{info.desc}}</h2>
      <div class="atlas-info-imglist">
        <div
          class="bg-reset"
          v-for="imgItem in info.blogs"
          :key="imgItem.id"
          :style="{backgroundImage:`url(${imgItem.photo.path})`}"
        ></div>
      </div>
      <div class="atlas-info-line"></div>
      <div class="atlas-collect-container">
        <router-link :to="`album?id=${info.album.id}`">
          <div
            class="altas-collect-img bg-reset"
            :style="{backgroundImage:`url(${info.album.covers[0]})`}"
          ></div>
          <div>
            <h3>收藏至专辑 {{info.album.name}}</h3>
            <div class="altas-collect-number">
              {{info.album.count}}张图片&nbsp;
              <i></i>
              &nbsp; {{info.album.like_count}}人收藏
            </div>
          </div>
        </router-link>
      </div>
      <div class="tags-container" v-if="info.tags">
        <h4>相关标签</h4>
        <div class="tags-list">
          <router-link to="home" v-for="tagItem in info.tags" :key="tagItem.id">
            <div class="tags-item">
              <div class="tags-item-text">{{tagItem.name}}</div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
    <div class="atlas-comment">
      <div class="atlas-comment-tit">所有评论</div>
      <div class="atlas-comment-list" v-if="topic.length !== 0">
        <div class="atlas-comment-item" v-for="comItem in topic" :key="comItem.id">
          <div class="bg-reset" :style="{backgroundImage:`url(${comItem.sender.avatar})`}"></div>
          <div>
            <div>{{comItem.sender.username}}</div>
            <div>{{comItem.create_time_str}}</div>
            <div>{{comItem.content}}</div>
            <span>
              <i></i>
              <em>{{comItem.like_count}}</em>
            </span>
            <div v-if="comItem.replies" class="atlas-comment-replies">
              <div v-for="repItem in comItem.replies" :key="repItem.id">
                <div class="atlas-replies-content">
                  {{repItem.sender.username}}&nbsp;
                  <em>
                    <i>作者</i>
                  </em>:&nbsp;
                  <span>{{repItem.content}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { get } from "utils/http";
export default {
  data() {
    return {
      info: {},
      topic: [],
      start: 0,
      more: 1
    };
  },
  computed: {
    handleInfo() {
      return JSON.stringify(this.info) !== "{}" ? true : false;
    },
    topicArr() {
      return this.topic.length !== 0 ? true : false;
    }
  },
  created() {
    this.getRes();
    this.getTopic();
  },
  methods: {
    transDate(time) {
      var date = new Date(time);
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var day = date.getDate() + 1;
      return year + "年" + month + "月" + day + "日";
    },
    async getRes() {
      let { id } = this.$route.query;
      let result = await get({
        url: "/napi/vienna/atlas/detail/",
        params: {
          atlas_id: id
        }
      });
      this.info = result.data;
    },
    async getTopic() {
      let { id } = this.$route.query;
      let result = await get({
        url: "/napi/vienna/comment/list/",
        params: {
          start: this.start,
          limit: 24,
          more: this.more,
          subject_type: 23,
          subject_id: id,
          topic_id: id
        }
      });
      this.start = result.data.next_start;
      this.more = result.data.more;
      this.topic = result.data.object_list;
    }
  }
};
</script>

<style lang="stylus">
.bg-reset {
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
}

.atlas-container {
  height: 100%;
  background: #fff;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;

  .atlas-info {
    .atlas-info-content {
      width: 100%;
      padding: 20px 20px 0px;

      a {
        display: flex;

        .atlas-info-content-userpic {
          width: 0.4rem;
          height: 0.4rem;
          margin: 0 0.06rem 0 0;
          border-radius: 50%;
        }

        .atlas-info-content-text {
          flex: 1;

          h3 {
            line-height: 0.21rem;
            font-size: 0.15rem;
            font-weight: 700;
            color: rgb(119, 119, 119);
          }

          .atlas-info-date-score {
            line-height: 0.17rem;
            font-size: 0.12rem;
            color: rgb(204, 204, 204);
          }
        }
      }
    }

    h2 {
      font-size: 0.16rem;
      font-weight: 400;
      color: rgb(68, 68, 68);
      overflow-wrap: break-word;
      word-break: break-all;
      margin: 0.12rem 0.2rem 0;
      overflow: hidden;
    }

    .atlas-info-imglist {
      padding-bottom: 14px;
      margin: 3px 15px 0px 20px;
      display: flex;
      flex-wrap: wrap;

      div {
        width: 31.3%;
        padding-bottom: 31.3%;
        margin: 1%;
      }
    }

    .atlas-info-line {
      padding-top: 0.12rem;
      border-bottom: 1px solid #ccc;
      margin-bottom: 0.12rem;
    }

    .atlas-collect-container {
      a {
        display: flex;
        -webkit-box-pack: start;
        justify-content: flex-start;
        -webkit-box-align: center;
        align-items: center;
        margin: 0.16rem 0.2rem 0;
        flex-flow: row nowrap;
        border-width: 0.01rem;
        border-style: solid;
        border-color: rgb(230, 230, 230);
        border-image: initial;
        border-radius: 0.06rem;

        .altas-collect-img {
          width: 0.6rem;
          height: 0.6rem;
          margin: 0.1rem 0.08rem 0.1rem 0.1rem;
          border-radius: 0.04rem;
        }

        h3 {
          line-height: 0.21rem;
          font-size: 0.15rem;
          font-weight: 700;
          color: rgb(119, 119, 119);
        }

        .altas-collect-number {
          font-size: 0.14rem;
          color: rgb(170, 170, 170);
          margin-top: 0.12rem;
        }
      }
    }

    .tags-container {
      margin: 16px 0px 0px;
      padding: 0px 10px 16px 20px;
      border-bottom: 1px solid rgb(240, 240, 240);

      h4 {
        font-size: 14px;
        font-weight: 400;
        font-family: PingFangSC-Regular;
        color: rgb(170, 170, 170);
      }

      .tags-list {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-flow: row wrap;

        .tags-item {
          font-size: 14px;
          text-align: center;
          padding: 0 15px;
          height: 25px;
          line-height: 25px;
          box-sizing: border-box;
          background-color: #eee;
          color: #888;
          border: 1PX solid #ddd;
          border-radius: 3px;
          margin: 10px 10px 0px 0px;
        }
      }
    }
  }

  .atlas-comment {
    .atlas-comment-tit {
      background-color: rgb(255, 255, 255);
      color: rgb(119, 119, 119);
      font-size: 0.14rem;
      padding: 0.2rem 0.15rem 0.06rem;
    }

    .atlas-comment-item {
      cursor: pointer;
      display: flex;
      padding: 15px 0px 15px 15px;
      overflow: hidden;
      border-bottom: 1px solid rgba(0, 0, 0, 0.08);

      >div:first-child {
        width: 0.4rem;
        height: 0.4rem;
        margin: 0 0.06rem 0 0;
        border-radius: 50%;
      }

      >div:last-child {
        flex: 1;
        padding-right: 0.15rem;
        position: relative;

        >span {
          padding-right: 15px;
          position: absolute;
          top: 10px;
          left: auto;
          right: 0px;
          display: flex;
          justify-content: flex-end;
          width: 80px;
          height: 30px;
          font-size: 13px;
          color: rgb(170, 170, 170);
          margin: -8px 0px 0px;

          >i {
            float: left;
            width: 30px;
            height: 30px;
            background-image: url('https://c-ssl.duitang.com/uploads/people/201608/31/20160831103240_Br5RN.png');
            background-size: 68px 68px;
            background-position: -104px -2px;
            animation: 0.3s ease 0s 1 normal none running zoom;
          }

          >em {
            float: left;
            line-height: 13px;
            font-size: 13px;
            font-style: normal;
            color: rgb(170, 170, 170);
            margin: 10px 0px 0px;
          }
        }

        >div:first-child {
          font-weight: 700;
          font-size: 13px;
          padding-top: 2px;
          line-height: 18px;
          color: rgb(68, 68, 68);
        }

        >div:nth-child(2) {
          line-height: 16px;
          font-size: 11px;
          color: rgb(170, 170, 170);
        }

        >div:nth-child(3) {
          overflow-wrap: break-word;
          word-break: break-all;
          line-height: 24px;
          padding-right: 15px;
          font-size: 15px;
          color: rgb(68, 68, 68);
        }

        .atlas-comment-replies {
          background-color: rgba(0, 0, 0, 0.03);
          margin: 10px 15px 0px 0px;
          padding: 7px;
          border-radius: 4px;

          .atlas-replies-content {
            position: relative;
            line-height: 20px;
            overflow-wrap: break-word;
            word-break: break-all;
            font-size: 13px;
            color: rgb(255, 89, 89);
            padding: 4px 3px 0px;

            > em {
              margin-top: -2px;
              display: inline-block;
              vertical-align: middle;
              position: relative;
              width: 28px;
              height: 16px;
              font-style: normal;
              line-height: 30px;
              overflow: hidden;

              i {
                display: block;
                font-style: normal;
                font-size: 18px;
                transform: scale(0.5);
                transform-origin: 0px 0px;
                line-height: 26px;
                width: 52px;
                text-align: center;
                color: rgb(255, 89, 89);
                border-radius: 4px;
                border: 2px solid rgb(255, 89, 89);
              }
            }

            >span {
              color: rgb(68, 68, 68);
            }
          }
        }
      }
    }
  }
}
</style>