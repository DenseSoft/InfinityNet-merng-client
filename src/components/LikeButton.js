import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import { Button, Icon } from 'semantic-ui-react';
import gql from 'graphql-tag';

function LikeButton({ user, post: { id, likeCount, likes }}){
    const [liked, setLiked] = useState(false);

    useEffect(() => {
        if(user && likes.find(like => like.username === user.username)){
            setLiked(true);
        } else {
            setLiked(false);
        }
    }, [user, likes]);

    const [likePost] = useMutation(LIKE_POST_MUTATION, {
        variables: { postId: id}
    });

    const likeButton = user ? (
        liked ? (
            <Button color='red' onClick={likePost} size='mini'>
                    <Icon name='heart'/> {likeCount}
            </Button>
        ) : (
            <Button basic color='red' onClick={likePost} size='mini'>
                <Icon name='heart'/> {likeCount}
            </Button>
        )
    ) : (
        <Button as={Link} to='/login' basic color='red' onClick={likePost} size='mini'>
            <Icon name='heart'/> {likeCount}
        </Button>
    )

    return likeButton;
}

const LIKE_POST_MUTATION = gql`
    mutation likePost($postId: ID!){
        likePost(postId: $postId){
            id
            likes{
                id
                username
            }
            likeCount
        }
    }
`

export default LikeButton;