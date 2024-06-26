import React from 'react';
import ActivityCalendar from 'react-activity-calendar';

interface GitHubCalendarComponentProps {
  username: string;
}

// Example hardcoded data
const data = [
  {
    date: '2023-06-14',
    count: 2,
    level: 1
  },
  {
    date: '2023-06-22',
    count: 16,
    level: 3
  }
];

const GitHubCalendarComponent: React.FC<GitHubCalendarComponentProps> = ({ username }) => {
  return (
    <ActivityCalendar
      data={data}
      theme={{
        light: ['#f0f0f0', '#c4edde', '#7ac7c4', '#f73859', '#384259'],
        dark: ['#383838', '#4D455D', '#7DB9B6', '#F5E9CF', '#E96479'],
      }}
      blockMargin={4}
      blockSize={12}
      hideColorLegend={false}
      labels={{
        legend: {
          less: 'Less',
          more: 'More',
        },
      }}
    />
  );
};

export default GitHubCalendarComponent;
