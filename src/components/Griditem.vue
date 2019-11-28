<template>
  <div class="grid-item grid-center">
    <div class="grid-item-content grid-center" :style="{backgroundImage:'url(' + img + ')'}">
      <div class="grid-shade grid-center">
        <span class="grid-more" v-if="icon"></span>
        <span>{{text}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["img", "icon", "text"],
  data() {
    return {};
  }
};
</script>

<style lang="stylus">
.grid-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.grid-item:before {
  display: block;
  content: ' ';
  padding-bottom: 100%;
}

.grid-item {
  width: 25%;

  .grid-item-content {
    width: 90%;
    height: 90%;
    color: #fff;
    background-repeat: no-repeat;
    background-size: cover;
    border-radius: 10%;

    .grid-shade {
      background-color: rgba(0, 0, 0, 0.5);
      border-radius: 10%;
      width: 100%;
      height: 100%;
      flex-direction: column;
    }
  }
}

.grid-more {
  background-image: url('https://a-ssl.duitang.com/uploads/people/201908/26/20190826025914_YvkKJ.png');
  width: 20px;
  height: 20px;
  background-size: 100%;
  background-repeat: no-repeat;
}
</style>