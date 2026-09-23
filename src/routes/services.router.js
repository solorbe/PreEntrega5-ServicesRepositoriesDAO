import { Router } from 'express';
import {
  getServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
} from "../controllers/services.controller.js";


const router = Router();

router.get('/', getServices);
router.get('/:sid', getServiceById);
router.post('/', createService);
router.put('/:sid', updateService);
router.delete('/:sid', deleteService);

export default router;
/*
Método	Ruta	Comportamiento
GET	/api/services	Devuelve todos los servicios. Acepta filtros por query params: ?category=salud, ?available=true
GET	/api/services/:sid	Devuelve el servicio por id. 200 si existe, 404 si no
POST	/api/services	Crea un servicio con los datos del body. id generado automáticamente. 201 si se crea, 400 si faltan campos
PUT	/api/services/:sid	Actualiza el servicio. No permite modificar el id. 200 si existe, 404 si no
DELETE	/api/services/:sid	Elimina el servicio. 200 si existe, 404 si no
*/