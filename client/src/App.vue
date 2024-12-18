<script setup>

import { onMounted } from "vue";

import NewStudentForm from './components/NewStudentForm.vue'
import StudentTable from './components/StudentTable.vue'
import StudentMessage from './components/StudentMessage.vue'

import { useStudentStore } from "./stores/StudentStore.js";

const studentStore = useStudentStore()
// this is enabling app.vue to access studentStore
// when app.vue is mounted/displayed on the screen, getAllStudents() function will be called


onMounted( () => {
  // whatever is in here will run when this component is first displayed on the screen
  studentStore.getAllStudents()
  // this enables app.vue to access the student store
  // this function will be called when our app is mounted
})

</script>

<template>
  
  <NewStudentForm></NewStudentForm>
  <StudentTable></StudentTable>
  <StudentMessage></StudentMessage>
  
</template>

<style scoped>

</style>
