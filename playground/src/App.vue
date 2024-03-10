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

  const selectedMsg = ref('yo')

  const hours = ['00:00', '00:30', '01:00', '01:30', '02:00']

  function updateItem(event) {
    event.target.innerHTML = selectedMsg.value
    console.log(selectedMsg)
  }

</script>

<template>
  <TodoList :myList="daily" @select="(msg) => selectedMsg = msg"/>
  <TodoList :myList="weekly" @select="(msg) => selectedMsg = msg"/>
  <TodoList :myList="mustDo" @select="(msg) => selectedMsg = msg"/>
  <TodoList :myList="pd" @select="(msg) => selectedMsg = msg"/>
  <TodoList :myList="wantToDo" @select="(msg) => selectedMsg = msg"/>
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
</template>