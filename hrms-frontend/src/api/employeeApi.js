import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

export const getEmployeeById = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/employees/${id}`);
  return response.data;
};

export const createEmployee = async (employee) => {
  const response = await axios.post(`${API_BASE_URL}/employees`, employee);
  return response.data;
};

export const updateEmployee = async (id, updates) => {
  await axios.put(`${API_BASE_URL}/employees/${id}`, updates);
};

export const deleteEmployee = async (id) => {
  await axios.delete(`${API_BASE_URL}/employees/${id}`);
};