import { reqUrl } from "@/utils/constants"
import axios from "axios"
import Cookies from "universal-cookie";
const cookies = new Cookies(null, { path: '/' });

// fetch all projects
export const getAllLog = async (setLog) => {
    const token = cookies.get('auth');
    try {
        const data = await axios.get(`${reqUrl}/gis/logs/all`,{
            headers: {
                Authorization: `Bearer ${token}`,
              },
              withCredentials: true,
        })
        setLog(data?.data?.allLog)
        return data;
    } catch (error) {
        console.log(error)
    }
}