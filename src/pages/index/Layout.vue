<template>
  <div class="index-wrap">
    <div class="header">
      <router-link to="home" class="sy">首页</router-link>|
      <van-tabs v-model="currentPage" @click="handlename">
        <van-tab v-for="(tagitem,index) in tabList" :key="index" :title="tagitem.text"></van-tab>
      </van-tabs>
    </div>
    <div style="padding-bottom:.05rem"></div>
    <main>
      <router-view :key="key"></router-view>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentPage: 0,
      tagList: this.$store.state.tagList,
      underline: null
    };
  },
  mounted() {
    this.underline = document.querySelector(".header .van-tabs__line");
    this.underline.style.display = "none";
  },
  computed: {
    tabList: function() {
      return this.tagList.filter(function(item) {
        if (item.text !== "更多分类") return item.text;
      });
    },
    key() {
      return this.tagList[this.currentPage].to
    }
  },
  watch: {
    $route: function() {
      if (this.$route.path === "/index/Other") {
        this.underline.style.display = "block";
      } else {
        this.underline.style.display = "none";
      }
    }
  },
  methods: {
    handlename(name) {
      this.$store.commit("changeIndex", name);
      this.currentPage = name;
      if (this.tagList[name].to !== "more")
        this.$router.push(
          `Other?id=${this.tagList[name].to}&title=${this.tagList[name].text}`
        );
    }
  }
};
</script>

<style lang='stylus'>
.index-wrap {
  height: 100%;
  display: flex;
  flex-direction: column;

  .header {
    height: 43px;
    margin-bottom: 2px;
    padding-left: 12px;
    padding-right: 12px;
    background-color: white;
    display: flex;
    align-items: center;
    position: relative;
    top: 0;
    z-index: 999999;

    .sy {
      width: 20%;
      flex-shrink: 0;
      text-align: center;
      font-size: 15px;
      color: rgb(119, 119, 119);
      font-weight: bold;
    }

    .van-tabs {
      width: 80%;

      .van-tabs__nav {
        .van-tab {
          flex-basis: 25% !important;
          width: 25%;
        }

        .van-tabs__line {
          width: 25% !important;
        }

        .van-tabs__content {
          display: none;
        }
      }
    }
  }

  main {
    flex: 1;
    height: 100%;
  }
}
</style>