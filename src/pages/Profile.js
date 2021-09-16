import React, { useContext } from 'react';

import UploadForm from '../components/UploadForm';
import { AuthContext } from '../context/auth';

function Profile(props){
    const { user } = useContext(AuthContext);
    
    const path = window.location.pathname.split('/')[2];
    if(!user || user.username !== path) {
        props.history.push('/');
    }

    return (
        <div>
            <h1>{path}'s profile</h1>
            <UploadForm />
        </div>
    )
}

export default Profile;