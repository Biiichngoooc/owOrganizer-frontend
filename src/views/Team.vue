<template>
  <div class="container-fluid">
    <h1>HTW Berlin</h1>
    <hr>
    <div class="col-6" >
      <table class="table" v-for="uniligaTeam in uniligaTeams" :key="uniligaTeam.id">
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
</template>

<script>
export default {
  name: 'uniligaTeams',
  data () {
    return {
      uniligaTeams: []
    }
  },
  methods: {
    getAvatar (uniligaTeam) {
      if (uniligaTeam.uni === 'Hochschule für Technik und Wirtschaft Berlin') {
        return require('../assets/htw.png')
      } else if (uniligaTeam.uni === 'Technische Universität Berlin') {
        return require('../assets/tu.png')
      }
    }
  },
  mounted () {
    const endpoint = process.env.VUE_APP_BACKEND_BASE_URL + '/api/v1/uniligaTeams'
    const requestOptions = {
      method: 'GET',
      redirect: 'follow'
    }

    fetch(endpoint, requestOptions)
      .then(response => response.json())
      .then(result => result.forEach(uniligaTeam => {
        this.uniligaTeams.push(uniligaTeam)
      }))
      .catch(error => console.log('error', error))
  }
}
</script>

<style scoped>
a {
  text-decoration: none;
  color: black;
}
#tu-div {
  background: red;
}
#htw-div{
  background: #42b983;
}
#hu-div{
  background: darkblue;
}
#fu-div{
  background: yellowgreen;
}

</style>
