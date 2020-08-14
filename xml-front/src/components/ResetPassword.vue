<template>
  <div align="center">
    <div class="container marginTop">
      <b-row class="d-flex justify-content-center responsive">
        <b-col class="col-5 md=5">
          <b-card class="shadow">
            <div class="text-center">
              <h4 class="dark-grey-text mb-2">
                <strong>Reset password</strong>
              </h4>
            </div>
            <b-card-body>
              <validation-observer ref="observer" v-slot="{ handleSubmit }">
                <b-form @submit.prevent="handleSubmit(resetPassword)">
                  <validation-provider
                    name="New password"
                    :rules="{ required: true, regex: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&+=])(?=\S+$).{10,}$/ }"
                    v-slot="validationContext"
                  >
                    <b-input-group class="mb-4 mt-1">
                      <b-form-input
                        id="newPasswordId"
                        v-model="newPassword"
                        type="password"
                        placeholder="Enter new password"
                        :state="getValidationState(validationContext)"
                      ></b-form-input>
                      <b-tooltip
                        target="newPasswordId"
                        triggers="hover"
                      >Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 digit, 1 special character and must be minimum 10 characters long.</b-tooltip>
                      <b-form-invalid-feedback id="newPasswordId">{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                    </b-input-group>
                  </validation-provider>
                  <validation-provider
                    name="Confirm new password"
                    :rules="{ required: true, is: newPassword }"
                    v-slot="validationContext"
                  >
                    <b-input-group class="mb-4">
                      <b-form-input
                        id="confirmingPasswordId"
                        v-model="confirmingPassword"
                        type="password"
                        placeholder="Confirm new password"
                        :state="getValidationState(validationContext)"
                      ></b-form-input>
                      <b-form-invalid-feedback
                        id="confirmingPasswordId"
                      >{{ validationContext.errors[0] || invalidFeedbackPasswordC }}</b-form-invalid-feedback>
                      <b-form-valid-feedback id="confirmingPasswordId">{{ validFeedbackPasswordC }}</b-form-valid-feedback>
                    </b-input-group>
                  </validation-provider>
                  <b-button type="submit" class="mt-4 mb-1 col-12">Reset</b-button>
                </b-form>
              </validation-observer>
            </b-card-body>
          </b-card>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ResetPassword",
  data() {
    return {
      newPassword: "",
      confirmingPassword: ""
    };
  },
  methods: {
    getValidationState({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null;
    },
    resetPassword: function() {
      const requestToken = this.$route.query.token;
      if(requestToken) {
        axios.put("http://localhost:8083/user-service/auth/reset-password", {
            newPassword: this.newPassword,
            token: requestToken
        }).then(() => {
          this.$router.push({ name: "Login" });
        }).catch(() => {
          this.$notify({
            group: "mainHolder",
            title: "Error",
            text: "Resetting password failed.",
            type: "error"
          });
          this.clear();
        });
      } else {
        this.$notify({
            group: "mainHolder",
            title: "Error",
            text: "Resetting password failed.",
            type: "error"
          });
          this.clear();
      }     
    },
    clear() {
      this.newPassword = "";
      this.confirmingPassword = "";
      this.$refs.observer.reset();
    }
  },
  computed: {
    statePasswordC: function() {
      if (this.confirmingPassword != this.newPassword) {
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

<style scoped>
.marginTop {
  margin-top: 10%;
}
.shadow {
  -webkit-box-shadow: 5px 5px 5px 5px;
  box-shadow: 5px 5px 5px 5px;
}
</style>