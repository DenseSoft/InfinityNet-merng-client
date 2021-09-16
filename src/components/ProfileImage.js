import { Icon, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import profileIconIndex from '../util/profileIconIndex';
import profileColorIndex from '../util/profileColorIndex';

function ProfileImage({profile, size}){
    // const for now
    const profileCircleColor = 0;

    const profileCircleColorIndex = ['profile-circle-default', 'profile-circle-gold'];
    const profileCircle = profileCircleColorIndex[profileCircleColor];
    const profileIcon = profileIconIndex[profile.profileIcon];
    const profileColor = profileColorIndex[profile.profileColor];

    if(size && size === 'big'){
        return (
            <Image as={Link} to={`/profile/${profile.username}`} floated='right'>
                <Icon className='profile-icon-big' color={profileColor} name={profileIcon}/>
                <Icon className={`${profileCircle}-big`}/>
            </Image>
        )
    } else if(size === 'comment'){
        return (
            <Image as={Link} to={`/profile/${profile.username}`}>
                <Icon className='profile-icon-comment' color={profileColor} name={profileIcon}/>
                <Icon className={`${profileCircle}-comment`}/>
            </Image>
        )
    } else if(size === 'reply'){
        return (
            <Image as={Link} to={`/profile/${profile.username}`}>
                <Icon className='profile-icon-reply' color={profileColor} name={profileIcon}/>
                <Icon className={`${profileCircle}-reply`}/>
            </Image>
        )
    }

    return (
        <Image as={Link} to={`/profile/${profile.username}`} floated='right'>
            <Icon className='profile-icon' color={profileColor} name={profileIcon}/>
            <Icon className={profileCircle}/>
        </Image>
    )
}

export default ProfileImage;