import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { getOrganizations } from '../api/organizationData';
import { useAuth } from '../utils/context/authContext';
import OrganizationCard from '../components/OrganizationCard';

function ShowOrganizations() {
  const [organizations, setOrganizations] = useState([]);
  const { user } = useAuth();

  const getAllTheOrganizations = () => {
    getOrganizations(user.uid).then(setOrganizations);
  };

  useEffect(() => {
    getAllTheOrganizations();
  }, []);

  return (
    <div className="text-center my-4">
      <Link href="/organization/new" passHref>
        <Button>Add an Organization</Button>
      </Link>
      <div className="d-flex flex-wrap">
        {/* TODO: map over books here using BookCard component */}
        {organizations.map((organization) => (
          <OrganizationCard key={organization.id} organizationObj={organization} onUpdate={getAllTheOrganizations} />
        ))}
      </div>
    </div>
  );
}

export default ShowOrganizations;
