<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col cols="6">
        <v-text-field
          v-model="search"
          label="search"
          filled
          rounded
          dense
        ></v-text-field>
      </v-col>
    </v-row>
    <div>
      <v-row justify="center">
        <v-col>
          <div v-if="filterUsers() == ''">
            <v-row justify="center" align="center" >
            </v-row>
          </div>
          <div v-else >
            <v-card
              class="mx-auto"
              width="500"
              outlined v-for="users in filterUsers()"
              :key="users.userId">
              <v-list-item three-line>
                <v-list-item-content>
                  <div class="overline mb-4">
                    {{ users.firstname }}&nbsp;{{users.lastname}}
                  </div>
                  <v-list-item-title class="headline mb-1">
                    {{ users.username }}
                  </v-list-item-title>
                  <v-list-item-subtitle>{{ users.email }}</v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-avatar tile size="80" color="grey">
                  <img :src="users.img" />
                </v-list-item-avatar>
              </v-list-item>

              <v-card-actions>
                <v-btn
                  outlined
                  rounded
                  text
                  :to="{
                    name: 'chat',
                    query: { q: users.userId },
                  }"
                >
                  Chat
                </v-btn>
              </v-card-actions>
            </v-card>
          </div>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import firebase from 'firebase/app'
import { storage } from '~/plugins/firebaseConfig.js'
import { db } from '~/plugins/firebaseConfig.js'
import { auth } from '~/plugins/firebaseConfig.js'
export default {
  data: function () {
    return {
      imgUrl: '',
      fileImage: null,
      userdata: [],
      search: '',
      users: [],
    }
  },
  methods: {
    getData() {
      db.collection('User')
        .onSnapshot((querySnapshot) => {
          const data = []
          querySnapshot.forEach((doc) => {
            data.push(doc.data())
          })
          this.userdata = data
        })
    },
    checklogin() {
      const data = auth.onAuthStateChanged((user) => {
        if (user.uid == this.$route.params.ProId) {
          this.$router.replace('/MyProfile')
        }
      })
    },
    setdefault() {
      this.getuser()
    },
    filterUsers() {
      return this.userdata.filter((card) => {
        return card.username.toLowerCase().match(this.search.toLowerCase())
      })
    }, 
  },
  created() {
    this.checklogin()
    this.getData()
  },
  computed() {
    this.filterSellCard()
  },
}
</script>

<style>
</style>