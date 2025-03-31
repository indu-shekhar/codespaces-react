import React, { useState } from 'react';
import { 
  FaTimes, FaPaperclip, FaCommentAlt, FaCheck, FaClock, 
  FaExclamationTriangle, FaStar, FaTag, FaUser, FaCalendarAlt,
  FaFileUpload, FaImages, FaCode, FaLink, FaPaperPlane
} from 'react-icons/fa';
import { BsCheckCircleFill, BsClockFill, BsExclamationTriangle } from 'react-icons/bs';

function TaskDetailsModal({ task, onClose, userRole }) {
  const [activeTab, setActiveTab] = useState('details');
  const [comment, setComment] = useState('');
  const [privateMessage, setPrivateMessage] = useState('');
  const [submissionText, setSubmissionText] = useState('');
  const [submissionFiles, setSubmissionFiles] = useState([]);
  const [submissionLink, setSubmissionLink] = useState('');
  const [submissionStatus, setSubmissionStatus] = useState(task.submissionStatus || 'not_submitted');
  
  // Mock data - in a real app, this would be fetched from an API
  const mockComments = [
    {
      id: 1,
      author: "Sarah Chen",
      authorRole: "Admin",
      authorAvatar: "https://randomuser.me/api/portraits/women/44.jpg",
      content: "Make sure to follow the design specifications exactly. The navigation should collapse on mobile screens.",
      date: "2 days ago"
    },
    {
      id: 2,
      author: "Alex Johnson",
      authorRole: "Member",
      authorAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
      content: "Is there a specific breakpoint we should use for the mobile navigation?",
      date: "1 day ago"
    },
    {
      id: 3,
      author: "Sarah Chen",
      authorRole: "Admin",
      authorAvatar: "https://randomuser.me/api/portraits/women/44.jpg",
      content: "Yes, please use 768px as the breakpoint.",
      date: "1 day ago"
    }
  ];
  
  const mockMessages = [
    {
      id: 1,
      author: "Sarah Chen",
      authorAvatar: "https://randomuser.me/api/portraits/women/44.jpg",
      content: "Hi, I'm the task creator. Let me know if you have any questions!",
      date: "3 days ago",
      isFromCreator: true
    },
    {
      id: 2,
      author: "Alex Johnson",
      authorAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
      content: "Thanks! I'll reach out if I need any clarification.",
      date: "2 days ago",
      isFromCreator: false
    }
  ];
  
  // Status badge information
  const getStatusInfo = (status) => {
    switch(status) {
      case 'not_submitted':
        return { 
          color: 'bg-gray-100 text-gray-800', 
          icon: <FaClock className="mr-1" />,
          text: 'Not Submitted'
        };
      case 'in_progress':
        return { 
          color: 'bg-blue-100 text-blue-800', 
          icon: <BsClockFill className="mr-1" />,
          text: 'In Progress'
        };
      case 'under_review':
        return { 
          color: 'bg-yellow-100 text-yellow-800', 
          icon: <FaClock className="mr-1" />,
          text: 'Under Review'
        };
      case 'approved':
        return { 
          color: 'bg-green-100 text-green-800', 
          icon: <BsCheckCircleFill className="mr-1" />,
          text: 'Approved'
        };
      case 'rejected':
        return { 
          color: 'bg-red-100 text-red-800', 
          icon: <BsExclamationTriangle className="mr-1" />,
          text: 'Rejected'
        };
      default:
        return { 
          color: 'bg-gray-100 text-gray-800',
          icon: <FaClock className="mr-1" />,
          text: 'Not Started'
        };
    }
  };

  // Difficulty colors
  const getDifficultyColor = (difficulty) => {
    switch(difficulty?.toLowerCase()) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Urgency colors
  const getUrgencyColor = (urgency) => {
    switch(urgency?.toLowerCase()) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Handle comment submission
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!comment.trim()) return;
    
    // In a real app, submit to an API
    alert(`Comment submitted: ${comment}`);
    setComment('');
  };
  
  // Handle private message submission
  const handleMessageSubmit = (e) => {
    e.preventDefault();
    if (!privateMessage.trim()) return;
    
    // In a real app, submit to an API
    alert(`Private message sent: ${privateMessage}`);
    setPrivateMessage('');
  };
  
  // Handle file selection
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSubmissionFiles([...submissionFiles, ...files]);
  };
  
  // Handle file removal
  const handleRemoveFile = (index) => {
    const newFiles = [...submissionFiles];
    newFiles.splice(index, 1);
    setSubmissionFiles(newFiles);
  };
  
  // Handle task submission
  const handleSubmitTask = (e) => {
    e.preventDefault();
    
    if (!submissionText.trim() && submissionFiles.length === 0 && !submissionLink.trim()) {
      alert("Please provide at least one form of submission (text, files, or link)");
      return;
    }
    
    // In a real app, submit to an API
    setSubmissionStatus('under_review');
    alert("Task submitted successfully! It's now under review.");
  };
  
  // Handle task resubmission
  const handleResubmit = () => {
    setSubmissionStatus('in_progress');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-bold">{task.title}</h2>
          <button 
            onClick={onClose}
            className="text-white hover:text-gray-200"
          >
            <FaTimes size={20} />
          </button>
        </div>
        
        {/* Tabs */}
        <div className="bg-gray-100 px-6 border-b">
          <div className="flex overflow-x-auto hide-scrollbar">
            <button
              onClick={() => setActiveTab('details')}
              className={`px-4 py-3 font-medium text-sm whitespace-nowrap ${activeTab === 'details' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'}`}
            >
              Task Details
            </button>
            <button
              onClick={() => setActiveTab('discussion')}
              className={`px-4 py-3 font-medium text-sm whitespace-nowrap ${activeTab === 'discussion' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'}`}
            >
              Discussion
            </button>
            <button
              onClick={() => setActiveTab('messages')}
              className={`px-4 py-3 font-medium text-sm whitespace-nowrap ${activeTab === 'messages' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'}`}
            >
              Messages
            </button>
            <button
              onClick={() => setActiveTab('submission')}
              className={`px-4 py-3 font-medium text-sm whitespace-nowrap ${activeTab === 'submission' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'}`}
            >
              Submission
            </button>
          </div>
        </div>
        
        {/* Content area - scrollable */}
        <div className="flex-1 overflow-y-auto">
          {/* Task Details Tab */}
          {activeTab === 'details' && (
            <div className="p-6">
              <div className="flex flex-wrap gap-2 mb-4">
                <span className={`${getDifficultyColor(task.difficulty)} text-xs px-2 py-1 rounded-full`}>
                  {task.difficulty}
                </span>
                <span className={`${getUrgencyColor(task.urgency)} text-xs px-2 py-1 rounded-full`}>
                  {task.urgency}
                </span>
                <span className={`${getStatusInfo(submissionStatus).color} text-xs px-2 py-1 rounded-full flex items-center`}>
                  {getStatusInfo(submissionStatus).icon} {getStatusInfo(submissionStatus).text}
                </span>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-800 mb-2">Description</h3>
                <p className="text-gray-600">{task.description}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-md font-medium text-gray-800 mb-3">Task Details</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Creator:</span>
                      <span className="text-gray-800 font-medium">{task.createdBy || 'Sarah Chen'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Created:</span>
                      <span className="text-gray-800">{task.createdDate || 'June 15, 2023'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Due in:</span>
                      <span className="text-gray-800">{task.dueDays} days</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Participants:</span>
                      <span className="text-gray-800">{task.participants}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Points Reward:</span>
                      <span className="text-yellow-600 font-medium">{task.reward} points</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-md font-medium text-gray-800 mb-3">Requirements</h3>
                  <ul className="list-disc pl-5 space-y-2 text-gray-600">
                    <li>Implement responsive design for all screen sizes</li>
                    <li>Use React and Tailwind CSS for the implementation</li>
                    <li>Ensure the navigation collapses to a hamburger menu on mobile</li>
                    <li>Follow the design specifications provided</li>
                    <li>Include smooth transitions between states</li>
                  </ul>
                  
                  <h3 className="text-md font-medium text-gray-800 mt-4 mb-3">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {task.tags?.map((tag, index) => (
                      <span key={index} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full flex items-center">
                        <FaTag className="mr-1 text-gray-500" size={10} /> {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="text-md font-medium text-blue-800 mb-2">Acceptance Criteria</h3>
                <ul className="list-disc pl-5 space-y-1 text-blue-700">
                  <li>Component must be responsive across all screen sizes</li>
                  <li>Must follow the accessibility guidelines</li>
                  <li>Code must be clean and well-documented</li>
                  <li>All tests must pass</li>
                </ul>
              </div>
            </div>
          )}
          
          {/* Discussion Tab */}
          {activeTab === 'discussion' && (
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-800 mb-4">Discussion ({mockComments.length})</h3>
              
              <div className="space-y-4 mb-6">
                {mockComments.map(comment => (
                  <div key={comment.id} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-start">
                      <img 
                        src={comment.authorAvatar} 
                        alt={comment.author} 
                        className="w-10 h-10 rounded-full mr-3"
                      />
                      <div className="flex-1">
                        <div className="flex items-center mb-1">
                          <span className="font-medium text-gray-900 mr-2">{comment.author}</span>
                          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded">
                            {comment.authorRole}
                          </span>
                          <span className="text-xs text-gray-500 ml-auto">{comment.date}</span>
                        </div>
                        <p className="text-gray-700">{comment.content}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <form onSubmit={handleCommentSubmit}>
                <div className="border rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-500">
                  <textarea 
                    className="w-full p-3 border-none focus:outline-none resize-none"
                    rows="3"
                    placeholder="Add a comment to the discussion..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  ></textarea>
                  <div className="bg-gray-50 p-3 flex justify-between items-center">
                    <div className="flex items-center">
                      <button 
                        type="button"
                        className="text-gray-500 hover:text-gray-700"
                        title="Attach file"
                      >
                        <FaPaperclip />
                      </button>
                    </div>
                    <button
                      type="submit"
                      className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 transition"
                      disabled={!comment.trim()}
                    >
                      Post Comment
                    </button>
                  </div>
                </div>
              </form>
            </div>
          )}
          
          {/* Messages Tab */}
          {activeTab === 'messages' && (
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-800 mb-4">Private Messages</h3>
              
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <p className="text-gray-600 text-sm">
                  This is a private conversation between you and the task creator. Use this space to ask questions or share information that shouldn't be visible to all participants.
                </p>
              </div>
              
              <div className="space-y-4 mb-6">
                {mockMessages.map(message => (
                  <div 
                    key={message.id} 
                    className={`flex ${message.isFromCreator ? 'justify-start' : 'justify-end'}`}
                  >
                    <div className={`max-w-[75%] ${message.isFromCreator ? 'bg-gray-100' : 'bg-blue-100'} rounded-lg p-3`}>
                      <div className="flex items-center mb-1">
                        <img 
                          src={message.authorAvatar} 
                          alt={message.author} 
                          className="w-6 h-6 rounded-full mr-2"
                        />
                        <span className="text-sm font-medium">{message.author}</span>
                        <span className="text-xs text-gray-500 ml-2">{message.date}</span>
                      </div>
                      <p className={`text-sm ${message.isFromCreator ? 'text-gray-700' : 'text-blue-800'}`}>
                        {message.content}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              
              <form onSubmit={handleMessageSubmit}>
                <div className="border rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-500">
                  <textarea 
                    className="w-full p-3 border-none focus:outline-none resize-none"
                    rows="3"
                    placeholder="Type a private message to the task creator..."
                    value={privateMessage}
                    onChange={(e) => setPrivateMessage(e.target.value)}
                  ></textarea>
                  <div className="bg-gray-50 p-3 flex justify-between items-center">
                    <div className="flex items-center">
                      <button 
                        type="button"
                        className="text-gray-500 hover:text-gray-700"
                        title="Attach file"
                      >
                        <FaPaperclip />
                      </button>
                    </div>
                    <button
                      type="submit"
                      className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 transition flex items-center"
                      disabled={!privateMessage.trim()}
                    >
                      <FaPaperPlane className="mr-1" size={12} />
                      Send Message
                    </button>
                  </div>
                </div>
              </form>
            </div>
          )}
          
          {/* Submission Tab */}
          {activeTab === 'submission' && (
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-800">Task Submission</h3>
                <span className={`${getStatusInfo(submissionStatus).color} text-xs px-3 py-1 rounded-full flex items-center`}>
                  {getStatusInfo(submissionStatus).icon} {getStatusInfo(submissionStatus).text}
                </span>
              </div>
              
              {/* Show different content based on submission status */}
              {(submissionStatus === 'not_submitted' || submissionStatus === 'in_progress') && (
                <form onSubmit={handleSubmitTask}>
                  <div className="space-y-6">
                    {/* Text submission */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Text Description
                      </label>
                      <textarea 
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                        rows="4"
                        placeholder="Describe your work and implementation details..."
                        value={submissionText}
                        onChange={(e) => setSubmissionText(e.target.value)}
                      ></textarea>
                    </div>
                    
                    {/* File upload */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        File Attachments
                      </label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <input
                          type="file"
                          multiple
                          className="hidden"
                          id="file-upload"
                          onChange={handleFileChange}
                        />
                        <label
                          htmlFor="file-upload"
                          className="cursor-pointer inline-flex items-center"
                        >
                          <FaFileUpload className="text-blue-500 mr-2" size={24} />
                          <div>
                            <p className="text-sm font-medium text-blue-600">Click to upload files</p>
                            <p className="text-xs text-gray-500">
                              Support for images, documents, and code files
                            </p>
                          </div>
                        </label>
                      </div>
                      
                      {/* File list */}
                      {submissionFiles.length > 0 && (
                        <div className="mt-3 space-y-2">
                          {submissionFiles.map((file, index) => (
                            <div key={index} className="flex items-center justify-between bg-gray-50 rounded p-2">
                              <div className="flex items-center">
                                {file.type.startsWith('image/') ? (
                                  <FaImages className="text-green-500 mr-2" />
                                ) : file.name.endsWith('.js') || file.name.endsWith('.jsx') ? (
                                  <FaCode className="text-yellow-500 mr-2" />
                                ) : (
                                  <FaPaperclip className="text-blue-500 mr-2" />
                                )}
                                <span className="text-sm truncate max-w-[250px]">{file.name}</span>
                                <span className="text-xs text-gray-500 ml-2">
                                  ({(file.size / 1024).toFixed(1)} KB)
                                </span>
                              </div>
                              <button
                                type="button"
                                onClick={() => handleRemoveFile(index)}
                                className="text-red-500 hover:text-red-700"
                              >
                                <FaTimes />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    {/* Link submission */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        External Link (Optional)
                      </label>
                      <div className="flex">
                        <div className="flex items-center bg-gray-100 px-3 rounded-l-md border border-r-0 border-gray-300">
                          <FaLink className="text-gray-500" />
                        </div>
                        <input
                          type="url"
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="https://github.com/yourusername/project"
                          value={submissionLink}
                          onChange={(e) => setSubmissionLink(e.target.value)}
                        />
                      </div>
                      <p className="mt-1 text-xs text-gray-500">
                        Add a link to your repository, demo, or any relevant resource
                      </p>
                    </div>
                    
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
                      >
                        Submit Task
                      </button>
                    </div>
                  </div>
                </form>
              )}
              
              {submissionStatus === 'under_review' && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
                  <BsClockFill className="text-yellow-500 text-4xl mx-auto mb-3" />
                  <h3 className="text-lg font-medium text-gray-800 mb-1">Under Review</h3>
                  <p className="text-gray-600 mb-4">
                    Your submission is currently being reviewed by the task creator.
                    You'll be notified once the review is complete.
                  </p>
                  <div className="flex items-center justify-center space-x-2">
                    <FaCalendarAlt className="text-gray-500" />
                    <span className="text-sm text-gray-500">Submitted on June 25, 2023</span>
                  </div>
                </div>
              )}
              
              {submissionStatus === 'approved' && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                  <BsCheckCircleFill className="text-green-500 text-4xl mx-auto mb-3" />
                  <h3 className="text-lg font-medium text-gray-800 mb-1">Submission Approved!</h3>
                  <p className="text-gray-600 mb-4">
                    Congratulations! Your submission has been approved.
                    You've earned {task.reward} points for completing this task.
                  </p>
                  <div className="inline-block bg-green-100 text-green-800 text-sm font-medium px-4 py-2 rounded-full">
                    +{task.reward} points added to your profile
                  </div>
                </div>
              )}
              
              {submissionStatus === 'rejected' && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                  <div className="text-center mb-4">
                    <BsExclamationTriangle className="text-red-500 text-4xl mx-auto mb-3" />
                    <h3 className="text-lg font-medium text-gray-800 mb-1">Submission Needs Improvement</h3>
                    <p className="text-gray-600">
                      Your submission wasn't approved. Please review the feedback below and resubmit.
                    </p>
                  </div>
                  
                  <div className="bg-white border border-red-100 rounded-lg p-4 mb-6">
                    <h4 className="font-medium text-gray-800 mb-2">Feedback from Reviewer:</h4>
                    <p className="text-gray-700 mb-3">
                      The navigation component doesn't correctly collapse on mobile screens. Please ensure the hamburger menu appears at the 768px breakpoint as specified in the requirements.
                    </p>
                    <p className="text-gray-700">
                      Also, the transitions are not smooth enough. Please add proper transition effects when opening and closing the menu.
                    </p>
                  </div>
                  
                  <div className="flex justify-center">
                    <button
                      onClick={handleResubmit}
                      className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
                    >
                      Revise and Resubmit
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        
        {/* Footer with actions */}
        <div className="border-t bg-gray-50 px-6 py-3 flex justify-between items-center">
          <div className="flex items-center text-sm text-gray-500">
            <FaUser className="mr-1" />
            <span>Assigned to {task.assignedTo?.length > 0 ? 'You' : 'No one yet'}</span>
          </div>
          
          <div>
            {activeTab === 'details' && submissionStatus === 'not_submitted' && (
              <button
                onClick={() => setActiveTab('submission')}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                Take Task
              </button>
            )}
            
            {activeTab === 'details' && (submissionStatus === 'in_progress' || submissionStatus === 'rejected') && (
              <button
                onClick={() => setActiveTab('submission')}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                Continue Task
              </button>
            )}
            
            {activeTab === 'details' && (
              submissionStatus === 'under_review' ||
              submissionStatus === 'approved'
            ) && (
              <button
                onClick={() => setActiveTab('submission')}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                View Submission
              </button>
            )}
            
            {activeTab !== 'details' && (
              <button
                onClick={() => setActiveTab('details')}
                className="border border-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-50 transition"
              >
                Back to Details
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskDetailsModal;