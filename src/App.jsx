import { useState } from 'react';
import './App.css';
import ProfilePage from './components/ProfilePage';
import CommunityPage from './components/CommunityPage';
import FeedPage from './components/FeedPage';

function App() {
  const [currentPage, setCurrentPage] = useState('feed'); // Default to feed/home page
  
  // Simple routing function
  const renderPage = () => {
    switch(currentPage) {
      case 'community':
        return <CommunityPage onNavigate={setCurrentPage} />;
      case 'profile':
        return <ProfilePage onNavigate={setCurrentPage} />;
      case 'feed':
      default:
        return <FeedPage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="App">
      {renderPage()}
      
      {/* Simple navigation for demo purposes - Only show when not on the feed page */}
      {currentPage !== 'feed' && (
        <div className="fixed bottom-4 right-4 bg-white rounded-full shadow-lg p-2 flex gap-2">
          <button 
            onClick={() => setCurrentPage('feed')}
            className="p-2 rounded-full text-gray-500"
            title="Home"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7m-7-7v14" />
            </svg>
          </button>
          <button 
            onClick={() => setCurrentPage('profile')}
            className={`p-2 rounded-full ${currentPage === 'profile' ? 'bg-blue-100 text-blue-600' : 'text-gray-500'}`}
            title="Profile"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </button>
          <button 
            onClick={() => setCurrentPage('community')}
            className={`p-2 rounded-full ${currentPage === 'community' ? 'bg-blue-100 text-blue-600' : 'text-gray-500'}`}
            title="Community"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
