<template lang="pug">
.container.nine-nine
  ul.exercise.row
    li.exercise-item.col-4(
      v-for="(item, index) in questions",
      ref="line",
      :key="item.id",
    )
      .number {{item.a}}
      .op {{item.c ? '&times;' : item.op}}
      .number {{item.b}}
      template(v-if="item.c")
        .op {{item.op}}
        .number {{item.c}}
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

function createQuestion() {
  const a = rand(1, 9);
  const b = rand(1, 9);
  const op = Math.random() > .5 ? '+' : '-';
  const c = rand(1, op === '+' || a * b > 9 ? 9 : a * b);
  const result = a * b + op * c;
  return {
    id: uniqueId('q'),
    a,
    b,
    c,
    op,
    result,
    answer: null,
    extraClass: null,
  };
}

export default {
  mixins: [exercise],
  beforeMount() {
    for (let i = 0; i < this.number; i++) {
      if (Math.random() < .4) {
        this.questions.push(createQuestion());
        continue;
      }

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
            const offset = result - 99 + rand(0, 9);
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
