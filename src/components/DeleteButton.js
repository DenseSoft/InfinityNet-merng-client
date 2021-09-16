import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { Button, Modal, Header, Icon } from 'semantic-ui-react';

import { DELETE_COMMENT_MUTATION, DELETE_REPLY_MUTATION } from "../util/graphql";

function DeleteButton({ postId, commentId, replyId, callback, size }){
    const [confirmOpen, setConfirmOpen] = useState(false);

    const mutation = replyId ? DELETE_REPLY_MUTATION : DELETE_COMMENT_MUTATION;

    const [deletePostOrComment] = useMutation(mutation, {
        update(){
            setConfirmOpen(false);
            if(callback){
                callback();
            }
        },
        variables: {
            postId,
            commentId,
            replyId
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
                <Button size={size} className='delete-comment-button' onClick={() => setConfirmOpen(true)}>
                    <Icon name='trash' style={{ margin: -2 }}/>
                </Button>
            }
            >
            {replyId ? (
                <Header>Are you sure you want to delete this reply?</Header>
            ) : (
                <Header>Are you sure you want to delete this comment?</Header>
            )
            }
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