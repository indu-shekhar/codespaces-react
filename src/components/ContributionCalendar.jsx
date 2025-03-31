import React from 'react';

// This is a simplified version of a contribution calendar
// In a real implementation, you'd use a library like react-calendar-heatmap
// or implement a more sophisticated version
function ContributionCalendar() {
  // Generate mock contribution data for demonstration
  const generateMockData = () => {
    const cells = [];
    const days = 91; // ~3 months
    const today = new Date();
    
    for (let i = 0; i < days; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      
      // Random contribution level (0-4)
      const level = Math.floor(Math.random() * 5);
      
      cells.push({
        date: date.toISOString().split('T')[0],
        count: level * 2,
        level: level
      });
    }
    
    return cells.reverse();
  };
  
  const contributions = generateMockData();
  
  // Group by week for display
  const weeks = [];
  let currentWeek = [];
  
  contributions.forEach((day, index) => {
    currentWeek.push(day);
    if (currentWeek.length === 7 || index === contributions.length - 1) {
      weeks.push([...currentWeek]);
      currentWeek = [];
    }
  });
  
  // Get color based on contribution level
  const getColorClass = (level) => {
    switch(level) {
      case 0: return "bg-gray-100";
      case 1: return "bg-blue-100";
      case 2: return "bg-blue-200";
      case 3: return "bg-blue-300";
      case 4: return "bg-blue-500";
      default: return "bg-gray-100";
    }
  };

  return (
    <div className="overflow-x-auto pb-2">
      <div className="inline-block min-w-full">
        <div className="flex space-x-1 justify-center md:justify-start">
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="flex flex-col space-y-1">
              {week.map((day, dayIndex) => (
                <div 
                  key={`${weekIndex}-${dayIndex}`}
                  className={`w-2 h-2 md:w-3 md:h-3 rounded-sm ${getColorClass(day.level)}`}
                  title={`${day.date}: ${day.count} contributions`}
                ></div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ContributionCalendar;