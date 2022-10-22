import ArgonBox from "components/ArgonBox";
import CoverLayout from "layouts/authentication/components/CoverLayout";
import "./index.css";
import { useState, useEffect } from "react";
import api from "./api";
import { useNavigate } from "react-router-dom";

function Illustration() {
  const navigate = useNavigate();

  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassWord] = useState("");

  const resetForm = () => {
    setPhoneNumber("");
    setPassWord("");
  };

  const handleModifyAccount = async (e) => {
    e.preventDefault();
    let check = 0;
    const loginAcc = {
      phoneNumber: phoneNumber,
      password: password,
    };
    if (!phoneNumber) {
      window.alert("Please enter a valid phone number");
      check++;
    }

    if (check === 0) {
      try {
        await api
          .post("/employee/sign-in", loginAcc)
          .then((res) => {
            if (res.data.error_code === 401) {
              alert(res.data.message);
              return;
            }
            localStorage.setItem("token", res.data.token);
            resetForm();
            navigate("/dashboard");
          })
          .catch((err) => window.alert(err.message));
      } catch (err) {
        console.log(err);
      }
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
