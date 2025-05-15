"use client";
import { logData, gisData, gisProject } from "@/atom/states";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import Cookies from "universal-cookie";
const cookies = new Cookies(null, { path: "/" });
import { verifyGisAuth } from "@/utils/verifyauth";
import { getAllProj } from "@/routes/gisProj";
import { getAllLog } from "@/routes/gisLog";
const gisLayout = ({ children }) => {
  const [currentUser, setCurrentUser] = useRecoilState(gisData);
  const [proj, setProj] = useRecoilState(gisProject);
  const [logs, setLogs] = useRecoilState(logData);
  const router = useRouter();

  // session verify
  useEffect(() => {
    const token = cookies.get("auth");
    if (!token) router.push("/gis/login");
    const data = verifyGisAuth({ setCurrentUser, token });
    if (!data || data === "error") router.push("/gis/login");
  }, []);

  useEffect(() => {
    if (!currentUser) return;
    if (currentUser?.isSuspended===true) {
      router.push("/user/dashboard");
    }
  }, [currentUser]);

  return <>{children}</>;
};

export default gisLayout;
