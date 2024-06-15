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

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request;
};

const deleteContact = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request;
};

export default {
  getPersons,
  create,
  update,
  deleteContact,
};
