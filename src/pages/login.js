import React, { useContext, useState } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { useMutation } from '@apollo/react-hooks';

import { AuthContext } from '../context/auth';
import { useForm } from '../util/hooks';
import { LOGIN_USER } from '../util/graphql';

function Login(props){
    const context = useContext(AuthContext);
    const [errors, setErrors] = useState({});

    const { onChange, onSubmit, values } = useForm(loginUserCallback, {
        username: '',
        password: ''
    });

    const [loginUser, { loading }] = useMutation(LOGIN_USER, {
        update(_, { data: { login: userData }}){
            context.login(userData);
            props.history.push('/');
        },
        onError(err){
            setErrors(err.graphQLErrors[0].extensions.exception.errors);
        },
        variables: values
    });

    function loginUserCallback() {
        loginUser();
    };

    return (
        <div>
            <Form onSubmit={onSubmit} noValidate loading={loading}>
                <h1 className='register-page-title'>Login</h1>
                <Form.Input required
                    label='Username'
                    placeholder='Username'
                    name='username'
                    value={values.username}
                    onChange={onChange}
                    width='8'
                    type='text'
                />
                <Form.Input required
                    label='Password'
                    placeholder='Password'
                    name='password'
                    value={values.password}
                    onChange={onChange}
                    width='8'
                    type='password'
                />
                <Button basic primary type="submit" className='register-submit-button'>
                    Login
                </Button>
            </Form>
            {Object.keys(errors).length > 0 && (
                <div className='ui error message'>
                <ul className='list'>
                    {Object.values(errors).map((value) => (
                        <li key={value}>{value}</li>
                    ))}
                </ul>
            </div>
            )}
        </div>
    )
}

export default Login;