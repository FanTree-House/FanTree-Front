import apiClient from './apiClient';

export const searchArtistGroup = async (groupName) => {
    try {
        const response = await apiClient.get('/artistgroup/search', {
            params: { groupName }
        });
        return response.data.data;
    } catch (error) {
        console.error('Error searching artist group:', error);
        throw error;
    }
};