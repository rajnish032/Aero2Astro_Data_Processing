"use client"

import { useState } from "react";
import axios from "axios";
import { requestUrl } from "../../utils/constants.js";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Cookies from "universal-cookie";
const cookies = new Cookies(null, { path: "/", sameSite: 'lax' })

const AdminLogin = () => {
    const router = useRouter()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [otpsent, setotpsent] = useState(false);
    const [resetPassword, setResetPassword] = useState(false);
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [resetLoading, setResetLoading] = useState(false);
    const [otpresend, setotpresend] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault()
        if (email && password) {
            setLoading(true);
            try {

                const response = await axios.post(`${requestUrl}/admin_login`, { email, password },
                    { withCredentials: true }
                );
                const token = response.data.token;
                const expirationDate = new Date(Date.now() + (2 * 24 * 60 * 60 * 1000));
                cookies.set('adauth', token, { expires: expirationDate, path: '/' });

                setLoading(false);
                toast.success("Login successful");
                router.push("/admin/dashboard");
            } catch (error) {

                toast.error(error.response.data.message || "Incorrect Credentials");

                setLoading(false);
            }
        }
        else {
            toast.error("Kindly fill email and password"
                , { duration: 2000 }
            )
        }
    };

    const handleResetPassword = async () => {
        if (email && newPassword) {

            setResetLoading(true);
            setotpresend(true)
            try {
                const response = await axios.post(`${requestUrl}/reset/admin/password`, { email: email, newpassword: newPassword }
                    , {
                        withCredentials: true
                    }
                );
                const token = response.data.token;
                const expirationDate = new Date(Date.now() + (5 * 60 * 1000));
                cookies.set('adreset', token, { expires: expirationDate, path: '/' });

                setResetPassword(true);

                setResetLoading(false);
                setotpsent(true);
                setotpresend(false)

                toast.success("Otp Sent to the email")
            } catch (error) {
                toast.error("Could not send Try again!")
                setResetLoading(false);
                setotpresend(false)

            }
        }
        else {
            toast.error("Kindly fill email and password"
                , { duration: 2000 }
            )

        }
    };

    const handleVerifyOtp = async () => {
        if (!otp) {
            toast.error("Kindly fill OTP"
                , { duration: 2000 }
            )
            return;
        }
        try {
            const adreset = cookies.get("adreset");
            const response = await axios.post(`${requestUrl}/verify/admin`, { otp }
                , {
                    headers: {
                        'adreset': adreset
                    },
                    withCredentials: true
                }
            );

            const token = response.data.token;
            const expirationDate = new Date(Date.now() + (2 * 24 * 60 * 60 * 1000));
            cookies.set('adauth', token, { expires: expirationDate, path: '/' });
            cookies.remove("adreset")

            toast.success("Password reset successful");
            router.push("/admin/dashboard");

        } catch (error) {
            toast.error(error.response.data.message || "OTP verification failed");

        }
    };


    return (
        <div className="w-full relative  min-h-screen p-3 flex items-center justify-center bg-black ">
            <div className="bg-white max-w-[500px] my-[100px] flex-grow  mx-5 rounded-lg relative  w-full shadow-lg text-gray-800 font-semibold p-4 py-5 h-fit  ">
                {resetPassword && <span className="text-blue-600 cursor-pointer"
                    onClick={(e) => {
                        e.stopPropagation()
                        setResetPassword(false)
                    }
                    }>Back</span>}
                <div className="text-center my-5 text-xl font-bold">
                    <p>Admin Login</p>
                </div>
                {!resetPassword ? (
                    <form className="text-center w-full ">
                        <input
                            className="w-full p-3 rounded-md my-4 text-gray-800 border-2"
                            type="email"
                            autoComplete={false.toString()}

                            placeholder="Enter Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            className="w-full p-3 rounded-md my-4 text-gray-800 border-2"
                            type="password"
                            autoComplete={false.toString()}
                            placeholder="Enter Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                            className={`${loading ? "cursor-not-allowed bg-gray-300" : "bg-black hover:bg-gray-900 "
                                } my-3 w-full max-w-[90%] mx-auto p-4 rounded-md block text-lg font-bold text-white `}
                            onClick={(e) => handleLogin(e)}
                            disabled={loading}
                        >
                            {loading ? "Logging in..." : "Login"}
                        </button>
                        <p
                            className="cursor-pointer text-blue-500"
                            onClick={() => {

                                setNewPassword('')
                                setResetPassword(true)
                                setPassword('');
                            }

                            }
                        >
                            Reset admin password credentials
                        </p>
                    </form>
                ) : (
                    <div>
                        <p className="text-xs px-2 font-bold">Enter your email id</p>

                        <input
                            type="email"
                            autoComplete={false.toString()}
                            className="w-full p-3 rounded-md mt-2 mb-6 text-gray-800 border-2"
                            placeholder="Enter Admin Email"
                            disabled={otpsent}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <p className="text-xs px-2 font-bold">Enter New Password</p>
                        <input
                            type="password"
                            autoComplete={false.toString()}
                            className="w-full p-3 rounded-md mt-2 mb-6 text-gray-800 border-2"
                            placeholder="Enter New Password"
                            disabled={otpsent}
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />

                        {!otpsent && <button
                            className={`${resetLoading ? "cursor-not-allowed bg-gray-300" : "bg-black hover:bg-gray-900 "
                                } my-3 w-full max-w-[90%] mx-auto p-4 rounded-md block text-lg font-bold text-white `}
                            onClick={handleResetPassword}
                            disabled={resetLoading}
                        >
                            {resetLoading ? "Resetting Password..." : "Reset Password"}

                        </button>}
                        {otpsent && <> <input
                            type="number"
                            maxLength="6"
                            min={0}
                            className="w-full p-3 rounded-md my-4 text-gray-800 border-2"
                            placeholder="Enter OTP"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                        />
                            {<p onClick={handleResetPassword}>{otpresend ? "Resending..." : "Resent"}</p>}
                            <button
                                className={`${loading ? "cursor-not-allowed bg-gray-300" : "bg-black hover:bg-gray-900 "
                                    } my-3 w-full max-w-[90%] mx-auto p-4 rounded-md block text-lg font-bold text-white `}
                                onClick={handleVerifyOtp}
                                disabled={loading}
                            >
                                Verify OTP
                            </button></>}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminLogin;
