import axios from "axios";

const API_BASE_URL = "http://localhost:8080";

export default {
  async getUserData(id_usuario, rol_id) {
    try {
      // Obtener datos básicos del usuario
      const userResponse = await axios.get(`${API_BASE_URL}/usuarios/${id_usuario}`);
      let userData = userResponse.data;

      // Obtener información adicional según el rol
      let extraData = {};
      switch (rol_id) {
        case 2: // Doctor
          extraData = await axios.get(`${API_BASE_URL}/doctor/user/${id_usuario}`);
          break;
        case 3: // Empleado
          extraData = await axios.get(`${API_BASE_URL}/empleado/user/${id_usuario}`);
          break;
        case 4: // Paciente
          extraData = await axios.get(`${API_BASE_URL}/paciente/user/${id_usuario}`);
          break;
      }

      return { ...userData, ...extraData.data };
    } catch (error) {
      console.error("Error obteniendo datos del usuario:", error);
      throw error;
    }
  },

  async updateUserData(userData) {
    try {
      // Actualizar datos en la tabla Usuario
      await axios.put(`${API_BASE_URL}/usuarios/${userData.id_usuario}`, {
        nombreUsuario: userData.nombreUsuario,
        correo: userData.correo,
        contrasena: userData.contrasena
      });

      // Actualizar datos en la tabla específica según el rol
      let endpoint = "";
      switch (userData.rol_id) {
        case 2:
          endpoint = `/doctor/${userData.id_usuario}`;
          break;
        case 3:
          endpoint = `/empleado/${userData.id_usuario}`;
          break;
        case 4:
          endpoint = `/paciente/${userData.id_usuario}`;
          break;
      }

      await axios.put(`${API_BASE_URL}${endpoint}`, userData);
    } catch (error) {
      console.error("Error actualizando usuario:", error);
      throw error;
    }
  }
};
