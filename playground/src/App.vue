<script setup>
  import { ref } from 'vue'
  import TodoList from './components/TodoList.vue'
  
  const daily = ref([
  'Hamburger',
  'Pizza',
  'Spaghetti',
  'Tacos',
  'Teriyaki Chicken',
  ]);
  const weekly = ref(['hi']);
  const mustDo = ref(['yo']);
  const pd = ref(['wa']);
  const wantToDo = ref(['sup']);

  const selectedMsg = ref('')

  const hours = ['00:00', '00:30', '01:00', '01:30', '02:00']

  function updateItem(event) {
    event.target.innerHTML = selectedMsg.value
    console.log(selectedMsg)
  }

  function receiveKeys(event) {
    if (event.key === 'q' && event.altKey) {
      selectedMsg.value = ""
    }
    // console.log(event)
  }

  window.addEventListener("keydown", receiveKeys)
</script>

<template>
  <!-- <input type="text" @keydown="removeItem"> -->
  <div class="todo-lists">  
    <TodoList title="Daily" :myList="daily" @select="(msg) => selectedMsg = msg"/>
    <TodoList title="Weekly" :myList="weekly" @select="(msg) => selectedMsg = msg"/>
    <TodoList title="Must Do" :myList="mustDo" @select="(msg) => selectedMsg = msg"/>
    <TodoList title="PD" :myList="pd" @select="(msg) => selectedMsg = msg"/>
    <TodoList title="Want to do" :myList="wantToDo" @select="(msg) => selectedMsg = msg"/>
  </div>
  <table>
      <thead>
        <tr>
          <th>Time</th>
          <th>Task</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(hour, index) in hours" :key="index">
          <td>{{ hour }}</td>
          <td @click="updateItem">
          </td>
        </tr>
      </tbody>
    </table>
    <h1>Current Input is {{ selectedMsg }}</h1>
</template>

<style>
  .todo-lists {
    display: flex;
    flex-direction: row;
  }
</style>