import dynamic from 'next/dynamic';
const MainContainer = dynamic(() => import('@/components/MainContainer'), { ssr: false });

const Map = () => {
    return <MainContainer />
}

export default Map;