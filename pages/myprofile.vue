<template>
  <div>
    <v-container class="hidden-sm-and-down">
      <v-row justify="space-around">
        <v-card height="500px" width="900">
          <v-img :src="currentuser[0].bg" height="300px">
            <v-app-bar flat color="rgba(0, 0, 0, 0)">
              <v-spacer></v-spacer>
              <v-dialog
                v-model="dialog"
                fullscreen
                hide-overlay
                transition="dialog-bottom-transition"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn color="green" dark v-bind="attrs" v-on="on">
                    <v-icon>mdi-wrench</v-icon>
                  </v-btn>
                </template>
                <v-card>
                  <v-toolbar dark color="primary">
                    <v-btn icon dark @click="dialog = false">
                      <v-icon>mdi-close</v-icon>
                    </v-btn>
                    <v-toolbar-title>Edit Profile</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                      <v-btn dark text @click="update(), (dialog = false)">
                        Save
                      </v-btn>
                    </v-toolbar-items>
                  </v-toolbar>
                  <v-form ref="form" @submit.prevent="addData">
                    <v-container>
                      <v-row justify="space-around">
                        <v-card justify-Center height="300px" width="900">
                          <v-img height="300px" :src="currentuser[0].bg">
                            <v-app-bar flat color="rgba(0, 0, 0, 0)">
                              <v-spacer></v-spacer>
                              <div v-if="!bgimg">
                                <v-file-input
                                  hide-input
                                  v-model="bgimg"
                                  prepend-icon="mdi-image-edit"
                                  class="green"
                                ></v-file-input>
                              </div>
                              <div v-else>
                                <v-btn @click="backgound" icon
                                  ><v-icon color="success">mdi-upload</v-icon>
                                </v-btn>
                              </div>
                            </v-app-bar>
                            <v-card-title class="white--text mt-8">
                              <v-avatar size="150px">
                                <v-img
                                  alt="user"
                                  :src="currentuser[0].img"
                                ></v-img>
                              </v-avatar>
                            </v-card-title>
                          </v-img>
                        </v-card>
                      </v-row>
                    </v-container>
                    <v-container>
                      <v-row justify="center">
                        <v-col md="4">
                          <div v-if="!fimg">
                            <v-file-input
                              label="update Avatar"
                              prepend-icon="mdi-camera"
                              v-model="fimg"
                            ></v-file-input>
                          </div>
                          <div v-else>
                            <v-btn @click="profile" color="green" block
                              ><v-icon>mdi-upload</v-icon></v-btn
                            >
                          </div>
                        </v-col>
                      </v-row>
                    </v-container>
                    <v-container>
                      <v-row justify="center">
                        <v-col md="4">
                          <v-text-field
                            v-model="currentuser[0].firstname"
                            label="First name"
                            outlined
                          ></v-text-field>
                        </v-col>
                        <v-col md="4">
                          <v-text-field
                            v-model="currentuser[0].lastname"
                            label="Last name"
                            required
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                    <v-container>
                      <v-row justify="center">
                        <v-col md="1">
                          <v-btn
                            class="mx-2"
                            fab
                            dark
                            color="indigo"
                            target="_blank"
                          >
                            <v-icon dark> mdi-facebook </v-icon>
                          </v-btn>
                        </v-col>
                        <v-col md="7"
                          ><v-text-field
                            v-model="currentuser[0].fb"
                            label="link-facebook"
                            required
                          ></v-text-field
                        ></v-col>
                      </v-row>
                    </v-container>
                    <v-container>
                      <v-row justify="center">
                        <v-col md="1">
                          <v-btn class="mx-2" fab dark color="purple">
                            <v-icon dark> mdi-instagram </v-icon>
                          </v-btn>
                        </v-col>
                        <v-col md="7"
                          ><v-text-field
                            v-model="currentuser[0].ig"
                            label="link-instagram"
                            required
                          ></v-text-field
                        ></v-col>
                      </v-row>
                    </v-container>
                    <v-container>
                      <v-row justify="center">
                        <v-col md="1">
                          <v-btn class="mx-2" fab dark color="cyan">
                            <v-icon dark> mdi-twitter </v-icon>
                          </v-btn>
                        </v-col>
                        <v-col md="7"
                          ><v-text-field
                            v-model="currentuser[0].tw"
                            label="link-twitter"
                            required
                          ></v-text-field
                        ></v-col>
                      </v-row>
                    </v-container>
                  </v-form>
                </v-card>
              </v-dialog>
            </v-app-bar>
            <v-spacer></v-spacer>
            <v-card-title class="white--text mt-12">
              <v-avatar size="150px">
                <v-img alt="user" :src="currentuser[0].img"> </v-img>
              </v-avatar>
              <h1 class="ml-10">
                {{ this.currentuser[0].firstname }}&nbsp;{{
                  this.currentuser[0].lastname
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
              <h5>Email : {{ this.currentuser[0].email }}</h5>
              <h5>Gender : {{ this.currentuser[0].Gender }}</h5>
              <h5>Birthday : {{ this.currentuser[0].date }}</h5>
            </v-card-text>

            <v-card-actions>
              <v-list-item class="grow">
                <v-list-item-avatar color="grey darken-3">
                  <v-img
                    class="elevation-6"
                    alt=""
                    :src="currentuser[0].img"
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
                  :href="currentuser[0].fb"
                  target="_blank"
                >
                  <v-icon dark> mdi-facebook </v-icon>
                </v-btn>

                <v-btn
                  :href="currentuser[0].ig"
                  target="_blank"
                  class="mx-2"
                  fab
                  dark
                  color="purple"
                >
                  <v-icon dark> mdi-instagram </v-icon>
                </v-btn>

                <v-btn
                  :href="currentuser[0].tw"
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
          <v-img :src="currentuser[0].bg" height="250px">
            <v-app-bar flat color="rgba(0, 0, 0, 0)">
              <v-spacer></v-spacer>
              <v-dialog
                v-model="dialog"
                fullscreen
                hide-overlay
                transition="dialog-bottom-transition"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn color="green" dark v-bind="attrs" v-on="on">
                    <v-icon>mdi-wrench</v-icon>
                  </v-btn>
                </template>
                <v-card>
                  <v-toolbar dark color="primary">
                    <v-btn icon dark @click="dialog = false">
                      <v-icon>mdi-close</v-icon>
                    </v-btn>
                    <v-toolbar-title>Edit Profile</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                      <v-btn dark text @click="update(), (dialog = false)">
                        Save
                      </v-btn>
                    </v-toolbar-items>
                  </v-toolbar>
                  <v-form ref="form" @submit.prevent="addData">
                    <v-container>
                      <v-row justify="space-around">
                        <v-card justify-Center height="300px" width="900">
                          <v-img height="300px" :src="currentuser[0].bg">
                            <v-app-bar flat color="rgba(0, 0, 0, 0)">
                              <v-spacer></v-spacer>
                              <div v-if="!bgimg">
                                <v-file-input
                                  hide-input
                                  v-model="bgimg"
                                  prepend-icon="mdi-image-edit"
                                  class="green"
                                ></v-file-input>
                              </div>
                              <div v-else>
                                <v-btn @click="backgound" icon
                                  ><v-icon color="success">mdi-upload</v-icon>
                                </v-btn>
                              </div>
                            </v-app-bar>
                            <v-card-title class="white--text mt-8">
                              <v-avatar size="150px">
                                <v-img
                                  alt="user"
                                  :src="currentuser[0].img"
                                ></v-img>
                              </v-avatar>
                            </v-card-title>
                          </v-img>
                        </v-card>
                      </v-row>
                    </v-container>
                    <v-container>
                      <v-row justify="center">
                        <v-col md="4">
                          <div v-if="!fimg">
                            <v-file-input
                              label="update Avatar"
                              prepend-icon="mdi-camera"
                              v-model="fimg"
                            ></v-file-input>
                          </div>
                          <div v-else>
                            <v-btn @click="profile" color="green" block
                              ><v-icon>mdi-upload</v-icon></v-btn
                            >
                          </div>
                        </v-col>
                      </v-row>
                    </v-container>
                    <v-container>
                      <v-row justify="center">
                        <v-col md="4">
                          <v-text-field
                            v-model="currentuser[0].firstname"
                            label="First name"
                            outlined
                          ></v-text-field>
                        </v-col>
                        <v-col md="4">
                          <v-text-field
                            v-model="currentuser[0].lastname"
                            label="Last name"
                            required
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                    <v-container>
                      <v-row justify="center">
                        <v-col md="1">
                          <v-btn
                            class="mx-2"
                            fab
                            dark
                            color="indigo"
                            target="_blank"
                          >
                            <v-icon dark> mdi-facebook </v-icon>
                          </v-btn>
                        </v-col>
                        <v-col md="7"
                          ><v-text-field
                            v-model="currentuser[0].fb"
                            label="link-facebook"
                            required
                          ></v-text-field
                        ></v-col>
                      </v-row>
                    </v-container>
                    <v-container>
                      <v-row justify="center">
                        <v-col md="1">
                          <v-btn class="mx-2" fab dark color="purple">
                            <v-icon dark> mdi-instagram </v-icon>
                          </v-btn>
                        </v-col>
                        <v-col md="7"
                          ><v-text-field
                            v-model="currentuser[0].ig"
                            label="link-instagram"
                            required
                          ></v-text-field
                        ></v-col>
                      </v-row>
                    </v-container>
                    <v-container>
                      <v-row justify="center">
                        <v-col md="1">
                          <v-btn class="mx-2" fab dark color="cyan">
                            <v-icon dark> mdi-twitter </v-icon>
                          </v-btn>
                        </v-col>
                        <v-col md="7"
                          ><v-text-field
                            v-model="currentuser[0].tw"
                            label="link-twitter"
                            required
                          ></v-text-field
                        ></v-col>
                      </v-row>
                    </v-container>
                  </v-form>
                </v-card>
              </v-dialog>
            </v-app-bar>
            <v-spacer></v-spacer>
            <v-card-title class=" mt-12">
             <v-avatar size="100px" >
                <v-img alt="user" :src="currentuser[0].img"> </v-img>
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
                {{ this.currentuser[0].firstname }}&nbsp;{{
                  this.currentuser[0].lastname
                }}
              </h4>
              <h5>Email : {{ this.currentuser[0].email }}</h5>
              <h5>Gender : {{ this.currentuser[0].Gender }}</h5>
              <h5>Birthday : {{ this.currentuser[0].date }}</h5>
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
                  :href="currentuser[0].fb"
                  target="_blank"
                >
                  <v-icon dark> mdi-facebook </v-icon>
                </v-btn>

                <v-btn
                  :href="currentuser[0].ig"
                  target="_blank"
                  class="mx-2"
                  fab
                  dark
                  color="purple"
                >
                  <v-icon dark> mdi-instagram </v-icon>
                </v-btn>

                <v-btn
                  :href="currentuser[0].tw"
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
import firebase from 'firebase/app'
import { auth, db } from '~/plugins/firebaseConfig.js'

export default {
  data:() => {
    return {
      fimg: null,
      bgimg: null,
      dialog: false,
      userdata: [],
      currentuser: [
        { firstname: '' },
        { lastname: '' },
        { email: '' },
        { username: '' },
        { userId: '' },
        { img: '' },
        { date: ''},
        { fb: null },
        { ig: null },
        { tw: null },
      ],
    }
  },
  created() {
    this.getuser()
    this.checklogin()
  },
  methods: {
    getuser() {
      const data = auth.onAuthStateChanged((user) => {
        if (user) {
          const userId = firebase.auth().currentUser.uid
          db.collection('User')
            .where('userId', '==', userId)
            .onSnapshot((querySnapshot) => {
              const data = []
              querySnapshot.forEach((doc) => {
                data.push(doc.data())
              })
              const userdata = data
              // eslint-disable-next-line no-console
              console.log(userdata)
              this.currentuser = data
            })
        }
      })
    },
    checklogin() {
      const data = auth.onAuthStateChanged((user) => {
        if (!user) {
          this.$router.replace('/')
        }
      })
    },
    update() {
      var updatedata = {
        firstname: this.currentuser[0].firstname,
        lastname: this.currentuser[0].lastname,
        img: this.currentuser[0].img,
        bg: this.currentuser[0].bg,
        fb: this.currentuser[0].fb,
        ig: this.currentuser[0].ig,
        tw: this.currentuser[0].tw,
      }
      db.collection('User').doc(this.currentuser[0].userId).update(updatedata)
      location.reload()
    },
    setdefault() {
      this.getuser()
    },
    profile() {
      const storageRef = firebase
        .storage()
        .ref('Profile/' + this.currentuser[0].userId)
        .put(this.fimg)
      storageRef.on('state_changed', () => {
        storageRef.snapshot.ref.getDownloadURL().then((url) => {
          this.currentuser[0].img = url
        })
      })
    },
     backgound() {
      const storageRef = firebase
        .storage()
        .ref('background/' + this.currentuser[0].userId)
        .put(this.bgimg)
      storageRef.on('state_changed', () => {
        storageRef.snapshot.ref.getDownloadURL().then((link) => {
          this.currentuser[0].bg = link
        })
      })
    },
  },
}
</script>

<style></style>