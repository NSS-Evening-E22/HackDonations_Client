/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { getOrganizations } from '../api/organizationData';
import { useAuth } from '../utils/context/authContext';
import OrganizationCard from '../components/OrganizationCard';

function Home() {
  const { user } = useAuth();

  const [organization, setOrganizations] = useState([]);

  const getAllTheOrganizations = () => {
    getOrganizations(user.uid).then(setOrganizations);
  };

  useEffect(() => {
    getAllTheOrganizations();
  }, []);

  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
    >
      <Link href="/organizations/new" passHref>
        <Button>Add A Organization</Button>
      </Link>
      <div className="d-flex flex-wrap">
        {organization.map((organizations) => (
          <OrganizationCard key={organizations.id} organizationObj={organizations} onUpdate={getAllTheOrganizations} />
        ))}
      </div>

    </div>
  );
}

export default Home;
