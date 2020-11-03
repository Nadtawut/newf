
<template>
  <v-card class="mx-auto purple lighten-2">
    <v-app-bar
      dark
      color="blue"
      class="d-flex justify-space-around"
    >
      <v-toolbar-title>Chat : Name Event</v-toolbar-title>  
    </v-app-bar>
    <v-container>
      <v-row dense>
        <v-col cols="12">
          <ul>
     <v-card
    class="overflow-auto"
    max-height="500">
  <v-card-text v-if="users.length == 0">
                    No messages
                </v-card-text>
    <v-card-text>
      <div v-for="user in users" :key="user.id" >
        <v-card class="grey">
          <v-col
          md="4">
      <v-card class="text-center light-blue">{{user.name}} </v-card>
            </v-col>
        <v-card-subtitle>
           <v-col >{{user.message}}
            </v-col>
            <v-row>
             <v-col cols="12" md="2"></v-col>
             <v-col cols="12" md="2"></v-col>
             <v-col cols="12" md="2"></v-col>
             <v-col cols="12" md="2"></v-col>
             <v-col cols="12" md="2"></v-col>
             <v-col
           cols="12"
          md="2"
        >
      <v-card class="text-center red">{{user.timestamp}}</v-card>
            </v-col>
            </v-row>
            </v-card-subtitle>
            </v-card>
            <br>
      </div>
    </v-card-text>
  </v-card>
  </ul>
  <br> 
  <v-card>
  <CreateMessage/>
  </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
  
</template>
<script>
import firebase from 'firebase/app'
import { db } from '~/plugins/firebaseConfig.js'
import moment from 'moment';
import CreateMessage from './CreateMessage';
  export default {
     scrollToTop: true,
    components: {
        CreateMessage
    },
    data: () => ({
      benched: 0,
            users: [],
            scrollInvoked: 0,
    }),
    methods: {
      onScroll () {
        this.scrollInvoked++
      },
    },
    created() {
        let ref = db.collection('Messages').orderBy('timestamp');
        console.log(this.users)
        ref.onSnapshot(snapshot => {
            snapshot.docChanges().forEach(change => {
                if (change.type = 'added') {
                    let doc = change.doc;
                    this.users.push({
                        id: doc.id,
                        name: doc.data().name,
                        message: doc.data().message,
                        timestamp: moment(doc.data().timestamp).format('LTS')
                    });
                }
            });
        });
    }
  }
</script>