<script setup>
  import { ref } from "vue"
  // import { useCollection } from 'vuefire';
  // import { db, todolistRef } from './firebase';
  // import { updateDoc, doc } from 'firebase/firestore';

  const props = defineProps({
  myList: Array,
  title: String
    })
    const emit = defineEmits(['select'])
  
    function selectItem(item) {
      emit('select', item)
    }
  
  function addItem(event) {
    console.log(event)
    props.myList.push(newItem.value)
    toggleAdd()
    newItem.value = ""
  }

  function deleteItem(item) {
    var index = props.myList.indexOf(item)
    if (index !== -1) {
      props.myList.splice(index,1)
    }
    resetEdit()
  }

  function editItem(item) {
    var index = props.myList.indexOf(item)
    if (index !== -1) {
      props.myList[index] = editingItem.value
    }
    resetEdit()
  }

  function resetEdit() {
    editingItem.value = ''
    editIndex.value = -1
  }

  function toggleEdit(item) {
    editIndex.value = props.myList.indexOf(item)
    // console.log(editIndex.value)
  }

  function toggleAdd() {
    isAdd.value = !isAdd.value
  }

  const newItem = ref('')
  const editingItem = ref('')
  const editIndex = ref(-1)
  const isAdd = ref(false)
</script>

<template>
  <div class="todo-editor">
    <h2>{{ props.title }}</h2>
    <ul>
        <span class="todo-item" v-for="item in props.myList">
          <li @click="selectItem(item)"> {{ item }}</li>
          <input v-if="editIndex == props.myList.indexOf(item)" type="text" v-model="editingItem" @keyup.enter="editItem(item)">
          <button v-else @click="toggleEdit(item)">Edit</button>
          <button @click="deleteItem(item)">X</button>
        </span>
    </ul>
    <button v-if="!isAdd" @click="toggleAdd">+</button>
    <input v-else type="text" v-model="newItem" @keyup.enter="addItem">
  </div>
</template>

<style>
  .todo-editor {
    display: flex;
    flex-direction: column;
  }
</style>