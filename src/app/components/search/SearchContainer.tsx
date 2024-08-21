import { useMemo, useEffect } from 'react';
import { Paper, InputBase, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useAppContext } from "@/context/context";
import debounce from 'lodash.debounce';

const SearchContainer = () => {
    const { searchInput, setSearchInput } = useAppContext();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInput(e.target.value);
    }

    const debouncedResults = useMemo(() => {
        return debounce(handleChange, 700);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    useEffect(() => {
        return () => debouncedResults.cancel();
    });

    return (
        <Paper sx={{ mb: 1, display: 'flex', alignItems: 'center', width: '100%' }}>
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search countries by name"
                inputProps={{ 'aria-label': 'search countries by name' }}
                onChange={debouncedResults}
            />
            <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                <SearchIcon />
            </IconButton>
        </Paper>
    );
}

export default SearchContainer