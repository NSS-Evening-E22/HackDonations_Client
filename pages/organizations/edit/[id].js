import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleOrganization } from '../../../api/organizationData';
import OrganizationsForm from '../../../components/forms/organizationsForm';

export default function EditDonation() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();

  const { id } = router.query;

  useEffect(() => {
    getSingleOrganization(id).then(setEditItem);
  }, [id]);

  return (<OrganizationsForm obj={editItem} />);
}
