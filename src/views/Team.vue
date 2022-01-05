<template>
  <h1>Welcome to Uniliga Teams</h1>
  <div class="container-fluid">
    <div class="row">
      <div class="col">
        <a href="team/htw" class="">
          <div class="card" style="width: 18rem;">
            <img src="../assets/htw.jpg" class="card-img-top" alt="..." >
            <div class="card-body">
              <h5 class="card-title">HTW Berlin </h5>
              <p class="card-text"> </p>
            </div>
          </div>
        </a>
      </div>
      <div class="col">
        <a href="#" class="">
          <div class="card" style="width: 18rem;">
            <img src="../assets/tu.png" class="card-img-top" alt="..." >
            <div class="card-body">
              <h5 class="card-title">TU Berlin</h5>
              <p class="card-text"></p>
            </div>
          </div>
        </a>
      </div>
      <div class="col">
        <a href="#" class="">
          <div class="card" style="width: 18rem;">
            <img src="../assets/hu.png" class="card-img-top" alt="..." >
            <div class="card-body">
              <h5 class="card-title">HU Berlin</h5>
              <p class="card-text">  </p>
            </div>
          </div>
        </a>
      </div>
      <div class="col">
        <a href="#" class="">
          <div class="card" style="width: 18rem;">
            <img src="../assets/fu.png" class="card-img-top" alt="..." >
            <div class="card-body">
              <h5 class="card-title">FU Berlin</h5>
              <p class="card-text">  </p>
            </div>
          </div>
        </a>
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
        return require('../assets/htw.jpg')
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
  border: none;
}
a:hover {
  text-decoration: none;
}
</style>
