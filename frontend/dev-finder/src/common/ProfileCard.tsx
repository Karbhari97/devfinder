import { useNavigate } from 'react-router-dom';
import '../styles/ProfileCard.module.style.css'
const ProfileCard = ({ user, self }:any) => {
  const navigate = useNavigate();
  const { firstName, lastName, about, photoUrl, age, gender, skills } = user;
  return (
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
            <span className="avatar-emoji"><img src={photoUrl || 'https://www.gethucinema.com/wp-content/uploads/2022/01/HellyShah-571.jpg'} alt='user photo' /></span>
            <div className="online-badge">● ONLINE</div>
          </div>
          <div className="card-body">
            <div className="card-name">
              {firstName?.toUpperCase() + " " + lastName?.toUpperCase()}
              <span style={{ fontSize: "0.9rem" }}>✓</span>
            </div>
            <div className="card-name">
              <span className="tag green">{gender + " |  " + age + " Years"}</span>

            </div>
            <div className="card-role">
              {about}
            </div>
            <p className="card-bio">
              Building OSS tools at night. Looking for a designer to co-found
              a devtool startup. I bring the backend, you bring the vision.
            </p>
            <div className="card-tags">
              {
                skills?.map((item:any, index:number) => {
                  return (
                    <span className="tag pink" key={index}>{item}</span>
                  )
                })
              }
              {/* <span className="tag">Rust</span>
              <span className="tag">TypeScript</span>
              <span className="tag green">Open to collab</span>
              <span className="tag pink">Co-founder</span>
              <span className="tag">Next.js</span> */}
            </div>
          </div>
          {
            self ? <div className="card-actions">
              <button
                className="btn-primary"
                onClick={() => { navigate('/editProfile') }}
              >
                Edit Profile →
              </button>
            </div> : <div className="card-actions">
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
          }
        </div>
      </div>
    </div>
  )
}

export default ProfileCard
