import dynamic from 'next/dynamic';
import { DataProvider } from '../../../../Contexts/Admin';

const AllUsers = dynamic(() => import('../../../../components/Admin/Pages/AllUsers'), { ssr: false });
const AdminPanel = dynamic(() => import('../../../../components/AdminPanel'), { ssr: false });

export default function AllUsersPage() {
  return (
    <DataProvider>
      <AdminPanel>
        <AllUsers />
      </AdminPanel>
    </DataProvider>
  );
}
