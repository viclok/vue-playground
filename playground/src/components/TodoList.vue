<script setup>
  import { ref } from "vue"
  const props = defineProps({
  myList: Array
    })
    const emit = defineEmits(['select'])
  
    function selectItem(item) {
      emit('select', item)
    }
</script>

<template>
    <ul>
        <li v-for="item in props.myList" @click="selectItem(item)"> {{ item }}</li>
    </ul>
</template>