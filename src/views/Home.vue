<template lang="pug">
.home.mx-auto
  img.logo.img-thumbnail.rounded-circle.mb-4(
    alt="Mui's picture",
    src="../assets/mui.jpg",
  )
  exercise-form
</template>

<script>
// @ is an alias to /src
import ExerciseForm from '@/components/exercise-form.vue';

export default {
  name: 'Home',
  components: {
    ExerciseForm,
  },
};
</script>
