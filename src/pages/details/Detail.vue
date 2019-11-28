<template>
  <div class="detail" v-if="details">
    <div class="dimg">
      <img :src="details.photo.path" alt />
    </div>
    <div class="usermessage">
      <p class="details-msg">{{details.msg}}</p>
      <div class="user-msg-content">
        <div class="chathead" :style="{backgroundImage:`url(${details.sender.avatar})`}"></div>
        <div class="user-msg-middle">
          <span class="username">{{details.sender.username}}</span>
          <span class="root_album">收藏到 {{details.root_album.name}}</span>
        </div>
        <div class="time">{{transDate(details.add_datetime_ts)}}</div>
      </div>
    </div>
    <div class="lables">
      <div class="lables1">
        <p class="correlation">相关标签</p>
        <span class="lable" v-for="item in details.tags" :key="item.id">{{item.name}}</span>
      </div>
    </div>
    <div class="albums">
      <div class="albums_head">
        <span>收藏到以下专辑</span>
        <span class="number">{{details.favorite_count}}</span>
        <span class="arrows"></span>
      </div>
      <div class="album" v-for="item in details.related_albums" :key="item.id">
        <div class="albumImg">
          <span v-if="item.is_root" class="shoufa">首发</span>
          <img :src="item.covers" alt />
        </div>
        <p>{{item.name}}</p>
        <span>by{{item.user.username}}</span>
      </div>
    </div>
    <div class="liubai"></div>
  </div>
</template>
<script>
import { get } from "utils/http";
export default {
  data() {
    return {
      id: 0,
      details: null
    };
  },
  async created() {
    let { id } = this.$route.query;
    await this.getData(id);
  },
  methods: {
    async getData(id) {
      let { data } = await get({
        url: "/napi/blog/detail/",
        params: {
          include_fields:
            "tags,related_albums,related_albums.covers,root_album,share_links_2,extra_links,icon_description,root_id",
          blog_id: id
        }
      });
      this.details = data;
    },
    transDate(time) {
      var date = new Date(time * 1000);
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var day = date.getDate() + 1;
      return year + "年" + month + "月" + day + "日";
    }
  }
};
</script>

<style lang="stylus" scoped>
.detail {
  overflow-y: scroll;
  height: 100%;
  width: 100%;
  background: rgb(245, 245, 245);
  padding: 0.1rem 0.08rem 0.3rem;

  .dimg {
    width: 100%;
    background: #fff;

    img {
      width: 100%;
    }
  }

  .usermessage {
    background: #fff;

    .details-msg {
      font-size: 0.15rem;
      color: rgb(68, 68, 68);
      padding: 10px 0px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .user-msg-content {
      display: flex;
      flex-direction: row;
      padding-bottom: 0.13rem;

      .chathead {
        margin: 0 0.1rem;
        width: 0.36rem;
        height: 0.36rem;
        border-radius: 50%;
      }

      .user-msg-middle {
        flex: 1;
        display: flex;
        flex-direction: column;

        .username {
          margin-bottom: 0.03rem;
          line-height: 0.18rem;
          font-size: 0.13rem;
          color: rgb(68, 68, 68);
        }

        .root_album {
          font-size: 12px;
          color: rgb(119, 119, 119);
        }
      }

      .time {
        height: 0.37rem;
        line-height: 0.18rem;
        font-size: 0.11rem;
        color: rgb(170, 170, 170);
      }
    }
  }

  .lables {
    background: #fff;
    border-bottom: none;

    .lables1 {
      border-top: 0.01rem solid rgb(199, 199, 199);
      margin: 0rem 0.16rem;
      padding: 0.16rem 0rem 0.08rem;

      .correlation {
        font-size: 0.14rem;
        font-weight: 400;
        font-family: PingFangSC-Regular;
        color: rgb(170, 170, 170);
      }

      .lable {
        display: inline-block;
        position: relative;
        font-size: 0.14rem;
        text-align: center;
        padding: 0 0.15rem;
        height: 0.25rem;
        line-height: 0.25rem;
        background-color: rgb(245, 245, 245);
        margin: 0.1rem 0.1rem 0 0;
        color: #888;
        border: 0.01rem solid #ddd;
        border-radius: 0.03rem;
        box-sizing: border-box;
      }
    }
  }

  .albums {
    background: rgb(255, 255, 255);
    margin: 0.2rem 0;

    .albums_head {
      margin-left: 0.08rem;
      margin-right: 0.08rem;
      font-size: 0.16rem;
      color: rgb(119, 119, 119);
      padding: 0.1rem 0rem;
      border-bottom: 1px solid rgba(0, 0, 0, 0.08);
      position: relative;

      .number {
        display: inline-block;
        position: absolute;
        right: 0.25rem;
      }

      .arrows {
        display: inline-block;
        text-align: right;
        margin-left: 10px;
        width: 15px;
        height: 17px;
        vertical-align: bottom;
        background-image: url('https://c-ssl.duitang.com/uploads/item/201808/13/20180813160453_nWc8Q.png');
        background-size: contain;
        background-repeat: no-repeat;
        position: absolute;
        right: 0.05rem;
        top: 0.14rem;
      }
    }

    .album {
      display: flex;
      padding: 10px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.08);
      position: relative;

      .albumImg {
        width: 0.6rem;
        height: 0.6rem;
        border-radius: 4px;
        position: relative;

        .shoufa {
          position: absolute;
          top: 0px;
          left: 0px;
          background-color: rgb(242, 85, 85);
          color: rgb(255, 255, 255);
          font-size: 10px;
          text-align: center;
          line-height: 15px;
          padding: 1px 2px;
          border-radius: 4px 0px;
        }

        img {
          width: 100%;
          height: 100%;
        }
      }

      p {
        padding: 0 0.1rem;
        height: 0.22rem;
        line-height: 0.22rem;
        font-size: 0.16rem;
        color: rgb(68, 68, 68);
      }

      span {
        height: 0.22rem;
        line-height: 0.17rem;
        font-size: 0.12rem;
        color: rgb(119, 119, 119);
        position: absolute;
        bottom: 0.1rem;
        left: 0.8rem;
      }
    }
  }

  .liubai {
    width: 100%;
    height: 2rem;
  }
}
</style>