import React, { useContext } from 'react'
import { Button, Card, Icon, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import { AuthContext } from '../context/auth';
import LikeButton from './LikeButton';
import DeleteButton from './DeleteButton';

function PostCard({
        post: { username, body, createdAt, userVerified, id, likeCount, commentCount, comments, likes }
  }) {
    const { user } = useContext(AuthContext);
    
    function commentPost(){
        console.log('Comment Post');
    }

    return(
        <Card fluid className={userVerified ? 'post-card-verified' : 'post-card'}>
            <Card.Content as={Link} to={`/post/${id}`}>
                <Image as={Link} to={`/user/${username}`} floated='right' size='mini' src='https://www.flaticon.com/svg/static/icons/svg/3135/3135715.svg'/>
                <Card.Header  as={Link} to={`/user/${username}`}>{username}{userVerified && (<><span> </span><Icon name='check circle outline' color='blue'/></>)}</Card.Header>
                <Card.Meta as={Link} to={`/post/${id}`}>{moment(createdAt).fromNow()}</Card.Meta>
                <Card.Description>{body}</Card.Description>
            </Card.Content>
            <Card.Content extra>
                <LikeButton user={user} post={{ id, likes, likeCount }}/>
                <Button as={Link} to={`/post/${id}`} className='comment-button' basic color='blue' size='mini' onClick={commentPost}>
                    <Icon name='comment' /> {commentCount}
                </Button>
                {user && user.username === username && <DeleteButton size='mini' postId={id}/>}
            </Card.Content>
        </Card>
    )
}

export default PostCard;