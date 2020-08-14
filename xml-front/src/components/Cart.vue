<template>
  <div>
    <NavBar />
    <div  v-if="loading" align="center">
      <br/>
      <br/>
     <b-spinner style="width: 5rem; height: 5rem;" label="Large Spinner"></b-spinner>
    </div>
    <div v-if="!loading">
    <div v-if="showEmpty">
      <h1 class="emptyCart">Your cart is empty.</h1>
    </div>
    <div v-if="!showEmpty" class="container d-flex mt-5">
      <b-form-group class="ml-auto mr-custom">
        <b-row>
          <b-form-checkbox
          id="checkbox-1"
          v-model="bundle"
          name="checkbox-1"
          :value="true"
          class="mr-2 mt-1"
        >Create bundle request for the ads with the same owner</b-form-checkbox>
        <b-button @click="createRequest()">Create request</b-button>
        </b-row>        
      </b-form-group>
    </div>
    <div style="width:70%;" class="container mt-3 d-flex justify-content-center" v-for="ci in cartItems" :key="ci.id">
      <!--<VehicleCard :showDiffButtons="false" :vehicle="v" />-->
      <b-card no-body class="overflow-hidden custom-width mb-3">
        <template v-slot:header>
          <h3 class="mb-0 text-center">{{ci.ad.car.carBrand + ' ' + ci.ad.car.carModel}}</h3>
        </template>
      <b-row no-gutters>
        <b-col md="5">
          <b-card-img :src="ci.ad.car.photos64[0]" width="415" height="277" alt="Image" class="rounded-0 mt-2 ml-2 mb-2"></b-card-img>
        </b-col>
        <b-col md="7">
          <b-card-body>
            <b-card-text>
                <b-row class="mt-2">
                    <b-col col-3>
                        <b-icon icon="star-fill"></b-icon>
                          {{ci.ad.car.rate}}
                    </b-col>
                    <b-col col-3>
                          <b>Price per day:</b> {{ci.ad.priceList.pricePerDay}} <b>€</b>
                      </b-col>
                </b-row>   
                <b-row class="mt-2">
                  <b-col>
                    <b>Vehicle type:</b> {{ci.ad.car.carClass}}                 
                  </b-col>
                  <b-col>
                    <b>Fuel type:</b> {{ci.ad.car.fuelType}}
                  </b-col>
                </b-row>       
                <b-row class="mt-2">
                    <b-col>
                      <b>Transmission:</b> {{ci.ad.car.tranType}}
                    </b-col>
                    <b-col>
                      <b>Children seats:</b> {{ci.ad.car.childrenSeats}}
                    </b-col>
                </b-row> 
                <b-row class="mt-2">
                    <b-col>
                      <b>Mileage:</b> {{ci.ad.car.mileage}} <b>km</b>
                    </b-col>
                    <b-col>
                      <b>Km limit:</b> {{ci.ad.limitKm}}
                    </b-col>
                </b-row>     
                <b-row class="mt-2">
                    <b-col>
                      <b> Location </b> {{ci.ad.location}}
                    </b-col>
                    <b-col>
                        <b>Collision Damage Waiver:</b> {{ ci.ad.cdw == true ? 'Yes' : 'No' }}
                    </b-col>
                </b-row>     
                <b-row class="mt-2">
                    <b-col>
                      <b> Start date of rent </b> {{formatDate(ci.startDate)}}
                    </b-col>
                    <b-col>
                        <b>End date of rent:</b> {{formatDate(ci.endDate)}}
                    </b-col>
                </b-row>   
            </b-card-text>       
          </b-card-body>
          <b-row>
            <!--Dugme "Add to {korpica}" ce se prikazivati samo ako je korisnik ulogovan-->
            <b-button style="margin-bottom:0.5em;" type="button" class="ml-auto mr-2 mt-5 buttons"> <a style="color:red;" class="removeDecoration" @click="removeFromCart(ci.id)">Remove from <b-icon icon="bucket-fill"></b-icon></a></b-button>
            <b-button style="margin-bottom:0.5em;" type="button" class="mr-4 mt-5 buttons"><a class="removeDecoration" @click="details(ci.ad.id)">Details</a></b-button>
          </b-row> 
        </b-col>
      </b-row>
    </b-card>
    </div>
    </div>
  </div>
