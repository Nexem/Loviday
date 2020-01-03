<template>
  <div class="white_background">
    <v-card color="white">
      <v-card-title>
        <span class="research">List of your favorite products</span>
      </v-card-title>
    <!-- List of results -->
      <v-list shaped>
        <v-list-item-group v-model="checklistProduct" multiple>
          <template v-for="(item, i) in products">
            <v-divider v-if="!item" :key="`divider-${i}`"></v-divider>

            <v-list-item
              v-else
              :key="`item-${i}`"
              :value="item"
              active-class="green--text text--accent-4"
            >
              <template v-slot:default="{ active, toggle }">
                <v-list-item-content>
                  <v-list-item-title v-text="item"></v-list-item-title>
                </v-list-item-content>

                <v-list-item-action>
                  <v-checkbox
                    :input-value="active"
                    :true-value="item"
                    color="green accent-4"
                    @change="productSelected"
                  ></v-checkbox>
                </v-list-item-action>
              </template>
            </v-list-item>
          </template>
          <v-card-actions>
            <v-spacer></v-spacer>
            <!-- Button displayed only if min 1 element displayed -->
            <v-btn color="#F1C100" text @click="addToList" v-if="resultProducts!=''">Add to your Favs</v-btn>
          </v-card-actions>
        </v-list-item-group>
      </v-list>
    </v-card>
  </div>
</template>



<script>
export default {
  data: () => ({
  }),
  methods: {
    // function to redirect to other pages
    movePage(path) {
      this.$router.push(path);
    }
  }
}
</script>

<style scoped>
  div.white_background {
    background: white;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
  }
</style>