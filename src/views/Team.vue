<template>
  <h1>Welcome to Uniliga Teams</h1>
  <div class="container-fluid">
    <div v-for="team in uniligaTeams" :key="team.name" style="margin-bottom: 50px">
      <div class="row">
        <div class="col-sm-4">
          <h4><b>Name:</b> {{ team.name }}</h4>
          <h5><b>Uni:</b> {{ team.uni }}</h5>
        </div>
        <div class="col-sm-4"></div>
        <div class="col-sm-4">
          <button class='btn btn-primary me-3' type='submit' @click='editTeam(team.id)' data-bs-toggle='offcanvas'
                  data-bs-target='#teams-create-offcanvas'
                  aria-controls='#teams-create-offcanvas'>Edit Team
          </button>
          <button type="button" class="btn btn-danger" aria-label="Delete Team" @click='deleteTeam(team.id)'>Delete Team
          </button>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <table class="table">
            <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Player</th>
              <th scope="col">Uni</th>
              <th></th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="player in team.players" :key="player.id">
              <th scope="row">{{ player.id }}</th>
              <td>{{ player.playerName }}</td>
              <td>{{ player.uni }}</td>
              <td>
                <button type="button" class="btn-close" aria-label="Close"
                        @click='deletePlayerFromTeam(team.id, player.id)'></button>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
      <form class="row" novalidate>
        <div class="col-sm-6"></div>
        <div class="col-sm-4">
          <select id='selected-player' class='form-select' v-model='team.selectedPlayer' required>
            <option value='' selected disabled>Choose Player To Add...</option>
            <option v-for="player in players" :value="player.id" :key="player.id">{{ player.playerName }} |
              {{ player.uni }}
            </option>
          </select>
          <div class='invalid-feedback'>
            Please select a player to add
          </div>
        </div>
        <div class="col-sm-2">
          <button class='btn btn-primary' type='submit' @click.prevent='addPlayerToTeam(team.id, team.selectedPlayer)'>
            Add
            Player
          </button>
        </div>
      </form>
    </div>
  </div>
  <team-create-form @teamCreated="teamCreated" @teamUpdated="teamUpdated" @formCleared="formCleared"
                    :team-id="editedTeamId"></team-create-form>
</template>

<script>
import TeamCreateForm from '../components/TeamCreateForm'
// const testoTeams = [
//   {
//     id: 1,
//     name: 'Team A',
//     uni: 'Uni A',
//     players: [
//       {
//         id: 1,
//         playerName: 'Player A',
//         uni: 'Player Uni A'
//       },
//       {
//         id: 2,
//         playerName: 'Player B',
//         uni: 'Player Uni B'
//       }
//     ]
//   },
//   {
//     id: 2,
//     name: 'Team B',
//     uni: 'Uni B',
//     players: [
//       {
//         id: 3,
//         playerName: 'Player C',
//         uni: 'Player Uni C'
//       },
//       {
//         id: 4,
//         playerName: 'Player D',
//         uni: 'Player Uni B'
//       }
//     ]
//   }
// ]

// const testoPlayers = [
//   {
//     id: 5,
//     playerName: 'Player E',
//     uni: 'Player Uni A'
//   },
//   {
//     id: 6,
//     playerName: 'Player F',
//     uni: 'Player Uni D'
//   },
//   {
//     id: 7,
//     playerName: 'Player G',
//     uni: 'Player Uni B'
//   }
// ]

export default {
  name: 'uniligaTeams',
  components: { TeamCreateForm },
  data () {
    return {
      uniligaTeams: [],
      players: [],
      editedTeamId: ''
    }
  },
  methods: {
    deleteTeam (id) {
      const endpoint = process.env.VUE_APP_BACKEND_BASE_URL + '/api/v1/uniligaTeams/' + id
      const requestOptions = {
        method: 'DELETE',
        redirect: 'follow'
      }

      fetch(endpoint, requestOptions)
        .then(() => {
          this.uniligaTeams = this.uniligaTeams.filter(team => team.id !== id)
          return this.getUnboundPlayers()
        })
        .catch(error => console.log('error', error))
    },
    addPlayerToTeam (teamId, playerId) {
      const endpoint = `${process.env.VUE_APP_BACKEND_BASE_URL}/api/v1/players/${playerId}/bind/${teamId}`

      const requestOptions = {
        method: 'PUT',
        redirect: 'follow'
      }
      fetch(endpoint, requestOptions)
        .then(response => response.json())
        .then(player => {
          for (let i = 0; i < this.uniligaTeams.length; i++) {
            const team = this.uniligaTeams[i]
            if (team.id === teamId) {
              if (!team.players) {
                team.players = []
              }

              team.players.push(player)

              this.uniligaTeams[i] = team
              break
            }
          }

          return player
        })
        .then(player => {
          this.getUnboundPlayers()
          return player
        })
        .catch(error => console.log('error', error))
    },
    deletePlayerFromTeam (teamId, playerId) {
      const endpoint = `${process.env.VUE_APP_BACKEND_BASE_URL}/api/v1/players/${playerId}/unbind/${teamId}`

      const requestOptions = {
        method: 'PUT',
        redirect: 'follow'
      }
      fetch(endpoint, requestOptions)
        .then(response => response.json())
        .then(player => {
          for (let i = 0; i < this.uniligaTeams.length; i++) {
            const team = this.uniligaTeams[i]
            if (team.id === teamId) {
              if (!team.players) {
                return
              }

              team.players = team.players.filter(p => p.id !== player.id)

              this.uniligaTeams[i] = team
              break
            }
          }

          return player
        })
        .then(player => {
          this.getUnboundPlayers()
          return player
        })
        .catch(error => console.log('error', error))
    },
    teamCreated (team) {
      this.uniligaTeams.push(team)
    },
    teamUpdated (team) {
      for (let i = 0; i < this.uniligaTeams.length; i++) {
        if (this.uniligaTeams[i].id === team.id) {
          this.uniligaTeams[i] = team
          break
        }
      }
    },
    editTeam (id) {
      this.editedTeamId = id
    },
    formCleared () {
      this.editedTeamId = ''
    },
    getUnboundPlayers () {
      const endpoint = process.env.VUE_APP_BACKEND_BASE_URL + '/api/v1/players/unbound'
      const requestOptions = {
        method: 'GET',
        redirect: 'follow'
      }

      return fetch(endpoint, requestOptions)
        .then(response => response.json())
        .then(players => {
          this.players = players
          return players
        })
        .catch(error => console.log('error', error))
    }
  },
  mounted () {
    // this.uniligaTeams = [...testoTeams]
    // this.players = [...testoPlayers]
    const endpoint = process.env.VUE_APP_BACKEND_BASE_URL + '/api/v1/uniligaTeams'
    const requestOptions = {
      method: 'GET',
      redirect: 'follow'
    }

    fetch(endpoint, requestOptions)
      .then(response => response.json())
      .then(teams => {
        const teamPromises = teams.map((team) => {
          const endpoint = `${process.env.VUE_APP_BACKEND_BASE_URL}/api/v1/players/bound/${team.id}`
          const requestOptions = {
            method: 'GET',
            redirect: 'follow'
          }

          return fetch(endpoint, requestOptions)
            .then(response => response.json())
            .then(players => {
              team.players = players
              return team
            })
            .catch(error => console.log('error', error))
        })

        return Promise.all(teamPromises)
          .then(teams => {
            this.uniligaTeams = teams
            return teams
          })
          .catch(error => console.log('error', error))
      })
      .catch(error => console.log('error', error))

    this.getUnboundPlayers()
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
