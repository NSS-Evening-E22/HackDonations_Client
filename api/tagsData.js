import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getTags = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/organizations/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => response.text())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

const deleteTags = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/tags/${id}/remove`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

const getSingleTag = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/tags/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const createTag = (payload) => new Promise((resolve, reject) => {
  fetch('https://localhost:7183/organizations/new', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  }).then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

export {
  getTags,
  deleteTags,
  getSingleTag,
  createTag,
};
