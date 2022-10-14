// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";

// Argon Dashboard 2 MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ArgonInput from "components/ArgonInput";
import ArgonButton from "components/ArgonButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";
import Socials from "layouts/authentication/components/Socials";
import Separator from "layouts/authentication/components/Separator";

import "./index.css";
import api from "./api";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Cover() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassWord] = useState("");
  const [passwordConfirm, setPassWordConfirm] = useState("");

  const [listAcc, setlistAcc] = useState([]);
  const [listTrangThai, setListTrangThai] = useState([]);

  const [load, setLoad] = useState(true);

  const resetForm = () => {
    setName("");
    setPhoneNumber("");
    setPassWord("");
    setPassWordConfirm("");
  };

  const handleModifyAccount = async (e) => {
    e.preventDefault();
    const newAcc = {
      name: name,
      phoneNumber: phoneNumber,
      password: password,
      trangthaiID: listTrangThai[0].id,
    };
    let check = 0;
    listAcc.forEach((item) => {
      if (item.phoneNumber === newAcc.phoneNumber) {
        window.alert("Số điện thoại đã tồn tại!");
        check++;
      } else {
        setLoad(!load);
      }
    });
    if (!name || !phoneNumber || !password || !passwordConfirm) {
      window.alert("Hãy nhập đủ thông tin!");
      check++;
    } else if (password !== passwordConfirm) {
      window.alert("Mật khẩu nhập lại không đúng!");
      setPassWordConfirm("");
      check++;
    }
    if (check === 0) {
      try {
        await api.post("/sign-up", newAcc);
        window.alert("Tạo tài khoản thành công!");
        setLoad(!load);
        resetForm();
        navigate("/sign-in");
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    const getTrangThai = async () => {
      const trangthai = await callAPI("/trangthai");
      setListTrangThai(trangthai);
    };

    const getListAccount = async () => {
      const nv = await callAPI("/sign-up");
      setlistAcc(nv);
    };

    getTrangThai();
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
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Name"
          />
        </ArgonBox>
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
        <ArgonBox mb={2}>
          <input
            className="inpPassword"
            value={passwordConfirm}
            onChange={(e) => setPassWordConfirm(e.target.value)}
            type="password"
            placeholder="Confirm Password"
          />
        </ArgonBox>
        <ArgonBox mt={4} mb={1}>
          <button className="btnSignup" type="submit">
            Sign Up
          </button>
        </ArgonBox>
        <ArgonBox mt={2}>
          <ArgonTypography variant="button" color="text" fontWeight="regular">
            Already have an account?&nbsp;
            <ArgonTypography
              component={Link}
              to="/sign-in"
              variant="button"
              color="dark"
              fontWeight="bold"
              textGradient
            >
              Sign in
            </ArgonTypography>
          </ArgonTypography>
        </ArgonBox>
      </form>
    </CoverLayout>
  );
}

export default Cover;
