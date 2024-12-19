import '@testing-library/jest-dom';

import { ReactNode } from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { afterEach } from 'vitest';

import userListSlice from '../feature/users-list/userListSlice';
import { makeServer, MakeServerParams } from '../server';
import { apiSlice } from '../store/apiSlice';

export const setupTestServer = (params?: MakeServerParams) => {
    let server: ReturnType<typeof makeServer>;

    beforeEach(() => {
        server = makeServer({ ...params })
        server.logging = false;
    });

    afterEach(() => {
        server?.shutdown();
        console.log("Shutting down")
    });
    return { getServer: () => server }
};


export const createTestStore = () => {
    return configureStore({
        reducer: {
            [userListSlice.reducerPath]: userListSlice.reducer,
            [apiSlice.reducerPath]: apiSlice.reducer,
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(apiSlice.middleware),
    });
};


export const renderWithProviders = (ui: ReactNode, { store = createTestStore() } = {}) => {
    return render(<Provider store={store} > {ui} </Provider>);
};

