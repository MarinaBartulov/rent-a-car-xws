<template>
  <div>
    <NavBar />
    <div class="image"></div>
    <div class="container col-11 card-container">
      <b-card class="shadow">
        <b-form>
          <b-form-group>
            <b-row>
              <b-col>
                <b-label>Pick-Up Location</b-label>
                <b-input-group>
                  <b-input-group-prepend is-text>
                    <b-icon icon="geo-alt"></b-icon>
                  </b-input-group-prepend>
                  <b-form-input v-model="location" type="text" required></b-form-input>
                </b-input-group>
              </b-col>
              <b-col>
                <b-label>Pick-Up Date</b-label>
                <b-input-group>
                  <b-form-datepicker :min="minDate" locale="en" v-model="startDate"></b-form-datepicker>
                </b-input-group>
              </b-col>
              <b-col>
                <b-label>Return Date</b-label>
                <b-input-group>
                  <b-form-datepicker :min="minDate" locale="en" v-model="endDate"></b-form-datepicker>
                </b-input-group>
              </b-col>
              <b-col>
                <b-input-group>
                  <b-button
                    v-b-toggle.collapse-2
                    type="button"
                    class="col-12 mt-4 m-1"
                    @click="extendSearch()"
                  >Expanded Search</b-button>
                </b-input-group>
              </b-col>
              <b-col>
                <b-input-group>
                  <b-button type="button" class="col-12 mt-4" :disabled="!isValidForm" @click="search()">Search</b-button>
                </b-input-group>
              </b-col>
            </b-row>
            <b-row>
              <b-collapse id="collapse-2" class="mb-5 container-fluid margin-custom">
                <div class="extended-search mt-3 pt-2">
                  <b-row class="mt-3">
                    <b-col>
                      <b-form-group label="Brand:">
                         <b-form-select @change="getModelsForBrand()" v-model="selectedBrand">
                      <template v-slot:first>
                          <b-form-select-option selected :value="null">All brands</b-form-select-option>
                      </template>
                      <option v-for="(brand,index) in brands"
                          :key="index"
                          :value="brand">
                          {{brand.name}}
                    </option>
                    </b-form-select>
                      </b-form-group>
                    </b-col>
                    <b-col>
                     <b-form-group  :disabled="selectedBrand == null " label="Model:">
                        <b-form-select :disabled="selectedBrand == null" v-model="selectedModel">
                            <template v-slot:first>
                                <b-form-select-option selected :value="null">All models</b-form-select-option>
                            </template>
                            <option v-for="(models,index) in models"
                                :key="index"
                                :value="models">
                                {{models.name}}
                          </option>
                          </b-form-select>
                        </b-form-group>
                    </b-col>
                    <b-col>
                      <b-form-group label="Price from:">
                        <b-input-group append="€">
                          <b-form-input v-model="priceFrom" type="number" min="0"></b-form-input>
                        </b-input-group>
                      </b-form-group>
                    </b-col>
                    <b-col>
                      <b-form-group label="Price to:">
                        <b-input-group append="€">
                          <b-form-input v-model="priceTo" type="number" min="0"></b-form-input>
                        </b-input-group>
                      </b-form-group>
                    </b-col>
                  </b-row>
                  <b-row class="mt-2">
                    <b-col>
                       <b-form-group label="Fuel type:">
                        <b-form-select v-model="fueltypeSelected">
                            <template v-slot:first>
                              <b-form-select-option selected :value="null">All Fuel Types</b-form-select-option>
                          </template>
                          <option v-for="(fuelType,index) in fuelType"
                              :key="index"
                              :value="fuelType">
                              {{fuelType.name}}
                        </option>
                        </b-form-select>
                      </b-form-group>                   
                    </b-col>
                    <b-col>
                       <b-form-group label="Vehicle type:">
                        <b-form-select v-model="vehicletypeSelected">
                           <template v-slot:first>
                              <b-form-select-option selected :value="null">All Vehicle Types</b-form-select-option>
                          </template>
                          <option v-for="(vehicletype,index) in vehicletype"
                              :key="index"
                              :value="vehicletype">
                              {{vehicletype.name}}
                        </option>
                        </b-form-select>
                      </b-form-group>
                    </b-col>
                    <b-col>
                       <b-form-group label="Transmission type:">
                        <b-form-select v-model="transmissionSelected">
                           <template v-slot:first>
                              <b-form-select-option selected :value="null">All Transmission Types</b-form-select-option>
                          </template>
                          <option v-for="(transmission,index) in transmission"
                              :key="index"
                              :value="transmission">
                              {{transmission.name}}
                        </option>
                        </b-form-select>
                      </b-form-group>
                    </b-col>
                  </b-row>
                  <b-row class="mt-2">
                    <b-col>
                      <b-form-group label="Mileage:">
                        <b-form-input v-model="mileage" type="number" min="0"></b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col>
                      <b-form-group label="Kilometers limit:">
                        <b-form-input v-model="kmLimit" type="number" min="0" placeholder="Unlimited"></b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col>
                      <b-form-group label="Number of children seats:">
                        <b-form-input v-model="childrenSeats" type="number" min="0"></b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col>
                      <b-form-group class="mt-custom">
                        <b-form-checkbox
                          id="checkboxCDW"
                          v-model="cdw"
                          name="checkboxCDW"
                          :value="true"
                        >Collision Damage Waiver</b-form-checkbox>
                      </b-form-group>
                    </b-col>
                  </b-row>
                </div>
              </b-collapse>
            </b-row>
          </b-form-group>
        </b-form>
      </b-card>
    </div>
     <div  v-if="loading == true"  align="center">
      <br/>
      <br/>
     <b-spinner style="width: 5rem; height: 5rem;" label="Large Spinner"></b-spinner>
    </div>
    <div v-if="loading == false">
    <div class="container d-flex mt-5">
      <b-form-select
        v-model="sortSelected"
        :options="sortingOptions"
        class="col-2 ml-auto mr-custom"
        v-if="show"
        @change="sortCars()"
      ></b-form-select>
    </div>
    <div  class="container mt-4 d-flex justify-content-center" v-for="v in vehicles" :key="v.id">
      <VehicleCard v-if="show" :showDiffButtons="true" :vehicle="v" :startDate="startDate" :endDate="endDate" />
    </div>
    </div>
  </div>
