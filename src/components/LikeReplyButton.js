import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import { Button, Icon } from 'semantic-ui-react';

import { LIKE_REPLY_MUTATION, FETCH_POST_QUERY } from '../util/graphql';

function LikeReplyButton({ user, post: { id }, comment, reply}){
    const [liked, setLiked] = useState(false);

    useEffect(() => {
        if(user && reply.likes.find(like => like.username === user.username)){
            setLiked(true);
        } else {
            setLiked(false);
        }
    }, [user, reply.likes]);

    console.log(reply);

    const [likeReply] = useMutation(LIKE_REPLY_MUTATION, {
        variables: {
            postId: id,
            commentId: comment.id,
            replyId: reply.id
        },
        refetchQueries: [{
            query: FETCH_POST_QUERY,
            variables: {
                postId: id
            }
        }]
    });

    const likeButton = user ? (
        liked ? (
            <Button className='like-comment-button' onClick={likeReply} size='mini'>
                    <Icon name='heart'/> {reply.likeCount}
            </Button>
        ) : (
            <Button className='like-comment-button' onClick={likeReply} size='mini'>
                <Icon name='heart outline'/> {reply.likeCount}
            </Button>
        )
    ) : (
        <Button className='like-comment-button' as={Link} to='/login' size='mini'>
            <Icon name='heart'/> {reply.likeCount}
        </Button>
    )

    return likeButton;
}

export default LikeReplyButton;