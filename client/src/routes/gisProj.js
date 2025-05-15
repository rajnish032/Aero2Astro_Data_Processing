import { reqUrl } from "@/utils/constants"
import axios from "axios"
import Cookies from "universal-cookie";
const cookies = new Cookies(null, { path: '/' });

// fetch all projects
export const getAllProj = async (setProj) => {
    const token = cookies.get('auth');
    try {
        const data = await axios.get(`${reqUrl}/gis/projects/all`,{
            headers: {
                Authorization: `Bearer ${token}`,
              },
              withCredentials: true,
        })
        setProj(data?.data?.allProj)
        return data;
    } catch (error) {
        console.log(error)
    }
}