import React from 'react';
import { FormControl, InputLabel, Input, RadioGroup, Radio, FormLabel, FormControlLabel } from '@mui/material';
import { USER_ROLES } from '../../global';

const Signup = () => {
    return (
        <FormControl>
            <InputLabel htmlFor="first-name" required>First Name</InputLabel>
            <Input id="first-name" aria-describedby="user's first name" />
            <InputLabel htmlFor="last-name" required>Last Name</InputLabel>
            <Input id="last-name" aria-describedby="user's last name" />

            <FormLabel id="role-radio-buttons-group-label">Role</FormLabel>
  <RadioGroup
    aria-labelledby="role-radio-buttons-group-label"
    defaultValue={USER_ROLES.trainee}
    name="role"
  >
    <FormControlLabel value={USER_ROLES.trainee} control={<Radio />} label={USER_ROLES.trainee} />
    <FormControlLabel value={USER_ROLES.coach} control={<Radio />} label={USER_ROLES.trainee} />
  </RadioGroup>

            <InputLabel htmlFor="role" required>Role</InputLabel>
            <Input id="role" aria-describedby="user's role (trainee or coach)" />
            <InputLabel htmlFor="email" required>Email</InputLabel>
            <Input id="email" aria-describedby="user's email" />
            <InputLabel htmlFor="role" required>Password</InputLabel>
            <Input id="password" aria-describedby="user's password" />
            <FormHelperText id="password-helper-text">Must contain...</FormHelperText>
        </FormControl>
    );
}


export default Signup;

