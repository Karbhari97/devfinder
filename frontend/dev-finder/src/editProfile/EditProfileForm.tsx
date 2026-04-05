import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./EditProfileForm.style.css";
import { updateProfileApi } from "../service";
import { addUser } from "../store/userSlice";
import { useDispatch } from "react-redux";
function EditProfileForm({ user }:any) {
  const [photo, setPhoto] = useState<string | null>(user.photoUrl);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender);
  const [about, setAbout] = useState(user.about);

  const [skills, setSkills] = useState([]);
  const fileRef = useRef(null);
  const dispatch = useDispatch();

  const handlePhoto = (e: any) => {
    const file: any = e.target.files[0];
    if (file) setPhoto(URL.createObjectURL(file));
  };

  const updateProfile = async () => {
    try {
      const response = await updateProfileApi({
        age,
        firstName,
        lastName,
        about,
        gender,
      });

      if (response?.message?.toLowerCase().includes("succesfully")) {
        dispatch(addUser(response.data.data));
      }
    } catch (error) {
      console.log("Something went wrong", error);
    }
  };

  return (
    <div className="flex ">
      <div className="auth-card1 wide">
        <h1 className="auth-title">
          Edit your <em>profile.</em>
        </h1>

        <div className="signup-scroll">
          <div className="form-grid">
            {/* Photo */}
            <div className="field">
              <label htmlFor="photo">Profile Photo</label>
              <button
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
              </button>
            </div>

            {/* Name row */}
            <div className="form-row">
              <div className="field">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  placeholder="Alex"
                  name="firstName"
                  value={firstName}
                  onChange={(event) => setFirstName(event.target.value)}
                />
              </div>
              <div className="field">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  placeholder="Chen"
                  name="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>

            {/* Age + Gender row */}
            <div className="form-row">
              <div className="field">
                <label htmlFor="age">Age</label>
                <input
                  type="number"
                  placeholder="25"
                  min="16"
                  max="100"
                  name="age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </div>
              <div className="field">
                <label htmlFor="gender">Gender</label>
                <select
                  name="gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="" disabled>
                    Select…
                  </option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            {/* Skills */}
            {/* <div className="field">
            <label>Skills & Tech Stack</label>
            <SkillsInput skills={skills} setSkills={setSkills} />
          </div> */}

            {/* About */}
            <div className="field">
              <label htmlFor="about">About You</label>
              <textarea
                placeholder="What are you building? Who are you looking to collaborate with?"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
              />
            </div>

            <button className="btn-primary" onClick={updateProfile}>Update →</button>
          </div>
        </div>
      </div>
      <div>
        <div className="card-stack">
          <div className="dev-card card-back2">
            <div className="card-avatar">
              <span className="avatar-emoji">🐱</span>
            </div>
          </div>
          <div className="dev-card card-back1">
            <div className="card-avatar">
              <span className="avatar-emoji">🦊</span>
            </div>
          </div>
          <div className="dev-card card-front" id="mainCard">
            <div className="card-avatar">
              <span className="avatar-emoji">
                <img
                  src={
                    user.photoUrl ||
                    "https://www.gethucinema.com/wp-content/uploads/2022/01/HellyShah-571.jpg"
                  }
                  alt="user photo"
                />
              </span>
              <div className="online-badge">● ONLINE</div>
            </div>
            <div className="card-body">
              <div className="card-name">
                {firstName?.toUpperCase() + " " + lastName?.toUpperCase()}
                <span style={{ fontSize: "0.9rem" }}>✓</span>
              </div>
              <div className="card-name">
                <span className="tag green">
                  {gender + " |  " + age + " Years"}
                </span>
              </div>
              {/* <div className="card-role">
              {about}
            </div> */}
              <p className="card-bio text-wrap">{about}</p>
              <div className="card-tags">
                {skills?.map((item: any, index: number) => {
                  return (
                    <span className="tag pink" key={index}>
                      {item}
                    </span>
                  );
                })}
                {/* <span className="tag">Rust</span>
              <span className="tag">TypeScript</span>
              <span className="tag green">Open to collab</span>
              <span className="tag pink">Co-founder</span>
              <span className="tag">Next.js</span> */}
              </div>
            </div>

            <div className="card-actions">
              <button className="action-btn btn-pass" title="Pass">
                ✕
              </button>
              <button className="action-btn btn-super" title="Super Like">
                ⭐
              </button>
              <button className="action-btn btn-like" title="Like">
                ♥
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProfileForm;
