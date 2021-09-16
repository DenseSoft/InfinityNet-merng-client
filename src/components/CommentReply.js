import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Icon, Comment, Loader } from 'semantic-ui-react';
import moment from 'moment';
import { Link } from 'react-router-dom';

import LikeReplyButton from './LikeReplyButton';
import ProfileImage from './ProfileImage';
import DeleteButton from './DeleteButton';
import { GET_PROFILE_QUERY } from '../util/graphql';

function CommentReply({ reply, comment, user, id }) {
    const username = reply.username;

    //get all profile data
    const { loading, data: { getProfile: profile } = {}} = useQuery(GET_PROFILE_QUERY, {
        variables: {
            username
        }
    });
    
    //return loader untill loaded
    if(loading){
        return (
            <Loader active inline='centered' size='large'/>
        )
    }

    return (
        <Comment.Group style={{marginTop: -5, marginBottom: -15}}>
            <Comment key={reply.id} style={{ marginTop: -20, marginBottom: -10 }}>
                <ProfileImage profile={profile} size='reply'/>
                <Comment.Content>
                    <Comment.Author as={Link} to={`/user/${reply.username}`} style={{ marginTop: 5, marginLeft: 50 }}>{reply.username}{reply.userVerified && (<><span> </span><Icon name='check circle outline' color='blue'/></>)}</Comment.Author>
                    <Comment.Metadata style={{ marginTop: 5 }} as='a'><div>{moment(reply.createdAt).fromNow()}</div></Comment.Metadata>
                    <Comment.Text style={{ marginLeft: 50 }}>{reply.body}</Comment.Text>
                    <Comment.Actions style={{marginLeft: -15}}>
                        <Comment.Action style={{ marginLeft: 50 }}>
                            <LikeReplyButton user={user} post={{id}} comment={comment} reply={reply}/>
                        </Comment.Action>
                        <Comment.Action style={{marginTop: -10}}>
                            {user && user.username === reply.username && (
                                <DeleteButton postId={id} commentId={comment.id} replyId={reply.id} size='mini'/>
                            )}
                        </Comment.Action>
                    </Comment.Actions>
                </Comment.Content>
            </Comment>
        </Comment.Group>
    )
}

export default CommentReply;