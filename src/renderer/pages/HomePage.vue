<template>
  <div>
    <v-toolbar dark>
      <v-toolbar-title>Список опросов</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn depressed @click="visible = true">Добавить опрос</v-btn>
    </v-toolbar>

    <QuizDialog :visible="visible" @save="saveQuiz" @cancel="cancelQuiz" :model="model"></QuizDialog>
    <QuizesList
      :items="items"
      :loading="loading"
      @start="openQuizPage"
      @edit="editQuiz"
      @remove="removeQuiz"
    ></QuizesList>
  </div>
</template>

<script>
import QuizesList from '../components/QuizesList'
import QuizDialog from '../components/QuizDialog'

export default {
  components: {
    QuizesList,
    QuizDialog
  },
  data: () => ({
    items: [],
    visible: false,
    quizPageItem: {},
    quizPageVisible: false,
    model: {
      id: '',
      title: '',
      questions: []
    },
    loading: true
  }),
  beforeMount() {
    this.$ipc.send('app:started')

    this.$ipc.on('data:loaded', (e, items) => {
      this.items = items
      this.loading = false
    })

    this.$ipc.on('quiz:item:added', (e, item) => {
      this.items.push(item)
    })

    this.$ipc.on('quiz:item:edited', (e, item) => {
      const index = this.items.findIndex(i => i.id === item.id)

      this.items[index].title = item.title
      this.items[index].questions = item.questions
    })

    this.$ipc.on('quiz:item:removed', (e, item) => {
      this.items = this.items.filter(i => i.id !== item.id)
    })
  },
  methods: {
    openQuizPage(item) {
      this.$router.push({ path: `quiz/${item.id}` })
    },
    saveQuiz() {
      this.$ipc.send(this.model.id ? 'quiz:item:edit' : 'quiz:item:add', {
        ...this.model
      })
      this.cancelQuiz()
    },
    editQuiz(item) {
      this.model = item
      this.visible = true
    },
    removeQuiz(item) {
      this.$ipc.send('quiz:item:remove', item)
    },
    cancelQuiz() {
      this.model = { id: '', title: '', questions: [] }
      this.visible = false
    }
  }
}
</script>