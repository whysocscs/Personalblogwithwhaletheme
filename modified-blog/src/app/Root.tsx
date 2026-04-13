import { Outlet } from 'react-router';
import { Navigation } from './components/Navigation';
import { BubbleCursor } from './components/BubbleCursor';
import { DepthMeter } from './components/DepthMeter';

export function Root() {
  return (
    <div className="min-h-screen">
      <BubbleCursor />
      <Navigation />
      <DepthMeter />
      <Outlet />
    </div>
  );
}