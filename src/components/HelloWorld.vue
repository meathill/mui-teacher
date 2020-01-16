<template lang="pug">
.hello
  h1 {{ msg }}

  form(
    @submit.prevent="doStart",
  )
    .form-group
      label(for="number") 题目数量
      input#number.form-control(
        type="number",
        v-model="number",
        placeholder="题目数量",
      )

    .form-group
      button.btn.btn-primary.btn-block 开始


</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String,
  },
  data() {
    return {
      number: 20,
    };
  },
  methods: {
    doStart() {
      this.$router.push({
        name: 'exercise',
        params: {
          number: this.number,
        },
      });
    },
  }
}
</script>
