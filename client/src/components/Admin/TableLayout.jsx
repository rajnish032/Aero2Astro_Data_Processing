import { GrView } from "react-icons/gr";
import { TiUserDelete } from "react-icons/ti";
import Link from "next/link";


const TableLayout = ({ mappingData }) => {
  console.log(mappingData);
  const notFound = "Not found";
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
        <thead className="text-xs  uppercase bg-gray-950 text-white">
          <tr>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              User Type
            </th>
            <th scope="col" className="px-6 py-3">
              Partener
            </th>
            <th scope="col" className="px-6 py-3">
              City
            </th>
            <th scope="col" className="px-6 py-3">
              Contact
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="text-gray-800">

          {
            mappingData?.map((item) =>

              <tr key={item.user._id} className="bg-white border-b text-gray-800">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                >
                  {item.user.fullName || notFound}
                </th>
                <td className="px-6 py-4">
                  {item.user.userType || notFound}

                </td>
                <td className="px-6 py-4">
                  {item.user.partenerType || notFound}

                </td>
                <td className="px-6 py-4">
                  {item.user.city || notFound}

                </td>
                <td className="px-6 py-4">
                  {item.user.phone.countryCode || notFound} &nbsp;
                  {item.user.phone.number || notFound}

                </td>
                <td className="px-6 py-4">
                  <Link href={`${item.user.fullName}/${item.user._id}`}
                    state={{ user: item.user, equipmentDetail: item.equipmentDetail }}

                  ><GrView size={20} className="cursor-pointer inline-block hover:text-green-700 text-green-500 mx-2" />
                  </Link>
                  <TiUserDelete size={20} className="cursor-pointer hover:text-red-700 inline-block text-red-500 mx-2" />
                </td>
              </tr>

            )

          }


        </tbody>
      </table>
    </div>
  );
}

export default TableLayout;
