<template>
  <div class="container">
    <search/>
    <UsersMain/>
  </div>
</template>

<script>
import Search from './components/Search'
import Main from './components/Main'

export default {
  components: {
    Search,
    UsersMain: Main
  }

}
</script>

<style>

</style>
