import { UserProvider } from '../../../Contexts/User';
import UserDashboard from '../../../components/User/UserDashboard';

const ProfilePage = () => {
  return (
    <UserProvider>
      <UserDashboard />
    </UserProvider>
  );
};

export default ProfilePage;