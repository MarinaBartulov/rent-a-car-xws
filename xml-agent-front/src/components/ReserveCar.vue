<template>
    <div>
        <NavBar/>
        <div > 
        <b-card no-body class="overflow-hidden shadow mb-1 mt-3 mx-5" header-bg-variant="warning">
          <template v-slot:header>
            <h2 class="sm-0 text-center"> {{item.car.carBrand.name}}  {{item.car.carModel.name}} </h2>
          </template>
        </b-card>
        </div>
        <div >
          <!-- prvi red-->
          <b-row class="mb-3 mx-5">
            <!--leva kolona - slike-->          
            <b-col >
             <b-carousel ref="myCarousel" v-model="currentImage" controls indicators  class="mt-3 mr-5 carousel-custom shadow" >
                <b-carousel-slide  v-for="img in item.car.photos64" :key="img" :img-src="img"></b-carousel-slide>
             </b-carousel>
            </b-col>
            
            <!--desna kolona - informacije-->
            <b-col >
              <b-card-body class= "mt-5 ml-5">
                <b-card-text>                
                  <b-row >
                    <b-col class="col-12">
                        <b> Available from: </b> {{format_date(item.startDate)}} <b> to </b> {{format_date(item.endDate)}}
                    </b-col>
                  </b-row>
                  <b-row class="mt-3">
                    <b-col class="col-12">
                      <b> Rating:  </b> {{item.car.rate}}
                      <b-icon icon="star-fill"></b-icon> 
                    </b-col>
                  </b-row>
                  <b-row class="mt-3">
                    <b-col class="col-12">
                        <b>Location:</b> {{item.location}} 
                    </b-col>
                  </b-row>
                  <b-row class="mt-3"> 
                    <b-col class="col-6">
                        <b>Car class:</b> {{item.car.carClass}}
                    </b-col>
                    <b-col class="col-6">
                        <b>Children seats:</b> {{item.car.childrenSeats}}
                    </b-col>
                  </b-row>   
                  <b-row class="mt-3">
                    <b-col class="col-6">
                        <b>Mileage:</b> {{item.car.mileage}} <b>km</b>
                    </b-col>
                    <b-col class="col-6">
                        <b>Km limit:</b> {{item.limitKm}}
                    </b-col>
                  </b-row>                        
                  <b-row class="mt-3">  
                    <b-col class="col-6">
                        <b>Fuel type:</b> {{item.car.fuelType}}
                    </b-col>
                    <b-col class="col-6">
                        <b>Transmission:</b> {{item.car.transType}}
                    </b-col>
                  </b-row>
                  <b-row class="mt-3">
                    <b-col class="col-6">
                        <b>Price per day:</b> {{item.priceList.pricePerDay}} <b>€</b>
                    </b-col>
                    <b-col class="col-6">
                        <b>Price per km:</b> {{item.priceList.pricePerKm}} <b>€</b>
                    </b-col>                   
                  </b-row>  
                  <b-row class="mt-3">  
                    <b-col class="col-6">
                        <b>Disscount over <b> 20 </b> days:</b> {{item.priceList.discount20Days}} <b>%</b> 
                    </b-col>
                    <b-col class="col-6">
                        <b> Disscount over <b> 30 </b> days:</b>  {{item.priceList.discount30Days}} <b>%</b>
                    </b-col>              
                  </b-row>                
                  <b-row class="mt-3">
                    <b-col class="col-6">
                        <b>Android app present:</b> {{ item.car.hasAndroidApp == true ? 'Yes' : 'No' }}
                    </b-col>
                    <b-col class="col-6">
                        <b>Collision Damage Waiver:</b> {{ item.cdw == true ? 'Yes' : 'No' }}
                    </b-col>
                  </b-row>               
                </b-card-text>       
              </b-card-body>
            </b-col>
          </b-row>
        
        <b-modal id="modal-1" ref="replyModal" title="Your reply" hide-footer>
          <validation-observer ref="observer" v-slot="{ handleSubmit }">
            <b-form @submit.prevent="handleSubmit(postReply)"> 
              <validation-provider name="Comment" :rules="{ required: true, regex: /^[a-zA-Z0-9.,?! ]*$/, min: 2 }" v-slot="validationContext">
                <b-form-group  align="left" >
                  <b-form-textarea id="textareaReply" placeholder="Enter reply..." rows="3" no-resize v-model="textareaReply" :state="getValidationState(validationContext)"></b-form-textarea>               
                  <b-form-invalid-feedback id="reply">{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>
      
              <div class="row d-flex justify-content-center">
                <b-button class="mt-3 mr-2 col-3" variant="outline-dark"  block @click="hideModal">Close</b-button>
                <b-button class="mt-3 col-3" variant="dark" block type="submit">Post</b-button>
              </div>
            </b-form>
          </validation-observer>  
        </b-modal>
        
          <!-- drugi red -->
          <b-row>
            <!-- leva kolona - komentari-->
            <b-col class="col-6"> 
              <b-card id="comments-card" v-if="this.retrievedComments" v-b-toggle.collapse-1  no-body class="overflow-hidden shadow mb-3 ml-5 mr-5" header-bg-variant="warning">
                <template v-slot:header>
                  <h2 class="sm-0 text-center">Show Comments </h2>
                </template>
              </b-card>
              <b-collapse id="collapse-1" class="mx-5 my-2">
              <div class="container mt-3 custom-dim-comment" v-for="c in comments" :key="c.id">
                <b-card class="mb-1 shadow">
                  <b-card-text>
                    <p class="font-weight-bold">{{c.userName + ' ' + c.userLastname}}</p>
                    <p>{{c.content}}</p>
                  </b-card-text>
                </b-card>
                <b-btn v-show="!c.isReplied" class="buttons ml-1" @click="showModal(c.id)">Reply</b-btn>
      
                <b-card v-show="c.isReplied && c.replyContent!=null" class="mb-3 shadow custom-dim-reply">
                  <b-card-text>
                    <p class="font-weight-bold"> Your reply: </p>
                    <p>{{c.replyContent}}</p>
                  </b-card-text>
                </b-card>
              </div>
              </b-collapse>                 
            </b-col>

            <!--desna kolona - rezervacija-->
            <b-col class="col-6">
               <b-card id="reserve-card" v-b-toggle.collapse-2  no-body class="overflow-hidden shadow mb-3  ml-5 mr-5" header-bg-variant="warning">
                <template v-slot:header>
                  <h2 class="sm-0 text-center">Reserve Car </h2>
                </template>
              </b-card>
              <b-collapse id="collapse-2" class="mx-5 my-3">
                <b-card >
                  <validation-observer ref="observer" v-slot="{ handleSubmit }">
                    <b-form @submit.prevent="handleSubmit(reserve)">         
                        <b-row class="text-center" >
                          <b-col>
                            <h3> <b> User information </b> </h3>
                          </b-col>
                        </b-row>
                        
                        <b-row >
                          <b-col>
                            <validation-provider name="First name" :rules="{ required: true,alpha_spaces: true, min: 2, max: 20 }" v-slot="validationContext">
                              <b-form-group  align="left" label="Name:" label-for="name">
                                <b-form-input class="col-12" id="name" v-model="name" type="text" placeholder="Enter name" :state="getValidationState(validationContext)"></b-form-input>
                                <b-form-invalid-feedback id="name">{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                              </b-form-group>
                            </validation-provider>
                          </b-col>
                          <b-col>
                            <validation-provider name="Last name" :rules="{ required: true, alpha_spaces: true, min: 2, max: 20 }" v-slot="validationContext" >
                              <b-form-group  align="left" label="Last name:" label-for="userLastname">
                                <b-form-input class="col-12" id="userLastname" v-model="userLastname" type="text" placeholder="Enter lastname" :state="getValidationState(validationContext)"></b-form-input>
                                <b-form-invalid-feedback id="userLastname">{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                              </b-form-group>
                            </validation-provider>
                          </b-col>
                        </b-row>
                        <b-row >
                          <b-col>
                            <validation-provider name="Email" rules="required|email" v-slot="validationContext" >
                              <b-form-group  align="left" label="Email:" label-for="email">
                                <b-form-input class="col-12" id="email" v-model="email" type="email" placeholder="Enter email" :state="getValidationState(validationContext)"></b-form-input>
                                <b-form-invalid-feedback id="email">{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                              </b-form-group>
                            </validation-provider>
                          </b-col>
                          <b-col>
                            <validation-provider name="Phone number" :rules="{required: true, numeric: true, min: 9, max: 11}" v-slot="validationContext" >
                              <b-form-group  align="left" label="Phone number:" label-for="phoneNumber" > 
                                <b-form-input class="col-12" id="phoneNumber" v-model="phoneNumber" type="number" placeholder="Enter phone number" :state="getValidationState(validationContext)"></b-form-input>
                                <b-form-invalid-feedback id="phoneNumber">{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                              </b-form-group>
                            </validation-provider>
                           </b-col>
                        </b-row>
                        <b-row >
                          <b-col>                           
                            <b-form-group  align="left" label="Start date:" label-for="startDate">
                              <b-form-datepicker :min="minDate" :max="maxDate" id="startDate" v-model="startDate" locale="en" placeholder="Start date"></b-form-datepicker>                            
                            </b-form-group>                                 
                          </b-col>
                          <b-col>
                            <b-form-group  align="left" label="End date:" label-for="endDate" > 
                              <b-form-datepicker :min="minDate" :max="maxDate" v-model="endDate" locale="en" placeholder="End date"></b-form-datepicker>
                            </b-form-group>
                          </b-col>
                        </b-row>                    
                        <hr>
                      <b-row>       
                        <b-button type="submit" :disabled="!formIsValid" class=" ml-auto mr-3 mb-0" title=" You need to select date" >Reserve</b-button>
                       </b-row>
                    </b-form>
                  </validation-observer>
                </b-card>
              </b-collapse>                             
            </b-col>
          </b-row>
        </div>
        
    </div>
</template>

<script>

import NavBar from "../components/NavBar.vue";
import axios from "axios";
import moment from 'moment'

const baseUrl = "http://localhost:8086/api";

export default {
    name: 'ReserveCar',
    components: {
        NavBar
    },
    data() {
          
      return {      
        item: {
          priceList: [],
          car: {
            carBrand: [],
            carModel: []
          }
        },
      currentImage: 0,
        comments: [],
        name: "",
        userLastname: "",
        email: "",
        phoneNumber: null,
        startDate: null,
        endDate: null,
        minDate: null,
        maxDate: null,
        adId: null,
        textareaReply: '',
        commentId: null,
        retrievedComments: null,
        }
        
    },
    created() {
        var id = this.$route.fullPath;
        id = id.split('?')[1];
        id = id.split('=')[1];
        this.adId = id;

        var now = new Date();
        var today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        var todayDate= new Date(today);
        console.log(todayDate);

        
        axios.get(baseUrl + "/ads/"+id).then(
            response=> {
                this.item = response.data;

                if(typeof this.item.startDate === 'string')
                {
                  console.log("************ Datum je string")
                  
                  var x = new Date(this.item.startDate);
                  console.log(x);
                
                  if(todayDate > x) 
                  {
                    this.minDate = todayDate;
                  }
                  else
                  {
                    this.minDate = x;
                  }               

                  var y = new Date(this.item.endDate);
                  this.maxDate = y;
                  console.log(y);
                }
                else
                {
                  console.log("************ Datum je niz")
                  var ed = new Date(this.item.endDate[0], this.item.endDate[1]-1, this.item.endDate[2]);
                  var maxD = new Date(ed);
                  this.maxDate = maxD;

                  var sd = new Date(this.item.startDate[0], this.item.startDate[1]-1, this.item.startDate[2]);
                  var minD = new Date(sd);

                  if(todayDate > minD)
                  {
                    this.minDate = todayDate;
                  
                  }
                  else
                  {
                    this.minDate = minD;
                  }   
                
                }
              
                
            }
        );
        
        this.getComments();
        
    },
    methods: {
      
      reserve() {
        axios.post(baseUrl+'/reservations',{
                startDate: this.startDate,
                endDate: this.endDate,
                clientFirstName: this.name,
                clientLastName: this.userLastname,
                clientPhoneNumber:this.phoneNumber,
                clientEmail: this.email,
                adId: this.item.id
            })
           .then((response) => {
                console.log(response.data);
                this.$bvToast.toast('Car reserved from '+ this.startDate + ' to '+ this.endDate, {
                title: 'Reservation Successful',
                variant: 'success',
                solid: true
                });                        
          })
          .catch(error => {
          if (error.response && error.response.status === 400) {
              this.$bvToast.toast(error.response.data, {
                title: 'Bad Request',
                variant: 'danger',
                solid: true
                });
          }
          else if(error.response && error.response.status === 417)
          {
              this.$bvToast.toast(error.response.data, {
                title: 'Reservation failed',
                variant: 'danger',
                solid: true
                });
          }else if(error.response && error.response.status === 500){
              this.$bvToast.toast(error.response.data, {
                title: 'Server error',
                variant: 'danger',
                solid: true
                });
          }
          
          });
      },

      getComments()
      {
        axios.get("http://localhost:8086/soap/comments/"+ this.adId).then(
            response=> {
                this.comments = response.data;    
                this.retrievedComments = true;                
            }
        ).catch(
              this.retrievedComments = false
          );   
      },

      postReply() 
      {
        axios.put("http://localhost:8086/soap/comments/"+ this.commentId,{
              "replyContent": this.textareaReply,
        }).then(
          response => {
            console.log(response.data);
            this.$bvToast.toast("Admin will have to approve before reply is shown.", {
              title: "Reply sent",
              variant: "success",
              solid: true
            });
             this.textareaReply = '';
             this.hideModal();
             this.getComments();
             
          }).catch(error => {
            this.$bvToast.toast(error.response.data, {
              title: "Error",
              variant: "danger",
              solid: true
            });
             this.textareaReply = '';
             this.hideModal();
          })
      },

      showModal: function(id) {
        this.$refs["replyModal"].show();
        this.commentId = id;
        console.log(id);
      },

      hideModal() {
        this.textareaReply = '';
        this.$refs["replyModal"].hide();
      },
      prev() {
        this.currentImage = this.images.length - 1;
        this.$refs.imageCarousel.setSlide(this.images.length - 1);
      },
      next() {
        this.currentImage = this.images.length + 1;
        this.$refs.imageCarousel.setSlide(this.images.length + 1);
      },
      format_date(value){
         if (value) {
           return moment(String(value)).format("DD-MMM-YYYY")
          }
      },
      getValidationState({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null;
    }
  
    },
    computed:{
      formIsValid: function()
      {
          if(this.startDate!=null && this.endDate!=null  && this.startDate <= this.endDate)
          {
            return true;
          }
          else return false;
      },
      
    }

}
</script>

<style scoped>

#comments-card{
    cursor: grab;
}
#reserve-card{
    cursor: grab;
}
.container{
  width: 150em;
}

.custom-dim-comment {
  width: 100%;
  height: 25%;
}

.custom-dim-reply{
  width: 90%;
  height: 25%;
  margin-left: 3.7em;
}

</style>