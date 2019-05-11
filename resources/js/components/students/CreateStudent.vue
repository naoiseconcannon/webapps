<template>
    <div class="card card-default">
        <div class="card-header">Create new Student</div>

        <div class="card-body">
            <form v-on:submit="saveForm()"> <!-- method to be called upon submitting the form -->
                <div class="form-row">
                    <div class="col-md-6 form-group">
                        <label>Name</label>
                        <input type="text" v-model="student.name" class="form-control"> <!-- input field for student name  -->
                        <p class="text-danger" v-if="errors.name">{{ errors.name[0] }}</p> <!-- if there is an error with name display the error -->
                    </div>
                    <div class="col-md-6 form-group">
                        <label>Address</label>
                        <input type="text" v-model="student.address" class="form-control"> <!-- input field for student address  -->
                        <p class="text-danger" v-if="errors.address">{{ errors.address[0] }}</p> <!-- if there is an error with address display the error -->
                    </div>
                </div>
                <div class="form-row">
                    <div class="col-md-4 form-group">
                        <label>Email</label>
                        <input type="text" v-model="student.email" class="form-control"> <!-- input field for student email  -->
                        <p class="text-danger" v-if="errors.email">{{ errors.email[0] }}</p> <!-- if there is an error with email display the error -->
                    </div>
                    <div class="col-md-4 form-group">
                        <label>Phone Number</label>
                        <input type="text" v-model="student.phone" class="form-control"> <!-- input field for student phone number  -->
                        <p class="text-danger" v-if="errors.phone">{{ errors.phone[0] }}</p> <!-- if there is an error with phone display the error -->
                    </div>
                </div>
                <div class="form-row">
                    <div class="col-md-12 form-group">
                        <button class="btn btn-primary">Create</button>
                        <router-link to="/home" class="btn btn-secondary">Cancel</router-link>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    export default {
        data: function () {
            return {
                student: {
                    name: '',
                    address: '',
                    email: '',
                    phone: ''
                },
                errors: {}
            }
        },

        mounted() {
        },

        methods: {
            saveForm() {
                event.preventDefault();
                var app = this;
                var newStudent = app.student;
                var token = localStorage.getItem('token');
                var xhr = axios.post('/api/students', newStudent, {
                    headers: { Authorization: "Bearer " + token }
                    });

                xhr = xhr.then(function (resp) {
                        app.$router.push({name: 'students'});
                    });

                xhr = xhr.catch(function (resp) {
                        app.errors = resp.response.data;
                    });
            }
        }
    }
</script>
