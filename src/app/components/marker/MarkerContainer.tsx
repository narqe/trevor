import React from 'react'
import PopupContainer from '@/components/popup/PopupContainer';
import { Marker } from 'react-leaflet';
import L from 'leaflet';
import { Country } from '@/models/Country';

interface Props {
    data: Country,
    lat?: number,
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