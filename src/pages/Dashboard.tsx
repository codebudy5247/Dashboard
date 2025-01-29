import React from "react";
import styled from "styled-components";
import { useAuth } from "../context/AuthContext";

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  const statsData = [
    { title: "Total Projects", value: 12 },
    { title: "Active Tasks", value: 24 },
    { title: "Team Members", value: 8 },
    { title: "Completed Tasks", value: 156 },
  ];

  return (
    <DashboardContainer>
      <WelcomeCard>
        <h1>Welcome back, {user?.name}! 👋</h1>
      </WelcomeCard>

      <StatsGrid>
        {statsData.map((stat, index) => (
          <StatCard key={index}>
            <h3>{stat.title}</h3>
            <p>{stat.value}</p>
          </StatCard>
        ))}
      </StatsGrid>
    </DashboardContainer>
  );
};

export default Dashboard;

//Styles
const DashboardContainer = styled.div`
  padding: 2rem;
`;

const WelcomeCard = styled.div`
  background: var(--card-bg);
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const StatCard = styled.div`
  background: var(--card-bg);
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  h3 {
    margin: 0 0 0.5rem 0;
    color: var(--text-secondary);
  }

  p {
    margin: 0;
    font-size: 1.5rem;
    font-weight: bold;
    color: var(--text-primary);
  }
`;
