import { useEffect, useRef } from 'react';
import { useMutation, useIsMutating, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { axiosInstance, BASE_URL, ENDPOINTS, SESSION_ID } from '../apiUtil';
import useIsLoggedIn from './useIsLoggedIn';

export const CART_QUERY_KEY = ['cart'];
const CART_MUTATION_KEY = ['cart-mutation'];

const cartApi = {
    getCart: () => axiosInstance.get(ENDPOINTS.CART.GET).then(r => r.data.cart),
    addToCart: (product) => axiosInstance.post(ENDPOINTS.CART.ADD, { product, sessionId: SESSION_ID }).then(r => r.data),
    removeFromCart: ({ id, title }) => axiosInstance.delete(ENDPOINTS.CART.REMOVE, { data: { id, title, sessionId: SESSION_ID } }).then(r => r.data),
    incrementItem: (product) => axiosInstance.patch(ENDPOINTS.CART.INCREMENT, { product, sessionId: SESSION_ID }).then(r => r.data),
    decrementItem: (product) => axiosInstance.patch(ENDPOINTS.CART.DECREMENT, { product, sessionId: SESSION_ID }).then(r => r.data),
    clearCart: () => axiosInstance.delete(ENDPOINTS.CART.CLEAR, { data: { sessionId: SESSION_ID } }).then(r => r.data),
};

const getErrorMessage = (error) =>
    error?.response?.data?.message ?? error?.message ?? 'Something went wrong';

export const useGetCart = () => {
    const isLoggedIn = useIsLoggedIn();
    return useQuery({
        queryKey: CART_QUERY_KEY,
        queryFn: cartApi.getCart,
        enabled: !!isLoggedIn,
        // Disable refetch on window focus to prevent multiple redundant requests
        // when switching tabs. Cart updates are handled via SSE (useCartSSE hook)
        // which pushes real-time updates from the server.
        refetchOnWindowFocus: false,
    });
};

/**
 * Hook to establish a Server-Sent Events (SSE) connection for real-time cart updates.
 * 
 * Opens an SSE connection to /cart/events and automatically refetches the cart query
 * whenever another session (e.g., different browser tab or device) updates the cart.
 * This keeps all sessions in sync without polling.
 * 
 * Features:
 * - Auto-connects when user logs in
 * - Auto-disconnects when user logs out
 * - Auto-reconnects on connection errors (3s delay)
 * - Prevents duplicate connections using a ref
 * - Includes session ID to avoid refetching on self-triggered updates
 * 
 * Why SSE? It's a lightweight, one-way push mechanism perfect for real-time updates
 * without the overhead of WebSockets or constant polling.
 */
export const useCartSSE = () => {
    const isLoggedIn = useIsLoggedIn();
    const qc = useQueryClient();
    const esRef = useRef(null);
    const reconnectTimer = useRef(null);

    useEffect(() => {
        if (!isLoggedIn) {
            // clean up if user logs out
            clearTimeout(reconnectTimer.current);
            esRef.current?.close();
            esRef.current = null;
            return;
        }

        // already connected
        if (esRef.current) return;

        const connect = () => {
            const url = `${BASE_URL}${ENDPOINTS.CART.EVENTS}?sessionId=${SESSION_ID}`;
            const es = new EventSource(url, { withCredentials: true });
            esRef.current = es;

            es.addEventListener('cart-updated', () => {
                qc.refetchQueries({ queryKey: CART_QUERY_KEY, type: 'active', exact: true });
            });

            es.onerror = () => {
                es.close();
                esRef.current = null;
                reconnectTimer.current = setTimeout(connect, 3000);
            };
        };

        connect();

        return () => {
            clearTimeout(reconnectTimer.current);
            esRef.current?.close();
            esRef.current = null;
        };
    // qc is stable — intentionally excluded to prevent reconnecting on re-renders
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoggedIn]);
};

const mutationOptions = (qc) => ({
    onSuccess: (data) => {
        if (data?.data) qc.setQueryData(CART_QUERY_KEY, data.data);
        toast.success(data?.message ?? 'Success');
    },
    onError: (error) => toast.error(getErrorMessage(error)),
});

export const useIsCartMutating = () => useIsMutating({ mutationKey: CART_MUTATION_KEY }) > 1;

const cartMutationOptions = (qc) => ({
    mutationKey: CART_MUTATION_KEY,
    ...mutationOptions(qc),
});

export const useAddToCart = () => {
    const qc = useQueryClient();
    return useMutation({ mutationFn: cartApi.addToCart, ...cartMutationOptions(qc) });
};

export const useRemoveFromCart = () => {
    const qc = useQueryClient();
    return useMutation({ mutationFn: cartApi.removeFromCart, ...cartMutationOptions(qc) });
};

export const useIncrementItem = () => {
    const qc = useQueryClient();
    return useMutation({ mutationFn: cartApi.incrementItem, ...cartMutationOptions(qc) });
};

export const useDecrementItem = () => {
    const qc = useQueryClient();
    return useMutation({ mutationFn: cartApi.decrementItem, ...cartMutationOptions(qc) });
};

export const useClearCart = () => {
    const qc = useQueryClient();
    return useMutation({ mutationFn: cartApi.clearCart, ...cartMutationOptions(qc) });
};
