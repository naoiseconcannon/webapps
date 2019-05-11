
<template>
    <div class="card card-default">
        <div class="card-header">Courses available<router-link :to="{ name: 'courses.create' }" class="btn btn-info addbtn">
          Create New Course
        </router-link></div>

        <div class="card-body">
            <div class="form-group">

            </div>
            <p v-if="courses.length == 0">There are no courses</p>
            <div v-if="courses.length != 0" class="row">
                <ul v-for="course in courses"  class="col-4">
                  <div class="card row size">
                  <div class="card-header test">{{ course.title }} - {{ course.code }}</div>
                  <p class="list-group-item"><strong>Required points : </strong>{{ course.points }} <strong class="points">Level : </strong>{{ course.level }}</p> <!-- display the course level for the course -->
                  <p class="list-group-item"><strong>Description : </strong>{{ course.description }}</p> <!-- display the course description for the course -->
                  <div class="card-footer text-muted">
                    <button class="btn-sm btn-danger" v-on:click="deletecourse(course.id)">Delete</button> <!-- button that calls the deletecourse function when pressed -->
                    <router-link :to="{ name: 'editcourse', params: { id: course.id } }" class="btn btn-primary editbtn" title="Edit course Details">Edit</router-link>
                    <!-- router link to the editCourse component, passing the course.id parameters -->
                  </div>
                </div>
              </ul>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        mounted() {                                                 //in the mounted hook, you have full access to the reactive component, templates and rendered DOM.
                                                                   //mounted is used to fetch data from components.
            var app = this;
            var token = localStorage.getItem('token');
            axios.get('/api/courses', {                             //axios get request to get all courses
                headers: { Authorization: "Bearer " + token }                        // pass the relevant headers
            })
            .then(function (resp) {
                console.log(resp.data);                                                      //show the response data in the console
                app.courses = resp.data;                                      //all courses in the array is the response data
            })
            .catch(function (resp) {                                //could not display course if course not loaded
                console.log(resp);
                alert('Could not load courses');
            });
        },
        data() {
            return {
                courses: [] //define the data for the courses array
            }
        },
        methods: {
            deletecourse(courseId) { //delete course by courseId method
                var app = this;
                if (confirm("Are you sure you want to delete this course (id =" + courseId + " )?")) { //if statement to confirm whether you wish to perementely delete the course
                    var token = localStorage.getItem('token'); //if there is a token currently stored in localStorage
                    axios.delete('/api/courses/' +  courseId, { //axios request to delete the course based on the courseId of said course
                        headers: { Authorization: "Bearer " + token } // pass the relevant headers
                    })
                    .then(function (resp) {
                        var index = app.courses.findIndex(function (course) { //the findIndex() method executes the function once for each element present in the courses array.
                            return course.id == courseId; //return the course.id from each course and assign it to courseId variable
                        });
                        app.courses.splice(index, 1); //splice the courses array by 1
                    })
                    .catch(function (resp) {
                        alert("Could not delete course!!"); //alert displayed if the course cannot be deleted
                    });
                }
            }
        }
    }
</script>

<style>


strong
{
  margin-right: 10px;
}

.points{
  padding-left: 50px;
}

.test{
  font-size: 14px;
  font-weight: 700;
}

.addbtn{
  float: right;
}
</style>
