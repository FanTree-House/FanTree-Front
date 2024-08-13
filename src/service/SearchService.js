// src/service/SearchService.js
import axios from 'axios';

export const searchArtistGroup = async (groupName) => {
    try {
        const response = await axios.get('http://localhost:8080/artistgroup/search', {
            params: { groupName }
        });
        return response.data.data;
    } catch (error) {
        console.error('Error searching artist group:', error);
        throw error;
    }
};