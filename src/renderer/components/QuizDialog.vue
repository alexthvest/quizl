<template>
  <v-dialog
    v-model="visible"
    persistent
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
  >
    <v-card>
      <v-toolbar dark>
        <v-toolbar-title>Новый опрос</v-toolbar-title>
        <v-spacer></v-spacer>

        <v-btn depressed @click="questionDialogVisible = true">Добавить вопрос</v-btn>
        <QuestionDialog
          :visible="questionDialogVisible"
          :model="questionDialogModel"
          @save="saveQuestion"
          @cancel="cancelQuestion"
        ></QuestionDialog>

        <v-btn
          depressed
          @click="$emit('save')"
          :disabled="!model.title || !model.title.trim()"
        >Сохранить</v-btn>
        <v-btn depressed @click="$emit('cancel')">Закрыть</v-btn>
      </v-toolbar>
      <v-container>
        <v-text-field label="Название опроса" v-model="model.title" outlined hide-details></v-text-field>
        <QuestionsList :items="model.questions" @edit="editQuestion" @remove="removeQuestion"></QuestionsList>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
import QuestionsList from './QuestionsList'
import QuestionDialog from './QuestionDialog'

export default {
  components: {
    QuestionsList,
    QuestionDialog
  },
  props: {
    model: {
      type: Object,
      default: () => ({})
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    questionDialogVisible: false,
    questionDialogModel: {
      id: '',
      title: '',
      answers: []
    }
  }),
  methods: {
    saveQuestion() {
      const item = {
        ...this.questionDialogModel,
        id: Math.random()
      }

      if (this.questionDialogModel.id) {
        const index = this.model.questions.findIndex(
          q => q.id === this.questionDialogModel.id
        )
        this.model.questions[index].title = item.title
        this.model.questions[index].answers = item.answers
      } else {
        this.model.questions.push(item)
      }

      this.cancelQuestion()
    },
    cancelQuestion() {
      this.questionDialogModel = { id: '', title: '', answers: [] }
      this.questionDialogVisible = false
    },
    editQuestion(item) {
      this.questionDialogModel = item
      this.questionDialogVisible = true
    },
    removeQuestion(item) {
      this.model.questions = this.model.questions.filter(q => q.id !== item.id)
    }
  }
}
</script>