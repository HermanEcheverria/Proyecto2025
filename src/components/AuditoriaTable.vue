<template>
  <div>
    <table class="table-auto w-full border-collapse border border-gray-300">
      <thead>
        <tr class="bg-gray-200">
          <th class="border px-4 py-2">Acción</th>
          <th class="border px-4 py-2">Descripción</th>
          <th class="border px-4 py-2">Fecha</th>
          <th class="border px-4 py-2">Usuario</th>
          <th class="border px-4 py-2">Tipo de Cambio</th>
          <th class="border px-4 py-2">Categoría</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="registro in registros" :key="registro.idAuditoria" class="text-center">
          <td class="border px-4 py-2">{{ registro.accion }}</td>
          <td class="border px-4 py-2">{{ registro.descripcion }}</td>
          <td class="border px-4 py-2">{{ formatFecha(registro.fecha) }}</td>
          <td class="border px-4 py-2">{{ registro.idUsuario }}</td>
          <td class="border px-4 py-2">{{ registro.tipoCambio }}</td>
          <td class="border px-4 py-2">{{ registro.categoria }}</td>
        </tr>
        <tr v-if="registros.length === 0">
          <td colspan="6" class="text-center text-gray-500 py-4">No hay registros</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    registros: {
      type: Array,
      required: true
    }
  },
  methods: {
    formatFecha(fecha) {
      return new Date(fecha).toLocaleString();
    }
  }
};
</script>
