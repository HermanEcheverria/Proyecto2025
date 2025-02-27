<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">Módulo de Auditoría</h1>

    <!-- Filtros -->
    <div class="flex space-x-4 mb-4">
      <input v-model="filtros.fechaInicio" type="date" class="border p-2" placeholder="Fecha inicio">
      <input v-model="filtros.fechaFin" type="date" class="border p-2" placeholder="Fecha fin">
      <input v-model="filtros.idUsuario" type="number" class="border p-2" placeholder="ID Usuario">
      <select v-model="filtros.tipoCambio" class="border p-2">
        <option value="">Todos</option>
        <option value="Usuario">Usuario</option>
        <option value="Diagnóstico">Diagnóstico</option>
        <option value="Venta">Venta</option>
      </select>
      <button @click="filtrarAuditoria" class="bg-blue-500 text-white px-4 py-2">Filtrar</button>
    </div>

    <!-- Tabla de Auditoría -->
    <AuditoriaTable :registros="registros" />

    <!-- Paginación -->
    <div class="mt-4">
      <button @click="cargarPagina(pagina - 1)" :disabled="pagina === 0" class="bg-gray-300 px-4 py-2">Anterior</button>
      <span class="mx-4">Página {{ pagina + 1 }}</span>
      <button @click="cargarPagina(pagina + 1)" class="bg-gray-300 px-4 py-2">Siguiente</button>
    </div>
  </div>
</template>

<script>
import AuditoriaTable from '@/components/AuditoriaTable.vue';
import auditoriaService from '@/services/auditoriaService';

export default {
  components: { AuditoriaTable },
  data() {
    return {
      registros: [],
      pagina: 0,
      tamano: 10,
      filtros: {
        fechaInicio: '',
        fechaFin: '',
        idUsuario: '',
        tipoCambio: ''
      }
    };
  },
  methods: {
    async cargarPagina(nuevaPagina) {
      if (nuevaPagina < 0) return;
      this.pagina = nuevaPagina;
      this.registros = await auditoriaService.listar(this.pagina, this.tamano);
    },
    async filtrarAuditoria() {
      this.registros = await auditoriaService.filtrar(this.filtros);
    }
  },
  async mounted() {
    await this.cargarPagina(0);
  }
};
</script>
