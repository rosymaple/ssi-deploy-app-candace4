import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { mande } from 'mande'

// create an object that can make api calls
const studentAPI = mande('api/students')

export const useStudentStore = defineStore('students', () => {
    // empty array
    const sortedStudents = ref([])

    // empty object
    const mostRecentStudent = ref( {} )

    const addNewStudentErrors = ref ([])

    // reactive data stored in our memory
    const studentList = ref([
        { name: "A. Student", starID: "aa1234aa", present: false },
        { name: "B. Student", starID: "bb1234bb", present: false }
    ])

    function getAllStudents() {
        // make an api request to get all students and save them in store
        studentAPI.get().then( students => {     // students is the JSON response from the API
            // sortedStudents is our studentList but sorted
          sortedStudents.value = students
        })
        // make sure this function is called when the app loads, go to App.vue and import onMounted from vue
        // automatically called when a component is first loaded on a screen
    }

    function addNewStudent(student) {
        // make API call to add new student
        // call getAllStudents to re-request list of students from API server
        // we don't expect to get any data back so we can use empty parenthesis
        studentAPI.post(student).then( () => {
            getAllStudents()
        }).catch( err => {
            addNewStudentErrors.value = err.body
        })
    }

    function deleteStudent(studentToDelete) {
        // TODO: make an api request
    }

    function arrivedOrLeft(student) {
        // TODO make api request
        const editStudentAPI = mande(`/api/students/${student.id}`)
        editStudentAPI.patch(student).then( () => {
            getAllStudents()
        })
    }

    const studentCount = computed( () => {
        return sortedStudents.value.length
    })

    return { 
        // reactive data
        // sortedStudents changed from computed property to reactive data
        sortedStudents,
        addNewStudentErrors,
        mostRecentStudent, 

        // functions
        getAllStudents,
        addNewStudent, 
        deleteStudent, 
        arrivedOrLeft, 

        // computed properties
        studentCount
    }

})