import Vue from 'vue';
import Router from 'vue-router';
import Login from '../components/Login'
import Register from '../components/Register'
import Dashboard from '../components/Dashboard'
import Doctors from '../components/Doctors'
import Patients from '../components/Patients'
import Appointments from '../components/Appointments'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/register',
        name: 'Register',
        component: Register
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard
    },
    {
        path: '/doctors',
        name: 'Doctors',
        component: Doctors
    },
    {
        path: '/patients',
        name: 'Patients',
        component: Patients
    },
    {
        path: '/appointments',
        name: 'Appointments',
        component: Appointments
    },
]
});

export default router