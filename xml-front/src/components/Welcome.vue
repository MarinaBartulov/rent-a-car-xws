<template>
    <div id="div">
      <NavBar/>
    <div>
    <b-carousel
     id="carousel-1"
      v-model="slide"
      :interval="5000"
      controls
      indicators
      background="#ababab"
      style="text-shadow: 1px 1px 2px #333;"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"    
    >

      <!--img-src="https://i.sozcu.com.tr/wp-content/uploads/2017/10/scrrr.jpg"-->
      <b-carousel-slide
        caption="Welcome to Rent-a-Car Novi Sad"
        :img-src="require('@/assets/welcome1.jpg')"
      ></b-carousel-slide>

       <!--img-src="https://images.pexels.com/photos/170286/pexels-photo-170286.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"-->
      <b-carousel-slide
        caption="Here you can find a car that fits your needs"
        text= "Start your search here"
        :img-src="require('@/assets/welcome2.jpeg')">
       <b-button pill variant="secondary" href="/home" style="width: 13em;">Search</b-button>
      
      </b-carousel-slide>

        <!--img-src="https://images.pexels.com/photos/1073031/pexels-photo-1073031.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"-->
        <b-carousel-slide
        caption="Or you can make an ad for renting your car"
        text = "If you are new here, register for free, if not, log in to your account"
        :img-src="require('@/assets/welcome3.jpeg')">
        <b-button href="/registration" pill variant="secondary" style="width: 13em; margin: 1em">Register </b-button>
        <b-button href="/login" pill variant="secondary" style="width: 13em; margin: 1em">Log in </b-button>
      </b-carousel-slide>   
    </b-carousel> 
    </div>     
  </div>

</template>

<script>
import NavBar from "../components/NavBar.vue";

export default {
    name: "Welcome",
    components: {
       NavBar
    },
    data() {
      return {
        slide: 0,
        sliding: null,
        numberOfNewRequests: 2,
      }
    },
    methods: {
      onSlideStart() {
        this.sliding = true
      },
      onSlideEnd() {
        this.sliding = false
      },
        
    },

    computed: {
 
    }
    
    
  
};
</script>

<style scoped>
    
</style>