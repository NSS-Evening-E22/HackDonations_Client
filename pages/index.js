/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { getOrganizations } from '../api/organizationData';
import { useAuth } from '../utils/context/authContext';
import OrganizationCard from '../components/OrganizationCard';

function Home() {
  const [organizations, setOrganizations] = useState([]);
  const { user } = useAuth();

  const getAllTheOrganizations = () => {
    getOrganizations().then(setOrganizations);
  };

  useEffect(() => {
    getAllTheOrganizations();
    console.log(organizations);
  }, []);

  return (
    <>
      <h1>Hello {user.displayName}! </h1>

      <div
        className="text-center d-flex flex-column justify-content-center align-content-center"
      >
        <Link href="/organization/new" passHref>
          <Button>Add A Organization</Button>
        </Link>
        <section className="RenderCards">
          <div className="RenderTitle">
            <h1> Render Cards Here! </h1>
          </div>
          <div className="d-flex flex-wrap">
            {organizations?.map((organization) => (
              <OrganizationCard key={organization.id} organizationObj={organization} onUpdate={getAllTheOrganizations} />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

export default Home;
