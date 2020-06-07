import { Store } from 'data-store'
import { v4 as uuid } from 'uuid'

export default class QuizService {

  constructor(cwd) {
    this.store = new Store('quiz', { cwd })
  }

  getQuizes() {
    return this.store.get('items')
  }

  getQuizById(id) {
    return this.store.get('items').find(i => i.id === id)
  }

  addQuizItem(item) {
    item.id = uuid()

    this.store.union('items', item)
    this.store.save()

    return item
  }

  editQuizItem(item) {
    const items = this.store.get('items')
    const index = items.findIndex(i => i.id === item.id)

    items[index] = item

    this.store.set('items', items)
    this.store.save()

    return item
  }

  removeQuizItem(item) {
    const items = this.store.get('items').filter(i => i.id !== item.id)

    this.store.set('items', items)
    this.store.save()

    return item
  }
}