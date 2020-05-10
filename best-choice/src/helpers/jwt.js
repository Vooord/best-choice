// return authorization header with jwt token
export const makeAuthHeader = () => {
    const token = localStorage.getItem('token');

    if (token) {
        return { 'Authorization': `Bearer ${token}` };
    }

    return {};
};