</template>

<script>
import NavBar from "../components/NavBar.vue";
import VehicleCard from "../components/VehicleCard.vue";
import axios from "axios";
//import moment from 'moment';
const baseUrlCar = "http://localhost:8083/car-service";
const baseUrlAd = "http://localhost:8083/ad-service";

export default {
  name: "HomePage",
  components: {
    NavBar,
    VehicleCard
  },
  data() {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()+2);
    const min_date = new Date(today);
    return {
      minDate: min_date,
      startDate: null,
      endDate: null,
      location: "",
      selectedBrand: null,
      vehicletypeSelected: null,
      fueltypeSelected: null,
      transmissionSelected: null,
      cdw: false,
      priceFrom:null,
      priceTo:null,
      kmLimit:null,
      brands: [
        { value: null, text: "Select brand", disabled: true },
        { value: "a", text: "Alfa Romeo" },
        { value: "b", text: "Audi" },
        { value: "c", text: "BMW" },
        { value: "d", text: "Chevrolet" },
        { value: "e", text: "Ferrari" },
        { value: "f", text: "Fiat" },
        { value: "g", text: "Ford" },
        { value: "h", text: "Hyundai" },
        { value: "i", text: "Mercedes Benz" },
        { value: "j", text: "Peugeot" },
        { value: "k", text: "Toyota" }
      ],
      selectedModel: null,
      models: [
        { value: null, text: "Select model", disabled: true },
        { value: "a", text: "Alfa Romeo" },
        { value: "b", text: "A8" },
        { value: "c", text: "BMW" },
        { value: "d", text: "Chevrolet" },
        { value: "e", text: "Ferrari" },
        { value: "f", text: "Fiat" },
        { value: "g", text: "Ford" },
        { value: "h", text: "Hyundai" },
        { value: "i", text: "Mercedes Benz" },
        { value: "j", text: "Peugeot" },
        { value: "k", text: "Toyota" }
      ],
      fuelType: [
        { text: "Petrol", value: "petrol" },
        { text: "Diesel", value: "diesel" },
        { text: "Hybrid", value: "hybrid" },
        { text: "Gas", value: "gas" },
        { text: "Electric", value: "electric" }
      ],
      vehicletype: [
        { text: "SUV", value: "suv" },
        { text: "Saloon", value: "saloon" },
        { text: "Coupe", value: "coupe" },
        { text: "Cabriolet", value: "cabriolet" }
      ],
      transmission: [
        { text: "Manual gearbox", value: "manual" },
        { text: "Semi-automatic", value: "semi-automatic" },
        { text: "Automatic", value: "automatic" }
      ],
      vehicles: [],
      show: false,
      sortSelected: null,
      sortingOptions: [
        { value: null, text: "Sort by", disabled: true },
        { value: "priceAsc", text: "Price ascending" },
        { value: "priceDesc", text: "Price descendig" },
        { value: "mileageAsc", text: "Mileage ascending" },
        { value: "mileageDesc", text: "Mileage descending" },
        { value: "rateAsc", text: "Rate ascending" },
        { value: "rateDesc", text: "Rate descending" }
      ],
      loading:false,
      extended:false,
      mileage:null,
      childrenSeats:null

    };
  },
  methods: {
    search: function() {
      this.loading=true;
      if(this.extended ==false){
        localStorage.setItem("startDate", this.startDate);
        localStorage.setItem("endDate", this.endDate);
        axios.get("http://localhost:8083/ad-service/api/ad/"+this.startDate+"/"+this.endDate+"/"+this.location).then(
          response => {
            this.vehicles = response.data;
            this.loading=false;
          }
        ).catch(error =>{
                if(error.response.data.status != 400){ 
                    this.$bvToast.toast(error.response.data, {
                    title: 'Incorrect input',
                    variant: 'danger',
                    solid: true
                    });
                    
                }else{ 
                    this.$bvToast.toast(error.response.data.errors[0].defaultMessage, {
                    title: 'Incorrect input',
                    variant: 'danger',
                    solid: true
                    });
                }
                this.loading=false;
            });
      }else{
          var brand = "all";
          var model = "all";
          var fuel = "all";
          var type = "all";
          var transmission = "all";
          var mile = this.mileage;
          var priceF = this.priceFrom;
          var priceT = this.priceTo;
          var limit = this.kmLimit;
          var seatsC = this.childrenSeats;


          if(this.selectedBrand == null){
              brand = "all";
          }else{
               brand = this.selectedBrand.name;
          }
          if(this.selectedModel == null){
              model = "all";
          }else{
              model = this.selectedModel.name;
          }
          if(this.fueltypeSelected == null){
              fuel = "all";
          }else{
              fuel = this.fueltypeSelected.name;
          }
          if(this.vehicletypeSelected  == null){
              type = "all";
          }else{
              type = this.vehicletypeSelected.name;
          }
          if(this.transmissionSelected == null){
              transmission = "all";
          }else{
             transmission = this.transmissionSelected.name;
          }

          if(this.mileage == null || this.mileage < 0 ||  this.mileage  == ""){
              mile = 0;
          }

          if(this.priceFrom == null || this.priceFrom < 0 ||  this.priceFrom == ""){
              priceF = 0;
          }

          if(this.priceTo == null || this.priceTo < 0 ||  this.priceTo  == ""){
              priceT= 0;
          }

          if(this.kmLimit == null || this.kmLimit < 0 || this.kmLimit == ""){
              limit = 0;
          }

          if(this.childrenSeats == null || this.childrenSeats < 0 || this.childrenSeats == ""){
              seatsC = 0;
          }
          
          axios.get(baseUrlAd+"/api/search/ad/" +this.startDate+"/"+this.endDate+"/"+this.location+"/"+priceF+"/"+priceT
          +"/"+limit+"/"+this.cdw+"/car/"+brand+"/"+model+"/"+fuel
          +"/"+type+"/"+transmission+"/"+mile+"/"+seatsC).then(
          response => {
            this.vehicles = response.data;
            this.loading=false;
          }).catch(error =>{
                if(error.response.data.status != 400){ 
                    this.$bvToast.toast(error.response.data, {
                    title: 'Incorrect input',
                    variant: 'danger',
                    solid: true
                    });
                }else{ 
                    this.$bvToast.toast(error.response.data.errors[0].defaultMessage, {
                    title: 'Incorrect input',
                    variant: 'danger',
                    solid: true
                    });
                }
            });
          

      }
    
      this.show = true;
    },
    getModelsForBrand(){
      if(this.selectedBrand == null){
        this.selectedModel = null;
        
      }else{ 
        axios.get(baseUrlCar + "/model/brand/"+this.selectedBrand.id).then((response) => {
        this.models = response.data;
        })
      }
    },
    extendSearch(){
      this.extended = !this.extended;
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
        this.vehicles = this.vehicles.sort( compare );
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
        this.vehicles = this.vehicles.sort( compare );
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
        this.vehicles = this.vehicles.sort( compare );
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
        this.vehicles = this.vehicles.sort( compare );
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
        this.vehicles = this.vehicles.sort( compare );
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
        this.vehicles = this.vehicles.sort( compare );
      },
  },
  computed: {
    isValidForm: function(){
      if(this.startDate != null && this.endDate != null && this.location !== ""){
        let date1 = this.startDate.split("-");
        let sDate = new Date(date1[0],date1[1]-1,date1[2]);
        let date2 = this.endDate.split("-");
        let eDate = new Date(date2[0],date2[1]-1,date2[2]);
        if(sDate <= eDate){
         return true;
        }else{
          return false;
        }
      }else{
        return false;
      }
    }
  },
   mounted(){
    axios.get(baseUrlCar + "/brand").then((response) => {
      this.brands = response.data;
    })
    axios.get(baseUrlCar + "/fuel").then((response) => {
      this.fuelType = response.data;
    })
    axios.get(baseUrlCar + "/transmission").then((response) => {
      this.transmission = response.data;
    })
    axios.get(baseUrlCar + "/class").then((response) => {
      this.vehicletype = response.data;
    })
   }
};
</script>

<style scoped>
.image {
  overflow: hidden;
  background-image: url("../assets/car_lake1.jpg");
  height: 500px;
  width: 100%;
  background-position: bottom;
  background-repeat: no-repeat;
  background-size: cover;
  position: absolute;
}

.card-container {
  margin-top: 28%;
  position: relative;
}

.extended-search {
  width: 100%;
  border-top: 1px solid rgb(168, 168, 168);
}

.shadow {
  -webkit-box-shadow: 5px 5px 5px 5px;
  box-shadow: 5px 5px 5px 5px;
}

.mt-custom {
  margin-top: 12%;
}

.mr-custom {
  margin-right: 12.5%;
}
</style>