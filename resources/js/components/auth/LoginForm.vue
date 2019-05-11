<template>
    <div class="card card-default">
        <div class="card-header">Login</div>

        <div class="card-body">
            <form v-on:submit="login()"> <!-- on submitting the form, calls the login method -->
                <div class="form-row">
                    <div class="col-md-6 form-group">
                        <label>Email</label>
                        <input type="text" v-model="user.email" class="form-control"> <!-- Input field for user email -->
                    </div>
                    <div class="col-md-6 form-group">
                        <label>Password</label>
                        <input type="text" v-model="user.password" class="form-control"> <!-- Input field for user password -->
                    </div>
                </div>
                <div class="form-row">
                    <div class="col-md-12 form-group">
                        <button class="btn btn-primary">Login</button> <!-- button to submit form -->
                        <p class="text-danger" v-if="errorMessage != ''">{{ errorMessage }}</p> <!-- display error messages, if any -->
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
                user: { //import the user object
                    email: '', //import the variables that can be referenced within the html
                    password: ''
                },
                errorMessage: '' //create an errorMessage variable to display any errors in the html
            }
        },
        mounted() {
            var app = this;
            if (localStorage.getItem('token') !== null) { // If there is a token in localStorage, redirect the user to the homepage -->
                app.$router.replace({name: 'home'});
            }
        },
        methods: {
            login() { //login method
                event.preventDefault(); // if the event does not get explicity handled, its default action should not be taken as it normally would be
                var app = this;
                axios.post('/api/login', app.user) //axios post request to the add the new user
                    .then(function (resp) {
                        localStorage.setItem('token', resp.data.token); //set up a token in localStorage for this user session
                        app.$router.push({name: 'home'}); //redirect the user to the home page
                    })
                    .catch(function (resp) { //if the post request does not work, display the following error message
                        app.errorMessage = "It didn't work!";
                    });
            }
        }
    }
</script>
