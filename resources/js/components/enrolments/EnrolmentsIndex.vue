<template>
  <div class="card card-default">
      <div class="card-header">Enroled Students<router-link :to="{ name: 'enrolments.create' }" class="btn btn-info addbtn">
        Create New Enrolment
      </router-link></div>

        <div class="card-body">
            <div class="form-group">
            </div>
            <p v-if="enrolments.length == 0">There are no enrolments</p> <!-- if the length of the enrolment array is equal to 0 - display the following message -->
            <div v-if="enrolments.length != 0" class="row"> <!-- if the length of the enrolment array is greater than 0 - display the student information within cards -->
                <ul v-for="enrolment in enrolments"  class="col-4"> <!-- render the list of enrolments based on the data fetched from the enrolment array -->
                  <div class="card row size">
                  <div class="card-header">{{ enrolment.student.name }} </div> <!-- display the student name -->
                  <p class="list-group-item"><strong>Date : </strong>{{ enrolment.date }}</p> <!-- display the enrolment date -->
                  <p class="list-group-item"><strong>Time : </strong>{{ enrolment.time }}</p> <!-- display the enrolment time -->
                  <p class="list-group-item"><strong>Status : </strong>{{ enrolment.status }}</p> <!-- display the enrolment status -->
                  <p class="list-group-item"><strong>Course : </strong>{{ enrolment.course.title }}</p> <!-- display the course title for the enrolment -->
                  <div class="card-footer text-muted">
                    <button class="btn-sm btn-danger" v-on:click="deleteEnrolment(enrolment.id)">Delete</button> <!-- button that calls the deleteEnrolment function when pressed -->
                    <router-link :to="{ name: 'editEnrolment', params: { id: enrolment.id } }" class="btn btn-primary editbtn" title="Edit Enrolment Details">Edit</router-link>
                    <!-- router link to the editEnrolment component, passing the enrolment.id parameters -->
                  </div>
                </div>
              </ul>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        mounted() { //in the mounted hook, you have full access to the reactive component, templates and rendered DOM.
                    //The most frequent use of mounted are for fetching data for your compnents.
            var app = this;
            var token = localStorage.getItem('token');
            axios.get('/api/enrolments', { //axios get request to get all enrolments
                headers: { Authorization: "Bearer " + token } // pass the relevant headers
            })
            .then(function (resp) {
                console.log(resp.data); //show the response data in the console
                app.enrolments = resp.data; //all enrolments in the array is the response data
            })
            .catch(function (resp) { //if a enrolment cannot be loaded, display the alert 'Could not load enrolments'
                console.log(resp);
                alert('Could not load enrolments');
            });
        },
        data() {
            return {
                enrolments: [] //define the data for the enrolments array
            }
        },
        methods: { //methods that are called throughout this component
            deleteEnrolment(enrolmentId) { //delete enrolment by enrolmentId method
                var app = this;
                if (confirm("Are you sure you want to delete this enrolment (id =" + enrolmentId + " )?")) { //if statement to confirm whether you wish to perementely delete the enrolment
                    var token = localStorage.getItem('token'); //if there is a token currently stored in localStorage
                    axios.delete('/api/enrolments/' +  enrolmentId, { //axios request to delete the enrolment based on the enrolmentId of said enrolment
                        headers: { Authorization: "Bearer " + token } // pass the relevant headers
                    })
                    .then(function (resp) {
                        var index = app.enrolments.findIndex(function (enrolment) { //the findIndex() method executes the function once for each element present in the enrolments array.
                            return enrolment.id == enrolmentId; //return the enrolment.id from each enrolment and assiogn it to enrolmentId variable
                        });
                        app.enrolments.splice(index, 1); //splice the enrolmnents array by 1
                    })
                    .catch(function (resp) {
                        alert("Could not delete enrolment!!"); //alert displayed if the enrolment cannot be deleted
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
</style>
