<template>
  <h1>HTW Teams</h1>
  <button class="btn btn-primary">Add new Team</button>
  <button class="btn btn-primary">Add Player to Team</button>
  <div class="container"
       v-for="(uniligaTeam, index) in uniligaTeams.length"
       :item="uniligaTeam"
       :index="index"
       :key="uniligaTeam">
    <team-tables>{{ uniligaTeam }}</team-tables>
  </div>
</template>
<script>
import TeamTables from '../components/TeamTables'

export default {
  name: 'HTW',
  components: { TeamTables },
  data () {
    return {
      uniligaTeams: []
    }
  },
  methods: {},
  mounted () {
    const endpointTeams = process.env.VUE_APP_BACKEND_BASE_URL + '/api/v1/uniligaTeams'
    const requestOptions = {
      method: 'GET',
      redirect: 'follow'
    }
    fetch(endpointTeams, requestOptions)
      .then(response => response.json())
      .then(result => result.forEach(uniligaTeam => {
        this.uniligaTeams.push(uniligaTeam)
        console.log(uniligaTeam)
      }))
  }
}
</script>

<style scoped>

</style>
