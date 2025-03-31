import React, { useState, useEffect, useRef } from 'react';
import { 
  FaUsers, FaSearch, FaStar, FaCrown, FaUserCog, FaUserCheck, 
  FaPlus, FaArrowLeft, FaHome, FaUserFriends, FaTasks,
  FaChartLine, FaChevronRight, FaFilter, FaGlobe, FaCamera, FaImage, FaTimes, FaTag
} from 'react-icons/fa';
import { BsCheckCircleFill, BsLightningChargeFill } from 'react-icons/bs';

function CommunityExplorerPage({ onNavigate }) {
  const [activeTab, setActiveTab] = useState('joined');
  const [searchQuery, setSearchQuery] = useState('');
  const [communityFilter, setCommunityFilter] = useState('all');
  const [showFilterOptions, setShowFilterOptions] = useState(false);
  const [selectedCommunity, setSelectedCommunity] = useState(null);
  const [showConfirmJoin, setShowConfirmJoin] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newCommunity, setNewCommunity] = useState({
    name: '',
    description: '',
    category: '',
    tags: [],
    isPrivate: false
  });
  const [logoPreview, setLogoPreview] = useState(null);
  const [bannerPreview, setBannerPreview] = useState(null);
  const [currentTag, setCurrentTag] = useState('');
  const logoInputRef = useRef(null);
  const bannerInputRef = useRef(null);

  // Mock data for joined communities
  const joinedCommunities = [
    {
      id: 1,
      name: "Web Development",
      description: "A community for web developers to collaborate, share knowledge, and work on projects together.",
      category: "Technology",
      color: "blue",
      members: 1240,
      activeTasks: 12,
      completedTasks: 347,
      userRole: "Moderator",
      userStatus: {
        tasksCompleted: 24,
        tasksInProgress: 2,
        points: 780,
        ranking: 3,
        badges: ["Top Contributor", "Consistency Champion"]
      },
      createdAt: "June 12, 2023"
    },
    {
      id: 2,
      name: "Open Source Projects",
      description: "Connect with developers contributing to open source projects and find opportunities to collaborate.",
      category: "Technology",
      color: "green",
      members: 984,
      activeTasks: 8,
      completedTasks: 215,
      userRole: "Member",
      userStatus: {
        tasksCompleted: 12,
        tasksInProgress: 1,
        points: 320,
        ranking: 15,
        badges: ["Newcomer"]
      },
      createdAt: "July 5, 2023"
    },
    {
      id: 3,
      name: "UI/UX Design",
      description: "Share design tips, get feedback on your work, and collaborate on UI/UX challenges.",
      category: "Design",
      color: "purple",
      members: 752,
      activeTasks: 9,
      completedTasks: 183,
      userRole: "Member",
      userStatus: {
        tasksCompleted: 8,
        tasksInProgress: 0,
        points: 210,
        ranking: 22,
        badges: []
      },
      createdAt: "August 18, 2023"
    },
    {
      id: 4,
      name: "Data Science Exploration",
      description: "Explore data science techniques, machine learning models, and data visualization.",
      category: "Technology",
      color: "red",
      members: 635,
      activeTasks: 14,
      completedTasks: 129,
      userRole: "Admin",
      userStatus: {
        tasksCompleted: 18,
        tasksInProgress: 3,
        points: 490,
        ranking: 2,
        badges: ["Founder", "Data Wizard"]
      },
      createdAt: "September 3, 2023"
    }
  ];
  
  // Mock data for available communities to join
  const availableCommunities = [
    {
      id: 5,
      name: "Mobile App Development",
      description: "Learn and share mobile app development across iOS, Android, and cross-platform frameworks.",
      category: "Technology",
      color: "orange",
      members: 890,
      activeTasks: 16,
      completedTasks: 205,
      trending: true,
      createdAt: "May 15, 2023"
    },
    {
      id: 6,
      name: "DevOps Practices",
      description: "Share experiences with CI/CD pipelines, containerization, and cloud infrastructure.",
      category: "Technology",
      color: "teal",
      members: 620,
      activeTasks: 7,
      completedTasks: 112,
      trending: false,
      createdAt: "July 22, 2023"
    },
    {
      id: 7,
      name: "Game Development",
      description: "Connect with game developers, share assets, and collaborate on game projects.",
      category: "Technology",
      color: "indigo",
      members: 1150,
      activeTasks: 22,
      completedTasks: 298,
      trending: true,
      createdAt: "April 8, 2023"
    },
    {
      id: 8,
      name: "Technical Writing",
      description: "Improve documentation skills, collaborate on tutorials, and share technical writing tips.",
      category: "Writing",
      color: "gray",
      members: 415,
      activeTasks: 5,
      completedTasks: 87,
      trending: false,
      createdAt: "August 30, 2023"
    },
    {
      id: 9,
      name: "Cybersecurity",
      description: "Discuss security best practices, vulnerabilities, and collaborate on security projects.",
      category: "Technology",
      color: "blue",
      members: 760,
      activeTasks: 11,
      completedTasks: 154,
      trending: true,
      createdAt: "June 5, 2023"
    },
    {
      id: 10,
      name: "Product Management",
      description: "Connect with product managers, share experiences, and collaborate on product strategy.",
      category: "Business",
      color: "purple",
      members: 530,
      activeTasks: 8,
      completedTasks: 103,
      trending: false,
      createdAt: "September 12, 2023"
    }
  ];
  
  // Filter communities based on search and category filter
  const filteredJoinedCommunities = joinedCommunities.filter(community => {
    const matchesSearch = !searchQuery || 
      community.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      community.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = communityFilter === 'all' || community.category === communityFilter;
    
    return matchesSearch && matchesFilter;
  });
  
  const filteredAvailableCommunities = availableCommunities.filter(community => {
    const matchesSearch = !searchQuery || 
      community.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      community.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = communityFilter === 'all' || community.category === communityFilter;
    
    return matchesSearch && matchesFilter;
  });
  
  // Get all unique categories for filter dropdown
  const allCategories = [...new Set([
    ...joinedCommunities.map(c => c.category),
    ...availableCommunities.map(c => c.category)
  ])];
  
  // Utility function to get color classes based on community color
  const getCommunityColorClasses = (color) => {
    switch(color) {
      case 'blue': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'green': return 'bg-green-100 text-green-800 border-green-200';
      case 'purple': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'red': return 'bg-red-100 text-red-800 border-red-200';
      case 'orange': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'teal': return 'bg-teal-100 text-teal-800 border-teal-200';
      case 'indigo': return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      case 'gray': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };
  
  // Utility function to get role icon
  const getRoleIcon = (role) => {
    switch(role) {
      case 'Admin': return <FaCrown className="text-yellow-500" title="Admin" />;
      case 'Moderator': return <FaUserCog className="text-blue-500" title="Moderator" />;
      case 'Member': return <FaUserCheck className="text-green-500" title="Member" />;
      default: return <FaUserCheck className="text-gray-500" title="Member" />;
    }
  };
  
  // Join confirmation modal
  const ConfirmJoinModal = () => {
    if (!selectedCommunity) return null;
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Join Community</h2>
            <p className="text-gray-600 mb-6">
              You're about to join the <span className="font-medium text-gray-800">{selectedCommunity.name}</span> community. 
              As a member, you'll be able to take on tasks, participate in discussions, and collaborate with other members.
            </p>
            
            <div className={`${getCommunityColorClasses(selectedCommunity.color)} border p-4 rounded-lg mb-6`}>
              <h3 className="font-medium text-gray-800 mb-1">{selectedCommunity.name}</h3>
              <p className="text-sm mb-2">{selectedCommunity.description}</p>
              <div className="flex items-center text-sm">
                <span className="flex items-center mr-3">
                  <FaUsers className="mr-1" size={14} />
                  {selectedCommunity.members} members
                </span>
                <span className="flex items-center">
                  <FaTasks className="mr-1" size={14} />
                  {selectedCommunity.activeTasks} active tasks
                </span>
              </div>
            </div>
            
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowConfirmJoin(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // In a real app, this would call an API to join the community
                  alert(`You've joined the ${selectedCommunity.name} community!`);
                  setShowConfirmJoin(false);
                  setSelectedCommunity(null);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
              >
                Join Community
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Create community modal
  const CreateCommunityModal = () => {
    const handleInputChange = (e) => {
      const { name, value, type, checked } = e.target;
      setNewCommunity({
        ...newCommunity,
        [name]: type === 'checkbox' ? checked : value
      });
    };

    const handleLogoChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setLogoPreview(reader.result);
        };
        reader.readAsDataURL(file);
      }
    };

    const handleBannerChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setBannerPreview(reader.result);
        };
        reader.readAsDataURL(file);
      }
    };

    const handleAddTag = () => {
      if (currentTag.trim() && !newCommunity.tags.includes(currentTag.trim())) {
        setNewCommunity({
          ...newCommunity,
          tags: [...newCommunity.tags, currentTag.trim()]
        });
        setCurrentTag('');
      }
    };

    const handleRemoveTag = (tagToRemove) => {
      setNewCommunity({
        ...newCommunity,
        tags: newCommunity.tags.filter(tag => tag !== tagToRemove)
      });
    };

    const handleCreateCommunity = (e) => {
      e.preventDefault();
      
      // Validate form
      if (!newCommunity.name || !newCommunity.description || !newCommunity.category) {
        alert('Please fill in all required fields');
        return;
      }
      
      if (!logoPreview) {
        alert('Please upload a community logo');
        return;
      }
      
      // Here you would typically send the data to your backend API
      console.log("Creating new community:", {
        ...newCommunity,
        logo: logoPreview,
        banner: bannerPreview
      });
      
      // Show success message
      alert(`Community "${newCommunity.name}" created successfully!`);
      
      // Reset form and close modal
      setNewCommunity({
        name: '',
        description: '',
        category: '',
        tags: [],
        isPrivate: false
      });
      setLogoPreview(null);
      setBannerPreview(null);
      setShowCreateModal(false);
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-white z-10 px-6 py-4 border-b flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-800">Create New Community</h2>
            <button 
              onClick={() => setShowCreateModal(false)}
              className="text-gray-500 hover:text-gray-700 transition"
            >
              <FaTimes size={20} />
            </button>
          </div>
          
          <form onSubmit={handleCreateCommunity} className="p-6">
            <div className="space-y-6">
              {/* Banner Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Community Banner
                </label>
                <div 
                  className="relative h-40 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex justify-center items-center cursor-pointer overflow-hidden"
                  onClick={() => bannerInputRef.current.click()}
                >
                  {bannerPreview ? (
                    <>
                      <img 
                        src={bannerPreview} 
                        alt="Community banner preview" 
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center hover:bg-opacity-40 transition">
                        <div className="bg-white p-2 rounded-full">
                          <FaCamera className="text-gray-700" />
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="text-center">
                      <FaImage className="mx-auto h-10 w-10 text-gray-400" />
                      <p className="mt-2 text-sm text-gray-500">
                        Click to upload a banner image
                      </p>
                      <p className="text-xs text-gray-400">
                        Recommended size: 1200×300 px
                      </p>
                    </div>
                  )}
                  <input
                    ref={bannerInputRef}
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleBannerChange}
                  />
                </div>
              </div>
              
              {/* Logo Upload */}
              <div className="sm:flex sm:items-start gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Community Logo <span className="text-red-500">*</span>
                  </label>
                  <div 
                    className="relative w-28 h-28 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex justify-center items-center cursor-pointer overflow-hidden"
                    onClick={() => logoInputRef.current.click()}
                  >
                    {logoPreview ? (
                      <>
                        <img 
                          src={logoPreview} 
                          alt="Community logo preview" 
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center hover:bg-opacity-40 transition">
                          <div className="bg-white p-1.5 rounded-full">
                            <FaCamera className="text-gray-700 text-sm" />
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="text-center">
                        <FaCamera className="mx-auto h-6 w-6 text-gray-400" />
                        <p className="mt-1 text-xs text-gray-500">
                          Upload logo
                        </p>
                      </div>
                    )}
                    <input
                      ref={logoInputRef}
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleLogoChange}
                    />
                  </div>
                </div>
                
                <div className="mt-4 sm:mt-0 flex-1">
                  {/* Community Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Community Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={newCommunity.name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., Web Development, Data Science"
                      required
                    />
                  </div>
                  
                  {/* Category */}
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="category"
                      value={newCommunity.category}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">Select a category</option>
                      <option value="Development">Development</option>
                      <option value="Design">Design</option>
                      <option value="Data">Data Science & AI</option>
                      <option value="Mobile">Mobile Development</option>
                      <option value="DevOps">DevOps & Cloud</option>
                      <option value="Security">Security</option>
                      <option value="Content">Content Creation</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
              </div>
              
              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="description"
                  value={newCommunity.description}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  placeholder="Describe what your community is about and what members can expect..."
                  required
                ></textarea>
                <p className="mt-1 text-xs text-gray-500">
                  {newCommunity.description.length}/500 characters
                </p>
              </div>
              
              {/* Tags */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tags
                </label>
                <div className="flex">
                  <input
                    type="text"
                    value={currentTag}
                    onChange={(e) => setCurrentTag(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., JavaScript, Design, API"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddTag();
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={handleAddTag}
                    className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 transition"
                  >
                    Add
                  </button>
                </div>
                
                {newCommunity.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {newCommunity.tags.map((tag, index) => (
                      <span 
                        key={index}
                        className="bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full flex items-center"
                      >
                        <FaTag className="mr-1 text-gray-500" size={10} />
                        {tag}
                        <button
                          type="button"
                          onClick={() => handleRemoveTag(tag)}
                          className="ml-1 text-gray-500 hover:text-gray-700"
                        >
                          <FaTimes size={12} />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
                <p className="mt-1 text-xs text-gray-500">
                  Add up to 5 tags to help people find your community
                </p>
              </div>
              
              {/* Privacy Setting */}
              <div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isPrivate"
                    name="isPrivate"
                    checked={newCommunity.isPrivate}
                    onChange={handleInputChange}
                    className="h-4 w-4 border-gray-300 rounded text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="isPrivate" className="ml-2 block text-sm text-gray-700">
                    Make this community private
                  </label>
                </div>
                <p className="mt-1 text-xs text-gray-500 ml-6">
                  Private communities require approval to join and aren't visible in the community directory
                </p>
              </div>
              
              {/* Submit Buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                >
                  Create Community
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button 
                className="text-blue-600 flex items-center gap-1 hover:text-blue-800 transition mr-4"
                onClick={() => onNavigate('feed')}
              >
                <FaArrowLeft className="h-5 w-5" />
                <span className="hidden sm:inline">Back</span>
              </button>
              
              <h1 className="text-xl font-bold text-gray-800 flex items-center">
                <FaUsers className="mr-2 text-blue-600" />
                Communities
              </h1>
            </div>
            
            <div className="flex items-center">
              <button 
                className="text-blue-600 flex items-center gap-1 hover:text-blue-800 transition"
                onClick={() => onNavigate('feed')}
              >
                <FaHome className="h-5 w-5" />
                <span className="hidden sm:inline">Home</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Search and Filter Bar */}
      <div className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="relative flex-1">
              <input
                type="text"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                placeholder="Search communities by name or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            
            <div className="flex items-center gap-3">
              <div className="relative">
                <button
                  onClick={() => setShowFilterOptions(!showFilterOptions)}
                  className="flex items-center gap-1 px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-700 text-sm hover:bg-gray-50 transition"
                >
                  <FaFilter className="text-gray-500" />
                  <span>
                    {communityFilter === 'all' ? 'All Categories' : communityFilter}
                  </span>
                </button>
                
                {showFilterOptions && (
                  <div className="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg overflow-hidden z-20 border">
                    <div className="py-1">
                      <button
                        onClick={() => {
                          setCommunityFilter('all');
                          setShowFilterOptions(false);
                        }}
                        className={`w-full text-left px-4 py-2 text-sm ${
                          communityFilter === 'all' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        All Categories
                      </button>
                      
                      {allCategories.map((category, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            setCommunityFilter(category);
                            setShowFilterOptions(false);
                          }}
                          className={`w-full text-left px-4 py-2 text-sm ${
                            communityFilter === category ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Tab Navigation */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex">
            <button
              onClick={() => setActiveTab('joined')}
              className={`px-4 py-3 font-medium text-sm relative ${
                activeTab === 'joined' 
                  ? 'text-blue-600 border-b-2 border-blue-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              My Communities
              <span className="ml-2 bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full">
                {joinedCommunities.length}
              </span>
            </button>
            <button
              onClick={() => setActiveTab('explore')}
              className={`px-4 py-3 font-medium text-sm relative ${
                activeTab === 'explore' 
                  ? 'text-blue-600 border-b-2 border-blue-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Explore
              <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">
                {availableCommunities.length}
              </span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            {activeTab === 'joined' ? 'My Communities' : 'Discover Communities'}
          </h2>
          
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-1 hover:bg-blue-700 transition shadow-sm"
          >
            <FaPlus size={14} />
            Create Community
          </button>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main Column */}
          <div className="lg:flex-1">
            {/* My Communities Tab */}
            {activeTab === 'joined' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Communities You've Joined
                </h2>
                
                {filteredJoinedCommunities.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                    {filteredJoinedCommunities.map(community => (
                      <div 
                        key={community.id} 
                        className="bg-white rounded-lg shadow-sm border hover:shadow-md transition overflow-hidden"
                        onClick={() => onNavigate('community')}
                      >
                        <div className={`px-4 py-3 flex justify-between items-center border-b ${getCommunityColorClasses(community.color)}`}>
                          <h3 className="font-medium">{community.name}</h3>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm bg-white bg-opacity-90 px-2 py-0.5 rounded-full flex items-center">
                              {getRoleIcon(community.userRole)}
                              <span className="ml-1">{community.userRole}</span>
                            </span>
                          </div>
                        </div>
                        
                        <div className="p-4">
                          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                            {community.description}
                          </p>
                          
                          <div className="grid grid-cols-2 gap-3 mb-4">
                            <div className="bg-gray-50 p-2 rounded-lg text-center">
                              <div className="font-medium text-gray-800">{community.userStatus.ranking}</div>
                              <div className="text-xs text-gray-500">Your Rank</div>
                            </div>
                            <div className="bg-gray-50 p-2 rounded-lg text-center">
                              <div className="font-medium text-gray-800">{community.userStatus.points}</div>
                              <div className="text-xs text-gray-500">Points Earned</div>
                            </div>
                          </div>
                          
                          <div className="flex flex-wrap gap-2 mb-4">
                            {community.userStatus.badges.map((badge, index) => (
                              <span 
                                key={index} 
                                className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                                  index === 0 ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                                }`}
                              >
                                <FaStar className="mr-1" size={10} /> {badge}
                              </span>
                            ))}
                          </div>
                          
                          <div className="flex justify-between text-sm text-gray-500">
                            <div className="flex items-center">
                              <FaUsers className="mr-1" size={14} />
                              <span>{community.members} members</span>
                            </div>
                            
                            <div className="flex items-center">
                              <FaTasks className="mr-1" size={14} />
                              <span>{community.activeTasks} active tasks</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-gray-50 px-4 py-3 border-t flex justify-between items-center">
                          <span className="text-xs text-gray-500">Joined {community.createdAt}</span>
                          <button 
                            className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
                            onClick={(e) => {
                              e.stopPropagation();
                              onNavigate('community');
                            }}
                          >
                            View Community <FaChevronRight className="ml-1" size={12} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
                    <FaUsers className="text-gray-400 text-4xl mx-auto mb-3" />
                    <h3 className="text-lg font-medium text-gray-800 mb-1">No communities found</h3>
                    <p className="text-gray-500">
                      {searchQuery 
                        ? "There are no communities matching your search criteria." 
                        : "You haven't joined any communities yet."}
                    </p>
                    <button 
                      onClick={() => {
                        setActiveTab('explore');
                        setSearchQuery('');
                        setCommunityFilter('all');
                      }}
                      className="mt-4 text-blue-600 hover:text-blue-800 transition"
                    >
                      Explore communities to join
                    </button>
                  </div>
                )}
              </div>
            )}
            
            {/* Explore Tab */}
            {activeTab === 'explore' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Discover New Communities
                </h2>
                
                {filteredAvailableCommunities.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                    {filteredAvailableCommunities.map(community => (
                      <div 
                        key={community.id} 
                        className="bg-white rounded-lg shadow-sm border hover:shadow-md transition overflow-hidden"
                      >
                        <div className={`px-4 py-3 flex justify-between items-center border-b ${getCommunityColorClasses(community.color)}`}>
                          <h3 className="font-medium">{community.name}</h3>
                          {community.trending && (
                            <span className="bg-red-100 text-red-800 text-xs px-2 py-0.5 rounded-full flex items-center">
                              <BsLightningChargeFill className="mr-1" /> Trending
                            </span>
                          )}
                        </div>
                        
                        <div className="p-4">
                          <p className="text-gray-600 text-sm mb-4">
                            {community.description}
                          </p>
                          
                          <div className="flex justify-between text-sm text-gray-500 mb-4">
                            <div className="flex items-center">
                              <FaUsers className="mr-1" size={14} />
                              <span>{community.members} members</span>
                            </div>
                            
                            <div className="flex items-center">
                              <BsCheckCircleFill className="mr-1 text-green-500" size={14} />
                              <span>{community.completedTasks} tasks completed</span>
                            </div>
                          </div>
                          
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-gray-500">Created {community.createdAt}</span>
                            <button 
                              className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-1 rounded transition"
                              onClick={() => {
                                setSelectedCommunity(community);
                                setShowConfirmJoin(true);
                              }}
                            >
                              <FaPlus className="inline mr-1" size={10} /> Join Community
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
                    <FaGlobe className="text-gray-400 text-4xl mx-auto mb-3" />
                    <h3 className="text-lg font-medium text-gray-800 mb-1">No communities found</h3>
                    <p className="text-gray-500">
                      There are no communities matching your search criteria.
                    </p>
                    <button 
                      onClick={() => {
                        setSearchQuery('');
                        setCommunityFilter('all');
                      }}
                      className="mt-4 text-blue-600 hover:text-blue-800 transition"
                    >
                      Reset filters
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
          
          {/* Sidebar */}
          <div className="w-full lg:w-80 order-first lg:order-last">
            <div className="sticky top-[130px] space-y-6">
              {/* Community Activity Card */}
              <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
                <div className="bg-blue-600 px-4 py-4 text-white">
                  <h3 className="font-medium text-lg">Your Community Activity</h3>
                  <p className="text-blue-100 text-sm">Summary of your participation</p>
                </div>
                <div className="p-4">
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-blue-50 p-3 rounded-lg text-center">
                      <div className="text-2xl font-bold text-blue-700">{joinedCommunities.length}</div>
                      <div className="text-xs text-blue-600">Communities Joined</div>
                    </div>
                    <div className="bg-green-50 p-3 rounded-lg text-center">
                      <div className="text-2xl font-bold text-green-700">
                        {joinedCommunities.reduce((sum, community) => sum + community.userStatus.tasksCompleted, 0)}
                      </div>
                      <div className="text-xs text-green-600">Tasks Completed</div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-3 mb-4">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-gray-700">Total Points</span>
                      <span className="text-sm font-medium text-blue-600">
                        {joinedCommunities.reduce((sum, community) => sum + community.userStatus.points, 0)}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '65%' }}></div>
                    </div>
                    <div className="text-xs text-gray-500">
                      235 points until next level
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">In-progress tasks:</span>
                    <span className="font-medium text-blue-600">
                      {joinedCommunities.reduce((sum, community) => sum + community.userStatus.tasksInProgress, 0)}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Trending Communities */}
              {activeTab === 'joined' && (
                <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
                  <div className="px-4 py-3 border-b">
                    <h3 className="font-medium text-gray-800">Trending Communities</h3>
                  </div>
                  <div className="p-4">
                    <div className="space-y-3">
                      {availableCommunities
                        .filter(community => community.trending)
                        .slice(0, 3)
                        .map(community => (
                          <div key={community.id} className="border-b pb-3 last:border-0 last:pb-0">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-medium text-gray-800 text-sm">{community.name}</h4>
                                <p className="text-xs text-gray-500 mt-1">
                                  <span className="inline-flex items-center mr-2">
                                    <FaUsers className="mr-1" size={10} />
                                    {community.members}
                                  </span>
                                  <span className="inline-flex items-center">
                                    <FaTasks className="mr-1" size={10} />
                                    {community.activeTasks} tasks
                                  </span>
                                </p>
                              </div>
                              <button 
                                className="text-xs bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700 transition"
                                onClick={() => {
                                  setSelectedCommunity(community);
                                  setShowConfirmJoin(true);
                                }}
                              >
                                Join
                              </button>
                            </div>
                          </div>
                        ))}
                    </div>
                    <button 
                      className="mt-3 w-full py-2 bg-gray-50 text-gray-600 rounded-md text-sm font-medium hover:bg-gray-100 transition"
                      onClick={() => setActiveTab('explore')}
                    >
                      Explore All Communities
                    </button>
                  </div>
                </div>
              )}
              
              {/* Category Filter */}
              {activeTab === 'explore' && (
                <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
                  <div className="px-4 py-3 border-b">
                    <h3 className="font-medium text-gray-800">Filter by Category</h3>
                  </div>
                  <div className="p-4">
                    <div className="space-y-2">
                      <button
                        onClick={() => setCommunityFilter('all')}
                        className={`w-full text-left px-3 py-2 rounded-md text-sm ${
                          communityFilter === 'all' 
                            ? 'bg-blue-50 text-blue-700 font-medium' 
                            : 'hover:bg-gray-50 text-gray-700'
                        }`}
                      >
                        All Categories
                      </button>
                      
                      {allCategories.map((category, index) => (
                        <button
                          key={index}
                          onClick={() => setCommunityFilter(category)}
                          className={`w-full text-left px-3 py-2 rounded-md text-sm ${
                            communityFilter === category 
                              ? 'bg-blue-50 text-blue-700 font-medium' 
                              : 'hover:bg-gray-50 text-gray-700'
                          }`}
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              
              {/* Community Stats */}
              <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
                <div className="px-4 py-3 border-b">
                  <h3 className="font-medium text-gray-800">Community Stats</h3>
                </div>
                <div className="p-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Total Communities:</span>
                      <span className="text-sm font-medium text-gray-800">
                        {joinedCommunities.length + availableCommunities.length}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Most Active:</span>
                      <span className="text-sm font-medium text-gray-800">
                        Web Development
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Newest Community:</span>
                      <span className="text-sm font-medium text-gray-800">
                        Product Management
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Total Members:</span>
                      <span className="text-sm font-medium text-gray-800">
                        {availableCommunities.reduce((sum, community) => sum + community.members, 0) + 
                          joinedCommunities.reduce((sum, community) => sum + community.members, 0)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Join confirmation modal */}
      {showConfirmJoin && <ConfirmJoinModal />}
      
      {/* Create community modal */}
      {showCreateModal && <CreateCommunityModal />}
      
      {/* Bottom navigation */}
      <div className="fixed bottom-4 right-4 bg-white rounded-full shadow-lg p-2 flex gap-2">
        <button 
          onClick={() => onNavigate('feed')}
          className="p-2 rounded-full text-gray-500"
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
          className="p-2 rounded-full bg-blue-100 text-blue-600"
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

export default CommunityExplorerPage;