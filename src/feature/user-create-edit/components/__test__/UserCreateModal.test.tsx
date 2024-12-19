import { fireEvent, screen, waitForElementToBeRemoved } from '@testing-library/react';

import fixture from '@/__test__/fixtures/users.3.fixtures.json'
import { renderWithProviders, setupTestServer } from "@/__test__/setup";
import { UserDashboard } from '@/feature/users-list/components/UserDashboard';
import { User } from '@/feature/users-list/userTypes';


const { getServer } = setupTestServer({
    environment: "test"
})

test('should dismiss confirm dialog when cancelled ', async () => {
    const server = getServer()
    const user = fixture[0] as User
    server.create('user', user)

    renderWithProviders(<UserDashboard />);

    const deleteBtn = await screen.findByTestId(`user-delete-btn-${user.id}`);
    fireEvent.click(deleteBtn)


    const dismissBtn = await screen.findByTestId(`user-delete-dismiss-btn-${user.id}`)
    fireEvent.click(dismissBtn)

    await waitForElementToBeRemoved(dismissBtn)

    expect(server.schema.find('user', user.id)).toBeDefined()


});

test('should delete user when confirm delete is clicked ', async () => {
    const server = getServer()
    const user = fixture[0] as User
    server.create('user', user)

    renderWithProviders(<UserDashboard />);

    const deleteBtn = await screen.findByTestId(`user-delete-btn-${user.id}`);
    fireEvent.click(deleteBtn)



    const deleteConfirmBtn = await screen.findByTestId(`user-delete-ok-btn-${user.id}`)
    fireEvent.click(deleteConfirmBtn)


    await waitForElementToBeRemoved(deleteConfirmBtn)

    expect(server.schema.find('user', user.id)).toBeNull()



});

