<template>
  <div>
    <v-toolbar dark>
      <v-toolbar-title>{{ item.title }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        depressed
        @click="nextQuestion"
        v-show="this.index + 1 < item.questions.length"
        :disabled="this.selectedIndex === -1"
      >Следующий вопрос</v-btn>
      <v-btn depressed @click="$router.go(-1)">Закрыть</v-btn>
    </v-toolbar>
    <v-container>
      <h3>{{ index + 1 }}. {{ question.title }}</h3>
      <v-list>
        <v-list-item
          v-for="(answer, index) in question.answers"
          :key="answer.title"
          :class="{'green': index === rightIndex, 'red': selectedIndex == index && selectedIndex !== -1 && index !== rightIndex}"
          @click="selectAnswer(answer, index)"
        >
          <v-list-item-content>
            <v-list-item-title>{{ index + 1 }}. {{ answer.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-container>
  </div>
</template>

<script>
export default {
  data: () => ({
    item: {},
    index: 0,
    loading: false,
    selectedIndex: -1,
    rightIndex: -1
  }),
  beforeMount() {
    this.$ipc.send('quiz:started', this.$route.params.id)
    this.$ipc.on('quiz:loaded', (e, item) => {
      this.item = item
      this.loading = false
    })
  },
  computed: {
    question() {
      if (!this.item.questions) return []
      return this.item.questions[this.index]
    }
  },
  methods: {
    selectAnswer(item, index) {
      if (this.selectedIndex !== -1) return

      this.selectedIndex = index
      this.rightIndex = this.question.answers.findIndex(a => a.right)
    },
    nextQuestion() {
      if (this.item.questions && this.index + 1 < this.item.questions.length) {
        this.index++
        this.selectedIndex = -1
        this.rightIndex = -1
      } else {
        this.$router.go(-1)
      }
    }
  }
}
</script>