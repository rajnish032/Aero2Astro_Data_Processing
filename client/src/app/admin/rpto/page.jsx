import dynamic from 'next/dynamic';
import { DataProvider } from '../../../Contexts/Admin';
//import RPTOPage from '@/components/Admin/Pages/RPTOpage';

const AdminPanel = dynamic(() => import('../../../components/AdminPanel'), { ssr: false });

export default function DashboardPage() {
  return (
    <DataProvider>
      <AdminPanel>

        {/* <RPTOPage/> */}
        
      </AdminPanel>
    </DataProvider>
  );
}
