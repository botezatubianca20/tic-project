import Vue from 'vue';
import Router from 'vue-router';
import firebase from 'firebase'

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
import EditAppointment from '../components/EditAppointment'
import NewAppointment from '../components/NewAppointment'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: {
          requiresGuest: true
        }
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
        component: Doctors,
        meta: {
          requiresAuth: true
        }
    },
    {
        path: '/patients',
        name: 'Patients',
        component: Patients,
        meta: {
          requiresAuth: true
        }
    },
    {
        path: '/appointments',
        name: 'Appointments',
        component: Appointments,
        meta: {
          requiresAuth: true
        }
    },
    {
        path:'/editPatient',
        name:'editPatient',
        component: EditPatient,
        meta: {
          requiresAuth: true
        }
      },
      {
        path:'/newPatient',
        name:'newPatient',
        component: NewPatient,
        meta: {
          requiresAuth: true
        }
      },
      {
        path:'/editDoctor',
        name:'editDoctor',
        component: EditDoctor,
        meta: {
          requiresAuth: true
        }
      },
      {
        path:'/newDoctor',
        name:'newDoctor',
        component: NewDoctor,
        meta: {
          requiresAuth: true
        }
      },
      {
        path:'/editAppointment',
        name:'editAppointment',
        component: EditAppointment,
        meta: {
          requiresAuth: true
        }
      },
      {
        path:'/newAppointment',
        name:'newAppointment',
        component: NewAppointment,
        meta: {
          requiresAuth: true
        }
      }
]
});

// Nav Guard
router.beforeEach((to, from, next) => {
  // Check for requiresAuth guard
  if (to.matched.some(record => record.meta.requiresAuth)) {
    //verifica daca nu exista un utilziator logat
    if (!firebase.auth().currentUser) {
      // redirect catre login
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      // merge pe ruta
      next();
    }
  } else if (to.matched.some(record => record.meta.requiresGuest)) {
    //verifica daca nu exista un utilziator logat
    if (firebase.auth().currentUser) {
      // redirect catre firstPage
      next({
        path: '/',
        query: {
          redirect: to.fullPath
        }
      });
    } else {
       // merge pe ruta
      next();
    }
  } else {
    // merge pe ruta
    next();
  }
});


export default router