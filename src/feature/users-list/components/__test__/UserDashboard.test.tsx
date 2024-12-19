import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import { Response } from "miragejs";

import fixture from '@/__test__/fixtures/users.3.fixtures.json'
import { renderWithProviders, setupTestServer } from "@/__test__/setup";

import { UserDashboard } from "../UserDashboard";
import { User } from '../../userTypes';


const { getServer } = setupTestServer({
    environment: "test"
})

test('should render error if get users api fails', async () => {
    const server = getServer()
    server.get("/users", () => {
        return new Response(500, {}, { errors: ["something went wrong"] })
    })

    renderWithProviders(<UserDashboard />);

    await screen.findByText('Ooops, something went wrong');


});

test('should render data in data grid after successful load', async () => {
    const server = getServer()
    server.create('user', fixture[0] as User)
    server.create('user', fixture[1] as User)

    renderWithProviders(<UserDashboard />);

    const gridElement = screen.getByTestId('scrollable-grid');
    expect(gridElement).toBeInTheDocument();

    await screen.findByTestId('data-grid-loading-overlay');

    await waitForElementToBeRemoved(() => screen.queryByTestId('data-grid-loading-overlay'));

    expect(screen.getByText('Florence Volkman')).toBeInTheDocument();
    expect(screen.getByText('Singapore')).toBeInTheDocument();

    expect(screen.getByText('Date of Birth')).toBeVisible();
    expect(screen.getByText('10 Oct 1993')).toBeVisible();

});





