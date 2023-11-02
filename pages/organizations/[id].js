import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  Button, Form, Image, Modal, FloatingLabel,
} from 'react-bootstrap';
import { getSingleOrganization } from '../../api/organizationData';
import { useAuth } from '../../utils/context/authContext';
import { addDonationToOrganization, checkUserUID } from '../../api/donationData';

const initialState = {
  donationAmount: 0,
  comment: '',
  paymentType: '',
  userId: 0,
};

export default function ViewOrganizations() {
  const [organizationDetails, setOrganizationDetails] = useState();
  const [donationFormData, setDonationFormData] = useState(initialState);
  const [userObj, setUserObj] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [show, setShow] = useState(false);
  const router = useRouter();
  const { user } = useAuth();
  const { id } = router.query;

  const handleShow = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
    setSubmitted(false);
    window.location.reload();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDonationFormData((prevState) => ({
      ...prevState,
      [name]: value,
      userId: userObj[0]?.id,

    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    addDonationToOrganization(organizationDetails.id, donationFormData);
    setSubmitted(true);
  };

  console.log(donationFormData);

  const getOneOrganization = () => {
    getSingleOrganization(id).then(setOrganizationDetails);
  };

  const getCurrentUserUID = () => {
    checkUserUID(user.uid).then(setUserObj);
    console.log('userAuth:', user.uid);
    console.log('user:', userObj);
  };

  console.log(organizationDetails);

  useEffect(() => {
    getOneOrganization();
    getCurrentUserUID();
  }, []);

  return (
    <>
      <section className="ViewPageHeader">
        <div className="HeaderImage">
          <Image src={organizationDetails?.imageUrl} alt={organizationDetails?.title} style={{ width: '300px' }} />
        </div>
        <div className="HeaderButtons">
          <Button style={{ height: '3em', width: '10em' }}> Edit Page </Button>
          <Button style={{ height: '3em', width: '10em' }} variant="danger"> Delete Page </Button>
        </div>
      </section>
      <section className="ViewPageDonation">
        <Button style={{ height: '2.5em', width: '10em' }} variant="success" onClick={handleShow}> Add a Donation</Button>
      </section>
      <section>
        <div className="mt-5 d-flex flex-wrap">
          role:
          <p>{organizationDetails?.description || ''}</p>
          <br />
        </div>
      </section>
      { submitted === true ? (
        <Modal show={show} onHide={handleClose} style={{ color: 'black' }}>
          <br />
          <Modal.Body>
            <div className="ConfirmImage">
              <Image
                src={user.photoURL}
                width={200}
                height={200}
                style={{ borderRadius: '100%', boxShadow: '0px 0px 10px lightgray' }}
              />
            </div>
            <div className="ConfirmBody">
              <br />
              <h1>{user.displayName}</h1>
              <h5>Payment Type: {donationFormData.paymentType}</h5>
              <br />
              <h5>Donated: {donationFormData.donationAmount}</h5>
              <h2> <b className="ThankYou">Thank You</b> For Your Donation!</h2>
            </div>
          </Modal.Body>
          <Modal.Footer style={{ justifyContent: 'center' }}>
            <Button variant="success" onClick={handleClose}>
              Return to {organizationDetails?.title}
            </Button>
          </Modal.Footer>
        </Modal>
      ) : (
        <Modal show={show} onHide={handleClose} style={{ color: 'black' }}>
          <Modal.Header closeButton>
            <Modal.Title>{organizationDetails?.title} ID:{organizationDetails?.id}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h5>Enter Donation Amount</h5>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicNumber">
                <Form.Control
                  type="number"
                  placeholder="Enter Amount"
                  name="donationAmount"
                  value={donationFormData.donationAmount}
                  onChange={handleChange}
                />
              </Form.Group>

              <h5>Comment</h5>
              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Add a Comment</Form.Label>
                <Form.Control
                  type="textarea"
                  as="textarea"
                  rows={3}
                  placeholder="Say Something..."
                  name="comment"
                  value={donationFormData.comment}
                  onChange={handleChange}
                />
              </Form.Group>
              <FloatingLabel controlId="floatingSelect" label="Payment Method">
                <Form.Select
                  aria-label="Floating label select example"
                  name="paymentType"
                  value={donationFormData.paymentType}
                  onChange={handleChange}
                >
                  <option>Choose an option</option>
                  <option value="visa">Visa</option>
                  <option value="mastercard">Mastercard</option>
                  <option value="amex">American Express</option>
                  <option value="venmo">Venmo</option>
                </Form.Select>
              </FloatingLabel>
            </Form>
            <br />
            <h5> Total Amount: {donationFormData.donationAmount} </h5>
          </Modal.Body>
          <Modal.Body>
            <Button variant="success" onClick={handleSubmit}>
              Submit Donation
            </Button>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      ) }
    </>
  );
}
