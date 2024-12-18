import { FC } from "react";
import { FormControl, InputLabel } from "@mui/material";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useFormik } from "formik";
import { withZodSchema } from "formik-validator-zod";

import { useAppDispatch } from "../../../../store/storeHooks";
import userApi from "../../../users-list/userApi";
import { setUserCreateState } from "../../../users-list/userListSlice";
import { CreateUserStateType } from "../../../users-list/userTypes";
import {
  UserCreateFormSchema,
  UserCreateFormSchemaType,
} from "../../form-schema/UserCreateFormSchema";

type UserCreateFormProps = CreateUserStateType;
const { useCreateUserMutation } = userApi;

export const UserCreateForm: FC<UserCreateFormProps> = ({ userEntity }) => {
  const [triggerCreateUser, { isLoading, error }] = useCreateUserMutation();
  const dispatch = useAppDispatch();
  const formik = useFormik<UserCreateFormSchemaType>({
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
      const result = await triggerCreateUser(values);
      if (result.data) {
        dispatch(setUserCreateState());
      }
    },
    validate: withZodSchema(UserCreateFormSchema),
  });

  return (
    <Container component="section">
      <Stack
        component="form"
        title="Create New User"
        onSubmit={(ev) => {
          return formik.handleSubmit(ev);
        }}
        spacing={{ xs: 1, sm: 2 }}
        data-testid={`user-create-form`}
      >
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
              shrink: true,
            },
            htmlInput: {
              max: new Date().toISOString().substring(0, 10),
            },
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
            <MenuItem value={"male"}>Male</MenuItem>
            <MenuItem value={"female"}>Female</MenuItem>
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

        {isLoading ? (
          <CircularProgress />
        ) : (
          <Button
            variant="contained"
            type="submit"
            fullWidth
            disabled={isLoading || !formik.dirty}
          >
            Submit
          </Button>
        )}
      </Stack>
    </Container>
  );
};
