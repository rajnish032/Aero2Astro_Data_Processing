"use client"

import { Form, Input, Button } from "antd";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import axios from "axios";
import toast from "react-hot-toast";
import logo from "../../assets/logo.png";
import { requestUrl } from "../../utils/constants";
import Cookies from 'universal-cookie';
const cookies = new Cookies(null, { path: "/", sameSite: 'lax' })

export default function ForgotPassword() {
  const router = useRouter();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [isEmailVerified, setEmailVerified] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [canChangeEmail, setCanChangeEmail] = useState(true);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState([]);
  const [isPasswordValid, setIsPasswordValid] = useState(false);


  const handleForgotPassword = async (values) => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${requestUrl}/user/forgot/password`,
        { email: values.email },
        { withCredentials: true }
      );
      const token = res?.data.token;
      const expirationDate = new Date(Date.now() + (5 * 60 * 1000));
      cookies.set('forgotAuth', token, { expires: expirationDate, path: '/' });

      setOtpSent(true);
      toast.success("OTP sent successfully, check your email.");
      setCanChangeEmail(false);
      setResendCooldown(60);
      const intervalId = setInterval(() => {
        setResendCooldown((prev) => prev - 1);
      }, 1000);
      setTimeout(() => {
        clearInterval(intervalId);
      }, 60000);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Could not send OTP, please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setLoading(true);
    const forgotAuth = cookies.get('forgotAuth');
    try {
      const response = await axios.post(
        `${requestUrl}/user/verify/forgot/otp`,
        { otp },
        {
          headers: {
            'forgotAuth': forgotAuth
          },

          withCredentials: true
        }
      );

      const token = response?.data?.token;
      const expirationDate = new Date(Date.now() + (5 * 60 * 1000));
      cookies.set('changePassToken', token, { expires: expirationDate, path: '/' });
      cookies.remove("forgotAuth");

      toast.success(response?.data?.message || "OTP verified successfully");
      setOtpSent(false);
      setEmailVerified(true);
      setNewPassword("");
      setConfirmPassword("");

    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Invalid OTP. Try again!"
      );
      setEmailVerified(false);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordUpdate = async () => {
    if (newPassword.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }
    setLoading(true);
    const changePassToken = cookies.get('changePassToken');

    try {
      const response = await axios.post(
        `${requestUrl}/user/password/update`,
        { newPassword },
        {
          headers: {
            'changepasstoken': changePassToken,
          },
          withCredentials: true,
        }
      );
      toast.success(
        response?.data?.message || "Password changed successfully"
      );
      router.push("/gis/login");
      cookies.remove("changePassToken");
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Invalid OTP. Try again!"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setLoading(true);
    try {
      await axios.post(
        `${requestUrl}/user/forgot/password`,
        { email: form.getFieldValue("email") },
        { withCredentials: true }
      );
      toast.success("OTP resent successfully, check your email.");
      setResendCooldown(60);
      const intervalId = setInterval(() => {
        setResendCooldown((prev) => prev - 1);
      }, 1000);
      setTimeout(() => {
        clearInterval(intervalId);
      }, 60000);
    } catch (error) {
      toast.error("Could not resend OTP, please try again.");
    } finally {
      setLoading(false);
    }
  };


  const passwordCriteria = {
    length: {
      test: (password) => password.length >= 8,
      message: "At least 8 characters",
    },
    uppercase: {
      test: (password) => /[A-Z]/.test(password),
      message: "At least one uppercase letter",
    },
    number: {
      test: (password) => /\d/.test(password),
      message: "At least one number",
    },
    specialChar: {
      test: (password) => /[!@#$%^&*(),.?":{}|<>]/.test(password),
      message: "At least one special character",
    },
  };

  const evaluatePasswordStrength = (password) => {
    return Object.keys(passwordCriteria).map((key) => ({
      ...passwordCriteria[key],
      valid: passwordCriteria[key].test(password),
    }));
  };

  const isPasswordStrong = (password) => {
    const criteria = evaluatePasswordStrength(password);
    return criteria.every((criterion) => criterion.valid);
  };


  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setNewPassword(e.target.value)
    const strength = evaluatePasswordStrength(newPassword);
    setPasswordStrength(strength);
    setIsPasswordValid(isPasswordStrong(newPassword));
  };

  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <Link href={"/"} className="overflow-clip relative block mx-auto h-24 w-40 ">
            <Image className="absolute inset-0 scale-150 " width={"100%"} height={"100%"} src={logo} alt="Aero2Astro" /></Link>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Forgot Password
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{" "}
            <Link
              href="/gis/login"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Login
            </Link>
          </p>
        </div>
        <Form
          form={form}
          onFinish={handleForgotPassword}
          className="mt-8 space-y-6"
        >
          {/* Email input */}
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
                disabled={!canChangeEmail || isEmailVerified}
              />
            </Form.Item>
          </div>

          {/* OTP input */}
          {otpSent && !isEmailVerified && (
            <div className="p-1">
              <p className="my-2 px-1 flex gap-2 font-semibold">
                Verify Email OTP
              </p>
              <Input
                size="large"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP"
                maxLength={6}
              />
              <div className="flex justify-between text-sm">
                <p
                  className={`text-blue-500 cursor-pointer p-1 ${resendCooldown > 0 && "opacity-50 cursor-not-allowed"
                    }`}
                  onClick={() =>
                    resendCooldown === 0 && !loading && handleResendOTP()
                  }
                >
                  {loading
                    ? "Resending..."
                    : `Resend OTP${resendCooldown > 0 ? ` (${resendCooldown}s)` : ""
                    }`}
                </p>
                <p
                  className="text-blue-500 cursor-pointer p-1"
                  onClick={() => {
                    setOtpSent(false);
                    setOtp("");
                    setResendCooldown(0);
                    setCanChangeEmail(true);
                  }}
                >
                  Change Email
                </p>
              </div>
              <Button
                type="primary"
                className="bg-blue-500 hover:bg-blue-400 w-full my-5"
                onClick={handleVerifyOtp}
                disabled={!otp || otp.length !== 6 || loading}
              >
                {loading ? "Verifying..." : "Verify"}
              </Button>
            </div>
          )}

          {/* New password input */}
          {isEmailVerified && (
            <div className="p-1">
              <p className="my-2 px-1 flex gap-2 font-semibold">
                Enter New Password
              </p>
              <Input.Password
                size="large"
                value={newPassword}
                minLength={8}
                onChange={handlePasswordChange}
                placeholder="Enter new password"
                className="placeholder:text-gray-500 min-w-[250px] mx-auto"
              />
              {!isPasswordValid && <div>
                {passwordStrength.map((criterion, index) => (
                  <p key={index} className="px-1 text-xs" style={{ color: criterion.valid ? 'green' : 'red' }}>
                    {criterion.message}
                  </p>
                ))}
              </div>}
              <Input.Password
                size="large"
                value={confirmPassword}
                minLength={8}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                className="placeholder:text-gray-500 min-w-[250
                  px] mx-auto my-2"
              />
              <Button
                type="primary"
                className="bg-blue-500 hover:bg-blue-400 w-full my-5"
                onClick={handlePasswordUpdate}
                disabled={
                  !newPassword ||
                  newPassword !== confirmPassword ||
                  loading
                }
              >
                {loading ? "Updating..." : "Update Password"}
              </Button>
            </div>
          )}

          {/* Continue button */}
          {!otpSent && !isEmailVerified && (
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                disabled={loading}
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3"></span>
                {loading ? "Sending OTP..." : "Continue"}
              </button>
            </div>
          )}
        </Form>
      </div>
    </div>
  );
}
