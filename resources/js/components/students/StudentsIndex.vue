<template>
  <div class="card card-default">
      <div class="card-header">Student List<router-link :to="{ name: 'students.create' }" class="btn btn-info addbtn">
        Create New Student
      </router-link></div>

        <div class="card-body">
            <div class="form-group">
            </div>
            <div class="col-12">


            <p v-if="students.length == 0">There are no students</p> <!-- if the length of the student array is equal to 0 - display the following message -->
            <div v-if="students.length != 0" class="row"> <!-- if the length of the student array is greater than 0 - display the student information within cards -->
                <ul v-for="student in students"  class="col-4"> <!-- render the list of students based on the data fetched from the student array -->
                  <div class="card row size">
                  <div class="card-header">{{ student.name }} </div> <!-- display the student name -->
                  <p class="list-group-item">{{ student.address }}</p> <!-- display the student address -->
                  <p class="list-group-item">{{ student.email }}</p> <!-- display the student email -->
                  <p class="list-group-item">{{ student.phone }}</p> <!-- display the student phone -->
                  <div class="card-footer text-muted">
                    <button class="btn-sm btn-danger" v-on:click="deleteStudent(student.id)">Delete</button> <!-- button that calls the deleteStudent function when pressed -->
                    <router-link :to="{ name: 'editStudent', params: { id: student.id } }" class="btn btn-secondary editbtn" title="Edit User Details">Edit</router-link>
                    <!-- router link to the editStudent component, passing the student.id parameters -->
                  </div>
                </div>
              </ul>
          </div>


          </div>
        </div>
    </div>
</template>

<script>
    export default {
        mounted() {
            var app = this;
            var token = localStorage.getItem('token');
            axios.get('/api/students', { //axios get request to get all students
                headers: { Authorization: "Bearer " + token } // pass the relevant headers
            })
            .then(function (resp) {
                console.log(resp.data); //show the response data in the console
                app.students = resp.data; //all students in the array is the response data
            })
            .catch(function (resp) { //if a student cannot be loaded, display the alert 'Could not load students'
                console.log(resp);
                alert('Could not load students');
            });
        },
        data() {
            return {
                students: [] //define the data for the students array
            }
        },
        methods: { //methods that are called throughout this component
            deleteStudent(studentId) { //delete student by studentId method
                var app = this;
                if (confirm("Are you sure you want to delete this student (id =" + studentId + " )?")) { //if statement to confirm whether you wish to perementely delete the student
                    var token = localStorage.getItem('token'); //if there is a token currently stored in localStorage
                    axios.delete('/api/students/' +  studentId, { //axios request to delete the student based on the studentId of said student
                        headers: { Authorization: "Bearer " + token } // pass the relevant headers
                    })
                    .then(function (resp) { //response
                        var index = app.students.findIndex(function (student) { //the findIndex() method executes the function once for each element present in the students array.
                            return student.id == studentId; //return the student.id from each student and assiogn it to studentId variable
                        });
                        app.students.splice(index, 1); //splice the students array by 1
                    })
                    .catch(function (resp) {
                        alert("Could not delete student!!"); //alert displayed if the student cannot be deleted
                    });
                }
            }
        }
    }
</script>


<!-- styles used throughout this component -->
<style>
.editbtn{
  color: white;
  height: 30px;
  font-size: 13px;
}
.size
{
  margin-right: 15px;
}
</style>
