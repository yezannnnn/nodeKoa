<template>
  <div class="imageView" :style="{'height': !isEdit ? '150px' : '100%','background': !src ? '#f3f3f3' : 'none'}">
    <img v-if='!isEdit || !src' src="https://static.lianhaikeji.com/images/20210315/84ba23eb5f5748dd9dfef87ac56d7013.png" />
    <vimage v-else fit='contain' :src="src" />
  </div>
</template>
<script>
import { Image as vimage } from 'vant';

export default {
  name: 'baseComponent',
  components: {
    vimage,
  },
  props: {
    src: {
      type: String,
      default: ''
    },
    isEdit: {
      type: Boolean,
      default: true,
    },
    looks: {
      type: Object,
      default () {
        return {};
      }
    }
  },
  data() {
    return {
      styles: this.$props,

    };
  },
  methods: {
    handleClick() {
      this.$emit('on-click');
    },
  },
};

</script>
<style lang="less" scoped>
.imageView {
  display: flex;
  width: 100%;
  height: 100%;
  overflow: hidden;
  justify-content: center;
  align-items: center;
  flex-flow: column;

  .wap {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column;
  }

  img {
    width: 60px;
    -webkit-user-drag: none;
    height: 50px;
  }

  .title {
    margin-top: 10px;
    color: #bfbfbf;
  }
}

.imageH {
  height: 150px;
}

/deep/ .van-image__img {
  -webkit-user-drag: none;
}

/deep/ .van-image {
  width: 100%;
  height: 100%;
}

</style>
