import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import Link from 'next/link';
import { deleteOrganization } from '../api/organizationData';

function OrganizationCard({ organizationObj, onUpdate }) {
  const deleteThisOrganization = () => {
    if (window.confirm(`Delete this ${organizationObj.name}?`)) {
      deleteOrganization(organizationObj.id).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Img variant="top" src={organizationObj?.image} alt={organizationObj?.name} style={{ height: '300px' }} />
      <Card.Body>
        <Card.Title>{organizationObj?.name}</Card.Title>
        <p className="card-text bold">{organizationObj.donation && <span>DONATION<br /></span> } ${organizationObj.amount}</p>
        <Link href={`/organizations/${organizationObj.id}`} passHref>
          <Button variant="primary" className="m-2">VIEW</Button>
        </Link>
        <Button variant="danger" onClick={deleteThisOrganization} className="m-2">DELETE</Button>
      </Card.Body>
    </Card>
  );
}

OrganizationCard.propTypes = {
  organizationObj: PropTypes.shape({
    image: PropTypes.string,
    title: PropTypes.string,
    name: PropTypes.string,
    donation: PropTypes.string,
    amount: PropTypes.string,
    id: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
