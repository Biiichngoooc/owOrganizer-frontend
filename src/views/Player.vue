<template>
  <div class="container-fluid">
    <div class="col">
      <h1>Student Players</h1>
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
          <th scope="col">B.net Mail</th>
          <th scope="col">City of residence</th>
          <th scope="col">Uni</th>
          <th scope="col">Uni Mail</th>
          <th></th>
          <th></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="player in studentPlayers" :key="player.id">
          <th scope="row">{{ player.id }}</th>
          <td>{{ player.playerName }}</td>
          <td>{{ player.bnetId }}</td>
          <td>{{ player.discordTag }}</td>
          <td>{{ player.firstName }}</td>
          <td>{{ player.lastName }}</td>
          <td>{{ player.gender }}</td>
          <td>{{ player.birthday }}</td>
          <td>{{ player.bnetMail }}</td>
          <td>{{ player.cityOfResidence }}</td>
          <td>{{ player.uni }}</td>
          <td>{{ player.uniMail }}</td>
          <td>
            <button type="button" class="btn" aria-label="Edit" @click='updatePlayer(player.id)' data-bs-toggle='offcanvas' data-bs-target='#players-create-offcanvas'
                    aria-controls='#players-create-offcanvas'>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
              </svg>
            </button>
          </td>
          <td>
            <button type="button" class="btn-close" aria-label="Close" @click='deletePlayer(player.id)'></button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>

    <div class="col">
      <h1>Non Student Players</h1>
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
          <th></th>
          <th></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="player in players" :key="player.id">
          <th scope="row">{{ player.id }}</th>
          <td>{{ player.playerName }}</td>
          <td>{{ player.bnetId }}</td>
          <td>{{ player.discordTag }}</td>
          <td>{{ player.firstName }}</td>
          <td>{{ player.lastName }}</td>
          <td>{{ player.gender }}</td>
          <td>{{ player.birthday }}</td>
          <td>
            <button type="button" class="btn" aria-label="Edit" @click='updatePlayer(player.id)' data-bs-toggle='offcanvas' data-bs-target='#players-create-offcanvas'
                    aria-controls='#players-create-offcanvas'>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
              </svg>
            </button>
          </td>
          <td>
            <button type="button" class="btn-close" aria-label="Close" @click='deletePlayer(player.id)'></button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
  <player-create-form @playerCreated="addPlayer" :player-id="editedPlayerId"></player-create-form>
</template>

<script>
import PlayerCreateForm from '../components/PlayerCreateForm'

export default {
  name: 'Players',
  emits: ['addPlayer', 'deletePlayer'],
  components: { PlayerCreateForm },
  data () {
    return {
      studentPlayers: [],
      players: [],
      editedPlayerId: ''
    }
  },
  methods: {
    addPlayer (player) {
      if (player.student) {
        this.studentPlayers.push(player)
      } else {
        this.players.push(player)
      }
    },
    updatePlayer (id) {
      this.editedPlayerId = id
    },
    deletePlayer (id) {
      const endpoint = process.env.VUE_APP_BACKEND_BASE_URL + '/api/v1/players/' + id
      const requestOptions = {
        method: 'DELETE',
        redirect: 'follow'
      }

      fetch(endpoint, requestOptions)
        .then((response) => {
          this.studentPlayers = this.studentPlayers.filter(player => player.id !== id)
          this.players = this.players.filter(player => player.id !== id)
          return response
        })
        .catch(error => console.log('error', error))
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
      .then(allPlayers => {
        [this.studentPlayers, this.players] = allPlayers.reduce((result, element) => {
          result[element.student ? 0 : 1].push(element)
          return result
        }, [[], []])
      })
      .catch(error => console.log('error', error))
  }
}
</script>

<style scoped>

</style>
