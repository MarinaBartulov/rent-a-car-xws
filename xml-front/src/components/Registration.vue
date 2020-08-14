<template>
  <div id="base-div-reg">
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand href="/">Rent A Car</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item href="/homePage" link-classes="text-light">
            <b>Homepage</b>
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <div id="div-reg">
      <b-tabs content-class="mt-3" fill>
        <b-tab title="Client">
      <h2>Create an account</h2>
      <validation-observer ref="observer" v-slot="{ handleSubmit }">
        <b-form @submit.prevent="handleSubmit(createAccount)">
          <validation-provider
            name="First name"
            :rules="{ required: true,alpha_spaces: true, min: 2, max: 20 }"
            v-slot="validationContext"
          >
            <b-form-group id="input-group-1" label="First name:" label-for="firstNameID">
              <b-form-input
                id="firstNameID"
                v-model="name"
                type="text"
                placeholder="Enter first name"
                :state="getValidationState(validationContext)"
              ></b-form-input>
              <b-form-invalid-feedback id="firstNameID">{{ validationContext.errors[0] }}</b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>

          <validation-provider
            name="Last name"
            :rules="{ required: true, alpha_spaces: true, min: 2, max: 20 }"
            v-slot="validationContext"
          >
            <b-form-group id="input-group-2" label="Last name:" label-for="lastNameID">
              <b-form-input
                id="lastNameID"
                v-model="surname"
                type="text"
                :state="getValidationState(validationContext)"
                placeholder="Enter last name"
              ></b-form-input>
              <b-form-invalid-feedback id="lastNameID">{{ validationContext.errors[0] }}</b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>
          <validation-provider
            name="Email"
            :rules="{required: true, regex: /^[a-zA-Z0-9_+&*-]+(?:\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,7}$/ }"
            v-slot="validationContext"
          >
            <b-form-group id="input-group-3" label="Email address:" label-for="emailID">
              <b-form-input
                id="emailID"
                v-model="email"
                type="email"
                placeholder="Enter email"
                :state="getValidationState(validationContext)"
              ></b-form-input>
              <b-form-invalid-feedback id="emailID">{{ validationContext.errors[0] }}</b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>

          <validation-provider
            name="Password"
            :rules="{ required: true, regex: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&+=])(?=\S+$).{10,}$/ }"
            v-slot="validationContext"
          >
          <b-form-group
            id="input-group-4"
            label="Password:"
            label-for="passwordID"
          >
            <b-form-input
              id="passwordID"
              v-model="password"
              type="password"
              placeholder="Enter password"
              :state="getValidationState(validationContext)"
            ></b-form-input>
            <b-tooltip
              target="passwordID"
              triggers="hover"
            >Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 digit, 1 special character and must be minimum 10 characters long.</b-tooltip>
            <b-form-invalid-feedback id="passwordID">{{ validationContext.errors[0] }}</b-form-invalid-feedback>
          </b-form-group>
          </validation-provider>

          <validation-provider
            name="Password confirm"
            :rules="{ required: true, is: password }"
            v-slot="validationContext"
          >
          <b-form-group
            id="input-group-5"
            label="Confirm password:"
            label-for="confirmpassID"
          >
            <b-form-input
              id="confirmpassID"
              v-model="passwordConfirm"
              type="password"
              placeholder="Confirm password"
              :state="getValidationState(validationContext)"
            ></b-form-input>
            <b-form-invalid-feedback id="confirmpassID">{{ validationContext.errors[0] || invalidFeedbackPasswordC }}</b-form-invalid-feedback>
            <b-form-valid-feedback id="confirmpassID">{{ validFeedbackPasswordC }}</b-form-valid-feedback>
          </b-form-group>
          </validation-provider>

          <validation-provider
            name="Phone number"
            :rules="{required: true, numeric: true, min: 9, max: 11}"
            v-slot="validationContext"
          >
          <b-form-group id="input-group-6" label="Phone number:" label-for="phoneNumberID">
            <b-form-input
              id="phoneNumberID"
              v-model="phoneNumber"
              type="text"
              :state="getValidationState(validationContext)"
              placeholder="Enter phone number"
            ></b-form-input>
            <b-form-invalid-feedback id="phoneNumberID">{{ validationContext.errors[0] }}</b-form-invalid-feedback>
          </b-form-group>
          </validation-provider> 

          <b-button class="btn-submit" type="submit" variant="primary">Create</b-button>
          <b-button class="btn-reset" type="reset" v-on:click="clear" variant="danger">Reset</b-button>
        </b-form>
      </validation-observer>
      </b-tab>
      <b-tab title="Agent/Company">
        <RegistrationAgent />
      </b-tab>
      </b-tabs>
    </div>
    <b-modal
      id="modal-center"
      ref="modal-success"
      ok-only
      :header-bg-variant="headerBgVariantSuccess"
      :header-text-variant="headerTextVariant"
      centered
      title="Registration request successfully sent."
    >
      <p class="my-4">
        Request for registration successfully sent. When administrator accept your request, you will get
        an email with activation link to activate your account.
      </p>
      <p>Thank you for believing in us.</p>
    </b-modal>
    <b-modal
      id="modal-center"
      ref="modal-error"
      ok-only
      :header-bg-variant="headerBgVariantError"
      :header-text-variant="headerTextVariant"
      centered
      title="Sending registration request failed."
    >
      <p class="my-4">{{errorMessage}}</p>
    </b-modal>
  </div>
