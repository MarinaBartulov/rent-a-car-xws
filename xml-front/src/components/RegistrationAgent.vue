<template>
  <div>
    <div>
      <h2>Create an account</h2>
      <validation-observer ref="observer" v-slot="{ handleSubmit }">
        <b-form @submit.prevent="handleSubmit(createAccount)">
          <validation-provider
            name="Owner's first name"
            :rules="{ required: true,alpha_spaces: true, min: 2, max: 20 }"
            v-slot="validationContext"
          >
            <b-form-group id="input-group-1" label="Owner's first name:" label-for="firstNameID">
              <b-form-input
                id="firstNameID"
                v-model="name"
                type="text"
                placeholder="Enter owner's first name"
                :state="getValidationState(validationContext)"
              ></b-form-input>
              <b-form-invalid-feedback id="firstNameID">{{ validationContext.errors[0] }}</b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>

          <validation-provider
            name="Owner's last name"
            :rules="{ required: true, alpha_spaces: true, min: 2, max: 20 }"
            v-slot="validationContext"
          >
            <b-form-group id="input-group-2" label="Owner's last name:" label-for="lastNameID">
              <b-form-input
                id="lastNameID"
                v-model="surname"
                type="text"
                :state="getValidationState(validationContext)"
                placeholder="Enter owner's last name"
              ></b-form-input>
              <b-form-invalid-feedback id="lastNameID">{{ validationContext.errors[0] }}</b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>
          <validation-provider
            name="Email"
            rules="required|email"
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
            :rules="{ required: true, regex: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&+=])(?=\S+$).{8,}$/ }"
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
            >Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 digit and must be minimum 8 characters long.</b-tooltip>
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
            name="Company name"
            :rules="{required: true, regex: /^[a-zA-Z0-9_ ]*$/}"
            v-slot="validationContext"
          >
          <b-form-group id="input-group-6" label="Company name:" label-for="companyNameID">
            <b-form-input
              id="companyNameID"
              v-model="companyName"
              type="text"
              :state="getValidationState(validationContext)"
              placeholder="Enter company name"
            ></b-form-input>
            <b-form-invalid-feedback id="companyNameID">{{ validationContext.errors[0] }}</b-form-invalid-feedback>
          </b-form-group>
          </validation-provider> 

          <validation-provider
            name="Company number"
            :rules="{required: true, numeric: true, min: 9, max: 11}"
            v-slot="validationContext"
          >
          <b-form-group id="input-group-7" label="Company number:" label-for="companyNumberID">
            <b-form-input
              id="companyNumberID"
              v-model="companyNumber"
              type="text"
              :state="getValidationState(validationContext)"
              placeholder="Enter company number"
            ></b-form-input>
            <b-form-invalid-feedback id="companyNumberID">{{ validationContext.errors[0] }}</b-form-invalid-feedback>
          </b-form-group>
          </validation-provider> 

          <validation-provider
            name="Address"
            :rules="{required: true, regex: /^[a-zA-Z0-9_ ]*$/}"
            v-slot="validationContext"
          >
          <b-form-group id="input-group-8" label="Address:" label-for="addressID">
            <b-form-input
              id="addressID"
              v-model="address"
              type="text"
              :state="getValidationState(validationContext)"
              placeholder="Enter address"
            ></b-form-input>
            <b-form-invalid-feedback id="addressID">{{ validationContext.errors[0] }}</b-form-invalid-feedback>
          </b-form-group>
          </validation-provider> 

          <b-button class="btn-submit" type="submit" variant="primary">Create</b-button>
          <b-button class="btn-reset" type="reset" v-on:click="clear" variant="danger">Reset</b-button>
        </b-form>
      </validation-observer>
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
import axios from "axios";
const baseUrl = "http://localhost:8083/user-service/auth/registration/agent";

export default {
  name: 'RegistartionAgent',
  data() {
    return {
      name: '',
      surname: '',
      email: '',
      password: '',
      passwordConfirm: '',
      companyName: '',
      companyNumber: '',
      address: '',
      showError: false,
      headerBgVariantSuccess: "success",
      headerBgVariantError: "danger",
      headerTextVariant: "light",
      errorMessage: 'An error occured while sending the request. Plase try again.'
    };
  },
 methods: {
    createAccount: function() {
    
      const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }

      let registrationRequestAgentDTO = {name: this.name, surname: this.surname, email: this.email, password: this.password, companyName: this.companyName,
      companyNumber: this.companyNumber, address: this.address};

      axios.post(baseUrl, registrationRequestAgentDTO, headers)
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
      this.companyName = '';
      this.companyNumber = '';
      this.address = '';
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
.btn-reset {
  margin-left: 1em;
}
.btn-submit,
.btn-reset {
  width: 5em;
}
</style>