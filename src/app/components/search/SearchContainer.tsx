import React, { useMemo, useEffect, useState } from 'react';
import { Paper, InputBase, IconButton, Menu } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { useAppContext } from "@/context/context";
import debounce from 'lodash.debounce';
import Filter from '@/components/search/filter/Filter';

const SearchContainer = () => {
    const { filter, searchInput, setSearchInput } = useAppContext();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setSearchInput(e.target.value);

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
                placeholder="Search countries"
                inputProps={{ 'aria-label': 'search countries' }}
                onChange={debouncedResults}
            />
            <IconButton
                type="button" 
                aria-label="search"
                onClick={handleClick}
            >
                <FilterAltIcon />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                    elevation: 2,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&::before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 40,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
            >  
                <Filter />
            </Menu>
            <IconButton type="button" aria-label="search">
                <SearchIcon />
            </IconButton>
        </Paper>
    );
}

export default SearchContainer