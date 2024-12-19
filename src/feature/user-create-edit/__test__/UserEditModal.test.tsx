import { fireEvent, screen, waitForElementToBeRemoved } from '@testing-library/react';

import fixture from '@/__test__/fixtures/users.3.fixtures.json'
import { renderWithProviders, setupTestServer } from "@/__test__/setup";
import { UserDashboard } from '@/feature/users-list/components/UserDashboard';
import { User } from '@/feature/users-list/userTypes';

const { getServer } = setupTestServer({
    environment: "test"
})

test('should update user when user details updated', async () => {
    const server = getServer()
    const user = fixture[0] as User
    server.create('user', user)

    renderWithProviders(<UserDashboard />);
    await screen.findByTestId(`user-edit-btn-${user.id}`);

    const editBtn = screen.getByTestId(`user-edit-btn-${user.id}`)
    fireEvent.click(editBtn)

    await screen.findByTestId(`user-edit-form-${user.id}`);

    const form = screen.getByTestId(`user-edit-form-${user.id}`)

    const userIdInput = await screen.findByLabelText<HTMLInputElement>("User Id")
    const nameInput = await screen.findByLabelText<HTMLInputElement>("Name")
    const dobInput = await screen.findByLabelText<HTMLInputElement>("Date of Birth")
    const genderInput = await screen.findByLabelText<HTMLDivElement>("Gender")
    const emailInput = await screen.findByLabelText<HTMLInputElement>("Email")
    const mobileInput = await screen.findByLabelText<HTMLInputElement>("Mobile")
    const cityInput = await screen.findByLabelText<HTMLInputElement>("City")
    const savebtn = await screen.findByText<HTMLButtonElement>("Submit")


    expect(userIdInput.disabled).toBeTruthy()
    expect(userIdInput.value).toBe(user.id)
    expect(nameInput.value).toBe(user.name)
    expect(dobInput.value).toBe(user.dob)
    expect(genderInput).toBeDefined()
    expect(emailInput.value).toBe(user.email)
    expect(mobileInput.value).toBe(user.mobile)
    expect(cityInput.value).toBe(user.city)
    expect(savebtn.disabled).toBeTruthy()


    fireEvent.change(nameInput, { target: { value: `${user.name}2` } })

    expect(savebtn.disabled).toBeFalsy()

    fireEvent.click(savebtn)

    await waitForElementToBeRemoved(() => screen.queryByTestId(`user-edit-form-${user.id}`));

    expect(server.schema.find('user', user.id)?.attrs.name).toEqual(`${user.name}2`)

});
