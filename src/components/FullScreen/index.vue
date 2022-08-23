<template>
  <div>
    <svg-icon
      style="margin: 0 8px"
      @click="onFullScreen"
      iconClass="fullscreen"
      className="fullscreen"
    ></svg-icon>
  </div>
</template>

<script>
import screenfull from 'screenfull'
export default {
  name: 'FullScreen',
  data() {
    return {}
  },

  created() {},

  methods: {
    onFullScreen() {
      if (screenfull.isEnabled) {
        screenfull.toggle()
      }
    }
  }
}
</script>

<style scoped lang="scss">
.fullscreen {
  color: #fff;
  cursor: pointer;
}
</style>
