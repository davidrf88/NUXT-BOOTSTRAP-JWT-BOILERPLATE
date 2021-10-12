<template>
<div>
<breadcrumb :items="breadcrumbItems" />
<div class="container-fluid"> 

  <div class="row">
    <div class="col-sm-8 mt-4" style="max-width: 500px">
       <h1>Welcome to <span class="text-primary">User</span> home {{user.email}}</h1>
     
    </div>


   
  </div>
  </div>
  </div>
</template>

<script>

export default {
middleware: "auth",
  data() {
    return {
       breadcrumbItems: [
        { text: "home", to: "/" },
        { text: "user", active: true },
      ],

    };
  },
 computed:{
      user: function(){ return this.$store.state.auth.user}
},



  methods: {

  },
};
</script>

<style scoped>


</style>