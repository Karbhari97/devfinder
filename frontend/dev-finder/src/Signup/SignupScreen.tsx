import { useState, useRef } from "react";
import './SignupScreen.module.styles.css';
import SkillsInput from "../components/SkillsInput";
import { useNavigate } from "react-router-dom";
function SignupScreen({ onSwitch }: any) {
  const [photo, setPhoto] = useState<string | null>(null);
  const [skills, setSkills] = useState([]);
  const [gender, setGender] = useState("");
  const fileRef = useRef(null);
  const navigate = useNavigate();

  const handlePhoto = (e: any) => {
    const file: any = e.target.files[0];
    if (file) setPhoto(URL.createObjectURL(file));
  };

  return (
    <div className="auth-card wide">
      <div
        className="logo"
        onClick={() => {
          navigate("/");
        }}
      >
        dev<span>//</span>finder <div className="logo-dot" />
      </div>
      <h1 className="auth-title">
        Join the <em>network.</em>
      </h1>
      <p className="auth-sub">
        Create your profile and start matching with developers who share your
        vision.
      </p>

      <div className="signup-scroll">
        <div className="form-grid">
          {/* Photo */}
          <div className="field">
            <label>Profile Photo</label>
            <div
              className="photo-upload"
              onClick={() => fileRef.current?.click()}
            >
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                onChange={handlePhoto}
              />
              {photo ? (
                <img src={photo} alt="preview" className="photo-preview" />
              ) : (
                <span className="photo-icon">📸</span>
              )}
              <div className="photo-upload-text">
                <strong>Click to upload</strong> or drag & drop
              </div>
            </div>
          </div>

          {/* Name row */}
          <div className="form-row">
            <div className="field">
              <label>First Name</label>
              <input type="text" placeholder="Alex" />
            </div>
            <div className="field">
              <label>Last Name</label>
              <input type="text" placeholder="Chen" />
            </div>
          </div>

          {/* Email */}
          <div className="field">
            <label>Email address</label>
            <input type="email" placeholder="alex@example.com" />
          </div>

          {/* Password */}
          <div className="field">
            <label>Password</label>
            <input type="password" placeholder="Min. 8 characters" />
          </div>

          {/* Age + Gender row */}
          <div className="form-row">
            <div className="field">
              <label>Age</label>
              <input type="number" placeholder="25" min="16" max="100" />
            </div>
            <div className="field">
              <label>Gender</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="" disabled>
                  Select…
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="non-binary">Non-binary</option>
                <option value="prefer-not">Prefer not to say</option>
              </select>
            </div>
          </div>

          {/* Skills */}
          <div className="field">
            <label>Skills & Tech Stack</label>
            <SkillsInput skills={skills} setSkills={setSkills} />
          </div>

          {/* About */}
          <div className="field">
            <label>About You</label>
            <textarea placeholder="What are you building? Who are you looking to collaborate with?" />
          </div>

          <button className="btn-primary">SignUp →</button>
        </div>
      </div>

      <div className="divider" style={{ marginTop: 20 }}>
        <span>Already have an account?</span>
      </div>
      <div className="switch-row">
        Already registered?
        <button
          onClick={() => {
            navigate("/login");
          }}
        >
          Sign in instead
        </button>
      </div>
    </div>
  );
}

export default SignupScreen;
