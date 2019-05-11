<template>
  <div class="container">
    <div class="row justify-content-center">

    <div class="col-8">
      <div class="card">
        <div class="card-header">Create Enrolment</div>
        <div class="card-body">
            <form v-on:submit="saveForm()"> <!-- call save form method when form is submitted  -->
                <div class="form-row">
                  <div class="col-6 form-group">
                      <label>Date:</label>
                      <input type="date" v-model="enrolment.date" class="form-control"> <!-- input field for enrolment date  -->
                      <p class="text-danger" v-if="errors.date">{{ errors.date[0] }}</p> <!-- if there is an error with date display the error -->
                  </div>

                  <div class="col-md-6 form-group">
                      <label>Time:</label>
                      <input type="time" v-model="enrolment.time" class="form-control"> <!-- display input enrolment time, v-model of enrolment.time  -->
                      <p class="text-danger" v-if="errors.time">{{ errors.time[0] }}</p> <!-- if there is an error with date display the error -->
                  </div>

                  <div class="col-md-6 form-group">
                      <label>Course:</label>
                      <select v-model="enrolment.course_id" class="form-control"> <!-- select tag for courses -->
                          <option v-for="course in courses" :value="course.id"> <!-- option for each course in array of courses -->
                              {{ course.title }} <!-- Show the title of course as the option  -->
                          </option>
                      </select>
                      <p class="text-danger" v-if="errors.course_id">{{ errors.course_id[0] }}</p> <!-- if there is an error with course display the error message -->
                  </div>

                  <div class="col-md-6 form-group">
                      <label>Student:</label>
                      <select v-model="enrolment.student_id" class="form-control"> <!-- select tag for courses -->
                          <option v-for="student in students" :value="student.id"> <!-- option for each student in array of students -->
                              {{ student.name }} <!-- Show the title of student as the option  -->
                          </option>
                      </select>
                      <p class="text-danger" v-if="errors.student_id">{{ errors.student_id[0] }}</p> <!-- if there is an error with course display the error message -->
                  </div>

                  <div class="form-group col-md-12">
                    <label class="labelStatus">Status:</label>
                        <!-- Radio button for each status type, will be pre-checked-->
                        <label class="radio-inline"><input id="attending" type="radio" value="attending" name="status" v-model="enrolment.status" >Attending</label>&nbsp;
                        <label class="radio-inline"><input class="radioCheck" id="withdrawn" type="radio" value="withdrawn" name="status" v-model="enrolment.status">Withdrawn</label>&nbsp;
                        <label class="radio-inline"><input class="radioCheck" id="deferred" type="radio" value="deferred" name="status" v-model="enrolment.status">Deferred</label>&nbsp;
                        <label class="radio-inline"><input class="radioCheck" id="registered" type="radio" value="registered" name="status" v-model="enrolment.status"> Registered</label>
                  </div>

                </div>
                <div class="form-row">
                    <div class="col-md-12 form-group">
                        <button class="btn btn-primary">Confirm</button> <!-- confirm button for form -->
                        <router-link to="/" class="btn btn-secondary">Cancel</router-link> <!-- navigate back if user cancels -->
                    </div>
                </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        data: function () {
            return {
              enrolment: { //passing the enrolment object's data
                  date: '',
                  time: '',
                  student_id: '',
                  course_id: '',
                  status: '',
                },
                courses: [], //courses array
                students: [], //stduents array
                errors: {}
            }
        },
        mounted() {
          if(localStorage.getItem('token')===null) {
            this.$router.push({ name: "login"})
            alert('You must be logged in to view this page.');
          }
          var app = this; //declaring app as this
          var id = app.$route.params.id; //setting id as the id that was passed as a parameter that was in the router link
          var token = localStorage.getItem('token'); //setting token to localStorage token to be passed in header

          axios.get('/api/students', { headers: { Authorization: "Bearer " + token} })
          .then(function (resp) { //if successful
              console.log(resp.data); //show the response in the console
              app.students = resp.data; //show the students in the console
          })
          .catch(function (resp) { //if the request fails
              console.log(resp); //show the response in the console
              alert('Could not load students');
          });
          axios.get('/api/courses', { headers: { Authorization: "Bearer " + token} })
          .then(function (resp) { //if successful
              console.log(resp.data); //show the response in the console
              app.courses = resp.data; //show the cousre in the console response
          })
          .catch(function (resp) { //if the request fails
              console.log(resp); //show the response in the console
              alert('Could not load students');
          });
        },
        methods: {
            saveForm() { //save form method
                event.preventDefault();
                var app = this; //declaring app as this
                var newEnrolment = app.enrolment; //new enrolment object as enrolment object
                var token = localStorage.getItem('token'); //declaring token as token in localStorage
                axios.post('/api/enrolments/', newEnrolment, { //axios POST request to api route, with newEnrolment object
                    headers: { Authorization: "Bearer " + token} //header with Authorization token
                  })
                    .then(function (resp) { //if successful
                        app.$router.push({path: '/home'}); //navigate to home page
                        console.log("Successfully created new enrolment."); //console thst the enrolment has been created
                        $("#SuccessCreateModal").modal() //call the modal
                    })
                    .catch(function (resp) { //if fails
                        app.errors = resp.response.data;
                    });
            }
        }
    }
</script>
