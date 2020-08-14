<template>
  <div class="sub-work-div">
    <div class="col-xs-1 text-center">
      <b-button class="btn-types" @click="showCarBrand()">Car brand</b-button>
      <b-button class="btn-types" @click="showCarModel()">Car model</b-button>
      <b-button class="btn-types" @click="showCarClass()">Car class</b-button>
      <b-button class="btn-types" @click="showFuelType()">Fuel type</b-button>
      <b-button class="btn-types" @click="showTransmissionType()">Transmission type</b-button>
    </div>

    <!-- Car Brand -->
    <b-container v-if="showCarBrandB" style="margin-top:2em;width:90%;">
      <validation-observer ref="observer" v-slot="{ handleSubmit }">
        <b-form class="form-style" @submit.prevent="handleSubmit(addCarBrand)">
          <validation-provider
            name="Car brand"
            :rules="{ required: true, regex: /^[a-zA-Z0-9_ ]*$/ }"
            v-slot="validationContext"
          >
            <b-form-group label="Car brand:" label-for="carBrandID">
              <b-input
                id="carBrandID"
                v-model="carBrandName"
                type="text"
                :state="getValidationState(validationContext)"
                placeholder="Enter a new car brand"
              ></b-input>
              <b-form-invalid-feedback id="carBrandID">{{ validationContext.errors[0] }}</b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>
          <b-button variant="success" type="submit">Add</b-button>
        </b-form>
      </validation-observer>

      <b-table
        class="table-style"
        id="table-carBrands"
        striped
        hover
        bordered
        borderless
        :items="itemsCarBrands"
        :fields="fields_types"
      >
      <!--  <template v-slot:cell(edit)="row">
          <b-button size="sm" variant="outline-primary" @click="editName(row.item, 'carBrand')">Edit</b-button>
        </template> -->
        <template v-slot:cell(remove)="row">
          <b-button size="sm" variant="outline-danger" @click="removeCarBrand(row.item.id)">Remove</b-button>
        </template>
      </b-table>
    </b-container>

    <!-- Car model -->
    <b-container v-if="showCarModelB" style="margin-top:2em;width:90%;">
      <validation-observer ref="observer" v-slot="{ handleSubmit }">
        <b-form class="form-style" @submit.prevent="handleSubmit(addCarModel)">
          <validation-provider
            name="Car brand"
            :rules="{ required: true }"
            v-slot="validationContext"
          >
            <b-form-group label="Car brand:" label-for="carBrand-modelID">
              <b-form-select
                text="Car brand"
                v-model="carBrandChosen"
                :options="allCarBrands"
                :state="getValidationState(validationContext)"
                id="carBrandSelect"
              >
                <template v-slot:first>
                  <b-form-select-option :value="null">Select car brand</b-form-select-option>
                </template>
              </b-form-select>
              <b-form-invalid-feedback id="carBrandSelect">{{ validationContext.errors[0] }}</b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>
          <validation-provider
            name="Car model"
            :rules="{ required: true, regex: /^[a-zA-Z0-9_ ]*$/ }"
            v-slot="validationContext"
          >
            <b-form-group label="Car model:" label-for="carModelID">
              <b-input
                id="carModelID"
                v-model="carModelName"
                type="text"
                :state="getValidationState(validationContext)"
                placeholder="Enter a new car model"
              ></b-input>
              <b-form-invalid-feedback id="carModelID">{{ validationContext.errors[0] }}</b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>
          <b-button variant="success" type="submit">Add</b-button>
        </b-form>
      </validation-observer>

      <b-table
        class="table-style"
        id="table-carModels"
        striped
        hover
        bordered
        borderless
        :items="itemsCarModels"
        :fields="fields_types"
      >
     <!--   <template v-slot:cell(edit)="row">
          <b-button size="sm" variant="outline-primary" @click="editName(row.item, 'carModel')">Edit</b-button>
        </template> -->
        <template v-slot:cell(remove)="row">
          <b-button size="sm" variant="outline-danger" @click="removeCarModel(row.item.id)">Remove</b-button>
        </template>
      </b-table>
    </b-container>

    <!-- Car class -->
    <b-container v-if="showCarClassB" style="margin-top:2em;width:90%;">
      <validation-observer ref="observer" v-slot="{ handleSubmit }">
        <b-form class="form-style" @submit.prevent="handleSubmit(addCarClass)">
          <validation-provider
            name="Car class"
            :rules="{ required: true, regex: /^[a-zA-Z0-9_ ]*$/ }"
            v-slot="validationContext"
          >
            <b-form-group label="Car class:" label-for="carTypeID">
              <b-input
                id="carTypeID"
                v-model="carClassName"
                type="text"
                required
                placeholder="Enter a new car class"
                :state="getValidationState(validationContext)"
              ></b-input>
              <b-form-invalid-feedback id="carTypeID">{{ validationContext.errors[0] }}</b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>
          <b-button variant="success" type="submit">Add</b-button>
        </b-form>
      </validation-observer>

      <b-table
        class="table-style"
        id="table-carClasses"
        striped
        hover
        bordered
        borderless
        :items="itemsCarClasses"
        :fields="fields_types"
      >
      <!--  <template v-slot:cell(edit)="row">
          <b-button size="sm" variant="outline-primary" @click="editName(row.item, 'carClass')">Edit</b-button>
        </template> -->
        <template v-slot:cell(remove)="row">
          <b-button size="sm" variant="outline-danger" @click="removeCarClass(row.item.id)">Remove</b-button>
        </template>
      </b-table>
    </b-container>

    <!--Fuel type -->
    <b-container v-if="showFuelTypeB" style="margin-top:2em;width:90%;">
      <validation-observer ref="observer" v-slot="{ handleSubmit }">
        <b-form class="form-style" @submit.prevent="handleSubmit(addFuelType)">
          <validation-provider
            name="Fuel type"
            :rules="{ required: true, regex: /^[a-zA-Z0-9_ ]*$/ }"
            v-slot="validationContext"
          >
            <b-form-group label="Fuel type:" label-for="fuelTypeID">
              <b-input
                id="fuelTypeID"
                v-model="fuelTypeName"
                type="text"
                required
                placeholder="Enter a new fuel type"
                :state="getValidationState(validationContext)"
              ></b-input>
              <b-form-invalid-feedback id="fuelTypeID">{{ validationContext.errors[0] }}</b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>
          <b-button variant="success" type="submit">Add</b-button>
        </b-form>
      </validation-observer>

      <b-table
        class="table-style"
        id="table-fuelTypes"
        striped
        hover
        bordered
        borderless
        :items="itemsFuelTypes"
        :fields="fields_types"
      >
      <!--  <template v-slot:cell(edit)="row">
          <b-button size="sm" variant="outline-primary" @click="editName(row.item, 'fuelType')">Edit</b-button>
        </template> -->
        <template v-slot:cell(remove)="row">
          <b-button size="sm" variant="outline-danger" @click="removeFuelType(row.item.id)">Remove</b-button>
        </template>
      </b-table>
    </b-container>

    <!-- Transmission type -->
    <b-container v-if="showTransmissionTypeB" style="margin-top:2em;width:90%;">
      <validation-observer ref="observer" v-slot="{ handleSubmit }">
        <b-form class="form-style" @submit.prevent="handleSubmit(addTransmissionType)">
          <validation-provider
            name="Transmission type"
            :rules="{ required: true, regex: /^[a-zA-Z0-9_ ]*$/ }"
            v-slot="validationContext"
          >
            <b-form-group label="Transmission type:" label-for="transmissionTypeID">
              <b-input
                id="transmissionTypeID"
                v-model="transmissionTypeName"
                type="text"
                required
                placeholder="Enter a new transmission type"
                :state="getValidationState(validationContext)"
              ></b-input>
              <b-form-invalid-feedback id="transmissionTypeID">{{ validationContext.errors[0] }}</b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>
          <b-button variant="success" type="submit">Add</b-button>
        </b-form>
      </validation-observer>

      <b-table
        class="table-style"
        id="table-transminssionTypes"
        striped
        hover
        bordered
        borderless
        :items="itemsTransmissionTypes"
        :fields="fields_types"
      >
     <!--   <template v-slot:cell(edit)="row">
          <b-button
            size="sm"
            variant="outline-primary"
            @click="editName(row.item, 'transmissionType')"
          >Edit</b-button>
        </template> -->
        <template v-slot:cell(remove)="row">
          <b-button
            size="sm"
            variant="outline-danger"
            @click="removeTransmissionType(row.item.id)"
          >Remove</b-button>
        </template>
      </b-table>
    </b-container>
  <!--  <b-modal
      id="modal-edit"
      ref="modal-edit"
      centered
      title="Name update"
      :header-bg-variant="headerBgVariant"
      @ok="changeName()"
    >
      <b-form-group label="Change name:" label-for="changeNameID">
        <b-input
          id="changeNameID"
          v-model.trim="changedName"
          type="text"
          required
          placeholder="Enter a new name"
        ></b-input>
      </b-form-group>
    </b-modal> -->
  </div>
