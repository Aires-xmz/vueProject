<template>
  <div class="album-container">
    <div class="album-wrapper">
      <div class="album-content-top grid-center" v-if="handleUserInfo">
        <h5 class="album-info-tit">{{userInfo.name}}</h5>
        <span class="album-info-num">{{userInfo.count}}张图片</span>
        <div
          class="album-info-userpic"
          :style="{backgroundImage: `url(${userInfo.user.avatar})`,marginTop: '0.1rem'}"
        ></div>
        <span class="album-info-username">{{userInfo.user.username}}</span>
      </div>
      <vue-waterfall-easy
        linkRange="card"
        :isRouterLink="true"
        :imgsArr="imgsArr"
        @scrollReachBottom="getData"
      >
        <div class="album-img-info" slot-scope="props">
          <div>{{props.value.msg}}</div>
          <div>★{{props.value.fc}}</div>
        </div>
      </vue-waterfall-easy>
    </div>
  </div>
</template>

<script>
import { get } from "utils/http";
import vueWaterfallEasy from "vue-waterfall-easy";
export default {
  components: {
    vueWaterfallEasy
  },
  data() {
    return {
      album_id: 0,
      group: 0,
      more: 1,
      imgsArr: [],
      userInfo: {}
    };
  },
  computed: {
    handleUserInfo() {
      return JSON.stringify(this.userInfo) !== "{}" ? true : false;
    }
  },
  async created() {
    let { id } = this.$route.query;
    let result = await get({
      url: "/napi/album/detail/",
      params: {
        album_id: id
      }
    });
    this.album_id = id;
    this.userInfo = result.data;
    this.getData();
  },
  mounted() {},
  methods: {
    async getData() {
      let result = await get({
        url: "/napi/blog/list/by_album/",
        params: {
          start: this.group,
          limit: 24,
          more: this.more,
          album_id: this.album_id
        }
      });
      this.group = result.data.next_start;
      this.more = result.data.more;
      for (var i = 0; i < result.data.object_list.length; i++) {
        this.imgsArr.push({
          src: result.data.object_list[i].photo.path,
          href: `detail?id=${result.data.object_list[i].id}`,
          fc: result.data.object_list[i].favorite_count,
          msg: result.data.object_list[i].msg
        });
      }
    }
  }
};
</script>

<style lang="stylus">
.album-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;

  .album-wrapper {
    height: 100%;

    .album-content-top {
      padding: 0.2rem;
      background-color: white;
      margin-top: 0.04rem;
      flex-direction: column;
      font-size: 0.12rem;

      .album-info-tit {
        font-size: 0.2rem;
        line-height: 0.28rem;
      }

      .album-info-num {
        line-height: 0.17rem;
        color: #999;
        margin-top: inherit;
      }

      .album-info-userpic {
        width: 12.5%;
        padding-bottom: 12.5%;
        border-radius: 50%;
        background-size: cover;
        background-position: center center;
        background-repeat: no-repeat;
      }

      .album-info-username {
        line-height: 0.14rem;
        color: #444;
        margin-top: inherit;
      }
    }

    .album-img-info {
      padding: 0.08rem 0.08rem 0.05rem;
      border-bottom: 1px solid rgb(224, 224, 224);
      font-size: 0.12rem;
      background: #fff;
    }

    .album-img-info:first-child {
      color: rgb(68, 68, 68);
      word-break: break-all;
    }

    .album-img-info:last-child {
      color: rgb(153, 153, 153);
      margin-top: 0.05rem;
    }
  }
}
</style>