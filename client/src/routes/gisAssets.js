import { reqUrl } from "@/utils/constants"
import axios from "axios"
import Cookies from "universal-cookie";
const cookies = new Cookies(null, { path: '/' });

// fetch all projects
export const getAllAssets= async (setAllAssets) => {
    const token = cookies.get('auth');
    try {
        const data = await axios.get(`${reqUrl}/gis/assets/all`,{
            headers: {
                Authorization: `Bearer ${token}`,
              },
              withCredentials: true,
        })
        setAllAssets(data?.data?.assets)
        return data;
    } catch (error) {
        console.log(error)
    }
}