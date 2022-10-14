// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Switch from "@mui/material/Switch";

// Argon Dashboard 2 MUI components
import ArgonBox from "components/ArgonBox";
import CoverLayout from "layouts/authentication/components/CoverLayout";

import ArgonTypography from "components/ArgonTypography";
import ArgonInput from "components/ArgonInput";
import ArgonButton from "components/ArgonButton";

// Authentication layout components
import IllustrationLayout from "layouts/authentication/components/IllustrationLayout";

import "./index.css";
import { useState, useEffect } from "react";
import api from "./api";
import { useNavigate } from "react-router-dom";

function Illustration() {
  // const [rememberMe, setRememberMe] = useState(false);

  // const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const navigate = useNavigate();

  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassWord] = useState("");

  const [listAcc, setlistAcc] = useState([]);

  const [load, setLoad] = useState(true);

  const resetForm = () => {
    setPhoneNumber("");
    setPassWord("");
  };

  const handleModifyAccount = async (e) => {
    e.preventDefault();
    const loginAcc = {
      phoneNumber: phoneNumber,
      password: password,
    };
    let check = 0;

    if (check == 0) {
      try {
        await api.post("/sign-up", loginAcc);
        setLoad(!load);
        resetForm();
        navigate("/dashboard");
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    const getListAccount = async () => {
      const nv = await callAPI("/sign-in");
      setlistAcc(nv);
    };

    getListAccount();
  }, [load]);

  const callAPI = async (route) => {
    try {
      const res = await api.get(route);
      return res.data;
    } catch (err) {
      console.log(err);
      return [];
    }
  };

  return (
    <CoverLayout>
      <form className="formSignup" onSubmit={handleModifyAccount}>
        <ArgonBox mb={2}>
          <input
            className="inpPhoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            type="text"
            placeholder="PhoneNumber"
          />
        </ArgonBox>
        <ArgonBox mb={2}>
          <input
            className="inpPassword"
            value={password}
            onChange={(e) => setPassWord(e.target.value)}
            type="password"
            placeholder="Password"
          />
        </ArgonBox>
        <ArgonBox mt={4} mb={1}>
          <button className="btnSignup" type="submit">
            Sign In
          </button>
        </ArgonBox>
      </form>
    </CoverLayout>
  );
}

export default Illustration;
