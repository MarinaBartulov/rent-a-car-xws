<template>
  <div>
    <NavBar />
    <div class="container d-flex justify-content-center">
      <b-carousel
        ref="myCarousel"
        v-model="currentImage"
        controls
        indicators
        class="mt-3 carousel-custom shadow"
      >
        <b-carousel-slide class="cutom-height" v-for="img in vehicle.car.photos64" :key="img" :img-src="img"></b-carousel-slide>
      </b-carousel>
    </div>
    <div class="overflow-hidden container m-auto custom-width">
      <b-card class="mt-1 mb-3 text-center shadow">
        <template v-slot:header>
          <h3 class="mb-0 text-center">{{vehicle.car.carBrand + ' ' + vehicle.car.carModel}}</h3>
        </template>
        <b-card-text>
          <b-row class="justify-content-center align-items-center mb-2" v-show="userCanRate">
              <b class="mr-2">Rate car:</b><StarRating :star-size="25" :show-rating="false" @rating-selected="rateCar" v-model="newRate"></StarRating>
          </b-row>
          <b-row >
            <b-col class="col-12">
                <b> Available from: </b> {{format_date(vehicle.startDate)}} <b> to </b> {{format_date(vehicle.endDate)}}
            </b-col>
          </b-row>
          <b-row class="mt-2">
            <b-col col-3>
              <b-icon icon="star-fill"></b-icon>
              {{vehicle.car.rate}}
            </b-col>
            <b-col col-3>
              <b>Location:</b>
              {{vehicle.location}}
            </b-col>
          </b-row>
          <b-row class="mt-2">
            <b-col col-3>
              <b> Price per Day:</b>
              {{vehicle.priceList.pricePerDay}} <b>€</b>
            </b-col>
            <b-col col-3>
              <b>Price per Km:</b>
              {{vehicle.priceList.pricePerKm}} <b>€</b>
            </b-col>
          </b-row>
          <b-row class="mt-2">
            <b-col col-3>
              <b> Discount over 20 Days:</b>
              {{vehicle.priceList.discount20Days}} <b>%</b>
            </b-col>
            <b-col col-3>
              <b>Discount over 30 Days:</b>
              {{vehicle.priceList.discount30Days}} <b>%</b>
            </b-col>
          </b-row>
          <b-row class="mt-2">
            <b-col>
              <b>Vehicle type:</b>
              {{vehicle.car.carClass}}
            </b-col>
            <b-col>
              <b>Fuel type:</b>
              {{vehicle.car.fuelType}}
            </b-col>
          </b-row>
          <b-row class="mt-2">
            <b-col>
              <b>Transmission:</b>
              {{vehicle.car.transType}}
            </b-col>
            <b-col>
              <b>Children seats:</b>
              {{vehicle.car.childrenSeats}}
            </b-col>
          </b-row>
          <b-row class="mt-2">
            <b-col>
              <b>Mileage:</b>
              {{vehicle.car.mileage}}
              <b>km</b>
            </b-col>
            <b-col>
              <b>Km limit:</b>
              {{vehicle.limitKm == 0 ? 'UNLIMITED' : vehicle.limitKm + ' km' }}             
            </b-col>
          </b-row>
          <b-row class="mt-2">
            <b-col>
              <b>Collision Damage Waiver:</b> {{ vehicle.cdw == true ? 'Yes' : 'No' }}
            </b-col>
            <b-col>
              <b>Android app present:</b> {{ vehicle.car.hasAndroidApp == true ? 'Yes' : 'No' }}
              <b-button v-if="loggedInOwner && vehicle.car.hasAndroidApp" @click="seeMap(vehicle.car.androidToken)">Map</b-button> <!--ako je oglas od vlasnika i ako ima android uredjaj-->
            </b-col>
          </b-row>
        </b-card-text>
        <b-button v-show="showCartButton" type="button" class="ml-auto mt-5 buttons cartButton"> <a class="removeDecoration" @click="addToCart(vehicle.id, startDateRent, endDateRent)">Add to <b-icon icon="bucket-fill"></b-icon></a></b-button>
      </b-card>
    </div>
    <div v-if="loggedInOwner" class="container custom-dim-comment">
      <b-card class="mb-3" id="reserve-card" no-body v-b-toggle.collapse>
        <template v-slot:header >
          <h5 class="mb-0 text-center">Reserve car</h5> 
        </template>
      </b-card>
        
      <b-collapse id="collapse" class="mx-5 my-3">
        <b-card class="mb-3 shadow">
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
    </div>

    <!--Ova kartica ce se prikazivati samo ako je korisnik ulogovan" -->
    <div v-if="loggedInClient && this.userCanPostComment" class="container custom-dim-comment">
      <b-card class="mb-3">
        <template v-slot:header>
          <h5 class="mb-0">Comment</h5>
        </template>
        <b-card-text>
          <validation-observer ref="observer" v-slot="{ handleSubmit }">
          <b-form @submit.prevent="handleSubmit(postComment)">  
          <validation-provider name="Comment" :rules="{ required: true, regex: /^[a-zA-Z0-9.,?! ]*$/, min: 2 }" v-slot="validationContext">
            <b-form-group  align="left">
              <b-form-textarea id="Comment" placeholder="Enter comment..." rows="3" no-resize v-model="textarea" :state="getValidationState(validationContext)"></b-form-textarea>               
              <b-form-invalid-feedback id="name">{{ validationContext.errors[0] }}</b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>
          
          <b-row class="mt-2">
            <b-col class="col-2">
              <b-btn class="buttons" type="submit">Add comment</b-btn>
            </b-col>
            <b-col>
              <b-btn class="buttons" @click="clear">Clear</b-btn>
            </b-col>          
          </b-row>
          
          </b-form>
          </validation-observer>
        </b-card-text>
      </b-card>
    </div>
  
    <div class="container mt-3 custom-dim-comment" v-for="c in comments" :key="c.id">
      <b-card class="mb-1 shadow">
        <b-card-text>
          <p class="font-weight-bold">{{c.userName + ' ' + c.userLastname}}</p>
          <p>{{c.content}}</p>
        </b-card-text>
      </b-card>
      <b-btn v-show="!c.isReplied && loggedInOwner" class="buttons ml-1" @click="showModal(c.id)">Reply</b-btn>
      
      <b-card v-show="c.isReplied && c.replyContent!=null" class="mb-3 shadow custom-dim-replay">
        <b-card-text>
          <p class="font-weight-bold"> The owner </p>
          <p>{{c.replyContent}}</p>
        </b-card-text>
      </b-card>
    </div>

    <b-modal id="modal-1" ref="replyModal" title="Your replay" hide-footer>
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
  </div> 
