import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Icon, Comment, Container, Loader } from 'semantic-ui-react';
import moment from 'moment';
import { Link } from 'react-router-dom';

import LikeCommentButton from './LikeCommentButton';
import ReplyButton from './ReplyButton';
import ProfileImage from './ProfileImage';
import DeleteButton from './DeleteButton';
import CommentReply from './CommentReply';
import { GET_PROFILE_QUERY } from '../util/graphql';

function PostComment({ comment, user, id }){
    const username = comment.username;

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

    return (<Comment.Group style={{marginRight: 300 }}>
        <Comment style={{ marginBottom: -10 }} key={comment.id}>
            <Container className={comment.userVerified ? 'comment-border-verified' : 'comment-border'}>
                <ProfileImage profile={profile} size='comment'/>
                <Comment.Content style={{ marginTop: -15 }}>
                    <Comment.Author as={Link} to={`/user/${comment.username}`} style={{ marginTop: 5, marginLeft: 50 }}>{comment.username}{comment.userVerified && (<><span> </span><Icon name='check circle outline' color='blue'/></>)}</Comment.Author>
                    <Comment.Metadata style={{ marginTop: 5 }} as='a'><div>{moment(comment.createdAt).fromNow()}</div></Comment.Metadata>
                    <Comment.Text style={{ marginLeft: 50 }}>{comment.body}</Comment.Text>
                    <Comment.Actions style={{marginLeft: -15}}>
                        <Comment.Action style={{ marginLeft: 50 }}>
                            <LikeCommentButton user={user} post={{id}} comment={comment}/>
                        </Comment.Action>
                        <Comment.Action style={{marginLeft: -25}}>
                            <ReplyButton user={user} post={{id}} comment={comment}/>
                        </Comment.Action>
                        <Comment.Action style={{marginLeft: -20}}>
                            {user && user.username === comment.username && (
                                <DeleteButton postId={id} commentId={comment.id} size='mini'/>
                            )}
                        </Comment.Action>
                    </Comment.Actions>
                </Comment.Content>
            </Container>
            {comment.replies.map(reply => //replies
                <CommentReply reply={reply} comment={comment} user={user} id={id}/>
            )}
        </Comment>
    </Comment.Group>)
}

export default PostComment;