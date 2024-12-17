import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useFormik } from "formik";
import { withZodSchema } from "formik-validator-zod";
import { z } from "zod";
import { FC } from 'react';
import { CreateUserStateType } from '../users-list/userTypes';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import userApi from '../users-list/userApi';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { FormControl, InputLabel } from '@mui/material';
import { setUserCreateState } from '../users-list/userListSlice';
import { useAppDispatch } from '../../store/storeHooks';

const UseEditFormSchema = z.object({
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
type UserCreateFormProps = CreateUserStateType

export const UserCreateForm: FC<UserCreateFormProps> = ({ userEntity }) => {
    const [triggerCreateUser, { isLoading, error }] = userApi.useCreateUserMutation()
    const dispatch = useAppDispatch()
    const formik = useFormik<RegisterFormSchemaType>({
        initialValues: {
            name: "",
            dob: "",
            email: "",
            gender: "male",
            city: "",
            mobile: "",
            ...userEntity,
        },
        onSubmit: async (values) => {
            try {
                const rr = await triggerCreateUser(values)
                console.log({ rr })
                dispatch(setUserCreateState())
            } catch (e) {
                console.log({ e })
            }

        },
        validate: withZodSchema(UseEditFormSchema),
    });
    console.log({ data: formik.values, errors: formik.errors })

    return (
        <Container component='section'>
            <Stack component="form" title='Edit User' onSubmit={(ev) => {
                return formik.handleSubmit(ev)
            }} spacing={{ xs: 2, sm: 3 }}>
                <Typography variant="h6">Create User</Typography>
                {error && <Alert severity="error">Ooops, something went wrong</Alert>}
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
                        inputLabel: {
                            shrink: true
                        },
                        htmlInput: {
                            max: new Date().toISOString().substring(0, 10),

                        }
                    }}
                />

                <FormControl>
                    <InputLabel id="gender-label">Age</InputLabel>
                    <Select
                        labelId="gender-label"
                        id="gender"
                        label="Age"
                        {...formik.getFieldProps("gender")}
                    >
                        <MenuItem value={'male'}>Male</MenuItem>
                        <MenuItem value={'female'}>Female</MenuItem>
                    </Select>
                </FormControl>
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
                    id="mobile"
                    type="tel"
                    label="Telephone"
                    placeholder=""
                    fullWidth
                    {...formik.getFieldProps("mobile")}
                    error={!!formik.errors.mobile && formik.touched.mobile}
                    helperText={formik.errors.mobile}
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


                {isLoading ? <CircularProgress /> : <Button variant="contained" type="submit" fullWidth disabled={isLoading || !formik.dirty}>
                    Submit
                </Button>}

            </Stack>
        </Container >
    );
}