import Vue from 'vue';
import Router from 'vue-router';
import Login from '../components/Login'
import Register from '../components/Register'
import Dashboard from '../components/Dashboard'
import Doctors from '../components/Doctors'
import Patients from '../components/Patients'
import Appointments from '../components/Appointments'
import EditPatient from '../components/EditPatient'
import NewPatient from '../components/NewPatient'
import EditDoctor from '../components/EditDoctor'
import NewDoctor from '../components/NewDoctor'

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
    {
        path:'/editPatient',
        name:'editPatient',
        component: EditPatient,
      },
      {
        path:'/newPatient',
        name:'newPatient',
        component: NewPatient,
      },
      {
        path:'/editDoctor',
        name:'editDoctor',
        component: EditDoctor,
      },
      {
        path:'/newDoctor',
        name:'newDoctor',
        component: NewDoctor,
      }
]
});

export default router