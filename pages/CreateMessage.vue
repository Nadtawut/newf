
<template>
  <v-form @submit.prevent="createMessage">
    <v-container>   
    <v-row>  
        <v-col
          cols="12"
          sm="10"
        >
          <v-text-field
            placeholder="Send Something"
            label="Message"
            outlined
            dense
            v-model="newMessage"
            ></v-text-field>
        </v-col>
        <v-col
          cols="12"
        sm="2"
        >
          <v-btn
            color="primary"
            block
            type="submit"
    >
      <v-icon left>
        mdi-send
      </v-icon>
      send
    </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>
<script>
import firebase from 'firebase/app'
import { db } from '~/plugins/firebaseConfig.js'
import moment from 'moment';
export default {
    name: 'CreateMessage',
    props: ['name'],
    data(){
        return {
            newMessage: null,
            errorText: null,
            user:[],
        }
    },
    methods: {
        createMessage () {
            if (this.newMessage) {
                db.collection("Messages").add({
                    uid:firebase.auth().currentUser.uid,
                    message: this.newMessage,
                    timestamp: Date.now(),
                    name:this.user.email
                }).catch(err => {
                    console.log(err);
                });
                this.newMessage = null;
                this.errorText = null;
            } else {
                this.errorText = "A message must be entered first!";
            }
        },

    },
    created() {
        var self = this;
        firebase.auth().onAuthStateChanged(function(user) {
            self.user = user;
        });
        this.user = [];
        firebase
            .firestore()
            .collection("users")
            .get()
            .then(snap => {
                snap.forEach(doc => {
                    var user = doc.data();
                    user.id = doc.id;
                    console.log(doc.data());
                });
            });
    },
}
</script>