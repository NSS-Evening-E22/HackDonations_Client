import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { FloatingLabel, Form, Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createOrganization, updateOrganization } from '../../api/organizationData';
// import { checkUser } from '../../utils/auth';
import { checkUserUID } from '../../api/donationData';
import { getTags } from '../../api/tagsData';

const initialState = {
  title: '',
  description: '',
  imageUrl: '',
  tag: '',
  userId: 0,
};

function OrganizationsForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [userObj, setUserObj] = useState({});
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [unformattedSelectedTags, setUnformattedSelectedTags] = useState('');
  const router = useRouter();
  const { user } = useAuth;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
      userId: userObj[0].id,
    }));
  };

  const handleCheckboxChange = (e) => {
    setUnformattedSelectedTags(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.id) {
      updateOrganization(formInput).then(() => router.push(`/organizations/${obj.id}/update`));
    } else {
      const payload = { ...formInput, selectedTags };
      createOrganization(payload).then(({ name }) => {
        const patchPayload = { id: name };
        updateOrganization(patchPayload).then(() => {
          router.push(`/organizations/${patchPayload.id}/update`);
        });
      });
    }
  };

  // const getCurrentUserId = () => {
  //   checkUserUID(user.uid).then(setUserObj);
  //   console.warn('userAuth:', user.uid);
  //   console.warn('user:', userObj);
  // };

  useEffect(() => {
    const getCurrentUserId = () => {
      checkUserUID(user?.uid).then(setUserObj);
      console.warn('userAuth:', user?.uid);
      console.warn('user:', userObj);
    };
    if (obj?.id) setFormInput(obj);
    getCurrentUserId();
  }, [obj, user?.uid, userObj]);

  useEffect(() => {
    getTags().then(setTags);
  }, []);

  useEffect(() => {
    const tagsSeparatedWithSymbol = unformattedSelectedTags.split('tagsSelected=');
    console.warn(tagsSeparatedWithSymbol, 'tagsSeparatedWithSymbol');
    const separatedTags = [];
    tagsSeparatedWithSymbol.forEach((unseparatedTag) => {
      const [tag1, tag2] = unseparatedTag.split('&');
      separatedTags.push(tag1);
      separatedTags.push(tag2);
    });
    console.warn(separatedTags, 'separatedTags');
    setSelectedTags(separatedTags);
  }, [unformattedSelectedTags]);

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

      {tags.map((tag) => (
        <>
          <input type="checkbox" onChange={handleCheckboxChange} id={tag.id} name="tagsSelected" value={tag.id} checked />
          <label htmlFor={tag.name}>{tag.name}</label>
        </>
      ))}

      {/* SUBMIT BUTTON  */}
      <Button type="submit">{obj.id ? 'Update' : 'Create'} Your Organization</Button>
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
