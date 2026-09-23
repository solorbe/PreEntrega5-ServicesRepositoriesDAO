import fs from 'fs/promises';

const filePath = './src/data/services.json';

const readServices = async () => {
  try {
    const data = await fs.readFile(filePath, 'utf-8');

    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

const writeServices = async (services) => {
  await fs.writeFile(filePath, JSON.stringify(services, null, 2));
};

export const getServices = async () => {
  const services = await readServices();

  return services;
};

export const getServiceById = async (id) => {
  const services = await readServices();

  const service = services.find((service) => service.id === Number(id));

  if (!service) {
    return null;
  }

  return service;
};

export const addService = async (serviceData) => {
  const { name, description, duration, price, category, available } = serviceData;

  if (!name || !description || !duration || !price || !category || available === undefined) {
    return {
      status: "error",
      message: "Faltan campos obligatorios"
    };
  }

  const services = await readServices();

  const newService = {
    id: services.length > 0
      ? services[services.length - 1].id + 1
      : 1,
    name,
    description,
    duration,
    price,
    category,
    available: available ?? true
  };

  services.push(newService);

  await writeServices(services);

  return {
    status: "success",
    payload: newService
  };
};

export const updateService = async (id, serviceData) => {
  const services = await readServices();

  const serviceIndex = services.findIndex((service) => service.id === Number(id));

  if (serviceIndex === -1) {
    return null;
  }

  const updatedService = {
    ...services[serviceIndex],
    ...serviceData,
    id: services[serviceIndex].id
  };

  services[serviceIndex] = updatedService;

  await writeServices(services);

  return {
    status: 'success',
    payload: updatedService
  };
};

export const deleteService = async (id) => {
  const services = await readServices();

  const serviceIndex = services.findIndex((service) => service.id === Number(id));

  if (serviceIndex === -1) {
    return null;
  }

  const deletedService = services.splice(serviceIndex, 1);

  await writeServices(services);

  return {
    status: 'success',
    payload: deletedService[0]
  };
};

export class ServiceManager  {
  async getServices() {
    return await getServices();
  }

  async getServiceById(id) {
    return await getServiceById(id);
  }

  async addService(serviceData) {
    return await addService(serviceData);
  }

  async updateService(id, serviceData) {
    return await updateService(id, serviceData);
  }

  async deleteService(id) {
    return await deleteService(id);
  }
};