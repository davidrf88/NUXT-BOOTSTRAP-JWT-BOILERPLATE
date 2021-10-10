        <!-- Responsive navbar-->
<template>
<div>

<div>
  <b-navbar toggleable="sm" type="dark" variant="dark"  >
    
     <NuxtLink class="navbar-brand" to="/">Boilerplate</NuxtLink>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">

<b-navbar-nav v-if="!this.$store.state.auth.user">

  <NuxtLink class="nav-item btn btn-primary" to="/login">Access </NuxtLink>
 </b-navbar-nav>

        <b-nav-item-dropdown v-if="this.$store.state.auth.user" right>

          <!-- Using 'button-content' slot -->
          <template #button-content>
            <em>User</em>
          </template>
          <NuxtLink role="menuitem" class="dropdown-item" style="color:#212529;" to="/user/profile">Profile </NuxtLink>
          <b-dropdown-item @click.prevent="handleLogout" href="#">Sign Out</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div>

</div>

</template>

<script>
export default {


  methods: {
    async handleLogout(e) {
await this.$store
          .dispatch("auth/logout").then((resp) =>{
          this.$router.push("/");
          } )
    },
  },
}; 
</script>
<style scoped>

</style>