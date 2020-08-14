<template>
    
    <div align="center">
      <NavBar/>
    <b-card class="my-4"
        style="max-width: 70rem; "
        border-variant="secondary"
        header-bg-variant="warning"
    >
        
        <template v-slot:header>
            <h1 class="mb-0">Place an Ad</h1>
        </template>
        <b-container>
            <b-row>
                <b-col md="2">
                <b-container>
                    <b-row>
                        <input @change="getImage" type="file" ref="file" style="display: none">
                        <b-img v-if="images.length==0" src="https://via.placeholder.com/200"/>
                        <b-carousel ref="imageCarousel" v-model="currentImage" controls interval=100000>
                            <b-carousel-slide v-for="img in images" :key="img" :img-src="img" style="width:200px; height:200px">
                            </b-carousel-slide>
                        </b-carousel>
                        <b-button-group class="mt-3">
                            <b-button :disabled="carChosen" style="width:100px; height:50px" size="sm" @click="$refs.file.click()" >Add an image</b-button>
                            <b-button :disabled="carChosen" style="width:100px; height:50px" size="sm" @click="removeImage()" variant="dark" >Remove image</b-button>
                        </b-button-group>
                    </b-row>
                </b-container>
                </b-col>
                <b-col>
                    <b-form @submit.prevent="submitAd">
                    <b-container>
                        <b-row>
                            <b-col>
                            <h3><u>Main info</u></h3>
                            <br>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col cols="6">
                            <b-form-group label-cols-lg="4" label-size="sm"  label="Choose a car:" >
                                    <b-form-select @change="chooseCar()" v-model="car" size="sm">
                                        <template v-slot:first>
                                            <b-form-select-option selected :value="null">New car</b-form-select-option>
                                        </template>
                                        <option v-for="(carSelected,index) in cars"
                                            :key="index"
                                            :value="carSelected">
                                            {{carSelected.carModel.carBrand.name}} {{carSelected.carModel.name}}
                                    </option>
                                    </b-form-select>
                                </b-form-group>
                            </b-col>
                            <b-col>
                                <b-form-group  label-cols-lg="5" label-size="sm" label="Location:" >
                                     <b-input-group  size="sm">
                                        <b-form-input required  type="text" size="sm" placeholder="Enter a location" v-model="ad.location"></b-form-input>
                                    </b-input-group>
                                </b-form-group>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col>
                                <b-form-group label-cols="1" label-cols-lg="3" label-size="sm" label="Brand:" >
                                <b-form-input label-cols="1" size="sm" v-model="ad.model.carBrand.name" disabled></b-form-input>
                                </b-form-group>
                            </b-col>
                            <b-col>
                             
                                 <b-form-group :disabled="carChosen" label-cols-lg="5" label-size="sm"  label="Model:" >
                                    <b-form-select required v-model="ad.model" size="sm">
                                        <option v-for="(carModel,index) in carModels"
                                            :key="index"
                                            :value="carModel">
                                            {{carModel.name}}
                                    </option>
                                    </b-form-select>
                                </b-form-group>
                            </b-col>
                            <b-col>
                                <b-form-group :disabled="carChosen" label-cols-lg="3" label-size="sm" label="Class:" >
                                    <b-form-select required v-model="ad.class" :options="classes" size="sm"></b-form-select>
                                </b-form-group>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col>
                            <h3><u>Technical info</u></h3>
                            <br>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col>
                                <b-form-group label-cols-lg="5" label-size="sm"  label="Feul type:" >
                                    <b-form-select required :disabled="carChosen" v-model="ad.fuelType" :options="fuelType" size="sm"></b-form-select>
                                </b-form-group>
                            </b-col>
                            <b-col>
                                <b-form-group label-cols-lg="5" label-size="sm" label="Gear type:" >
                                 <b-form-select required :disabled="carChosen" v-model="ad.gearType" :options="gearTypes" size="sm"></b-form-select>
                                </b-form-group>
                            </b-col>
                        </b-row>
                         <b-row>
                            <b-col>
                                 <b-form-group  label-cols-lg="5" label-size="sm" label="Kilometers driven:" >
                                     <b-input-group  size="sm" append="km">
                                        <b-form-input required  :disabled="carChosen" type="number" min="0" size="sm" placeholder="Number of kilometers" v-model="ad.kmDriven"></b-form-input>
                                    </b-input-group>
                                </b-form-group>
                            </b-col>
                             <b-col>
                                <b-form-group label-cols-lg="5" label-size="sm" label="Seats for children:" >
                                <b-form-input required :disabled="carChosen" type="number" min="0" size="sm" placeholder="Number of seats" v-model="ad.seatsChildren"></b-form-input>
                                </b-form-group>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col>
                            <h3><u>Rental info</u></h3>
                            <br>
                            </b-col>
                        </b-row>
                        <b-row>
                        <b-col>
                            <b-form-group label-cols-lg="5" label-size="sm"  label="Rentable from:" >
                            <b-form-datepicker required size="sm" :min="minDate" locale="en" placeholder="Start date"  v-model="ad.minDate"></b-form-datepicker>
                            </b-form-group>
                        </b-col>
                        <b-col>
                            <b-form-group label-cols-lg="5" label-size="sm" label="to:" >
                            <b-form-datepicker required size="sm" :min="minDate" locale="en" placeholder="End date" v-model="ad.maxDate"></b-form-datepicker>
                            </b-form-group>
                        </b-col>
                        </b-row>
                          <b-row>
                            <b-col>
                                <b-form-group label-cols-lg="5" label-size="sm" label="Kilometer limit:" >
                                <b-form-input type="number" min="0" size="sm" placeholder="Unlimiterd" v-model="ad.limitKm"></b-form-input>
                                </b-form-group>
                            </b-col>
                               <b-col>
                                <b-form-checkbox 
                                    v-model="ad.colision"
                                    size="2sm"
                                    value="accepted"
                                    unchecked-value="not_accepted"
                                    >Collision Damage Waiver
                                </b-form-checkbox>
                                
                            </b-col>
                          </b-row>
                          <b-row>
                            <b-col>
                                <b-form-checkbox 
                                    id="checkbox-1"
                                    v-model="ad.androidApp"
                                    name="checkbox-1"
                                    value="accepted"
                                    unchecked-value="not_accepted"
                                    >Android app present in the vehicle
                                </b-form-checkbox>
                            </b-col>
                        </b-row>
                        <b-row>
                            <br/>
                        </b-row>
                        <b-row >
                            <b-col>
                            <h3><u>Pricing</u></h3>
                            <br>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col>
                            </b-col>
                            <b-col cols ="6">
                                <b-form-group  label-cols-lg="4" label-size="sm"  label="Pricing list:" >
                                    <b-form-select required v-model="pricingListSelected" size="sm">
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
                            <b-col>
                            </b-col>
                        </b-row>
                        <b-row >
                            <b-col>
                                <b-form-group label-cols="1" label-cols-lg="5" label-size="sm" label="Price per km:" >
                                    <b-input-group size="sm" append="€">
                                    <b-form-input label-cols="1" size="sm" v-model="pricingListSelected.pricePerKm" disabled></b-form-input>
                                    </b-input-group>
                                </b-form-group>
                            </b-col>
                           <b-col>
                                <b-form-group label-cols="1" label-cols-lg="5" label-size="sm" label="Price per day:" >
                                    <b-input-group size="sm" append="€">
                                    <b-form-input label-cols="1" size="sm" v-model="pricingListSelected.pricePerDay" disabled></b-form-input>
                                    </b-input-group>
                                </b-form-group>
                            </b-col>
                        </b-row>
                         <b-row >
                            <b-col>
                                <b-form-group label-cols="1" label-cols-lg="5" label-size="sm" label="Discount 20 days:" >
                                <b-input-group size="sm" append="%">
                                    <b-form-input label-cols="1" size="sm" v-model="pricingListSelected.discount20Days" disabled></b-form-input>
                                </b-input-group>
                                </b-form-group>
                            </b-col>
                           <b-col>
                                <b-form-group label-cols="1" label-cols-lg="5" label-size="sm" label="Discount 30 days:" >
                                    <b-input-group size="sm" append="%">
                                    <b-form-input label-cols="1" size="sm" v-model="pricingListSelected.discount30Days" disabled></b-form-input>
                                    </b-input-group>
                                </b-form-group>
                            </b-col>
                        </b-row>
                         <b-row>
                             <b-col>
                                <b-form-group label-cols="1" label-cols-lg="5" label-size="sm" label="Cdw price:" >
                                    <b-input-group  size="sm" append="€">
                                    <b-form-input label-cols="1" size="sm" v-model="pricingListSelected.priceForCdw" disabled></b-form-input>
                                    </b-input-group>
                                </b-form-group>
                            </b-col>
                            <b-col>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col>
                                <b-button type="submit" size="lg">
                                    Submit
                                </b-button>
                            </b-col>
                        </b-row>
                        
                     </b-container>
                    </b-form>
                </b-col>
            </b-row>
        </b-container>        
    </b-card>
    </div>
