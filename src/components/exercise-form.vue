<template lang="pug">
.hello
  h1 Welcome to Teacher Mui

  form(
    @submit.prevent="doStart",
  )
    .form-group
      label(for="type") 练习类型
      select#type.form-control(
        v-model="type",
      )
        option(v-for="(label, key) in exerciseTypes", :value="key") {{label}}
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
import {exerciseTypes, defaultType} from '@/data';
export default {
  data() {
    return {
      type: defaultType,
      exerciseTypes,
      number: 51,
    };
  },
  methods: {
    doStart() {
      this.$router.push({
        name: this.type,
        params: {
          number: this.number,
        },
      });
    },
  },
};
</script>
