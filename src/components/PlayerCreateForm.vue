<template>
  <button class='btn btn-primary sticky-button' data-bs-toggle='offcanvas' data-bs-target='#players-create-offcanvas'
          aria-controls='#players-create-offcanvas' @click="resetData">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16" style="--darkreader-inline-fill: currentColor;" data-darkreader-inline-fill="">
      <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"></path>
    </svg>
  </button>
  <div class='offcanvas offcanvas-end' tabindex='-1' id='players-create-offcanvas' aria-labelledby='offcanvas-label'>
    <div class='offcanvas-header'>
      <h5 v-if="playerId" id='offcanvas-label'>Edit Player</h5>
      <h5 v-else id='offcanvas-label'>New Player</h5>
      <button type='button' id='close-offcanvas' class='btn-close text-reset' data-bs-dismiss='offcanvas'
              aria-label='Close'></button>
    </div>
    <div class='offcanvas-body'>
      <form class='text-start needs-validation' id='players-create-form' novalidate>
        <div class='mb-3'>
          <label for='player-name' class='form-label'>Player name</label>
          <input type='text' class='form-control' id='player-name' v-model='playerName' required>
          <div class='invalid-feedback'>
            Please provide the player name.
          </div>
        </div>
        <div class='mb-3'>
          <label for='bnet-id' class='form-label'>Battle.net ID</label>
          <input type='text' class='form-control' id='bnet-id' v-model='bnetId' required>
          <div class='invalid-feedback'>
            Please provide the Battle.net ID.
          </div>
        </div>
        <div class='mb-3'>
          <label for='discord-tag' class='form-label'>Discord tag</label>
          <input type='text' class='form-control' id='discord-tag' v-model='discordTag' required>
          <div class='invalid-feedback'>
            Please provide the Discord tag.
          </div>
        </div>
        <div class='mb-3'>
          <label for='first-name' class='form-label'>First name</label>
          <input type='text' class='form-control' id='first-name' v-model='firstName' required>
          <div class='invalid-feedback'>
            Please provide the first name.
          </div>
        </div>
        <div class='mb-3'>
          <label for='last-name' class='form-label'>Last name</label>
          <input type='text' class='form-control' id='last-name' v-model='lastName' required>
          <div class='invalid-feedback'>
            Please provide the last name.
          </div>
        </div>
        <div class='mb-3'>
          <label for='gender' class='form-label'>Gender</label>
          <select id='gender' class='form-select' v-model='gender' required>
            <option value='' selected disabled>Choose...</option>
            <option value='m'>Male</option>
            <option value='f'>Female</option>
            <option value='d'>Diverse</option>
          </select>
          <div class='invalid-feedback'>
            Please select a valid gender.
          </div>
        </div>
        <div class='mb-3'>
          <label for='birthday' class='form-label'>Birthday</label>
          <input type='date' class='form-control' id='birthday' v-model='birthday' required>
          <div class='invalid-feedback'>
            Please provide the birthday.
          </div>
        </div>
        <div class='mb-3'>
          <div class='form-check'>
            <input class='form-check-input' type='checkbox' id='student' v-model='student' >
            <label class='form-check-label' for='student'>
              Student?
            </label>
          </div>
        </div>
        <div class='mb-3'>
          <div class='form-check'>
            <input class='form-check-input' type='checkbox' id='competitive' v-model='competitive'>
            <label class='form-check-label' for='competitive'>
              Competitive?
            </label>
          </div>
        </div>
        <div v-if="student">
          <div class='mb-3'>
            <label for='bnet-mail' class='form-label'>Battle.Net Email</label>
            <input type='email' class='form-control' id='bnet-mail' v-model='bnetMail' required>
            <div class='invalid-feedback'>
              Please provide a valid Battle.Net Email address.
            </div>
          </div>
          <div class='mb-3'>
            <label for='uni' class='form-label'>Uni</label>
            <input type='text' class='form-control' id='uni' v-model='uni' required>
            <div class='invalid-feedback'>
              Please provide the university name.
            </div>
          </div>
          <div class='mb-3'>
            <label for='city-of-residence' class='form-label'>City of residence</label>
            <input type='text' class='form-control' id='city-of-residence' v-model='cityOfResidence' required>
            <div class='invalid-feedback'>
              Please provide the city of residence.
            </div>
          </div>
          <div class='mb-3'>
            <label for='uni-mail' class='form-label'>University Email</label>
            <input type='email' class='form-control' id='uni-mail' v-model='uniMail' required>
            <div class='invalid-feedback'>
              Please provide a valid university Email.
            </div>
          </div>
          <div class='mb-3'>
            <div class='form-check'>
              <input class='form-check-input' type='checkbox' id='owned' v-model='owned' >
              <label class='form-check-label' for='owned'>
                Is owned?
              </label>
            </div>
          </div>
        </div>
        <div v-if='serverValidationMessages'>
          <ul>
            <li v-for='(message, index) in serverValidationMessages' :key='index' style='color: red'>
              {{ message }}
            </li>
          </ul>
        </div>
        <div class='mt-5'>
          <button class='btn btn-danger me-3' type='reset' @click="reset" v-if="!playerId">Reset</button>
          <button class='btn btn-primary me-3' type='submit' @click.prevent='updatePlayer' v-if="playerId">Edit</button>
          <button class='btn btn-primary me-3' type='submit' @click.prevent='createPlayer' v-else>Create</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
