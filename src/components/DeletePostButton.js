import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { Button, Modal, Header, Icon } from 'semantic-ui-react';

import { FETCH_POSTS_QUERY, DELETE_POST_MUTATION } from "../util/graphql";

function DeletePostButton({ postId, size, sortType }){
    const [confirmOpen, setConfirmOpen] = useState(false);

    const [deletePostOrComment] = useMutation(DELETE_POST_MUTATION, {
        update(){
            setConfirmOpen(false);
        },
        variables: {
            postId
        },
        refetchQueries: [{
            query: FETCH_POSTS_QUERY,
            variables: {
                sortType
            }
        }]
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
                <Button floated='right' basic as='div' color='black' size={size} onClick={() => setConfirmOpen(true)}>
                    <Icon name='trash' style={{margin: -2}}/>
                </Button>
            }
            >
            <Header>Are you sure you want to delete this post?</Header>
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

export default DeletePostButton;