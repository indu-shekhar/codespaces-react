import React, { useState } from 'react';
import { 
  FaUsers, FaTasks, FaTrophy, FaBullhorn, 
  FaPlus, FaFilter, FaStar, FaClock, FaChartLine
} from 'react-icons/fa';
import { BsCheckCircleFill, BsFlagFill, BsCalendarCheck } from 'react-icons/bs';
import { AiFillFire } from 'react-icons/ai';
import TaskDetailsModal from './TaskDetailsModal';

function CommunityPage() {
  const [activeTab, setActiveTab] = useState('tasks');
  const [createTaskModal, setCreateTaskModal] = useState(false);
  const [taskFilter, setTaskFilter] = useState('all');
  const [selectedTask, setSelectedTask] = useState(null);
  
  // Mock community data
  const communityData = {
    id: 1,
    name: "Web Development",
    description: "A community for web developers to collaborate, share knowledge, and work on projects together. Join us to improve your skills and contribute to exciting development challenges.",
    memberCount: 1240,
    tasksCompleted: 347,
    activeTaskCount: 12,
    userRole: "Moderator", // Could be: "Admin", "Moderator", "Member"
    dateCreated: "June 12, 2023",
    pinnedAnnouncements: [
      {
        id: 1,
        title: "New Framework Challenge Starting Next Week",
        content: "We're launching a new challenge to build responsive applications using the latest frameworks. Prepare your dev environment!",
        date: "2 days ago",
        author: "Sarah Chen",
        authorRole: "Admin"
      },
      {
        id: 2,
        title: "Community Guidelines Update",
        content: "We've updated our code review guidelines. Please check the documentation before submitting new PRs.",
        date: "5 days ago",
        author: "Alex Johnson",
        authorRole: "Moderator"
      }
    ],
    activeTasks: [
      {
        id: 1,
        title: "Implement Responsive Navigation Component",
        description: "Create a mobile-friendly navigation component using React and Tailwind CSS that collapses into a hamburger menu on smaller screens.",
        difficulty: "Medium",
        urgency: "High",
        reward: 30,
        assignedTo: [],
        dueDays: 5,
        tags: ["Frontend", "React", "UI/UX"],
        participants: 4,
        status: "In Progress"
      },
      {
        id: 2,
        title: "Optimize API Response Time",
        description: "Identify and fix performance bottlenecks in our REST API endpoints to improve response times by at least 30%.",
        difficulty: "Hard",
        urgency: "Medium",
        reward: 50,
        assignedTo: ["user123"],
        dueDays: 7,
        tags: ["Backend", "Performance", "API"],
        participants: 2,
        status: "In Progress"
      },
      {
        id: 3,
        title: "Create End-to-End Tests",
        description: "Develop comprehensive E2E tests for the user authentication flow using Cypress.",
        difficulty: "Medium",
        urgency: "Medium",
        reward: 25,
        assignedTo: [],
        dueDays: 10,
        tags: ["Testing", "Quality Assurance"],
        participants: 0,
        status: "Open"
      },
      {
        id: 4,
        title: "Design System Documentation",
        description: "Create comprehensive documentation for our design system components with usage examples.",
        difficulty: "Easy",
        urgency: "Low",
        reward: 15,
        assignedTo: ["user456"],
        dueDays: 14,
        tags: ["Documentation", "Design"],
        participants: 1,
        status: "In Progress"
      }
    ],
    leaderboard: [
      { id: 1, name: "Emma Wilson", avatar: "https://randomuser.me/api/portraits/women/45.jpg", points: 780, tasksCompleted: 24, streak: 15, badge: "MVP" },
      { id: 2, name: "Alex Johnson", avatar: "https://randomuser.me/api/portraits/men/32.jpg", points: 645, tasksCompleted: 18, streak: 12, badge: "Top Contributor" },
      { id: 3, name: "Miguel Santos", avatar: "https://randomuser.me/api/portraits/men/57.jpg", points: 590, tasksCompleted: 15, streak: 7, badge: null },
      { id: 4, name: "Priya Sharma", avatar: "https://randomuser.me/api/portraits/women/67.jpg", points: 510, tasksCompleted: 14, streak: 5, badge: null },
      { id: 5, name: "David Kim", avatar: "https://randomuser.me/api/portraits/men/11.jpg", points: 470, tasksCompleted: 12, streak: 3, badge: null }
    ]
  };

  // Difficulty colors
  const getDifficultyColor = (difficulty) => {
    switch(difficulty.toLowerCase()) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Urgency colors
  const getUrgencyColor = (urgency) => {
    switch(urgency.toLowerCase()) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Filter tasks based on selected filter
  const filteredTasks = communityData.activeTasks.filter(task => {
    if (taskFilter === 'all') return true;
    if (taskFilter === 'open') return task.status === 'Open';
    if (taskFilter === 'inProgress') return task.status === 'In Progress';
    if (taskFilter === 'easy') return task.difficulty === 'Easy';
    if (taskFilter === 'medium') return task.difficulty === 'Medium';
    if (taskFilter === 'hard') return task.difficulty === 'Hard';
    return true;
  });

  // Create task modal component
  const CreateTaskModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Create New Task</h2>
            <button 
              onClick={() => setCreateTaskModal(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Task Title
              </label>
              <input 
                type="text" 
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter a clear, descriptive title"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea 
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                rows="4"
                placeholder="Describe the task requirements, goals, and any relevant details"
              ></textarea>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Difficulty
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                  <option value="">Select difficulty</option>
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Urgency
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                  <option value="">Select urgency</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Due Date
                </label>
                <input 
                  type="date" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Points Reward
                </label>
                <input 
                  type="number" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Points for completing this task"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tags
              </label>
              <input 
                type="text" 
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter tags separated by commas (e.g., Frontend, API, Documentation)"
              />
            </div>
            
            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={() => setCreateTaskModal(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
              >
                Create Task
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Top navigation for home/back */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <button 
            className="text-blue-600 flex items-center gap-1 hover:text-blue-800 transition"
            onClick={() => window.history.back()}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Back
          </button>
          
          <button 
            className="text-blue-600 flex items-center gap-1 hover:text-blue-800 transition"
            onClick={() => window.location.href = "/"}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
            Home
          </button>
        </div>
      </div>
      
      {/* Community header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto px-4 py-8 md:py-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
                {communityData.name}
                <span className="bg-white text-blue-600 text-xs px-2 py-1 rounded-full font-medium">
                  {communityData.userRole}
                </span>
              </h1>
              <p className="mt-2 text-blue-100 max-w-3xl">{communityData.description}</p>
            </div>
            
            <div className="flex gap-4 md:gap-6 bg-blue-800 bg-opacity-40 rounded-lg p-3">
              <div className="text-center">
                <div className="flex items-center justify-center text-2xl font-bold">
                  <FaUsers className="mr-2 text-blue-300" />
                  {communityData.memberCount}
                </div>
                <p className="text-xs text-blue-200">Members</p>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center text-2xl font-bold">
                  <BsCheckCircleFill className="mr-2 text-green-300" />
                  {communityData.tasksCompleted}
                </div>
                <p className="text-xs text-blue-200">Completed</p>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center text-2xl font-bold">
                  <FaTasks className="mr-2 text-yellow-300" />
                  {communityData.activeTaskCount}
                </div>
                <p className="text-xs text-blue-200">Active Tasks</p>
              </div>
            </div>
          </div>
          
          {/* Navigation tabs */}
          <div className="mt-8 border-b border-blue-500 flex overflow-x-auto no-scrollbar">
            <button
              onClick={() => setActiveTab('tasks')}
              className={`px-4 py-2 font-medium text-sm border-b-2 whitespace-nowrap ${activeTab === 'tasks' ? 'border-white text-white' : 'border-transparent text-blue-200 hover:text-white'}`}
            >
              <FaTasks className="inline mr-2" />
              Active Tasks
            </button>
            <button
              onClick={() => setActiveTab('leaderboard')}
              className={`px-4 py-2 font-medium text-sm border-b-2 whitespace-nowrap ${activeTab === 'leaderboard' ? 'border-white text-white' : 'border-transparent text-blue-200 hover:text-white'}`}
            >
              <FaTrophy className="inline mr-2" />
              Leaderboard
            </button>
            <button
              onClick={() => setActiveTab('announcements')}
              className={`px-4 py-2 font-medium text-sm border-b-2 whitespace-nowrap ${activeTab === 'announcements' ? 'border-white text-white' : 'border-transparent text-blue-200 hover:text-white'}`}
            >
              <FaBullhorn className="inline mr-2" />
              Announcements
            </button>
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="container mx-auto px-4 py-6">
        {/* Active Tasks Tab */}
        {activeTab === 'tasks' && (
          <div>
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
              <h2 className="text-xl font-semibold text-gray-800">
                Active Tasks ({filteredTasks.length})
              </h2>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex items-center bg-white rounded-lg shadow-sm border p-2">
                  <FaFilter className="text-gray-400 mr-2" />
                  <select 
                    className="bg-transparent border-none text-sm focus:ring-0 w-full"
                    value={taskFilter}
                    onChange={(e) => setTaskFilter(e.target.value)}
                  >
                    <option value="all">All Tasks</option>
                    <option value="open">Open Tasks</option>
                    <option value="inProgress">In Progress</option>
                    <option value="easy">Easy Difficulty</option>
                    <option value="medium">Medium Difficulty</option>
                    <option value="hard">Hard Difficulty</option>
                  </select>
                </div>
                
                {/* Create task button - only visible for moderators and admins */}
                {(communityData.userRole === "Moderator" || communityData.userRole === "Admin") && (
                  <button
                    onClick={() => setCreateTaskModal(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium flex items-center justify-center gap-1 hover:bg-blue-700 transition shadow-sm"
                  >
                    <FaPlus size={14} />
                    Create Task
                  </button>
                )}
              </div>
            </div>
            
            {/* Task cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {filteredTasks.map(task => (
                <div key={task.id} className="bg-white rounded-lg shadow-sm border hover:shadow-md transition overflow-hidden flex flex-col">
                  <div className="p-4 flex-1">
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold text-gray-800 mb-2">{task.title}</h3>
                      <span className={`${getUrgencyColor(task.urgency)} text-xs px-2 py-1 rounded-full`}>
                        {task.urgency}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">{task.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {task.tags.map((tag, index) => (
                        <span key={index} className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex justify-between items-center text-sm text-gray-500">
                      <div className="flex items-center">
                        <FaStar className="text-yellow-400 mr-1" />
                        <span>{task.reward} pts</span>
                      </div>
                      
                      <div className="flex items-center">
                        <FaClock className="text-blue-400 mr-1" />
                        <span>{task.dueDays} days left</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-3 border-t flex justify-between items-center">
                    <div className="flex items-center">
                      <span className={`${getDifficultyColor(task.difficulty)} text-xs px-2 py-1 rounded-full`}>
                        {task.difficulty}
                      </span>
                      <span className="ml-2 text-xs text-gray-500">
                        {task.participants} participant{task.participants !== 1 ? 's' : ''}
                      </span>
                    </div>
                    
                    <button 
                      className="bg-blue-600 text-white text-xs px-3 py-1 rounded hover:bg-blue-700 transition"
                      onClick={() => setSelectedTask(task)}
                    >
                      {task.status === 'Open' ? 'Take Task' : 'View Details'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            {/* No tasks message */}
            {filteredTasks.length === 0 && (
              <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
                <FaTasks className="text-gray-400 text-4xl mx-auto mb-3" />
                <h3 className="text-lg font-medium text-gray-800 mb-1">No tasks found</h3>
                <p className="text-gray-500">There are no tasks matching your current filter.</p>
                <button 
                  onClick={() => setTaskFilter('all')}
                  className="mt-4 text-blue-600 hover:text-blue-800 transition"
                >
                  View all tasks
                </button>
              </div>
            )}
          </div>
        )}
        
        {/* Leaderboard Tab */}
        {activeTab === 'leaderboard' && (
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              Community Leaderboard
            </h2>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Rank
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Member
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <FaChartLine className="inline mr-1" />
                        Points
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <BsCheckCircleFill className="inline mr-1" />
                        Tasks
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <AiFillFire className="inline mr-1" />
                        Streak
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Badge
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {communityData.leaderboard.map((member, index) => (
                      <tr key={member.id} className={index < 3 ? "bg-blue-50" : ""}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                            index === 0 ? "bg-yellow-400" : 
                            index === 1 ? "bg-gray-300" :
                            index === 2 ? "bg-amber-600" : "bg-gray-100"
                          } text-white font-bold`}>
                            {index + 1}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <img 
                                className="h-10 w-10 rounded-full" 
                                src={member.avatar} 
                                alt={member.name} 
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {member.name}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{member.points}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{member.tasksCompleted}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <AiFillFire className="text-orange-500 mr-1" />
                            <span className="text-sm text-gray-900">{member.streak} days</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {member.badge ? (
                            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                              {member.badge}
                            </span>
                          ) : (
                            <span className="text-gray-400 text-xs">—</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {/* Achievement metrics */}
              <div className="bg-gray-50 p-4 border-t">
                <h3 className="text-sm font-medium text-gray-700 mb-3">Your Standing</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white p-3 rounded-lg border shadow-sm">
                    <p className="text-xs text-gray-500">Current Rank</p>
                    <div className="flex items-center mt-1">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-bold mr-2">
                        2
                      </div>
                      <span className="text-lg font-semibold">Silver Position</span>
                    </div>
                  </div>
                  
                  <div className="bg-white p-3 rounded-lg border shadow-sm">
                    <p className="text-xs text-gray-500">Points to Next Rank</p>
                    <div className="mt-1">
                      <div className="flex justify-between mb-1">
                        <span className="text-xs text-gray-500">645 pts</span>
                        <span className="text-xs text-gray-500">780 pts</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: '82%' }}></div>
                      </div>
                      <p className="text-sm mt-1">Need <span className="font-semibold">135</span> more points for Rank #1</p>
                    </div>
                  </div>
                  
                  <div className="bg-white p-3 rounded-lg border shadow-sm">
                    <p className="text-xs text-gray-500">Weekly Progress</p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-blue-600">4</p>
                        <p className="text-xs text-gray-500">Tasks</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-green-600">120</p>
                        <p className="text-xs text-gray-500">Points</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-amber-600">7</p>
                        <p className="text-xs text-gray-500">Days Active</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Announcements Tab */}
        {activeTab === 'announcements' && (
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              Community Announcements
            </h2>
            
            {/* Pinned announcements */}
            <div className="space-y-4">
              {communityData.pinnedAnnouncements.map(announcement => (
                <div key={announcement.id} className="bg-white rounded-lg shadow-sm border hover:shadow-md transition overflow-hidden">
                  <div className="bg-yellow-50 border-b border-yellow-100 px-4 py-2 flex items-center">
                    <BsFlagFill className="text-yellow-600 mr-2" />
                    <span className="text-sm font-medium text-yellow-700">Pinned Announcement</span>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800 text-lg mb-2">{announcement.title}</h3>
                    <p className="text-gray-600 mb-4">{announcement.content}</p>
                    
                    <div className="flex justify-between items-center text-sm text-gray-500">
                      <div className="flex items-center">
                        <span className="font-medium text-gray-700 mr-1">{announcement.author}</span>
                        <span className="text-xs bg-blue-100 text-blue-800 rounded px-2 py-0.5">
                          {announcement.authorRole}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <BsCalendarCheck className="mr-1" />
                        <span>{announcement.date}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Create announcement button - only for admins/moderators */}
              {(communityData.userRole === "Moderator" || communityData.userRole === "Admin") && (
                <div className="mt-4 flex justify-end">
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 hover:bg-blue-700 transition shadow-sm">
                    <FaBullhorn size={14} />
                    New Announcement
                  </button>
                </div>
              )}
              
              {/* Join community section for visitors */}
              {!communityData.userRole && (
                <div className="bg-blue-50 rounded-lg border border-blue-200 p-6 text-center mt-6">
                  <FaUsers className="text-blue-500 text-4xl mx-auto mb-3" />
                  <h3 className="text-lg font-medium text-gray-800 mb-2">Join this community</h3>
                  <p className="text-gray-600 mb-4">
                    Become a member to participate in tasks and earn points!
                  </p>
                  <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition">
                    Join Community
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      
      {/* Create task modal */}
      {createTaskModal && <CreateTaskModal />}

      {/* Task detail modal */}
      {selectedTask && (
        <TaskDetailsModal 
          task={selectedTask} 
          onClose={() => setSelectedTask(null)} 
          userRole={communityData.userRole}
        />
      )}
    </div>
  );
}

export default CommunityPage;