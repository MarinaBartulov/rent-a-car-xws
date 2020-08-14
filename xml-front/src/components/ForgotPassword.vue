<template>
  <div align="center">
    <NavBar />
    <div class="container marginTop">
      <b-row class="d-flex justify-content-center responsive">
        <b-col class="col-5 md=5">
          <b-card class="shadow">
            <div class="text-center">
              <h4 class="dark-grey-text mb-2">
                <strong>Forgot password</strong>
              </h4>
            </div>
            <b-card-body>
              <validation-observer ref="observer" v-slot="{ handleSubmit }">
                <b-form @submit.prevent="handleSubmit(send)">
                  <validation-provider
                    name="Email"
                    :rules="{ required: true, regex: /^[a-zA-Z0-9_+&*-]+(?:\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,7}$/ }"
                    v-slot="validationContext"
                  >
                    <b-input-group class="mb-4">
                      <b-form-input
                        id="emailId"
                        v-model="email"
                        type="email"
                        placeholder="Enter your email"
                        :state="getValidationState(validationContext)"
                      ></b-form-input>
                      <b-form-valid-feedback id="emailId">{{ validationContext.errors[0] }}</b-form-valid-feedback>
                    </b-input-group>
                  </validation-provider>
                  <b-button type="submit" class="mt-4 mb-1 col-12">Send</b-button>
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
import NavBar from "../components/NavBar.vue";
import axios from "axios";

export default {
  name: "ForgotPassword",
  components: {
    NavBar
  },
  data() {
    return {
      email: '',
    };
  },
  methods: {
    getValidationState({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null;
    },
    send: function() {
      axios.post("http://localhost:8083/user-service/auth/forgot-password", {
         email: this.email
        })
        .then(() => {
          this.$notify({
            group: "mainHolder",
            title: "Success",
            text: "Email with link for resetting password successfully sent!",
            type: "success"
          });
          this.clear();
        })
        .catch(() => {
          this.$notify({
            group: "mainHolder",
            title: "Error",
            text: "Error ocured while sending email. Please try again.",
            type: "error"
          });
          this.clear();
        });
    },
    clear() {
      this.email = "";
      this.$refs.observer.reset();
    }
  },
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