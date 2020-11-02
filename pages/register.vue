<template>
  <div>
    <v-card>
      <v-row justify="center">
        <img
          src="https://sv1.picz.in.th/images/2020/10/07/OJWUZD.png"
          height="200"
          width="400"
        />
        <v-col md="8">
          <br />
          <!--แบบฟอร์มให้กรอกข้อมูล-->
          <v-form ref="form" v-model="valid" @submit.prevent="addData">
            <v-container>
              <v-row justify="center">
                <v-col md="10">
                  <v-text-field
                    v-model="email"
                    :rules="emailRules"
                    label="E-mail"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
            <v-container>
              <v-row justify="center">
                <v-col md="10">
                  <v-text-field
                    v-model="username"
                    :rules="usernameRules"
                    label="UserName"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
            <v-container>
              <v-row justify="center">
                <v-col md="5">
                  <v-text-field
                    v-model="password"
                    :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="passwordRules"
                    :type="show ? 'text' : 'password'"
                    name="input-10-1"
                    label="Password"
                    required
                    @click:append="show = !show"
                  ></v-text-field>
                </v-col>
                <v-col md="5">
                  <v-text-field
                    v-model="confirm"
                    block
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="[passwordMatch]"
                    :type="show1 ? 'text' : 'password'"
                    name="input-10-1"
                    label="Confirm Password"
                    required
                    @click:append="show1 = !show1"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
            <v-container>
              <v-row justify="center">
                <v-col md="5">
                  <v-text-field
                    v-model="firstname"
                    :rules="[(v) => !!v || 'firstname is required']"
                    label="First name"
                    required
                  ></v-text-field>
                </v-col>
                <v-col md="5">
                  <v-text-field
                    v-model="lastname"
                    :rules="[(v) => !!v || 'lastname is required']"
                    label="Last name"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
            <!--ปุ่มฟังชั่นต่างๆ-->
            <v-container>
              <v-row justify="center">
                <v-col md="10">
                  <v-menu
                    ref="menu"
                    v-model="menu"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="date"
                        label="Birthday date"
                        :rules="[(v) => !!v || 'Birthday is required']"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      ref="picker"
                      v-model="date"
                      :max="new Date().toISOString().substr(0, 10)"
                      min="1950-01-01"
                      @change="save"
                    ></v-date-picker>
                  </v-menu>
                </v-col>
              </v-row>
            </v-container>
            <v-row justify="center">
              <v-radio-group v-model="row" row>
                <label for="row">Gender</label>
                <v-radio label="male" value="male"></v-radio>
                <v-radio label="famale" value="famale"> </v-radio>
              </v-radio-group>
            </v-row>
            
            <v-row justify="center">
              <v-card-actions>
              <v-col md="6">
                <v-btn
                  color="success"
                
                  :disabled="!valid"
                  :loading="isLoading"
                  @click="addData">
                  Submit
                </v-btn>
              </v-col>
               <v-col md="3">
                <v-btn @click="main">Cancel</v-btn>
              </v-col>
              </v-card-actions>
            </v-row>
            <v-dialog v-model="errordialog" max-width="400">
              <v-card>
                <v-card-title class="headline"> Sonmthing wrong </v-card-title>
                <v-card-text> {{ error }} </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="green darken-1"
                    text
                    @click="errordialog = false"
                  >
                    Try again
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-form>
          <br />
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>
<script>
import firebase from 'firebase/app'
import { storage } from '~/plugins/firebaseConfig.js'
import { db } from '~/plugins/firebaseConfig.js'
import { auth } from '~/plugins/firebaseConfig.js'
export default {
  data: () => {
    return {
      errordialog: false,
      bgimg:
        'https://s1.best-wallpaper.net/wallpaper/m/1908/Abstract-background-lines-curves-light_m.webp',
      picture:
        'https://www.exstrompt.com/wp-content/uploads/2015/07/placeholder-user.jpg',
      username: '',
      email: '',
      password: '',
      confirm: '',
      uid: '',
      admin: false,
      flieImages: null,
      firstname: '',
      lastname: '',
      date: null,
      menu: false,
      row: null,
      valid: false,
      show: false,
      show1: false,
      error: null,
      usernameRules: [(v) => !!v || 'Username is requried'],
      emailRules: [
        (v) => !!v || 'E-mail is required',
        (v) => /.+@.+/.test(v) || 'E-mail must be valid',
      ],
      passwordRules: [
        (v) => !!v || 'Password is required',
        (v) =>
          (v && v.length >= 8) || 'Password must be more then 8 characters  ',
      ],
    }
  },
  computed: {
    passwordMatch() {
      return () => this.password === this.confirm || 'Password must match'
    },
  },
  watch: {
    menu(val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
    },
  },
  methods: {
    save(date) {
      this.$refs.menu.save(date)
    },
    addData() {
      var data = {
        email: this.email,
        username: this.username,
        firstname: this.firstname,
        password: this.password,
        lastname: this.lastname,
        date: this.date,
        Gender: this.row,
        admin: this.admin,
        img: this.picture,
        bg: this.bgimg,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      }
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(() => {
          var user = firebase.auth().currentUser
          var userID = { userId: user.uid }
          db.collection('User').doc(user.uid).set(data)
          db.collection('User').doc(user.uid).update(userID)
          this.$refs.form.reset()
          this.$router.replace('/')
        })
        .catch((error) => {
          var errorMessage = error.message
          this.error = errorMessage
          this.errordialog = true
        })
      this.picture = ''
      this.uploadValue = 0
    },
    main() {
      this.$router.replace('/')
    },
    reset() {
      this.$refs.form.reset()
    },
  },
}
</script>