</template>

<script>
import NavBar from "../components/NavBar.vue";
//import VehicleCard from "../components/VehicleCard.vue";
import axios from 'axios';

export default {
  name: "Cart",
  components: {
    NavBar,
    //VehicleCard
  },
  data() {
    return {
      bundle: false,
      showEmpty: false,
      loading: true,
      cartItems:[],
      /*vehicles: [
        {
          id: 1,
          image:
            "https://audimediacenter-a.akamaihd.net/system/production/media/49930/images/28318372b7f78fa640c07e629929a92fffb90804/A178321_x500.jpg?1582358914",
          brand: "Audi",
          model: "A8",
          price: 75,
          fuelType: "Disel",
          vehicletype: "Saloon",
          transmission: "Manual",
          mileage: 15000,
          kilometerLimit: "Unlimited",
          childrenSeats: 0,
          cdw: true,
          rate: 4.5
        }
      ]*/
    };
  },
  created() {
    this.loading = true;
    axios.get("http://localhost:8083/rent-service/api/cart").then(
            response=> {
                this.cartItems = response.data;
                console.log(this.cartItems);
                if(this.cartItems.length == 0){
                  this.showEmpty = true;
                }
                this.loading = false;

            }).catch(error => {
                 alert(error.response);
            })
  },
  watch: {
    cartItems: function(newValue,oldValue){
      console.log(oldValue.length);
      if(newValue.length == 0){
           this.showEmpty = true;
      }
    }
  },
  methods: {
    removeFromCart(id){

      axios.delete("http://localhost:8083/rent-service/api/cartItem/"+id).then(
        response => {
           console.log(response);
           let i = 0;
           for(i=0;i<this.cartItems.length;i++){
             if(this.cartItems[i].id === id){
                break;
             }
           }
           console.log("Pre brisanja");
           console.log(this.cartItems);
           this.cartItems.splice(i, 1);
           console.log("Posle brisanja");
           console.log(this.cartItems);
           this.$bvToast.toast("You have successfully removed the item.", {
              title: "Sucess",
              variant: "success",
              solid: true
            });
            //this.$refs.observer.reset();
        }
      ).catch(error => {
         this.$bvToast.toast(error.response.data, {
              title: "Error",
              variant: "danger",
              solid: true
            });
            //this.$refs.observer.reset();
      })
    },
    details(id){
       this.$router.push({ path: 'vehicle/details', query: { id: id } });
    },
    formatDate(date){
      let dateParts = [];
      dateParts = date.split("-");
      return dateParts[2] + "/" + dateParts[1] + "/" + dateParts[0];
    },
    createRequest(){
      let cartItemsIDs = [];
      for(let i=0;i<this.cartItems.length;i++){
        cartItemsIDs.push(this.cartItems[i].id);
      }
      let dto = {"cartItemsIDs": cartItemsIDs, "bundle":this.bundle};
      axios.post("http://localhost:8083/rent-service/api/request", dto).then(
        response => {
          console.log(response.data);
             this.cartItems = [];
             this.$bvToast.toast("You have successfully sent the requests.", {
              title: "Success",
              variant: "success",
              solid: true
            });
            //this.$refs.observer.reset();

        }).catch(error => {
            if(error.response && error.response.status === 404){
              this.$bvToast.toast(error.response.data, {
                title: "Error",
                variant: "danger",
                solid: true
              });
              //this.$refs.observer.reset();
            }
            if(error.response && error.response.status === 500){
              this.$bvToast.toast("Server error. Please try again.", {
                title: "Error",
                variant: "danger",
                solid: true
              });
            }
            if(error.response && error.response.status === 400){
              this.$bvToast.toast(error.response.data, {
                title: "Error",
                variant: "danger",
                solid: true
              });
              axios.get("http://localhost:8083/rent-service/api/cart").then(
                  response=> {
                      this.cartItems = response.data;
                      console.log(this.cartItems);
                      if(this.cartItems.length == 0){
                        this.showEmpty = true;
                      }

                  }).catch(error => {
                      alert(error.response);
                  })
            }
        })
      
    }
  }
};
</script>

<style scoped>

.mr-custom {
  margin-right: 14%;
}

.emptyCart {
  text-align: center;
  color: red;
  margin-top:1em;
}

</style>