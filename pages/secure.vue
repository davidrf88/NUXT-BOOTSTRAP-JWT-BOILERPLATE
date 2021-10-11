
<template>
  <b-row  >
    <b-col class="text-center mt-4">
      <h1 class="mb-3">only auth users can acess</h1>
      {{user.email}}
    </b-col>
  </b-row>
</template>

<script>
export default {
middleware: 'auth',
computed:{
      user: function(){ return this.$store.state.auth.user}
},
  
};
</script>





