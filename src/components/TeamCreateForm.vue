<template>
  <button class='btn btn-primary sticky-button' data-bs-toggle='offcanvas' data-bs-target='#teams-create-offcanvas'
          aria-controls='#teams-create-offcanvas' @click="resetData">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus"
         viewBox="0 0 16 16" style="--darkreader-inline-fill: currentColor;" data-darkreader-inline-fill="">
      <path
        d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"></path>
    </svg>
  </button>
  <div class='offcanvas offcanvas-end' tabindex='-1' id='teams-create-offcanvas' aria-labelledby='offcanvas-label'>
    <div class='offcanvas-header'>
      <h5 v-if="teamId" id='offcanvas-label'>Edit Team</h5>
      <h5 v-else id='offcanvas-label'>New Team</h5>
      <button type='button' id='close-offcanvas' class='btn-close text-reset' data-bs-dismiss='offcanvas'
              aria-label='Close'></button>
    </div>
    <div class='offcanvas-body'>
      <form class='text-start needs-validation' id='teams-create-form' novalidate>
        <div class='mb-3'>
          <label for='team-name' class='form-label'>Team name</label>
          <input type='text' class='form-control' id='team-name' v-model='name' required>
          <div class='invalid-feedback'>
            Please provide the team name.
          </div>
        </div>
        <div class='mb-3'>
          <label for='uni' class='form-label'>University</label>
          <input type='text' class='form-control' id='uni' v-model='uni' required>
          <div class='invalid-feedback'>
            Please provide the university name.
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
          <button class='btn btn-danger me-3' type='reset' @click="reset">Reset</button>
          <button class='btn btn-primary me-3' type='submit' @click.prevent='updateTeam' v-if="teamId">Edit</button>
          <button class='btn btn-primary me-3' type='submit' @click.prevent='createTeam' v-else>Create</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
const emptyData = {
  name: '',
  uni: '',
  serverValidationMessages: []
}

export default {
  name: 'TeamCreateForm',
  emits: ['teamCreated', 'teamUpdated', 'formCleared'],
  props: ['teamId'],
  data () {
    return { ...emptyData }
  },
  watch: {
    teamId (id) {
      if (id) {
        const endpoint = process.env.VUE_APP_BACKEND_BASE_URL + '/api/v1/uniligaTeams/' + id
        const requestOptions = {
          method: 'GET',
          redirect: 'follow'
        }

        fetch(endpoint, requestOptions)
          .then(response => response.json())
          .then(team => {
            Object.assign(this.$data, { ...this.$data, ...team })
          })
          .catch(error => console.log('error', error))
      } else {
        this.resetData()
      }
    }
  },
  methods: {
    async createTeam () {
      if (this.validate()) {
        const endpoint = process.env.VUE_APP_BACKEND_BASE_URL + '/api/v1/uniligaTeams'
        const myHeaders = new Headers()
        myHeaders.append('Content-Type', 'application/json')

        const team = {
          ...this.$data, serverValidationMessages: emptyData.serverValidationMessages
        }
        const requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: JSON.stringify(team),
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
    async updateTeam () {
      const endpoint = process.env.VUE_APP_BACKEND_BASE_URL + '/api/v1/uniligaTeams/' + this.teamId
      const myHeaders = new Headers()
      myHeaders.append('Content-Type', 'application/json')

      const team = {
        ...this.$data, serverValidationMessages: emptyData.serverValidationMessages
      }
      const requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: JSON.stringify(team),
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
        const team = await response.json()
        if (created) {
          this.$emit('teamCreated', team)
        } else {
          this.$emit('teamUpdated', team)
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
      const form = document.querySelector('#teams-create-form')
      if (!form.checkValidity()) {
        valid = false
      }
      form.classList.add('was-validated')
      return valid
    },
    reset (event) {
      if (this.teamId) {
        event.preventDefault()
        event.stopPropagation()
      }
    },
    resetData () {
      Object.assign(this.$data, { ...emptyData })
      const form = document.querySelector('#teams-create-form')
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
