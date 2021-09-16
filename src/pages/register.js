import React, { useContext, useState } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { useMutation } from '@apollo/react-hooks';

import { AuthContext } from '../context/auth';
import { useForm } from '../util/hooks';
import { REGISTER_USER } from '../util/graphql';

function Register(props){
    const context = useContext(AuthContext);
    const [errors, setErrors] = useState({});

    const { onChange, onSubmit, values } = useForm(registerUser, {
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [addUser, { loading }] = useMutation(REGISTER_USER, {
        update(_, { data: { register: userData }}){
            context.login(userData);
            props.history.push('/');
        },
        onError(err){
            setErrors(err.graphQLErrors[0].extensions.exception.errors);
        },
        variables: values
    });

    function registerUser(){
        addUser();
    }

    return (
        <div>
            <Form onSubmit={onSubmit} noValidate loading={loading}>
                <h1 className='register-page-title'>Register</h1>
                <Form.Input required
                    label='Username'
                    placeholder='Username'
                    name='username'
                    value={values.username}
                    error={errors.username ? true : false}
                    onChange={onChange}
                    width='8'
                    type='text'
                />
                <Form.Input required
                    label='Email'
                    placeholder='Email'
                    name='email'
                    value={values.email}
                    error={errors.email ? true : false}
                    onChange={onChange}
                    width='8'
                    type='email'
                />
                <Form.Input required
                    label='Password'
                    placeholder='Password'
                    name='password'
                    value={values.password}
                    error={errors.password ? true : false}
                    onChange={onChange}
                    width='8'
                    type='password'
                />
                <Form.Input required
                    label='Confirm Password'
                    placeholder='Confirm Password'
                    name='confirmPassword'
                    value={values.confirmPassword}
                    error={errors.confirmPassword ? true : false}
                    onChange={onChange}
                    width='8'
                    type='password'
                />
                <Button basic primary type="submit" className='register-submit-button'>
                    Register
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

export default Register;