// fetch-wrapper-predict.js
import { useAuthStore } from '@/stores';

export const fetchWrapperPredict = {
    get: request('GET'),
    post: request('POST'),
    put: request('PUT'),
    delete: request('DELETE')
};

function request(method) {
    return async (url, body) => {
        const { user } = useAuthStore();
        const headers = {
            'Content-Type': 'application/json',
            ...(user ? { Authorization: `Bearer ${user.access_token}` } : {})
        };

        const requestOptions = {
            method,
            headers,
            body: body ? JSON.stringify(body) : undefined
        };

        const response = await fetch(url, requestOptions);

        const text = await response.text();
        const data = text ? JSON.parse(text) : null;

        if (!response.ok) {
            if ([401, 403].includes(response.status) && user) {
                console.log('Auto logout due to 401/403 response');
                useAuthStore().logout();
            }
            const error = (data && data.message) || response.statusText || response.status;
            return Promise.reject(error);
        }

        return data;
    };
}