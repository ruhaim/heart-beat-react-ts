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
    name: z.string().trim().min(1, { message: "Name is required" }),
    email: z.string().email({ message: "Email is required" }),
    gender: z.union([z.literal("male"), z.literal("female")]),
    dob: z.string().date().refine((value) => {
        const diff = new Date().getTime() - new Date(value).getTime()
        return diff > 0
    }, "Date of birth cannot be a future date"),
    city: z.string().trim().min(1, { message: "City is required" }),
    mobile: z.string().trim().min(1, { message: "Mobile is required" }),
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
            ...userEntity,
        },
        onSubmit: (values) => {
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
                return formik.handleSubmit(ev)
            }} spacing={{ xs: 1, sm: 2 }}>
                <Typography variant="h6">Edit User</Typography>
                <TextField
                    id="name"
                    type="text"
                    label="Name"
                    placeholder="Name"
                    fullWidth
                    {...formik.getFieldProps("name")}
                    error={!!formik.errors.name && formik.touched.name}
                    helperText={formik.errors.name}
                />
                <TextField
                    id="dob"
                    type="date"
                    label="Date of Birth"
                    fullWidth
                    {...formik.getFieldProps("dob")}
                    error={!!formik.errors.dob && formik.touched.dob}
                    helperText={formik.errors.dob}
                    slotProps={{
                        htmlInput: {
                            max: new Date().toISOString().substring(0, 10)
                        }
                    }}
                />
                <TextField
                    id="email"
                    type="email"
                    label="Email"
                    placeholder="johndoe@example.com"
                    fullWidth
                    {...formik.getFieldProps("email")}
                    error={!!formik.errors.email && formik.touched.email}
                    helperText={formik.errors.email}
                />

                <TextField
                    id="city"
                    type="city"
                    label="City"
                    placeholder="City"
                    fullWidth
                    {...formik.getFieldProps("city")}
                    error={!!formik.errors.city && formik.touched.city}
                    helperText={formik.errors.city}
                />
                <TextField
                    id="gender"
                    type="text"
                    label="Gender"
                    placeholder="Gender"
                    fullWidth
                    {...formik.getFieldProps("gender")}
                    error={!!formik.errors.gender && formik.touched.gender}
                    helperText={formik.errors.gender}
                />

                <Button variant="contained" type="submit" fullWidth>
                    Submit
                </Button>
            </Stack>
        </Container>
    );
}