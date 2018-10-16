export const setToLocalStorage = (key, value) => localStorage.setItem(key, value);

export const getFromLocalStorage = (key) => localStorage.getItem(key);

export const removeFromLocalStorage = (key) => localStorage.removeItem(key);

export const getStatusColor = status => {
    switch (status) {
        case 'INIT':
            return '#4FA9E8';
        case 'APPROVED':
            return '#6FCF97';
        case 'CANCELED':
            return '#EB5757';
        case 'CLOSING':
            return '#F08C53';
        case 'COMPLETED':
            return '#B471E9';
        default:
            return '#000000';
    }
};