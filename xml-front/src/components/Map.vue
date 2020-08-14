<template>
  <div>
      <NavBar/>
      <h2 style="margin-top:0.5em;">Here is your car's location:</h2>
      <h3 v-if="!carBeingUsed" style="text-align:center;color:red;">Your car is not being used at the moment.</h3>
      <google-map v-if="carBeingUsed"
      :center="{lat:45.1111,lng:19.8335}"
      :zoom="9"
      style="width:70%; height:70vh; margin:1em auto">
      <google-marker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        :clickable="true"
        :draggable="false"
        @click="center=m.position"
        />
      </google-map>

  </div>
</template>

<script>
import NavBar from "../components/NavBar.vue";
import SockJS from "sockjs-client";
import Stomp from "webstomp-client";
export default {
    name: 'Map',
    components: {
        NavBar
    },
     data(){
        return {
            carBeingUsed: true,
            connected: false,
            isCustomSocketOpened: false,
            androidToken: '',
            markersData: [
                {position: {lat: 45.245581, lng: 19.879947}},  
                {position: {lat: 45.228618, lng: 19.895053}},
                {position: {lat: 45.211076, lng: 19.919550}},
                {position: {lat: 45.193527, lng: 19.950988}},
                {position: {lat: 45.163308, lng: 19.957112}},
                {position: {lat: 45.138546, lng: 19.986100}},
                {position: {lat: 45.110315, lng: 20.026112}},
                {position: {lat: 45.077169, lng: 20.050609}}, 
                {position: {lat: 45.040183, lng: 20.089130}},
                {position: {lat: 45.014789, lng: 20.121175}},
                {position: {lat: 44.979082, lng: 20.163416}},
                {position: {lat: 44.959502, lng: 20.194976}},
                {position: {lat: 44.938884, lng: 20.227506}},
                {position: {lat: 44.924791, lng: 20.246928}},
                {position: {lat: 44.901754, lng: 20.284314}},
                {position: {lat: 44.883180, lng: 20.323156}},
                {position: {lat: 44.866664, lng: 20.361999}},
                {position: {lat: 44.840850, lng: 20.366369}},
                {position: {lat: 44.828454, lng: 20.385790}},
                {position: {lat: 44.816401, lng: 20.411523}},
                ],
            markers:[],    
        }
     },
     created(){
            /*setTimeout(function() {  
            this.markers = [this.markersData[0]];
            setTimeout(function() {   
                    this.markers = [this.markersData[1]];  
                    setTimeout(function() {   
                    this.markers = [this.markersData[2]];
                    setTimeout(function() {   
                    this.markers = [this.markersData[3]];  
                    setTimeout(function() {   
                    this.markers = [this.markersData[4]];    
                    setTimeout(function() {   
                    this.markers = [this.markersData[5]]; 
                    setTimeout(function() {   
                    this.markers = [this.markersData[6]];  
                    setTimeout(function() {   
                    this.markers = [this.markersData[7]];  
                    setTimeout(function() {   
                    this.markers = [this.markersData[8]]; 
                    setTimeout(function() {   
                    this.markers = [this.markersData[9]];    
                    setTimeout(function() {   
                    this.markers = [this.markersData[10]];  
                    setTimeout(function() {   
                    this.markers = [this.markersData[11]];  
                    setTimeout(function() {   
                    this.markers = [this.markersData[12]];   
                    setTimeout(function() {   
                    this.markers = [this.markersData[13]];  
                    setTimeout(function() {   
                    this.markers = [this.markersData[14]];
                    setTimeout(function() {   
                    this.markers = [this.markersData[15]];
                    setTimeout(function() {   
                    this.markers = [this.markersData[16]];    
                    setTimeout(function() {   
                    this.markers = [this.markersData[17]]; 
                    setTimeout(function() {   
                    this.markers = [this.markersData[18]];
                    setTimeout(function() {   
                    this.markers = [this.markersData[19]];                          
                }.bind(this), 3000)                          
                }.bind(this), 3000)                         
                }.bind(this), 3000)                      
                }.bind(this), 3000)                          
                }.bind(this), 3000)                          
                }.bind(this), 3000)                        
                }.bind(this), 3000)                        
                }.bind(this), 3000)                         
                }.bind(this), 3000)                         
                }.bind(this), 3000)                       
                }.bind(this), 3000)                          
                }.bind(this), 3000)                         
                }.bind(this), 3000)                        
                }.bind(this), 3000)                            
                }.bind(this), 3000)                       
                }.bind(this), 3000)                       
                }.bind(this), 3000)                          
                }.bind(this), 3000)                        
                }.bind(this), 3000)
            }.bind(this),3000)    */
            this.androidToken = this.$route.params.token;
            this.initializeWebSocketConnection();
                  
     },
     methods:{
        initializeWebSocketConnection() {
             let ws = new SockJS("http://localhost:8082/web-socket")
             this.stompClient = Stomp.over(ws); 
             let that = this;
             this.stompClient.connect({}, function () { 
                 that.connected = true; 
                 //that.openGlobalSocket()
                 that.openSocket()
             });
         },
        openGlobalSocket() { 
            if (this.connected) { 
                this.stompClient.subscribe("/socket-publisher", (message) => {
                    console.log(message.body);
                    let positionObj = {"position": JSON.parse(message.body)};
                    this.markers = [positionObj];
                    
                }); 
        }
       },
        openSocket() { //da bi stizale poruke koje su samo namenjene nama
            if (this.connected) {
            this.isCustomSocketOpened = true;
            // pretplata na topic /socket-publisher/specificni_user
            this.stompClient.subscribe("/socket-publisher/" + this.androidToken, (message) => {
                console.log(message.body);
                    let positionObj = {"position": JSON.parse(message.body)};
                    this.markers = [positionObj];
                
            });
            }
        }
    }  

     }
    
</script>

<style scoped>
  
</style>