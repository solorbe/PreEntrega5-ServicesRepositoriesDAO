import { bookingsService } from '../services/bookings.service.js';

// POST /api/bookings
// Crea una reserva nueva. El body puede traer client y date; si no vienen, las capas de abajo ponen valores por defecto.
export const createBooking = async (req, res) => {
  try {
    const newBooking = await bookingsService.createBooking(req.body);

    // 201 Created: se creó un recurso nuevo. Nace con services: [].
    res.status(201).json({ status: 'success', payload: newBooking });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// GET /api/bookings/:bid
// Devuelve una reserva puntual por id.
export const getBookingById = async (req, res) => {
  try {
    const booking = await bookingsService.getBookingById(req.params.bid);

    if (!booking) {
      // 404: el service devolvió null -> la reserva no existe.
      return res
        .status(404)
        .json({ status: 'error', message: 'Reserva no encontrada' });
    }

    res.status(200).json({ status: 'success', payload: booking });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// POST /api/bookings/:bid/services/:sid
// Agrega el servicio :sid a la reserva :bid. Si el servicio ya estaba en la reserva, incrementa su quantity (esa regla vive en el service).
export const addServiceToBooking = async (req, res) => {
  try {
    const { bid, sid } = req.params;

    const result = await bookingsService.addServiceToBooking(bid, sid);

    // El service devuelve un resultado de dominiotraducido a códigos HTTP.
    if (result.error === 'SERVICE_NOT_FOUND') {
      return res
        .status(404)
        .json({ status: 'error', message: 'Servicio no encontrado' });
    }

    if (result.error === 'BOOKING_NOT_FOUND') {
      return res
        .status(404)
        .json({ status: 'error', message: 'Reserva no encontrada' });
    }

    // Éxito: devolvemos la reserva ya actualizada.
    res.status(200).json({ status: 'success', payload: result.booking });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};