import { asyncHandler } from "../utils/asyncHandler.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import otpGenerator from "otp-generator";
import Rpto from "../models/rpto.model.js";
import sendEmail from "../service/sendMail.js";
import mongoose from "mongoose";
import User from "../models/userSchema.js";
import xlsx from "xlsx";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import otpless from "otpless-node-js-auth-sdk"
const { sendOTP, verifyOTP, resendOTP } = otpless
const rptoLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  try {
    const rpto = await Rpto.findOne({ email: email });
    if (!rpto) {
      return res.status(401).json({
        message: "Credentials are incorrect",
      });
    }

    if (!rpto.password)
      return res
        .status(401)
        .json({ message: "Kindly Create or reset your account" });

    const passwordMatch = await bcrypt.compare(password, rpto.password);
    if (!passwordMatch) {
      return res.status(401).json({
        message: "Credentials are incorrect",
      });
    }

    const token = jwt.sign(
      { _id: rpto._id, email: rpto.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "1w",
      }
    );

    res.status(200).json({
      token: token,
      status:rpto.status,
      message: "Login successful",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

const verifyRptoAuth = asyncHandler(async (req, res, next) => {
  const token =
    req.headers.rptoauth ||
    (req.headers.cookie && req.headers.cookie.split("rptoauth=")[1]);

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const rpto = await Rpto.findById(decoded._id).select("-password");

    if (!rpto) {
      return res.status(404).json({ message: "RPTO not found" });
    }
    req.rpto = rpto;

    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Unauthorized" });
  }
});

const rptoresetPassword = asyncHandler(async (req, res) => {
  const { email, newpassword } = req.body;

  try {
    const existingRpto = await Rpto.findOne({ email });

    if (!existingRpto) {
      return res.status(400).json({
        message: "No RPTO Account Found",
      });
    }

    const generatedEmailOTP = otpGenerator.generate(6, {
      digits: true,
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    });

    await sendEmail({
      from: "Aero2Astro Tech <tech@aero2astro.com> ",
      to: email,
      subject: `Aero2Astro RPTO credentials Reset OTP code: ${generatedEmailOTP}`,
      text: `Your credentials Reset OTP code: ${generatedEmailOTP}\nIt is valid for 5 minutes only.`,
      html: `<html lang="en">
            <head>
                
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #f4f4f4;
                        margin: 0;
                        padding: 0;
                    }
                    .email-container {
                        max-width: 600px;
                        margin: 0 auto;
                        background-color: #ffffff;
                        padding: 20px;
                        border: 1px solid #e0e0e0;
                    }
                    .header {
                        text-align: center;
                        background-color: #23a3df;
                        color: #ffffff;
                        padding: 20px;
                        border-bottom: 3px solid #1a83b5;
                    }
                    .header h1 {
                        margin: 0;
                        font-size: 24px;
                    }
                    .content {
                        padding: 20px;
                        color: #333333;
                    }
                    .content h2 {
                        color: #23a3df;
                    }
                    .content p {
                        line-height: 1.6;
                    }
                    .otp {
                        display: inline-block;
                        background-color: #23a3df;
                        color: #ffffff;
                        padding: 10px 20px;
                        font-size: 20px;
                        margin: 20px 0;
                        border-radius: 5px;
                    }
                    .footer {
                        text-align: center;
                        padding: 10px;
                        color: #777777;
                        border-top: 1px solid #e0e0e0;
                    }
                    .footer a {
                        color: #23a3df;
                        text-decoration: none;
                    }
                </style>
            </head>
            <body>
                <div class="email-container">
                    <div class="header">
                        <h1>AERO2ASTRO Tech</h1>
                    </div>
                    <div class="content">
                        <h2>Credentials Reset OTP from ${email}</h2>
                        <p>
                            We received a request to reset the credentials from ${email} for your account of onboarding dashboard. To proceed with the password reset, please use the following One-Time Password (OTP):
                        </p>
                        <div class="otp">
                            ${generatedEmailOTP}
                        </div>
                        <p>
                            Please enter this OTP in the password reset form to continue. This OTP is valid for the next 5 minutes.
                        </p>
                        <p>
                            If you did not request a password reset, please ignore this email. Your password will remain unchanged.
                        </p>
                        <p>
                            Best regards,<br>
                            The AERO2ASTRO Tech Team
                            <a href="mailto:flywithus@aero2astro.com">flywithus@aero2astro.com</a>
            
                        </p>
                    </div>
                    <div class="footer">
                        <p>
                            &copy; 2024 AERO2ASTRO Tech. All rights reserved.<br>
                            <a href="mailto:flywithus@aero2astro.com">flywithus@aero2astro.com</a>
                        </p>
                    </div>
                </div>
            </body>
            </html>
            `,
    });

    const token = jwt.sign(
      {
        email: email,
        newpassword: newpassword,
        otp: generatedEmailOTP,
        otpExpires: new Date(Date.now() + 5 * 60 * 1000),
      },
      process.env.JWT_SECRET,
      { expiresIn: "5m" }
    );

    res
      .status(200)
      .json({ token: token, message: "Verification code sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

const rptoverifyResetPasswordOtp = asyncHandler(async (req, res) => {
  const { otp } = req.body;

  const token =
    req.headers.rptoreset ||
    (req.headers.cookie && req.headers.cookie.split("rptoreset=")[1]);

  if (!token) {
    return res.status(401).json({ message: "Session Expired or Invalid" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) return res.status(401).json({ message: "Invalid Session" });

    const isOTPValid =
      parseInt(decoded.otp) === parseInt(otp) &&
      decoded.otpExpires > Date.now().toLocaleString();
    if (isOTPValid) {
      const rpto = await Rpto.findOne({ email: decoded.email });

      if (!rpto) {
        return res.status(404).json({ message: "RPTO account not found" });
      }

      const hashedPassword = await bcrypt.hash(decoded.newpassword, 10);

      rpto.password = hashedPassword;
      await rpto.save();

      const token = jwt.sign(
        { _id: rpto._id, email: rpto.email },
        process.env.JWT_SECRET,
        {
          expiresIn: "1w",
        }
      );

      return res
        .status(200)
        .json({ token: token, message: "Password reset successful" });
    } else {
      return res.status(400).json({ message: "Invalid OTP or expired" });
    }
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Unauthorized" });
  }
});

const getRptoDetail = asyncHandler(async (req, res) => {
  const rpto = req.rpto;
  if (!rpto) return res.status(401);

  res.status(200).json({ rpto });
});

export const getAllUsersByRPTO = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 15,
      haveEquipments,
      notHavingEquipments,
      haveWorkExp,
      haveLicense,
      phone,
      fullName,
      city,
      state,
      status = "all",
      isApplied,
    } = req.query;

    const parsedPage = parseInt(page);
    const parsedLimit = parseInt(limit);

    let query = {
      rpto: req.rpto._id,
    };

    if (haveEquipments === "true") {
      query["equipmentDetails"] = { $exists: true };
    }

    if (haveWorkExp === "true") {
      query["workExp"] = { $exists: true };
    }

    if (haveLicense === "true") {
      query["licenses"] = { $exists: true };
    }

    if (isApplied === "true") {
      query["isApplied"] = true;
    }

    if (status === "approved") {
      query["status"] = "approved";
    } else if (status === "notApproved") {
      query["status"] = { $ne: "approved" };
    }
    if (phone) query["phone.number"] = { $regex: phone, $options: "i" };
    if (fullName) query.fullName = { $regex: fullName, $options: "i" };
    if (city) query.city = { $regex: city, $options: "i" };
    if (state) query.state = { $regex: state, $options: "i" };

    const users = await User.find(query)
      .select("-password")
      .limit(parsedLimit)
      .skip((parsedPage - 1) * parsedLimit)
      .exec();

    const totalCount = await User.countDocuments(query);

    const stats = {
      numberOfGis: await User.countDocuments({
        rpto: req.rpto._id,
        role: "Gis",
      }),
      numberOfAppliedUsers: await User.countDocuments({
        rpto: req.rpto._id,
        isApplied: true,
      }),
      numberOfApprovedUser: await User.countDocuments({
        rpto: req.rpto._id,
        status: "approved",
      }),
      numberOfRejectedUser: await User.countDocuments({
        rpto: req.rpto._id,
        status: "rejected",
      }),
    };

    res.json({
      page: parsedPage,
      limit: parsedLimit,
      totalCount,
      totalPages: Math.ceil(totalCount / parsedLimit),
      users,
      stats,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getCoordinatesFromPincode = async (pincode) => {
  try {
    const response = await axios.get(
      `https://nominatim.openstreetmap.org/search?postalcode=${pincode}&country=India&format=json`
    );
    if (response.data.length > 0) {
      const { lat, lon } = response.data[0];
      return { latitude: parseFloat(lat), longitude: parseFloat(lon) };
    }
    return { latitude: null, longitude: null };
  } catch (error) {
    console.error(
      `Failed to get coordinates for pincode ${pincode}:`,
      error.message
    );
    return { latitude: null, longitude: null };
  }
};
const getCityStateFromPincode = async (pincode) => {
  try {
    const response = await axios.get(
      `https://api.postalpincode.in/pincode/${pincode}`
    );

    if (response.data && response.data[0].Status === "Success") {
      const { District: city, State: state } = response.data[0].PostOffice[0];
      return { city, state };
    } else {
      throw new Error("Invalid Pincode or API error");
    }
  } catch (error) {
    console.error(
      `Error fetching city/state for Pincode ${pincode}:`,
      error.message
    );
    return { city: "Unknown", state: "Unknown" };
  }
};

export const createUsersByRpto = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  try {
    const workbook = xlsx.read(req.file.buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

    if (!data.length) {
      return res.status(400).json({ message: "Uploaded file is empty" });
    }

    const createdUsers = [];

    for (let row of data) {
      const {
        "First Name": firstName,
        "Last Name": lastName,
        "Contact Number": contactNumber,
        "Email Address": email,
        Pincode: areaPin,
      } = row;

      if (!firstName || !lastName || !contactNumber || !email || !areaPin) {
        return res.status(400).json({
          message:
            "Missing required fields: First Name, Last Name, Email, Contact Number, Pincode.",
        });
      }

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        continue;
      }

      const lastFourDigits = String(contactNumber).slice(-4);
      const customPassword = `${firstName}@${lastFourDigits}`;

      let city = "",
        state = "";
      try {
        ({ city, state } = await getCityStateFromPincode(areaPin));
      } catch (error) {
        console.error(
          `Failed to fetch city/state for Pincode ${areaPin}:`,
          error.message
        );
      }

      let latitude = null,
        longitude = null;
      try {
        ({ latitude, longitude } = await getCoordinatesFromPincode(areaPin));
      } catch (error) {
        console.error(
          `Failed to fetch coordinates for Pincode ${areaPin}:`,
          error.message
        );
      }

      const newUser = new User({
        fullName: `${firstName} ${lastName}`,
        email,
        password: customPassword,
        phone: {
          number: contactNumber,
          countryCode: "+91",
        },
        areaPin,
        locality: `${areaPin}, ${city}, ${state}`,
        city,
        state,
        role: "Gis",
        rpto: req.rpto._id,
        status: "pending",
        coordinates: {
          lat: latitude,
          lon: longitude,
        },
      });

      await newUser.save();
      createdUsers.push(newUser);

      try {
        await sendEmail({
          from: "Aero2Astro Tech <tech@aero2astro.com>",
          to: newUser.email,
          subject: "Welcome to Aero2Astro - Complete Your Profile",
          html: `
          <html lang="en">
            <head>
              <style>
                body {
                  font-family: Arial, sans-serif;
                  background-color: #f4f4f4;
                  margin: 0;
                  padding: 0;
                }
                .email-container {
                  max-width: 600px;
                  margin: 20px auto;
                  background-color: #ffffff;
                  padding: 20px;
                  border: 1px solid #e0e0e0;
                  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
                }
                .header {
                  background-color: #007bff;
                  padding: 15px;
                  color: #ffffff;
                  text-align: center;
                  font-size: 24px;
                }
                .content {
                  padding: 20px;
                  color: #333333;
                }
                .button {
                  display: inline-block;
                  padding: 12px 24px;
                  background-color: #28a745;
                  color: #ffffff;
                  text-decoration: none;
                  border-radius: 4px;
                  font-size: 16px;
                  margin-top: 20px;
                  font-weight: bold;
                }
                .footer {
                  text-align: center;
                  padding: 10px;
                  color: #777777;
                  border-top: 1px solid #e0e0e0;
                  font-size: 12px;
                }
              </style>
            </head>
            <body>
              <div class="email-container">
                <div class="header">
                  Welcome to Aero2Astro!
                </div>
                <div class="content">
                  <p>Dear ${newUser.fullName},</p>
                  <p>Your account has been successfully created! Here are your login details:</p>
                  <ul>
                    <li><strong>Email:</strong> ${newUser.email}</li>
                    <li><strong>Password:</strong> ${customPassword}</li>
                  </ul>
                  <p>We recommend changing your password after your first login for security purposes.</p>
                  <p>
                    To complete your profile and apply for approval, please click the button below:
                  </p>
                  <a href="https://dronepilots.aero2astro.com/user/profile" class="button">Complete Your Profile</a>
                  <p>If you have any questions, feel free to contact us at
                    <a href="mailto:flywithus@aero2astro.com">flywithus@aero2astro.com</a>.
                  </p>
                  <p>Best regards,<br>AERO2ASTRO Tech Team</p>
                </div>
                <div class="footer">
                  &copy; 2025 AERO2ASTRO Tech. All rights reserved.
                </div>
              </div>
            </body>
          </html>
          `,
        });
      } catch (emailError) {
        console.error(
          `Failed to send email to ${newUser.email}:`,
          emailError.message
        );
      }
    }
    return res.status(201).json({
      message: `${createdUsers.length} new users created successfully`,
      createdUsers,
    });
  } catch (error) {
    console.error("Error processing file:", error);
    return res.status(500).json({ message: "Failed to process file" });
  }
};

export const validateToken = (req, res) => {
  const { token } = req.body;
  if (!token) return res.status(400).json({ error: "Token is required" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json({ email: decoded.email });
  } catch (error) {
    res.status(400).json({ error: "Invalid or expired token" });
  }
};

export const registerRPTO = async (req, res) => {
  const {
    companyName,
    email,
    mobile,
    password,
    token,
    contactPerson,
    contactPersonDesignation,
    areaPin,
    city,
    state,
    registration_no
  } = req.body;

  if (
    !companyName ||
    !email ||
    !mobile ||
    !password ||
    !token ||
    !contactPerson ||
    !contactPersonDesignation ||
    !areaPin ||
    !city ||
    !state ||
    !registration_no

  ) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.email !== email) {
      return res.status(400).json({ error: "Email mismatch" });
    }
    const existingUser = await Rpto.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "RPTO already exists!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new RPTO user
    await Rpto.create({
      companyName,
      email,
      mobile,
      password: hashedPassword,
      contactPerson,
      contactPersonDesignation,
      areaPin,
      city,
      state,
      registration_no,
      status:"approved"
    });

    res.json({ message: "Account created successfully!" });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ error: "Registration failed" });
  }
};

const generateAndSendPhoneOTPForRPTO = asyncHandler(async (req, res) => {
  const { phoneNumber} = req.body;
  console.log(phoneNumber)
  const isUserExist = await Rpto.findOne({ mobile: phoneNumber });

  if (isUserExist) {
          return res.status(200).json({
              phoneNumber: true,
              message: "RPTO Already Registered Kindly Login"
          });
  }
  const phone = String("+91" + phoneNumber)

  const orderId = uuidv4();

  try {
      const response = await sendOTP(phone, null, "SMS", null, orderId, 300, 6, process.env.OTP_LESS_CLIENT_ID, process.env.OTP_LESS_CLIENT_SECRET);

      if (!response.orderId) {
          return res.status(500).json({ message: "Failed to send OTP" });
      }
      res.status(200).json(response);

  } catch (error) {
      console.error("Error sending OTP:", error);
      res.status(500).json({ error: "Failed to send OTP" });
  }
});


const verifyPhoneOTPForRPTO = async (req, res) => {
  const { phoneNumber, otp, orderId } = req.body;

  const phone = String("91" + phoneNumber)

  try {
      const response = await verifyOTP(null, phone, orderId, otp, process.env.OTP_LESS_CLIENT_ID, process.env.OTP_LESS_CLIENT_SECRET);

      if (!response.isOTPVerified)
          return res.status(401).json({ message: "Incorrect OTP" })

      const verified = response.isOTPVerified;

      const expirationTime = new Date(Date.now() + 20 * 60 * 1000);
      const token = jwt.sign({ phoneNumber, verified, expirationTime }, process.env.JWT_SECRET);



      res.status(200).json({ response, token });
  } catch (error) {
      console.error("Error verifying OTP:", error);
      res.status(500).json({ error: "Invalid! Failed to verify OTP" });
  }
};


const resendPhoneOTPForRPTO = asyncHandler(async (req, res) => {
  const { orderId } = req.body;

  try {
      const response = await resendOTP(orderId, process.env.OTP_LESS_CLIENT_ID, process.env.OTP_LESS_CLIENT_SECRET);
      if (!response.orderId) {
          return res.status(500).json({ message: "Failed to send OTP" });
      }

      res.status(200).json(response);
  } catch (error) {
      console.error("Error resending OTP:", error);
      res.status(500).json({ error: "Failed to resend OTP" });
  }
});


const generateAndSendEmailOTPForRPTO = async (req, res) => {
  try {
      const { isPhoneVerified, phoneNumber, email } = req.body;

      if (!isPhoneVerified || !phoneNumber) {
         return res.status(400).json({ message: "Kindly verify Phone first" })
      }
 

      if (!email) {
          return res.status(400).json({
              message: "Please provide an email"
          });
      }


      const existingUserWithEmail = await Rpto.findOne({ email });

      if (existingUserWithEmail) {
          let message = "This email is already associated with an account";
          return res.status(409).json({
              message: message
          });
      }

      const generatedEmailOTP = otpGenerator.generate(6, {
          digits: true,
          lowerCaseAlphabets: false,
          upperCaseAlphabets: false,
          specialChars: false
      });

      const expirationTime = new Date(Date.now() + 5 * 60 * 1000); 
      const hashedOTP = await bcrypt.hash(generatedEmailOTP, 10);
      const token = jwt.sign({ email, expirationTime, hashedOTP }, process.env.JWT_SECRET);

      await sendEmail({
        from: "Aero2Astro Tech <tech@aero2astro.com>",
        to: email,
        subject: `Aero2Astro RPTO Account Verification - OTP for ${email}`,
        text: `Dear RPTO,\n\nYour Email OTP code is: ${generatedEmailOTP}\nIt is valid for 5 minutes only.\n\nPlease use this code to verify your RPTO account on the Aero2Astro platform.\n\nIf you did not request this, please ignore this message.\n\nRegards,\nAero2Astro Tech Team`,
        html: `
        <html lang="en">
        <head>
          <style>
              body {
                  font-family: Arial, sans-serif;
                  background-color: #f4f4f4;
                  margin: 0;
                  padding: 0;
              }
              .email-container {
                  max-width: 600px;
                  margin: 0 auto;
                  background-color: #ffffff;
                  padding: 20px;
                  border: 1px solid #e0e0e0;
              }
              .header {
                  text-align: center;
                  background-color: #23a3df;
                  color: #ffffff;
                  padding: 20px;
                  border-bottom: 3px solid #1a83b5;
              }
              .header h1 {
                  margin: 0;
                  font-size: 24px;
              }
              .content {
                  padding: 20px;
                  color: #333333;
              }
              .content h2 {
                  color: #23a3df;
              }
              .content p {
                  line-height: 1.6;
              }
              .otp {
                  display: inline-block;
                  background-color: #23a3df;
                  color: #ffffff;
                  padding: 10px 20px;
                  font-size: 20px;
                  margin: 20px 0;
                  border-radius: 5px;
                  font-weight: bold;
              }
              .footer {
                  text-align: center;
                  padding: 10px;
                  color: #777777;
                  border-top: 1px solid #e0e0e0;
              }
              .footer a {
                  color: #23a3df;
                  text-decoration: none;
              }
          </style>
        </head>
        <body>
          <div class="email-container">
              <div class="header">
                  <h1>AERO2ASTRO Tech</h1>
              </div>
              <div class="content">
                  <h2>RPTO Email Verification</h2>
                  <p>Dear RPTO,</p>
                  <p>
                      Thank you for joining the Aero2Astro platform.
                  </p>
                  <p>
                      To activate your account, please use the following OTP.
                  </p>
                  <div class="otp">
                      ${generatedEmailOTP}
                  </div>
                  <p>
                      Enter this OTP in the verification form. This code is valid for the next 5 minutes.
                  </p>
                  <p>
                      If you did not initiate this request, please ignore this email.
                  </p>
                  <p>
                      Regards,<br>
                      The Aero2Astro Tech Team
                  </p>
              </div>
              <div class="footer">
                  <p>
                      &copy; 2024 Aero2Astro Tech. All rights reserved.<br>
                      <a href="mailto:flywithus@aero2astro.com">flywithus@aero2astro.com</a>
                  </p>
              </div>
          </div>
        </body>
        </html>
        `
      });

      res.status(200).json({ message: "Check email for OTP", token: token });

  } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Server error, please try again!" });
  }
};


const verifyEmailOTPForRPTO = asyncHandler(async (req, res) => {
  const { otp } = req.body;

  if (!otp) {
      return res.status(400).json({ message: "Please Enter the OTP" });
  }
  const token = req.headers.mailauth || (req.headers.cookie && req.headers.cookie.split('mailAuth=')[1]);

  if (!token) {
      return res.status(400).json({ message: "OTP not found in cookies" });
  }

  try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const hashedOTP = decoded.hashedOTP;
      const isMatch = await bcrypt.compare(String(otp), hashedOTP);
      if (!isMatch) {
          return res.status(400).json({ message: "OTP is incorrect" });
      }

      const expirationTime = decoded.expirationTime;
      if (expirationTime < new Date()) {
          return res.status(400).json({ message: "OTP has expired" });
      }


      return res.status(200).json({ isVerified: true, message: "Email verified" });
  } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Server Error" });
  }
});


const resendEmailOTPForRPTO = asyncHandler(async (req, res) => {

  if (!req.body.email) {
      return res.status(400).json({ message: "Please provide email" });
  }

  try {
      await generateAndSendEmailOTPForRPTO(req, res);

  } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Server Error aaya" });
  }
});


const rptoRegister = asyncHandler(async (req, res) => {
  const { mobile, companyName, city, email, password, state, areaPin, contactPerson,contactPersonDesignation,registration_no} = req.body;

  try {
      const isUserExist = await Rpto.findOne({ mobile});

      if (isUserExist) {
          return res.status(409).json({
              message: "This User is already registered"
          });
      }
      const existingUserWithEmail = await Rpto.findOne({ email });
      if (existingUserWithEmail) {
          return res.status(409).json({
              message: "This email is already associated with an account"
          });
      }

      const token = req.headers.phoneauth ||  req.headers.cookie.split('phoneAuth=')[1];

      if (!token) {
          return res.status(440).json({ message: "Sorry! Your Session Expired, Kindly Register again." });
      }

      let decoded;
      try {
          decoded = jwt.verify(token, process.env.JWT_SECRET);
      } catch (error) {
          return res.status(440).json({ message: "Invalid or Expired Session" });
      }

      if (!decoded.verified || mobile !== decoded.phoneNumber) {
          return res.status(401).json({ message: "Please verify phone" });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new Rpto({ mobile, companyName, city, email, password:hashedPassword, state, areaPin, contactPerson,contactPersonDesignation,registration_no});

      await user.save();

      const payload = {
          _id: user._id,
          email: user.email,
          companyName: user.companyName
      };

      const Authtoken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });


      await sendEmail({
        from: "Aero2Astro Tech <tech@aero2astro.com>",
        to: process.env.ADMIN_EMAIL,
        subject: `New RPTO Registration - ${fullName} has registered for onboarding`,
        text: `${fullName} has registered as an RPTO with phone: ${countryCode} ${phoneNumber}, from ${city}, ${state}.`,
        html: `
        <html lang="en">
        <head>
          <style>
              body {
                  font-family: Arial, sans-serif;
                  background-color: #f4f4f4;
                  margin: 0;
                  padding: 0;
              }
              .email-container {
                  max-width: 600px;
                  margin: 0 auto;
                  background-color: #ffffff;
                  padding: 20px;
                  border: 1px solid #e0e0e0;
              }
              .header {
                  text-align: center;
                  background-color: #23a3df;
                  color: #ffffff;
                  padding: 20px;
                  border-bottom: 3px solid #1a83b5;
              }
              .header h1 {
                  margin: 0;
                  font-size: 24px;
              }
              .content {
                  padding: 20px;
                  color: #333333;
              }
              .content h2 {
                  color: #23a3df;
              }
              .content p {
                  line-height: 1.6;
              }
              .details {
                  background-color: #f9f9f9;
                  padding: 15px;
                  margin: 20px 0;
                  border: 1px solid #e0e0e0;
                  border-radius: 5px;
              }
              .footer {
                  text-align: center;
                  padding: 10px;
                  color: #777777;
                  border-top: 1px solid #e0e0e0;
              }
              .footer a {
                  color: #23a3df;
                  text-decoration: none;
              }
          </style>
        </head>
        <body>
          <div class="email-container">
              <div class="header">
                  <h1>AERO2ASTRO Tech</h1>
              </div>
              <div class="content">
                  <h2>New RPTO Registration</h2>
                  <p>Dear Admin,</p>
                  <p>
                      A new RPTO has registered on the AERO2ASTRO Tech platform.
                  </p>
                  <div class="details">
                      <p><strong>Company Name:</strong> ${companyName}</p>
                      <p><strong>Email:</strong> ${email}</p>
                      <p><strong>Phone:</strong> +91 ${mobile}</p>
                      <p><strong>Pincode:</strong> ${areaPin}</p>
                      <p><strong>City:</strong> ${city}</p>
                      <p><strong>State:</strong> ${state}</p>
                  </div>
                  <p>
                      Please review and take any necessary actions for RPTO onboarding.
                  </p>
                  <p>
                      Best regards,<br>
                      The AERO2ASTRO Tech Team
                  </p>
              </div>
              <div class="footer">
                  <p>
                      &copy; 2024 AERO2ASTRO Tech. All rights reserved.<br>
                      <a href="mailto:flywithus@aero2astro.com">flywithus@aero2astro.com</a>
                  </p>
              </div>
          </div>
        </body>
        </html>
        `
      });


      res.status(201).json({ token: Authtoken, user: payload, message: "Registered successfully" });

  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error, Please Try Again!" });
  }
});
export {
  rptoLogin,
  getRptoDetail,
  verifyRptoAuth,
  rptoresetPassword,
  rptoverifyResetPasswordOtp,
  generateAndSendPhoneOTPForRPTO,
  resendPhoneOTPForRPTO,
  verifyPhoneOTPForRPTO,
  generateAndSendEmailOTPForRPTO,
  verifyEmailOTPForRPTO,
  resendEmailOTPForRPTO,
  rptoRegister
};
