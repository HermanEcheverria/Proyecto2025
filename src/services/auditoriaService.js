import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auditoria';

const auditoriaService = {
    async listar(pagina = 0, tamano = 10) {
        try {
            const response = await axios.get(`${API_URL}/listar`, {
                params: { pagina, tamano }
            });
            return response.data;
        } catch (error) {
            console.error('Error al listar auditorías:', error);
            return [];
        }
    },

    async filtrar(filtros) {
        try {
            const response = await axios.get(`${API_URL}/filtrar`, {
                params: filtros
            });
            return response.data;
        } catch (error) {
            console.error('Error al filtrar auditorías:', error);
            return [];
        }
    },

    async registrar(auditoria) {
        try {
            const response = await axios.post(`${API_URL}/registrar`, auditoria);
            return response.data;
        } catch (error) {
            console.error('Error al registrar auditoría:', error);
            throw error;
        }
    }
};

export default auditoriaService;
