<template>
  <div class="image">
    <b-row>
      <b-col>
        <b-button class="text-center button" variant="success" @click="activate">Activate account</b-button>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import axios from "axios";
const baseUrl = "http://localhost:8083/user-service";

export default {
  name: "ActivateAccountAgent",
  data() {
    return {};
  },
  methods: {
    activate: function() {
      const requestId = this.$route.query.id;
      const requestToken = this.$route.query.token;
      if (requestId && requestToken) {
        axios.put(baseUrl + "/activate-account/agent/request/" + requestId + "/" + requestToken).then(() => {
          this.$router.push({ name: "Login" });
        }).catch(() => {
          this.$notify({
            group: "mainHolder",
            title: "Error",
            text: "Activating account failed!",
            type: "error"
          });
        })
      } else {
        this.$notify({
            group: "mainHolder",
            title: "Error",
            text: "Activating account failed!",
            type: "error"
        });
      }
    }
  }
};
</script>

<style scoped>
.image {
  background-image: url("../assets/login.jpg");
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  height: 100vh;
}

.button {
  width: 190px;
  text-align: center;
  margin-top: 25%;
  margin-left: 45%;
}
</style>