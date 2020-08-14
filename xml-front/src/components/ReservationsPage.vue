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
            
          <b-tab title="Online reservations" active :title-link-class="linkClass()">
            <div v-if="showEmptyRequests">
                <h1 class="empty">You don't have any requests.</h1>
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
                          <b-row class="mt-2 mb-1">
                            <b-col>
                                <b> Mileage:</b> {{reqAd.ad.car.mileage}} <b>km</b>
                            </b-col>
                            <b-col>
                                <b> Km limit:</b> {{reqAd.ad.limitKm == 0 ? 'UNLIMITED' : reqAd.ad.limitKm + ' km' }}
                             </b-col>
                          </b-row>  
                        </b-col>    
                      </b-row> 
                      <hr>
                      <b-row>
                        <b-button v-if="!reqAd.reportCreated"  type="button" class="ml-auto mr-4  mb-3 buttons" variant="dark" @click="showModal1(reqAd)"> Report </b-button>
                        <b-button v-if="reqAd.reportCreated"  type="button" class="ml-auto mr-4  mb-3 buttons" variant="dark" @click="showRequestReport(reqAd)"> Show Report </b-button>
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

          <b-tab title="My reservations" :title-link-class="linkClass()">
            <div v-if="showEmptyReservations">
                <h1 class="empty">You don't have any reservations.</h1>
            </div>
            
            <div class="container">
              <div class="custom-width" v-for="res in reservations" :key="res.id">
                <b-card no-body class="overflow-hidden custom-width mb-3 shadow" header-bg-variant="dark" header-text-variant="white"  > <!-- Velika kartica za bundle -->
                  <template v-slot:header>
                    <h3 class="mb-0 text-center">Client: {{res.clientFirstName + ' ' + res.clientLastName}}</h3>
                  </template>
                  <div class="mt-2">
                    <b-card no-body class="overflow-hidden shadow custom-width" header-bg-variant="warning" header-text-variant="dark" >
                      <template v-slot:header>
                        <h3 class="mb-0 text-center">{{res.ad.car.carBrand + ' ' + res.ad.car.carModel}}</h3>
                      </template>
                      <b-row>
                        <b-col md="5">
                          <b-card-img :src="res.ad.car.photo64" width="415" height="320" alt="Image" class="rounded-0 mt-2 ml-2 mb-2"></b-card-img>
                        </b-col> 
                        <b-col md="7">
                          <b-row class="mt-4">
                            <b-col>
                                <b> Start date of rent: </b> {{format_date(res.startDate)}}
                            </b-col>
                            <b-col>
                                <b> End date of rent:</b> {{format_date(res.endDate)}}
                            </b-col>
                          </b-row>
                       
                          <b-row class="mt-2">
                            <b-col>
                                <b> Price in total: </b> {{res.payment}} <b>€</b>
                            </b-col>
                            <b-col>
                                <b> Price per km: </b> {{res.currentPricePerKm}} <b>€</b>
                            </b-col>
                          </b-row>
                          <hr>
                          <b-row class="mt-2">
                            <b-col>
                                <b> {{res.clientFirstName}}'s email: </b> {{res.clientEmail}} 
                            </b-col>
                            <b-col>
                                <b> {{res.clientFirstName}}'s phone number: </b> {{res.clientPhoneNumber}} 
                            </b-col>
                          </b-row>
                          <hr>
                          <b-row class="mt-2">
                            <b-col>
                                <b> Location </b> {{res.ad.location}}
                            </b-col>
                            <b-col>
                                <b> Collision Damage Waiver:</b> {{ res.ad.cdw == true ? 'Yes' : 'No' }}
                            </b-col>
                          </b-row>    
                          <b-row class="mt-2">
                            <b-col>
                                <b> Ad start date: </b> {{format_date(res.ad.startDate)}}
                            </b-col>
                            <b-col>
                                <b> Ad end date:</b> {{format_date(res.ad.endDate)}}
                            </b-col>
                          </b-row>  
                          <hr>
                          <b-row class="mt-2">
                            <b-col col-3>
                                <b> Rate: </b>
                                {{res.ad.car.rate}}  <b-icon icon="star-fill"></b-icon>                   
                            </b-col>
                            <b-col col-3>
                                <b> Children seats: </b> {{res.ad.car.childrenSeats}}
                            </b-col>
                          </b-row>   
                          <b-row class="mt-2 mb-3">
                            <b-col>
                                <b> Mileage:</b> {{res.ad.car.mileage}} <b>km</b>
                            </b-col>
                            <b-col>
                                <b> Km limit:</b> {{res.ad.limitKm == 0 ? 'UNLIMITED' : res.ad.limitKm + ' km' }}
                             </b-col>
                          </b-row>  
                        </b-col>    
                      </b-row>                
                    </b-card>
                  </div>
                  <b-row>
                    <b-button v-if="!res.reportCreated"  type="button" class="ml-auto mr-4 mt-3 mb-3 buttons" variant="dark" @click="showModal2(res)"> Report </b-button>
                    <b-button v-if="res.reportCreated"  type="button" class="ml-auto mr-4 mt-3 mb-3 buttons" variant="dark" @click="showReservationReport(res)" >Show Report </b-button>
                  </b-row> 
                </b-card>
              </div>
            </div>
              
          </b-tab>

        </b-tabs>

      </div>
      
      <b-modal id="modal-1" ref="reportModal1" title="Report for request" hide-footer>
      <validation-observer ref="observer" v-slot="{ handleSubmit }">
      <b-form @submit.prevent="handleSubmit(writeRequestReport)"> 
        <b-row class="mt-2">
          <b-col>
          <h3 class="text-center"> {{carBrand + ' ' + carModel}} </h3>
          </b-col>
        </b-row>
        <hr>
        <b-row class="mt-2 mb-2">
          <b-col>
          <h5 class="text-center"> <b> Rented from: </b> {{format_date(startDate)}} <b> to: </b> {{format_date(endDate)}} </h5>
          </b-col>
        </b-row>
        <hr>
        <b-form-group  label="Mileage:" >
        <b-input-group  append="Km">
           <b-form-input required  type="number" :min="1" v-model="mileageReport" placeholder="Enter number of kilometers"></b-form-input>
        </b-input-group>
      </b-form-group>
       <validation-provider name="Text" :rules="{ required: true, regex: /^[a-zA-Z0-9.,?! ]*$/, min: 2 }" v-slot="validationContext">
        <b-form-group label="Enter report:" align="left" >
          <b-form-textarea id="textareaReply" placeholder="Write here..." rows="3" no-resize v-model="textareaReport" :state="getValidationState(validationContext)"></b-form-textarea>               
          <b-form-invalid-feedback id="reply">{{ validationContext.errors[0] }}</b-form-invalid-feedback>
        </b-form-group>
      </validation-provider>
      <div class="row d-flex justify-content-center">
        <b-button class="mt-3 mr-2 col-3" variant="outline-dark"  block @click="hideModal1">Close</b-button>
        <b-button class="mt-3 col-3" variant="dark" block type="submit">Post</b-button>
      </div>
      </b-form>
      </validation-observer>  
    </b-modal>

    <b-modal id="modal-2" ref="reportModal2" title="Report for reservation" hide-footer>
      <validation-observer ref="observer" v-slot="{ handleSubmit }">
      <b-form @submit.prevent="handleSubmit(writeReservationReport)"> 
        <b-row class="mt-2">
          <b-col>
          <h3 class="text-center"> {{carBrand + ' ' + carModel}} </h3>
          </b-col>
        </b-row>
        <hr>
        <b-row class="mt-2 mb-2">
          <b-col>
          <h5 class="text-center"> <b> Rented from: </b> {{format_date(startDate)}} <b> to: </b> {{format_date(endDate)}} </h5>
          </b-col>
        </b-row>
        <hr>
        <b-form-group  label="Mileage:" >
        <b-input-group  append="Km">
           <b-form-input required  type="number" :min="1" v-model="mileageReport" placeholder="Enter number of kilometers"></b-form-input>
        </b-input-group>
      </b-form-group>
       <validation-provider name="Text" :rules="{ required: true, regex: /^[a-zA-Z0-9.,?! ]*$/, min: 2 }" v-slot="validationContext">
        <b-form-group label="Enter report:" align="left" >
          <b-form-textarea id="textareaReply" placeholder="Write here..." rows="3" no-resize v-model="textareaReport" :state="getValidationState(validationContext)"></b-form-textarea>               
          <b-form-invalid-feedback id="reply">{{ validationContext.errors[0] }}</b-form-invalid-feedback>
        </b-form-group>
      </validation-provider>
      <div class="row d-flex justify-content-center">
        <b-button class="mt-3 mr-2 col-3" variant="outline-dark"  block @click="hideModal2">Close</b-button>
        <b-button class="mt-3 col-3" variant="dark" block type="submit">Post</b-button>
      </div>
      </b-form>
      </validation-observer>  
    </b-modal>

    <b-modal id="modal-3" ref="reportModal3" title="Your Report" hide-footer>
        <b-row class="mt-2">
          <b-col>
          <h3 class="text-center"> {{carBrand + ' ' + carModel}} </h3>
          </b-col>
        </b-row>
        <hr>
        <b-row class="mt-2 mb-2">
          <b-col>
          <h5 class="text-center"> <b> Rented from: </b> {{format_date(startDate)}} <b> to: </b> {{format_date(endDate)}} </h5>
          </b-col>
        </b-row>
        <hr>
        <b-row class="ml-3 mt-2 mb-2">
          <b-col> 
            <h5> Number of kilometers: </h5> {{this.report.km}} 
          </b-col>
        </b-row>
        <b-row class="ml-3 mt-2 mb-2">
          <b-col> 
            <h5> Content: </h5>  {{this.report.content}} 
          </b-col>
        </b-row>
        <div class="row d-flex justify-content-center">
          <b-button class="mt-3 mr-2 col-3" variant="outline-dark"  block @click="hideModal3">Close</b-button>
        </div>
  
    </b-modal>

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
           loading: true,
           showEmptyRequests: false,
           showEmptyReservations: false,
           paidRequests: [],
           reservations: [],
           textareaReport: '',
           requestAdId: null,
           reservationId: null,
           mileageReport: null,
           carBrand: null,
           carModel: null,
           startDate: null, 
           endDate: null,
           report: [],
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

      showModal1: function(reqAd) {
        
        var now = new Date();
        var today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        var z = new Date(today);
       
        var x = new Date(reqAd.endDate);

        if(x < z)
        {
          this.$refs["reportModal1"].show();
          this.textareaReport = '';
          this.mileageReport = null;
          this.requestAdId = reqAd.id;
          this.startDate = reqAd.startDate;
          this.endDate = reqAd.endDate;
          this.carBrand = reqAd.ad.car.carBrand;
          this.carModel = reqAd.ad.car.carModel;
          console.log(reqAd.id);
        }
        else{
          this.$bvToast.toast("Can't write report before request expires.", {
              title: "Forbidden",
              variant: "warning",
              solid: true
            });
        }
        
      },

      hideModal1() {
        this.textareaReport = '';
        this.mileageReport = null;
        this.startDate = null;
        this.endDate = null;
        this.carModel = null;
        this.carBrand = null;
        this.$refs["reportModal1"].hide();
      },

      showModal2: function(res) {

        var now = new Date();
        var today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        var z = new Date(today);

        var x = new Date(res.endDate);

        if(x < z)
        {
          this.$refs["reportModal2"].show();
          this.textareaReport = '';
          this.mileageReport = null;
          this.reservationId = res.id;
          this.startDate = res.startDate;
          this.endDate = res.endDate;
          this.carBrand = res.ad.car.carBrand;
          this.carModel = res.ad.car.carModel;
          console.log(res.id);
        }
        else{
          this.$bvToast.toast("Can't write report before reservation expires.", {
              title: "Forbidden",
              variant: "warning",
              solid: true
            });
        }

        
      },

      hideModal2() {
        this.textareaReport = '';
        this.mileageReport = null;
        this.startDate = null;
        this.endDate = null;
        this.carModel = null;
        this.carBrand = null;
        this.$refs["reportModal2"].hide();
      },

      showModal3: function() {
        this.$refs["reportModal3"].show();
      },

      hideModal3() {
        this.report = [];
        this.startDate = null;
        this.endDate = null;
        this.carModel = null;
        this.carBrand = null;
        this.$refs["reportModal3"].hide();
      },

      writeRequestReport()
      {
        console.log("RequestAdId:"+ this.requestAdId );
          axios.post("http://localhost:8083/rent-service/api/reports/request",{
              "content": this.textareaReport,
              "km": this.mileageReport,
              "requestAdId": this.requestAdId,
        }).then(
          response => {
            console.log(response.data);
            this.$bvToast.toast("Report saved.", {
              title: "Success",
              variant: "success",
              solid: true
            });
             this.textareaReport = '';
             this.hideModal1();
             this.getRequests();
        }).catch(error => {
            this.$bvToast.toast(error.response.data, {
              title: "Error",
              variant: "danger",
              solid: true
            });
             this.textareaReport = '';
          })
      },

      writeReservationReport()
      {
          axios.post("http://localhost:8083/rent-service/api/reports/reservation",{
              "content": this.textareaReport,
              "km": this.mileageReport,
              "reservationId": this.reservationId,
        }).then(
          response => {
            console.log(response.data);
            this.$bvToast.toast("Report saved.", {
              title: "Success",
              variant: "success",
              solid: true
            });
             this.textareaReport = '';
             this.hideModal2();
             this.getReservations();
        }).catch(error => {
            this.$bvToast.toast(error.response.data, {
              title: "Error",
              variant: "danger",
              solid: true
            });
             this.textareaReport = '';
          })
      },

      showRequestReport(reqAd)
      {
        axios.get("http://localhost:8083/rent-service/api/reports/request/"+reqAd.id).then(
            response=> {
                this.report = response.data;        
            } 
        ).catch(error => {
            console.log(error.response.data);
        });  

          this.startDate = reqAd.startDate;
          this.endDate = reqAd.endDate;
          this.carBrand = reqAd.ad.car.carBrand;
          this.carModel = reqAd.ad.car.carModel;
          this.showModal3();
      },

      showReservationReport(res)
      {
         axios.get("http://localhost:8083/rent-service/api/reports/reservation/"+res.id).then(
            response=> {
                this.report = response.data;        
            } 
        ).catch(error => {
            console.log(error.response.data);
        });  

          this.startDate = res.startDate;
          this.endDate = res.endDate;
          this.carBrand = res.ad.car.carBrand;
          this.carModel = res.ad.car.carModel;
          this.showModal3();
      },

      getValidationState({ dirty, validated, valid = null }) {
        return dirty || validated ? valid : null;
      },

      getRequests()
      {
          
        axios.get("http://localhost:8083/rent-service/api/request/paid").then(
            response=> {
                this.paidRequests = response.data; 
            
                if(this.paidRequests.length == 0)
                {
                    this.showEmptyRequests = true;
                }        
                this.loading = false;          
            } 
        ).catch(error => {
            this.showEmptyRequests = true;
            console.log(error.response);
        });  

      },

      getReservations()
      {
        axios.get("http://localhost:8083/rent-service/api/reservations").then(
            response=> {
                this.reservations = response.data; 

                if(this.reservations.length == 0)
                {
                    this.showEmptyReservations = true;
                }        
                this.loading = false;          
            } 
        ).catch(error => {
            this.showEmptyReservations = true;
            console.log(error.response);
        });  
    
      }
      
    },
    created()
    {    
      this.loading = true;
      this.getRequests();
      this.getReservations();

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
  width: 120px;
}

.empty {
  text-align: center;
  color: red;
  margin-top:1em;
}

</style>