import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import { Button, Icon, Modal, Form } from 'semantic-ui-react';

import { SUBMIT_REPLY_MUTATION, FETCH_POST_QUERY } from '../util/graphql';

function ReplyButton({ user, post: { id }, comment }){
    const [reply, setReply] = useState('');
    const [confirmOpen, setConfirmOpen] = useState(false);

    const [submitReply] = useMutation(SUBMIT_REPLY_MUTATION, {
        update() {
            setReply('');
            setConfirmOpen(false);
        },
        variables: {
            postId: id,
            commentId: comment.id,
            body: reply
        },
        refetchQueries: [{
            query: FETCH_POST_QUERY,
            variables: {
                postId: id
            }
        }]
    });

    function cancelCreateReply(){
        setConfirmOpen(false);
        setReply('');
    }

    const ReplyButton = user ? (
        <Modal
            basic
            onClose={() => setConfirmOpen(false)}
            onOpen={() => setConfirmOpen(true)}
            open={confirmOpen}
            size='tiny'
            className='create-comment-form'
            trigger={
                <Button className='reply-button' size='mini'>
                    <Icon name='reply' /> {comment.replyCount}
                </Button>
            }>
            <Form onSubmit={submitReply}>
                <h2 style={{ margin: 20 }}>Reply to {comment.username}:</h2>
                <Form.Field style={{ margin: 20 }}>
                    <Form.TextArea
                        placeholder='Type something'
                        name='body'
                        onChange={event => setReply(event.target.value)}
                        value={reply}
                        rows='6'
                    />
                    <Button disabled={reply.trim() === ''} basic type='submit' color='blue' className='create-post-button'>
                        Create
                    </Button>
                    <Button basic color='red' onClick={() => cancelCreateReply()}>
                        Cancel
                    </Button>
                </Form.Field>
            </Form>
        </Modal>
    ) : (
        <Button className='reply-button' as={Link} to='/login' size='mini'>
            <Icon name='reply' /> {comment.replyCount}
        </Button>
    )

    return ReplyButton;
}

export default ReplyButton;