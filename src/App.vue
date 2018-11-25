<template>
  <ScrollView id="app">
    <LinearLayout>
      <TextView :text="pageTitle"></TextView>

      <RadioGroup name="branch" v-model="currentBranch" :options="branches"></RadioGroup>
    
      <TextView :text="'vuejs/vue@' + currentBranch"></TextView>
      
      <LinearLayout>
        <TextView
          v-for="record in commits"
          :key="record.sha"
          :text="record.sha.slice(0, 7) + ', ' + record.commit.message + ', ' + record.commit.author.name"
        ></TextView>
      </LinearLayout>
    </LinearLayout>
  </ScrollView>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

const apiURL = 'https://api.github.com/repos/vuejs/vue/commits?per_page=3&sha=';

export default {
  name: 'App',
  data(): object {
    return {
      pageTitle: 'Vue Morph',
      branches: ['master', 'dev'],
      currentBranch: 'master',
      commits: [],
    };
  },
  created(): void {
    window.setTimeout(() => {
      this.fetchData();
    }, 1000);
  },
  watch: {
    currentBranch() {
      this.fetchData();
    },
  },
  methods: {
    sayHello(message: string) {
      Android.showToast(message);
    },

    fetchData(): void {
      const xhr = new XMLHttpRequest();
      xhr.onload = () => {
        this.commits = JSON.parse(xhr.responseText);
      };
      xhr.open('GET', apiURL + this.currentBranch);
      xhr.send();
    },
  },
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
