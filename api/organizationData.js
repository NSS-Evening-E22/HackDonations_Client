import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getOrganizations = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/organizations.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

const deleteOrganization = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/organizations/${id}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

const getSingleOrganization = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/organizations/${id}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const createOrganization = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/organizations.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  }).then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const updateOrganization = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/organizations/${payload.id}.json`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  }).then((response) => response.json())
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
