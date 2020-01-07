<template>
  <v-app id="inspire" light>
    <!-- toolbar on the top of every page -->
    <v-toolbar color="#373737">
      <!-- Menu -->
      <v-btn left @click.stop="drawer = !drawer" color="#F1C100" class="white--text">
        <v-icon color="white">menu</v-icon>
      </v-btn>

      <v-spacer></v-spacer>
        <v-toolbar-title class="white--text" color="#FFFAF5">
          <v-btn text color="white" @click='movePage("Welcome")'
          ><h1> 
            LOVIDAY
            </h1>
          </v-btn>
        </v-toolbar-title>
      <v-spacer></v-spacer>

      <!-- dialog for connexion or disconnexion -->
      <v-dialog v-model="Disconnection" max-width="600px" style="background-color: floralwhite" v-if="connected"  :disabled="!connected">
        <template v-slot:activator="{ on }">
          <v-btn color="#F1C100" class="white--text" dark v-on="on">
            <v-icon>power_settings_new</v-icon>
          </v-btn>
        </template>

          <v-card color="#FFFAF5">
            <v-card-title>
              <span class="register">DISCONNECTION</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-card-text>
                  <v-form>
                    <h4>Do you really want to log out ?</h4>
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="#F1C100" text @click='disconnect'>YES</v-btn>
                  <v-btn color="#F1C100" text>NO</v-btn>
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-container>
            </v-card-text>
          </v-card>
      </v-dialog>

        <!-- dialog for connexion -->
      <v-dialog v-model="Connection" max-width="600px" style="background-color: floralwhite" class="ms-3" v-if="!connected" :disabled="connected">
        <template v-slot:activator="{ on }">
          <v-btn color="#F1C100" class="white--text" dark v-on="on">
            <span>Connection</span>
          </v-btn>
        </template>
        <v-card color="#FFFAF5">
          <v-card-title>
            <span class="register">CONNEXION</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-card-text>
                <v-form>
                  <v-text-field
                    outlined
                    dense
                    required
                    v-model="emailcon"
                    label="Email address"
                    Email
                    prepend-inner-icon="person"
                  ></v-text-field>
                  <br />
                  <v-text-field
                    outlined
                    dense
                    required
                    v-model="pwdcon"
                    label="Password"
                    Pwd
                    prepend-inner-icon="lock"
                    :type="show1 ? 'text' : 'password'"
                    hint="At least 8 characters"
                    counter
                  ></v-text-field>
                </v-form>
              </v-card-text>
            </v-container>
          </v-card-text>
          <p v-if=' errors.length '>
            <v-alert :value='true' color="red" class='text-md-center'>
              <h4>
                <div v-for='error in errors' :key='error' class="white--text">{{ error }}</div>
              </h4>
            </v-alert>
          </p>
          <v-card-actions>
            <v-btn @click="connect(emailcon,pwdcon)" color="#F1C100" text>CONNEXION</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- dialog for registration -->
      <v-dialog v-model="Register" max-width="600px" style="background-color: floralwhite" class="mx-3" v-if="!connected"  :disabled="connected">
        <template v-slot:activator="{ on }">
          <v-btn color="#F1C100" class="white--text" dark v-on="on">
            <span>Registration</span>
          </v-btn>
        </template>
              <v-card color="#FFFAF5">
                  <v-card-title>
                    <span class="register">REGISTRATION</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field v-model='firstname' label="First name*" required outlined></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field v-model='lastname' label="Last name*" required outlined></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-text-field v-model='emailreg' label="Email*" required outlined></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-text-field v-model='pwdreg' label="Password*" type="password" required outlined></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-text-field v-model='pwdreg2' label='Confirm password*' type="password" required outlined></v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                    <small>*indicates required field</small>
                  </v-card-text>
                  <p v-if=' errors.length '>
                    <v-alert :value='true' color="red" class='text-md-center'>
                      <h4>
                        <div v-for='error in errors' :key='error' class="white--text">{{ error }}</div>
                      </h4>
                    </v-alert>
                  </p>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="#F1C100" text @click='register(emailreg,pwdreg,lastname,firstname)' 
                    :disabled="!firstname || !lastname || !emailreg || !pwdreg || !pwdreg2">Save</v-btn>
                  </v-card-actions>
                </v-card>
            </v-dialog>
    </v-toolbar>

    <!-- Contenu du menu -->
    <v-navigation-drawer v-model="drawer" absolute temporary color="#FFFAF5" class="white--text">
      <!-- the user -->
      <p v-if=' connected === true '>
        <v-list-item>
          <!-- v-list-item-avatar>
            <v-img src="https://randomuser.me/api/portraits/men/78.jpg"></v-img>
          </v-list-item-avatar -->
          <v-list-item-content>
            <v-list-item-title>{{ emailConnectedUser }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </p>

      <v-divider></v-divider>

      <!-- other functionalities -->
      <v-list dense>
        <v-list-item @click='movePage("Welcome")'>
          <v-icon class="mr-2">home</v-icon>
          <v-list-item-content>Home</v-list-item-content>
        </v-list-item>
        <p v-if=' connected === true '>
          <v-list-item @click='movePage("Lists")'>
            <v-icon class="mr-2">shopping_cart</v-icon>
            <v-list-item-content>My products' lists</v-list-item-content>
          </v-list-item>
          <v-list-item @click='movePage("Favorites")'>
            <v-icon class="mr-2">favorite</v-icon>
            <v-list-item-content>My favorites</v-list-item-content>
          </v-list-item>
        </p>
        <v-list-item @click='movePage("Research")'>
          <v-icon class="mr-2">search</v-icon>
          <v-list-item-content>Do a research</v-list-item-content>
        </v-list-item>
        <p v-if=' connected === true '>
          <v-list-item @click='movePage("Account")'>
            <v-icon class="mr-2">account_circle</v-icon>
            <v-list-item-content>My account</v-list-item-content>
          </v-list-item>
        </p>
        
        <p v-if=' connected === false '>
          <v-list-item @click='movePage("Login")'>
            <v-icon class="mr-2">logout</v-icon>
            <v-list-item-content>Log in</v-list-item-content>
          </v-list-item>
        </p>
        <p v-if=' connected === true '>
          <v-list-item @click='disconnect'>
            <v-icon class="mr-2">logout</v-icon>
            <v-list-item-content>Log out</v-list-item-content>
          </v-list-item>
        </p>
      </v-list>
    </v-navigation-drawer>

    <router-view></router-view>
  </v-app>
</template>


<script>
import axios from 'axios'
export default {
  name: "App",
  data: () => ({
    drawer: null,
    emailcon: null,
    pwdcon: null,
    firstname: null,
    lastname: null,
    emailreg: null,
    pwdreg: null,
    pwdreg2: null,
    errors: [],

    connected: false,
    emailConnectedUser: null
  }),
  created() {
    this.movePage("Welcome");
    if(this.$store.getters.getEmail != null){
      this.connected = true
      this.emailConnectedUser = this.$store.getters.getEmail 
    }
  },

  methods: {
    movePage(path) {
      this.$router.push(path);

    },

    //Connexion function
    connect (emailuser,pwduser){
      this.errors = []
      const vm = this
      const user = {
        email: emailuser,
        pwd: pwduser
      }
      //Query for auth
      axios.post('http://localhost:3000/auth', { user })
        .then(function (response) {
          console.log(response) 
          if(response.data != null) {
            console.log("connected to website")
            vm.connected = true
            
            //alert('You are connected')
            vm.emailConnectedUser = response.data.email
                       
            vm.$store.commit('connect', {
              email: response.data.email,
              pwd: response.data.pwd
            }) 
            vm.movePage("Welcome");
          } 
          else{
            vm.errors.push("Wrong Ids")
          }
        });
    },

    //Disconnect function
    disconnect (){
      this.connected = false
      this.emailConnectedUser = null
      this.$store.commit('disconnect')
      this.movePage("Welcome");
    },


    //register function
    register (emailuser,pwduser,nameuser,firstnameuser) {
      this.errors = []
      const vm = this
      const registerUser = {
        email: emailuser, 
        pwd: pwduser,
        lastname: nameuser,
        firstname: firstnameuser,
      }

      if (this.pwdreg === this.pwdreg2) {
        //Query for auth
        axios.post('http://localhost:3000/register', { registerUser })
          .then(function (response) {
            console.log(response) 
            if(response.data != null) {
              console.log("registered to website")
              vm.connected = true
              
              alert('You are registered')
              vm.emailConnectedUser = response.data.email
                          
              vm.$store.commit('register', {
                firstname: response.data.firstname,
                lastname: response.data.lastname,
                email: response.data.email,
                pwd: response.data.pwd
              }) 
              vm.movePage("Welcome");
            } 
            else{
              vm.errors.push("Wrong Ids")
            }
          });
      }
      else {
        this.errors.push("Passwords don't match")
      }
    }
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/icon?family=Material+Icons");
@import url("https://fonts.googleapis.com/css?family=Source+Sans+Pro:200,200i,300,300i,400,400i,600,600i,700,700i,900,900i|Monoton");

span.register {
  color: #f1c100;
  font-family: "Source Sans Pro", sans-serif;
  font-size: 25px;
  margin-bottom: 0.5rm;
  display: flex;
  justify-content: center;
  align-items: center;
}

h3 {
  color: grey;
  font-family: "Source Sans Pro", sans-serif;
  font-size: 40px;
  margin-bottom: 0.5rm;
  display: flex;
  justify-content: center;
  align-items: center;
}

h4 {
  color: #403f3f;
  font-size: 20px;
  margin-bottom: 0.5rm;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
