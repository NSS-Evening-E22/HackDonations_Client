import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import Link from 'next/link';

function OrganizationCard({ organizationObj }) {
  // const deleteThisOrganization = () => {
  //   if (window.confirm(`Delete this ${organizationObj.title}?`)) {
  //     deleteOrganization(organizationObj.id).then(() => onUpdate());
  //   }
  // };

  return (
    <Link href={`/organization/${organizationObj.id}`} passHref>
      <Card style={{ width: '18rem', margin: '10px' }}>
        <Card.Img variant="top" src={organizationObj?.imageUrl} alt={organizationObj?.title} style={{ height: '300px' }} />
        <Card.Body>
          <Card.Title>{organizationObj?.title}</Card.Title>
        </Card.Body>
      </Card>
    </Link>
  );
}

OrganizationCard.propTypes = {
  organizationObj: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    imageUrl: PropTypes.string,
    description: PropTypes.string,
    userId: PropTypes.number,
  }).isRequired,
};

export default OrganizationCard;
