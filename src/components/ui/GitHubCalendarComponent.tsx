import React from 'react';
import GitHubCalendar from 'react-github-calendar';

interface GitHubCalendarComponentProps {
  username: string;
}

const GitHubCalendarComponent: React.FC<GitHubCalendarComponentProps> = ({ username }) => {
  return <GitHubCalendar username={username} />;
};

export default GitHubCalendarComponent;
