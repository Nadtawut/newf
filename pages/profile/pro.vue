<template>
  <div>
    <v-container class="hidden-sm-and-down">
      <v-row justify="space-around">
        <v-card height="500px" width="900">
          <v-img :src="this.data.bg" height="300px">
            <v-app-bar flat color="rgba(0, 0, 0, 0)">
              <v-spacer></v-spacer>
            </v-app-bar>
            <v-spacer></v-spacer>
            <v-card-title class="white--text mt-12">
              <v-avatar size="150px">
                <v-img alt="user" :src="this.data.img"> </v-img>
              </v-avatar>
              <h1 class="ml-10">
                {{ this.data.firstname }}&nbsp;{{
                  this.data.lastname
                }}
              </h1>
            </v-card-title>
          </v-img>
          <v-card  color="#EC407A" dark width="900px">
            <v-card-title>
              <v-icon large left> mdi-account </v-icon>
              <span class="title font-weight-light">Profile</span>
            </v-card-title>

            <v-card-text class="headline font-weight-bold">
              <h5>Email : {{ this.data.email }}</h5>
              <h5>Gender : {{ this.data.Gender }}</h5>
              <h5>Birthday : {{ this.data.date }}</h5>
            </v-card-text>

            <v-card-actions>
              <v-list-item class="grow">
                <v-list-item-avatar color="grey darken-3">
                  <v-img
                    class="elevation-6"
                    alt=""
                    :src="this.data.img"
                  ></v-img>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title>Feeling now</v-list-item-title>
                </v-list-item-content>

                <v-btn
                  class="mx-2"
                  fab
                  dark
                  color="indigo"
                  :href="this.data.fb"
                  target="_blank"
                >
                  <v-icon dark> mdi-facebook </v-icon>
                </v-btn>

                <v-btn
                  :href="this.data.ig"
                  target="_blank"
                  class="mx-2"
                  fab
                  dark
                  color="purple"
                >
                  <v-icon dark> mdi-instagram </v-icon>
                </v-btn>

                <v-btn
                  :href="this.data.tw"
                  target="_blank"
                  class="mx-2"
                  fab
                  dark
                  color="cyan"
                >
                  <v-icon dark> mdi-twitter </v-icon>
                </v-btn>
              </v-list-item>
            </v-card-actions>
          </v-card>
        </v-card>
      </v-row>
    </v-container>
    <v-container class="hidden-md-and-up">
      <v-row justify="space-around">
        <v-card height="500px" width="900px">
          <v-img :src="this.data.bg" height="250px">
            <v-app-bar flat color="rgba(0, 0, 0, 0)">
              <v-spacer></v-spacer>
            </v-app-bar>
            <v-spacer></v-spacer>
            <v-card-title class=" mt-12">
             <v-avatar size="100px" >
                <v-img alt="user" :src="this.data.img"> </v-img>
              </v-avatar>
            </v-card-title>
          </v-img>
          <v-card  color="#EC407A" dark width="900px">
            <v-card-title>
              <v-icon large left> mdi-account </v-icon>
              <span class="title font-weight-light">Profile</span>
            </v-card-title>

            <v-card-text class="headline font-weight-bold">
              <h4>
                {{ this.data.firstname }}&nbsp;{{
                  this.data.lastname
                }}
              </h4>
              <h5>Email : {{ this.data.email }}</h5>
              <h5>Gender : {{ this.data.Gender }}</h5>
              <h5>Birthday : {{ this.data.date }}</h5>
            </v-card-text>

            <v-card-actions>
              <v-list-item class="grow">
                <v-list-item-content>
                  <v-list-item-title>Feeling now</v-list-item-title>
                </v-list-item-content>
                <v-btn
                  class="mx-2"
                  fab
                  dark
                  color="indigo"
                  :href="this.data.fb"
                  target="_blank"
                >
                  <v-icon dark> mdi-facebook </v-icon>
                </v-btn>

                <v-btn
                  :href="this.data.ig"
                  target="_blank"
                  class="mx-2"
                  fab
                  dark
                  color="purple"
                >
                  <v-icon dark> mdi-instagram </v-icon>
                </v-btn>

                <v-btn
                  :href="this.data.tw"
                  target="_blank"
                  class="mx-2"
                  fab
                  dark
                  color="cyan"
                >
                  <v-icon dark> mdi-twitter </v-icon>
                </v-btn>
              </v-list-item>
            </v-card-actions>
          </v-card>
        </v-card>
      </v-row>
    </v-container>
  </div>
</template>
<script>
export default {
    data() {
    return {
      data: this.$route.params,
    }
  },
}
</script>