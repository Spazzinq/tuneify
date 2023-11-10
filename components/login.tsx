'use client';

import styled from 'styled-components';
import { signIn } from 'next-auth/react';
import { FaSpotify } from 'react-icons/fa';

const LoginButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    background-color: #1db954;
    color: black;
    padding: 10px 20px;
    font-size: 16px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
`;

const Icon = styled(FaSpotify)`
    margin-right: 8px;
`;

const SpotifyLogin = () => (
    <LoginButton onClick={() => signIn('spotify', { callbackUrl: 'http://localhost:3000/protected/profile' })}>
        <Icon size={20} />
        Login using Spotify
    </LoginButton>
);

export default SpotifyLogin;