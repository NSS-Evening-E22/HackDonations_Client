import Head from 'next/head';
import User from '../components/User';
import { useAuth } from '../utils/context/authContext';

export default function Profile() {
  const { user } = useAuth();

  return (
    <div className="mt-5 mx-auto">
      <Head>
        <title>User Profile</title>
      </Head>
      <User user={user} />
    </div>
  );
}
