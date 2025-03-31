import React, { useState } from 'react';
import { FaMedal, FaCalendarAlt, FaUsers, FaUserEdit, FaLock } from 'react-icons/fa';
import { AiFillFire, AiFillTrophy } from 'react-icons/ai';
import { BsCheckCircleFill } from 'react-icons/bs';
import ContributionCalendar from './ContributionCalendar';
import ActivityTimeline from './ActivityTimeline';
import BadgeDisplay from './BadgeDisplay';

// Mock data - Replace with API integration
const mockUserData = {
  name: "Alex Johnson",
  email: "alex.johnson@example.com",
  avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  bio: "Software engineer passionate about community building and collaborative projects.",
  joinDate: "January 15, 2023",
  currentStreak: 12,
  tasksCompleted: 87,
  pointsEarned: 1240,
  level: "Gold Contributor",
  communities: [
    { id: 1, name: "Web Development", role: "Moderator", members: 1240 },
    { id: 2, name: "Open Source Projects", role: "Member", members: 876 },
    { id: 3, name: "UI/UX Design", role: "Member", members: 542 }
  ],
  badges: [
    { id: 1, name: "Task Master", description: "Completed 50+ tasks", icon: "trophy" },
    { id: 2, name: "Community Pillar", description: "Active in 3+ communities", icon: "users" },
    { id: 3, name: "Streak Champion", description: "Maintained 10+ day streak", icon: "fire" },
    { id: 4, name: "First Contribution", description: "Made first contribution", icon: "check" }
  ],
  skills: ["JavaScript", "React", "Node.js", "UI Design", "Project Management"]
};