const emptyData = {
  playerName: '',
  bnetId: '',
  discordTag: '',
  firstName: '',
  lastName: '',
  gender: '',
  birthday: '',
  student: false,
  competitive: false,
  serverValidationMessages: [],
  // studentPlayer fields
  bnetMail: '',
  uni: '',
  cityOfResidence: '',
  owned: false,
  uniMail: ''
}

export default {
  name: 'PlayerCreateForm',
  emits: ['playerCreated', 'playerUpdated', 'formCleared'],
  props: ['playerId'],
  data () {
    return { ...emptyData }
  },
  watch: {
    playerId (id) {
      if (id) {
        const endpoint = process.env.VUE_APP_BACKEND_BASE_URL + '/api/v1/players/' + id
        const requestOptions = {
          method: 'GET',
          redirect: 'follow'
        }

        fetch(endpoint, requestOptions)
          .then(response => response.json())
          .then(player => {
            const [day, month, year] = player.birthday.split('.')
            Object.assign(this.$data, { ...this.$data, ...player, birthday: `${year}-${month}-${day}` })
          })
          .catch(error => console.log('error', error))
      } else {
        this.resetData()
      }
    }
  },
  methods: {
    async createPlayer () {
      if (this.validate()) {
        const endpoint = process.env.VUE_APP_BACKEND_BASE_URL + '/api/v1/players'
        const myHeaders = new Headers()
        myHeaders.append('Content-Type', 'application/json')

        const player = {
          ...this.$data, serverValidationMessages: emptyData.serverValidationMessages
        }
        const requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: JSON.stringify(player),
          redirect: 'follow'
        }
        fetch(endpoint, requestOptions)
          .then(response => this.handleResponse(response, true))
          .then(result => {
            this.resetData()

            return result
          })
          .catch(error => console.log('error', error))
      }
    },
    async updatePlayer () {
      const endpoint = process.env.VUE_APP_BACKEND_BASE_URL + '/api/v1/players/' + this.playerId
      const myHeaders = new Headers()
      myHeaders.append('Content-Type', 'application/json')

      const player = {
        ...this.$data, serverValidationMessages: emptyData.serverValidationMessages
      }
      const requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: JSON.stringify(player),
        redirect: 'follow'
      }
      fetch(endpoint, requestOptions)
        .then(response => this.handleResponse(response, false))
        .then(result => {
          this.resetData()

          return result
        })
        .catch(error => console.log('error', error))
    },
    async handleResponse (response, created) {
      if (response.ok) {
        const player = await response.json()
        if (created) {
          this.$emit('playerCreated', player)
        } else {
          this.$emit('playerUpdated', player)
        }
        document.getElementById('close-offcanvas').click()
      } else if (response.status === 400) {
        response = await response.json()
        response.errors.forEach(error => {
          this.serverValidationMessages.push(error.defaultMessage)
        })
      } else {
        this.serverValidationMessages.push('Unknown error occurred')
      }
    },
    validate () {
      let valid = true
      const form = document.querySelector('#players-create-form')
      if (!form.checkValidity()) {
        valid = false
      }
      form.classList.add('was-validated')
      return valid
    },
    reset (event) {
      if (this.playerId) {
        event.preventDefault()
        event.stopPropagation()
      }
    },
    resetData () {
      Object.assign(this.$data, { ...emptyData })
      const form = document.querySelector('#players-create-form')
      form.classList.remove('was-validated')
      this.$emit('formCleared')
    }
  }
}
</script>
<style scoped>
.sticky-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 10px 15px;
  border-radius: 30px;
}
</style>
