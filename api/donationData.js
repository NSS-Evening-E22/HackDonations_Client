const getAllDonations = () => new Promise((resolve, reject) => {
  fetch('https://localhost:7183/donations', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const checkUserID = (id) => new Promise((resolve, reject) => {
  fetch(`https://localhost:7183/users/return/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const checkUserUID = (uid) => new Promise((resolve, reject) => {
  fetch(`https://localhost:7183/users/${uid}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getSingleDonations = (id) => new Promise((resolve, reject) => {
  fetch(`https://localhost:7183/donations/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getDonationsFromOrganization = (id) => new Promise((resolve, reject) => {
  fetch(`https://localhost:7183/organizations/${id}/donationlist`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const addDonationToOrganization = (id, payload) => new Promise((resolve, reject) => {
  fetch(`https://localhost:7183/organizations/${id}/donations`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then(async (res) => {
      let data;
      if (res.ok) {
        data = await res.json();
        resolve(data);
      }
    })
    .catch(reject);
});

const deleteDonations = (id) => new Promise((resolve, reject) => {
  fetch(`https://localhost:7183/donations/${id}/remove`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

export {
  getAllDonations,
  getSingleDonations,
  getDonationsFromOrganization,
  addDonationToOrganization,
  deleteDonations,
  checkUserID,
  checkUserUID,
};
