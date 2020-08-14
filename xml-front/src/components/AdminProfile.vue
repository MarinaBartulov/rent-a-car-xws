<template>
  <div id="div-main">
    <b-navbar style="height:3.3em;" toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand href="/">Rent A Car</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item href="/home" link-classes="text-light">
            <b>Homepage</b>
          </b-nav-item>
          <b-nav-item v-on:click="logout()" link-classes="text-light">
            <b>Log out</b>
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <div class="sidebar-div">
      <h4 class="h4-sidebar">Options:</h4>
      <b-nav vertical class="options-sidebar">
        <b-nav-item
          class="b-item"
          link-classes="text-light"
          @click="showRequestsF()"
        >Registration requests of clients</b-nav-item>
        <b-nav-item
          class="b-item"
          link-classes="text-light"
          @click="showRequestsAgentF()"
        >Registration requests of agents/companies</b-nav-item>
        <b-nav-item class="b-item" link-classes="text-light" @click="showUsersF()">Users management</b-nav-item>
        <b-nav-item
          class="b-item"
          link-classes="text-light"
          @click="showCodeBookF()"
        >Codebook management</b-nav-item>
        <b-nav-item
          class="b-item"
          link-classes="text-light"
          @click="showCommentsF()"
        >Comments management</b-nav-item>
        <b-nav-item
          class="b-item-last"
          link-classes="text-light"
          @click="showPermissionsF()"
        >Permissions management</b-nav-item>
      </b-nav>
    </div>
    <div class="vertical-line"></div>
    <div class="work-div">
      <h4 class="h4-work">{{currentOption}}</h4>
      <!--Registration requests-->
      <div class="sub-work-div" v-if="showRequests">
        <p v-if="itemsReqClient.length < 1" class="text-center">No registration requests of clients</p>
        <b-table
          striped
          hover
          bordered
          borderless
          :items="itemsReqClient"
          :fields="fieldsReqClient"
          v-else
        >
          <template v-slot:cell(approve)="row">
            <b-button
              size="sm"
              variant="outline-success"
              @click="approveRequest(row.item.id)"
            >Approve</b-button>
          </template>
          <template v-slot:cell(reject)="row">
            <b-button size="sm" variant="outline-danger" @click="rejectRequest(row.item.id)">Reject</b-button>
          </template>
        </b-table>
      </div>
      <!--Agent/Companies registration-->
      <div class="sub-work-div" v-if="showRequestsAgent">
        <p v-if="itemsReqAgent.length < 1" class="text-center">No registration requests of agents/companies</p>
        <b-table striped hover bordered borderless :items="itemsReqAgent" :fields="fieldsReqAgent" v-else>
          <template v-slot:cell(approve)="row">
            <b-button
              size="sm"
              variant="outline-success"
              @click="approveRequestAgent(row.item.id)"
            >Approve</b-button>
          </template>
          <template v-slot:cell(reject)="row">
            <b-button
              size="sm"
              variant="outline-danger"
              @click="rejectRequestAgent(row.item.id)"
            >Reject</b-button>
          </template>
        </b-table>
      </div>
      <!--Users management-->
      <div class="sub-work-div" v-if="showUsers">
        <b-form @submit.prevent="showUsersStatusType()">
          <b-form-group label="User type:">
            <b-form-radio-group id="userTypeID" v-model="userType" name="user-type">
              <b-form-radio value="clients">Clients</b-form-radio>
              <b-form-radio value="agents">Agents/Companies</b-form-radio>
            </b-form-radio-group>
          </b-form-group>
          <b-form-group label="Status:">
            <b-form-radio-group id="userStatusID" v-model="userStatus" name="user-status">
              <b-form-radio value="all">All</b-form-radio>
              <b-form-radio v-show="userType === 'clients'" value="active">Active</b-form-radio>
              <b-form-radio v-show="userType === 'clients'" value="blocked">Blocked</b-form-radio>
            </b-form-radio-group>
          </b-form-group>
          <b-button variant="info" type="submit">Show</b-button>
        </b-form>
        <hr />
        <!--Clients table-->
        <b-table
          v-if="show_table_clients"
          id="table-clients"
          striped
          hover
          bordered
          borderless
          :items="itemsClients"
          :fields="fields_clients"
        >
          <template v-slot:cell(remove)="row">
            <b-button
              v-if="row.item.removed == false"
              size="sm"
              variant="outline-danger"
              @click="removeUser(row.item.id, 'client')"
            >Remove</b-button>
            <p v-else>Removed</p>
          </template>
          <template v-slot:cell(change)="row">
            <b-button
              v-if="row.item.status == 'ACTIVE'"
              class="w-75"
              size="sm"
              variant="outline-warning"
              @click="blockUser(row.item.id, 'client')"
            >Block</b-button>
            <b-button
              v-else
              size="sm"
              class="w-75"
              variant="outline-success"
              @click="activateUser(row.item.id, 'client')"
              :disabled="row.item.status == 'INACTIVE'"
            >Activate</b-button>
          </template>
        </b-table>
        <!--Agents table-->
        <b-table
          v-if="show_table_agents"
          id="table-agents"
          striped
          hover
          bordered
          borderless
          :items="itemsAgents"
          :fields="fields_agents"
        >
          <template v-slot:cell(details)="row">
            <b-button
              size="sm"
              variant="outline-primary"
              @click="showAgentDetails(row.item)"
            >Details</b-button>
          </template>
          <!--   <template v-slot:cell(remove)="row">
                  <b-button size="sm" variant="outline-danger" @click="removeUser(row.item.id, 'agent')">Remove</b-button>
                </template>
                <template v-slot:cell(change)="row">
                  <b-button v-if="row.item.active" size="sm" variant="outline-warning" @click="blockUser(row.item.id, 'agent')">Block</b-button>
                  <b-button v-else size="sm" variant="outline-success" @click="activateUser(row.item.id, 'agent')">Activate</b-button>
          </template>-->
        </b-table>
      </div>
      <b-modal
        id="modal-agent-details"
        ref="modal-agent-details"
        ok-only
        centered
        title="Agent details"
      >
        <p class="my-4">
          <b>First name:</b>
          {{modal_firstName}}
        </p>
        <p class="my-4">
          <b>Last name:</b>
          {{modal_lastName}}
        </p>
        <p class="my-4">
          <b>Company name:</b>
          {{modal_companyName}}
        </p>
        <p class="my-4">
          <b>Company number:</b>
          {{modal_companyNumber}}
        </p>
        <p class="my-4">
          <b>Address:</b>
          {{modal_address}}
        </p>
        <p class="my-4">
          <b>Email:</b>
          {{modal_email}}
        </p>
      </b-modal>
      <!--Codebook management-->
      <codebookManagement v-if="showCodeBook"></codebookManagement>
      <!--Comments management-->
      <div class="sub-work-div" v-if="showComments">
        <p v-if="itemsComments.length < 1" class="text-center">No comments</p>
        <b-table
          id="table-comments"
          striped
          hover
          bordered
          borderless
          :items="itemsComments"
          :fields="fields_comments"
          v-else
        >
          <template v-slot:cell(car)="row">
            <p>{{row.item.brand + ' ' + row.item.model}}</p>
          </template>
          <template v-slot:cell(commenter)="row">
            <p>{{row.item.userName + ' ' + row.item.userLastname}}</p>
          </template>
          <template v-slot:cell(content)="row">
            <p class="bold-text">{{row.item.content}}</p>
          </template>
          <template v-slot:cell(approve)="row">
            <b-button
              size="sm"
              variant="outline-success"
              @click="approveComment(row.item.id)"
            >Approve</b-button>
          </template>
          <template v-slot:cell(reject)="row">
            <b-button size="sm" variant="outline-danger" @click="rejectComment(row.item.id)">Reject</b-button>
          </template>
        </b-table>
        <hr />
        <p v-if="itemsReplies.length < 1" class="text-center">No replies</p>
        <b-table
          id="table-replies"
          striped
          hover
          bordered
          borderless
          :items="itemsReplies"
          :fields="fields_replies"
          v-else
        >         
          <template v-slot:cell(car)="row">
            <p>{{row.item.brand + ' ' + row.item.model}}</p>
          </template>
          <template v-slot:cell(content)="row">
            <p>{{row.item.content}}</p>
          </template>
          <template v-slot:cell(replyContent)="row">
            <p class="bold-text">{{row.item.replyContent}}</p>
          </template>
          <template v-slot:cell(approve)="row">
            <b-button
              size="sm"
              variant="outline-success"
              @click="approveReply(row.item.id)"
            >Approve</b-button>
          </template>
          <template v-slot:cell(reject)="row">
            <b-button size="sm" variant="outline-danger" @click="rejectReply(row.item.id)">Reject</b-button>
          </template>
        </b-table>
      </div>
      <!--Permissions management-->
      <div class="sub-work-div" v-if="showPermissions">
         <b-table striped hover bordered borderless :items="itemsActiveClients" :fields="fieldsActiveClients">
          <template v-slot:cell(comments)="row">
            <b-button
              v-if="row.item.canComment == true"
              size="sm"
              variant="outline-danger"
              @click="disableCommenting(row.item.id)"
            >Disable creating comment</b-button>
            <p v-else>Disabled</p>
          </template>
          <template v-slot:cell(reservations)="row">
            <b-button
              v-if="row.item.canAddToCart == true"
              size="sm"
              variant="outline-danger"
              @click="disableCreatingReservations(row.item.id)"
            >Disable creating reservations</b-button>
            <p v-else>Disabled</p>
          </template>
        </b-table>
      </div>
    </div>
  </div>
