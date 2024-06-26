'use client';
import React, { useCallback, useEffect, useState } from 'react';
import Calendar, { ThemeInput, type Props as ActivityCalendarProps } from 'react-activity-calendar';
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";  

interface Props extends Omit<ActivityCalendarProps, 'data' | 'theme'> {
  username: string;
}

async function fetchCalendarData(username: string): Promise<ApiResponse> {
  const response = await fetch(
    `https://github-contributions-api.jogruber.de/v4/${username}?y=last`
  );
  const data: ApiResponse | ApiErrorResponse = await response.json();

  if (!response.ok) {
    throw Error(
      `Fetching GitHub contribution data for "${username}" failed: ${
        (data as ApiErrorResponse).error
      }`
    );
  }

  return data as ApiResponse;
}

const GithubCalendar: React.FunctionComponent<Props> = ({ username, ...props }) => {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(() => {
    setLoading(true);
    setError(null);
    fetchCalendarData(username)
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [username]);

  useEffect(fetchData, [fetchData]);

  if (error) {
    return (
      <div>
        Fetch failed! Contact{' '}
        <a
          href=""
          className="inline-block transition duration-300 hover:-translate-y-px outline-none hover:text-primary-10 focus-visible:text-primary-10"
          target="_blank"
        >
          @Kushal2004
        </a>{' '}
        immediately.
      </div>
    );
  }

  if (loading || !data) {
    return <div >Loading...</div>;
  }

  return (
    <div className="dark:text-white  p-4">
    <Calendar
    renderBlock={(block, activity) =>
      React.cloneElement(block, {
        'data-tooltip-id': 'react-tooltip',
        'data-tooltip-html': `${activity.count} activities on ${activity.date}`,
      })
    }
      data={selectLastNDays(data.contributions)}
      theme={{
        light: ['#f0f0f0', '#c4edde', '#7ac7c4', '#f73859', '#384259'],
        dark: ['#383838', '#4D455D', '#7DB9B6', '#F5E9CF', '#E96479'],
      }}
      blockMargin={6}
      blockSize={20}
      fontSize={15}
      hideColorLegend={false}
      showWeekdayLabels={true}
      
      {...props}
      maxLevel={4}
    />
    <ReactTooltip id="react-tooltip" />
    </div>
  );
};


interface Activity {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4 ;
}

interface ApiResponse {
  total: {
    [year: number]: number;
    [year: string]: number;
  };
  contributions: Array<Activity>;
}

interface ApiErrorResponse {
  error: string;
}

const DAYS_TO_SHOW = 150;

const selectLastNDays = (contributions: any) => {
  const today = new Date();
  const startDate = new Date(today);
  startDate.setDate(today.getDate() - DAYS_TO_SHOW);

  return contributions.filter((activity: any) => {
    const activityDate = new Date(activity.date);
    return activityDate >= startDate && activityDate <= today;
  });
};


export default GithubCalendar;
