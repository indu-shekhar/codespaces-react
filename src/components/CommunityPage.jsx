import React, { useState } from 'react';
import { 
  FaUsers, FaTasks, FaTrophy, FaBullhorn, 
  FaPlus, FaFilter, FaStar, FaClock, FaChartLine,
  FaCheck, FaTimesCircle, FaEye, FaComment, FaClipboardCheck
} from 'react-icons/fa';
import { BsCheckCircleFill, BsFlagFill, BsCalendarCheck, BsHourglassSplit } from 'react-icons/bs';
import { AiFillFire } from 'react-icons/ai';
import TaskDetailsModal from './TaskDetailsModal';

// Add this function before the CommunityPage component or inside it
const getUrgencyColor = (urgency) => {
  switch (urgency) {
    case 'High':
      return 'text-red-600 bg-red-100';
    case 'Medium':
      return 'text-orange-600 bg-orange-100';
    case 'Low':
      return 'text-green-600 bg-green-100';
    default:
      return 'text-gray-600 bg-gray-100';
  }
};

const getDifficultyColor = (difficulty) => {
  switch (difficulty) {
    case 'Hard':
      return 'text-purple-600 bg-purple-100';
    case 'Medium':
      return 'text-blue-600 bg-blue-100';
    case 'Easy':
      return 'text-green-600 bg-green-100';
    default:
      return 'text-gray-600 bg-gray-100';
  }
};

const getStatusColor = (status) => {
  switch (status) {
    case 'Open':
      return 'text-blue-600 bg-blue-100';
    case 'In Progress':
      return 'text-yellow-600 bg-yellow-100';
    case 'Completed':
      return 'text-green-600 bg-green-100';
    default:
      return 'text-gray-600 bg-gray-100';
  }
};

