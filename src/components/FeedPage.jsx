import React, { useState, useEffect } from 'react';
import { 
  FaSearch, FaFilter, FaLightbulb, FaBell, FaUsers, 
  FaTasks, FaHome, FaRegClock, FaChartLine, FaTag
} from 'react-icons/fa';
import { BsCheckCircleFill, BsStarFill, BsLightningChargeFill } from 'react-icons/bs';

function FeedPage({ onNavigate }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [communityFilter, setCommunityFilter] = useState('all');
  const [urgencyFilter, setUrgencyFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [feedItems, setFeedItems] = useState([]);
  
  // Mock data
  const userData = {
    id: 'user123',
    name: 'Alex Johnson',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    communities: [
      { id: 1, name: 'Web Development', color: 'blue' },
      { id: 2, name: 'Open Source Projects', color: 'green' },
      { id: 3, name: 'UI/UX Design', color: 'purple' }
    ],
    recentTags: ['Frontend', 'React', 'API', 'Documentation', 'Performance'],
    currentStreak: 12,
    tasksCompleted: 87,
    pointsEarned: 1240
  };
  
  const mockNotifications = [
    { id: 1, type: 'task_assigned', message: 'You have been assigned to "API Documentation" task', time: '2 hours ago' },
    { id: 2, type: 'points_earned', message: 'You earned 30 points for completing "Bug Fix Task"', time: '1 day ago' },
    { id: 3, type: 'badge_earned', message: 'You earned "Consistency Champion" badge', time: '2 days ago' },
    { id: 4, type: 'comment', message: 'Alex commented on your solution for "Login UI Design"', time: '3 days ago' }
  ];
  
  const mockFeedItems = [
    {
      id: 1,
      type: 'task',
      communityId: 1,
      communityName: 'Web Development',
      communityColor: 'blue',
      title: 'Implement Responsive Navigation Component',
      description: 'Create a mobile-friendly navigation component using React and Tailwind CSS that collapses into a hamburger menu on smaller screens.',
      difficulty: 'Medium',
      urgency: 'High',
      reward: 30,
      dueDays: 5,
      tags: ['Frontend', 'React', 'UI/UX'],
      participants: 4,
      status: 'In Progress',
      time: '2 hours ago',
      recommended: true
    },
    {
      id: 2,
      type: 'announcement',
      communityId: 1,
      communityName: 'Web Development',
      communityColor: 'blue',
      title: 'New Framework Challenge Starting Next Week',
      content: 'We\'re launching a new challenge to build responsive applications using the latest frameworks. Prepare your dev environment!',
      author: 'Sarah Chen',
      authorRole: 'Admin',
      time: '1 day ago'
    },
    {
      id: 3,
      type: 'task',
      communityId: 2,
      communityName: 'Open Source Projects',
      communityColor: 'green',
      title: 'Create End-to-End Tests',
      description: 'Develop comprehensive E2E tests for the user authentication flow using Cypress.',
      difficulty: 'Medium',
      urgency: 'Medium',
      reward: 25,
      dueDays: 10,
      tags: ['Testing', 'Quality Assurance'],
      participants: 0,
      status: 'Open',
      time: '1 day ago',
      recommended: false
    },
    {
      id: 4,
      type: 'completion',
      communityId: 3,
      communityName: 'UI/UX Design',
      communityColor: 'purple',
      title: 'User Flow Diagrams for Mobile App',
      completed: true,
      completedBy: 'Miguel Santos',
      points: 35,
      time: '2 days ago'
    },
    {
      id: 5,
      type: 'task',
      communityId: 3,
      communityName: 'UI/UX Design',
      communityColor: 'purple',
      title: 'Design System Documentation',
      description: 'Create comprehensive documentation for our design system components with usage examples.',
      difficulty: 'Easy',
      urgency: 'Low',
      reward: 15,
      dueDays: 14,
      tags: ['Documentation', 'Design'],
      participants: 1,
      status: 'In Progress',
      time: '3 days ago',
      recommended: true
    }
  ];
  
  // Load data
  useEffect(() => {
    // In a real app, these would be API calls
    setNotifications(mockNotifications);
    setFeedItems(mockFeedItems);
  }, []);
  
  // Filter feed items
  const filteredFeedItems = feedItems.filter(item => {
    // Text search
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = !searchQuery || 
      (item.title && item.title.toLowerCase().includes(searchLower)) ||
      (item.description && item.description.toLowerCase().includes(searchLower)) ||
      (item.communityName && item.communityName.toLowerCase().includes(searchLower)) ||
      (item.tags && item.tags.some(tag => tag.toLowerCase().includes(searchLower)));
    
    // Type filter
    const matchesType = filterType === 'all' || 
      (filterType === 'tasks' && item.type === 'task') ||
      (filterType === 'announcements' && item.type === 'announcement') ||
      (filterType === 'completions' && item.type === 'completion');
    
    // Community filter
    const matchesCommunity = communityFilter === 'all' || 
      (item.communityId.toString() === communityFilter);
    
    // Urgency filter
    const matchesUrgency = urgencyFilter === 'all' || 
      (item.urgency && item.urgency.toLowerCase() === urgencyFilter.toLowerCase());
    
    return matchesSearch && matchesType && matchesCommunity && matchesUrgency;
  });
  
  // Utility functions for styling
  const getCommunityColor = (color) => {
    switch(color) {
      case 'blue': return 'bg-blue-100 text-blue-800';
      case 'green': return 'bg-green-100 text-green-800';
      case 'purple': return 'bg-purple-100 text-purple-800';
      case 'red': return 'bg-red-100 text-red-800';
      case 'yellow': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getDifficultyColor = (difficulty) => {
    switch(difficulty?.toLowerCase()) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getUrgencyColor = (urgency) => {
    switch(urgency?.toLowerCase()) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Feed item card renderer
  const renderFeedItem = (item) => {
    switch(item.type) {
      case 'task':
        return (
          <div className={`bg-white rounded-lg shadow-sm border hover:shadow-md transition overflow-hidden flex flex-col ${item.recommended ? 'border-blue-300 ring-1 ring-blue-300' : ''}`}>
            {item.recommended && (
              <div className="bg-blue-50 py-1 px-3 flex items-center text-xs text-blue-700">
                <FaLightbulb className="mr-1" />
                Recommended for you based on your activity
              </div>
            )}
            <div className="p-4 flex-1">
              <div className="flex items-center mb-3">
                <span className={`text-xs px-2 py-1 rounded-full ${getCommunityColor(item.communityColor)}`}>
                  {item.communityName}
                </span>
                <span className="mx-2 text-gray-400">•</span>
                <span className="text-xs text-gray-500">{item.time}</span>
              </div>
              
              <div className="flex justify-between items-start">
                <h3 className="font-semibold text-gray-800 mb-2">{item.title}</h3>
                <span className={`${getUrgencyColor(item.urgency)} text-xs px-2 py-1 rounded-full`}>
                  {item.urgency}
                </span>
              </div>
              
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">{item.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-3">
                {item.tags?.map((tag, index) => (
                  <span key={index} className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="flex justify-between items-center text-sm text-gray-500">
                <div className="flex items-center">
                  <BsStarFill className="text-yellow-400 mr-1" />
                  <span>{item.reward} pts</span>
                </div>
                
                <div className="flex items-center">
                  <FaRegClock className="text-blue-400 mr-1" />
                  <span>{item.dueDays} days left</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-3 border-t flex justify-between items-center">
              <div className="flex items-center">
                <span className={`${getDifficultyColor(item.difficulty)} text-xs px-2 py-1 rounded-full`}>
                  {item.difficulty}
                </span>
                <span className="ml-2 text-xs text-gray-500">
                  {item.participants} participant{item.participants !== 1 ? 's' : ''}
                </span>
              </div>
              
              <button 
                className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1 rounded transition"
                onClick={() => onNavigate('explore')}
              >
                {item.status === 'Open' ? 'Take Task' : 'View Details'}
              </button>
            </div>
          </div>
        );
        
      case 'announcement':
        return (
          <div className="bg-white rounded-lg shadow-sm border hover:shadow-md transition overflow-hidden">
            <div className="p-4">
              <div className="flex items-center mb-3">
                <span className={`text-xs px-2 py-1 rounded-full ${getCommunityColor(item.communityColor)}`}>
                  {item.communityName}
                </span>
                <span className="mx-2 text-gray-400">•</span>
                <span className="text-xs text-gray-500">{item.time}</span>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="bg-yellow-100 p-2 rounded-full mt-1">
                  <FaBell className="text-yellow-600" />
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm mb-3">{item.content}</p>
                  
                  <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center">
                      <span className="font-medium text-gray-700">{item.author}</span>
                      <span className="ml-2 bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded">
                        {item.authorRole}
                      </span>
                    </div>
                    
                    <button 
                      className="text-blue-600 hover:text-blue-800 transition text-sm"
                      onClick={() => onNavigate('explore')}
                    >
                      View in Community
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
        
      case 'completion':
        return (
          <div className="bg-white rounded-lg shadow-sm border hover:shadow-md transition overflow-hidden">
            <div className="p-4">
              <div className="flex items-center mb-3">
                <span className={`text-xs px-2 py-1 rounded-full ${getCommunityColor(item.communityColor)}`}>
                  {item.communityName}
                </span>
                <span className="mx-2 text-gray-400">•</span>
                <span className="text-xs text-gray-500">{item.time}</span>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="bg-green-100 p-2 rounded-full mt-1">
                  <BsCheckCircleFill className="text-green-600" />
                </div>
                
                <div>
                  <p className="text-gray-600 text-sm mb-1">
                    <span className="font-medium text-gray-800">{item.completedBy}</span> completed:
                  </p>
                  <h3 className="font-semibold text-gray-800 mb-3">{item.title}</h3>
                  
                  <div className="bg-green-50 border border-green-100 rounded-md p-2 flex justify-between items-center">
                    <span className="text-green-800 text-sm">Task successfully completed!</span>
                    <span className="bg-green-200 text-green-800 font-medium px-2 py-0.5 rounded text-xs">
                      +{item.points} points
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      {/* Header with search */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center flex-1">
              <div className="mr-4">
                <h1 className="text-xl font-bold text-blue-600 flex items-center">
                  <FaHome className="mr-2" />
                  TaskHub
                </h1>
              </div>
              
              {/* Search input - simplified on mobile */}
              <div className="relative flex-1 max-w-2xl">
                <input
                  type="text"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  placeholder={window.innerWidth < 640 ? "Search..." : "Search for tasks, communities, or tags..."}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>
            
            <div className="flex items-center ml-4">
              <div className="relative">
                <button
                  className="p-2 rounded-full text-gray-500 hover:bg-gray-100 transition relative"
                  onClick={() => setShowNotifications(!showNotifications)}
                >
                  <FaBell />
                  <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                    {notifications.length}
                  </span>
                </button>
                
                {/* Notifications dropdown */}
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg overflow-hidden z-20 border">
                    <div className="p-3 border-b">
                      <h3 className="font-medium text-gray-700">Notifications</h3>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.map(notification => (
                        <div key={notification.id} className="p-3 hover:bg-gray-50 border-b last:border-b-0">
                          <p className="text-sm text-gray-800">{notification.message}</p>
                          <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                        </div>
                      ))}
                    </div>
                    <div className="p-2 border-t bg-gray-50 text-center">
                      <button className="text-sm text-blue-600 hover:text-blue-800 transition">
                        View all notifications
                      </button>
                    </div>
                  </div>
                )}
              </div>
              
              <button 
                className="ml-2 flex items-center gap-2"
                onClick={() => onNavigate('profile')}
              >
                <img 
                  src={userData.avatar} 
                  alt={userData.name} 
                  className="w-8 h-8 rounded-full border"
                />
                <span className="text-sm font-medium text-gray-700 hidden md:block">
                  {userData.name}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main feed column */}
          <div className="lg:flex-1 order-2 lg:order-1">
            {/* Filter controls */}
            <div className="mb-6 bg-white p-4 rounded-lg shadow-sm border">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <button
                    className={`px-3 py-1 rounded-md text-sm font-medium ${filterType === 'all' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
                    onClick={() => setFilterType('all')}
                  >
                    All
                  </button>
                  <button
                    className={`px-3 py-1 rounded-md text-sm font-medium ${filterType === 'tasks' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
                    onClick={() => setFilterType('tasks')}
                  >
                    <FaTasks className="inline mr-1" />
                    Tasks
                  </button>
                  <button
                    className={`px-3 py-1 rounded-md text-sm font-medium ${filterType === 'announcements' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
                    onClick={() => setFilterType('announcements')}
                  >
                    <FaBell className="inline mr-1" />
                    Announcements
                  </button>
                </div>
                
                <button
                  className="flex items-center gap-1 text-blue-600 hover:text-blue-800 transition text-sm"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <FaFilter />
                  {showFilters ? 'Hide Filters' : 'More Filters'}
                </button>
              </div>
              
              {/* Advanced filters */}
              {showFilters && (
                <div className="mt-4 pt-4 border-t grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Community</label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      value={communityFilter}
                      onChange={(e) => setCommunityFilter(e.target.value)}
                    >
                      <option value="all">All Communities</option>
                      {userData.communities.map(community => (
                        <option key={community.id} value={community.id.toString()}>
                          {community.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Urgency</label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      value={urgencyFilter}
                      onChange={(e) => setUrgencyFilter(e.target.value)}
                    >
                      <option value="all">All Urgency Levels</option>
                      <option value="high">High</option>
                      <option value="medium">Medium</option>
                      <option value="low">Low</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    >
                      <option value="recent">Most Recent</option>
                      <option value="points">Highest Points</option>
                      <option value="deadline">Closest Deadline</option>
                      <option value="recommended">Recommended for You</option>
                    </select>
                  </div>
                </div>
              )}
            </div>
            
            {/* Feed items */}
            <div className="space-y-4">
              {filteredFeedItems.length > 0 ? (
                filteredFeedItems.map(item => (
                  <div key={item.id}>
                    {renderFeedItem(item)}
                  </div>
                ))
              ) : (
                <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
                  <FaSearch className="text-gray-400 text-4xl mx-auto mb-3" />
                  <h3 className="text-lg font-medium text-gray-800 mb-1">No items found</h3>
                  <p className="text-gray-500">Try adjusting your filters or search query</p>
                  <button 
                    onClick={() => {
                      setSearchQuery('');
                      setFilterType('all');
                      setCommunityFilter('all');
                      setUrgencyFilter('all');
                    }}
                    className="mt-4 text-blue-600 hover:text-blue-800 transition"
                  >
                    Reset all filters
                  </button>
                </div>
              )}
            </div>
          </div>
          
          {/* Sidebar - Hidden on mobile, visible on larger screens */}
          <div className="hidden lg:block lg:w-80 order-1 lg:order-2">
            <div className="space-y-6">
              {/* User stats */}
              <div className="bg-white rounded-lg shadow-sm border p-4">
                <div className="flex items-center mb-4">
                  <img 
                    src={userData.avatar} 
                    alt={userData.name} 
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <div>
                    <h3 className="font-medium text-gray-800">{userData.name}</h3>
                    <button 
                      className="text-blue-600 hover:text-blue-800 transition text-xs"
                      onClick={() => onNavigate('profile')}
                    >
                      View Profile
                    </button>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="bg-blue-50 rounded-md p-2">
                    <div className="flex items-center justify-center gap-1">
                      <BsLightningChargeFill className="text-yellow-500" />
                      <span className="font-bold text-blue-700">{userData.currentStreak}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Day Streak</p>
                  </div>
                  
                  <div className="bg-blue-50 rounded-md p-2">
                    <div className="flex items-center justify-center gap-1">
                      <BsCheckCircleFill className="text-green-500" />
                      <span className="font-bold text-blue-700">{userData.tasksCompleted}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Tasks</p>
                  </div>
                  
                  <div className="bg-blue-50 rounded-md p-2">
                    <div className="flex items-center justify-center gap-1">
                      <FaChartLine className="text-blue-500" />
                      <span className="font-bold text-blue-700">{userData.pointsEarned}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Points</p>
                  </div>
                </div>
              </div>
              
              {/* My Communities */}
              <div className="bg-white rounded-lg shadow-sm border p-4">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-medium text-gray-800">My Communities</h3>
                  <button 
                    className="text-blue-600 hover:text-blue-800 transition text-xs"
                    onClick={() => onNavigate('community')}
                  >
                    View All
                  </button>
                </div>
                
                <div className="space-y-2">
                  {userData.communities.map(community => (
                    <div 
                      key={community.id} 
                      className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-md cursor-pointer"
                      onClick={() => onNavigate('community')}
                    >
                      <div className="flex items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getCommunityColor(community.color)} mr-2`}>
                          <FaUsers size={14} />
                        </div>
                        <span className="text-sm">{community.name}</span>
                      </div>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  ))}
                </div>
                
                <button 
                  className="mt-3 w-full py-2 bg-blue-50 text-blue-600 rounded-md text-sm font-medium hover:bg-blue-100 transition"
                  onClick={() => onNavigate('community')}
                >
                  Explore Communities
                </button>
              </div>
              
              {/* Popular Tags */}
              <div className="bg-white rounded-lg shadow-sm border p-4">
                <h3 className="font-medium text-gray-800 mb-3">Popular Tags</h3>
                
                <div className="flex flex-wrap gap-2">
                  {userData.recentTags.map((tag, index) => (
                    <button 
                      key={index} 
                      className="bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs px-3 py-1 rounded-full flex items-center"
                      onClick={() => setSearchQuery(tag)}
                    >
                      <FaTag className="mr-1 text-gray-500" size={10} />
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Suggested Tasks */}
              <div className="bg-white rounded-lg shadow-sm border p-4">
                <div className="flex items-center mb-3">
                  <FaLightbulb className="text-yellow-500 mr-2" />
                  <h3 className="font-medium text-gray-800">Recommended for You</h3>
                </div>
                
                <div className="space-y-3">
                  {mockFeedItems
                    .filter(item => item.type === 'task' && item.recommended)
                    .slice(0, 2)
                    .map(task => (
                      <div 
                        key={task.id} 
                        className="border rounded-md p-3 hover:bg-blue-50 cursor-pointer transition"
                        onClick={() => onNavigate('community')}
                      >
                        <div className="flex justify-between mb-1">
                          <span className={`text-xs px-2 py-0.5 rounded-full ${getCommunityColor(task.communityColor)}`}>
                            {task.communityName}
                          </span>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${getDifficultyColor(task.difficulty)}`}>
                            {task.difficulty}
                          </span>
                        </div>
                        <h4 className="text-sm font-medium text-gray-800 mb-1 line-clamp-1">{task.title}</h4>
                        <div className="flex justify-between text-xs text-gray-500">
                          <span className="flex items-center">
                            <BsStarFill className="text-yellow-400 mr-1" />
                            {task.reward} pts
                          </span>
                          <span className="flex items-center">
                            <FaRegClock className="text-blue-400 mr-1" />
                            {task.dueDays} days left
                          </span>
                        </div>
                      </div>
                    ))}
                </div>
                
                <button 
                  className="mt-3 w-full py-2 bg-blue-50 text-blue-600 rounded-md text-xs font-medium hover:bg-blue-100 transition"
                  onClick={() => {
                    setFilterType('tasks');
                    setCommunityFilter('all');
                    setUrgencyFilter('all');
                  }}
                >
                  View All Recommendations
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom navigation for mobile */}
      <div className="fixed bottom-4 right-4 bg-white rounded-full shadow-lg p-2 flex gap-2 z-10">
        <button 
          className="p-2 rounded-full bg-blue-100 text-blue-600"
          title="Home"
        >
          <FaHome className="h-6 w-6" />
        </button>
        
        <button 
          onClick={() => onNavigate('profile')}
          className="p-2 rounded-full text-gray-500"
          title="Profile"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </button>
        
        <button 
          onClick={() => onNavigate('explore')}
          className="p-2 rounded-full text-gray-500"
          title="Communities"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default FeedPage;