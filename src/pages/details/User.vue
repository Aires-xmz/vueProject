<template>
  <div class="user-page">
    <div class="top-line"></div>
    <div class="user-bg-container">
      <div class="user-bg-wrapper" :style="{ backgroundImage: `url(${info.background_img_url})` }">
        <div class="user-bg-content grid-center">
          <div class="user-header-img" :style="{ backgroundImage: `url(${info.avatar})` }"></div>
          <h3 class="user-un">{{ info.username }}</h3>
          <span class="user-bg-score">
            关注
            {{ info.follow_count }}&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;粉丝{{
            info.be_follow_count
            }}
          </span>
          <span class="user-talk">{{ info.short_description }}</span>
        </div>
      </div>
    </div>
    <van-tabs v-model="tit">
      <van-tab title="动态">
        <div class="dynamic-container" v-for="(dynItem,dynIndex) in reply" :key="dynIndex">
          <div v-if="dynItem.type == 2">
            <div class="text1-top">
              <span class="text1-bg" :id="dynItem.data.atlas.sender.id">
                <img :src="dynItem.data.atlas.sender.avatar" />
              </span>
              <div class="text1-column">
                <h5 class="text1-user">{{dynItem.data.atlas.sender.username}}</h5>
                <span class="text1-time">{{dynItem.date_str}}</span>
              </div>
            </div>
            <div class="text1-main">
              <p
                class="text1-msg"
                @click="routerlink(dynItem.data.atlas.id)"
              >{{dynItem.data.atlas.desc}}</p>
              <ul class="text1-list">
                <li v-for="(blogItem,blogIndex) in dynItem.data.atlas.blogs" :key="blogIndex">
                  <span :style="{backgroundImage:`url(${blogItem.photo.path})`}" />
                </li>
              </ul>
            </div>
          </div>
          <div v-else-if="dynItem.type == 4">
            <div class="text1-top">
              <span class="text1-bg" :id="dynItem.data.article.sender.id">
                <img :src="dynItem.data.article.sender.avatar" />
              </span>
              <div class="text1-column">
                <h5 class="text1-user">{{dynItem.data.article.sender.username}}</h5>
                <span class="text1-time">{{dynItem.date_str}}</span>
              </div>
            </div>
            <div class="text1-main">
              <p class="text1-msg">{{dynItem.data.article.title}}</p>
              <div
                class="text1-article"
                :style="{backgroundImage:`url(${dynItem.data.article.cover.photo_path})`}"
              >
                <span class="text1-article-icon">文章</span>
              </div>
            </div>
          </div>
          <div v-else-if="dynItem.type == 1">
            <div class="text1-top">
              <span class="text1-bg" :id="dynItem.data.user.id">
                <img :src="dynItem.data.user.avatar" />
              </span>
              <div class="text1-column">
                <h5 class="text1-user">{{dynItem.data.user.username}}</h5>
                <span class="text1-time">{{dynItem.date_str}}</span>
              </div>
            </div>
            <div class="text1-main">
              <p class="text1-msg">
                收藏图片到专辑
                <strong>{{dynItem.data.album_name}}</strong>
              </p>
              <ul class="text1-list">
                <li v-for="(blogItem,blogIndex) in dynItem.data.show_blog_volist" :key="blogIndex">
                  <span :style="{backgroundImage:`url(${blogItem.photo.path})`}" />
                </li>
              </ul>
            </div>
          </div>
          <div v-else-if="dynItem.type == 3"></div>
        </div>
      </van-tab>
      <van-tab title="专辑">
        <div class="album-container">
          <ul class="card-wrap">
            <li class="card" v-for="(cardItem,cardIndex) in cardList" :key="cardIndex">
              <div class="cc">
                <img :src="cardItem.covers[0]" />
                <div class="cc-msg">
                  <h5>{{cardItem.name}}</h5>
                  <span>{{cardItem.count}}张图片·{{cardItem.favorite_count}}人收藏</span>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </van-tab>
      <van-tab title="收藏">
        <div class="collect-container" v-for="(msgItem,msgIndex) in msgList" :key="msgIndex">
          <div v-if="msgItem.type == 'album'">
            <div class="msg">
              <div class="msg-title">{{msgItem.title}}</div>
              <ul class="msg-grid" v-if="msgItem.photos.length">
                <li v-for="(msgImg,msgImgIndex) in msgItem.photos" :key="msgImgIndex">
                  <img :src="msgImg.path" />
                </li>
              </ul>
            </div>
            <div class="ss">
              <span>专辑&nbsp;|&nbsp;{{msgItem.sender.username}}</span>
              <span>{{msgItem.add_datetime}}</span>
            </div>
          </div>
          <div v-else-if="msgItem.type == 'atlas' || 'article' ">
            <div class="msg-manypic">
              <h3 class="msg-title">{{msgItem.title}}</h3>
              <span
                class="msg-morepic"
                :style="{backgroundImage: `url(${msgItem.photos[0].path})`}"
              ></span>
            </div>

            <div class="ss">
              <span>多图&nbsp;|&nbsp;{{msgItem.sender.username}}</span>
              <span>{{msgItem.add_datetime}}</span>
            </div>
          </div>
        </div>
      </van-tab>
      <div class="user-score">获赞与被收藏{{info.score}}次</div>
    </van-tabs>
  </div>
