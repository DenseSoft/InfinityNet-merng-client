import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import { Button, Icon } from 'semantic-ui-react';

import { LIKE_COMMENT_MUTATION, FETCH_POST_QUERY } from '../util/graphql';

function LikeCommentButton({ user, post: { id }, comment}){
    const [liked, setLiked] = useState(false);

    useEffect(() => {
        if(user && comment.likes.find(like => like.username === user.username)){
            setLiked(true);
        } else {
            setLiked(false);
        }
    }, [user, comment.likes]);

    const [likeComment] = useMutation(LIKE_COMMENT_MUTATION, {
        variables: {
            postId: id,
            commentId: comment.id 
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
            <Button className='like-comment-button' onClick={likeComment} size='mini'>
                    <Icon name='heart'/> {comment.likeCount}
            </Button>
        ) : (
            <Button className='like-comment-button' onClick={likeComment} size='mini'>
                <Icon name='heart outline'/> {comment.likeCount}
            </Button>
        )
    ) : (
        <Button className='like-comment-button' as={Link} to='/login' size='mini'>
            <Icon name='heart'/> {comment.likeCount}
        </Button>
    )

    return likeButton;
}

export default LikeCommentButton;