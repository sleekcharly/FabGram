import { useEffect } from 'react';
import Timeline from '../components/timeline';
import Sidebar from '../components/sidebar';
import Header from '../components/header';

export default function Dashboard() {
  useEffect(() => {
    document.title = 'FabGram';
  }, []);

  return (
    <div className="bg-gray-background">
      <Header />
      <div className="grid">
        <Timeline />
        <Sidebar />
      </div>
    </div>
  );
}
