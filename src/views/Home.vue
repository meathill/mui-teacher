<template lang="pug">
.home.mx-auto
  img.logo.img-thumbnail.rounded-circle.mb-4(
    alt="Mui's picture",
    src="../assets/mui.jpg",
  )
  Hello-World(
    msg="Welcome to Teacher Mui",
  )
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: 'Home',
  components: {
    HelloWorld,
  },
};
</script>