function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState(mockUserData);
  const [activeTab, setActiveTab] = useState('overview');
  
  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };
  
  const handleSaveProfile = (updatedData) => {
    // API call to update user profile would go here
    setUserData({...userData, ...updatedData});
    setIsEditing(false);
  };

  const onNavigate = (destination) => {
    console.log(`Navigating to ${destination}`);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header with user info */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-4 md:p-10 rounded-b-lg shadow-md">
        <div className="container mx-auto px-2 sm:px-4">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
            <div className="relative">
              <img 
                src={userData.avatar} 
                alt={userData.name}
                className="w-20 h-20 md:w-32 md:h-32 rounded-full border-4 border-white shadow-lg"
              />
              {!isEditing && (
                <button 
                  onClick={handleEditToggle}
                  className="absolute bottom-0 right-0 bg-white text-blue-600 rounded-full p-2 shadow-md hover:bg-blue-50 transition"
                  title="Edit profile"
                >
                  <FaUserEdit size={18} />
                </button>
              )}
            </div>
            
            <div className="text-center md:text-left flex-1">
              <h1 className="text-xl md:text-3xl font-bold">{userData.name}</h1>
              <p className="text-blue-100 text-sm md:text-base">{userData.email}</p>
              <p className="mt-2 text-xs md:text-base max-w-2xl">{userData.bio}</p>
            </div>
            
            <div className="flex gap-3 md:gap-4 items-center">
              <div className="text-center px-2 md:px-4">
                <div className="flex items-center justify-center gap-1 md:gap-2">
                  <AiFillFire className="text-yellow-300" size={20} />
                  <span className="text-lg md:text-2xl font-bold">{userData.currentStreak}</span>
                </div>
                <p className="text-xs text-blue-100">Day Streak</p>
              </div>
              
              <div className="text-center px-2 md:px-4">
                <div className="flex items-center justify-center gap-1 md:gap-2">
                  <BsCheckCircleFill className="text-green-300" size={18} />
                  <span className="text-lg md:text-2xl font-bold">{userData.tasksCompleted}</span>
                </div>
                <p className="text-xs text-blue-100">Tasks</p>
              </div>
              
              <div className="text-center px-2 md:px-4">
                <div className="flex items-center justify-center gap-1 md:gap-2">
                  <AiFillTrophy className="text-yellow-300" size={20} />
                  <span className="text-lg md:text-2xl font-bold">{userData.pointsEarned}</span>
                </div>
                <p className="text-xs text-blue-100">Points</p>
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex justify-center md:justify-start overflow-x-auto">
            <div className="inline-flex bg-blue-800 bg-opacity-40 rounded-lg p-1">
              <button 
                onClick={() => setActiveTab('overview')}
                className={`px-3 py-2 rounded-lg text-xs md:text-sm ${activeTab === 'overview' ? 'bg-white text-blue-700' : 'text-white'}`}
              >
                Overview
              </button>
              <button 
                onClick={() => setActiveTab('activity')}
                className={`px-3 py-2 rounded-lg text-xs md:text-sm ${activeTab === 'activity' ? 'bg-white text-blue-700' : 'text-white'}`}
              >
                Activity
              </button>
              <button 
                onClick={() => setActiveTab('communities')}
                className={`px-3 py-2 rounded-lg text-xs md:text-sm ${activeTab === 'communities' ? 'bg-white text-blue-700' : 'text-white'}`}
              >
                Communities
              </button>
              <button 
                onClick={() => setActiveTab('settings')}
                className={`px-3 py-2 rounded-lg text-xs md:text-sm ${activeTab === 'settings' ? 'bg-white text-blue-700' : 'text-white'}`}
              >
                Settings
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Home button */}
      <div className="container mx-auto px-4 py-2">
        <button 
          onClick={() => setActiveTab('overview')} 
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition shadow-md"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
          </svg>
          Home
        </button>
      </div>
      
      {/* Main content */}
      <div className="container mx-auto py-3 px-4">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Level and Status */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-800">Status</h2>
                  <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {userData.level}
                  </span>
                </div>
                
                <div className="relative pt-1">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <span className="text-xs font-semibold inline-block text-blue-600">
                        Level Progress
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-semibold inline-block text-blue-600">
                        {userData.pointsEarned}/1500 points
                      </span>
                    </div>
                  </div>
                  <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-100">
                    <div style={{ width: `${(userData.pointsEarned / 1500) * 100}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600"></div>
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm">
                  You need 260 more points to reach Platinum Contributor status.
                </p>
              </div>
              
              {/* Contribution Calendar */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Contribution Activity</h2>
                <ContributionCalendar />
                <div className="flex justify-between mt-4 text-sm text-gray-600">
                  <span>Less</span>
                  <div className="flex gap-1">
                    <span className="w-3 h-3 bg-blue-100 rounded"></span>
                    <span className="w-3 h-3 bg-blue-200 rounded"></span>
                    <span className="w-3 h-3 bg-blue-300 rounded"></span>
                    <span className="w-3 h-3 bg-blue-400 rounded"></span>
                    <span className="w-3 h-3 bg-blue-500 rounded"></span>
                  </div>
                  <span>More</span>
                </div>
              </div>
              
              {/* Badges */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Achievements & Badges</h2>
                <BadgeDisplay badges={userData.badges} />
              </div>
            </div>
            
            {/* Right column */}
            <div className="space-y-6">
              {/* Communities */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">My Communities</h2>
                <div className="space-y-4">
                  {userData.communities.map(community => (
                    <div key={community.id} className="border-b border-gray-100 pb-3 last:border-0">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium text-gray-800">{community.name}</h3>
                        <span className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded">{community.role}</span>
                      </div>
                      <div className="flex items-center mt-1 text-gray-500 text-sm">
                        <FaUsers className="mr-2" />
                        <span>{community.members} members</span>
                      </div>
                    </div>
                  ))}
                </div>
                <button 
                  className="mt-4 text-sm bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                  onClick={() => onNavigate('explore')}
                >
                  Explore Communities
                </button>
              </div>
              
              {/* Skills and Interests */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Skills & Interests</h2>
                <div className="flex flex-wrap gap-2">
                  {userData.skills.map((skill, index) => (
                    <span key={index} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
                {!isEditing && (
                  <button className="mt-4 text-blue-600 text-sm font-medium hover:text-blue-800 transition">
                    + Add more skills
                  </button>
                )}
              </div>
              
              {/* Account Details */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Account Details</h2>
                <div className="space-y-3">
                  <div className="flex items-center text-gray-600">
                    <FaCalendarAlt className="mr-3 text-blue-500" />
                    <div>
                      <p className="text-sm text-gray-500">Member since</p>
                      <p>{userData.joinDate}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'activity' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Activity Timeline</h2>
            <ActivityTimeline />
          </div>
        )}
        
        {activeTab === 'communities' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">My Communities</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mx-auto max-w-6xl">
              {userData.communities.map(community => (
                <div key={community.id} className="border rounded-lg p-4 hover:shadow-md transition flex flex-col h-full">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium text-gray-800">{community.name}</h3>
                    <span className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded">{community.role}</span>
                  </div>
                  <div className="flex items-center mt-2 text-gray-500 text-sm">
                    <FaUsers className="mr-2" />
                    <span>{community.members} members</span>
                  </div>
                  <div className="mt-auto pt-4 flex gap-2">
                    <button className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition flex-1">
                      View Tasks
                    </button>
                    <button className="text-sm border border-gray-300 text-gray-600 px-3 py-1 rounded hover:bg-gray-50 transition flex-1">
                      Leaderboard
                    </button>
                  </div>
                </div>
              ))}
              <div className="border rounded-lg p-4 border-dashed flex flex-col items-center justify-center h-full">
                <FaUsers size={24} className="text-gray-400 mb-2" />
                <h3 className="font-medium text-gray-600">Join New Community</h3>
                <p className="text-gray-500 text-sm text-center mt-1">Discover communities that match your interests</p>
                <button 
                  className="mt-4 text-sm bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                  onClick={() => onNavigate('explore')}
                >
                  Explore Communities
                </button>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'settings' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Profile Settings</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-3">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input 
                      type="text" 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      defaultValue={userData.name}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input 
                      type="email" 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      defaultValue={userData.email}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                    <textarea 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows="3"
                      defaultValue={userData.bio}
                    ></textarea>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-3">Privacy Settings</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <FaLock className="text-gray-500 mr-3" />
                      <div>
                        <p className="text-gray-800">Profile Visibility</p>
                        <p className="text-sm text-gray-500">Control who can see your profile information</p>
                      </div>
                    </div>
                    <select className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>Public</option>
                      <option>Community Members Only</option>
                      <option>Private</option>
                    </select>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <FaLock className="text-gray-500 mr-3" />
                      <div>
                        <p className="text-gray-800">Activity Visibility</p>
                        <p className="text-sm text-gray-500">Control who can see your activities and contributions</p>
                      </div>
                    </div>
                    <select className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>Public</option>
                      <option>Community Members Only</option>
                      <option>Private</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end gap-3 pt-4 border-t">
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition">
                  Cancel
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfilePage;