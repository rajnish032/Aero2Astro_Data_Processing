import Header from "@/components/commons/Header";
import Dashboard from "@/components/gisDashboard/Dashboard";
import GisSideBar from "@/components/commons/GisSideBar";

export default function Page({ params }) {
  
  return (
    <div className="flex">
      <GisSideBar />
      {/* outer wrapper */}
      <div className='flex flex-col flex-1 overflow-y-auto  h-screen'>
        <Header />

        {/* Main page container */}
        <div className=" bg-gray-100 h-auto max-sm:pt-4 max-sm:px-1 max-md:p-5 p-7">
          {/* <h1 className="md:text-2xl text-lg max-sm:px-3 font-semibold mb-5  opacity-70">Dashboard</h1> */}

          <Dashboard />

        </div>


      </div>

    </div>

  )
}