<template>
  <CDropdown
    inNav
    class="c-header-nav-items"
    placement="bottom-end"
    add-menu-classes="pt-0"
  >
    <template #toggler>
            <CHeaderNavLink>
                <div class="c-avatar">
                    <b-avatar :text="$store.state.username[0]+$store.state.username[1]"></b-avatar>
                </div>
            </CHeaderNavLink>
        </template>
    <CDropdownHeader tag="div" class="text-center" color="light">
      <strong>Account</strong>
    </CDropdownHeader>
    <div class="pt-3 pb-2 px-4">
      User: <b> {{$store.state.username}}</b>
    </div>
    <CDropdownDivider />
    <CDropdownItem @click="signOut()">
        Log out
    </CDropdownItem>
  </CDropdown>
</template>

<script>
import {Auth} from "aws-amplify";

export default {
  name: 'TheHeaderDropdownAccnt',
  data () {
    return {
    }
  },
  methods: {
    signOut() {
        Auth.signOut()
        .then(() => {
          this.$router.push({name: 'Login'})
        })
    }
  }
}
</script>

<style scoped>
  .c-icon {
    margin-right: 0.3rem;
  }
</style>