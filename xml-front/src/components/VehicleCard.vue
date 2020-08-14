<template>
  <b-card no-body class="overflow-hidden custom-width mb-3">
    <template v-slot:header>
      <h3 class="mb-0 text-center">{{vehicle.car.carBrand + ' ' + vehicle.car.carModel}}</h3>
    </template>
    <b-row no-gutters>
      <b-col md="6">
        <b-card-img :src="vehicle.car.photos64[0]" width="415" height="277" alt="Image" class="rounded-0 mt-2 ml-2 mb-2"></b-card-img>
      </b-col>
      <b-col md="6">
        <b-card-body>
          <b-card-text>
              <b-row class="mt-2">
                  <b-col col-3>
                       <b-icon icon="star-fill"></b-icon>
                        {{vehicle.car.rate}}
                  </b-col>
                  <b-col col-3>
                        <b>Price per day:</b> {{vehicle.priceList.pricePerDay}} <b>€</b>
                    </b-col>
              </b-row>   
              <b-row class="mt-2">
                <b-col>
                  <b>Vehicle type:</b> {{vehicle.car.carClass}}                 
                </b-col>
                <b-col>
                  <b>Fuel type:</b> {{vehicle.car.fuelType}}
                </b-col>
              </b-row>       
              <b-row class="mt-2">
                  <b-col>
                    <b>Transmission:</b> {{vehicle.car.transType}}
                  </b-col>
                  <b-col>
                    <b>Children seats:</b> {{vehicle.car.childrenSeats}}
                  </b-col>
              </b-row> 
              <b-row class="mt-2">
                  <b-col>
                    <b>Mileage:</b> {{vehicle.car.mileage}} <b>km</b>
                  </b-col>
                  <b-col>
                    <b>Km limit:</b>  {{vehicle.limitKm == 0 ? 'UNLIMITED' : vehicle.limitKm + ' km' }} 
                  </b-col>
              </b-row>     
              <b-row class="mt-2">
                  <b-col>
                    <b> Location </b> {{vehicle.location}}
                  </b-col>
                  <b-col>
                      <b>Collision Damage Waiver:</b> {{ vehicle.cdw == true ? 'Yes' : 'No' }}
                  </b-col>
              </b-row>     
          </b-card-text>       
        </b-card-body>
        <b-row>
          <!--Dugme "Add to {korpica}" ce se prikazivati samo ako je korisnik ulogovan-->
          <b-button v-show="showCartButton && this.$store.getters.currentUserId != vehicle.ownerId" type="button" class="ml-auto mt-5 mb-2 buttons cartButton"> <a class="removeDecoration" @click="addToCart(vehicle.id, startDate, endDate)">Add to <b-icon icon="bucket-fill"></b-icon></a></b-button>
          <b-button v-show="showDiffButtons" type="button" class="ml-auto mr-4 mt-5 mb-2 buttons"><a class="removeDecoration" @click="details(vehicle.id)">Details</a></b-button>
        </b-row> 
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
import axios from 'axios';
export default {
    name: 'VehicleCard',
    props: {
        vehicle: {},
        showDiffButtons: Boolean,
        startDate: String,
        endDate: String
    },
    data() {
        return {
          show: false,
        }
    },
    methods: {

      details: function(id)
      {
        this.$router.push({ path: 'vehicle/details', query: { id: id } });
      },
      addToCart: function(id, startDate, endDate){
        axios.post("http://localhost:8083/rent-service/api/cartItem", {"adID":id, "startDate":startDate, "endDate":endDate}).then(
          response => {
            console.log(response.data);
              this.$bvToast.toast("You have successfully added the ad in the cart.", {
              title: "Success",
              variant: "success",
              solid: true
            });
            //this.$refs.observer.reset();
          }).catch(error => {
            if(error.response && error.response.status === 500){
               this.$bvToast.toast("Server error. Please try again.", {
                  title: "Error",
                  variant: "danger",
                  solid: true
            });
            }
            if(error.response && (error.response.status === 400 || error.response.status === 404)){
              this.$bvToast.toast(error.response.data, {
                title: "Error",
                variant: "danger",
                solid: true
              });
              
            }
            //this.$refs.observer.reset();
          })
      },
      },
      computed: {
        showCartButton(){
          return this.$store.getters.userRole == "ROLE_CLIENT" && this.$store.getters.loggedIn;
        }
      }
      
    

}
</script>

<style scoped>

.custom-width {
    width: 75%;
}

.removeDecoration {
    text-decoration: none;
    color: #fff;
}

.buttons {
  width: 110px;
}

.cartButton {
  margin-right: -8em;
}

</style>