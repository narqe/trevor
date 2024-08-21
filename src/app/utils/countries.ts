
import { useState, useEffect } from 'react';
import { useAppContext } from "@/context/context";
import { Country }  from '@/models/Country';

const Countries = () => {
    const [countries, setCountries] = useState<Country[]>([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [ openSnackbar, setOpenSnackbar ] = useState(false);

    async function fetchCountries(params?: string) {
        try {
            setLoading(true)
            const response = await fetch(`/api/countries?name=${params || ''}`);
            if (!response.ok) {
                throw new Error('There was an error fetching the countries. Please reload and try again.');
            }
            const data = await response.json();
            setCountries(data);
        } catch (error) {
            setCountries([]);
            setError(error as unknown as string);
            setOpenSnackbar(true);
        } finally {
            setLoading(false);
        }
    }

    return {
        openSnackbar,
        countries,
        error,
        loading,
        setOpenSnackbar,
        fetchCountries,
    }

}

export default Countries;