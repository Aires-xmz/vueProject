<template>
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
</template>

<script>
import { get } from "utils/http";
import WfText from "components/WfText";
import vueWaterfallEasy from "vue-waterfall-easy";
export default {
  components: {
    WfText,
    vueWaterfallEasy
  },
  data() {
    return {
      currentIndex: this.$store.state.currentIndex,
      group: 0,
      imgsArr: [],
      tagList: this.$store.state.tagList
    };
  },
  async created() {
    this.getData();
  },
  methods: {
    routerlink(route) {
      this.$store.commit("changeEditorId", route);
      this.$router.push(`user?id=${route}`);
    },
    async getData() {
      let { id } = this.$route.query;
      let resWF = await get({
        url: "/napi/blog/list/by_category/",
        params: {
          start: this.group,
          limit: 24,
          more: 1,
          include_fields: "sender,album,like_count,msg",
          cate_key: id
        }
      });
      if (resWF.data.object_list.length == 0) this.$route.go(-1);

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

<style lang="stylus" scoped></style>