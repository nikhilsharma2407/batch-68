import { useMutation, useIsMutating, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { axiosInstance, ENDPOINTS } from '../apiUtil';
import useIsLoggedIn from './useIsLoggedIn';

export const CART_QUERY_KEY = ['cart'];
const CART_MUTATION_KEY = ['cart-mutation'];

const cartApi = {
    getCart: () => axiosInstance.get(ENDPOINTS.CART.GET).then(r => r.data.cart),
    addToCart: (product) => axiosInstance.post(ENDPOINTS.CART.ADD, { product }).then(r => r.data),
    removeFromCart: ({ id, title }) => axiosInstance.delete(ENDPOINTS.CART.REMOVE, { data: { id, title } }).then(r => r.data),
    incrementItem: (product) => axiosInstance.patch(ENDPOINTS.CART.INCREMENT, { product }).then(r => r.data),
    decrementItem: (product) => axiosInstance.patch(ENDPOINTS.CART.DECREMENT, { product }).then(r => r.data),
    clearCart: () => axiosInstance.delete(ENDPOINTS.CART.CLEAR).then(r => r.data),
};

const getErrorMessage = (error) =>
    error?.response?.data?.message ?? error?.message ?? 'Something went wrong';

export const useGetCart = () => {
    const isLoggedIn = useIsLoggedIn();
    return useQuery({
        queryKey: CART_QUERY_KEY,
        queryFn: cartApi.getCart,
        refetchInterval: 5000,
        enabled: !!isLoggedIn,
    });
};

const mutationOptions = (qc) => ({
    onSuccess: (data) => {
        if (data?.data) qc.setQueryData(CART_QUERY_KEY, data.data);
        toast.success(data?.message ?? 'Success');
    },
    onError: (error) => toast.error(getErrorMessage(error)),
});

// returns true if any cart mutation is currently in flight
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
