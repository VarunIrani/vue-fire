<template>
  <div id="app">
    <div>
      <label for="name">Name: </label>
      <input type="text" name="name" v-model="name"/>
      <button @click="submitName()">ADD</button>
    </div>

    <div>
      <ul>
        <li v-for="personName of names" v-bind:key="personName['.key']">
          <div v-if="!personName.edit">
            <p>{{personName.name}}</p>
            <button @click="removeName(personName['.key'])">REMOVE</button>
            <button @click="setEditName(personName['.key'])">EDIT</button>
          </div>
          <div v-else>
            <input type="text" name="editName" v-model="personName.name">
            <button @click="saveEdit(personName)">SAVE</button>
            <button @click="cancelEdit(personName['.key'])">CANCEL</button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { namesRef } from "./firebase";
export default {
  name: "app",
  data() {
    return {
      name: ""
    };
  },
  firebase: {
    names: namesRef
  },
  methods: {
    submitName() {
      if (this.name !== "") {
        namesRef.push({ name: this.name, edit: false });
        this.name = "";
      }
    },
    removeName(key) {
      namesRef.child(key).remove();
    },
    setEditName(key) {
      namesRef.child(key).update({ edit: true });
    },
    cancelEdit(key) {
      namesRef.child(key).update({ edit: false });
    },
    saveEdit(person) {
      const key = person[".key"];
      namesRef.child(key).set({ name: person.name, edit: false });
    }
  }
};
</script>

<style>
@import url(https://fonts.googleapis.com/css?family=Roboto+Mono);
#app {
  font-family: "Roboto Mono";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  font-size: 24pt;
}

input {
  font-size: 24pt;
  font-family: "Roboto Mono";
}

h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin: 0 10px;
}

a {
  color: #42b983;
}

button {
  background-color: transparent;
  border: 2px solid black;
  font-size: 24pt;
  padding: 0 0.5em 0 0.5em;
  font-family: "Roboto Mono";
}

button:hover {
  cursor: pointer;
}
</style>
