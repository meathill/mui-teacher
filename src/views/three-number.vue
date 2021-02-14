<template lang="pug">
.container.three-number
  ul.exercise.row
    li.exercise-item.col-4(
      v-for="(item, index) in questions",
      ref="line",
      :key="item.id",
    )
      .number {{item.a}}
      .op {{item.op1}}
      .bracket-left(v-if="item.hasBracket") (
      .number {{item.b}}
      .op {{item.op2}}
      .number {{item.c}}
      .bracket-right(v-if="item.hasBracket") )
      .equal =
      .number-input
        span(hidden) '几'
        input.form-control(
          ref="input",
          type="text",
          v-model.number="item.",
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
import {rand, dice} from '@/helper/calculation';

export default {
  mixins: [exercise],
  beforeMount() {
    for (let i = 0; i < this.number; i++) {
      let op1;
      let op2;
      let a;
      let b;
      let c;
      let result;
      let hasBracket = false;
      if (dice(50)) {
        op1 = '×';
        op2 = dice(50) ? '+' : '-';
        a = rand(2, 9);
        b = rand(2, 9);
        c = rand(1, 9);
        result = a * b + (op2 === '+' ? 1 : -1) * c;
      } else {
        op1 = '+';
        result = rand(1, 20);
        a = rand(1, result);
        const left = result - a;
        b = rand(1, 20);
        c = left - b;
        if (c < 0) {
          c = c * -1;
          op2 = '-';
        } else {
          op2 = '+';
        }
        if (dice(50)) {
          hasBracket = true;
        }
      }
      this.questions.push({
        id: uniqueId('q'),
        a,
        b,
        c,
        op1,
        op2,
        result,
        hasBracket,
        answer: null,
        extraClass: null,
      });
    }
  },
};
</script>

<style lang="stylus">
.three-number
  .exercise,
  .exercise input
    font-size 2rem
</style>
