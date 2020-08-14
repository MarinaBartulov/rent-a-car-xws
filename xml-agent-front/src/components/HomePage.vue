<template>
   <div > 
     <NavBar />
  <b-jumbotron header="Find convenient car" bg-variant="warning">  
  </b-jumbotron>

  <div class="div-search">
    <b-nav vertical >
      <b-card class="mb-4"  id="card" no-body  bg-variant="light" text-variant="dark" header-text-variant="dark" align="center" header-bg-variant="light" header="Find a car for you" >
       <b-card-text class="div-filter-card">
          <b-form @submit.prevent="search()">
          <b-form-group  align="left" id="input-group-1" label="Location:" label-for="location" :invalid-feedback="invalidFeedbackLocation" :valid-feedback="validFeedbackLocation" :state="stateLocation">
           <b-form-input class="col-12" id="location" v-model.trim="location" type="text" required placeholder="Enter a city"></b-form-input>
         </b-form-group>
         <b-form-group  align="left" id="input-group-2" label="Start date: (it has to be 48h from now)" label-for="startDate">
              <b-form-datepicker :min="minDate" v-model="startDate" locale="en" required placeholder="Start date"></b-form-datepicker>
         </b-form-group>   
         <b-form-group  align="left" id="input-group-3" label="End date:" label-for="endDate" > 
            <b-form-datepicker :min="minDate" :max="maxDate" v-model="endDate" locale="en" required placeholder="End date"></b-form-datepicker>
         </b-form-group>
         <b-button @click="moreDetails()" block pill  variant="outline-secondary" v-b-toggle.collapse-1 > More details </b-button>
         <b-button v-b-tooltip.hover title=" You need to enter location and select valid dates." block type="submit" pill :disabled="!formIsValid">Search</b-button>
         <p v-if="showError"   class="p-error">Error</p>
        </b-form>
        </b-card-text>
      </b-card>
    </b-nav>
  </div>

 <div class="div-filter">
   <b-collapse id="collapse-1" >
     <b-card  id="card" no-body bg-variant="light" text-variant="dark" >
      <b-form>
    <b-card-text class="div-filter-card">
      <div class="containter mx-2 row">
        <div class="col">
          <b-form-group label-cols="1" label-cols-lg="4" label-size="sm" label="Car brand:" label-for="carBrand">
            <b-form-select id="carBrand" v-model="brand" :options="brands">
                <template v-slot:first>
                  <b-form-select-option :value="null">Select brand</b-form-select-option>
                </template>
              </b-form-select>  
          </b-form-group>
        </div>
        <div class="col">
          <b-form-group label-cols="1" label-cols-lg="4" label-size="sm" label="Car model:" label-for="carModel">
            <b-form-select id="carModel" v-model="model" :options="models">
                <template v-slot:first>
                  <b-form-select-option :value="null">Select model</b-form-select-option>
                </template>
              </b-form-select>  
          </b-form-group>
        </div>
        <div class="col">
            <b-form-group label-cols="1" label-cols-lg="4" label-size="sm" label="Car class:" label-for="carClass">
            <b-form-select id="carClass" v-model="cclass" :options="classes">
                <template v-slot:first>
                  <b-form-select-option :value="null">Select class</b-form-select-option>
                </template>
              </b-form-select>  
          </b-form-group>
        </div>
        
    </div>
    <div class="containter mx-2 row">
        <div class="col">
            <b-form-group label-cols="1" label-cols-lg="4" label-size="sm" label="Type of fuel:" label-for="carFuelType">
            <b-form-select id="carFuelType" v-model="fuelType" :options="fuelTypes">
                <template v-slot:first>
                  <b-form-select-option :value="null">Select fuel type</b-form-select-option>
                </template>
              </b-form-select>  
          </b-form-group>
        </div>
        <div class="col">
            <b-form-group label-cols="1" label-cols-lg="4" label-size="sm" label="Children Seats:" label-for="childSeats" :invalid-feedback="invalidFeedbackSeats" :valid-feedback="validFeedbackSeats" :state="stateSeats">
              <b-form-input id="childSeats" size="sm" type="text" placeholder="Enter a number" v-model="childSeats" ></b-form-input>
           </b-form-group>
        </div>
        <div class="col">
            <b-form-group label-cols="1" label-cols-lg="4" label-size="sm" label="Mileage:" label-for="mileage" :invalid-feedback="invalidFeedbackMileage" :valid-feedback="validFeedbackMileage" :state="stateMileage">
            <b-form-input id="mileage" type="text" placeholder="Enter a number" size="sm" v-model="mileage"></b-form-input>
           </b-form-group>
        </div>
        
    </div> 
    <div class="containter mx-2 row">
        <div class="col">
            <b-form-group label-cols="1" label-cols-lg="4" label-size="sm" label="Transmission type:" label-for="transmissionType">
            <b-form-select id="transmissionType" v-model="gearshift" :options="gearshifts">
                <template v-slot:first>
                  <b-form-select-option :value="null">Select transmission type</b-form-select-option>
                </template>
              </b-form-select>  
          </b-form-group>
        </div>
        <div class="col">
          <div class="row">
            <div class="col"> 
                <b-form-group label-cols="4" label-size="sm" label="Price:" label-for="minPrice" :invalid-feedback="invalidFeedbackMinPrice" :valid-feedback="validFeedbackMinPrice" :state="stateMinPrice">
                  <b-form-input   type="text" id="minPrice" size="sm" placeholder="Min" v-model="minPrice"></b-form-input>
                </b-form-group>
            </div>
            <div class="col"> 
              <b-form-group label-cols="4" label-size="sm" label="Price:" label-for="maxPrice" :invalid-feedback="invalidFeedbackMaxPrice" :valid-feedback="validFeedbackMaxPrice" :state="stateMaxPrice">
                  <b-form-input  type="text" id="maxPrice" size="sm" placeholder="Max" v-model="maxPrice"></b-form-input>
                </b-form-group>
            </div>
          </div>
        </div>
        <div class="col">
            <b-form-group label-cols="1" label-cols-lg="4" label-size="sm" label="Planned mileage:" label-for="plannedMileage" :invalid-feedback="invalidFeedbackPlannedMileage" :valid-feedback="validFeedbackPlannedMileage" :state="statePlannedMileage">
            <b-form-input id="plannedMileage" type="text" placeholder="Unlimited" size="sm" v-model="plannedMileage"></b-form-input>
           </b-form-group>
        </div>
    </div> 
    <div class="containter mx-2 row">
      <div class="col">
          <b-form-group class="mt-custom" label="Collision Damage Waiver Protection ">
              <b-form-radio v-model="CDWProtection" name="cwd-true" value="true">Yes</b-form-radio>
              <b-form-radio v-model="CDWProtection" name="cwd-false" value="false">No</b-form-radio>
          </b-form-group> 
      </div>
    </div>
    </b-card-text>
  </b-form>
  </b-card>
