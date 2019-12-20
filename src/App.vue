<template>
  <v-app id="inspire" light>
    <v-toolbar>
      <!-- ajouter bouton menu -->

      <v-toolbar-title class="floralwhite--text">LOVIDAY</v-toolbar-title>

      <!-- dialog for connexion -->
      <v-dialog v-model="Register" max-width="600px" style="background-color: floralwhite">
        <template v-slot:activator="{ on }">
          <v-btn color="floralwhite" class="grey--text" dark v-on="on">CONNEXION</v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="register">LOG IN</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-card-text>
                <v-form>
                  <v-text-field
                    outlined
                    dense
                    required
                    v-model='Email' 
                    label='Email address' 
                    Email
                    prepend-inner-icon="person"
                  ></v-text-field>
                  <br>
                  <v-text-field
                    outlined
                    dense
                    required
                    v-model='Pwd' 
                    label='Password' 
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
            <v-btn @click='checkForm' color="grey" class="white--text">CONNECTION</v-btn>
            <v-spacer></v-spacer>
            <v-btn @click='checkForm' color="grey" class="white--text">CANCEL</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- dialog for registration -->
      <v-dialog v-model="Register" max-width="600px" style="background-color: floralwhite">
            <template v-slot:activator="{ on }">
              <v-btn color="floralwhite" class="grey--text" dark v-on="on">REGISTRATION</v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="register">REGISTRATION</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field 
                        label="First name*" 
                        required 
                        outlined
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        label="Last name*"
                        required
                        outlined
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field 
                        label="Email*" 
                        required
                        outlined
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field 
                        label="Password*" 
                        type="password" 
                        required
                        outlined
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
                <small>*indicates required field</small>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="grey" text @click="dialog = false">Close</v-btn>
                <v-btn color="grey" text @click="dialog = false">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
    </v-toolbar>
  <router-view></router-view>
  </v-app>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/icon?family=Material+Icons");
@import url("https://fonts.googleapis.com/css?family=Source+Sans+Pro:200,200i,300,300i,400,400i,600,600i,700,700i,900,900i|Monoton");

span.register {
  color: grey;
  font-family: 'Source Sans Pro', sans-serif;
  font-size: 25px;
  margin-bottom: .5rm;
  display: flex; 
  justify-content: center; 
  align-items: center;
}

h3 {
  color: grey;
  font-family: 'Source Sans Pro', sans-serif;
  font-size: 40px;
  margin-bottom: .5rm;
  display: flex; 
  justify-content: center; 
  align-items: center;
}
</style>

<script>
export default {
  name: 'App',
  data () {
    return {
      //
    }
  },
  created () {
    this.movePage('Welcome')
  },
  methods: {
    movePage (path) {
      this.$router.push(path)
    }
  }
}
</script>
