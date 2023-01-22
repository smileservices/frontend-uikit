import React, {Fragment} from "react"
import {Input, Checkbox} from "../../../components/form";

export const FORM_INITIAL_STATE = {
    data: {
        email: "",
        password: "",
        remember_me: false
    },
    errors: {}
}

export function validateLoginForm(data) {
    if (data.password.length < 5) {
        return {password: "The password cannot be less than 5 chars."};
    }
}

function LoginForm(state, dispatch) {
    const waiting = false;

    const handleChange = (e) => {
        dispatch({
            type: "CHANGE_INPUT",
            payload: {name: e.target.name, value: e.target.value},
        });
    };

    const handleChangeCheckbox = (e) => {
        dispatch({
            type: "CHANGE_INPUT",
            payload: {name: e.target.name, value: e.target.checked},
        });
    };

    return (
        <Fragment>
            <div className="column-container">
                <p>Sign in using identity providers:</p>
                <button className="btn block social-login google">Google</button>
                <button className="btn block social-login facebook">Facebook</button>
                <button className="btn block social-login linkedin">LinkedIn</button>
            </div>
            <p>Or just use username and password:</p>
            <Input
                name="email"
                label="Email"
                inputProps={{
                    value: state.data.email,
                    type: 'email',
                    disabled: Boolean(waiting),
                    required: true,
                    placeholder: "your email",
                    onChange: handleChange
                }}
                error={state.errors.email}
            />
            <Input
                name="password"
                label="Password"
                smallText="Password must be at least 5 characters."
                inputProps={{
                    value: state.data.password,
                    type: 'password',
                    disabled: Boolean(waiting),
                    required: true,
                    placeholder: "your password",
                    onChange: handleChange
                }}
                error={state.errors.password}
            />
            <Checkbox
                inputProps={{checked: state.data.remember_me, onChange: handleChangeCheckbox}}
                name="remember_me"
                label="Remember me"
                smallText="Check it for remembering your authentication on this device."
                error={state.errors.remember_me}
            />
        </Fragment>
    )
}

export default LoginForm;