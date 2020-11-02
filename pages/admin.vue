<template>
  <v-card
    ><v-card-title>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table :headers="headers" :search="search" :items="dataList" class="elevation-1">
      <template v-slot:item.actions="{ item }">
        <v-icon color="red" medium @click="deleteItem(item.userId)">
          mdi-delete
        </v-icon>
      </template>
    </v-data-table></v-card
  >
</template>
<script>
import firebase from 'firebase/app'
import { db } from '~/plugins/firebaseConfig.js'
export default {
  data: () => ({
    search: '',
    dataList: [],
    headers: [
      {
        text: 'Username',
        align: 'start',
        value: 'username',
      },
      { text: 'E-mail', value: 'email' },
      { text: 'Fistname', value: 'firstname' },
      { text: 'Lasttname', value: 'lastname' },
      { text: 'Gender', value: 'Gender' },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
    desserts: [],
  }),

  created() {
    this.getData()
  },

  methods: {
    getData() {
      db.collection('User').onSnapshot((querySnapshot) => {
        var data = []
        querySnapshot.forEach((doc) => {
          data.push(doc.data())
        })
        this.dataList = data
      })
    },

    deleteItem(item) {
      if(confirm('Are you sure ?')){
      db.collection('User').doc(item).delete().then(()=>{
        console.log("Sucucessfully deleted!")
      }).catch((error)=>{
        console.log("Error removing !!")
      })
      }
    },
  },
}
</script>