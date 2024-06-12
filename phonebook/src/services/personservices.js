import axios from "axios";

const baseUrl = "http://localhost:3001/persons";

const getPersons = () => {
  const request = axios.get(baseUrl);
  return request;
};

const create = (newContact) => {
  const request = axios.post(baseUrl, newContact);
  return request;
};

const update = (id, newContact) => {
  const request = axios.put(`${baseUrl}/persons/${id}`, newContact);
  return request;
};

const deleteContact = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request;
};

const updateContact = (id) => {
  const request = axios.put(`${baseUrl}/${id}`);
  return request;
};

export default {
  getPersons,
  create,
  update,
  deleteContact,
  updateContact,
};