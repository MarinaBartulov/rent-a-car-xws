<template>
    <div align="center">
    <NavBar/>
    <br/>
    <h1 style="font-size:3em" align="Center">Statistics</h1>
    <br/>
    <div  v-if="load()" align="center">
      <br/>
      <br/>
     <b-spinner style="width: 5rem; height: 5rem;" label="Large Spinner"></b-spinner>
    </div>
    <br/>
    <div v-if="!load()">
    <div v-if="showEmpty()">
      <h1 style="color:red">You don't have any cars yet!</h1>
    </div>
     <b-card-group v-if="!showEmpty()" style="margin:20px" deck>
    <b-card header-bg-variant="dark"  header-text-variant="white" :title="carTitle(kmDrivenCar.carBrand,kmDrivenCar.carModel)">
        <template bg-variant="warning" v-slot:header>
            <h2 class="mb-0">Most kilometers driven</h2>
            <br/>
            <h3>{{kmDrivenCar.mileage}} km</h3>
        </template> 
        <b-carousel style="width:300px; height:250px"  ref="imageCarousel" v-model="currentImage" controls interval=100000>
            <b-carousel-slide style="width:300px; height:250px"  v-for="img in kmDrivenCar.photos64" :key="img" :img-src="img">
            </b-carousel-slide>
        </b-carousel>
      <b-container style="font-size: 20px">
          <b-row>
              <b-col>
                  Class: 
              </b-col>
              <b-col>
                  {{kmDrivenCar.carClass}}
              </b-col>
          </b-row>
          <b-row>
              <b-col>
                  Feul Type: 
              </b-col>
              <b-col>
                  {{kmDrivenCar.fuelType}}
              </b-col>
          </b-row>
          <b-row>
              <b-col>
                  Gear Type: 
              </b-col>
              <b-col>
                  {{kmDrivenCar.transType}}
              </b-col>
          </b-row>
            <b-row>
              <b-col>
                  Driven:
              </b-col>
              <b-col>
                  {{kmDrivenCar.mileage}} km
              </b-col>
          </b-row>
          <b-row>
              <b-col>
                  Comments:
              </b-col>
              <b-col>
                  {{kmDrivenCar.numberOfComments}}
              </b-col>
          </b-row>
          <b-row>
              <b-col>
                  <b-icon icon="star-fill"></b-icon> 
              </b-col>
              <b-col>
                  {{kmDrivenCar.rate}}
              </b-col>
          </b-row>
      </b-container>
    </b-card>

    <b-card  header-bg-variant="dark"  header-text-variant="white" :title="carTitle(kmDrivenCar.carBrand,kmDrivenCar.carModel)" img-top>
        <template v-slot:header>
            <h2 class="mb-0">Most comments</h2>
            <br/>
            <h3>{{mostCommentsCar.numberOfComments}} comments</h3>
        </template>  
        <b-carousel style="width:300px; height:250px" ref="imageCarousel" v-model="currentImage" controls interval=100000>
            <b-carousel-slide style="width:300px; height:250px" v-for="img in mostCommentsCar.photos64" :key="img" :img-src="img">
            </b-carousel-slide>
        </b-carousel>
      <b-container style="font-size: 20px">
          <b-row>
              <b-col>
                  Class: 
              </b-col>
              <b-col>
                  {{mostCommentsCar.carClass}}
              </b-col>
          </b-row>
          <b-row>
              <b-col>
                  Feul Type: 
              </b-col>
              <b-col>
                  {{mostCommentsCar.fuelType}}
              </b-col>
          </b-row>
          <b-row>
              <b-col>
                  Gear Type: 
              </b-col>
              <b-col>
                  {{mostCommentsCar.transType}}
              </b-col>
          </b-row>
          <b-row>
              <b-col>
                  Driven:
              </b-col>
              <b-col>
                  {{mostCommentsCar.mileage}} km
              </b-col>
          </b-row>
          <b-row>
              <b-col>
                  Comments:
              </b-col>
              <b-col>
                  {{mostCommentsCar.numberOfComments}}
              </b-col>
          </b-row>
          <b-row>
              <b-col>
                  <b-icon icon="star-fill"></b-icon> 
              </b-col>
              <b-col>
                  {{mostCommentsCar.rate}}
              </b-col>
          </b-row>
      </b-container>
    </b-card>

    <b-card  header-bg-variant="dark"  header-text-variant="white" :title="carTitle(kmDrivenCar.carBrand,kmDrivenCar.carModel)" img-top>
    <template v-slot:header>
            <h2 class="mb-0">Best score</h2>
            <br/>
            <h3><b-icon icon="star-fill"></b-icon> {{bestScoreCar.rate}}</h3>
        </template>  
       <b-carousel style="width:300px; height:250px"  ref="imageCarousel" v-model="currentImage" controls interval=100000>
            <b-carousel-slide style="width:300px; height:250px"  v-for="img in bestScoreCar.photos64" :key="img" :img-src="img">
            </b-carousel-slide>
        </b-carousel>
      <b-container style="font-size: 20px">
          <b-row>
              <b-col>
                  Class: 
              </b-col>
              <b-col>
                  {{bestScoreCar.carClass}}
              </b-col>
          </b-row>
          <b-row>
              <b-col>
                  Feul Type: 
              </b-col>
              <b-col>
                  {{bestScoreCar.fuelType}}
              </b-col>
          </b-row>
          <b-row>
              <b-col>
                  Gear Type: 
              </b-col>
              <b-col>
                  {{bestScoreCar.transType}}
              </b-col>
          </b-row>
          <b-row>
              <b-col>
                  Driven:
              </b-col>
              <b-col>
                  {{bestScoreCar.mileage}} km
              </b-col>
          </b-row>
          <b-row>
              <b-col>
                  Comments:
              </b-col>
              <b-col>
                  {{bestScoreCar.numberOfComments}}
              </b-col>
          </b-row>
          <b-row>
              <b-col>
                  <b-icon icon="star-fill"></b-icon> 
              </b-col>
              <b-col>
                  {{bestScoreCar.rate}}
              </b-col>
          </b-row>
      </b-container>
    </b-card>
  </b-card-group>
    </div>
    </div>
