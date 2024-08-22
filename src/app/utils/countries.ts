
import { useState } from 'react';
import { Country }  from '@/models/Country';
import { IFilter } from '@/models/IFilter';

const Countries = () => {
    const [countries, setCountries] = useState<Country[]>([]);
    const [error, setError] = useState('');
    const [info, setInfo] = useState('');
    const [loading, setLoading] = useState(false);
    const [ openErrorSnackbar, setOpenErrorSnackbar ] = useState(false);
    const [ openInfoSnackbar, setOpenInfoSnackbar ] = useState(false);

    async function fetchCountries(filterBy: IFilter, params?: string) {
        setOpenErrorSnackbar(false);
        setOpenInfoSnackbar(false);
        try {
            setLoading(true)
            const response = await fetch(`/api/countries?filterBy=${filterBy.toLowerCase()}&value=${params}`);
            if (!response.ok) {
                throw new Error('There was an error fetching the countries. Please reload and try again.');
            }
            const data = await response.json();
            setCountries(data);
            if (!data.length) {
                setOpenInfoSnackbar(true);
                setInfo("There are no results for the filters you are applying, try with others please.");
            }
        } catch (error: unknown) {
            setCountries([]);
            (error instanceof Error) 
                ? setError(error.message) 
                : setError('An unknown error occurred');
            setOpenErrorSnackbar(true);
        } finally {
            setLoading(false);
        }
    }

    return {
        openErrorSnackbar,
        openInfoSnackbar,
        countries,
        error,
        info,
        loading,
        setOpenErrorSnackbar,
        setOpenInfoSnackbar,
        fetchCountries,
    }

}

export default Countries;