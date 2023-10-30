// import PropTypes from 'prop-types';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useRouter } from 'next/router';
import { FloatingLabel } from 'react-bootstrap';
import { registerUser } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';

const initialState = {
  Name: '',
  Bio: '',
  Email: '',
  PhoneNumber: '',
  ImageUrl: '',
};

function RegisterForm() {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    const payload = {
      ...formInput, uid: user.uid,
    };
    registerUser(payload).then(() => {
      router.push('/');
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2>User Registration</h2>

      {/* FIRST NAME INPUT  */}
      <FloatingLabel controlId="floatingInput1" label="Name" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter your Name"
          name="Name"
          value={formInput.Name}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* BIO INPUT  */}
      <FloatingLabel controlId="floatingInput4" label="Bio" className="mb-3">
        <Form.Control
          type="textbox"
          placeholder="Enter your Bio"
          name="Bio"
          value={formInput.Bio}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* EMAIL INPUT  */}
      <FloatingLabel controlId="floatingInput3" label="Email" className="mb-3">
        <Form.Control
          type="email"
          placeholder="Enter your Email"
          name="Email"
          value={formInput.Email}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* PROFILE PICTURE INPUT  */}
      <FloatingLabel controlId="floatingInput5" label="ImageUrl" className="mb-3">
        <Form.Control
          type="url"
          placeholder="Enter your Profile Picture URL"
          name="ImageUrl"
          value={formInput.ImageUrl}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* SUBMIT BUTTON  */}
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default RegisterForm;
