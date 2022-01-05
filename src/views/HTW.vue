<template>
  <h1>HTW Teams</h1>
  <div class="container">
    <div class="col">
      <table class="table">
        <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Player</th>
          <th scope="col">Role</th>
          <th scope="col">Peak</th>
          <th scope="col">Uni</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="player in players" :key="player.id">
          <th scope="row">{{ player.id }}</th>
          <td>{{ player.playerName }}</td>
          <td>{{ (player.id > 0) ? 'positiv' : 'negativ' }}</td>
          <td></td>
          <td>
            <button type="button" class="btn-close" aria-label="Close"></button>
          </td>
        </tr>
        </tbody>
      </table>
      das geht :)
    </div>
  </div>
</template>

<script>
export default {
  name: 'HTW',
  data () {
    return {
      players: [],
      roles: []
    }
  },
  methods: {
  },
  mounted () {
    const endpointRoles = process.env.VUE_APP_BACKEND_BASE_URL + '/api/v1/roles'
    const endpointPlayers = process.env.VUE_APP_BACKEND_BASE_URL + '/api/v1/players'
    const requestOptions = {
      method: 'GET',
      redirect: 'follow'
    }
    fetch(endpointRoles, requestOptions)
      .then(response => response.json())
      .then(result => console.log(result))
      .catch(error => console.log('error', error))
    fetch(endpointPlayers, requestOptions)
      .then(response => response.json())
      .then(result => result.forEach(player => {
        this.players.push(player)
        console.log(player)
      }))
      .catch(error => console.log('error', error))
    fetch(endpointPlayers, requestOptions)
      .then(response => response.json())
      .then(result => console.log(result))
      .catch(error => console.log('error', error))
  }
}
</script>

<style scoped>

</style>
