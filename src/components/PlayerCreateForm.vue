<template>
  <button class='btn btn-primary sticky-button' data-bs-toggle='offcanvas' data-bs-target='#players-create-offcanvas'
          aria-controls='#players-create-offcanvas'>
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16" style="--darkreader-inline-fill: currentColor;" data-darkreader-inline-fill="">
      <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"></path>
    </svg>
  </button>
  <div class='offcanvas offcanvas-end' tabindex='-1' id='players-create-offcanvas' aria-labelledby='offcanvas-label'>
    <div class='offcanvas-header'>
      <h5 id='offcanvas-label'>New Player</h5>
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
          <input type='text' class='form-control' id='birthday' v-model='birthday'>
          <div class='invalid-feedback'>
            Please provide the birthday.
          </div>
        </div>
        <div class='mb-3'>
          <div class='form-check'>
            <input class='form-check-input' type='checkbox' id='isStudent' v-model='isStudent' >
            <label class='form-check-label' for='isStudent'>
              Student?
            </label>
          </div>
        </div>
        <div class='mb-3'>
          <div class='form-check'>
            <input class='form-check-input' type='checkbox' id='isCompetitive' v-model='isCompetitive'>
            <label class='form-check-label' for='isCompetitive'>
              Competitive?
            </label>
          </div>
        </div>
        <div v-if='this.serverValidationMessages'>
          <ul>
            <li v-for='(message, index) in serverValidationMessages' :key='index' style='color: red'>
              {{ message }}
            </li>
          </ul>
        </div>
        <div class='mt-5'>
          <button class='btn btn-primary me-3' type='submit' @click.prevent='createPlayer'>Create</button>
          <button class='btn btn-danger' type='reset'>Reset</button>
        </div>
      </form>
    </div>
    <button
      class="btn btn-primary"
      data-bs-target="#collapseTarget"
      data-bs-toggle="collapse">
      Bootstrap collapse
    </button>
    <div class="collapse py-2" id="collapseTarget">
      This is the toggle-able content!
    </div>
  </div>
</template>

<script>
export default {
  name: 'PlayerCreateForm',
  data () {
    return {
      playerName: '',
      bnetId: '',
      discordTag: '',
      firstName: '',
      lastName: '',
      gender: '',
      birthday: '',
      isStudent: false,
      isCompetitive: false,
      serverValidationMessages: []
    }
  },
  methods: {
    createPlayerConsole () {
      console.log(this.bnetId)
      console.log(this.discordTag)
      console.log(this.firstName)
      console.log(this.lastName)
      console.log(this.gender)
      console.log(this.birthday)
      console.log(this.isStudent)
      console.log(this.isCompetitive)
    },
    async createPlayer () {
      if (this.validate()) {
        // const endpoint = process.env.VUE_APP_BACKEND_BASE_URL + '/api/v1/players'
        const myHeaders = new Headers()
        myHeaders.append('Content-Type', 'application/json')

        const player = JSON.stringify({
          playerName: this.playerName,
          bnetId: this.bnetId,
          discordTag: this.discordTag,
          gender: this.gender,
          firstName: this.firstName,
          lastName: this.lastName,
          birthday: this.birthday.reviver,
          student: this.isStudent,
          competitive: this.isCompetitive
        })
        const requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: player,
          redirect: 'follow'
        }
        fetch('http://localhost:8080/api/v1/players', requestOptions)
          .then(response => response.text())
          .then(result => console.log(result))
          .catch(error => console.log('error', error))
        // const response = await fetch(endpoint, requestOptions)
        // await this.handleResponse(response)
      }
    },
    async handleResponse (response) {
      if (response.ok) {
        this.$emit('created', response.headers.get('location'))
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
      // const form = document.getElementById('players-create-form')
      // form.classList.add('was-validated')
      // return form.checkValidity()
      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      let valid = true
      const forms = document.querySelectorAll('.needs-validation')

      // Loop over them and prevent submission
      Array.prototype.slice.call(forms)
        .forEach(function (form) {
          form.addEventListener('submit', function (event) {
            if (!form.checkValidity()) {
              event.preventDefault()
              event.stopPropagation()
              valid = false
            }

            form.classList.add('was-validated')
          }, false)
        })
      return valid
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
