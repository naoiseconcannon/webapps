

require('./bootstrap');

import Vue from 'vue'; //import vue for use in this application
import VueRouter from 'vue-router'; //import for vue-router module from the node_modules folder

//import for the components used within the app
import LoginForm from './components/auth/LoginForm.vue';
import UserHome from './components/home/UserHome.vue';
import StudentsIndex from './components/students/StudentsIndex.vue';
import CreateStudent from './components/students/CreateStudent.vue';
import EditStudent from './components/students/EditStudent.vue';
import CoursesIndex from './components/courses/CoursesIndex.vue';
import CreateCourse from './components/courses/CreateCourse.vue';
import EditCourse from './components/courses/EditCourse.vue';
import EnrolmentsIndex from './components/enrolments/EnrolmentsIndex.vue';
import CreateEnrolment from './components/enrolments/CreateEnrolment.vue';
import EditEnrolment from './components/enrolments/EditEnrolment.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/', //this is the default path - the first component that loads when server is loaded.
        name: 'login',
        components: {
        loginForm: LoginForm
        }
    },
    {
        path: '/home',
        component: UserHome,
        name: 'home',
        children: [
            {
                path: 'students', //students index page path/route
                name: 'students', //name of route
                component: StudentsIndex //component the route loads when called
            },
            {
                path: 'students/create', //create student path/route
                name: 'students.create', //name of route
                component: CreateStudent //component the route loads when called
            },
            {
                path: 'students/:id/edit', //edit student by ID path/route
                component: EditStudent, //component the route loads when called
                name: 'editStudent' //name of route
            },
            {
                path: 'courses',  //courses index page path/route
                name: 'courses', //name of route
                component: CoursesIndex //component the route loads when called
            },
            {
                path: 'courses/:id/edit', //edit course by ID path/route
                name: 'editcourse', //name of route
                component: EditCourse //component the route loads when called
            },
            {
                path: 'courses/create', //create course path/route
                name: 'courses.create', //name of route
                component: CreateCourse //component the route loads when called
            },
            {
                path: 'enrolments', //enrolments index page path/route
                name: 'enrolments', //name of route
                component: EnrolmentsIndex //component the route loads when called
            },
            {
                path: 'enrolments/:id/edit', //edit enrolment by ID path/route
                name: 'editEnrolment', //name of route
                component: EditEnrolment //component the route loads when called
            },
            {
                path: 'enrolments/create', //Create student path/route
                name: 'enrolments.create', //name of route
                component: CreateEnrolment //component the route loads when called
            }
        ]
    },
];

const router = new VueRouter({ 
    routes: routes
});

const app = new Vue({
    el: '#app',
    router: router
});
