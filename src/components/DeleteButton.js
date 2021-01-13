import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { Button, Modal, Header, Icon } from 'semantic-ui-react';

import { FETCH_POSTS_QUERY, DELETE_POST_MUTATION, DELETE_COMMENT_MUTATION } from "../util/graphql";

function DeleteButton({ postId, commentId, callback, size }){
    const [confirmOpen, setConfirmOpen] = useState(false);

    const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION;

    const [deletePostOrComment] = useMutation(mutation, {
        update(proxy){
            setConfirmOpen(false);

            if(!commentId){
                const data = proxy.readQuery({
                    query: FETCH_POSTS_QUERY
                });
                proxy.writeQuery({ query: FETCH_POSTS_QUERY,
                    data: {
                        getPosts: data.getPosts.filter(p => p.id !== postId)
                    }
                });
            }
            
            if(callback){
                callback();
            }
        },
        variables: {
            postId,
            commentId
        }
    })

    function onConfirm(){
        setConfirmOpen(false);
        deletePostOrComment();
    };

    return (
        <>
        <Modal
            basic
            onClose={() => setConfirmOpen(false)}
            onOpen={() => setConfirmOpen(true)}
            open={confirmOpen}
            size='mini'
            className='delete-confirm'
            trigger={
                commentId ? (
                    <Button size={size} className='delete-comment-button' onClick={() => setConfirmOpen(true)}>
                        <Icon name='trash' style={{ margin: -2 }}/>
                    </Button>
                ) : (
                    <Button floated='right' basic as='div' color='black' size={size} onClick={() => setConfirmOpen(true)}>
                        <Icon name='trash' style={{margin: -2}}/>
                    </Button>
                )
            }
            >
            <Header>
                Are you sure you want to delete this post?
            </Header>
            <Modal.Actions>
                <Button basic inverted onClick={() => setConfirmOpen(false)}>
                    <Icon name='remove' /> Cancel
                </Button>
                <Button color='red' inverted onClick={() => onConfirm()}>
                    <Icon name='trash' /> Confirm
                </Button>
            </Modal.Actions>
        </Modal>
        </>
    )
}

export default DeleteButton;