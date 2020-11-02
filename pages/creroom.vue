<template>
  <v-container>
    <v-form
      @submit.prevent="addData"
      ref="form"
      v-model="valid"
      lazy-validation
    >
      <v-text-field
        v-model="name"
        style="2"
        label="Event name"
        :rules="[(v) => !!v || 'Name is required']"
        required
      ></v-text-field>
      <v-btn color="primary" class="mr-4" :disabled="!valid" @click="addData">
        Submit
      </v-btn>
      <v-dialog v-model="dialog" max-width="290">
        <v-card>
          <v-card-title class="headline"> Creat Room </v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="dialog = false">
              Disagree
            </v-btn>
            <v-btn color="green darken-1" text @click="dialog = false">
              Agree
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-btn color="warning" class="mr-4" @click="reset"> Reset Form </v-btn>
    </v-form>
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
      files: [],
      Description: '',
      picker: '',
      img: undefined,
      picture: [],
      uploadValue: 0,
      name: '',
      status: '',
      price: '',
      valid: true,
      dialog: false,
      phone: '',
    }
  },
  methods: {
    addData() {
      this.$refs.form.validate()
      if (this.name && this.price && this.status) {
        var dataText = {
          name: this.name,
          status: this.status,
          price: this.price,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          ownerId: this.$store.getters.currentuser.userId,
          ownername: this.$store.getters.currentuser.username,
          itemId: db.collection('Items').doc().id,
          img: this.picture,
          des: this.Description,
          date: new Date().toJSON().slice(0, 10).replace(/-/g, '/'),
        }
        db.collection('Items')
          .doc(dataText.itemId)
          .set(dataText)
          .then(() => {
            console.log(this.itemId)
          })
          .catch(function (error) {
            console.error('Error writing document: ', error)
          })
        this.$refs.form.reset()
        this.dialog = true
        this.picture = ''
        this.uploadValue = 0
      }
    },
    reset() {
      this.$refs.form.reset()
    },
    checkuser() {
      var data = auth.onAuthStateChanged((user) => {
        if (!user) {
          this.$router.replace('/')
        }
      })
    },
    onUpload() {
      for (var i = 0; i < this.files.length; i++) {
        let userId = firebase.auth().currentUser.uid
        let file = this.files[i]
        var storageRef = firebase
          .storage()
          .ref('ImageItems/' + userId)
          .child(file.name)
        let uploadTask = storageRef.put(file)
        this.picture = []
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            this.uploadValue =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          },
          (error) => {
            // eslint-disable-next-line no-undef
            console.log(error, message)
          },
          () => {
            this.uploadValue = 100
            uploadTask.snapshot.ref.getDownloadURL().then((url) => {
              this.picture.push(url)
            })
          }
        )
      }
    },
  },
  created() {
    this.checkuser()
  },
}
</script>

<style scoped>
img.preview {
  width: 200px;
}
</style>