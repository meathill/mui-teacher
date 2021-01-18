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
    doRead(index) {
      const content = this.$refs.line[index].textContent;
      const msg = new SpeechSynthesisUtterance(content.replace('-', '减'));
      speechSynthesis.speak(msg);
    },
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
      this.doRead(index + 1);
    },
  },
  async mounted() {
    await this.$nextTick();
    this.$refs.input[0].focus();
  },
}
