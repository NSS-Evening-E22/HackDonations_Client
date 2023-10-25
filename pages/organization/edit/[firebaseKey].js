// import React, { useEffect, useState } from 'react';
// import { useRouter } from 'next/router';
// import { getSingleOrganization } from '../../../api/organizationData';
// import OrganizationForm from '../../../components/OrganizationForm';
//
// export default function EditDonation() {
// const [editItem, setEditItem] = useState({});
// const router = useRouter();
//
// const { firebaseKey } = router.query;
//
// useEffect(() => {
// getSingleOrganization(firebaseKey).then(setEditItem);
// }, []);
//
// return (<OrganizationForm obj={editItem} />);
// }
//
