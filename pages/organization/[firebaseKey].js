import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Image } from 'react-bootstrap';
import { getSingleOrganization } from '../../api/organizationData';

export default function ViewOrganizations() {
  const [organizationDetails, setOrganizationDetails] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleOrganization(firebaseKey).then(setOrganizationDetails);
  }, [firebaseKey]);

  return (
    <div className="mt-5 d-flex flex-wrap">
      <div className="d-flex flex-column">
        <Image src={organizationDetails.imageUrl} alt={organizationDetails.title} style={{ width: '300px' }} />
      </div>
      role:
      <p>{organizationDetails.description || ''}</p>
      <hr />
    </div>
  );
}
