<template>
  <v-app dark>
    <!--แถบข้าง-->
    <v-navigation-drawer
      v-model="drawer"
      fixed
      app
      class="hidden-sm-and-down"
      v-if="this.$store.state.isLoggedIn == true">
      <v-list-item>
        <v-list>
          <v-row justify="center">
            <v-avatar size="70">
              <img :src="this.$store.state.currentuser.img" />
            </v-avatar>
          </v-row>
          <v-list-item link>
            <v-list-item-content>
              <v-list-item-title class="title">
                <v-body>
                  <v-row justify="center">
                  {{ this.$store.state.currentuser.firstname }}
                  {{ this.$store.state.currentuser.lastname }}
                  </v-row>
                </v-body>
              </v-list-item-title>
              <v-list-item-subtitle>
                <v-row justify="center">
                {{ this.$store.state.currentuser.email }}
                </v-row>
              </v-list-item-subtitle>
              <v-list nav dense>
                <v-list-item link nuxt to="/myprofile">
                  <v-list-item-icon>
                    <v-icon>mdi-account</v-icon>
                  </v-list-item-icon>
                  <v-list-item-title>My Profile</v-list-item-title>
                </v-list-item>
                  <v-list-item link nuxt to="/barlist">
                  <v-list-item-icon>
                    <v-icon>mdi-account-multiple-plus-outline</v-icon>
                  </v-list-item-icon>
                  <v-list-item-title>Comunity</v-list-item-title>
                </v-list-item>
                <v-list-item v-if="this.$store.state.currentuser.admin == true" link nuxt to="/admin">
                  <v-list-item-icon>
                    <v-icon>mdi-pencil</v-icon>
                  </v-list-item-icon>
                  <v-list-item-title>ADMIN</v-list-item-title>
                </v-list-item>
                <v-list-item @click="logout">
                  <v-list-item-icon>
                    <v-icon>mdi-logout</v-icon>
                  </v-list-item-icon>
                  <v-list-item-title>Logout</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-list-item>
    </v-navigation-drawer>
    <!--แถบบนมือถือ-->
    <v-app-bar fixed app class="hidden-md-and-up">
      <v-list-item link nuxt to="/">
      <v-toolbar-title v-text="title" />
      </v-list-item>
    <v-row justify="end">
    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          v-bind="attrs"
          v-on="on"
        >
          <v-icon>mdi-menu</v-icon>
        </v-btn>
      </template>
      <v-list >
        <!--login-->
        <v-list v-if="this.$store.state.isLoggedIn == true">
          <v-list-item link>
            <v-list-item-content>
              <v-row justify="center">
                <v-avatar size="60">
                  <img :src="this.$store.state.currentuser.img" />
                </v-avatar>
              </v-row>
              <v-list-item-title class="title">
                <v-body>
                  <v-row justify="center">
                  {{ this.$store.state.currentuser.firstname }}
                  {{ this.$store.state.currentuser.lastname }}
                  </v-row>
                </v-body>
              </v-list-item-title>
              <v-list-item-subtitle>
                <v-row justify="center">
                {{ this.$store.state.currentuser.email }}
                </v-row>
              </v-list-item-subtitle>
              <v-list nav dense>
                <v-list-item link nuxt to="/myprofile">
                  <v-list-item-icon>
                    <v-icon>mdi-account</v-icon>
                  </v-list-item-icon>
                  <v-list-item-title>My Profile</v-list-item-title>
                </v-list-item>
                <v-list-item link nuxt to="/barlist">
                  <v-list-item-icon>
                    <v-icon>mdi-account-multiple-plus-outline</v-icon>
                  </v-list-item-icon>
                  <v-list-item-title>Comunity</v-list-item-title>
                </v-list-item>
                <v-list-item v-if="this.$store.state.currentuser.admin == true" link nuxt to="/admin">
                  <v-list-item-icon>
                    <v-icon>mdi-pencil</v-icon>
                  </v-list-item-icon>
                  <v-list-item-title>ADMIN</v-list-item-title>
                </v-list-item>
                <v-list-item @click="logout">
                  <v-list-item-icon>
                    <v-icon>mdi-logout</v-icon>
                  </v-list-item-icon>
                  <v-list-item-title>Logout</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <!--notlogin-->
        <v-list v-else>
          <v-list nav dense>
            <v-list-item link nuxt to="/login">
              <v-list-item-icon>
                <v-icon>mdi-login</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Login</v-list-item-title>
            </v-list-item>
            <v-list-item link nuxt to="/Register">
              <v-list-item-icon>
                <v-icon>mdi-account-plus</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Register</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-list>
      </v-list>
    </v-menu>
    </v-row>
    </v-app-bar>
    <!--แถบบนคอม-->
    <v-app-bar   fixed app class="hidden-sm-and-down">
      <v-btn @click.stop="drawer = !drawer" text><v-toolbar-title v-text="title"  /></v-btn>
      <v-spacer />
      <!--login-->
      <div
        v-if="this.$store.state.isLoggedIn == true"
        class="d-flex justify-center align-center">
        <v-col>
          <v-btn v-if="this.$store.state.currentuser.admin == true" class="text-uppercase" link nuxt to="admin" text >ADMIN</v-btn>
          <v-btn @click.stop="drawer = !drawer" @click="main">HOME</v-btn>
        </v-col>
      </div>
      <!--notlogin-->
      <div v-else>
        <v-dialog v-model="dialog" persistent max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark v-bind="attrs" v-on="on"
              ><v-icon>mdi-login</v-icon> Login
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline"><v-icon>mdi-login</v-icon>Login</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col class="d-flex justify-center">
                    <img
                      height="200"
                      src="https://sv1.picz.in.th/images/2020/10/07/OJWUZD.png"
                    />
                  </v-col>
                </v-row>
                <v-form ref="form" v-model="valid">
                  <v-row>
                    <v-col cols="12" sm="6" md="4"> </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="email"
                        :rules="emailRules"
                        label="E-mail"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="password"
                        :rules="passRules"
                        label="Password"
                        required
                        :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                        @click:append="show = !show"
                        :type="show ? 'text' : 'password'"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-form>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                :disabled="!valid"
                color="blue darken-1"
                text
                @click="login(), (dialog = false)"
              >
                Submit
              </v-btn>
              <v-btn color="blue darken-1" text @click="dialog = false">
                Close
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-btn color="green" nuxt to="/Register"
          ><v-icon>mdi-account-plus</v-icon>Register</v-btn
        >
      </div>
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>
<script>
import { db } from '~/plugins/firebaseConfig.js'
import firebase from 'firebase/app'
import { auth } from '~/plugins/firebaseConfig.js'
export default {
  data: () => {
    return {
      show: false,
      valid: true,
      email: '',
      emailRules: [(v) => !!v || 'E-mail is required'],
      password: '',
      passRules: [(v) => !!v || 'Password is required'],
      dialog: false,
      miniVariant: false,
      clipped: false,
      drawer: null,
      right: true,
      rightDrawer: false,
      title: 'NEW FRIND',
    }
  },
  methods: {
    log() {
      this.login()
    },
    login() {
      this.$refs.form.validate()
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          console.log('ล็อคอินสำเร็จ')
          var userId = firebase.auth().currentUser.uid
          db.collection('User')
            .doc(userId)
            .onSnapshot((querySnapshot) => {
              const data = []
              querySnapshot.forEach((doc) => {
                data.push(doc.data())
              })
              let userdata = data
              console.log(userdata)
              this.$store.dispatch('setUser', userdata)
            })
          this.dialogsucess = true
          this.$router.replace('/')
        })
        .catch((err) => {
          this.error = err.message
        })
    },
    checkuser() {
      var data = auth.onAuthStateChanged((user) => {
        if (user) {
          var userId = firebase.auth().currentUser.uid
          db.collection('User')
            .where('userId', '==', userId)
            .onSnapshot((querySnapshot) => {
              const data = []
              querySnapshot.forEach((doc) => {
                data.push(doc.data())
              })
              let userdata = data
              console.log(userdata)
              this.$store.dispatch('setUser', userdata)
            })
        }
      })
    },
    logout() {
      this.$store.dispatch('logout')
      this.rightDrawer = false
      auth
        .signOut()
        .then( () => {
          this.$router.replace('/')
          console.log('ออกจากระบบแล้ว')
        })
        .catch(function (error) {
          // An error happened.
        })
    },
    main() {
      this.$router.replace('/')
    },
  },
  created() {
    this.checkuser()
  },
}
</script>