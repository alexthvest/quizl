<template>
  <v-list>
    <v-list-item v-for="item in items" :key="item.id">
      <v-list-item-avatar>
        <v-switch v-model="item.right"></v-switch>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title>{{ item.title }}</v-list-item-title>
        <v-list-item-subtitle>{{ item.right ? 'Правильный' : 'Неправильный' }}</v-list-item-subtitle>
      </v-list-item-content>

      <v-list-item-action>
        <v-btn depressed @click="$emit('edit', item)">Редактировать</v-btn>
      </v-list-item-action>
      <v-list-item-action>
        <v-btn depressed @click="$emit('remove', item)">Удалить</v-btn>
      </v-list-item-action>
    </v-list-item>
  </v-list>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default: () => []
    }
  }
}
</script>