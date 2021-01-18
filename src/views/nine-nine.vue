<template lang="pug">
.container.nine-nine
  ul.exercise.row
    li.exercise-item.col-4(
      v-for="(item, index) in questions",
      ref="line",
      :key="item.id",
    )
      .number {{item.a}}
      .op &times;
      .number {{item.b}}
      .equal =
      .number-input
        span(hidden) '几'
        input.form-control(
          ref="input",
          type="text",
          v-model.number="item.answer",
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
import uniqueId from "lodash/uniqueId";
import exercise from "@/views/exercise";

export default {
  mixins: [exercise],
  beforeMount() {
    for (let i = 0; i < this.number; i++) {
      const a = (Math.random() * 9 >> 0) + 1;
      const b = (Math.random() * 9 >> 0) + 1;
      const result = a * b;
      this.questions.push({
        id: uniqueId('q'),
        a,
        b,
        result,
        answer: null,
        extraClass: null,
      });
    }
  },
}
</script>
