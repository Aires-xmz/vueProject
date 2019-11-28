<template>
  <div>
    <div class="fav fz-12" @click="albumlink(albumid)">
      <h5>{{name}}</h5>
      <div class="star">★{{fc}}</div>
    </div>
    <div class="info" @click="routerlink(userid)">
      <div class="headerImg .grid-center">
        <img :src="pic" />
      </div>
      <div class="userinfo fz-12">
        <div class="un">{{username}}</div>
        <div>{{name}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["name", "username", "fc", "pic","userid","albumid"],
  data() {
    return {};
  },
  methods: {
    routerlink(route) {
      this.$store.commit("changeEditorId", route);
      this.$router.push(`user?id=${route}`);
    },
    albumlink(route){
      this.$store.commit("changeAlbumId", route);
      this.$router.push(`album?id=${route}`);
    }
  }
};
</script>

<style lang="stylus" >
.fz-12 {
  font-size: 12px;
}

.info {
  display: flex;
  flex-direction: row;
  padding: 8px;
  background: #fff;

  .headerImg {
    height: 100%;

    img {
      height: 0.3rem;
      width: 0.3rem;
      border-radius: 50%;
    }
  }

  .userinfo {
    display: flex;
    margin-left: 8px;
    flex-direction: column;

    .un {
      color: rgb(52, 152, 219);
    }
  }
}

.fav {
  padding: 8px 8px 5px;
  background: #fff;
  border-bottom: 1px solid rgb(224, 224, 224);

  .star {
    color: rgb(153, 153, 153);
    margin-top: 5px;
  }
}
</style>