</b-collapse>

  <div class="div-resault" v-if="showCars"> 
    <div class="container d-flex mt-1">
       <b-form-select v-model="sortSelected" :options="sortingOptions" @change="sortCars()" class="col-2 ml-auto mr-custom">
          <template v-slot:first>
              <b-form-select-option :value="null">Sort By</b-form-select-option>
          </template>
      </b-form-select>  
    </div>

    <div v-for="item in items" :key="item.id"> 
       <b-card no-body class="overflow-hidden shadow mb-4 mt-2" header-bg-variant="warning">
          <template v-slot:header>
            <h2 class="sm-0 text-center"> {{item.car.carBrand.name}}  {{item.car.carModel.name}} </h2>
          </template>
          <b-row no-gutters>
            <b-col >
              <b-card-img :src="item.car.photos64[0]"  alt="Image" class="rounded-0 mt-2 mb-2 ml-2 "> </b-card-img>
            </b-col>
            <b-col >
              <b-card-body>
                <b-card-text>
                  <b-row class="mt-1">
                    <b-col>
                        <b> Available from: </b> {{format_date(item.startDate)}} <b> to </b> {{format_date(item.endDate)}}
                    </b-col>
                  </b-row>
                  <b-row class="mt-3"> 
                    <b-col>
                        <b> Rating: </b> {{item.car.rate}}
                       <b-icon icon="star-fill"></b-icon>                       
                  </b-col>
                  <b-col>
                        <b>Price per day:</b> {{item.priceList.pricePerDay}} <b> € </b>
                    </b-col>
                  </b-row>   
                <b-row class="mt-3">
                <b-col>
                  <b>Fuel type:</b> {{item.car.fuelType}}
                </b-col>
                <b-col>
                  <b>Car class:</b> {{item.car.carClass}}
                </b-col>
              </b-row>       
              <b-row class="mt-3">
                  <b-col>
                    <b>Transmission:</b> {{item.car.transType}}
                  </b-col>
                  <b-col>
                    <b>Children seats:</b> {{item.car.childrenSeats}}
                  </b-col>
              </b-row> 
              <b-row class="mt-3">
                  <b-col>
                    <b>Mileage:</b> {{item.car.mileage}} <b>km</b>
                  </b-col>
                  <b-col>
                    <b>Km limit:</b> {{item.limitKm}}
                  </b-col>
              </b-row>     
              <b-row class="mt-3">
                  <b-col >
                    <b>Location:</b> {{item.location}} 
                  </b-col>
                  <b-col>
                    <b>Collision Damage Waiver: </b> {{ item.cdw == true ? 'Yes' : 'No' }}
                  </b-col>
              </b-row>  
               <hr>
              <b-row>       
                <b-button class="ml-auto mr-3" @click="details(item.id)">Details</b-button>
              </b-row>   
          </b-card-text>       
        </b-card-body>
        
      </b-col>
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
import moment from 'moment';
const baseUrl = "http://localhost:8086/api";