</template>

<script>
import NavBar from "../components/NavBar.vue";
import axios from "axios";
import moment from 'moment'
import StarRating from 'vue-star-rating';

export default {
  name: "VehicleDetails",
  components: {
    NavBar,
    StarRating,
  },
  data() {
    return {
      vehicle: {
        priceList: [],
          car: [],
      },
      currentImage: 0,
      name: "",
      userLastname: "",
      email: "",
      phoneNumber: null,
      currentPriceKM: 0,
      startDate: null,
      endDate: null,
      minDate: null,
      maxDate: null,
      startDateRent: localStorage.getItem("startDate"),
      endDateRent: localStorage.getItem("endDate"),
      comments: [],
      textarea: '',
      textareaReply: '',
      commentId: null,
      adId: null,
      userCanPostComment: null,
      newRate: null,
      userCanRate: null,
    };
  },
  methods: {

  reserve() {
      axios.post("http://localhost:8083/rent-service/api/reservations",{
                startDate: this.startDate,
                endDate: this.endDate,
                clientFirstName: this.name,
                clientLastName: this.userLastname,
                clientPhoneNumber:this.phoneNumber,
                clientEmail: this.email,
                adId: this.vehicle.id,
                currentPricePerKm : this.vehicle.priceList.pricePerKm
            })
           .then(() => {
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
          }
          
          });
    },

    postComment(){
        axios.post("http://localhost:8083/car-service/api/comments",{
              "fromComment": this.$store.getters.currentUserId,
              "content": this.textarea,
              "adId": this.vehicle.id,
        }).then(
          response => {
            console.log(response.data);
            this.$bvToast.toast("Admin will have to approve before comment is shown.", {
              title: "Comment sent",
              variant: "success",
              solid: true
            });
             this.textarea = '';
             this.getComments();
        }).catch(error => {
            this.$bvToast.toast(error.response.data, {
              title: "Error",
              variant: "danger",
              solid: true
            });
             this.textarea = '';
          })
    },

    postReply()
    {
      axios.put("http://localhost:8083/car-service/api/comments/"+ this.commentId,{
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

    getComments()
    {
        axios.get("http://localhost:8083/car-service/api/comments/"+ this.adId).then(
            response=> {
                this.comments = response.data;                    
            }
        );

      if(this.loggedInClient) //ne salje se zahtev ako nije ulogovan klijent
      {
        axios.get("http://localhost:8083/ad-service/api/userCanPostComment/"+ this.adId + "/" + this.$store.getters.currentUserId).then(
            response=> {
                this.userCanPostComment = response.data;                    
            }
        );
      }
        
    },

    prev() {
      this.currentImage = this.images.length - 1;
      this.$refs.imageCarousel.setSlide(this.images.length - 1);
    },
    next() {
      this.currentImage = this.images.length + 1;
      this.$refs.imageCarousel.setSlide(this.images.length + 1);
    },
    clear() {
      this.textarea = '';
    },

    format_date(value){
         if (value) {
           return moment(String(value)).format("DD-MMM-YYYY")
          }
    },
    
    getValidationState({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null;
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
    addToCart: function(id, startDate, endDate){
        axios.post("http://localhost:8083/rent-service/api/cartItem", {"adID":id, "startDate":startDate, "endDate":endDate}).then(
          response => {
            console.log(response.data);
              this.$bvToast.toast("You have successfully added the ad in the cart.", {
              title: "Success",
              variant: "success",
              solid: true
            });
            this.$refs.observer.reset();
          }).catch(error => {
            this.$bvToast.toast(error.response.data, {
              title: "Error",
              variant: "danger",
              solid: true
            });
            this.$refs.observer.reset();
          })
      },
      showStarRating() {
        //ne salje se zahtev ako nije ulogovan klijent
        if(this.loggedInClient)  {
          axios.get("http://localhost:8083/ad-service/rating/user/" + this.$store.getters.currentUserId + "/ad/" + this.adId)
          .then((response) => {
              this.userCanRate = response.data;
          });
        }
      },
      rateCar: function() {
        axios.put("http://localhost:8083/car-service/api/car/user/" + this.$store.getters.currentUserId + "/ad/" + this.adId + "/" + this.newRate)
        .then(() => {
            this.$bvToast.toast("You successfully rate this car.", {
              title: "Rating",
              variant: "success",
              solid: true
            });
            this.vehicleDetails();
            this.showStarRating();
          }).catch(() => {
            this.$bvToast.toast("Car rating is unsuccessful. Please, try again.", {
              title: "Error",
              variant: "danger",
              solid: true
            });
        });
      },
      vehicleDetails: function() {
        var id = this.$route.fullPath;
        id = id.split('?')[1];
        id = id.split('=')[1];
        this.adId = id;
 
        axios.get("http://localhost:8083/ad-service/api/ads/"+id).then(
            response=> {
                this.vehicle = response.data;
              
                var now = new Date();
                var today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
                var z= new Date(today);
                console.log(z)

                var x = new Date(this.vehicle.startDate);
                console.log(x);
                
                if(z > x) 
                {
                  this.minDate = z;
                }
                else
                {
                  this.minDate = x;
                }               

                var y = new Date(this.vehicle.endDate);
                this.maxDate = y;
                console.log(y);
                     
            }
        );
      },
      seeMap: function(androidToken){
            this.$router.push({ path: '/map/'+ androidToken});
      }

  },
  created() {     
      this.vehicleDetails();  
      this.getComments();
      this.showStarRating();
                  
    },
    computed: {
      loggedIn(){
        return this.$store.getters.loggedIn;
      },
      loggedInOwner(){
        return this.$store.getters.currentUserId == this.vehicle.ownerId  && this.$store.getters.loggedIn;
      },

      loggedInClient()
      {
        return this.$store.getters.userRole == "ROLE_CLIENT" && this.$store.getters.loggedIn;
      },
      
       formIsValid: function()
      {
          if(this.startDate!=null && this.endDate!=null  && this.startDate <= this.endDate)
          {
            return true;
          }
          else return false;
      },
      showCartButton(){
          return this.$store.getters.userRole == "ROLE_CLIENT" && this.$store.getters.loggedIn && this.$store.getters.currentUserId != this.vehicle.ownerId;
        }
    }
};
</script>

<style scoped>
.carousel-custom {
  width: 75%;
  height: 550px;
}

.custom-height {
  max-height: 550px;
  display: flex;
  justify-content: center;
}

.custom-width {
  width: 57%;
}

.custom-dim-comment {
  width: 57%;
  height: 25%;
}

.custom-dim-replay{
  width: 90%;
  height: 25%;
  margin-left: 5em;
}

.shadow {
  -webkit-box-shadow: 5px 5px 5px 5px;
  box-shadow: 5px 5px 5px 5px;
}

.buttons {
  width: 130px;
}

#reserve-card{
    cursor: grab;
}
</style>