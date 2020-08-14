<template>
  <div>
    <NavBar />
    <div class="container col-8">
      <b-card style="max-width: 80rem; " class="mt-3 shadow mb-3">
        <template v-slot:header>
          <h3 class="mb-0 text-center">Post an Ad</h3>
        </template>
        <b-form @submit.prevent="postAd()">
          <b-form-group>
            <b-container fluid class="p-4 bg-light">
              <input @change="getImage" type="file" ref="file" style="display: none">
              <b-row>
                <b-col class="d-flex justify-content-center" v-if="images.length === 0">
                  <b-img v-if="images" thumbnail fluid src="https://via.placeholder.com/350x250" alt="Image 1"></b-img>
                </b-col>
                <b-col v-for="img in images" :key="img">
                  <b-img v-if="images" width="300" height="250" thumbnail :src="img"></b-img>
                </b-col>
              </b-row>
            </b-container>
            <b-container class="mt-2">
              <b-row>
                <b-button :disabled="carChosen" class="buttons" @click="$refs.file.click()" >Add an image</b-button>
                <b-button :disabled="carChosen" variant="outline-secondary" class="buttons ml-2" @click="removeImage()" >Remove an image</b-button>
              </b-row>
            </b-container>
            <hr>
            <b-row>
              <b-col class="mt-2">
                <b-form-group label="Choose a car:" >
                  <b-form-select @change="chooseCar()" v-model="car">
                      <template v-slot:first>
                          <b-form-select-option selected :value="null">New car</b-form-select-option>
                      </template>
                      <option v-for="(carSelected,index) in cars"
                          :key="index"
                          :value="carSelected">
                          {{carSelected.carBrand.name}} {{carSelected.carModel.name}}
                  </option>
                  </b-form-select>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row class="mt-2">
              <b-col class="col-4">
                  <b-form-group :disabled="carChosen"  label="Brand:" >
                    <b-form-select required @change="getModelsForBrand()" v-model="selectedBrand">
                      <template v-slot:first>
                          <b-form-select-option selected :value="null">Select brand</b-form-select-option>
                      </template>
                      <option v-for="(brand,index) in brands"
                          :key="index"
                          :value="brand">
                          {{brand.name}}
                    </option>
                    </b-form-select>
                </b-form-group>
              </b-col>
              <b-col class="col-4">
                <b-form-group required :disabled="carChosen || selectedBrand == null " label="Model:">
                  <b-form-select :disabled="selectedBrand == null" required v-model="selectedModel">
                      <template v-slot:first>
                          <b-form-select-option selected :value="null">Select model</b-form-select-option>
                      </template>
                      <option v-for="(models,index) in models"
                          :key="index"
                          :value="models">
                          {{models.name}}
                    </option>
                    </b-form-select>
                </b-form-group>
              </b-col>
              <b-col class="col-4">
                 <b-form-group required :disabled="carChosen" label="Vehicle type:">
                  <b-form-select required v-model="vehicletypeSelected">
                      <template v-slot:first>
                          <b-form-select-option selected :value="null">Select Vehicle Type</b-form-select-option>
                      </template>
                      <option v-for="(vehicletype,index) in vehicletype"
                          :key="index"
                          :value="vehicletype">
                          {{vehicletype.name}}
                    </option>
                    </b-form-select>
                </b-form-group>
              </b-col>
            </b-row>
            <hr />
            <b-row>
              <b-col>
                <b-form-group required :disabled="carChosen" label="Fuel type:">
                <b-form-select required v-model="fueltypeSelected">
                      <template v-slot:first>
                          <b-form-select-option selected :value="null">Select Fuel Type</b-form-select-option>
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
                <b-form-group required :disabled="carChosen" label="Transmission type:">
                 <b-form-select required v-model="transmissionSelected">
                      <template v-slot:first>
                          <b-form-select-option selected :value="null">Select Transmission Type</b-form-select-option>
                      </template>
                      <option v-for="(transmission,index) in transmission"
                          :key="index"
                          :value="transmission">
                          {{transmission.name}}
                    </option>
                    </b-form-select>
                </b-form-group>
                
              </b-col>
              <b-col>
                <b-form-group label="Number of children seats:">
                  <b-form-input required :disabled="carChosen" v-model="seatsChildren" type="number" min="0"></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>
            <hr />
            <b-row>
              <b-col>
                <b-form-group label="Mileage:">
                  <b-form-input required :disabled="carChosen" v-model="kmDriven" type="number" min="0"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col>
                <b-form-group label="Kilometers limit:">
                  <b-form-input v-model="limitkm" type="number" min="0" placeholder="Unlimited"></b-form-input>
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
            <hr />
            <b-row>
              <b-col>
                <b-form-group label="Rentable from:">
                  <b-input-group required>
                    <b-form-datepicker v-model="startDate" :min="minDate" locale="en" placeholder="Start date"></b-form-datepicker>
                  </b-input-group>
                </b-form-group>
              </b-col>
              <b-col>
                <b-form-group label="Rentable to:">
                  <b-input-group>
                    <b-form-datepicker required v-model="endDate" :min="minDate" locale="en" placeholder="End date"></b-form-datepicker>
                  </b-input-group>
                </b-form-group>
              </b-col>
              <b-col>
                <b-form-group label="Location:">
                  <b-input-group>
                    <b-form-input required v-model="location" type="text"></b-form-input>
                  </b-input-group>
                </b-form-group>
              </b-col>
            </b-row>
            <hr />
            <b-row>
                <b-col>
                    <b-form-group required label="Pricing list:" >
                        <b-form-select required v-model="pricingListSelected">
                            <template v-slot:first>
                                <b-form-select-option :value="{}">Choose the pricing</b-form-select-option>
                            </template>
                            <option v-for="(priceList,index) in priceLists"
                                :key="index"
                                :value="priceList">
                                {{priceList.alias}}
                        </option>
                        </b-form-select>
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row >
                <b-col>
                    <b-form-group label="Price per km:" >
                        <b-input-group append="€">
                        <b-form-input v-model="pricingListSelected.pricePerKm" disabled></b-form-input>
                        </b-input-group>
                    </b-form-group>
                </b-col>
                <b-col>
                    <b-form-group label="Price per day:" >
                        <b-input-group append="€">
                        <b-form-input v-model="pricingListSelected.pricePerDay" disabled></b-form-input>
                        </b-input-group>
                    </b-form-group>
                </b-col>
            </b-row>
              <b-row >
                <b-col>
                    <b-form-group label="Discount 20 days:" >
                    <b-input-group append="%">
                        <b-form-input v-model="pricingListSelected.discount20Days" disabled></b-form-input>
                    </b-input-group>
                    </b-form-group>
                </b-col>
                <b-col>
                    <b-form-group label="Discount 30 days:" >
                        <b-input-group append="%">
                        <b-form-input v-model="pricingListSelected.discount30Days" disabled></b-form-input>
                        </b-input-group>
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
               <b-col>
                    <b-form-group label="Cdw price:" >
                        <b-input-group append="€">
                        <b-form-input v-model="pricingListSelected.priceForCdw" disabled></b-form-input>
                        </b-input-group>
                    </b-form-group>
                </b-col>
                <b-col>
                  </b-col>
            </b-row>
            <hr />
            <b-row>
              <b-col>
                <b-form-group>
                  <b-form-checkbox
                  :disabled="carChosen"
                    id="checkboxAndroid"
                    v-model="android"
                    name="checkboxAndroid"
                    :value="true"
                  >Android app present in the vehicle</b-form-checkbox>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-button type="submit" class="buttons ml-auto mr-3" >Post ad</b-button>
            </b-row>           
          </b-form-group>
        </b-form>
      </b-card>
    </div>
  </div>
