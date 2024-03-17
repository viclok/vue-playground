<script setup>
  import { ref, onMounted } from 'vue'
  import TodoList from './components/TodoList.vue'
  import { db, todolistRef } from './firebase';
  import { addDoc, updateDoc, doc , onSnapshot, collection} from 'firebase/firestore';

  // const documents = useCollection(todolistRef)
  // console.log(documents.value[0])

  onMounted(() => {
    onSnapshot(collection(db, 'todolist'), (querySnapshot) => {
      const dailyDB = []
      const weeklyDB = []
      const mustDoDB = []
      const pdDB = []
      const wantDB = []
      querySnapshot.forEach((doc) => {
        const myItem = {
          id: doc.id,
          daily: doc.data().daily,
          weekly: doc.data().weekly,
          mustDo: doc.data().mustdo,
          pd: doc.data().pd,
          wanttodo: doc.data().wanttodo,
          schedule: doc.data().schedule
        }
        console.log(myItem.weekly)
        myItem.daily.forEach((item) => dailyDB.push(item))
        myItem.weekly.forEach((item) => weeklyDB.push(item))
        myItem.mustDo.forEach((item) => mustDoDB.push(item))
        myItem.pd.forEach((item) => pdDB.push(item))
        myItem.wanttodo.forEach((item) => wantDB.push(item))

      })
      daily.value = dailyDB
      weekly.value = weeklyDB
      mustDo.value = mustDoDB
      pd.value = pdDB
      wantToDo.value = wantDB
    })
  })

  const daily = ref();
  const weekly = ref();
  const mustDo = ref();
  const pd = ref();
  const wantToDo = ref();

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
    // console.log(event)
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

  function updateDB(header, updatedList, myList) {
    console.log(myList)
    myList = updatedList
    updateDoc(doc(db, 'todolist', "week1"), {
      [header]: updatedList
    })
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
    <TodoList title="Daily" header="daily" :myList="daily" @select="(msg) => selectedMsg = msg" @update="(header, updatedList) => updateDB(header, updatedList, daily)"/>
    <TodoList title="Weekly" header="weekly" :myList="weekly" @select="(msg) => selectedMsg = msg" @update="(header, updatedList) => updateDB(header, updatedList, weekly)"/>
    <TodoList title="Must Do" header="mustdo" :myList="mustDo" @select="(msg) => selectedMsg = msg" @update="(header, updatedList) => updateDB(header, updatedList, mustDo)"/>
    <TodoList title="PD" header="pd" :myList="pd" @select="(msg) => selectedMsg = msg" @update="(header, updatedList) => updateDB(header, updatedList, pd)"/>
    <TodoList title="Want to do" header="wanttodo" :myList="wantToDo" @select="(msg) => selectedMsg = msg" @update="(header, updatedList) => updateDB(header, updatedList, wantToDo)"/>
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