import React, { useContext } from 'react'
import { Button, Card, Icon, Loader } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { useQuery } from '@apollo/react-hooks';

import ProfileImage from './ProfileImage';
import { AuthContext } from '../context/auth';
import LikeButton from './LikeButton';
import DeletePostButton from './DeletePostButton';
import { GET_PROFILE_QUERY } from '../util/graphql';

function PostCard({
        post: { username, body, createdAt, id, likeCount, commentCount, likes, comments }
  }) {
    const { user } = useContext(AuthContext);

    //get all profile data
    const { loading, data: { getProfile: profile } = {}} = useQuery(GET_PROFILE_QUERY, {
        variables: {
            username
        }
    });

    var commentReplyCount = commentCount;
    comments.map((comment) => (
        commentReplyCount = commentReplyCount + comment.replyCount
    ))
    
    //return loader untill loaded
    if(loading){
        return (
            <Loader active inline='centered' size='large'/>
        )
    }

    return(
        <Card fluid className={profile.verified ? 'post-card-verified' : 'post-card'}>
            <Card.Content as={Link} to={`/post/${username}/${id}`}>
                <ProfileImage profile={profile}/>
                <Card.Header as={Link} to={`/profile/${username}`}>{username}{profile.verified && (<><span> </span><Icon name='check circle outline' color='blue'/></>)}</Card.Header>
                <Card.Meta as={Link} to={`/post/${username}/${id}`}>{moment(createdAt).fromNow()}</Card.Meta>
                <Card.Description className='card-description'>{body}</Card.Description>
            </Card.Content>
            <Card.Content extra>
                <LikeButton user={user} post={{ id, likes, likeCount }}/>
                <Button as={Link} to={`/post/${username}/${id}`} className='comment-button' basic color='blue' size='mini'>
                    <Icon name='comment' /> {commentReplyCount}
                </Button>
                {user && user.username === username && <DeletePostButton size='mini' postId={id} sortType={0}/>}
            </Card.Content>
        </Card>
    )
}

export default PostCard;