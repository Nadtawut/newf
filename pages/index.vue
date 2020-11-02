<template>
  <v-container>
    <v-container>
      <v-chip-group column>
      <v-card v-for="data in userdata" class="mx-auto" max-width="344" outlined>
        <v-list-item three-line>
          <v-list-item-content>
            <div class="overline mb-4">{{ data.firstname }}&nbsp;{{data.lastname}}</div>
            <v-list-item-title class="headline mb-1">
            </v-list-item-title>
            <v-list-item-subtitle>{{ data.email }}</v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-avatar tile size="80" color="grey"><img :src="data.img"></v-list-item-avatar>
        </v-list-item>
        <v-card-actions>
          <nuxt-link
          :to="{
            name: 'profile-pro',
            params: {
              img: data.img,
              bg: data.bg,
              firstname: data.firstname,
              lastname: data.lastname,
              date: data.date,
              email: data.email,
              fb: data.fb,
              ig: data.ig,
              tw: data.tw,
              Gender: data.Gender,
            },
          }"
        >
           <v-btn outlined rounded text> go </v-btn>
        </nuxt-link>
        </v-card-actions>
      </v-card>
      </v-chip-group>
    </v-container>
    <v-container>
      <v-card width="400px"></v-card>
    </v-container>
  </v-container>
</template>
<script>
import firebase from 'firebase/app'
import { auth, db } from '~/plugins/firebaseConfig.js'

export default {
  data: () => {
    return {
      imgUrl: '',
      fileImage: null,
      userdata: [],
    }
  },
  created() {
    this.checklogin()
    this.getData()
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
  },
}
</script>

<style></style>