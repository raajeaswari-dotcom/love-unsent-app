
export const checkAdminAuth = (): boolean => {
    const token = localStorage.getItem("adminToken");
    return !!token;
};

export const getAdminAuthHeader = (): { [key: string]: string } => {
    const token = localStorage.getItem("adminToken");
    if (token) {
        return { Authorization: `Bearer ${token}` };
    }
    return {};
};
