import { UserProvider } from '../../../Contexts/User';
import UserProfilePage from '../../../components/User/UserProfilePage';

const ProfilePage = () => {
  return (
    <UserProvider>
      <UserProfilePage />
    </UserProvider>
  );
};

export default ProfilePage;