</template>

<script>
import NavBar from "../components/NavBar.vue";
const baseUrlCar = "http://localhost:8083/car-service";
const baseUrlAd = "http://localhost:8083/ad-service";
import axios from "axios";

export default {
  name: "PostAd",
  components: {
    NavBar
  },
  data() {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const min_date = new Date(today);
    return {
      minDate: min_date,
      selectedBrand: null,
      vehicletypeSelected: null,
      fueltypeSelected: null,
      transmissionSelected: null,
      cdw: false,
      android: false,
      brands: [],
      selectedModel: null,
      models: [],
      fuelType: [
        { text: "Petrol", value: "petrol" },
        { text: "Diesel", value: "diesel" },
        { text: "Hybrid", value: "hybrid" },
        { text: "Gas", value: "gas" },
        { text: "Electric", value: "electric" }
      ],
      vehicletype: [],
      transmission: [
        { text: "Manual gearbox", value: "manual" },
        { text: "Semi-automatic", value: "semi-automatic" },
        { text: "Automatic", value: "automatic" }
      ],
      images: [],
      currentImage: 0,
      startDate:null,
      endDate:null,
      limitkm:null,
      location:null,
      carId:null,
      seatsChildren:null,
      kmDriven:null,
      pricingListSelected:{},
      priceLists:[],
      cars:[],
      car:null,
      carChosen:false
    };
  },
  methods: {
    getImage(e) {
      let image = e.target.files[0];
      let reader = new FileReader();
      image.width = "350px";
      image.height = "250px";
      reader.readAsDataURL(image);
      reader.onload = e => {
        this.image = e.target.result;
        this.images.push(this.image);
      };
    },
    removeImage() {
      this.images.pop()
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
    postAd(){
        if(this.limitKm == null)
          this.limitKm=0;

        axios.post(baseUrlAd+'/api/ad',{
            ownerId:null,
            startDate: this.startDate,
            endDate: this.endDate,
            limitKm: this.limitkm,
            cdw: this.cdw,
            priceList:this.pricingListSelected,
            location:this.location, 
            car:{
                id:this.carId,
                childrenSeats:this.seatsChildren,
                mileage:this.kmDriven,
                carModel: this.selectedModel.name,
                carClass: this.vehicletypeSelected.name,
                transType: this.transmissionSelected.name,
                fuelType: this.fueltypeSelected.name,
                hasAndroidApp: this.android,
                photos64: this.images,
                carBrand:this.selectedBrand.name


            }
        }).then(response => {
                this.selectedFeul=response;
                this.$bvToast.toast('Ad posted for '+this.selectedBrand.name + ' '+this.selectedModel.name, {
                title: `Succesfuly posted ad`,
                variant: 'success',
                solid: true
                });
                if(this.android == true){
                  this.$bvToast.toast(response.data.car.androidToken, {
                  title: `Token for android app`,
                  variant: 'success',
                  autoHideDelay: 20000,
                  solid: true
                });
                }
                this.refreshForm();
            })
            .catch(error =>{
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
    },
    chooseCar(){
       if(this.car === null){
                this.car=null;
                this.selectedBrand=null;
                this.selectedModel=null;
                this.vehicletypeSelected = null;
                this.fueltypeSelected=null;
                this.transmissionSelected = null;
                this.seatsChildren = null;
                this.carId = null;
                this.kmDriven = null;
                this.cdw = false;
                this.location = null;
                this.images=[];
                this.carChosen=false;
                
            }else{
               this.selectedBrand = this.car.carBrand;
                 axios.get(baseUrlCar + "/model/brand/"+this.selectedBrand.id).then((response) => {
                  this.models = response.data;
                  this.selectedModel = this.car.carModel;
                })
                
                this.vehicletypeSelected = this.car.carClass;
                
                this.fueltypeSelected=this.car.fuelType;
                this.transmissionSelected = this.car.transType;
                this.seatsChildren = this.car.childrenSeats;
                this.carId = this.car.id;
                this.kmDriven = this.car.mileage;

                this.android= this.car.hasAndroidApp;
                this.carChosen=true;
                this.images = this.car.photos64;
                // axios.get(baseUrl+'/car/'+this.carId+'/photo')
                // .then(response => {
                //     this.images = response.data;
                // });
            }
    },
     refreshForm(){
            this.car = null;
            this.carChosen= false;
            this.selectedModel = null;
            this.vehicletypeSelected= null;
            this.fueltypeSelected = null;
            this.transmissionSelected = null;
            this.seatsChildren = null;
            this.kmDriven = null;
            this.cdw=false;
            this.startDate=null;
            this.endDate=null;
            this.android=false;
            this.pricingListSelected={};
            this.carChosen=false;
            this.location = null;
            this.images= [];
            this.selectedBrand=null;
            this.limitKm=null;
            axios.get(baseUrlCar + "/api/car/ad/notActive")
            .then(response => {
                this.cars = response.data;
            });
                
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
    axios.get(baseUrlAd + "/api/priceList/owner").then((response) => {
      this.priceLists = response.data;
    })
    axios.get(baseUrlCar + "/api/car/ad/notActive").then((response) => {
      this.cars = response.data;
    })
  }
};
</script>

<style scoped>
.shadow {
  -webkit-box-shadow: 5px 5px 5px 5px;
  box-shadow: 5px 5px 5px 5px;
}

.mt-custom {
  margin-top: 12%;
}

.buttons {
  width: 170px;
}

</style>