import { render, screen } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";
import Dashboard from '../pages/Dashboard';
import { AuthProvider } from '../context/AuthContext';

const renderDashboard = () => {
  return render(
    <AuthProvider>
      <Dashboard />
    </AuthProvider>
  );
};

describe('Dashboard', () => {
  it('renders welcome message and stats', () => {
    renderDashboard();
    
    expect(screen.getByText(/Welcome back/)).toBeInTheDocument();
    expect(screen.getByText('Total Projects')).toBeInTheDocument();
    expect(screen.getByText('Active Tasks')).toBeInTheDocument();
    expect(screen.getByText('Team Members')).toBeInTheDocument();
    expect(screen.getByText('Completed Tasks')).toBeInTheDocument();
  });

  it('displays correct stats values', () => {
    renderDashboard();
    
    expect(screen.getByText('12')).toBeInTheDocument();
    expect(screen.getByText('24')).toBeInTheDocument();
    expect(screen.getByText('8')).toBeInTheDocument();
    expect(screen.getByText('156')).toBeInTheDocument();
  });
});