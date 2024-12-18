import { fireEvent, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';

import fixture from '../../../__test__/fixtures/users.3.fixtures.json'
import { renderWithProviders, setupTestServer } from "../../../__test__/setup";
import { UserDashboard } from '../../users-list/components/UserDashboard';
import { User } from '../../users-list/userTypes';


const { getServer } = setupTestServer({
    environment: "test"
})

test('should dismiss confirm dialog when cancelled ', async () => {
    const server = getServer()
    const user = fixture[0] as User
    server.create('user', user)

    renderWithProviders(<UserDashboard />);

    await waitFor(() => screen.getByTestId(`user-delete-btn-${user.id}`));


    const editBtn = screen.getByTestId(`user-delete-btn-${user.id}`)
    fireEvent.click(editBtn)

    await waitFor(() => screen.getByTestId(`user-delete-confirm-${user.id}`));

    const dismissBtn = screen.getByTestId(`user-delete-dismiss-btn-${user.id}`)
    fireEvent.click(dismissBtn)

    // await waitForElementToBeRemoved(() => screen.getByTestId(`user-delete-dismiss-btn-${user.id}`));


});

