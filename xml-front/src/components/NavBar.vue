<template>
   <div>
    <b-navbar toggleable="lg" type="dark" variant="dark" class="navbar">
    <b-navbar-brand href="/" class="title font-weight-bold">Rent A Car</b-navbar-brand>
          <b-navbar-nav class="ml-auto">
            <b-nav-item href="/home" link-classes="text-light"><b>Search Cars</b></b-nav-item>
            <b-nav-item  v-if="clientAgentLoggedIn" href="/post/ad" link-classes="text-light"><b>Post Ad</b></b-nav-item>
            <b-nav-item  v-if="clientAgentLoggedIn" href="/priceLists" link-classes="text-light"><b>Price Lists</b></b-nav-item>
            <b-nav-item  v-if="clientAgentLoggedIn" href="/reservations" link-classes="text-light"><b>Reservations</b></b-nav-item>
            <b-nav-item  v-if="clientAgentLoggedIn" href="/newRequests" link-classes="text-light"><b>New Requests</b> <b-badge v-if="showNewRequests" pills variant="danger">{{numberOfNewRequests}}</b-badge> </b-nav-item>
            <b-nav-item  v-if="clientAgentLoggedIn" href="/statistic" link-classes="text-light"><b>Statistic</b> </b-nav-item>

          </b-navbar-nav>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
            <b-nav-item v-if="showClientProfile && showBills" @click="showModal()" link-classes="text-light"><b>Bills</b> <b-badge pills variant="danger">{{numberOfBills}}</b-badge></b-nav-item>
            <b-nav-item v-if="showClientProfile" href="/myRequests" link-classes="text-light"><b>My Requests</b></b-nav-item>
            <b-nav-item v-if="showClientProfile" href="/cart" link-classes="text-light"><b>Cart</b></b-nav-item>
            <b-nav-item v-if="showAdminProfile" href="/adminProfile" link-classes="text-light"><b>Admin profile</b></b-nav-item>
            <b-nav-item v-if="loggedIn" href="/change-password" link-classes="text-light"><b>Change password</b></b-nav-item>
            <b-nav-item v-if="loggedIn" @click="logout()" link-classes="text-light"><b>Logout</b></b-nav-item>
            <b-nav-item v-if="!loggedIn" href="/login" link-classes="text-light"><b>Login</b></b-nav-item>
            <b-nav-item v-if="!loggedIn" href="/registration" link-classes="text-light"><b>Register</b></b-nav-item>           
        
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <b-modal id="modal-1" ref="billsModal" title="Your unpaid bills" hide-footer>
        <b-table v-if="showBills"  class="tables" striped outlined hover fixed head-variant="dark" :items="items" :fields="fields">
          <template v-slot:cell(pay)="row">
            <b-button size="sm" variant="outline-danger" @click="pay(row.item.id, row.item.requestAdId)"> Pay </b-button>
          </template>
        </b-table>
        <div v-if="!showBills">
            <h1 class="empty">No more unpaid bills left.</h1>
        </div>
        <div class="row d-flex justify-content-center">
          <b-button class="mt-3 mr-2 col-3" variant="outline-dark"  block @click="hideModal">Close</b-button>
        </div>
    </b-modal>

  </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'NavBar',
    data() {
        return {
           numberOfNewRequests: 2,
           showNewRequests: false,
           numberOfBills: null,
           showBills: false,
           fields: [
            { key :"kmLimit", label: "Car km limit"},
            { key :"kmExceeded", label: "Km exceeded"},
            { key :"payment", label: "Payment (\u20AC)"},
            "Pay"
          ],
          items: [],
        }
    },
    methods: {
       logout: function() {
          this.$store.dispatch('destroyToken');
          this.$store.dispatch('destroyCurrentUser');
          this.$router.push({'name': 'Login'});
        },

      showModal: function() {

          this.getBills();
          this.$refs["billsModal"].show();
        },

      hideModal() {
        this.$refs["billsModal"].hide();
      },

      pay(id, requestAdId)
      {
          axios.put("http://localhost:8083/rent-service/api/bills/"+ id + "/" + requestAdId).then(
              response => {
                  if(response.data == true)
                  {
                     this.$bvToast.toast('Bill paid', {
                      title: 'Success',
                      variant: 'success',
                      solid: true
                    });   
                    this.getBillsNumber();
                    this.getBills();
                  }
                  else
                  {
                    this.$bvToast.toast('Error', {
                     title: 'Can\'t be paid ',
                     variant: 'danger',
                     solid: true
                    });
                  }
              }
            ).catch(error => {
                console.log(error.data);
            })
            
      },

      getBills()
      {
        axios.get("http://localhost:8083/rent-service/api/bills").then(
              response => {
                this.items = response.data;
              }
            ).catch(error => {
                console.log(error.data);
            })
      },

      getBillsNumber()
      {
       
        axios.get("http://localhost:8083/rent-service/api/bills/number").then(
              response => {
                this.numberOfBills = response.data;
                if(this.numberOfBills > 0){
                  this.showBills = true;
                }
                else
                {
                  this.showBills = false;
                }
                console.log("broj racuna "+ this.numberOfBills);
              }
            ).catch(error => {
                console.log(error.data);
            })
      }

    },
    created() {
      if((this.$store.getters.userRole == "ROLE_CLIENT" || this.$store.getters.userRole == "ROLE_AGENT") && this.$store.getters.loggedIn){
        axios.get("http://localhost:8083/rent-service/api/request/pending/number").then(
              response => {
                this.numberOfNewRequests = response.data;
                if(this.numberOfNewRequests > 0){
                  this.showNewRequests = true;
                }
              }
            ).catch(error => {
                console.log(error.data);
            })
      }

       if(this.$store.getters.userRole == "ROLE_CLIENT" && this.$store.getters.loggedIn){
          this.getBillsNumber();
          
       }

    },
    computed: {
      loggedIn(){
        return this.$store.getters.loggedIn;
      },
      showAdminProfile(){
        return this.$store.getters.userRole == "ROLE_ADMIN" && this.$store.getters.loggedIn;
      },
      showAgentProfile(){
        return this.$store.getters.userRole == "ROLE_AGENT" && this.$store.getters.loggedIn;
      },
      showClientProfile(){
        return this.$store.getters.userRole == "ROLE_CLIENT" && this.$store.getters.loggedIn;
      },
     clientAgentLoggedIn(){
        return (this.$store.getters.userRole == "ROLE_CLIENT" || this.$store.getters.userRole == "ROLE_AGENT") && this.$store.getters.loggedIn;
      }, 

    }

}
</script>

<style scoped>

.empty {
  text-align: center;
  color: red;
  margin-top:1em;
}

.tables{
    text-align:center;
}
</style>