</template>

<script>
import { get } from "utils/http";
export default {
  data() {
    return {
      info: {},
      tit: 0,
      reply: [],
      cardList: [],
      msgList: [],
      next_start: 0,
      cardstart: 0,
      msgstart: 0,
      more: 1,
      cardMore: 1,
      msgMore: 1
    };
  },
  async created() {
    let { id } = this.$route.query;
    let result = await get({
      url: "/napi/people/profile/",
      params: {
        user_id: id
      }
    });
    this.info = result.data;
    let date = new Date();
    this.next_start = parseInt(date.getTime() / 1000) * 1000;
    this.getdata();
    this.getCard();
    this.getMsg();
  },
  methods: {
    routerlink(route) {
      this.$router.push(`atlas?id=${route}`);
    },
    async getdata() {
      let { id } = this.$route.query;
      let reply = await get({
        url: "/napi/vienna/useractivity/personal/",
        params: {
          start: this.next_start,
          limit: 24,
          more: this.more,
          user_id: id
        }
      });
      this.next_start = reply.data.next_start;
      this.more = reply.data.more;
      this.reply = reply.data.object_list;
    },
    async getCard() {
      let id = this.$route.query.id;
      let result = await get({
        url: `/napi/album/list/by_user/`,
        params: {
          start: this.cardstart,
          limit: 24,
          more: this.cardMore,
          user_id: id
        }
      });
      this.cardstart = result.data.next_start;
      this.cardMore = result.data.more;
      this.cardList = result.data.object_list;
    },
    async getMsg() {
      let id = this.$route.query.id;
      let result = await get({
        url: `/napi/favorite/list/`,
        params: {
          start: this.msgstart,
          limit: 24,
          more: this.msgMore,
          user_id: id
        }
      });
      this.msgstart = result.data.next_start;
      this.msgMore = result.data.more;
      this.msgList = result.data.object_list;
    }
  }
};
</script>

