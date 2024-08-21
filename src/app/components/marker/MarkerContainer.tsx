import React from 'react'
import PopupContainer from '@/components/popup/PopupContainer';
import { Marker } from 'react-leaflet';

interface Props {
    data: {},
    lat?: number
    lon?: number
}

const MarkerContainer = ({ data, lat = 0, lon = 0 }: Props) => {
    if (!data) return;

    return (
        <Marker position={[lat, lon]} icon={new L.Icon({ iconUrl: '/marker.svg' })}>
            <PopupContainer data={data} />
        </Marker>
    )
}

export default MarkerContainer