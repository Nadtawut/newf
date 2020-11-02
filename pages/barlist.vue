<template>
  <v-card color="basil">
      <v-card-title class="text-center justify-center py-6">
      <h1 class="font-weight-bold display-3 basil--text">
        Name Event
      </h1>
    </v-card-title>
    <v-tabs
      v-model="tab"
      background-color="transparent"
      color="basil"
      grow
    >
      <v-tab>
        <v-icon left>
          mdi-calendar-plus
        </v-icon>
        calendar
      </v-tab>
      <v-tab>
        <v-icon left>
          mdi-chat-outline
        </v-icon>
        group chat
      </v-tab>
     
      <v-tab-item>
        <v-card flat>
          <v-card>
              <feture/>
          </v-card>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <v-card>
        <inspire/>
          </v-card>
        </v-card>
      </v-tab-item>

    </v-tabs>
  </v-card>
</template>
<script>
import feture from './feture';
import inspire from './inspire';
  export default {
      components: {
        feture,
        inspire,
    },
    data () {
      return {
        tab: null,
      }
    },
  }
</script>