<style lang="stylus">
.user-page {
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  padding-bottom: 0.4rem;

  .top-line {
    width: 100%;
    padding: 0 0 5px;
    background-color: #f5f5f5;
  }

  .user-bg-container {
    .user-bg-wrapper {
      width: 100%;
      padding-bottom: 100%;
      background-size: cover;
      background-position: center center;
      background-repeat: no-repeat;
      position: relative;
      color: #fff;

      .user-bg-content {
        flex-direction: column;
        position: absolute;
        top: 0px;
        height: 100%;
        width: 100%;

        .user-header-img {
          width: 0.8rem;
          height: 0.8rem;
          background-size: 100%;
          border-radius: 100%;
        }

        .user-un {
          font-size: 20px;
          line-height: 25px;
          font-weight: 400;
          margin-top: 16px;
        }

        .user-bg-score {
          font-size: 13px;
          line-height: 18px;
          margin-top: 17px;
        }

        .user-talk {
          width: 90%;
          opacity: 0.8;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          text-overflow: ellipsis;
          line-height: 21px;
          text-align: center;
          margin-top: 20px;
          overflow: hidden;
        }
      }
    }
  }

  .van-tabs {
    width: 100%;
    height: 100%;

    .van-tabs__nav {
      .van-tabs__line {
        width: 33.33% !important;
        background-color: #ff7e7e;
      }
    }

    .van-tabs__content {
      display: block;
      width: 100%;
      padding-top: 30px;
      position: relative;

      .dynamic-container {
        padding: 0.22rem 0.2rem;
        border-bottom: 1px solid rgb(240, 240, 240);
        background: #fff;

        .text1-top {
          box-sizing: border-box;
          display: flex;
          flex-direction: row;

          .text1-bg {
            width: 0.3rem;
            height: 0.3rem;
            display: block;

            img {
              border-radius: 100%;
              width: 100%;
              height: 100%;
            }
          }

          .text1-column {
            margin-left: 0.06rem;
            align-items: flex-start;
            display: flex;
            flex-direction: column;

            h5 {
              font-size: 0.13rem;
              line-height: 0.18rem;
              color: rgb(119, 119, 119);
            }

            span {
              line-height: 0.12rem;
              font-size: 0.1rem;
              color: rgb(204, 204, 204);
            }
          }
        }

        .text1-main {
          padding-left: 0.35rem;
          width: 100%;

          .text1-msg {
            word-break: break-all;
            font-size: 0.16rem;
            color: rgb(68, 68, 68);
            margin-top: 0.06rem;
            width: 100%;
            overflow: hidden;
          }

          .text1-article {
            width: 100%;
            padding-bottom: 60%;
            background-size: cover;
            background-position: center center;
            background-repeat: no-repeat;
            border-radius: 3%;
            position: relative;

            .text1-article-icon {
              position: absolute;
              top: 0.12rem;
              right: 0.09rem;
              width: 0.6rem;
              height: 0.245rem;
              background-color: rgba(0, 0, 0, 0.3);
              font-size: 0.12rem;
              line-height: 0.245rem;
              text-align: center;
              color: rgb(255, 255, 255);
              border-radius: 0.5rem;
            }

            .text1-article-icon:before {
              content: '';
              margin-right: 0.04rem;
              display: inline-block;
              vertical-align: text-top;
              width: 0.15rem;
              height: 0.18rem;
              background-image: url('https://c-ssl.duitang.com/uploads/item/201805/29/20180529122532_8SrhV.png'); // c-ssl.duitang.com/uploads/item/201805/29/20180529122532_8SrhV.png);
              background-size: contain;
              background-repeat: no-repeat;
            }
          }

          .text1-list {
            margin-top: 0.08rem;
            display: flex;
            width: 100%;
            flex-wrap: wrap;
            box-sizing: border-box;

            li {
              margin-bottom: 1%;
              margin-right: 1%;
              width: 32%;
              padding-bottom: 32%;
              line-height: 0.47rem;
              text-align: center;
              border-radius: 0.04rem;
              box-sizing: border-box;
              overflow: hidden;
              position: relative;

              span {
                width: 100%;
                height: 100%;
                display: block;
                position: absolute;
                top: 0;
                left: 0;
                background-size: cover;
                background-position: center center;
                background-repeat: no-repeat;
              }
            }
          }
        }
      }

      .album-container {
        margin-top: 0.08rem;
        margin-left: 0.1rem;
        width: 100%;
        height: 100%;
        overflow: hidden;
        position: relative;

        .card-wrap {
          width: 100%;
          height: 100%;
          display: flex;
          flex-wrap: wrap;
          box-sizing: border-box;

          .card {
            box-sizing: border-box;
            width: 45%;
            height: 2.2rem;
            margin-bottom: 0.08rem;
            font-size: 0.12rem;
            padding-bottom: 0px;
            color: rgb(51, 51, 51);
            overflow: hidden;
            margin-right: 3%;
            border-radius: 5px;

            .cc {
              width: 100%;
              height: 100%;
              display: flex;
              flex-direction: column;
              position: relative;

              img {
                width: 100%;
              }

              .cc-msg {
                padding: 0.12rem 0.08rem;
                border-bottom: 1px solid rgb(224, 224, 224);
                background: #fff;
                position: absolute;
                bottom: 0;
                width: 100%;

                h5 {
                  font-size: 0.12rem;
                  color: rgb(51, 51, 51);
                  margin: 0px;
                  padding: 0px;
                }

                span {
                  color: rgb(153, 153, 153);
                  margin-top: 0.05rem;
                }
              }
            }
          }
        }
      }

      .collect-container {
        align-items: center;
        display: flex;
        flex-direction: column;
        padding: 0.15rem 0.15rem 0.12rem;
        border-bottom: 1px solid rgb(240, 240, 240);
        background: #fff;

        >div {
          width: 100%;
          height: 100%;
        }

        .msg-manypic {
          display: flex;
          justify-content: space-between;

          .msg-morepic {
            display: inline-block;
            position: relative;
            width: 60px;
            height: 60px;
            border-radius: 4px;
            background-position: center;
            background-size: cover;
          }
        }

        .msg {
          width: 100%;
          position: relative;
          display: flex;
          flex-direction: column;

          .msg-title {
            width: 90%;
            display: block;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-size: 0.15rem;
            font-weight: 400;
            line-height: 0.2rem;
            color: rgb(68, 68, 68);
            overflow: hidden;
          }

          .msg-grid {
            margin-top: 0.08rem;
            background: #fff;
            display: flex;
            flex-wrap: wrap;

            li {
              width: 25%;
              padding: 0px 0px 4px 4px;
              position: relative;
              width: 0.8rem;
              height: 0.8rem;
              border-radius: 4px;
              overflow: hidden;

              img {
                width: 100%;
                height: 100%;
              }
            }
          }
        }

        .ss {
          width: 100%;
          margin-top: 0.09rem;
          font-size: 0.11rem;
          color: rgb(119, 119, 119);
          justify-content: space-between;
          align-items: center;
          display: flex;

          span {
            font-size: 0.11rem;
            color: rgb(119, 119, 119);
          }
        }
      }
    }
  }

  .user-score {
    height: 30px;
    box-sizing: border-box;
    font-size: 12px;
    line-height: 30px;
    color: rgb(170, 170, 170);
    background-color: rgb(245, 245, 245);
    padding: 0px 20px;
    width: 100%;
    position: absolute;
    top: 0;
  }
}
</style>
