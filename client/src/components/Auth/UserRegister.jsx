"use client";
import { Form, Input, Spin, Button, message } from "antd";
import {
  CheckOutlined,
  KeyOutlined,
  MailOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useState, useEffect } from "react";
import axios from "axios";
import { requestUrl } from "../../utils/constants";
import toast from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AutoCompleteComponent from "./AutoComplete";
import Cookies from "universal-cookie";
const cookies = new Cookies(null, { path: "/", sameSite: "lax" });

export default function UserRegister() {
  const [details, setDetails] = useState({
    fullName: "",
    email: "",
    role: "Gis",
    phoneNumber: "",
    countryCode: "+91",
    city: "",
    state: "",
    locality: "",
    areaPin: "",

    coordinates: {
      lon: 0,
      lat: 0,
    },
    password: "",
  });

  const [step, setStep] = useState(0);
  const [pinValid, setPinValid] = useState(true);
  const [otp, setOtp] = useState("");
  const [emailotpSent, setEmailotpSent] = useState("");
  const [orderId, setOrderId] = useState(null);
  const [otpSent, setOtpSent] = useState(false);
  const [regLoading, setRegLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState([]);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isRegistered, setIsRegistered] = useState(false);

  const router = useRouter();

  useEffect(() => {
    let timer;
    if (resendCooldown > 0) {
      timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [resendCooldown]);

  useEffect(() => {
    if (
      details.phoneNumber &&
      details.countryCode &&
      isPhoneVerified &&
      isEmailVerified &&
      details.email &&
      details.password
    ) {
      handleRegister();
    }
  }, [isPhoneVerified, isEmailVerified]);

  useEffect(() => {
    if (
      details.email &&
      isEmailVerified &&
      details.phoneNumber &&
      isRegistered
    ) {
      handleSendNotifications();
    }
  }, [isRegistered]);

  const handleRegister = async () => {
    setRegLoading(true);
    const phoneAuth = cookies.get("phoneAuth");
    try {
      const res = await axios.post(`${requestUrl}/user/register`, details, {
        headers: {
          phoneAuth: phoneAuth,
        },
        withCredentials: true,
      });

      const token = res.data.token;
      const expirationDate = new Date(Date.now() + 1 * 24 * 60 * 60 * 1000);
      cookies.set("auth", token, { expires: expirationDate, path: "/" });
      toast.success("Registered successfully", {
        duration: 3000,
      });

      setIsRegistered(true);
    } catch (error) {
      if (error.response.status === 440) {
        setDetails({
          fullName: "",
          email: "",
          role: "Gis",
          phoneNumber: "",
          countryCode: "+91",
          city: "",
          state: "",
          locality: "",
          areaPin: "",

          coordinates: {
            lon: 0,
            lat: 0,
          },
          password: "",
        });
        setIsPhoneVerified(false);
        setIsEmailVerified(false);
      }
      toast.error(
        error.response.data.message || "Registration failed. Please try again.",
        { duration: 3000 }
      );
      setStep(0);
      setOtpSent(false);
    }
    setRegLoading(false);
  };

  const handleSendNotifications = async () => {
    router.push("/user/dashboard");
    try {
      await axios.post(`${requestUrl}/notification/confirmation`, details, {
        withCredentials: true,
      });

      // toast.success("Welcome");
    } catch (error) {
      // console.log(error);
    }
  };

  const handleSendOtp = async () => {
    if (
      details.fullName === "" ||
      details.phoneNumber === "" ||
      details.areaPin === "" ||
      !pinValid ||
      details.city === "" ||
      details.state === "" ||
      details.locality === ""
    ) {
      toast.error("All Fields are Required");
      return;
    }
    try {
      setRegLoading(true);
      const res = await axios.post(
        `${requestUrl}/user/sendPhoneOTP`,
        { phoneNumber: details.phoneNumber, countryCode: details.countryCode },
        { withCredentials: true }
      );

      if (
        res.status === 200 &&
        res.data.phoneNumber &&
        res.data.countryCode &&
        res.data.email
      ) {
        setDetails((p) => ({
          ...p,
          phoneNumber: res.data.phoneNumber,
          countryCode: res.data.countryCode,
        }));
        message.warning("User already registered.", 3);
      } else if (
        res.status === 200 &&
        res.data.phoneNumber &&
        res.data.countryCode
      ) {
        setDetails((p) => ({
          ...p,
          phoneNumber: res.data.phoneNumber,
          countryCode: res.data.countryCode,
        }));
        setStep(1);
        message.warning(
          "Phone already registered. Kindly create account credentials.",
          3
        );
      } else {
        setOtpSent(true);
        setResendCooldown(120);
        setOrderId(res.data.orderId);
        toast.success("OTP sent successfully!");
      }
      setRegLoading(false);
    } catch (error) {
      toast.error(
        error.response.data.message || "Failed to send OTP. Please try again."
      );
      setRegLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setRegLoading(true);

    try {
      const res = await axios.post(
        `${requestUrl}/user/verifyPhone`,
        {
          phoneNumber: details.phoneNumber,
          countryCode: details.countryCode,
          otp,
          orderId,
        },
        { withCredentials: true }
      );
      const token = res?.data.token;
      const expirationDate = new Date(Date.now() + 5 * 60 * 1000);
      cookies.set("phoneAuth", token, { expires: expirationDate, path: "/" });

      setIsPhoneVerified(true);
      setOtp("");
      setOtpSent(false);
      setStep(1);
      toast.success("Phone verified sucessfully");
    } catch (error) {
      toast.error(
        error.response.data.message || "Failed to verify OTP. Please try again."
      );
    }
    setRegLoading(false);
  };

  const handleContinue = async () => {
    if (!otpSent) {
      await handleSendOtp();
    }
  };

  const handleSendEmailOtp = async () => {
    setRegLoading(true);
    try {
      const res = await axios.post(
        `${requestUrl}/user/sendEmailOTP`,
        {
          phoneNumber: details.phoneNumber,
          isPhoneVerified,
          email: details.email,
        },
        { withCredentials: true }
      );

      const token = res.data.token;
      const expirationDate = new Date(Date.now() + 5 * 60 * 1000);
      cookies.set("mailAuth", token, { expires: expirationDate, path: "/" });

      setEmailotpSent(true);
      setResendCooldown(120);
      toast.success("Email OTP sent successfully!");
    } catch (error) {
      toast.error(
        error.response.data.message ||
          "Failed to send email OTP. Please try again."
      );
    }
    setRegLoading(false);
  };

  const handleVerifyEmailOtp = async () => {
    setRegLoading(true);
    const mailAuth = cookies.get("mailAuth");
    try {
      await axios.post(
        `${requestUrl}/user/verifyEmail`,
        { email: details.email, otp },
        {
          headers: {
            mailAuth: mailAuth,
          },
          withCredentials: true,
        }
      );
      setIsEmailVerified(true);
      toast.success("Email verified successfully!");
    } catch (error) {
      toast.error(
        error.response.data.message ||
          "Failed to verify email OTP. Please try again."
      );
    }
    setRegLoading(false);
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
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
    setDetails({ ...details, password: newPassword });
    const strength = evaluatePasswordStrength(newPassword);
    setPasswordStrength(strength);
    setIsPasswordValid(isPasswordStrong(newPassword));
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setDetails({ ...details, email: newEmail });
    setIsEmailValid(isValidEmail(newEmail));
  };

  return (
    <div className="bg-white text-gray-800 rounded border-t-4 border-t-[#0055d4]">
      <h2 className="  text-2xl text-[#0055d4] font-bold  text-center mt-10 mb-3 ">
        Partner as GIS Data Processing
      </h2>
      <p className="text-gray-800 absolute top-5 right-5 text-sm">
        {step + 1}/2
      </p>
      <div className="flex flex-col min-h-[400px] py-5 min-w-[300px] p-5 max-w-[400px] gap-3 items-center">
        {regLoading && (
          <div className="absolute inset-0 h-full opacity-50 bg-black z-40 text-white flex items-center justify-center">
            <Spin size="large" />
          </div>
        )}

        {step === 0 && (
          <Form className="">
            <Input
              required
              value={details.fullName}
              onChange={(e) =>
                setDetails({ ...details, fullName: e.target.value })
              }
              className="mb-4 "
              size="large"
              placeholder="Full Name*"
              disabled={otpSent}
              prefix={<UserOutlined className="mx-1 pr-1 " />}
            />
            <Input
              size="large"
              autoComplete="off"
              addonBefore={details.countryCode}
              style={{ width: "100%" }}
              value={details.phoneNumber}
              onChange={(e) =>
                setDetails({ ...details, phoneNumber: e.target.value })
              }
              className="placeholder:text-gray-700 mb-3 "
              disabled={otpSent}
              placeholder="Phone*"
              type="tel"
              minLength={10}
              maxLength={10}
              pattern="\d{10}"
            />

            {/* Auto complete */}

            <AutoCompleteComponent
              pinValid={pinValid}
              setPinValid={setPinValid}
              details={details}
              setDetails={setDetails}
              otpSent={otpSent}
            />

            <div className="flex gap-4 items-center w-full">
              <Input
                size="medium"
                value={details.city || ""}
                className="placeholder:text-gray-500 w-full  mb-4 "
                placeholder="City"
                disabled
                required
                suffix={
                  <CheckOutlined
                    style={{ color: details.city ? "green" : "transparent" }}
                  />
                }
              />
              <Input
                size="medium"
                value={details.state || ""}
                className="placeholder:text-gray-500 mb-4 "
                placeholder="State"
                disabled
                required
                suffix={
                  <CheckOutlined
                    style={{ color: details.state ? "green" : "transparent" }}
                  />
                }
              />
            </div>

            {otpSent && (
              <div className="p-1 max-w-[70%] mx-auto">
                <p className="my-2 px-1 flex gap-2  font-semibold">
                  Verify Phone OTP
                </p>
                <Input
                  size="large"
                  value={otp}
                  onChange={handleOtpChange}
                  className="placeholder:text-gray-500  mx-auto"
                  placeholder="Enter OTP"
                  maxLength={6}
                />
                <div className="flex justify-between text-sm">
                  <p
                    className={`text-blue-500 cursor-pointer p-1 ${
                      resendCooldown > 0 && "opacity-50 cursor-not-allowed"
                    }`}
                    onClick={() => resendCooldown === 0 && handleSendOtp()}
                  >
                    {resendCooldown > 0
                      ? `Resend OTP (${resendCooldown}s)`
                      : "Resend OTP"}
                  </p>
                  <p
                    className="text-blue-500 cursor-pointer p-1"
                    onClick={() => {
                      setOtpSent(false);
                      setOtp("");
                      setResendCooldown(0);
                    }}
                  >
                    Change Phone
                  </p>
                </div>
                <Button
                  type="primary"
                  className="bg-blue-500 hover:bg-blue-400 h-12 w-full my-5"
                  onClick={handleVerifyOtp}
                  disabled={otp.length !== 6}
                >
                  {regLoading ? "Hold on.." : "Verify"}
                </Button>
              </div>
            )}

            {!otpSent && (
              <Button
                type="primary"
                className="bg-[#3371cf] shine absolute hover:bg-blue-500 h-12 w-full max-w-[88%] my-5 bottom-3  "
                onClick={handleContinue}
              >
                {regLoading ? "Sending OTP..." : "Join the gis"}
              </Button>
            )}
          </Form>
        )}

        {step === 1 && (
          <div className=" flex min-h-[300px] flex-col items-center">
            <h2 className="text-lg text-gray-800 font-bold my-3">
              Create Account Credentials
            </h2>
            <Form className="px-5">
              <Input
                disabled
                size="large"
                autoComplete="off"
                addonBefore={details.countryCode}
                style={{ width: "100%" }}
                value={details.phoneNumber}
                className="placeholder:text-gray-500 my-2"
                placeholder="Phone"
                type="tel"
                minLength={10}
                maxLength={10}
                pattern="\d{10}"
              />

              <Input
                size="large"
                value={details.email}
                onChange={handleEmailChange}
                className={`placeholder:text-gray-500  ${
                  isEmailValid ? "" : "border-red-500"
                }`}
                placeholder="Email"
                required
                disabled={emailotpSent}
                prefix={<MailOutlined className="mx-1" />}
              />
              {!isEmailValid && (
                <p style={{ color: "red" }} className="my-0 px-1 text-xs">
                  Please enter a valid email address.
                </p>
              )}

              <Input.Password
                size="large"
                value={details.password}
                onChange={handlePasswordChange}
                className={`placeholder:text-gray-500 my-3`}
                placeholder="Password"
                minLength={8}
                required
                disabled={emailotpSent}
                prefix={<KeyOutlined className="mx-1" />}
              />
              {!isPasswordValid && (
                <div>
                  {passwordStrength.map((criterion, index) => (
                    <p
                      key={index}
                      className="px-1 text-xs"
                      style={{ color: criterion.valid ? "green" : "red" }}
                    >
                      {criterion.message}
                    </p>
                  ))}
                </div>
              )}
            </Form>

            {emailotpSent && !isEmailVerified && (
              <div className="p-1">
                <p className=" px-1 text-gray-800 text-xs mb-1 flex gap-2 font-semibold">
                  Verify Email OTP
                </p>
                <Input
                  size="large"
                  value={otp}
                  onChange={handleOtpChange}
                  className="placeholder:text-gray-500 "
                  placeholder="Enter OTP"
                  maxLength={6}
                />
                <div className="flex justify-between text-sm">
                  <p
                    className={`text-blue-500 cursor-pointer p-1 ${
                      resendCooldown > 0 && "opacity-50 cursor-not-allowed"
                    }`}
                    onClick={() => resendCooldown === 0 && handleSendEmailOtp()}
                  >
                    {resendCooldown > 0
                      ? `Resend OTP (${resendCooldown}s)`
                      : "Resend OTP"}
                  </p>
                  <p
                    className="text-blue-500 cursor-pointer p-1"
                    onClick={() => {
                      setEmailotpSent(false);
                      setOtp("");
                      setResendCooldown(0);
                    }}
                  >
                    Change Email
                  </p>
                </div>
                <Button
                  type="primary"
                  className="bg-blue-500 hover:bg-blue-400 w-full my-5"
                  onClick={handleVerifyEmailOtp}
                  disabled={otp.length !== 6}
                >
                  {regLoading ? "Verifying..." : "Verify"}
                </Button>
              </div>
            )}

            {!emailotpSent && !isEmailVerified && (
              <Button
                type="primary"
                className="bg-blue-500 shine hover:bg-blue-400 h-12  absolute bottom-5 my-3 max-w-[80%] w-full"
                onClick={handleSendEmailOtp}
                disabled={!isEmailValid || !isPasswordValid}
              >
                {regLoading ? "Sending OTP..." : "Join the gis"}
              </Button>
            )}

            {isEmailVerified && (
              <Link
                href="/user/dashboard"
                className="bg-blue-500 shine py-2 rounded-lg block text-white font-bold text-center hover:bg-blue-400 my-5 max-w-[90%] mx-auto w-full"
              >
                Go to Dashboard
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
