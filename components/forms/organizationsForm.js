import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { FloatingLabel, Form, Button } from 'react-bootstrap';
import { createOrganization, updateOrganization } from '../../api/organizationData';
import { useAuth } from '../../utils/context/authContext';

const initialState = {
  title: '',
  description: '',
  imageUrl: '',
  tag: '',
  userId: '',
};

function OrganizationsForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth;

  useEffect(() => {
    if (obj?.id) setFormInput(obj);
  }, [obj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.id) {
      updateOrganization(formInput).then(() => router.push('/routeHere'));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createOrganization(payload).then(({ name }) => {
        const patchPayload = { id: name };
        updateOrganization(patchPayload).then(() => {
          router.push('/routeHere');
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
      <FloatingLabel controlId="floatingInput1" label="Organization Description" className="mb-3">
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
      <FloatingLabel controlId="floatingInput2" label="Organization Image" className="mb-3">
        <Form.Control
          type="url"
          placeholder="Enter an donation url"
          name="image"
          value={formInput.imageUrl}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <Form.Check
        className="text-white mb-3"
        type="switch"
        id="tag"
        name="tag"
        label="On Sale?"
        checked={formInput.tag}
        onChange={(e) => {
          setFormInput((prevState) => ({
            ...prevState,
            tag: e.target.checked,
          }));
        }}
      />

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
    tag: PropTypes.string,
    uid: PropTypes.string,
    id: PropTypes.string,
  }),
};

OrganizationsForm.defaultProps = {
  obj: initialState,
};

export default OrganizationsForm;