</template>

<script>
import axios from "axios";
const baseUrl = "http://localhost:8083/car-service";

export default {
  name: "codebookManagement",
  data() {
    return {
      carModelName: "",
      carBrandName: "",
      carClassName: "",
      fuelTypeName: "",
      transmissionTypeName: "",
      fields_types: ["name", "remove"],
      showCarBrandB: false,
      showCarModelB: false,
      showCarClassB: false,
      showFuelTypeB: false,
      showTransmissionTypeB: false,
      itemsCarBrands: [],
      itemsCarModels: [],
      itemsCarClasses: [],
      itemsFuelTypes: [],
      itemsTransmissionTypes: [],
      carBrandChosen: null,
      allCarBrands: [],
      headerBgVariant: "dark",
      originalName: "",
      changedName: "",
      currentlyChangingType: "", //carBrand, carModel, carType, fuelType, transmissionType
      currentlyChangingID: ""
    };
  },
  created() {
    this.getBrands();
  },
  methods: {
    getValidationState({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null;
    },
    getBrands() {
      axios.get(baseUrl + "/brand").then(response => {
        this.allCarBrands = [];
        response.data.forEach(carBrand =>
          this.allCarBrands.push({ value: carBrand.id, text: carBrand.name })
        );
      });
    },
    showCarBrand() {
      axios.get(baseUrl + "/brand").then(response => {
        this.itemsCarBrands = response.data;
      });

      this.showCarBrandB = true;
      this.showCarModelB = false;
      this.showCarClassB = false;
      this.showFuelTypeB = false;
      this.showTransmissionTypeB = false;
    },
    showCarModel() {
      this.showCarBrandB = false;
      this.showCarModelB = true;
      this.showCarClassB = false;
      this.showFuelTypeB = false;
      this.showTransmissionTypeB = false;
    },
    showCarClass() {
      axios.get(baseUrl + "/class").then(response => {
        this.itemsCarClasses = response.data;
      });

      this.showCarBrandB = false;
      this.showCarModelB = false;
      this.showCarClassB = true;
      this.showFuelTypeB = false;
      this.showTransmissionTypeB = false;
    },
    showFuelType() {
      axios.get(baseUrl + "/fuel").then(response => {
        this.itemsFuelTypes = response.data;
      });

      this.showCarBrandB = false;
      this.showCarModelB = false;
      this.showCarClassB = false;
      this.showFuelTypeB = true;
      this.showTransmissionTypeB = false;
    },
    showTransmissionType() {
      axios.get(baseUrl + "/transmission").then(response => {
        this.itemsTransmissionTypes = response.data;
      });

      this.showCarBrandB = false;
      this.showCarModelB = false;
      this.showCarClassB = false;
      this.showFuelTypeB = false;
      this.showTransmissionTypeB = true;
    },
    addCarBrand() {
      axios
        .post(baseUrl + "/brand", {
          name: this.carBrandName
        })
        .then(() => {
          this.$notify({
            group: "mainHolder",
            title: "Success",
            text: "New car brand successfully added!",
            type: "success"
          });
          this.carBrandName = "";
          this.$refs.observer.reset();
          this.showCarBrand();
        });
    },
    addCarModel() {
      //posalje se zahtev
      //osvezi se lista modela za brend sa id carBrandChosen

      axios
        .post(baseUrl + "/model/brand/" + this.carBrandChosen, {
          name: this.carModelName
        })
        .then(() => {
          this.$notify({
            group: "mainHolder",
            title: "Success",
            text: "New car model successfully added!",
            type: "success"
          });
          this.carModelName = "";
          this.$refs.observer.reset();
          this.refreshModelTable(this.carBrandChosen);
        });
    },
    refreshModelTable: function(newValue) {
      axios.get(baseUrl + "/model/brand/" + newValue).then(response => {
        this.itemsCarModels = response.data;
      });
    },
    addCarClass() {
      axios
        .post(baseUrl + "/class", {
          name: this.carClassName
        })
        .then(() => {
          this.$notify({
            group: "mainHolder",
            title: "Success",
            text: "New car class successfully added!",
            type: "success"
          });
          this.carClassName = "";
          this.$refs.observer.reset();
          this.showCarClass();
        });
    },
    addFuelType() {
      axios
        .post(baseUrl + "/fuel", {
          name: this.fuelTypeName
        })
        .then(() => {
          this.$notify({
            group: "mainHolder",
            title: "Success",
            text: "New fuel type successfully added!",
            type: "success"
          });
          this.fuelTypeName = "";
          this.$refs.observer.reset();
          this.showFuelType();
        });
    },
    addTransmissionType() {
      axios
        .post(baseUrl + "/transmission", {
          name: this.transmissionTypeName
        })
        .then(() => {
          this.$notify({
            group: "mainHolder",
            title: "Success",
            text: "New transmission type successfully added!",
            type: "success"
          });
          this.transmissionTypeName = "";
          this.$refs.observer.reset();
          this.showTransmissionType();
        });
    },
    removeCarBrand(id) {
      //posalje se zahtev za brisanje
      //ozvezi se prikaz svih
      axios
        .delete(baseUrl + "/brand/" + id)
        .then(() => {
          this.$notify({
            group: "mainHolder",
            title: "Success",
            text: "Car brand successfully removed!",
            type: "success"
          });
          this.showCarBrand();
          this.getBrands();
        })
        .catch(error => {
          if (error.response.status === 400) {
            this.$notify({
              group: "mainHolder",
              title: "Error",
              text:
                "Sorry! This car brand can not be removed, it has reference to some car models.",
              type: "error"
            });
          }
        });
    },
    removeCarModel(id) {
      //posalje se zahtev za brisanje
      //ozvezi se prikaz svih modela za brend sa id carBrandChosen
      axios
        .delete(baseUrl + "/model/" + id)
        .then(() => {
          this.$notify({
            group: "mainHolder",
            title: "Success",
            text: "Car model successfully removed!",
            type: "success"
          });
          this.refreshModelTable(this.carBrandChosen);
        })
        .catch(error => {
          if (error.response.status === 400) {
            this.$notify({
              group: "mainHolder",
              title: "Error",
              text:
                "Sorry! This car model can not be removed, it has reference to some cars.",
              type: "error"
            });
          }
        });
    },
    removeCarClass(id) {
      //posalje se zahtev za brisanje
      //ozvezi se prikaz svih
      axios
        .delete(baseUrl + "/class/" + id)
        .then(() => {
          this.$notify({
            group: "mainHolder",
            title: "Success",
            text: "Car type successfully removed!",
            type: "success"
          });
          this.showCarClass();
        })
        .catch(error => {
          if (error.response.status === 400) {
            this.$notify({
              group: "mainHolder",
              title: "Error",
              text:
                "Sorry! This car class can not be removed, it has reference to some cars.",
              type: "error"
            });
            this.showCarClass();
          }
        });
    },
    removeFuelType(id) {
      //posalje se zahtev za brisanje
      //ozvezi se prikaz svih
      axios
        .delete(baseUrl + "/fuel/" + id)
        .then(() => {
          this.$notify({
            group: "mainHolder",
            title: "Success",
            text: "Fuel type successfully removed!",
            type: "success"
          });
          this.showFuelType();
        })
        .catch(error => {
          if (error.response.status === 400) {
            this.$notify({
              group: "mainHolder",
              title: "Error",
              text:
                "Sorry! This fuel type can not be removed, it has reference to some cars.",
              type: "error"
            });
            this.showFuelType();
          }
        });
    },
    removeTransmissionType(id) {
      //posalje se zahtev za brisanje
      //ozvezi se prikaz svih
      axios
        .delete(baseUrl + "/transmission/" + id)
        .then(() => {
          this.$notify({
            group: "mainHolder",
            title: "Success",
            text: "Transmission type successfully removed!",
            type: "success"
          });
          this.showTransmissionType();
        })
        .catch(error => {
          if (error.response.status === 400) {
            this.$notify({
              group: "mainHolder",
              title: "Error",
              text:
                "Sorry! This transmission type can not be removed, it has reference to some cars.",
              type: "error"
            });
            this.showTransmissionType();
          }
        });
    },
   /* editName(item, type) {
      this.currentlyChangingType = type;
      this.currentlyChangingID = item.id;
      this.originalName = item.name;
      this.changedName = item.name;
      this.$refs["modal-edit"].show();
    },
    changeName() {
      if (this.changedName == "") {
        this.$notify({
          group: "mainHolder",
          title: "Error",
          text: "Name is mandatory.",
          type: "error"
        });
        return;
      }
      if (this.originalName != this.changedName) {
        if (this.currentlyChangingType == "carBrand") {
          alert("promenio se brend");
          //posalji zahtev za izmenu brenda
          console.log(this.currentlyChangingID);
          console.log(this.changedName);
          //ponovo osvezi listu brendova
        }
        if (this.currentlyChangingType == "carModel") {
          alert("promenio se model");
          //posalji zahtev za izmenu modela
          console.log(this.currentlyChangingID);
          console.log(this.changedName);
          //ponovo osvezi listu modela za brandChosenID
        }
        if (this.currentlyChangingType == "carType") {
          alert("promenio se tip");
          //posalji zahtev za izmenu tipa
          console.log(this.currentlyChangingID);
          console.log(this.changedName);
          //ponovo osvezi listu tipova
        }
        if (this.currentlyChangingType == "fuelType") {
          alert("promenio se tip goriva");
          //posalji zahtev za izmenu tipa goriva
          console.log(this.currentlyChangingID);
          console.log(this.changedName);
          //ponovo osvezi listu tipova goriva
        }
        if (this.currentlyChangingType == "transmissionType") {
          alert("promenio se tip menjaca");
          //posalji zahtev za izmenu tipa menjaca
          console.log(this.currentlyChangingID);
          console.log(this.changedName);
          //ponovo osvezi listu tipova menjaca
        }
      } 
    }*/
  },
  watch: {
    carBrandChosen: function(newValue) {
      axios.get(baseUrl + "/model/brand/" + newValue).then(response => {
        this.itemsCarModels = response.data;
      });
    }
  }
};
</script>

<style scoped>
.sub-work-div {
  width: 100%;
  padding-top: 1em;
}

.form-style {
  width: 60%;
  margin-left: auto;
  margin-right: auto;
}

.table-style {
  width: 60%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 1em;
}
</style>