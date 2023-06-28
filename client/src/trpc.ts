import { AppRouter } from '../../server/src/routers/appRouter';
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import { getToken } from './redux/store';

const API_URL = import.meta.env.VITE_API_URL;

export const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: API_URL + '/trpc',
      headers() {
        const token = getToken();
        if (token) {
            return {
              authorization: `Bearer ${token}`,
            };
        } else { return {}; }
      },
    }),
  ],

});

export type TRPCError = { message: string; };