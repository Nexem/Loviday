<template>
  <v-app id="inspire" light>
    <!-- toolbar on the top of every page -->
    <v-toolbar color="#373737">
      <!-- Menu -->
      <v-btn left @click.stop="drawer = !drawer" color="#F1C100" class="white--text">
        <v-icon color="white">menu</v-icon>
      </v-btn>

      <v-spacer></v-spacer>
      <v-toolbar-title class="white--text" color="#FFFAF5">LOVIDAY</v-toolbar-title>
      <v-spacer></v-spacer>

      <!-- search bar -->
      <v-text-field
        id="search"
        prepend-inner-icon="search"
        v-model="search"
        dense
        outlined
        color="#F1C100"
        label="Search"
        class="mt-7 mr-3"
        background-color="#FFFAF5"
      ></v-text-field>

      <!-- dialog for connexion or disconnexion -->
      <v-dialog v-model="Connection" max-width="600px" style="background-color: floralwhite">
        <template v-slot:activator="{ on }">
          <v-btn color="#F1C100" class="white--text" dark v-on="on">
            <v-icon>power_settings_new</v-icon>
          </v-btn>
        </template>

        <p v-if=' connected === true '>
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
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-container>
            </v-card-text>
          </v-card>
        </p>

        <p v-if=' connected === false '>
          <v-card color="#FFFAF5">
            <v-card-title>
              <span class="register">CONNECTION</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-card-text>
                  <v-form action="auth" method="POST">
                    <v-text-field
                      outlined
                      dense
                      required
                      v-model="Email"
                      label="Email address"
                      emailcon
                      prepend-inner-icon="person"
                    ></v-text-field>
                    <br />
                    <v-text-field
                      outlined
                      dense
                      required
                      v-model="Pwd"
                      label="Password"
                      pwdcon
                      prepend-inner-icon="lock"
                      :type="show1 ? 'text' : 'password'"
                      hint="At least 8 characters"
                      counter
                      @click:append="show1 = !show1"
                    ></v-text-field>
                  </v-form>
                </v-card-text>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-btn @click="connect" color="#F1C100" text>CONNECTION</v-btn>
              <v-spacer></v-spacer>

              <!-- dialog for registration -->
              <v-dialog v-model="Register" max-width="600px" style="background-color: floralwhite">
                <template v-slot:activator="{ on }">
                  <v-btn color="#F1C100" text dark v-on="on">REGISTRATION</v-btn>
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
                    <v-btn color="#F1C100" text @click='register'>Save</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-card-actions>
          </v-card>
        </p>
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
            <v-list-item-title>{{ emailcon }}</v-list-item-title>
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
        <p v-if=' connected == true '>
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

<script>
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
    connected: false
  }),
  created() {
    this.movePage("Welcome");
  },
  methods: {
    movePage(path) {
      this.$router.push(path);
    },
    connect (){
      this.errors = []
      // if correspond à la bdd then:
      this.connected = true
      this.$store.commit('connect', {
        email: this.emailcon,
        pwd: this.pwdcon
      })
    },
    disconnect (){
      this.connected = false
      this.emailcon = null
      this.pwdcon = null
      this.$store.commit('disconnect')
    },
    register () {
      this.errors = []
      // if (this.emailreg != email dans bdd)
      if (this.pwdreg === this.pwdreg2 && this.pwdreg !== null) {
        alert('You are registered')
        this.$store.commit('register', {
          firstname: this.firstname,
          lastname: this.lastname,
          email: this.emailreg,
          pwd: this.pwdreg
        })
        this.connected = true
      } else {
        this.errors.push("Passwords don't match")
      }
    }
  }
};
</script>
