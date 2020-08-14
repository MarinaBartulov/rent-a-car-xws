<template>
    <div>
        <NavBar/>

        <div  v-if="loading" align="center">
            <br/>
            <br/>
            <b-spinner style="width: 5rem; height: 5rem;" label="Large Spinner"></b-spinner>
        </div>

        <div class="mx-5 my-4" v-if="!loading">
        <b-tabs content-class="mt-3" >
            
          <b-tab title="Sent requests" active :title-link-class="linkClass()">
            <div v-if="showEmptyPendingRequests">
                <h1 class="empty">You don't have any sent requests.</h1>
            </div>
            <div class="container">
              <div class="custom-width" v-for="req in pendingRequests" :key="req.id">
                <b-card no-body class="overflow-hidden custom-width mb-3 shadow" header-bg-variant="dark" header-text-variant="white"  > <!-- Velika kartica za bundle -->
                  <template v-slot:header>
                    <h3 class="mb-0 text-center">Client: {{req.clientName + ' ' + req.clientLastName}}</h3>
                  </template>
                  <div class="mt-2" v-for="reqAd in req.requestAds" :key="reqAd.id">
                    <b-card no-body class="overflow-hidden shadow custom-width" header-bg-variant="warning" header-text-variant="dark" >
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
                    <b-button  type="button" class="ml-auto mr-4 mt-3 mb-3 buttons" variant="danger" @click="cancel(req.id)" > Cancel </b-button>
                  </b-row> 
                </b-card>
              </div>
            </div>
          </b-tab>

          <b-tab title="My active requests" :title-link-class="linkClass()">
            <div v-if="showEmptyPaidRequests">
                <h1 class="empty">You don't have any active requests.</h1>
            </div>
            
            <div class="container">
              <div class="custom-width" v-for="req in paidRequests" :key="req.id">
                <b-card no-body class="overflow-hidden custom-width mb-3 shadow" header-bg-variant="dark" header-text-variant="white"  > <!-- Velika kartica za bundle -->
                  <template v-slot:header>
                    <h3 class="mb-0 text-center">Client: {{req.clientName + ' ' + req.clientLastName}}</h3>
                  </template>
                  <div class="mt-2" v-for="reqAd in req.requestAds" :key="reqAd.id">
                    <b-card no-body class="overflow-hidden shadow custom-width" header-bg-variant="success" header-text-variant="white" >
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
                    <b-button  type="button" class="ml-auto mr-4 mt-3 mb-3 buttons" variant="success" @click="goToChat(req.id)">Chat</b-button>
                  </b-row> 
                </b-card>
              </div>
            </div>
           
              
          </b-tab>

          <b-tab title="History" :title-link-class="linkClass()">
            <div v-if="showEmptyOldRequests">
                <h1 class="empty">You don't have any old requests.</h1>
            </div>
            
            <div class="container">
              <div class="custom-width" v-for="req in oldRequests" :key="req.id">
                <b-card no-body class="overflow-hidden custom-width mb-3 shadow" header-bg-variant="dark" header-text-variant="white"  > <!-- Velika kartica za bundle -->
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
                    <b-button  type="button" class="ml-auto mr-4 mt-3 mb-3 buttons" variant="info" @click="goToChat(req.id)">Chat</b-button>
                  </b-row> 
                </b-card>
              </div>
            </div>
           
              
          </b-tab>


        </b-tabs>

      </div>
      
    </div>
</template>

<script>

import NavBar from "../components/NavBar.vue";
import axios from "axios";
import moment from 'moment'

export default {
    name: 'ReservationsPage',
    components: {
        NavBar
    },
    data(){
        return {
           loading: false,
           showEmptyPaidRequests: false,
           showEmptyPendingRequests: false,
           showEmptyOldRequests: false,
           pendingRequests: [],
           paidRequests: [],
           oldRequests: [],
        }
    },
     methods: {

      linkClass() {
        return ['bg-dark', 'text-light']
      },

      format_date(value){
         if (value) {
           return moment(String(value)).format("DD-MMM-YYYY")
          }
      },

      goToChat(id)
      {
          this.$router.push({ path: '/requests/'+ id +'/chat'});
      },

      cancel(id)
      {
          axios.put("http://localhost:8083/rent-service/api/request/cancel/"+ id).then(
            response=> {
                console.log(response.data);
                let i = 0;
                for(i=0;i<this.pendingRequests.length;i++){
                    if(this.pendingRequests[i].id === id){
                        break;
                    }
                }
                this.pendingRequests.splice(i, 1);
              this.$bvToast.toast("Request canceled", {
              title: "Success",
              variant: "success",
              solid: true
            });       
            } 
        ).catch(error => {
            this.$bvToast.toast(error.response.data, {
              title: "Error",
              variant: "danger",
              solid: true
            });
        });  

      },
      
        getPendingRequests()
        {
            axios.get("http://localhost:8083/rent-service/api/request/pending/client/"+this.$store.getters.currentUserId).then(
            response=> {
                this.pendingRequests = response.data; 

                if(this.pendingRequests.length == 0)
                {
                    this.showEmptyPendingRequests = true;
                }        
                this.loading = false;          
            } 
            ).catch(error => {
                this.showEmptyPendingRequests = true;
                this.loading = false; 
                console.log(error.response);
            });  
    
        }

    },
    created()
    {    
      this.loading = true;
      axios.get("http://localhost:8083/rent-service/api/request/paid/client/"+ this.$store.getters.currentUserId).then(
            response=> {

                var now = new Date();
                var today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
                var date= new Date(today);

                for(var i=0; i<response.data.length;i++)
                {
                    var reqEndDate = new Date(response.data[i].requestAds[0].endDate);
                    if(reqEndDate <= date)
                    {
                        this.oldRequests.push(response.data[i]);
                    }
                    else
                    {
                        this.paidRequests.push(response.data[i]);
                    }
                }

                
                if(this.paidRequests.length == 0)
                {
                    this.showEmptyPaidRequests = true;
                } 
                if(this.oldRequests.length == 0)
                {
                    this.showEmptyOldRequests = true;
                }       
                this.loading = false;          
            } 
        ).catch(error => {
            this.showEmptyPaidRequests = true;
             this.loading = false; 
            console.log(error.response);
        });  

        this.getPendingRequests();
    },
    
}
</script>

<style scoped>

.container{
    margin-left: auto;
    margin-right: auto;
}

.custom-width {
  width: 98%;
  margin: auto;
}
.buttons {
  width: 110px;
}

.empty {
  text-align: center;
  color: red;
  margin-top:1em;
}

</style>