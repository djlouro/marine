<template>
  <CSidebar 
    fixed 
    :minimize="minimize"
    :show="show"
    @update:show="(value) => $store.commit('set', ['sidebarShow', value])"
  >
    <CSidebarBrand class="d-md-down-none" to="/">
      <img class="c-sidebar-brand-full" :height="35" 
        viewBox="0 0 556 134" src="https://logos-download.com/wp-content/uploads/2017/01/West_Marine_logo_logotype.png">
    </CSidebarBrand>

    <CRenderFunction flat :content-to-render="sidebarItems"/>
    <CSidebarMinimizer
      class="d-md-down-none"
      @click.native="$store.commit('set', ['sidebarMinimize', !minimize])"
    />
  </CSidebar>
</template>

<script>
import SidebarItems from './SidebarItems'

export default {
  name: 'TheSidebar',
  extends: SidebarItems,
  computed: {
    show () {
      return this.$store.state.sidebarShow 
    },
    minimize () {
      return this.$store.state.sidebarMinimize 
    }
  }
}
</script>
