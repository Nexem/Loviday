<template>
  <v-app id="inspire" light>
    <!-- toolbar on the top of every page -->
    <v-toolbar color="#373737">

      <!-- Menu -->
      <v-btn left @click.stop="drawer = !drawer" color="#F1C100" class="white--text">Menu</v-btn>
      <!-- v-icon left @click.stop="drawer = !drawer" color="#F1C100">menu</v-icon -->

      <v-spacer></v-spacer>
      <v-toolbar-title class="white--text">LOVIDAY</v-toolbar-title>
      <v-spacer></v-spacer>

      <!-- search bar -->
      <v-text-field
        id="search"
        prepend-inner-icon="search"
        v-model="search"
        dense outlined
        color="#F1C100"
        label="Search"
        class="mt-7 mr-3"
        background-color="#FFFAF5"
      ></v-text-field>

      <!-- dialog for connexion -->
      <v-dialog v-model="Register" max-width="600px" style="background-color: floralwhite">
        <template v-slot:activator="{ on }">
          <v-btn color="#F1C100" class="white--text" dark v-on="on">
            <v-icon>power_settings_new</v-icon>
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
                    v-model="Email"
                    label="Email address"
                    Email
                    prepend-inner-icon="person"
                  ></v-text-field>
                  <br />
                  <v-text-field
                    outlined
                    dense
                    required
                    v-model="Pwd"
                    label="Password"
                    Pwd
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
            <v-btn @click="checkForm" color="#F1C100" text>CONNEXION</v-btn>
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
                        <v-text-field label="First name*" required outlined></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field label="Last name*" required outlined></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field label="Email*" required outlined></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field label="Password*" type="password" required outlined></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                  <small>*indicates required field</small>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="#F1C100" text @click="dialog = false">Save</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>

    <!-- Contenu du menu -->
    <v-navigation-drawer v-model='drawer' absolute temporary color="#373737" class="white--text">
      <!-- the user -->
      <v-list-item>
        <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/men/78.jpg"></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>John Leider</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <!-- other functionalities -->
      <v-list dense>
        <v-list-item>
          <v-list-item-icon>home</v-list-item-icon>
          <v-list-item-content>Home</v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-icon>shopping_cart</v-list-item-icon>
          <v-list-item-content>My products' lists</v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-icon>favorite</v-list-item-icon>
          <v-list-item-content>My favorites</v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-icon>search</v-list-item-icon>
          <v-list-item-content>Do a research</v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-icon>account_circle</v-list-item-icon>
          <v-list-item-content>My account</v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-icon>logout</v-list-item-icon>
          <v-list-item-content>Log out</v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>


    <router-view></router-view>
  </v-app>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/icon?family=Material+Icons");
@import url("https://fonts.googleapis.com/css?family=Source+Sans+Pro:200,200i,300,300i,400,400i,600,600i,700,700i,900,900i|Monoton");

span.register {
  color: #F1C100;
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
</style>

<script>
export default {
  name: "App",
  data() {
    return {
      //
    };
  },
  created() {
    this.movePage("Welcome");
  },
  methods: {
    movePage(path) {
      this.$router.push(path);
    }
  }
};
</script>
