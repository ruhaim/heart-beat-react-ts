import { fireEvent, screen, waitForElementToBeRemoved } from '@testing-library/react';

import fixture from '@/__test__/fixtures/users.3.fixtures.json'
import { renderWithProviders, setupTestServer } from "@/__test__/setup";
import { UserDashboard } from '@/feature/users-list/components/UserDashboard';
import { User } from '@/feature/users-list/userTypes';
import { Response } from 'miragejs';


const { getServer } = setupTestServer({
    environment: "test"
})

test('should dismiss confirm dialog when cancelled ', async () => {
    const server = getServer()
    const user = fixture[0] as User
    server.create('user', user)

    renderWithProviders(<UserDashboard />);

    await screen.findByTestId(`user-delete-btn-${user.id}`);

    const deleteBtn = screen.getByTestId(`user-delete-btn-${user.id}`)
    fireEvent.click(deleteBtn)

    await screen.findByTestId(`user-delete-confirm-${user.id}`);

    const dismissBtn = screen.getByTestId(`user-delete-dismiss-btn-${user.id}`)
    fireEvent.click(dismissBtn)

    await waitForElementToBeRemoved(dismissBtn);

    expect(server.schema.find('user', user.id)).toBeDefined()

});

test('should delete and dismiss confirm dialog when user is deleted ', async () => {
    const server = getServer()
    const user = fixture[0] as User
    server.create('user', user)

    renderWithProviders(<UserDashboard />);

    await screen.findByTestId(`user-delete-btn-${user.id}`);

    const deleteBtn = screen.getByTestId(`user-delete-btn-${user.id}`)
    fireEvent.click(deleteBtn)

    await screen.findByTestId(`user-delete-confirm-${user.id}`);

    const confirmDeleteBtn = screen.getByTestId(`user-delete-ok-btn-${user.id}`)
    fireEvent.click(confirmDeleteBtn)

    await waitForElementToBeRemoved(confirmDeleteBtn);

    expect(server.schema.find('user', user.id)).toBeNull()

});


test('should show error when delete api fails', async () => {
    const server = getServer()
    const user = fixture[0] as User
    server.create('user', user)
    server.delete(`users/${user.id}`, () => {
        return new Response(500, {}, { errors: ["something went wrong"] })
    })

    renderWithProviders(<UserDashboard />);

    await screen.findByTestId(`user-delete-btn-${user.id}`);


    const deleteBtn = screen.getByTestId(`user-delete-btn-${user.id}`)
    fireEvent.click(deleteBtn)

    await screen.findByTestId(`user-delete-confirm-${user.id}`);

    const confirmDeleteBtn = screen.getByTestId(`user-delete-ok-btn-${user.id}`)
    fireEvent.click(confirmDeleteBtn)

    await screen.findByTestId(`user-delete-api-error-${user.id}`);

    expect(server.schema.find('user', user.id)).toBeDefined()


});

