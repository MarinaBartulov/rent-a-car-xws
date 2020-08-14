<template>
  <div class="container">
    <b-row class="d-flex justify-content-center responsive">
      <b-col class="col-5 md=5">
        <b-card class="shadow">    
            <div class="text-center">
              <h3 class="dark-grey-text mb-2">
                <strong>Sign up</strong>
              </h3>
            </div>
          <b-card-body>
            <b-form>
              <b-input-group class="mb-4 mt-3">
                <b-input-group-prepend is-text>
                  <b-icon icon="person-lines-fill"></b-icon>
                </b-input-group-prepend>
                <b-form-input type="text" required placeholder="Name"></b-form-input>
              </b-input-group>
              <b-input-group class="mb-4">
                <b-input-group-prepend is-text>
                  <b-icon icon="person-lines-fill"></b-icon>
                </b-input-group-prepend>
                <b-form-input type="text" required placeholder="Surname"></b-form-input>
              </b-input-group>
              <b-input-group class="mb-4">
                <b-input-group-prepend is-text>
                  <b-icon icon="person-fill"></b-icon>
                </b-input-group-prepend>
                <b-form-input type="text" required placeholder="Username"></b-form-input>
              </b-input-group>
              <b-input-group class="mb-4">
                <b-input-group-prepend is-text>
                  <b-icon icon="lock-fill"></b-icon>
                </b-input-group-prepend>
                <b-form-input type="password" required placeholder="Password"></b-form-input>
              </b-input-group>
              <b-input-group class="mb-4">
                <b-input-group-prepend is-text>
                  <b-icon icon="exclamation-diamond-fill"></b-icon>
                </b-input-group-prepend>
                <b-form-input type="password" required placeholder="Confirm your password"></b-form-input>
              </b-input-group>
              <b-input-group class="mb-4">
                <b-input-group-prepend is-text>
                  <b-icon icon="house-fill"></b-icon>
                </b-input-group-prepend>
                <b-form-input type="text" required placeholder="Address"></b-form-input>
              </b-input-group>
              <b-input-group class="mb-4">
                <b-input-group-prepend is-text>
                  <b-icon icon="at"></b-icon>
                </b-input-group-prepend>
                <b-form-input type="email" required placeholder="E-mail"></b-form-input>
              </b-input-group>
              <b-input-group>
                <b-input-group-prepend is-text>
                  <b-icon icon="phone"></b-icon>
                </b-input-group-prepend>
                <b-form-input type="text" required placeholder="Phone number"></b-form-input>
              </b-input-group>
              <b-button type="button" class="mt-4 mb-1 col-12">Sign up</b-button>
            </b-form>
          </b-card-body>
          <hr class="col-10">
            <p class="font-small grey-text d-flex justify-content-end mr-4">
              Already a member?
              <a href="/login" class="ml-1">Sign in</a>
            </p>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  name: 'RegistrationPage',
  data() {
    return {
      
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