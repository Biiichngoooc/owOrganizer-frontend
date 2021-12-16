<template>
<h1>Welcome to Player</h1>
  <div class="container-fluid">
    <div class="row row-cols-1 row-cols-md-2 g-4">
      <div class="col" v-for="player in players" :key="player.id">
        <div class="card">
          <img :src="getAvatar(player)" class="card-img-top" :alt="player.firstName + ' ' + player.lastName">
          <div class="card-body">
            <h5 class="card-title">{{ player.firstName }} {{ player.lastName }}</h5>
            <p class="card-text">
              Hi! Mein Name ist {{ player.firstName }} und ich bin {{ player.student? 'Student/in' : 'kein/e Student/in' }}!</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Players',
  data () {
    return {
      players: []
    }
  },
  methods: {
    getAvatar (player) {
      if (player.gender === 'm') {
        return require('../assets/sojourn.png')
      } else if (player.gender === 'f') {
        return require('../assets/sombra.png')
      }
    }
  },
  mounted () {
    const endpoint = process.env.VUE_APP_BACKEND_BASE_URL + '/api/v1/players'
    const requestOptions = {
      method: 'GET',
      redirect: 'follow'
    }

    fetch(endpoint, requestOptions)
      .then(response => response.json())
      .then(result => result.forEach(player => {
        this.players.push(player)
      }))
      .catch(error => console.log('error', error))
  }
}
</script>

<style scoped>

</style>
