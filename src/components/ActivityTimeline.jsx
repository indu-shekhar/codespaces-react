import React from 'react';
import { FaTasks, FaTrophy, FaUserPlus, FaComments } from 'react-icons/fa';

function ActivityTimeline() {
  // Mock activity data - Replace with API integration
  const activities = [
    {
      id: 1,
      type: 'task_completed',
      title: 'Completed task: Refactor Authentication System',
      community: 'Web Development',
      points: 25,
      date: '2 hours ago',
      icon: 'task'
    },
    {
      id: 2,
      type: 'badge_earned',
      title: 'Earned "Consistency Champion" badge',
      description: 'Completed tasks 5 days in a row',
      date: 'Yesterday',
      icon: 'badge'
    },
    {
      id: 3,
      type: 'community_joined',
      title: 'Joined UI/UX Design community',
      date: '3 days ago',
      icon: 'community'
    },
    {
      id: 4,
      type: 'comment',
      title: 'Commented on "Mobile Responsive Design Guidelines"',
      community: 'UI/UX Design',
      date: '5 days ago',
      icon: 'comment'
    },
    {
      id: 5,
      type: 'task_completed',
      title: 'Completed task: Create Project Documentation',
      community: 'Open Source Projects',
      points: 15,
      date: '1 week ago',
      icon: 'task'
    }
  ];

  // Function to get icon based on activity type
  const getActivityIcon = (type) => {
    switch(type) {
      case 'task': return <FaTasks className="text-blue-500" size={20} />;
      case 'badge': return <FaTrophy className="text-yellow-500" size={20} />;
      case 'community': return <FaUserPlus className="text-green-500" size={20} />;
      case 'comment': return <FaComments className="text-purple-500" size={20} />;
      default: return <FaTasks className="text-blue-500" size={20} />;
    }
  };

  return (
    <div className="flow-root">
      <ul className="-mb-8">
        {activities.map((activity, activityIdx) => (
          <li key={activity.id}>
            <div className="relative pb-8">
              {activityIdx !== activities.length - 1 ? (
                <span 
                  className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200" 
                  aria-hidden="true" 
                />
              ) : null}
              <div className="relative flex items-start space-x-2 md:space-x-3">
                <div className="relative">
                  <div className="h-9 w-9 md:h-10 md:w-10 rounded-full bg-gray-100 flex items-center justify-center ring-8 ring-white">
                    {getActivityIcon(activity.icon)}
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <div>
                    <div className="text-xs md:text-sm">
                      <span className="font-medium text-gray-900">{activity.title}</span>
                    </div>
                    {activity.description && (
                      <p className="mt-0.5 text-xs md:text-sm text-gray-500">{activity.description}</p>
                    )}
                    {activity.community && (
                      <p className="mt-0.5 text-xs md:text-sm text-gray-500">
                        In <span className="text-blue-600">{activity.community}</span>
                      </p>
                    )}
                    <div className="mt-2 flex items-center flex-wrap text-xs md:text-sm text-gray-500">
                      <span>{activity.date}</span>
                      {activity.points && (
                        <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">
                          +{activity.points} points
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ActivityTimeline;