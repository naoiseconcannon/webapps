<template>
    <div class="card card-default">
        <div class="card-header">Edit Details for : <strong>{{ course.name }}</strong></div>

        <div class="card-body">
            <form v-on:submit="saveForm()">
                <div class="form-row">
                    <div class="col-md-6 form-group">
                        <label>Title</label>
                        <input type="text" v-model="course.title" class="form-control">
                        <p class="text-danger" v-if="errors.title">{{ errors.title[0] }}</p>
                    </div>
                    <div class="col-md-2 form-group">
                        <label>Code</label>
                        <input type="text" v-model="course.code" class="form-control">
                        <p class="text-danger" v-if="errors.code">{{ errors.code[0] }}</p>
                    </div>
                    <div class="col-md-2 form-group">
                        <label>Points</label>
                        <input type="text" v-model="course.points" class="form-control">
                        <p class="text-danger" v-if="errors.points">{{ errors.points[0] }}</p>
                    </div>
                      <div class="col-md-2 form-group">
                          <label>Level</label>
                          <input type="text" v-model="course.level" class="form-control">
                          <p class="text-danger" v-if="errors.level">{{ errors.level[0] }}</p>
                      </div>
                </div>

                <div class="form-row">
                    <div class="col-md-12 form-group">
                        <label>Description</label>
                        <textarea v-model="course.description" class="form-control" rows="2"></textarea>
                        <p class="text-danger" v-if="errors.description">{{ errors.description[0] }}</p>
                    </div>
              </div>


                <div class="form-row">

                </div>
                <div class="form-row">
                    <div class="col-md-12 form-group">
                        <button class="btn btn-primary">Update</button>
                        <router-link to="/" class="btn btn-secondary">Cancel</router-link>
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
                course: {
                    title: '',
                    code: '',
                    description: '',
                    points: '',
                    level: ''
                },
                errors: {}
            }
        },
        mounted() {
            var app = this;
            var id = app.$route.params.id;
            var token = localStorage.getItem('token');
            axios.get('/api/courses/' + id, {
                headers: { Authorization: "Bearer " + token }
            })
            .then(function (resp) {
                console.log(resp.data);
                app.course = resp.data;
            })
            .catch(function (resp) {
                console.log(resp);
                alert('Could not load course');
            });

            axios.get('/api/courses', {
                headers: { Authorization: "Bearer " + token }
            })
            .then(function (resp) {
                console.log(resp.data);
                app.courses = resp.data;
            })
            .catch(function (resp) {
                console.log(resp);
                alert('Could not load courses');
            });
        },
        methods: {
            saveForm() {
                event.preventDefault();
                var app = this;
                var id = app.$route.params.id;
                var newcourse = app.course;
                var token = localStorage.getItem('token');
                axios.put('/api/courses/' + id, newcourse, {
                    headers: { Authorization: "Bearer " + token }
                })
                .then(function (resp) {
                    app.$router.push({name: 'courses'});
                })
                .catch(function (resp) {
                    app.errors = resp.response.data;
                });
            }
        }
    }
</script>
