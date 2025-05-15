"use client"

import { useRecoilState } from 'recoil';
import { userData } from '@/atom/states';
import UserDetails from '../../../../../../components/Admin/Pages/UserDetails';
import AdminPanel from '../../../../../../components/AdminPanel';
import { DataProvider } from '../../../../../../Contexts/Admin';

export default function UserDetailsPage() {
 
const [state, setState] = useRecoilState(userData);

  return (
    <DataProvider>
      <AdminPanel>
        <UserDetails state={state}  />
      </AdminPanel>
    </DataProvider>
  );
}
