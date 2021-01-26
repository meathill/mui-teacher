<template lang="pug">
.container.nine-nine
  ul.exercise.row
    li.exercise-item.col-4(
      v-for="(item, index) in questions",
      ref="line",
      :key="item.id",
    )
      .number {{item.a}}
      .op {{item.op}}
      .number {{item.b}}
      .equal =
      .number-input
        span(hidden) '几'
        input.form-control(
          ref="input",
          type="text",
          v-model.number="item.answer",
          @keydown.enter="goNext(index)",
          @keydown.tab.prevent="goNext(index)",
          @blur="doValidate(item)",
          @click="doRead(index)",
          :tabindex="index + 1",
          :class="item.extraClass",
        )
</template>

<script>
import uniqueId from 'lodash/uniqueId';
import exercise from '@/views/exercise';
import {rand, swap} from '@/helper/calculation';

export default {
  mixins: [exercise],
  beforeMount() {
    for (let i = 0; i < this.number; i++) {
      const op = Math.random() > .5 ? '×' : (Math.random() > .5 ? '+' : '-');
      let a;
      let b;
      let result;
      if (op === '×') {
        a = rand(2, 9);
        b = rand(2, 9);
        result = a * b;
      } else {
        a = rand(11, 99);
        b = rand(11, 99);
        if (op === '+') {
          result = a + b;
          if (result > 99) {
            const offset = result - 99;
            if (a > b) {
              a -= offset;
            } else {
              b -= offset;
            }
            result -= offset;
          }
        } else {
          if (a < b) {
            [a, b] = swap(a, b);
          }
          result = a - b;
        }
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
