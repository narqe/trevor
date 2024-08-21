import dynamic from 'next/dynamic'
const MapComponent = dynamic(() => import('@/components/map/Map.tsx', { ssr: false }));

export default async function Home() {
  return (
    <MapComponent />
  );
}
