<template>
  <h1>Welcome to Uniliga Teams</h1>
  <div class="container-fluid">
    <div class="row row-cols-1 row-cols-md-2 g-4">
      <div class="col" v-for="uniligaTeam in uniligaTeams" :key="uniligaTeam.id">
        <div class="card">
          <img :src="getAvatar(uniligaTeam)" class="card-img-top" :alt="uniligaTeam.name">
          <div class="card-body">
            <h5 class="card-title">{{ uniligaTeam.name }}</h5>
            <p class="card-text">
              Wir sind Team {{ uniligaTeam.name }} der {{ uniligaTeam.uni }}!</p>
          </div>
        </div>
      </div>
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

</style>