</template>
<script>

import NavBar from '../components/NavBar.vue'
import axios from "axios";
const baseUrl = "http://localhost:8083/car-service/api";
export default {
    name: 'Statistic',
    components: {
        NavBar
    },
    data(){
        return{
            kmDrivenCar:{
                photos64:['https://images3.polovniautomobili.tv/user-images/thumbs/1358/13586411/1e33091352d0-800x600.jpg'],
                model:{
                    carBrand:{}
                },
                carClass:{},
                fuelType:'Diesel',
                transType:'Automatic',
                childrenSeats:0,
                mileage:50000,
                numberOfComments:10,
             },
             mostCommentsCar:{
                photos64:['https://images3.polovniautomobili.tv/user-images/thumbs/1358/13586411/1e33091352d0-800x600.jpg'],
                model:{
                    carBrand:{}
                },
                carClass:{},
                fuelType:'Diesel',
                transType:'Automatic',
                childrenSeats:0,
                mileage:50000,
                numberOfComments:10,
             },
             bestScoreCar:{
                photos64:['https://images3.polovniautomobili.tv/user-images/thumbs/1358/13586411/1e33091352d0-800x600.jpg'],
                model:{
                    carBrand:{}
                },
                carClass:{},
                fuelType:'Diesel',
                transType:'Automatic',
                childrenSeats:0,
                mileage:50000,
                numberOfComments:10,

             },
             info: null,
             returnedCar1:false,
             returnedCar2:false,
             returnedCar3:false
        }
    },
    methods:{
        carTitle(brand,model){
            return brand+" "+model
        },
          showEmpty(){
            if(this.kmDrivenCar.rate == undefined || this.mostCommentsCar.rate == undefined || this.bestScoreCar.rate == undefined)
            {
                return true;
            }
        return false;
        },
        load(){
            return !(this.returnedCar1 && this.returnedCar2 && this.returnedCar3);
        }
    },
    mounted(){
        axios.get(baseUrl+'/car/user/bestScore')
        .then(response => {
            this.bestScoreCar = response.data;
            this.returnedCar1=true;
        })
        .catch(error =>{
            this.info = error;
            this.returnedCar1=true;
        })
        axios.get(baseUrl+'/car/user/mostComments')
        .then(response => {
            this.mostCommentsCar = response.data;
            this.returnedCar2=true;

        })
        .catch(error =>{
            this.info = error;
            this.returnedCar2=true;
        })
        axios.get(baseUrl+'/car/user/mostKilometers')
        .then(response => {
            this.kmDrivenCar = response.data;
            this.returnedCar3=true;
        })
        .catch(error =>{
            this.info = error;
            this.returnedCar3=true;
        })
    }
}
</script>