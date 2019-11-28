<template>
  <div class="classify">
    <div v-for="ify in ifyList" :key="ify.group_id">
      <ul>
        <li v-for="item in ify.group_items" :key="item.name">
          <router-link :to="`Other${item.target}&title=${item.name}`">{{item.name}}</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { get } from "utils/http";
export default {
  data() {
    return {
      classifyList: []
    };
  },
  computed: {
    ifyList: function() {
      return this.classifyList.filter(function(item) {
        if (item.group_items.length !== 0) return item;
      });
    }
  },
  async created() {
    let result = await get({
      url: "/napi/index/groups/",
      params: {
        app_version: 14,
        app_code: "mdt"
      }
    });
    for (var j = 0; j < result.data.length; j++) {
      for (var i = 0; i < result.data[j].group_items.length; i++) {
        result.data[j].group_items[i].target = result.data[j].group_items[i].target.match(/\?id\=[a-zA-Z0-9]+/)[0];
      }
    }

    this.classifyList = result.data;
  }
};
</script>

<style lang="stylus">
.classify {
  display: flex;
  flex-wrap: wrap;
  background: #fff;

  >div {
    width: 50%;
    border-bottom: 1px solid #ccc;
  }

  >div:nth-child(even) {
    border-left: 1px solid #ccc;
  }

  ul {
    width: 100%;
    margin-top: 14px;

    li {
      width: 100%;

      a {
        color: rgb(51, 51, 51);
        display: block;
        margin-left: 21px;
        margin-bottom: 14px;
        font-size: 16px;
      }

      a::before {
        content: '';
        display: inline-block;
        width: 6px;
        height: 6px;
        margin: 0px 12px 2px 0px;
        background-color: rgb(131, 192, 174);
        border-radius: 6px;
      }
    }
  }
}
</style>