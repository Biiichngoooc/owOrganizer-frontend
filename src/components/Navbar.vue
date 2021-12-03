<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Uniliga Teams</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <router-link class="nav-link" to="/">Home</router-link>
        <router-link class="nav-link" to="/player">Player</router-link>
        <router-link class="nav-link" to="/team">Team</router-link>
      </div>
    </div>
  </nav>

</template>

<script>
export default {
  name: 'Navbar'
}
</script>

<style scoped>

</style>
