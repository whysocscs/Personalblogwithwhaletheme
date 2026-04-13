import { Outlet } from 'react-router';
import { Navigation } from './components/Navigation';
import { BubbleCursor } from './components/BubbleCursor';

export function Root() {
  return (
    <div className="min-h-screen">
      <BubbleCursor />
      <Navigation />
      <Outlet />
    </div>
  );
}