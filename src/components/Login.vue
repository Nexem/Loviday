<template>
  <div class="background">
    <v-row>
      <v-col></v-col>
      <v-col style="background-color: floralwhite">
        <v-card-title>
          <span class="register">CONNEXION</span>
        </v-card-title>
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
            <v-card-actions>
              <v-btn @click="connect" color="#F1C100" text>CONNEXION</v-btn>
              <v-spacer></v-spacer>

              <!-- dialog for registration -->
              <v-dialog v-model="Register" max-width="600px" style="background-color: floralwhite">
                <template v-slot:activator="{ on }">
                  <v-btn color="#F1C100" text dark v-on="on">REGISTRATION</v-btn>
                </template>
                <v-card>
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
                    <v-btn color="#F1C100" text @click='register'>Save</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-card-actions>
          </v-form>
        </v-card-text>
      </v-col>
      <v-col></v-col>
    </v-row>
  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/icon?family=Material+Icons");
@import url("https://fonts.googleapis.com/css?family=Source+Sans+Pro:200,200i,300,300i,400,400i,600,600i,700,700i,900,900i|Monoton");

div.background {
  background-image: url("background.jpg");
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}

div.carre {
  background-color: floralwhite;
}

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
};
</script>