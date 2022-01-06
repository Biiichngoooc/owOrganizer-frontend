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
          <td>{{player.playerName}}</td>
          <td>
            <div v-for="role in roles" :key="role.id">
              <span v-if="role.playerId === player.id">{{role.role}}</span>
            </div>
          </td>
          <td>
            <div v-for="role in roles" :key="role.id">
              <span v-if="role.playerId === player.id">{{role.peakSr}}</span>
            </div>
          </td>
          <td>
            <div>
              <span>{{player.uni}}</span>
            </div>
          </td>
          <td>
            <button type="button" class="btn-close" aria-label="Close"></button>
          </td>
        </tr>
        </tbody>
      </table>
      <button class="btn btn-primary">Add new Team</button>
      <button class="btn btn-primary">Add Player to Team</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HTW',
  data () {
    return {
      players: [],
      roles: [],
      uniligaTeams: []
    }
  },
  methods: {
  },
  mounted () {
    const endpointRoles = process.env.VUE_APP_BACKEND_BASE_URL + '/api/v1/roles'
    const endpointPlayers = process.env.VUE_APP_BACKEND_BASE_URL + '/api/v1/players'
    const endpointTeams = process.env.VUE_APP_BACKEND_BASE_URL + '/api/v1/uniligaTeams'
    const requestOptions = {
      method: 'GET',
      redirect: 'follow'
    }
    fetch(endpointRoles, requestOptions)
      .then(response => response.json())
      .then(result => result.forEach(role => {
        this.roles.push(role)
        console.log(role)
      }))
      .catch(error => console.log('error', error))
    fetch(endpointPlayers, requestOptions)
      .then(response => response.json())
      .then(result => result.forEach(player => {
        this.players.push(player)
        console.log(player)
      }))
      .catch(error => console.log('error', error))
    fetch(endpointTeams, requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error))
  }
}
</script>

<style scoped>

</style>
