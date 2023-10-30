import React from 'react';
import PropTypes from 'prop-types';
import { ListGroup } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';

export default function User({ user }) {
  let photo = '';
  if (user.ImageUrl === null) {
    photo = 'https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=';
  } else {
    photo = user.ImageUrl;
  }
  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Img variant="top" src={photo} alt="profile picture" style={{ height: 'auto' }} />
      <Card.Body>
        <Card.Title>{`${user.Name}`}</Card.Title>
        <Card.Text>
          {user.Email}
        </Card.Text>
        <Card.Text>
          {user.PhoneNumber}
        </Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>Bio: {user.Bio}</ListGroup.Item>
      </ListGroup>
    </Card>
  );
}

User.propTypes = {
  user: PropTypes.shape({
    ImageUrl: PropTypes.string,
    Name: PropTypes.string,
    Bio: PropTypes.string,
    Email: PropTypes.string,
    PhoneNumber: PropTypes.string,
  }).isRequired,
};
