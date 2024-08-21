import dynamic from 'next/dynamic'

export default async function Home() {
  const MapComponent = dynamic(() => import('@/components/map/Map'));
  return (
    <MapComponent />
  );
}
