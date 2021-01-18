<template lang="pug">
ul.exercise
  li.exercise-item(
    v-for="(item, index) in questions",
    ref="line",
    :key="item.id",
  )
    .number {{item.a}}
    .op {{item.op ? '+' : '-'}}
    .number {{item.b}}
    .equal =
    .number-input
      span(hidden) '几'
      input.form-control(
        ref="input",
        type="number",
        v-model.number="item.answer",
        min="0",
        max="40",
        placeholder="?",
        @keydown.enter="goNext(index)",
        @keydown.tab.prevent="goNext(index)",
        @blur="doValidate(item)",
        @click="doRead(index)",
        :tabindex="index + 1",
        :class="item.extraClass",
      )
</template>

<script>
import {MAX_NUMBER} from '@/config';
import uniqueId from 'lodash/uniqueId';
import exercise from "@/views/exercise";

export default {
  mixins: [exercise],
  beforeMount() {
    for (let i = 0; i < this.number; i++) {
      const op = Math.random() > .5; // true => +, false => -
      let a = (Math.random() * MAX_NUMBER >> 0) + 1;
      let b;
      let result;
      if (op) {
        // 两个数相加不能超过 20
        b = (Math.random() * (MAX_NUMBER - a) >> 0) + 1;
        result = a + b;
      } else {
        // 不能有退位减法
        b = (Math.random() * MAX_NUMBER >> 0) + 1;
        if (a < b) {
          [b, a] = [a, b];
        }
        const a1 = a % 10;
        const b1 = b % 10;
        if (a1 < b1) {
          a = (a / 10 >> 0) * 10 + b1;
          b = (b / 10 >> 0) * 10 + a1;
        }
        if (a > MAX_NUMBER) {
          a -= 10;
        }

        result = a - b;
      }

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
};
</script>
