import dynamic from 'next/dynamic';
import ErrorBoundary from '@/components/ErrorBoundary';
import WelcomeModal from '@/components/WelcomeModal';

const Portfolio = dynamic(() => import('@/components/Portfolio'));

export default function Home() {
  return (
    <ErrorBoundary>
      <Portfolio />
      <WelcomeModal />
    </ErrorBoundary>
  );
}
