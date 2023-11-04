import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { FloatingLabel, Form, Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createOrganization, updateOrganization } from '../../api/organizationData';

const initialState = {
  title: '',
  description: '',
  imageUrl: '',
  tag: '',
  userId: 0,

};

function OrganizationsForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth;
  const getCurrentUserUID = () => {
    console.warn('user:', obj);
  };

  useEffect(() => {
    if (obj?.id) setFormInput(obj);
    console.warn(obj.id);
    getCurrentUserUID();
  }, [obj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
      userId: obj[0]?.id,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.id) {
      updateOrganization(formInput).then(() => router.push(`/organizations/${obj.id}/update`));
    } else {
      const payload = { ...formInput, userId: user?.userId };
      console.warn(user?.id);
      createOrganization(payload).then(({ name }) => {
        const patchPayload = { id: name };
        updateOrganization(patchPayload).then(() => {
          router.push(`/organizations/${patchPayload.id}/update`);
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj?.id ? 'Update' : 'Create'} Your Organization</h2>

      {/* Title INPUT  */}
      <FloatingLabel controlId="floatingInput1" label="Organization Title" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter a title"
          name="title"
          value={formInput.title}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* Description INPUT  */}
      <FloatingLabel controlId="floatingInput2" label="Organization Description" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter a description"
          name="description"
          value={formInput.description}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* IMAGE INPUT  */}
      <FloatingLabel controlId="floatingInput3" label="Organization Image" className="mb-3">
        <Form.Control
          type="url"
          placeholder="Enter an Organization url"
          name="imageUrl"
          value={formInput.imageUrl}
          onChange={handleChange}
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput4" label="User Id" className="mb-3">
        <Form.Control
          type="text"
          placeholder="userId"
          name="userId"
          value={formInput.userId}
          onChange={handleChange}
          required
        />
      </FloatingLabel>
      {/* SUBMIT BUTTON  */}
      <Button type="submit">{obj?.id ? 'Update' : 'Create'} Your Organization</Button>
    </Form>
  );
}

OrganizationsForm.propTypes = {
  obj: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    imageUrl: PropTypes.string,
    userId: PropTypes.number,
    id: PropTypes.number,
  }),
};

OrganizationsForm.defaultProps = {
  obj: initialState,
};

export default OrganizationsForm;
