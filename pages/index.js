/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { getOrganizations } from '../api/organizationData';
import { signOut } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';
import OrganizationCard from '../components/OrganizationCard';

function Home() {
  const { user } = useAuth();

  const [organizations, setOrganizations] = useState([]);

  const getAllTheOrganizations = () => {
    getOrganizations(user.uid).then(setOrganizations);
  };

  useEffect(() => {
    // getAllTheOrganizations();
  }, []);

  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
    >
      <Link href="/organizations/new" passHref>
        <Button>Add A Organization</Button>
      </Link>
      <div className="d-flex flex-wrap">
        {organizations.map((organization) => (
          <OrganizationCard key={organization.id} obj={organization} onUpdate={getAllTheOrganizations} />
        ))}
      </div>
      <h1>Hello {user.displayName}! </h1>
      <p>Click the button below to logout!</p>
      <Button variant="danger" type="button" size="lg" className="copy-btn" onClick={signOut}>
        Sign Out
      </Button>
    </div>
  );
}

export default Home;
