<template>
  <div>
    <NavBar />
    <div class="container style-chat">
       <b-card class="mb-3" style="height:98%;">
        <template v-slot:header>
          <h5 class="mb-0">Chat</h5>
        </template>
        <b-card-text style="height:90%;">
            <div class="div-messages" v-chat-scroll>
            <div class="container style-message-box" v-for="m in messages" :key="m.id">
            <div v-if="$store.getters.currentUserId != m.fromUserId" class="container style-message-left">
                <p class="font-weight-bold p-message">{{m.fromUserInfo}}</p>
                <p class="p-message">{{m.content}}</p>
                <p class="p-message-time">{{format_date(m.dateTime)}}</p>
            </div>
            <div v-if="$store.getters.currentUserId == m.fromUserId" class="container style-message-right">
                <p class="font-weight-bold p-message">{{m.fromUserInfo}} - Me</p>
                <p class="p-message">{{m.content}}</p>
                <p class="p-message-time">{{format_date(m.dateTime)}}</p>
            </div>
            </div> 
            </div>
            <div class="container div-textarea">   
            <b-form @submit.prevent="sendMessage()"> 
            <b-row>
            <b-col cols="10">         
            <b-form-group  align="left">
              <b-form-textarea id="message" placeholder="Send a message..." rows="2" no-resize v-model="message"></b-form-textarea>               
            </b-form-group>
            </b-col>
            <b-col cols="2"  style="padding-top:0.5em;">
            <b-button variant="success" id="element" class="buttons" type="submit" :disabled="!formValid">Send</b-button>
            </b-col>
            </b-row>
            </b-form>
            </div>
        </b-card-text>
       </b-card>    
    </div>    


  </div>
</template>

<script>
    import NavBar from "../components/NavBar.vue";
    import axios from "axios";
    import moment from 'moment';
    


export default {
    name: "Chat",
    components: {
    NavBar
  },
    data() {
        return {
            messages: [],
            message: "",
            requestID: "",
        }

    },
    created() {     
      this.getMessages();                    
    },
    methods: {

        getMessages(){

            this.requestID = this.$route.params.id;
            console.log(this.requestID);
            axios.get("http://localhost:8083/rent-service/api/message/request/" + this.requestID).then(
                response => {
                    this.messages = response.data;
                }
            ).catch(error => {
                console.log(error.response);
            })

        },
        sendMessage(){
            if(this.message.trim() == ""){
                this.$bvToast.toast("Message cannot be empty.", {
                      title: "Error",
                      variant: "danger",
                      solid: true
                    });
                return;    
            }
            let messageRequest = {"requestId": this.requestID, "content":this.message};
            console.log(messageRequest);
            axios.post("http://localhost:8083/rent-service/api/message", messageRequest).then(
                response => {
                    console.log(response.data);
                    this.message = "";
                    this.getMessages();
                }
            ).catch(error => {
                if(error.response.status === 500){
                this.$bvToast.toast("Server error. Please try again.", {
                      title: "Error",
                      variant: "danger",
                      solid: true
                    });
            }else{
                this.$bvToast.toast(error.response.data, {
                      title: "Error",
                      variant: "danger",
                      solid: true
                    });
            }
            })

        },
        format_date(value){
         if (value) {
           return moment(String(value)).format("DD/MM/YYYY HH:mm:ss")
          }
      },
   },
    computed: {
        formValid: function(){
            if(this.message.trim() == ""){
                return false;
            }else{
                return true;
            }
        }
    }
}
</script>

<style scoped>
   .style-chat {
        margin-top:2em;
        width: 70%;
        height:85vh;
    }
   .style-message-box {
       margin-top:0.3em;
       margin-bottom: 0.3em;
       padding:0;
       width: 100%;
       position: relative;
   } 
   .style-message-left {
       width:60%;
       border-radius: 25px;
       background-color: rgb(159, 199, 236);
       margin-left: 0;     
   }
   .style-message-right {
       width:60%;
       border-radius: 25px;
       background-color: rgb(118, 207, 118);
       margin-right: 0;     
   }
   .buttons{
       width: 7em;
       margin-right: 1em;
       border-radius: 25px;
   }

   .p-message{
       margin:0;
   }

   .p-message-time{
       text-align:right;
       font-size: 14px;
   }

   #message {
      border-radius: 25px;
   }

   .div-messages{
       height:87%;
       overflow-y:auto;
       margin-bottom:2em;
       margin-top:0;
   }

   .div-textarea{
       height:20%;
       padding-top:0.8em;
       margin-top:0;
   }

</style>