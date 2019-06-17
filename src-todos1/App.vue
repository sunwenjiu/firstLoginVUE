<template>
  <div class="todo-container">
    <div class="todo-wrap">
      <TodoHeader :addTodo="addTodo"/>
      <TodoList :todos="todos" :deleteTodo="deleteTodo"/>
      <TodoFooter :todos="todos" :deleteCompleteTodos="deleteCompleteTodos" :selectAllTodos="selectAllTodos"/>
    </div>
  </div>
</template>

<script>

import TodoHeader from './components/TodoHeader'
import TodoList from './components/TodoList'
import TodoFooter from './components/TodoFooter'

export default {

  data () {
    return {
      // 从localStorage中读取todos
      todos: JSON.parse(window.localStorage.getItem('todos_key') || '[]')
      // todos: [
      //   {title: '吃饭', complete: false},
      //   {title: '睡觉', complete: true},
      //   {title: 'codinss', complete: false}
      // ]
    }
  },
  methods: {
    addTodo (todo) {
      this.todos.unshift(todo)
    },

    deleteTodo (index) {
      this.todos.splice(index, 1)
    },

    deleteCompleteTodos () {
      this.todos = this.todos.filter(todo => !todo.complete)
    },

    selectAllTodos (check) {
      this.todos.forEach(todo => todo.complete = check)
    }
  },

  watch: { // 深度监视
    todos: {
      deep: true, // 深度监视
      handler: function (value) {
        // 将todos最新的值的JSON数据保存到localStorage
        window.localStorage.setItem('todos_key', JSON.stringify(value))
      }
    }
  },
  components: {
    TodoHeader,
    TodoList,
    TodoFooter

  }

}
</script>

<style>
  .todo-container {
    width: 600px;
    margin: 0 auto;
  }
  .todo-container .todo-wrap {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
  }

</style>
