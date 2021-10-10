
<template>
  <b-row  >
    <b-col class="text-center mt-4">
      <h1 class="mb-3">only auth users can acess</h1>
      <NuxtLink class="nav-item btn btn-primary" to="/register">Register</NuxtLink>
      <span class="align-bottom" style="font-size:1.5rem">or</span>
      <NuxtLink class="nav-item btn btn-primary" to="/login">Access</NuxtLink>
    </b-col>
  </b-row>
</template>

<script>
export default {
middleware: ['auth']
  
};
</script>





