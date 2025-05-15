import {  UserProvider } from "@/Contexts/User";
import ProfilePreview from "@/components/User/ProfilePreview";
const preview = () => {
  return (
    <UserProvider>
    <ProfilePreview/>
    </UserProvider>
  );
};

export default preview;
