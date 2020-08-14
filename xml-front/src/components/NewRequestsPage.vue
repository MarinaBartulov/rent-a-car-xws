<template>
  <div>
    <NavBar/>
    <div  v-if="loading" align="center">
      <br/>
      <br/>
     <b-spinner style="width: 5rem; height: 5rem;" label="Large Spinner"></b-spinner>
    </div>
     <div v-if="!loading">
      <div v-if="showEmpty">
        <h1 class="empty">You don't have new requests.</h1>
      </div>

      <div v-if="!showEmpty" class="container mt-2">
        <div class="custom-width" v-for="req in newRequests" :key="req.id">
          <b-card no-body class="overflow-hidden custom-width mb-3 shadow" header-bg-variant="secondary" header-text-variant="white"  > <!-- Velika kartica za bundle -->
            <template v-slot:header>
                <h3 class="mb-0 text-center">Client: {{req.clientName + ' ' + req.clientLastName}}</h3>
            </template>
            <div class="mt-2" v-for="reqAd in req.requestAds" :key="reqAd.id">
              <b-card no-body class="overflow-hidden shadow custom-width" header-bg-variant="info" header-text-variant="white" >
                  <template v-slot:header>
                    <h3 class="mb-0 text-center">{{reqAd.ad.car.carBrand + ' ' + reqAd.ad.car.carModel}}</h3>
                  </template>
                  <b-row>
                    <b-col md="5">
                      <b-card-img :src="reqAd.ad.car.photo64" width="415" height="277" alt="Image" class="rounded-0 mt-2 ml-2 mb-2"></b-card-img>
                    </b-col> 
                    <b-col md="7">
                        <b-row class="mt-4">
                          <b-col>
                            <b> Start date of rent: </b> {{format_date(reqAd.startDate)}}
                          </b-col>
                          <b-col>
                            <b> End date of rent:</b> {{format_date(reqAd.endDate)}}
                          </b-col>
                        </b-row>
                       
                        <b-row class="mt-3">
                          <b-col>
                            <b> Price in total: </b> {{reqAd.payment}} <b>€</b>
                          </b-col>
                          <b-col>
                            <b> Price per km: </b> {{reqAd.currentPricePerKm}} <b>€</b>
                          </b-col>
                        </b-row>
                        <hr>
                        <b-row class="mt-2">
                          <b-col>
                            <b> Location </b> {{reqAd.ad.location}}
                          </b-col>
                          <b-col>
                            <b> Collision Damage Waiver:</b> {{ reqAd.ad.cdw == true ? 'Yes' : 'No' }}
                          </b-col>
                        </b-row>    
                        <b-row class="mt-2">
                          <b-col>
                            <b> Ad start date: </b> {{format_date(reqAd.ad.startDate)}}
                          </b-col>
                          <b-col>
                            <b> Ad end date:</b> {{format_date(reqAd.ad.endDate)}}
                          </b-col>
                        </b-row>  
                        <hr>
                        <b-row class="mt-2">
                          <b-col col-3>
                            <b> Rate: </b>
                             {{reqAd.ad.car.rate}}  <b-icon icon="star-fill"></b-icon>                   
                          </b-col>
                          <b-col col-3>
                            <b> Children seats: </b> {{reqAd.ad.car.childrenSeats}}
                          </b-col>
                        </b-row>   
                        <b-row class="mt-2 mb-4">
                          <b-col>
                            <b> Mileage:</b> {{reqAd.ad.car.mileage}} <b>km</b>
                          </b-col>
                          <b-col>
                            <b> Km limit:</b> {{reqAd.ad.limitKm == 0 ? 'UNLIMITED' : reqAd.ad.limitKm + ' km' }}
                          </b-col>
                        </b-row>  
                    </b-col>    
                  </b-row>                
              </b-card>
            </div>
            <b-row>
                <b-button  type="button" class="ml-auto mr-2 mt-3 mb-3 buttons" variant="danger" @click="reject(req.id)"> Reject </b-button>
                <b-button  type="button" class="mr-4 mt-3 mb-3 buttons" variant="info" @click="accept(req.id)">Accept</b-button>
            </b-row> 
          </b-card>
        </div>
      </div>
     </div>
  </div>
</template>

<script>
import NavBar from "../components/NavBar.vue";
import axios from "axios";
import moment from 'moment'

export default {
  components: {
    NavBar
  },

  data() {
      return{
        showEmpty: false,
        newRequests: [],
        loading: true,
      }
  },
  methods:
  {
      format_date(value){
         if (value) {
           return moment(String(value)).format("DD-MMM-YYYY")
          }
      },

      accept(id)
      {
          axios.put("http://localhost:8083/rent-service/api/request/accept/" + id).then(
            response=> {
                console.log(response.data);
                this.$bvToast.toast("You have successfully accept the request. Some other requests may have been automatically rejected.", {
                    title: "Success",
                    variant: "success",
                    solid: true
                  });
                  axios.get("http://localhost:8083/rent-service/api/request/pending").then(
                        response=> {
                            this.newRequests = response.data; 
                            console.log(this.newRequests); 
                            if(this.newRequests.length == 0)
                            {
                                this.showEmpty = true;
                            }                  
                        } 
                    ).catch(error => {
                        if(error.response.status === 500){
                            this.$bvToast.toast("Server error. Please try again.", {
                                  title: "Error",
                                  variant: "danger",
                                  solid: true
                                });
                        }else{
                            this.$bvToast.toast(error.response.data, {
                                  title: "Error",
                                  variant: "danger",
                                  solid: true
                                });
                        }
                    }); 
                                 
            } 
        ).catch(error => {
            if(error.response.status === 500){
                this.$bvToast.toast("Server error. Please try again.", {
                      title: "Error",
                      variant: "danger",
                      solid: true
                    });
            }else{
                this.$bvToast.toast(error.response.data, {
                      title: "Error",
                      variant: "danger",
                      solid: true
                    });
            }
        });  
      },

      reject(id)
      {
          axios.put("http://localhost:8083/rent-service/api/request/reject/" + id).then(
            response=> {
                console.log(response);
                let i = 0;
                for(i=0;i<this.newRequests.length;i++){
                  if(this.newRequests[i].id === id){
                      break;
                  }
                }
                this.newRequests.splice(i, 1);
                this.$bvToast.toast("You have successfully rejected the request.", {
                    title: "Sucess",
                    variant: "success",
                    solid: true
                  });               
            } 
        ).catch(error => {
            alert(error.response);
        });  
      }
  },

  created(){
      this.loading = true;
      axios.get("http://localhost:8083/rent-service/api/request/pending").then(
            response=> {
                this.newRequests = response.data; 
                console.log(this.newRequests); 
                if(this.newRequests.length == 0)
                {
                    this.showEmpty = true;
                }        
                this.loading = false;          
            } 
        ).catch(error => {
            alert(error.response);
        });  
    }

  
}
</script>

<style scoped>

.empty {
  text-align: center;
  color: red;
  margin-top:1em;
}
.custom-width {
  width: 95%;
  margin: auto;
}
.buttons {
  width: 110px;
}

</style>