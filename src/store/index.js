import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentIndex:0,
    editorId:0,
    albumId:0,
    tagList: [
      {
        img:
          "https://c-ssl.duitang.com/uploads/people/201908/26/20190826020025_n5S2v.png",
        text: "壁纸",
        to: "5d5cf9260c14a94a3155e254"
      },
      {
        img:
          "https://c-ssl.duitang.com/uploads/people/201908/26/20190826020847_Kf2A5.png",
        text: "头像",
        to: "5d4cde1a405dd99416c2afbd"
      },
      {
        img:
          "https://c-ssl.duitang.com/uploads/people/201908/26/20190826021642_LNWyY.png",
        text: "表情",
        to: "5d4bf0ed405dd99416c2af6f"
      },
      {
        img:
          "https://c-ssl.duitang.com/uploads/people/201908/26/20190826021031_TZet2.png",
        text: "文字",
        to: "5d4cdeba405dd99416c2afbe"
      },
      {
        img:
          "https://c-ssl.duitang.com/uploads/people/201908/26/20190826021100_PjnFC.png",
        text: "爱豆",
        to: "5d4cdbf0405dd99416c2afb7"
      },
      {
        img:
          "https://c-ssl.duitang.com/uploads/people/201908/26/20190826020723_xswVH.png",
        text: "影视",
        to: "5d4cdcdc405dd99416c2afb9"
      },
      {
        img:
          "https://c-ssl.duitang.com/uploads/people/201908/26/20190826021141_yh3sj.png",
        text: "动漫",
        to: "5d4cdd82405dd99416c2afbb"
      },
      {
        img:
          "https://c-ssl.duitang.com/uploads/people/201908/26/20190826021521_PhVBW.png",
        text: "更多分类",
        to: "more",
        icon: 1
      }
    ],
  },
  mutations: {
    changeIndex (state,number) {
      state.currentIndex = number;
    },
    changeEditorId(state,number){
      state.editorId = number
    },
    changeAlbumId(state,number){
      state.albumId = number
    }
  },
  actions: {
  },
  modules: {
  }
})
