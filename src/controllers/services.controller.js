import { servicesService } from '../services/services.service.js';

// GET /api/services
// Lista todos los servicios. Filtro opcional por query string:
// /api/services?category=salud
// export const getServices = async (req, res) => {
//   try {
//     // El controller no filtra: solo le pasa al service lo que vino en
//     // la query string. La regla de "filtrar por categoría" vive en el
//     // service.
//     const { category, available } = req.query;
    
//     const payload = await servicesService.getServices({ category, available });
//     res.status(200).json({ status: 'success', payload });
//   } catch (error) {
//     res.status(500).json({ status: 'error', message: error.message });
//   }
// };

export const getServices = async (req, res) => {
  try {
    const { category, available } = req.query;

    let availableBoolean;

    if (available !== undefined) {
      if (available !== "true" && available !== "false") {
        return res.status(400).json({
          status: "error",
          message: 'El parámetro "available" debe ser true o false'
        });
      }

      availableBoolean = available === "true";
    }

    const payload = await servicesService.getServices({
      category,
      available: availableBoolean
    });

    res.status(200).json({
      status: "success",
      payload
    });

  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message
    });
  }
};

// GET /api/services/:sid
// Busca un servicio puntual por id.
export const getServiceById = async (req, res) => {
  try {
    const service = await servicesService.getServiceById(req.params.sid);

    if (!service) {
      // 404 Not Found: el service devolvió null -> el recurso no existe.
      return res
        .status(404)
        .json({ status: 'error', message: 'Servicio no encontrado' });
    }

    res.status(200).json({ status: 'success', payload: service });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// POST /api/services
// Crea un servicio nuevo a partir del body de la petición.
export const createService = async (req, res) => {
  try {
    const { name, description, duration, price, category, available } = req.body;

    // Validación de FORMATO del request: si falta algún campo
    // obligatorio, no seguimos. Esto es una regla del protocolo HTTP
    // (request mal armado -> 400), por eso se queda en el controller.
    // Las reglas de dominio van al service.
    if (!name || !description || !duration || !price || !category || available === undefined) {
      // 400 Bad Request: la petición está mal formada (culpa del cliente).
      return res
        .status(400)
        .json({ status: 'error', message: 'Faltan campos obligatorios' });
    }

    const newService = await servicesService.createService(req.body);

    // 201 Created: se creó un recurso nuevo.
    res.status(201).json({ status: 'success', payload: newService });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// PUT /api/services/:sid
// Actualiza (reemplaza campos de) un servicio existente.
export const updateService = async (req, res) => {
  try {
    const updatedService = await servicesService.updateService(
      req.params.sid,
      req.body
    );

    if (!updatedService) {
      return res
        .status(404)
        .json({ status: 'error', message: 'Servicio no encontrado' });
    }

    res.status(200).json({ status: 'success', payload: updatedService });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// DELETE /api/services/:sid
// Elimina un servicio del archivo de datos.
export const deleteService = async (req, res) => {
  try {
    const deletedService = await servicesService.deleteService(req.params.sid);

    if (!deletedService) {
      return res
        .status(404)
        .json({ status: 'error', message: 'Servicio no encontrado' });
    }

    res.status(200).json({ status: 'success', payload: deletedService });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// export const getServiceByName = async (req, res) => {
//   try {
//     const service = await serviceManager.getServiceByName(req.params.sname);
//     res.status(200).json({ status: 'success', payload: service });
//   } catch (error) {
//     res.status(500).json({ status: 'error', message: error.message });
//   }
// }
