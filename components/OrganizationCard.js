import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import Link from 'next/link';
import { deleteOrganization } from '../api/organizationData';

function OrganizationCard({ organizationObj, onUpdate }) {
  const deleteThisOrganization = () => {
    if (window.confirm(`Delete this ${organizationObj.title}?`)) {
      deleteOrganization(organizationObj.id).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Img variant="top" src={organizationObj?.imageUrl} alt={organizationObj?.title} style={{ height: '300px' }} />
      <Card.Body>
        <Card.Title>{organizationObj?.title}</Card.Title>
        <p className="card-text bold">{organizationObj?.title && <span>Title<br /></span> } ${organizationObj?.description}</p>
        <Link href={`/organizations/${organizationObj?.id}`} passHref>
          <Button variant="primary" className="m-2">VIEW</Button>
        </Link>
        <Button variant="danger" onClick={deleteThisOrganization} className="m-2">DELETE</Button>
      </Card.Body>
    </Card>
  );
}

OrganizationCard.propTypes = {
  organizationObj: PropTypes.shape({
    imageUrl: PropTypes.string,
    title: PropTypes.string,
    id: PropTypes.number,
    description: PropTypes.string,
    userId: PropTypes.number,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default OrganizationCard;
