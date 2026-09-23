
import { ServiceManager } from "../dao/services.dao.js";

class ServicesService {
  constructor() {
    // El service es dueño de su manager: nadie más lo instancia.
    this.serviceManager = new ServiceManager();
  }

  // Devuelve la lista de servicios. 
  // Regla de negocio: si llega un filtro por categoría, se aplica acá 
  // el controller soloS pasa lo que vino en la query string, no filtra nada).
  async getServices(filtro = {}) {
    const { category, available } = filtro;
    const servicios = await this.serviceManager.getServices();
    if (category) {
      return servicios.filter((servicio) => servicio.category === category);
    }
    if (available === true || available === false) {
      return servicios.filter((servicio) => servicio.available === available);
    }
    return servicios;
  }

  // Devuelve el servicio con ese id, o null si no existe. 
  // La decisión de "null -> 404" es del controller; 
  // acá informamos que el dominio "no existe".
  async getServiceById(id) {
    return this.serviceManager.getServiceById(id);
  }

  // Crea un servicio. 
  // La validación de FORMATO del request (campos obligatorios) se queda en el controller porque es una regla del protocolo HTTP; acá asumimos que los datos ya vienen completos y solo orquestamos la persistencia.
  async createService(data) {
    return this.serviceManager.addService(data);
  }

  // Actualiza un servicio existente. 
  // Devuelve el servicio ya actualizado, o null si no existía.
  async updateService(id, data) {
    return this.serviceManager.updateService(id, data);
  }

  // Elimina un servicio. 
  // Devuelve el servicio eliminado, o null si no existía.
  async deleteService(id) {
    return this.serviceManager.deleteService(id);
  }
}

// Exportamos una única instancia
// los que importen este módulo comparten el mismo service y, por lo tanto, el mismo manager.
export const servicesService = new ServicesService();