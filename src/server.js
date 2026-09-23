//pone en marcha el servidor físico para que escuche las peticiones en un puerto.
//node server.js
//     ↓
// server.js
//     ↓
// importa app.js
//     ↓
// app.js configura Express
//     ↓
// vuelve a server.js
//     ↓
// app.listen()
//     ↓
// servidor iniciado

import dotenv from "dotenv";
import app from "./app.js";
import { config } from "./config/env.config.js";

dotenv.config();

const PORT = config.port;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
