const axios = require("axios").default;
const apiUrl = "http://localhost:5000/tasks";

export function getTask() {
  return axios.get(apiUrl);
}

export function AddTask() {
  return axios.post(apiUrl);
}

export function updateTask(id, task) {
  return axios.patch(apiUrl + "/" + id, task);
}

export function deleteTask(id) {
  return axios.delete(apiUrl + "/" + id);
}
