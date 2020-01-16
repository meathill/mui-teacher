<template lang="pug">
ul.exercise
  li.exercise-item(
    v-for="(item, index) in questions",
    :key="item.id",
  )
    .number {{item.a}}
    .op {{item.op ? '+' : '-'}}
    .number {{item.b}}
    .equal =
    .number-input
      input.form-control(
        ref="input",
        type="number",
        v-model.number="item.answer",
        min="0",
        max="40",
        placeholder="?",
        @keydown.enter="goNext(index)",
        @blur="doValidate(item)",
        :tabindex="index + 1",
        :class="item.extraClass",
      )
</template>

<script>
import {MAX_NUMBER} from "@/config";
import uniqueId from 'lodash/uniqueId';

export default {
  computed: {
    number() {
      return this.$route.params.number;
    },
  },
  data() {
    return {
      questions: [],
    };
  },
  methods: {
    doValidate(item) {
      if (item.answer === null) {
        item.extraClass = null;
        return;
      }
      item.extraClass = item.answer === item.result ? 'is-valid' : 'is-invalid';
    },
    goNext(index) {
      if (index >= this.number - 1) {
        return;
      }
      this.$refs.input[index + 1].focus();
    },
  },
  beforeMount() {
    for (let i = 0; i < this.number; i++) {
      let a = Math.random() * MAX_NUMBER >> 0;
      let b = Math.random() * MAX_NUMBER >> 0;
      const op = Math.random() > .5; // true => +, false => -
      // 不能有退位减法
      if (!op) {
        if (a < b) {
          [b, a] = [a, b];
        }
        const a1 = a % 10;
        const b1 = b % 10;
        if (a1 < b1) {
          a = (a / 10 >> 0) * 10 + b1;
          b = (a / 10 >> 0) * 10 + a1;
        }
      }
      const result = a + (op ? 1 : -1) * b;

      this.questions.push({
        id: uniqueId('q'),
        a,
        b,
        op,
        result,
        answer: null,
        extraClass: null,
      });
    }
  },
  async mounted() {
    await this.$nextTick();
    this.$refs.input[0].focus();
  },
}
</script>
