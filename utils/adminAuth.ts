
export const checkAdminAuth = (): boolean => {
    const token = localStorage.getItem('adminToken');
    // In a real-world application, you might also want to decode the JWT 
    // and check its expiration date here for more robust client-side protection.
    return !!token;
};

export const getAdminAuthHeader = (): { [key: string]: string } => {
    const token = localStorage.getItem('adminToken');
    if (token) {
        return { 'Authorization': `Bearer ${token}` };
    }
    return {};
};
