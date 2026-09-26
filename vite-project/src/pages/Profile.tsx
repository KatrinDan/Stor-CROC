
import { useNavigate } from "react-router-dom";
import "./Profile.css";
import avatarImg from "./img/avatar.png";

function Profile() {
  const navigate = useNavigate();

  return (
    <div className="prof-page">
      <h1 className="prof-title"> My Profile</h1>

      <div className="prof-container">
        <div className="prrofil-card">
          <div className="prof-avatar">
            <img src={avatarImg} alt="sunflover" />
          </div>

          <div className="prof-info">
            <h2>Katrin Pirs</h2>
            <p>katrinpirs@prolog.com</p>
          </div>

          <button className="edit-prof-btn">Edit Profile</button>
        </div>

        <div className="profile-sections">
          <div className="profile-section">
            <h3>My Orders</h3>
            <p>VieW your order history</p>
            <button className="profile-section-btn">Viev Orders</button>
          </div>

          <div className="profile-section">
            <h3>Account Settings</h3>
            <p>Manage your account information</p>
            <button className="profile-section-btn" >Settings</button>
          </div>
        </div>
        <button className="logout-btn" onClick={() => navigate("/")}>
          Log Out
        </button>
      </div>
    </div>
  );
}

export default Profile;