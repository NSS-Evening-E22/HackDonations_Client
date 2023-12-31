import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getOrganizations = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/organizations`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

const deleteOrganization = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/organizations/${id}/remove`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

const getSingleOrganization = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/organization/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const createOrganization = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/organizations/new`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  }).then((response) => response.text())
    .then((data) => resolve(data))
    .catch(reject);
});

const updateOrganization = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/organizations/${payload.id}/update`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  }).then((response) => response.text())
    .then((data) => resolve(data))
    .catch(reject);
});

export {
  getOrganizations,
  deleteOrganization,
  getSingleOrganization,
  createOrganization,
  updateOrganization,
};
