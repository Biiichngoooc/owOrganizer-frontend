<template>
  <div class="home">
    <img alt="Overwatch logo" src="../assets/logo2.png">
    <HelloWorld msg="Uniliga Teams"/>

</div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  }
}
</script>
