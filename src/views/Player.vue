<template>
<h1>Welcome to Player</h1>
  <div class="container-fluid">
    <div class="col">
      <table class="table">
        <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Player</th>
          <th scope="col">Bnet</th>
          <th scope="col">Discord</th>
          <th scope="col">First</th>
          <th scope="col">Last</th>
          <th scope="col">Gender</th>
          <th scope="col">Birthday</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="player in players" :key="player.id">
          <th scope="row">{{player.id}}</th>
          <td>{{player.playerName}}</td>
          <td>{{player.bnetId}}</td>
          <td>{{ player.discordTag }}</td>
          <td>{{player.firstName}}</td>
          <td>{{player.lastName}}</td>
          <td>{{player.gender}}</td>
          <td>{{player.birthday}}</td>

        </tr>
        </tbody>
      </table>
    </div>
  </div>
  <persons-create-form @created="addPlayer"></persons-create-form>
</template>

<script>
import PersonsCreateForm from '../components/PlayerCreateForm'
export default {
  name: 'Players',
  components: { PersonsCreateForm },
  data () {
    return {
      players: []
    }
  },
  methods: {
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
