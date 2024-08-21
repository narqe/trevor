
import { useState, useEffect } from 'react';
import { useAppContext } from "@/context/context";

const Countries = () => {
    const [countries, setCountries] = useState([]);
    const [error, setError] = useState(null);
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
            setError(error.message);
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