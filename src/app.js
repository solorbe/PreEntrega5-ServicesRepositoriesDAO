
import express from "express";

import servicesRouter from "./routes/services.router.js";
import bookingsRouter from "./routes/bookings.router.js";

const app = express();

app.use(express.json()); //midlleware para parsear el body de las peticiones entrantes en formato JSON

app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "API del Sistema de Turnos y Reservas"
  });
});

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use('/api/services', servicesRouter);
app.use('/api/bookings', bookingsRouter);

export default app;

