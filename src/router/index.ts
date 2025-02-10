import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AboutView from "../views/AboutView.vue";
import SignUp from "../views/SignUp.vue";
import Login from "../views/Login.vue";
import AdminPortal from "../views/AdminPortal.vue"; // Nueva vista

// 🔹 Función para validar si el usuario es administrador antes de entrar
const requireAuthAdmin = (to, from, next) => {
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
    { path: "/admin-portal", name: "admin-portal", component: AdminPortal, beforeEnter: requireAuthAdmin }, // Solo Admins
  ],
});

export default router;
