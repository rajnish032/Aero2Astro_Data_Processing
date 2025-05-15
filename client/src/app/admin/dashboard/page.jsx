import dynamic from 'next/dynamic';
import { DataProvider } from '../../../Contexts/Admin';

const AdminPanel = dynamic(() => import('../../../components/AdminPanel'), { ssr: false });
const Dashboard = dynamic(() => import('../../../components/Admin/Dashboard'), { ssr: false });

export default function DashboardPage() {
  return (
    <DataProvider>
      <AdminPanel>
        <Dashboard />
      </AdminPanel>
    </DataProvider>
  );
}
