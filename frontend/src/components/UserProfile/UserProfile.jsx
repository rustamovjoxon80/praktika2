import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { User, LogOut, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './UserProfile.css';

function UserProfile({ avatarUrl = 'https://i.pravatar.cc/100?img=33' }) {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const dropdownRef = useRef(null);
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('currentUser');
    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (e) {
        console.error('Error parsing user data', e);
      }
    }
    
    // Fallback if currentUser is not set but role is
    if (!userData && localStorage.getItem('role')) {
       setUser({
         name: localStorage.getItem('role') === 'admin' ? 'Admin User' : 'User',
         role: localStorage.getItem('role')
       });
    }

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('role');
    localStorage.removeItem('currentUser');
    navigate('/');
  };

  return (
    <div className="user-profile-container" ref={dropdownRef}>
      <div 
        className="user-avatar" 
        style={{backgroundImage: `url(${avatarUrl})`}}
        onClick={() => setIsOpen(!isOpen)}
      ></div>
      
      {isOpen && (
        <div className="profile-dropdown">
          <div className="profile-header">
            <div className="profile-avatar-large" style={{backgroundImage: `url(${avatarUrl})`}}></div>
            <div className="profile-info">
              <h4>{user?.name || 'Guest'}</h4>
              <p className="role-badge">{user?.role || 'user'}</p>
              {user?.phone && <p className="user-phone">+{user.phone}</p>}
            </div>
          </div>
          
          <div className="profile-menu">
            <button className="menu-item">
              <User size={16} />
              <span>{t('profile.my_account') || 'My Account'}</span>
            </button>
            <button className="menu-item">
              <Settings size={16} />
              <span>{t('sidebar.admin') || 'Settings'}</span>
            </button>
            <div className="divider"></div>
            <button className="menu-item logout" onClick={handleLogout}>
              <LogOut size={16} />
              <span>{t('sidebar.sign_out') || 'Sign Out'}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserProfile;
