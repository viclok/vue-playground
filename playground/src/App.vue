<script setup>
  import { ref } from 'vue'
  import TodoList from './components/TodoList.vue'
  import { useCollection } from 'vuefire';
  import { db, todolistRef } from './firebase';
  import { addDoc, updateDoc, doc } from 'firebase/firestore';

  const documents = useCollection(todolistRef)
  console.log(documents.value[0])

  // const daily = ref([
  // 'Hamburger',
  // 'Pizza',
  // 'Spaghetti',
  // 'Tacos',
  // 'Teriyaki Chicken',
  // ]);
  const daily = ref(documents.value[0]["daily"])
  const weekly = ref(['hi']);
  const mustDo = ref(['yo']);
  const pd = ref(['wa']);
  const wantToDo = ref(['sup']);

  const selectedMsg = ref('')
  const editMode = ref(false)

  // const hours = ['00:00', '00:30', '01:00', '01:30', '02:00']

  function updateItem(event) {
    event.target.innerHTML = selectedMsg.value
    console.log(selectedMsg)
  }

  function receiveKeys(event) {
    if (event.key === 'q' && event.altKey) {
      selectedMsg.value = ""
    }
    if (event.key === 'w' && event.altKey) {
      editMode.value = true
    }

    if (event.key === 'Enter') {
      editMode.value = false
    }
    console.log(event)
    // console.log(event)
  }

  function generateHours(startHour, endHour) {
    const timeArray = []
    var timeCode = "AM"
    var offset = 0
    var time1=  ""
    var time2= ""
    for (let i = startHour; i <= endHour; i++) {
      if (i >= 12 && i < 24) {
        offset = 12
        timeCode = "PM"
      } else if (i >= 24) {
        offset = 24
        timeCode = "AM"
      } else {
        offset = 0
        timeCode = "AM"
      }
      time1 = (i - offset) + ":00" + timeCode
      timeArray.push(time1)
      if (i < endHour) {
        time2 = (i - offset) + ":30" + timeCode
        timeArray.push(time2)
      }
    }
    return timeArray
  }

  async function createDocument() {
    const newDocument = { schedule: myArray};
    const docRef = doc(db, "todolist", "week1")

    await updateDoc(docRef, newDocument);
  }

  // async function createDocument() {
  //   const newDocument = { Array: myArray};
  //   await addDoc
  // }

  const hours = generateHours(9, 27)
  const headers = ['Time', 'Adjust', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

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
          <th v-for="header in headers">{{ header }}</th>

        </tr>
      </thead>
      <tbody>
        <tr v-for="(hour, index) in hours" :key="index">
          <td>{{ hour }}</td>
          <td v-for="i in 8" @click="updateItem"><input v-if="editMode" type="text">{{ index + ", " + i  }}</td>
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