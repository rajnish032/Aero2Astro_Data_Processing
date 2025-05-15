"use client"

import { Form, Input } from "antd";
import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import logo from "../../assets/logo.png";
import { requestUrl } from "../../utils/constants";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Cookies from 'universal-cookie';
const cookies = new Cookies(null, { path: '/', sameSite: 'lax' });
export default function UserLogin() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const verifySession = async () => {
      try {
        const auth = cookies.get('auth');
        if (!auth) {
          return;
        }
        const response = await axios.get(`${requestUrl}/user/verifysession`, {
          headers: {
            Authorization: `Bearer ${auth}`,
          },
          withCredentials: true,
        });

        const { status, fullName, isSuspended = false } = response.data;
        if (status === 'approved') {
          if (isSuspended) {
            router.push('/user/profile');
            toast.success("Welcome back");
          } else {
            router.push(`/gis/dashboard/${fullName?.toLowerCase().replace(' ', '-')}`);
            toast.success("Welcome back");
          }
        } else {
          router.push('/user/profile');
          toast.success("Welcome back");
        }
      } catch (error) {
        cookies.remove('auth');
        console.error("Error verifying session:", error);
      }
    };
    verifySession();
  }, [router]);


  const handleLogin = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${requestUrl}/gis/login`,
        { email: values.email, password: values.password },
        { withCredentials: true }
      );

      const token = response?.data.token;
      const expirationDate = new Date(Date.now() + (2 * 24 * 60 * 60 * 1000));
      cookies.set('auth', token, { expires: expirationDate, path: '/' });

      const status = response?.data?.user?.status;
      const fullName = response?.data?.user?.fullName;
      const isSuspended = response?.data?.user?.isSuspended || false;
      if (status === 'approved') {
        if (isSuspended === true) {
          router.push('/user/profile');
          toast.success("Welcome back");
        } else {
          router.push(`/gis/dashboard/${fullName?.toLowerCase().replace(' ', '-')}`);
          toast.success("Welcome back");
        }

      } else {
        router.push('/user/profile');
        toast.success("Welcome back");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed, please try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <Link href={"/"} className="overflow-clip relative block mx-auto h-24 w-40 ">
            <Image className="absolute inset-0 scale-150 " width={"100%"} height={"100%"} src={logo} alt="Aero2Astro" /></Link>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Login to Dashboard
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{" "}
            <Link
              href="/"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Register as GIS Data Processing
            </Link>
          </p>
        </div>
        <Form
          form={form}
          onFinish={handleLogin}
          className="mt-8 space-y-6"
        >
          <div className="rounded-md shadow-sm -space-y-px">
            <Form.Item
              name="email"
              rules={[{ required: true, message: "Email is required" }]}
            >
              <Input
                type="email"
                size="large"
                autoComplete="true"
                required
                placeholder="Email address"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: "Password is required" }]}
            >
              <Input.Password
                autoComplete="false"
                size="large"
                required
                placeholder="Password"
              />
            </Form.Item>
          </div>

          <div className="text-sm">
            <Link href="/gis/forgotpassword" className="font-medium text-blue-600 hover:text-blue-500">
              Forgot your password?
            </Link>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              disabled={loading}
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3"></span>
              {loading ? "Logging in..." : "Sign in"}
            </button>
          </div>
        </Form>

        <div className="items-center relative bottom-4 gap-2 flex">
          <p>Not having account? </p>
          <Link
            href="/"
            className="font-medium  text-blue-600 hover:text-blue-500"
          >
            Register as GIS Data Processing
          </Link>

        </div>

      </div>
    </div>
  );
}
