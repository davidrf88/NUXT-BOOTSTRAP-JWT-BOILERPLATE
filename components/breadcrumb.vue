<template>
<div>
<b-breadcrumb class="breadcrumb" :items="items"></b-breadcrumb>
</div>

</template>

<script>

export default {
    props: ['items'],
data() {
    return {
    }},

}; 
</script>
<style scoped>

.breadcrumb
{
    background-color:rgb(75 83 92);
}

a{

    text-decoration: none;
}
a:hover
{
    text-decoration: none;
}

.active
{
    color:#17a2b8;
}

</style>