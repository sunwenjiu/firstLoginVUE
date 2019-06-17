<template>
  <div>
      <header class="site-header jumbotron">
        <div class="container">
          <div class="row">
            <div class="col-xs-12">
              <h1>请发表对Vue的评论</h1>
            </div>
          </div>
        </div>
      </header>
      <div class="container">
        <Add :addComment="addComment"/>
        <List :comments="comments" :deleteComments="deleteComments"/>
      </div>
    </div>
</template>

<script>
import Add from './components/Add'
import List from './components/List'
export default {

  data () {
    return {
      comments: [
        {
          name: 'bob',
          content: 'vue 1'
        },
        {
          name: 'bob2',
          content: 'vue 2'
        },
        {
          name: 'bob3',
          content: 'vue 3'
        }
      ]
    }
  },
  methods: {
    addComment (comment) {
      this.comments.unshift(comment)
    },
    deleteComments(index){
      this.comments.splice(index,1)
    }
  },
  components: {
    Add,
    List
  }
}
</script>

<style>

</style>
