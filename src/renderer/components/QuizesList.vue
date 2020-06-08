<template>
  <div>
    <v-overlay :value="loading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <v-alert v-show="!items.length && !loading">Здесь ничего нет.</v-alert>
    <v-list v-show="items.length && !loading">
      <v-list-item v-for="item in items" :key="item.id">
        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
          <v-list-item-subtitle>{{ item.questions.length }} вопросов</v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-action class="mr-4">
          <v-btn
            depressed
            dark
            @click="$emit('start', item)"
            v-show="item.questions.length && item.questions.every(q => q.answers.length && q.answers.some(a => a.right))"
          >Начать</v-btn>
        </v-list-item-action>
        <v-list-item-action>
          <v-btn depressed @click="$emit('edit', item)">Редактировать</v-btn>
        </v-list-item-action>
        <v-list-item-action>
          <v-btn depressed @click="$emit('remove', item)">Удалить</v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: false
    }
  }
}
</script>