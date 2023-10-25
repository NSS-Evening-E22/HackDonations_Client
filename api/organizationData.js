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

const deleteOrganization = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/organizations/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

const getSingleOrganization = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/organizations/${firebaseKey}.json`, {
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
  fetch(`${endpoint}/organizations/${payload.firebaseKey}.json`, {
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
