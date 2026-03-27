import { useState } from "react";
import "./LoginScreen.module.style.css";
import { useNavigate } from "react-router-dom";
import { validateEmail, validatePassword } from "../utils/validations";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../store/userSlice";
import { loginApi } from "../service";
function LoginScreen() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({ emailError: "", passwordError: "" });
  const [keep, setKeep] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    switch (name) {
      case "email":
        if (validateEmail(value)) {
          setError((prev) => ({ ...prev, emailError: "" }));
        } else {
          setError((prev) => ({
            ...prev,
            emailError: "Please Enter Valid Email",
          }));
        }
        break;
      case "password":
        if (validatePassword(value)) {
          setError((prev) => ({ ...prev, passwordError: "" }));
        } else {
          setError((prev) => ({
            ...prev,
            passwordError: "Please Enter Valid Password",
          }));
        }
        break;
    }
  };

  async function handleSignIn() {
    try {
      const res: any = await loginApi({ emailId: form.email, password: form.password })
      dispatch(addUser(res));
      if (res) {
        navigate('/feed')
      }
    } catch (error) {
      console.log(error);
    }
  }

  function Checkbox({ label, checked, onChange }: any) {
    return (
      <label className="checkbox-row">
        <input type="checkbox" checked={checked} onChange={onChange} />
        <div className={`custom-check ${checked ? "checked" : ""}`}>
          {checked && <span className="check-mark">✓</span>}
        </div>
        <span className="checkbox-label">{label}</span>
      </label>
    );
  }

  return (
    <div className="auth-card">
      <button
        className="logo"
        onClick={() => {
          navigate("/");
        }}
      >
        dev<span>{"//"}</span>finder <div className="logo-dot" />
      </button>
      <h1 className="auth-title">
        Welcome <em>back.</em>
      </h1>
      <p className="auth-sub">
        Sign in to find your next collaborator or co-founder.
      </p>

      <div className="form-grid">
        <div className="field">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            name="email"
            placeholder="alex@example.com"
            value={form.email}
            onChange={handleChange}
          />
          {error.emailError !== "" && (
            <span style={{ color: "red" }}>{error.emailError}</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            placeholder="••••••••••"
            value={form.password}
            onChange={handleChange}
          />
        </div>

        <div className="forgot-row">
          <Checkbox
            label="Keep me signed in"
            checked={keep}
            onChange={() => setKeep(!keep)}
          />
          <button className="link-btn">Forgot password?</button>
        </div>

        <button
          className="btn-primary"
          onClick={handleSignIn}
          disabled={
            !error.emailError &&
            !error.passwordError &&
            !form.email &&
            !form.password
          }
        >
          Sign In →
        </button>
      </div>

      <div className="divider" style={{ marginTop: 24 }}>
        <span>New to DevFinder?</span>
      </div>
      <div className="switch-row">
        <span>Don't have an account?</span>
        <button
          onClick={() => {
            navigate("/signup");
          }}
        >
          Create one free
        </button>
      </div>
    </div>
  );
}

export default LoginScreen;
