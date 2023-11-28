'use client'

import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';
import { usePathname, useRouter } from 'next/navigation';
import { FormEvent } from 'react';

export default function NewSearch() {
    const router = useRouter();
    const path = usePathname();

    const search = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const target = event.target as HTMLInputElement;
        const query = target.value;
        router.replace(`/protected/search?query=${query}`);
        console.log(event)
    };

    return (
        <Paper
            component="form"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 200 }}
            onSubmit={search}
        >
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search... "
                inputProps={{ 'aria-label': 'search google maps' }}
                type="text"
                name="query"
            />
            <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
                <SearchIcon />
            </IconButton>
        </Paper>
    );
}