function CommunityPage() {
  const [activeTab, setActiveTab] = useState('tasks');
  const [createTaskModal, setCreateTaskModal] = useState(false);
  const [taskFilter, setTaskFilter] = useState('all');
  const [selectedTask, setSelectedTask] = useState(null);
  const [submissionsFilter, setSubmissionsFilter] = useState('pending');
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [verificationFeedback, setVerificationFeedback] = useState('');
  const [showSubmissionModal, setShowSubmissionModal] = useState(false);
  
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

  // Mock submissions data
  const submissionsData = [
    {
      id: 1,
      taskId: 1,
      taskTitle: "Implement Responsive Navigation Component",
      submittedBy: {
        id: 101,
        name: "Alex Johnson",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
        role: "Member"
      },
      submittedAt: "2023-06-28T14:30:00Z",
      status: "pending", // pending, approved, rejected
      description: "I've implemented the navigation component with full responsiveness across all device sizes. The hamburger menu appears at 768px as required. I've also added smooth transitions for the menu opening and closing.",
      files: [
        { name: "NavComponent.jsx", url: "#", size: "4.2 KB" },
        { name: "NavStyles.css", url: "#", size: "2.8 KB" }
      ],
      links: [
        { title: "GitHub Repository", url: "https://github.com/alexj/nav-component" },
        { title: "Live Demo", url: "https://alexj-nav-demo.netlify.app" }
      ],
      feedback: null
    },
    {
      id: 2,
      taskId: 2,
      taskTitle: "Optimize API Response Time",
      submittedBy: {
        id: 102,
        name: "Emma Wilson",
        avatar: "https://randomuser.me/api/portraits/women/45.jpg",
        role: "Member"
      },
      submittedAt: "2023-06-27T09:15:00Z",
      status: "approved",
      description: "I've optimized the API response time by implementing caching and query optimization. The response time has been reduced by 42% on average. All test cases are passing with the improved performance.",
      files: [
        { name: "ApiService.js", url: "#", size: "6.5 KB" },
        { name: "PerformanceTests.js", url: "#", size: "3.1 KB" }
      ],
      links: [
        { title: "Pull Request", url: "https://github.com/project/pr/123" }
      ],
      feedback: {
        verifiedBy: {
          id: 201,
          name: "Sarah Chen",
          avatar: "https://randomuser.me/api/portraits/women/44.jpg",
          role: "Admin"
        },
        verifiedAt: "2023-06-28T11:20:00Z",
        comment: "Excellent work! The performance improvement is impressive and the code is well-organized.",
        points: 50
      }
    },
    {
      id: 3,
      taskId: 4,
      taskTitle: "Design System Documentation",
      submittedBy: {
        id: 103,
        name: "Miguel Santos",
        avatar: "https://randomuser.me/api/portraits/men/57.jpg",
        role: "Member"
      },
      submittedAt: "2023-06-26T16:45:00Z",
      status: "rejected",
      description: "I've created comprehensive documentation for our design system components with detailed usage examples for each component.",
      files: [
        { name: "DesignSystemDocs.pdf", url: "#", size: "2.1 MB" }
      ],
      links: [
        { title: "Figma Design", url: "https://figma.com/file/design-system-docs" }
      ],
      feedback: {
        verifiedBy: {
          id: 202,
          name: "Alex Johnson",
          avatar: "https://randomuser.me/api/portraits/men/32.jpg",
          role: "Moderator"
        },
        verifiedAt: "2023-06-27T10:05:00Z",
        comment: "The documentation is missing examples for the mobile components. Please add those sections and resubmit.",
        points: 0
      }
    },
    {
      id: 4,
      taskId: 3,
      taskTitle: "Create End-to-End Tests",
      submittedBy: {
        id: 104,
        name: "Priya Sharma",
        avatar: "https://randomuser.me/api/portraits/women/67.jpg",
        role: "Member"
      },
      submittedAt: "2023-06-29T11:20:00Z",
      status: "pending",
      description: "I've created E2E tests for the authentication flow using Cypress. All test cases are passing and I've documented the test scenarios.",
      files: [
        { name: "auth.spec.js", url: "#", size: "8.3 KB" },
        { name: "test-scenarios.md", url: "#", size: "4.7 KB" }
      ],
      links: [
        { title: "Test recordings", url: "https://cypress.io/recordings/auth-tests" }
      ],
      feedback: null
    }
  ];

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

  // Filter submissions based on selected filter
  const filteredSubmissions = submissionsData.filter(submission => {
    if (submissionsFilter === 'all') return true;
    return submission.status === submissionsFilter;
  });

  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Get status badge for submissions
  const getSubmissionStatusBadge = (status) => {
    switch(status) {
      case 'pending':
        return <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded flex items-center">
          <BsHourglassSplit className="mr-1" /> Pending Review
        </span>;
      case 'approved':
        return <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded flex items-center">
          <FaCheck className="mr-1" /> Approved
        </span>;
      case 'rejected':
        return <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded flex items-center">
          <FaTimesCircle className="mr-1" /> Needs Revision
        </span>;
      default:
        return null;
    }
  };

  // Handle verify submission
  const handleVerifySubmission = (isApproved) => {
    const updatedSubmissions = submissionsData.map(submission => {
      if (submission.id === selectedSubmission.id) {
        return {
          ...submission,
          status: isApproved ? 'approved' : 'rejected',
          feedback: {
            verifiedBy: {
              id: 201,
              name: "Alex Johnson",
              avatar: "https://randomuser.me/api/portraits/men/32.jpg",
              role: "Moderator"
            },
            verifiedAt: new Date().toISOString(),
            comment: verificationFeedback,
            points: isApproved ? selectedSubmission.taskId === 1 ? 30 : 
                              selectedSubmission.taskId === 2 ? 50 : 
                              selectedSubmission.taskId === 3 ? 25 : 15 : 0
          }
        };
      }
      return submission;
    });

    console.log("Updated submissions:", updatedSubmissions);
    alert(`Submission ${isApproved ? 'approved' : 'rejected'} successfully!`);
    setShowSubmissionModal(false);
    setSelectedSubmission(null);
    setVerificationFeedback('');
  };

  // Submission Detail Modal Component
  const SubmissionDetailModal = () => {
    if (!selectedSubmission) return null;
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto p-4">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-6 py-4 flex justify-between items-center">
            <h2 className="text-xl font-bold">Submission Review</h2>
            <button 
              onClick={() => setShowSubmissionModal(false)}
              className="text-white hover:text-gray-200"
            >
              <FaTimesCircle size={20} />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            <div className="p-6">
              <div className="mb-6 bg-blue-50 p-4 rounded-lg border border-blue-200">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg font-semibold text-gray-800">{selectedSubmission.taskTitle}</h3>
                  {getSubmissionStatusBadge(selectedSubmission.status)}
                </div>
                
                <div className="flex items-center mb-4">
                  <img 
                    src={selectedSubmission.submittedBy.avatar} 
                    alt={selectedSubmission.submittedBy.name} 
                    className="w-8 h-8 rounded-full mr-2" 
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-800">{selectedSubmission.submittedBy.name}</p>
                    <p className="text-xs text-gray-500">Submitted on {formatDate(selectedSubmission.submittedAt)}</p>
                  </div>
                </div>
                
                <div className="text-sm text-gray-700">
                  <p className="font-medium mb-1">Submission Description:</p>
                  <p>{selectedSubmission.description}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-white border rounded-lg overflow-hidden">
                  <div className="px-4 py-3 border-b bg-gray-50">
                    <h4 className="font-medium text-gray-700">Attached Files</h4>
                  </div>
                  <div className="p-4">
                    {selectedSubmission.files.length > 0 ? (
                      <ul className="space-y-2">
                        {selectedSubmission.files.map((file, index) => (
                          <li key={index} className="flex items-center justify-between">
                            <div className="flex items-center">
                              <svg className="w-4 h-4 text-gray-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                              </svg>
                              <span className="text-sm text-blue-600 hover:underline">
                                <a href={file.url} target="_blank" rel="noopener noreferrer">{file.name}</a>
                              </span>
                            </div>
                            <span className="text-xs text-gray-500">{file.size}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-gray-500">No files attached</p>
                    )}
                  </div>
                </div>
                
                <div className="bg-white border rounded-lg overflow-hidden">
                  <div className="px-4 py-3 border-b bg-gray-50">
                    <h4 className="font-medium text-gray-700">External Links</h4>
                  </div>
                  <div className="p-4">
                    {selectedSubmission.links.length > 0 ? (
                      <ul className="space-y-2">
                        {selectedSubmission.links.map((link, index) => (
                          <li key={index} className="flex items-center">
                            <svg className="w-4 h-4 text-gray-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
                            </svg>
                            <a 
                              href={link.url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-sm text-blue-600 hover:underline"
                            >
                              {link.title}
                            </a>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-gray-500">No links provided</p>
                    )}
                  </div>
                </div>
              </div>
              
              {selectedSubmission.feedback && (
                <div className="bg-gray-50 border rounded-lg p-4 mb-6">
                  <h4 className="font-medium text-gray-800 mb-2 flex items-center">
                    <FaComment className="mr-2 text-gray-500" />
                    Feedback
                  </h4>
                  <div className="flex items-start mb-3">
                    <img 
                      src={selectedSubmission.feedback.verifiedBy.avatar} 
                      alt={selectedSubmission.feedback.verifiedBy.name} 
                      className="w-6 h-6 rounded-full mr-2 mt-1" 
                    />
                    <div>
                      <div className="flex items-center">
                        <p className="text-sm font-medium text-gray-800 mr-2">{selectedSubmission.feedback.verifiedBy.name}</p>
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                          {selectedSubmission.feedback.verifiedBy.role}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mb-2">
                        {formatDate(selectedSubmission.feedback.verifiedAt)}
                      </p>
                      <p className="text-sm text-gray-700">
                        {selectedSubmission.feedback.comment}
                      </p>
                      {selectedSubmission.feedback.points > 0 && (
                        <div className="mt-2 inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                          +{selectedSubmission.feedback.points} points awarded
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
              
              {(communityData.userRole === "Moderator" || communityData.userRole === "Admin") && 
               selectedSubmission.status === "pending" && (
                <div className="bg-white border rounded-lg p-4">
                  <h4 className="font-medium text-gray-800 mb-3 flex items-center">
                    <FaClipboardCheck className="mr-2 text-gray-500" />
                    Verify Submission
                  </h4>
                  
                  <div className="mb-4">
                    <label htmlFor="feedback" className="block text-sm font-medium text-gray-700 mb-1">
                      Feedback
                    </label>
                    <textarea
                      id="feedback"
                      rows="4"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                      placeholder="Provide feedback on this submission..."
                      value={verificationFeedback}
                      onChange={(e) => setVerificationFeedback(e.target.value)}
                    ></textarea>
                  </div>
                  
                  <div className="flex justify-end gap-3">
                    <button
                      onClick={() => handleVerifySubmission(false)}
                      className="px-4 py-2 border border-red-300 text-red-700 rounded-md hover:bg-red-50 transition flex items-center"
                    >
                      <FaTimesCircle className="mr-2" />
                      Request Revisions
                    </button>
                    <button
                      onClick={() => handleVerifySubmission(true)}
                      className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition flex items-center"
                      disabled={!verificationFeedback.trim()}
                    >
                      <FaCheck className="mr-2" />
                      Approve Submission
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen">
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
          
          <div className="mt-8 border-b border-blue-500 flex overflow-x-auto no-scrollbar">
            <button
              onClick={() => setActiveTab('tasks')}
              className={`px-4 py-2 font-medium text-sm border-b-2 whitespace-nowrap ${activeTab === 'tasks' ? 'border-white text-white' : 'border-transparent text-blue-200 hover:text-white'}`}
            >
              <FaTasks className="inline mr-2" />
              Active Tasks
            </button>
            <button
              onClick={() => setActiveTab('submissions')}
              className={`px-4 py-2 font-medium text-sm border-b-2 whitespace-nowrap ${activeTab === 'submissions' ? 'border-white text-white' : 'border-transparent text-blue-200 hover:text-white'}`}
            >
              <FaClipboardCheck className="inline mr-2" />
              Submissions
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
      
      <div className="container mx-auto px-4 py-6">
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
        
        {activeTab === 'submissions' && (
          <div>
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
              <h2 className="text-xl font-semibold text-gray-800">
                Task Submissions
              </h2>
              
              <div className="flex items-center bg-white rounded-lg shadow-sm border p-2">
                <FaFilter className="text-gray-400 mr-2" />
                <select 
                  className="bg-transparent border-none text-sm focus:ring-0 w-full"
                  value={submissionsFilter}
                  onChange={(e) => setSubmissionsFilter(e.target.value)}
                >
                  <option value="all">All Submissions</option>
                  <option value="pending">Pending Review</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Needs Revision</option>
                </select>
              </div>
            </div>
            
            {filteredSubmissions.length > 0 ? (
              <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Task
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Submitted By
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredSubmissions.map((submission) => (
                        <tr key={submission.id} 
                            className={submission.status === 'pending' ? 'bg-yellow-50' : 
                                     submission.status === 'approved' ? 'bg-green-50' :
                                     submission.status === 'rejected' ? 'bg-red-50' : ''}
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{submission.taskTitle}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-8 w-8">
                                <img 
                                  src={submission.submittedBy.avatar} 
                                  alt={submission.submittedBy.name}
                                  className="h-8 w-8 rounded-full" 
                                />
                              </div>
                              <div className="ml-3">
                                <div className="text-sm font-medium text-gray-900">{submission.submittedBy.name}</div>
                                <div className="text-xs text-gray-500">{submission.submittedBy.role}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">{formatDate(submission.submittedAt)}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {getSubmissionStatusBadge(submission.status)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <button 
                              onClick={() => {
                                setSelectedSubmission(submission);
                                setShowSubmissionModal(true);
                              }}
                              className="text-blue-600 hover:text-blue-900 text-sm font-medium flex items-center"
                            >
                              <FaEye className="mr-1" />
                              View Details
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
                <FaClipboardCheck className="text-gray-400 text-4xl mx-auto mb-3" />
                <h3 className="text-lg font-medium text-gray-800 mb-1">No submissions found</h3>
                <p className="text-gray-500">There are no task submissions matching your current filter.</p>
                <button 
                  onClick={() => setSubmissionsFilter('all')}
                  className="mt-4 text-blue-600 hover:text-blue-800 transition"
                >
                  View all submissions
                </button>
              </div>
            )}
          </div>
        )}
        
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
        
        {activeTab === 'announcements' && (
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              Community Announcements
            </h2>
            
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
              
              {(communityData.userRole === "Moderator" || communityData.userRole === "Admin") && (
                <div className="mt-4 flex justify-end">
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 hover:bg-blue-700 transition shadow-sm">
                    <FaBullhorn size={14} />
                    New Announcement
                  </button>
                </div>
              )}
              
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
      
      {createTaskModal && <CreateTaskModal />}
      {selectedTask && (
        <TaskDetailsModal 
          task={selectedTask} 
          onClose={() => setSelectedTask(null)} 
          userRole={communityData.userRole}
        />
      )}
      {showSubmissionModal && <SubmissionDetailModal />}
      
      <div className="fixed bottom-4 right-4 bg-white rounded-full shadow-lg p-2 flex gap-2">
        <button 
          onClick={() => onNavigate('feed')}
          className="p-2 rounded-full text-gray-500"
          title="Home"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7m-7-7v14" />
          </svg>
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

export default CommunityPage;