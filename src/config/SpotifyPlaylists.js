import React, { useEffect, useState } from 'react';

const SpotifyPlaylists = () => {
    const [playlists, setPlaylists] = useState([]);

    useEffect(() => {
        const fetchPlaylists = async () => {
            const response = await fetch('https://api.spotify.com/v1/users/reynalol/playlists', {
                headers: {
                    Authorization: 'Bearer {access_token}' // Replace with your access token
                }
            });
            const data = await response.json();
            setPlaylists(data.items);
        };

        fetchPlaylists();
    }, []);

    return (
        <div>
            <h2>Your Spotify Playlists</h2>
            <ul>
                {playlists.map(playlist => (
                    <li key={playlist.id}>
                        <a href={playlist.external_urls.spotify} target="_blank" rel="noopener noreferrer">
                            {playlist.name}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SpotifyPlaylists;