export default {
    name: "HomePage",
    components: {
       NavBar,
    },
    data() {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()+2);
      const minD = new Date(today);
      

      return {
            minDate: minD,
            maxDate: null,
            location: null,
            startDate: null,
            endDate: null,
            showError: false,
            showCars: false,
            brand: null,      
            model: null,
            fuelType: null,
            gearshift: null,         
            cclass: null,
            minPrice: null,
            maxPrice: null,
            childSeats: null,
            mileage: null,
            plannedMileage: null,
            CDWProtection: null,
            sortSelected: null,
            brands:[],
            models:[],
            fuelTypes:[
                { value: "Petrol", text: "Petrol"},
                { value: "Gas", text: "Gas"},
                { value: "Diesel", text: "Diesel"},
                { value: "Hybrid", text: "Hybrid"},
                { value: "Electric", text: "Electric"},
            ],
            gearshifts:[
                { value: "Manuel", text: "Manuel"},
                { value: "Automatic", text: "Automatic"},
                { value: "Semi_automatic", text: "Semi-Automatic"},
            ],
            classes: [
              { value: "Suv", text: "SUV"},
              { value: "Old_timer", text: "Old Timer"},
              { value: "Saloon", text: "Saloon"},
              { value: "Sport_car", text: "Sports Car"},     
              { value: "Station_vagon", text: "Station Vagon"},
              { value: "Van", text: "Van"},
              { value: "Coupe", text: "Coupe"},       
            ],
            sortingOptions: [
              { value: 'priceAsc', text: 'Price ascending' },
              { value: 'priceDesc', text: 'Price descendig' },
              { value: 'mileageAsc', text: 'Mileage ascending' },
              { value: 'mileageDesc', text: 'Mileage descending'},
              { value: 'rateAsc', text: 'Rate ascending'},
              { value: 'rateDesc', text: 'Rate descending'},
            ],
        items: [],
        }
    },
    methods: {
      search1: function()
      {
        axios.get(baseUrl + "/ads").then(response => {
          this.items = response.data;
        });
        this.showCars = true;

      },
      search(){

        if(this.minPrice != null && this.minPrice != "" && this.maxPrice != null && this.maxPrice != ""){
          if(parseFloat(this.minPrice) >= parseFloat(this.maxPrice)){
            this.$notify({
                group: 'mainHolder',
                title: 'Error',
                text: 'Maximum price has to be greater than minimum price!',
                type: 'error',
                duration: 5000
              });
            return;
          }
        }
        let searchDTO = {"location": this.location, "startDate": this.startDate, "endDate": this.endDate, "cdw":this.CDWProtection,
        "carBrand": this.brand, "carModel": this.model, "carClass": this.cclass, "fuelType": this.fuelType,
        "transmissionType": this.gearshift, "childrenSeats": this.childSeats, "mileage": this.mileage,
        "plannedMileage": this.plannedMileage, "minPrice": this.minPrice, "maxPrice": this.maxPrice};

        axios.post(baseUrl + "/ads",searchDTO).then(response => {
            this.items = response.data;
            if(this.items.length != 0){
               this.showCars = true;
            }else{
              this.showCars = false;
            }
        }).catch(error => {
            this.$notify({
                group: 'mainHolder',
                title: 'Error',
                text: error.response.data,
                type: 'error',
                duration: 5000
              });
        });
      },
      details: function(id)
      {
        this.$router.push({ path: 'reserveCar', query: { id: id } });
      },
      format_date(value){
         if (value) {
           return moment(String(value)).format('DD-MMM-YYYY')
          }
      },
      moreDetails(){
           axios.get(baseUrl + "/carBrand").then(
                response => {
                 console.log(response.data);
                 this.brands = response.data;
           }).catch(error => {
              console.log(error);
           })
      },
      sortCars() {
        if(this.sortSelected === 'priceAsc') {
          this.sortByPriceASC();
        } else if(this.sortSelected === 'priceDesc') {
          this.sortByPriceDESC();
        } else if (this.sortSelected === 'mileageAsc') {
          this.sortByMileageASC();
        } else if (this.sortSelected === 'mileageDesc') {
          this.sortByMileageDESC();
        } else if (this.sortSelected === 'rateAsc') {
          this.sortByRateASC();
        } else {
          this.sortByRateDESC();
        }
      },
      sortByPriceASC() {
        function compare (objA, objB) {
          if(objA.priceList.pricePerDay < objB.priceList.pricePerDay) {
            return -1;
          }
          if(objA.priceList.pricePerDay > objB.priceList.pricePerDay) {
            return 1;
          }

          return 0;
        }

        this.items = this.items.sort( compare );
      },
      sortByPriceDESC() {
        function compare (objA, objB) {
          if(objA.priceList.pricePerDay > objB.priceList.pricePerDay) {
            return -1;
          }
          if(objA.priceList.pricePerDay < objB.priceList.pricePerDay) {
            return 1;
          }

          return 0;
        }

        this.items = this.items.sort( compare );
      },
      sortByMileageASC() {
        function compare (objA, objB) {
          if(objA.car.mileage < objB.car.mileage) {
            return -1;
          }
          if(objA.car.mileage > objB.car.mileage) {
            return 1;
          }

          return 0;
        }

        this.items = this.items.sort( compare );
      },
      sortByMileageDESC() {
        function compare (objA, objB) {
          if(objA.car.mileage > objB.car.mileage) {
            return -1;
          }
          if(objA.car.mileage < objB.car.mileage) {
            return 1;
          }

          return 0;
        }

        this.items = this.items.sort( compare );
      },
      sortByRateASC() {
        function compare (objA, objB) {
          if(objA.car.rate < objB.car.rate) {
            return -1;
          }
          if(objA.car.rate > objB.car.rate) {
            return 1;
          }

          return 0;
        }

        this.items = this.items.sort( compare );
      },
      sortByRateDESC() {
        function compare (objA, objB) {
          if(objA.car.rate > objB.car.rate) {
            return -1;
          }
          if(objA.car.rate < objB.car.rate) {
            return 1;
          }

          return 0;
        }

        this.items = this.items.sort( compare );
      },
    },
    computed:{
      formIsValid: function()
      {
          if(this.startDate!=null && this.endDate!=null && this.startDate <= this.endDate && this.location!=null 
          && this.stateLocation && this.stateSeats && this.stateMileage && this.statePlannedMileage && this.stateMinPrice
          && this.stateMaxPrice)
          {
            return true;          
          }
          else return false;
      },
      stateLocation: function(){
            if(this.location != "") {
              if(this.location != null){
                 if(!this.location.match(/^[a-zA-Z ]{1,100}$/)){
                      return false;
                 }else{
                   return true;
                 }
                }else{
                    return true;
                }
            }else{
                  return false;
            }
        },
        invalidFeedbackLocation: function(){
            if(this.stateLocation == false){
                  return 'Location can only contain letters and spaces. No more than 100 characters.';
            }else{
                  return '';
            }      
        },
        validFeedbackLocation: function(){
            
               if(this.location != ""){
                 if(this.location != null){
                 if(!this.location.match(/^[a-zA-Z ]{1,100}$/)){
                     return '';
                 }else{
                   return 'Valid format';
                 }
                }else{
                    return '';
                }
            }else{
                return '';
            }
                
        },
        stateSeats: function(){
            if(this.childSeats != null && this.childSeats!=""){
                 if(!this.childSeats.match(/^[0-4]$/)){
                      return false;
                }else{
                    return true;
                }
            }else{
                return true;
            }
        },
        invalidFeedbackSeats: function(){
            if(this.stateSeats == false){
                  return 'Number of seats can be from 0 to 4.';
            }else{
                  return '';
            }      
        },
        validFeedbackSeats: function(){
            
               if(this.childSeats != null && this.childSeats!=""){
                 if(!this.childSeats.match(/^[0-4]$/)){
                     return '';
                }else{
                    return '';
                }
            }else{
                return '';
            }
                
        },
        stateMileage: function(){
            if(this.mileage != null && this.mileage!=""){
                 if(!this.mileage.match(/^[0-9]+$/)){
                      return false;
                }else{
                    return true;
                }
            }else{
                return true;
            }
        },
        invalidFeedbackMileage: function(){
            if(this.stateMileage == false){
                  return 'Mileage has to be number >= 0';
            }else{
                  return '';
            }      
        },
        validFeedbackMileage: function(){
            
               if(this.mileage != null && this.mileage!=""){
                 if(!this.mileage.match(/^[0-9]+$/)){
                     return '';
                }else{
                    return '';
                }
            }else{
                return '';
            }
                
        },
        statePlannedMileage: function(){
            if(this.plannedMileage != null && this.plannedMileage!=""){
                 if(!this.plannedMileage.match(/^[1-9][0-9]*$/)){
                      return false;
                }else{
                    return true;
                }
            }else{
                return true;
            }
        },
        invalidFeedbackPlannedMileage: function(){
            if(this.statePlannedMileage == false){
                  return 'Planned mileage has to be > 0';
            }else{
                  return '';
            }      
        },
        validFeedbackPlannedMileage: function(){
            
               if(this.plannedMileage != null && this.plannedMileage!=""){
                 if(!this.plannedMileage.match(/^[1-9][0-9]*$/)){
                     return '';
                }else{
                    return '';
                }
            }else{
                return '';
            }
                
        },
        stateMinPrice: function(){
            if(this.minPrice != null && this.minPrice!=""){
                 if(!this.minPrice.match(/^([0-9]+(?:[.][0-9]*)?|\.[0-9]+)$/)){
                      return false;
                }else{
                    if(parseFloat(this.minPrice) === 0.0){
                      return false;
                    }
                    return true;
                }
            }else{
                return true;
            }
        },
        invalidFeedbackMinPrice: function(){
            if(this.stateMinPrice == false){
                  return 'Decimal > 0';
            }else{
                  return '';
            }      
        },
        validFeedbackMinPrice: function(){
            
               if(this.minPrice != null && this.minPrice!=""){
                 if(!this.minPrice.match(/^([0-9]+(?:[.][0-9]*)?|\.[0-9]+)$/)){
                     return '';
                }else{
                    return '';
                }
            }else{
                return '';
            }
                
        },
        stateMaxPrice: function(){
            if(this.maxPrice != null && this.maxPrice!=""){
                 if(!this.maxPrice.match(/^([0-9]+(?:[.][0-9]*)?|\.[0-9]+)$/)){
                      return false;
                }else{
                  if(parseFloat(this.maxPrice) === 0.0){
                      return false;
                    }
                    return true;
                }
            }else{
                return true;
            }
        },
        invalidFeedbackMaxPrice: function(){
            if(this.stateMaxPrice == false){
                  return 'Decimal > 0';
            }else{
                  return '';
            }      
        },
        validFeedbackMaxPrice: function(){
            
               if(this.maxPrice != null && this.maxPrice!=""){
                 if(!this.maxPrice.match(/^([0-9]+(?:[.][0-9]*)?|\.[0-9]+)$/)){
                     return '';
                }else{
                    return '';
                }
            }else{
                return '';
            }
                
        }

    },
    watch: {
      brand: function(newValue, oldValue){
          console.log(oldValue);
          if(newValue != null){
            axios.get(baseUrl + "/carBrand/" + newValue + "/carModel").then(
              response => {
                this.models = response.data;
              }
            ).catch(error => {
                console.log(error.response);
            })
          }
      }
    }
  
};
</script>

<style scoped>
.badge-notify{
   background:red;
   position:relative;
   top: -15px;
   left: -15px;
}
  .div-search{
    width:20%;
    float:left;
    
  }
  .div-filter{
    float: left;
    width: 80%;
  }

  .div-resault{
    padding: 1em;
    margin-left: 7em;
    margin-right: 7em;
  }
  
  #card{
    padding: 1em;
  }
  
</style>