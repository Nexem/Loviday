<template>
  <div class="white_background">
    <v-card color="white">
      <v-card-title>
        <span class="research">RESEARCH A PRODUCT</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field label="Name of the product"
                v-model="nameProduct"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field label="Company of the product"
                v-model="nameCompany"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-checkbox
                v-model="palmOil"
                :label="`Ne contenant pas d'huile de palme`"
              ></v-checkbox>
            </v-col>
            <v-col cols="12">
              <v-checkbox
                v-model="origin"
                :label="`Origine France`"
              ></v-checkbox>
            </v-col>
            <v-col sm="3">
              <v-select
                v-model="additives"
                :items="numberadditivesItems"
                label="Number of additives"
              ></v-select>
            </v-col>
            <v-col sm="3">
              <v-select
                v-model="novascore"
                :items="novascoreItems"
                label="Nova Score"
              ></v-select>
            </v-col>
            <v-col sm="3">
              <v-select
                v-model="nutriscore"
                :items="nutriscoreItems"
                label="Nutriscore"
              ></v-select>
            </v-col>
          </v-row>
          <small>You can refer many fields at a time</small>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="#F1C100" text @click="queryResearch">Research</v-btn>
      </v-card-actions>
    </v-card>

  </div>
</template>

<style scoped>
div.white_background {
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}
</style>

<script>
export default {
  data: () => ({
    nameProduct: '',
    nameCompany: '',
    palmOil: '',
    origin: '',
    additives: '',
    novascore: '',
    nutriscore: '',
    novascoreItems: ['1','2','3','4','5'],
    nutriscoreItems: ['A','B','C','E','F'],
    numberadditivesItems: ['1','2','3','4','5','>5']
  }),

  methods: {
    // function to redirect to other pages
    movePage(path) {
      this.$router.push(path);
    },

    queryResearch(){
      var researchQuery = {
        code: '',
        product_name: this.nameProduct,
        origins: this.origin,
        manufacturing_places: '',
        ingredients_text: '',
        additives_n: this.additives,
        additives_tags: '',
        ingredients_from_palm_oil_n: this.palmOil,
        nutriscore_score: this.nutriscore,
        nutriscore_grade: '',
        nova_group: this.novascore,
        image_url: '',
        energy_100g: ''
      }
      return researchQuery;
    }
  }
}
</script>