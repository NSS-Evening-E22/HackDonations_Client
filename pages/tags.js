/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button, Text } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import { getTags } from '../api/tagsData';

function ShowTags() {
  const [tags, setTags] = useState([]);
  const { user } = useAuth();
  const getAllTheTags = () => {
    getTags(user.uid).then(setTags);
  };
  useEffect(() => {
    getAllTheTags();
  }, []);

  return (
    <div className="text-center my-4">
      <Link href="/organizations/tags" passHref>
        <Button>Add A Tag</Button>
      </Link>
      <div className="d-flex flex-wrap">
        {/* TODO: map over tagss */}
        {tags.map((tag) => (
          <Text key={tag.id} tagObj={tag} onUpdate={getAllTheTags} />
        ))}
      </div>
    </div>
  );
}

export default ShowTags;
