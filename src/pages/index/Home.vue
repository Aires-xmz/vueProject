<template>
  <div id="shouye">
    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="(v, index) in banners" :key="index">
        <img :src="v.small_image" />
      </van-swipe-item>
    </van-swipe>
    <div class="grid-container">
      <grid-item
        v-for="(griditem, index) in tagList"
        :img="griditem.img"
        :icon="griditem.icon"
        :text="griditem.text"
        :key="index"
        @click.native="handlename(index)"
      ></grid-item>
    </div>
    <vue-waterfall-easy
      linkRange="img"
      :isRouterLink="true"
      :imgsArr="imgsArr"
      @scrollReachBottom="getData"
    >
      <wf-text
        slot-scope="props"
        :fc="props.value.fc"
        :name="props.value.nm"
        :username="props.value.un"
        :pic="props.value.pic"
        :userid="props.value.userid"
        :albumid="props.value.albumid"
      ></wf-text>
    </vue-waterfall-easy>
  </div>
</template>

<script>
import { get } from "utils/http";
import GridItem from "components/Griditem";
import WfText from "components/WfText";
import vueWaterfallEasy from "vue-waterfall-easy";
export default {
  components: {
    GridItem,
    WfText,
    vueWaterfallEasy
  },
  data() {
    return {
      group: 0,
      banners: [],
      imgsArr: [],
      tagList: this.$store.state.tagList
    };
  },
  computed: {},
  async created() {
    let result = await get({
      url: "/napi/mbanner/?app_code=mdt"
    });
    this.banners = result.data.object_list;
    this.getData();
  },
  mounted() {},
  methods: {
    handlename(name) {
      if (name !== this.tagList.length - 1) {
        this.$store.commit("changeIndex", name);
        this.currentPage = name;
        this.$router.push(
          `Other?id=${this.tagList[name].to}&title=${this.tagList[name].text}`
        );
      }else{
        this.$router.push(
          'classify'
        );
      }
    },
    async getData() {
      let resWF = await get({
        url: "/napi/index/hot/",
        params: {
          start: this.group,
          limit: 24,
          more: 1,
          include_fields: "sender%2Calbum"
        }
      });
      for (var i = 0; i < resWF.data.object_list.length; i++) {
        this.imgsArr.push({
          src: resWF.data.object_list[i].photo.path,
          href: `detail?id=${resWF.data.object_list[i].id}`,
          fc: resWF.data.object_list[i].album.favorite_count,
          nm: resWF.data.object_list[i].album.name,
          un: resWF.data.object_list[i].sender.username,
          pic: resWF.data.object_list[i].sender.avatar,
          userid: resWF.data.object_list[i].sender_id,
          albumid: resWF.data.object_list[i].album.id
        });
      }
      this.group = resWF.data.next_start;
    }
  }
};
</script>

<style lang="stylus">
#shouye {
  height: 100%;
  overflow-y: scroll;

  .van-swipe {
    padding-bottom: 50%;
    position: relative;

    .van-swipe__track {
      position: absolute;
      top: 0;
      left: 0;

      .van-swipe-item {
        background: #ff7e7e;

        img {
          width: 100%;
        }
      }
    }
  }
}

.grid-container {
  padding: 7px 15px 17px 15px;
  background-color: white;
  display: flex;
  flex-wrap: wrap;
}
</style>
