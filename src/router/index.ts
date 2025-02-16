import { createRouter, createWebHistory } from "vue-router";
import type { RouteLocationNormalized, NavigationGuardNext } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AboutView from "../views/AboutView.vue";
import SignUp from "../views/SignUp.vue";
import Login from "../views/Login.vue";
import FaqView from "../views/FaqView.vue";
import ContactView from "../views/ContactView.vue";
import AdminPortal from "../views/AdminPortal.vue";
import AdminFaqView from "../views/admin/AdminFaqView.vue";
import Patient from "../../src/components/Patient.vue";
import AdminUsuarios from "../components/AdminUsuarios.vue";
import MedicalAppointments from "../views/doctores/MedicalAppointments.vue";
import MedicalPrescription from "../views/doctores/MedicalPrescription.vue";
import MedicalSchedule from "../views/doctores/MedicalAppointments.vue";
import MedicalServices from "../views/MedicalServices.vue";

// Función para validar si el usuario es administrador antes de entrar
const requireAuthAdmin = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  const userRole = localStorage.getItem("userRole");
  if (userRole === "1") {
    next(); // Permite el acceso
  } else {
    next("/"); // Redirige al Home si no es Admin
  }
};

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", name: "home", component: HomeView },
    { path: "/about", name: "about", component: AboutView },
    { path: "/signup", name: "signup", component: SignUp },
    { path: "/login", name: "login", component: Login },
    { path: "/faq", name: "faq", component: FaqView },
    { path: "/contact", name: "contact", component: ContactView },
    { path: "/servicios-medicos", name: "servicios-medicos", component: MedicalServices },
    { path: "/recetas-pacientes", name: "recetas-pacientes", component: Patient },
    { path: "/admin-portal", name: "admin-portal", component: AdminPortal, beforeEnter: requireAuthAdmin }, // Solo Admins
    { path: "/admin/faq", name: "admin-faq", component: AdminFaqView, beforeEnter: requireAuthAdmin }, //Editar Faq
    { path: "/admin-usuarios", name: "admin-usuarios", component: AdminUsuarios, beforeEnter: requireAuthAdmin },
    { path: "/admin/doctores-recetas", name: "doctores-recetas", component: MedicalPrescription, beforeEnter: requireAuthAdmin },
    { path: "/admin/doctores-citas", name: "doctores-citas", component: MedicalAppointments, beforeEnter: requireAuthAdmin },
    { path: "/admin/doctores-agenda", name: "doctores-agenda", component: MedicalSchedule, beforeEnter: requireAuthAdmin },
  ],
});

export default router;

