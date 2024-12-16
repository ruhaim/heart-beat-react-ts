import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useFormik } from "formik";
import { withZodSchema } from "formik-validator-zod";
import { z } from "zod";
import { FC } from 'react';
import { EditUserStateType } from '../users-list/userTypes';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';

const UseEditFormSchema = z.object({
    id: z.string(),
    name: z.string(),
    email: z.string().email(),
    gender: z.union([z.literal("male"), z.literal("female")]),
    dob: z.string(),
    city: z.string(),
    mobile: z.string(),
})

type RegisterFormSchemaType = z.infer<typeof UseEditFormSchema>;
type UserEditFormProps = EditUserStateType

export const UserEditForm: FC<UserEditFormProps> = ({ userId, userEntity }) => {
    const formik = useFormik<RegisterFormSchemaType>({
        initialValues: {
            id: userId,
            name: "",
            dob: "",
            email: "",
            gender: "male",
            city: "",
            mobile: "",
            ...userEntity
        },
        onSubmit: (values) => {
            debugger
            alert(JSON.stringify(values));
        },
        validate: withZodSchema(UseEditFormSchema),
    });
    console.log(
        `Values : ${JSON.stringify(formik.values)}\n\nerrors : ${JSON.stringify(
            formik.errors
        )}\n\n`
    );
    return (
        <Container component='section'>
            <Stack component="form" title='Edit User' onSubmit={(ev) => {
                debugger
                return formik.handleSubmit(ev)
            }} spacing={{ xs: 1, sm: 2 }}>
                <Typography variant="h6">Edit User</Typography>
                <TextField
                    id="name"
                    type="text"
                    label="Name"
                    placeholder="Name"
                    fullWidth
                    error={!!formik.errors.name && formik.touched.name}
                    {...formik.getFieldProps("name")}
                />
                {formik.errors.name && formik.touched.name && (
                    <div >
                        {formik.errors.name}
                    </div>
                )}
                <TextField
                    id="dob"
                    type="date"
                    label="Date of Birth"
                    fullWidth
                    {...formik.getFieldProps("dob")}
                />
                {formik.errors.dob && formik.touched.dob && (
                    <div>
                        {formik.errors.dob}
                    </div>
                )}
                <TextField
                    id="email"
                    type="email"
                    label="Email"
                    placeholder="johndoe@example.com"
                    fullWidth
                    {...formik.getFieldProps("email")}
                />
                {formik.errors.email && formik.touched.email && (
                    <div>
                        {formik.errors.email}
                    </div>
                )}
                <TextField
                    id="city"
                    type="city"
                    label="City"
                    placeholder="City"
                    fullWidth
                    {...formik.getFieldProps("city")}
                />
                {formik.errors.city && formik.touched.city && (
                    <div>
                        {formik.errors.city}
                    </div>
                )}
                <TextField
                    id="gender"
                    type="text"
                    label="Gender"
                    placeholder="Gender"
                    fullWidth
                    {...formik.getFieldProps("gender")}
                />
                {formik.errors.gender && formik.touched.gender && (
                    <div>
                        {formik.errors.gender}
                    </div>
                )}
                <Button variant="contained" type="submit" fullWidth>
                    Submit
                </Button>
            </Stack>
        </Container>
    );
}