</template>

<script>
import codebookManagement from "../components/CodebookManagement.vue";
import axios from "axios";
const baseUrl = "http://localhost:8083/user-service";
const baseCarUrl = "http://localhost:8083/car-service";

export default {
  components: {
    codebookManagement
  },

  data() {
    return {
      fieldsReqClient: [
        "name",
        "surname",
        "email",
        "phoneNumber",
        "status",
        "Approve",
        "Reject"
      ],
      itemsReqClient: [],
      fieldsReqAgent: [
        "name",
        "surname",
        "email",
        "companyName",
        "companyNumber",
        "address",
        "status",
        "Approve",
        "Reject"
      ],
      itemsReqAgent: [],
      currentOption: "Choose an option...",
      showRequests: false,
      showRequestsAgent: false,
      showUsers: false,
      showCodeBook: false,
      showComments: false,
      showPermissions: false,
      firstNameAgent: "",
      lastNameAgent: "",
      companyName: "",
      addressAgent: "",
      companyNumber: "",
      emailAgent: "",
      passwordAgent: "",
      userType: "clients",
      userStatus: "all",
      itemsClients: [],
      itemsAgents: [],
      fields_clients: [
        "name",
        "surname",
        "email",
        "phoneNumber",
        "status",
        "change",
        "remove"
      ],
      fields_agents: [
        "name",
        "surname",
        "companyName",
        "companyNumber",
        "details"
        // "status",
        // "change",
        // "remove"
      ],
      show_table_clients: false,
      show_table_agents: false,
      modal_firstName: "",
      modal_lastName: "",
      modal_companyName: "",
      modal_companyNumber: "",
      modal_address: "",
      modal_email: "",
      itemsComments: [],
      fields_comments: [
        "Car",
        "Commenter",
        {
          key: 'content',
          label:'Text comment'
        },
        {
          key: 'dateTime',
          label: 'Date',
          formatter: value => {
              return new Date(value).toDateString();
          }
        },
        {
          key: 'commentStatus',
          label: 'Comment status'
        },
        "Approve",
        "Reject"
      ],
      itemsReplies: [],
      fields_replies: [
        "Car",
        {
          key: 'content',
          label:'Text comment'
        },
        {
          key: 'commentStatus',
          label: 'Comment status'
        },
        {
          key: 'replyContent',
          label:'Text replay'
        },
        {
          key: 'replyStatus',
          label: 'Reply status'
        },
        "Approve",
        "Reject"
      ],
      itemsActiveClients: [],
      fieldsActiveClients: [
        {
          key: 'name',
          label:'First name'
        },
        {
          key: 'surname',
          label:'Last name'
        },
        {
          key: 'email',
          label:'Email'
        },
        "Comments",
        "Reservations"
      ]
    };
  },
  methods: {
    logout() {
      //logout
      this.$store.dispatch("destroyToken");
      this.$store.dispatch("destroyCurrentUser");
      this.$router.push({ path: "/" });
    },
    showRequestsF() {
      this.currentOption = "Registration requests of clients";
      this.showRequests = true;
      this.showRequestsAgent = false;
      this.showUsers = false;
      this.showCodeBook = false;
      this.showComments = false;
      this.showPermissions = false;

      axios.get(baseUrl + "/request").then(response => {
        this.itemsReqClient = response.data;
      });
    },
    showRequestsAgentF() {
      this.currentOption = "Registration requests of agents/companies";
      this.showRequestsAgent = true;
      this.showRequests = false;
      this.showUsers = false;
      this.showCodeBook = false;
      this.showComments = false;
      this.showPermissions = false;

      axios.get(baseUrl + "/agent/request").then(response => {
        this.itemsReqAgent = response.data;
      });
    },
    showUsersF() {
      this.currentOption = "Users management";
      this.showUsers = true;
      this.showRequestsAgent = false;
      this.showRequests = false;
      this.showCodeBook = false;
      this.showComments = false;
      this.showPermissions = false;
    },
    showCodeBookF() {
      this.currentOption = "Codebook management";
      this.showCodeBook = true;
      this.showUsers = false;
      this.showRequestsAgent = false;
      this.showRequests = false;
      this.showComments = false;
      this.showPermissions = false;
    },
    showCommentsF() {
      this.currentOption = "Comments management";
      this.showComments = true;
      this.showCodeBook = false;
      this.showUsers = false;
      this.showRequestsAgent = false;
      this.showRequests = false;
      this.showPermissions = false;

      axios.get(baseCarUrl + "/api/comments").then((response) => {
        this.itemsComments = response.data;
      })

      axios.get(baseCarUrl + "/api/replies").then((response) => {
        this.itemsReplies = response.data;
      })
    },
    showPermissionsF() {
      this.currentOption = "Permissions management";
      this.showPermissions = true;
      this.showCodeBook = false;
      this.showUsers = false;
      this.showRequestsAgent = false;
      this.showRequests = false;
      this.showComments = false;

      axios.get(baseUrl + "/client/active").then((response) => {
        this.itemsActiveClients = response.data;
      })
    },
    approveRequest(id) {
       axios.put(baseUrl + "/request/" + id + "/approve").then(() => {
          this.$notify({
            group: "mainHolder",
            title: "Success",
            text: "Request is approved!",
            type: "success"
          });
          this.showRequestsF();
        });
    },
    rejectRequest(id) {
      axios.put(baseUrl + "/request/" + id + "/reject").then(() => {
          this.$notify({
            group: "mainHolder",
            title: "Success",
            text: "Request is rejected!",
            type: "success"
          });
          this.showRequestsF();
        });
    },
    approveRequestAgent(id) {
       axios.put(baseUrl + "/agent/request/" + id + "/approve").then(() => {
          this.$notify({
            group: "mainHolder",
            title: "Success",
            text: "Request is approved!",
            type: "success"
          });
          this.showRequestsAgentF();
        });
    },
    rejectRequestAgent(id) {
      axios.put(baseUrl + "/agent/request/" + id + "/reject").then(() => {
          this.$notify({
            group: "mainHolder",
            title: "Success",
            text: "Request is rejected!",
            type: "success"
          });
          this.showRequestsAgentF();
        });
    },
    showUsersStatusType() {
      if (this.userType == "clients" && this.userStatus == "active") {
        this.show_table_clients = true;
        this.show_table_agents = false;

        axios.get(baseUrl + "/client/active").then(response => {
          this.itemsClients = response.data;
        });
      }
      if (this.userType == "clients" && this.userStatus == "blocked") {
        this.show_table_clients = true;
        this.show_table_agents = false;

        axios.get(baseUrl + "/client/blocked").then(response => {
          this.itemsClients = response.data;
        });
      }
      if (this.userType == "clients" && this.userStatus == "all") {
        this.show_table_clients = true;
        this.show_table_agents = false;

        axios.get(baseUrl + "/client").then(response => {
          this.itemsClients = response.data;
        });
      }
      /* if(this.userType == "agents" && this.userStatus == "active"){
            //poslati zahtev

            this.show_table_clients = false;
            this.show_table_agents = true;
          }
          if(this.userType == "agents" && this.userStatus == "blocked"){
            //poslati zahtev

            this.show_table_clients = false;
            this.show_table_agents = true;
          }*/
      if (this.userType == "agents" && this.userStatus == "all") {
        //poslati zahtev

        axios.get(baseUrl + "/agent").then(response => {
          this.itemsAgents = response.data;
        });

        this.show_table_clients = false;
        this.show_table_agents = true;
      }
    },
    removeUser(id, userType) {
      if (userType == "client") {
        axios.delete(baseUrl + "/client/" + id).then(() => {
          this.showUsersStatusType();
        });
      } else {
        //poslati zahtev za brisanje agenta
        this.showUsersStatusType(); // da se osvezi prikaz
        alert("Brise se agent: " + id);
      }
    },
    blockUser(id, userType) {
      if (userType == "client") {
        axios.put(baseUrl + "/client/" + id + "/block").then(() => {
          this.$notify({
            group: "mainHolder",
            title: "Success",
            text: "User is blocked!",
            type: "success"
          });
          this.showUsersStatusType();
        });
      } else {
        //poslati zahtev za blokiranje agenta
        this.showUsersStatusType(); // da se osvezi prikaz
        alert("Blokira se agent: " + id);
      }
    },
    activateUser(id, userType) {
      if (userType == "client") {
        axios.put(baseUrl + "/client/" + id + "/activate").then(() => {
          this.$notify({
            group: "mainHolder",
            title: "Success",
            text: "User is activated!",
            type: "success"
          });
          this.showUsersStatusType();
        });
      } else {
        //poslati zahtev za aktiviranje agenta
        this.showUsersStatusType(); // da se osvezi prikaz
        alert("Aktivira se agent: " + id);
      }
    },
    showAgentDetails(agent) {
      this.modal_firstName = agent.name;
      this.modal_lastName = agent.surname;
      this.modal_companyName = agent.companyName;
      this.modal_companyNumber = agent.companyNumber;
      this.modal_address = agent.address;
      this.modal_email = agent.email;
      this.$refs["modal-agent-details"].show();
    },
    approveComment(id) {
      axios.put(baseCarUrl + "/api/comments/" + id + "/approve").then(() => {
         this.$notify({
            group: "mainHolder",
            title: "Success",
            text: "Comment is approved!",
            type: "success"
          });
      }).catch(() => {
        this.$notify({
            group: "mainHolder",
            title: "Error",
            text: "Comment is not approved!",
            type: "error"
        });
      }).then(() => {
        this.showCommentsF();
      })      
    },
    rejectComment(id) {
      axios.put(baseCarUrl + "/api/comments/" + id + "/reject").then(() => {
        this.$notify({
            group: "mainHolder",
            title: "Success",
            text: "Comment is rejected!",
            type: "success"
          });
      }).catch(() => {
        this.$notify({
            group: "mainHolder",
            title: "Error",
            text: "Comment is not rejected!",
            type: "error"
        });
      }).then(() => {
        this.showCommentsF();
      })   
    },
    approveReply(id) {
      axios.put(baseCarUrl + "/api/replies/" + id + "/approve").then(() => {
        this.$notify({
            group: "mainHolder",
            title: "Success",
            text: "Reply is approved!",
            type: "success"
          });
      }).catch(() => {
        this.$notify({
            group: "mainHolder",
            title: "Error",
            text: "Reply is not approved!",
            type: "error"
        });
      }).then(() => {
        this.showCommentsF();
      })   
    },
    rejectReply(id) {
      axios.put(baseCarUrl + "/api/replies/" + id + "/reject").then(() => {
        this.$notify({
            group: "mainHolder",
            title: "Success",
            text: "Reply is rejected!",
            type: "success"
          });
      }).catch(() => {
        this.$notify({
            group: "mainHolder",
            title: "Error",
            text: "Reply is not rejected!",
            type: "error"
        });
      }).then(() => {
        this.showCommentsF();
      })   
    },
    disableCommenting(id) {
      axios.put(baseUrl + "/client/" + id + "/comment/disable").then(() => {
        this.$notify({
            group: "mainHolder",
            title: "Success",
            text: "Client successfully disabled for creating comments!",
            type: "success"
          });
          
      }).catch(() => {
        this.$notify({
            group: "mainHolder",
            title: "Error",
            text: "Client must have 3 or more rejected comments!",
            type: "error"
        }) 
      }).then(() => {
        this.showPermissionsF();
      })
    },
    disableCreatingReservations(id) {
      axios.put(baseUrl + "/client/" + id + "/reservation/disable").then(() => {
        this.$notify({
            group: "mainHolder",
            title: "Success",
            text: "Client successfully disabled for creating reservations!",
            type: "success"
          });
      }).catch(() => {
        this.$notify({
            group: "mainHolder",
            title: "Error",
            text: "Client must have 3 or more canceled reservations!",
            type: "error"
        });
      }).then(() => {
        this.showPermissionsF();
      })
    }
  }
};
</script>
<style>
.sidebar-div {
  width: 18%;
  float: left;
  text-align: center;
  margin-left: 1em;
}

.work-div {
  float: left;
  width: 73%;
  margin-left: 7%;
  margin-top: 2em;
  margin-bottom: 3em;
}

.sub-work-div {
  width: 100%;
  padding-top: 1em;
}

.h4-sidebar,
.h4-work {
  text-align: center;
  margin-bottom: 0.5em;
  margin-top: 0.5em;
}

.options-sidebar {
  width: 100%;
  background-color: #343a40;
  border-radius: 15px;
}

.b-item:hover,
.b-item-last:hover {
  background-color: #485058;
}

.b-item {
  border-bottom: solid 1px #485058;
}

.reg-form {
  width: 70%;
  border: 1px solid black;
  border-radius: 10px;
  padding-left: 2em;
  padding-right: 2em;
  padding-top: 0.5em;
  padding-bottom: 0.5em;
  margin-left: auto;
  margin-right: auto;
}

.btn-types {
  margin-left: 1em;
}

.bold-text {
  font-weight: bold;
}
</style>