</template>

<script>
import RegistrationAgent from '../components/RegistrationAgent.vue';
import axios from "axios";
const baseUrl = "http://localhost:8083/user-service/auth/registration";

export default {
  components: {
    RegistrationAgent
  },
  data() {
    return {
      name: '',
      surname: '',
      email: '',
      password: '',
      passwordConfirm: '',
      phoneNumber: '',
      showError: false,
      headerBgVariantSuccess: "success",
      headerBgVariantError: "danger",
      headerTextVariant: "light",
      errorMessage: 'An error occured while sending the request. Plase try again.'
    };
  },
  methods: {
    createAccount: function() {
      //this.$router.push({ path: '/login'});
      /*this.$notify({
                group: 'mainHolder',
                title: 'Important message',
                text: 'Hello user! This is a notification!',
                type: 'success'
            });*/

      const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }

      let registrationRequestDTO = {name: this.name, surname: this.surname, email: this.email, password: this.password, phoneNumber: this.phoneNumber};

      axios.post(baseUrl, registrationRequestDTO, headers)
      .then(() => {
            this.$refs["modal-success"].show();
            this.clear();
      }).catch(
        (error) => {
          if(error.response.status === 406){
            this.errorMessage = 'This email is already in use. Please try with another email.'
          }
          this.$refs["modal-error"].show();
          this.clear();
        }
      )
    },
    clear(){
      this.name = '';
      this.surname = '';
      this.email = '';
      this.password = '';
      this.passwordConfirm = '';
      this.phoneNumber = '';
      this.$refs.observer.reset();
    },
    getValidationState({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null;
    }
  },
  computed: {
    statePasswordC: function() {
      if (this.passwordConfirm != this.password) {
        return false;
      } else {
        return true;
      }
    },
    invalidFeedbackPasswordC: function() {
      if (this.statePasswordC == false) {
        return "Passwords don't match.";
      } else {
        return "";
      }
    },
    validFeedbackPasswordC: function() {
      if (this.statePasswordC) {
        return "Passwords match.";
      } else {
        return "";
      }
    }
  }
};
</script>

<style>
h2 {
  text-align: center;
  margin-top: 10px;
}

#base-div-reg {
  background-image: url("../assets/login.jpg");
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  height: 130vh;
}

#div-reg {
  margin-left: auto;
  margin-right: auto;
  margin-top: 0.1em;
  width: 40%;
  padding: 2em;
  padding-top: 0;
  padding-bottom: 0.5em;
  border-width: 0.5px;
  border-style: solid;
}

.btn-reset {
  margin-left: 1em;
}
.btn-submit,
.btn-reset {
  width: 5em;
}
</style>