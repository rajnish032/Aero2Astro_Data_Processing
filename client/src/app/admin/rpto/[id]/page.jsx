import { DataProvider } from '@/Contexts/Admin';
//import RPTODetails from '@/components/Admin/Pages/RPTODetails';
import AdminPanel from '@/components/AdminPanel';
import dynamic from 'next/dynamic';


export default function DashboardPage() {
  return (
    <DataProvider>
      <AdminPanel>

        {/* <RPTODetails/> */}
        
      </AdminPanel>
    </DataProvider>
  );
}
