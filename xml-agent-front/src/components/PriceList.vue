<template>
  <div>
      <NavBar/>
      <b-card no-body class="overflow-hidden shadow mb-1 mt-3 mx-5" header-bg-variant="warning">
          <template v-slot:header>
            <h2 class="sm-0 text-center"> Manage Your Price Lists </h2>
          </template>
      </b-card>
      <div class="mx-5 my-4">
        <b-tabs content-class="mt-3" >
          <b-tab title="My Price Lists" active :title-link-class="linkClass()">
            <div class="container">
              <b-table striped outlined hover fixed head-variant="dark" :items="items" :fields="fields">
                <template v-slot:cell(delete)="row">
                  <b-button size="sm" variant="outline-danger" @click="deletePriceList(row.item.id)"> Delete Price List </b-button>
                </template>
              </b-table>
            </div>

          </b-tab>
          <b-tab title="New Price List" :title-link-class="linkClass()">
             
            <div class="text-center">
              <h3 class="dark-grey-text">
                <strong>Make New Price List</strong>
              </h3>
            </div>
            <div class="container" style="width:30em">    
              <b-form class="my-3" @submit.prevent="createPriceList()">   
                <b-form-group label="Alias:" >
                    <b-input-group  >
                        <b-form-input required  type="text" v-model="alias" placeholder="Price List"></b-form-input>
                    </b-input-group>
                </b-form-group>

                <b-form-group label="Price per km:" >
                    <b-input-group  append="€">
                        <b-form-input required  type="number" v-model="pricePerKm" placeholder="0"></b-form-input>
                    </b-input-group>
                </b-form-group>
                      
                <b-form-group  label="Price per day:" >
                    <b-input-group  append="€">
                        <b-form-input required  type="number" v-model="pricePerDay" placeholder="0"></b-form-input>
                    </b-input-group>
                </b-form-group>

                <b-form-group  label="Price for cdw:" >
                    <b-input-group  append="€">
                        <b-form-input required  type="number" v-model="priceForCdw" placeholder="0"></b-form-input>
                    </b-input-group>
                </b-form-group>
                           
                <b-form-group  label="Discount 20 days:" >
                    <b-input-group  append="%">
                        <b-form-input required  type="number" :min="0" v-model="discount20Days" placeholder="0"></b-form-input>
                    </b-input-group>
                </b-form-group>
                        
                <b-form-group label="Discount 30 days:" >
                    <b-input-group  append="%">
                        <b-form-input required  type="number" :min="0" v-model="discount30Days" placeholder="0"></b-form-input>
                    </b-input-group>
                </b-form-group>
                <b-row>
                    <b-button type="submit" class="mx-auto" style="width:15em">Create</b-button> 
                </b-row>       
              </b-form>
                
            </div>

              
          </b-tab>
        </b-tabs>
</div>
  </div>
</template>

<script>

import NavBar from "../components/NavBar.vue";
import axios from "axios";

const baseUrl = "http://localhost:8086/api";

export default {
    name: 'PriceList',
    components: {
        NavBar
    },
    data(){
        return {
           fields: [
            "alias",
            "pricePerDay",
            "pricePerKm",
            "priceForCdw",
            "discount20Days",
            "discount30Days",
            "delete"
          ],
          items: [],
          pricePerDay: null,
          pricePerKm: null,
          priceForCdw: null,
          discount20Days: 0,
          discount30Days: 0,
          alias: "",
        }
    },
     methods: {

      linkClass() {
        return ['bg-secondary', 'text-light']
      },

      deletePriceList(id){ 
          axios.delete(baseUrl + "/priceLists/"+id).then(
              () => {
                this.$bvToast.toast('Price List Deleted ', {
                    title: 'Success',
                    variant: 'success',
                    solid: true
                });   
                this.getPriceLists();                    
          })
        .catch(error => {
          if (error.response) {
              this.$bvToast.toast(error.response.data, {
                title: 'Can\'t be deleted ',
                variant: 'danger',
                solid: true
                });
          }       
          });
      },

      getPriceLists()
      { 
        axios.get(baseUrl + "/priceLists").then(response => {
            this.items = response.data;
        });
      },
      
      createPriceList()
      {
        let msg = "";
          let valid = true;
          if(this.alias.trim() === "" && this.alias.length>0){
              msg += "Alias can't have only white spaces. ";
              valid = false;
          }
          
          if(this.pricePerDay <= 0 || this.pricePerKm <= 0 || this.priceForCdw <= 0){
              msg += "Prices have to be grater than 0.";
              valid = false;
          }
          if(!valid){
             this.$bvToast.toast(msg, {
                        title: 'Invalid input values',
                        variant: 'danger',
                        solid: true
                        });
             return;
          }   

          axios.post(baseUrl+'/priceLists',{
                "alias": this.alias,
                "pricePerDay": this.pricePerDay,
                "pricePerKm": this.pricePerKm,
                "priceForCdw": this.priceForCdw,
                "discount20Days": this.discount20Days,
                "discount30Days":this.discount30Days,
            })
           .then((response) => {
                console.log(response.data);
                this.$bvToast.toast('New Price List Created ', {
                    title: 'Success',
                    variant: 'success',
                    solid: true
                }); 
                this.refreshForm();   
                this.getPriceLists();                    
          })
          .catch(error => {
          if (error.response) {
              this.$bvToast.toast(error.response.data, {
                title: 'Error',
                variant: 'danger',
                solid: true
                });
          }       
          });
      },
      refreshForm()
      {
        this.alias = "";
        this.pricePerDay = null;
        this.pricePerKm = null;
        this.priceForCdw = null;
        this.discount20Days = 0;
        this.discount30Days= 0;       
      },
      

    },
    created()
    {    
       this.getPriceLists();
    },
}
</script>

<style scoped>

.container{
    margin-left: auto;
    margin-right: auto;
}

</style>