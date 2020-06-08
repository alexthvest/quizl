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
        <v-toolbar-title>Новый вопрос</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn
          depressed
          @click="$emit('save')"
          :disabled="!model.title || !model.title.trim()"
        >Сохранить</v-btn>
        <v-btn depressed @click="cancel">Закрыть</v-btn>
      </v-toolbar>
      <v-container>
        <v-text-field label="Вопрос" v-model="model.title" outlined hide-details></v-text-field>
        <v-row>
          <v-col sm="9">
            <v-text-field label="Ответ" v-model="answerTitle" outlined hide-details></v-text-field>
          </v-col>
          <v-col sm="3">
            <v-btn
              large
              dark
              depressed
              @click="addAnswer"
              :disabled="!answerTitle.trim()"
            >{{ answerId ? 'Сохранить' : 'Добавить ответ' }}</v-btn>
          </v-col>
        </v-row>
      </v-container>
      <AnswersList :items="model.answers" @edit="editAnswer" @remove="removeAnswer"></AnswersList>
    </v-card>
  </v-dialog>
</template>

<script>
import AnswersList from './AnswersList'

export default {
  components: {
    AnswersList
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
    answerTitle: '',
    answerId: ''
  }),
  methods: {
    addAnswer() {
      const item = { id: Math.random(), title: this.answerTitle, right: false }

      if (this.answerId) {
        const index = this.model.answers.findIndex(a => a.id === this.answerId)
        this.model.answers[index].title = this.answerTitle
      } else {
        this.model.answers.push(item)
      }

      this.answerTitle = ''
      this.answerId = ''
    },
    editAnswer(item) {
      this.answerTitle = item.title
      this.answerId = item.id
    },
    removeAnswer(item) {
      this.model.answers = this.model.answers.filter(a => a.id !== item.id)
    },
    cancel() {
      this.answerTitle = ''
      this.answerId = ''
      this.$emit('cancel')
    }
  }
}
</script>