import { fireEvent, screen } from '@testing-library/react';

import fixture from '@/__test__/fixtures/users.3.fixtures.json'
import { renderWithProviders, setupTestServer } from "@/__test__/setup";
import { User } from "../../userTypes";
import { UserDashboard } from "../UserDashboard";


const { getServer } = setupTestServer({
    environment: "test"
})

test('should enter edit mode when edit button is clicked', async () => {
    const server = getServer()
    const user = fixture[0] as User
    server.create('user', user)

    renderWithProviders(<UserDashboard />);

    await screen.findByTestId(`user-edit-btn-${user.id}`);


    const editBtn = screen.getByTestId(`user-edit-btn-${user.id}`)
    fireEvent.click(editBtn)

    await screen.findByTestId(`user-edit-form-${user.id}`);


});

test('should show confirmation dialog when user delete button clicked', async () => {
    const server = getServer()
    const user = fixture[0] as User
    server.create('user', user)

    renderWithProviders(<UserDashboard />);

    await screen.findByTestId(`user-delete-btn-${user.id}`);


    const editBtn = screen.getByTestId(`user-delete-btn-${user.id}`)
    fireEvent.click(editBtn)

    await screen.findByTestId(`user-delete-confirm-${user.id}`);


});