</template>

<script>

import NavBar from '../components/NavBar.vue';
import axios from "axios";
const baseUrl = "http://localhost:8086/api";
export default {
    name: 'NewAd',
    components: {
        NavBar
    },
    data(){
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const minD = new Date(today);
        return{
             minDate: minD,
             selectedGear: null,
             selectedFeul: null,
             selectedClass: null,
             gearTypes:[
                { value: null, text: 'Choose the gear' },
                { value: 'Manuel', text: 'Manual' },
                { value: 'Automatic', text: 'Automatic' },
                { value: 'Semi_automatic', text: 'Semi-automatic' }
             ],
             fuelType:[
                 { value: null, text: 'Choose the feul' },
                 { value: 'Gas', text: 'Gasoline' },
                 { value: 'Diesel', text: 'Diesel' },
                 { value: 'Hybrid', text: 'Hybrid' },
                 { value: 'Petrol', text: 'Petrol' },
                 { value: 'Electric', text: 'Electric' },
             ],
             classes: [
                { value: null, text: 'Choose the class' },
                 { value: 'Suv', text: 'Sport utility vehicle' },
                 { value: 'Old_timer', text: 'Old timer' },
                 { value: 'Saloon', text: 'Saloon' },
                 { value: 'Station_vagon', text: 'Station vagon' },
                 { value: 'Sport_car', text: 'Sport car' },
                 { value: 'Van', text: 'Van' },
                 { value: 'Coupe', text: 'Coupe' }
             ],
             image: "https://via.placeholder.com/200",
             images:[],
             currentImage:0,
             ad:{
                brand:{},
                model:{
                    carBrand:{}
                },
                class:null,
                fuelType:null,
                gearType:null,
                seatsChildren:0,
                kmDriven:0,
                colision:"not_accepted",
                minDate:null,
                maxDate:null,
                minPrice:null,
                androidApp:"not_accepted",
                location:null,
                limitKm:0
             },
             carModels:[],
             carId:null,
             priceLists:[],
             pricingListSelected:{},
             cars:[],
             car:null,
             carChosen:false

             
        }
    },
    methods:{
        getImage(e){
            let image = e.target.files[0];
            let reader = new FileReader();
            image.width='200px';
            image.height="200px";
            reader.readAsDataURL(image);
            reader.onload = e => {
                this.image= e.target.result
                this.images.push(this.image)
            }
            reader.onloadend = () => this.changeToLastSlide();
            
        },
        changeToLastSlide(){
            console.log(this.images.length-1)
            this.currentImage=this.images.length-1;
            this.$refs.imageCarousel.setSlide(this.images.length-1);
        },
        removeImage(){
            this.images.splice(this.currentImage,1);
            this.currentImage=this.currentImage-1;
        },
        submitAd(){
            var cdwBool = false;
            var appBool =false;
            if(this.ad.colision === 'accepted'){
                cdwBool = true;
            }
             if(this.ad.androidApp === 'accepted'){
                appBool = true;
            }
            axios.post(baseUrl+'/ad',{
                startDate: this.ad.minDate,
                endDate: this.ad.maxDate,
                limitKm: this.ad.limitKm,
                cdw: cdwBool,
                priceList:this.pricingListSelected,
                location:this.ad.location, 
                car:{
                    id:this.carId,
                    childrenSeats:this.ad.seatsChildren,
                    mileage:this.ad.kmDriven,
                    carModel: this.ad.model,
                    carClass: this.ad.class,
                    transType: this.ad.gearType,
                    fuelType: this.ad.fuelType,
                    hasAndroidApp: appBool,
                    photos64: this.images


                }
            })
            .then(response => {
                this.selectedFeul=response;
                this.$bvToast.toast('Ad posted for '+this.ad.model.carBrand.name + ' '+this.ad.model.name, {
                title: `Succesfuly posted ad`,
                variant: 'success',
                solid: true
                });
                if(this.ad.androidApp == 'accepted'){
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
                this.ad.model = {
                    carBrand:{}
                }
                this.ad.class = null;
                
                this.ad.fuelType=null;
                this.ad.gearType = null;
                this.ad.seatsChildren = 0;
                this.carId = null;
                this.ad.kmDriven = 0;
                this.ad.colision = "not_accepted";
                this.ad.location = null;
                this.images=[];
                this.carChosen=false;
                
            }else{
                this.ad.model = this.car.carModel;
                this.ad.class = this.car.carClass;
                
                this.ad.fuelType=this.car.fuelType;
                this.ad.gearType = this.car.transType;
                this.ad.seatsChildren = this.car.childrenSeats
                this.carId = this.car.id;
                this.ad.kmDriven = this.car.mileage;

                if(this.car.cdw == true){
                    this.ad.colision = "accepted"
                }else{
                    this.ad.colision = "not_accepted"
                }
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
            this.ad.model = {
                    carBrand:{}
                }
            this.ad.class= null;
            this.ad.fuelType = null;
            this.ad.gearType = null;
            this.ad.seatsChildren = 0;
            this.ad.kmDriven = 0;
            this.ad.colision="not_accepted";
            this.ad.minDate=null;
            this.ad.maxDate=null;
            this.ad.minPrice=null;
            this.ad.androidApp="not_accepted";
            this.pricingListSelected={};
            this.carChosen=false;
            this.ad.location = null;
            this.images= [];
            axios.get(baseUrl+'/car')
            .then(response => {
                this.cars = response.data;
            });
                
        }
        
    },
    mounted(){
        axios.get(baseUrl+'/carModel')
        .then(response => {
            this.carModels = response.data;
        });
        axios.get(baseUrl+'/priceList')
        .then(response => {
            this.priceLists = response.data;
        });
        axios.get(baseUrl+'/car')
        .then(response => {
            this.cars = response.data;
        });
    },
}
</script>

<style>
.image {
    cursor: pointer;
}
</style>