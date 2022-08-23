<template>
  <el-dropdown @command="onCommand">
    <span class="el-dropdown-link">
      <svg-icon style="color: #fff; font-size: 20px" icon-class="language" />
    </span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item
        v-for="(value, key) in messages"
        :key="key"
        :command="key"
        :disabled="key === $i18n.locale"
        >{{ value.name }}</el-dropdown-item
      >
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import { messages } from '@/i18n'
import Cookie from 'js-cookie'
export default {
  name: 'ToggleLang',
  data() {
    return {
      messages
    }
  },

  created() {},

  methods: {
    onCommand(val) {
      this.$root.$i18n.locale = val
      Cookie.set('lang', val)
      this.$router.go(0)
    }
  }
}
</script>

<style scoped lang="scss"></style>
