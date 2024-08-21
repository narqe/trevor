"use client";;
import { useEffect } from 'react';
import { LinearProgress, Container } from '@mui/material';
import * as ReactLeaflet from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import styles from '@/components/map/Map.module.css';
import position from '@/utils/locations.json';
import Countries from '@/utils/countries';
import MarkerContainer from '@/components/marker/MarkerContainer';
import AlertSnackbar from '@/components/shared/AlertSnackbar';
import SearchContainer from '@/components/search/SearchContainer';
import { useAppContext } from "@/context/context";
const { MapContainer, TileLayer, useMap } = ReactLeaflet;

function MainContainer({ className, width, height, ...rest }: any) {
    const { searchInput } = useAppContext();
    const { countries, error, loading, fetchCountries, openSnackbar, setOpenSnackbar } = Countries();

    let mapClassName = styles.map;

    if (className) {
        mapClassName = `${mapClassName} ${className}`;
    }

    useEffect(() => {
        fetchCountries(searchInput);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchInput]);

    return (
        <Container sx={{ maxWidth: '1400px', mx: 'auto', my: 2, py: 2 }}>
            <SearchContainer />
            { loading && <LinearProgress />}
            <MapContainer
                sx={{ mt: 1 }}
                worldCopyJump={true} 
                center={[0, 0]} 
                zoom={3} 
                className={mapClassName} 
                {...rest}
            >
                <TileLayer 
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' 
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />                    
                { countries?.map(country => {
                    const pos = position.find(p => p.isoCode === country.code)
                    return (
                        <MarkerContainer 
                            key={country.code} 
                            data={country} 
                            lat={pos?.latitude} 
                            lon={pos?.longitude} 
                        />
                    )
                })}
            </MapContainer>
            <AlertSnackbar open={openSnackbar} message={error} onClose={() => setOpenSnackbar(false)} />
        </Container>
    )
}

export default MainContainer;