import React, { useContext, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Loader, Grid, Card, Button, Icon, Image, Comment, Modal, Form } from 'semantic-ui-react';
import moment from 'moment';
import { useMutation } from '@apollo/react-hooks';
import { Link } from 'react-router-dom';

import { AuthContext } from '../context/auth';
import LikeButton from '../components/LikeButton';
import DeleteButton from '../components/DeleteButton';
import { FETCH_POST_QUERY, SUBMIT_COMMENT_MUTATION } from '../util/graphql';

function SinglePost(props){
    const postId = props.match.params.postId;
    const { user } = useContext(AuthContext);

    const [comment, setComment] = useState('');
    const [confirmOpen, setConfirmOpen] = useState(false);

    const { data: { getPost } = {}} = useQuery(FETCH_POST_QUERY, {
        variables: {
            postId
        }
    });

    const [submitComment] = useMutation(SUBMIT_COMMENT_MUTATION, {
        update(){
            setComment('');
            setConfirmOpen(false);
        },
        variables: {
            postId,
            body: comment
        }
    })

    function cancelCreateComment(){
        setConfirmOpen(false);
        setComment('');
    }

    function deleteButtonCallback(){
        props.history.push('/');
    }

    let postMarkup;
    if(!getPost){
        postMarkup = <Loader active inline='centered' size="large"/>
    } else {
        const { id, body, createdAt, username, likes, likeCount, commentCount, comments, userVerified } = getPost;

        postMarkup = (
            <Grid>
                <Grid.Row>
                    <Grid.Column width={2}>
                        <Image
                            src='https://www.flaticon.com/svg/static/icons/svg/3135/3135715.svg'
                            size='small'
                            float='right'
                        />
                    </Grid.Column>
                    <Grid.Column width={10}>
                        <Card fluid className={userVerified ? 'post-card-verified' : 'post-card'}>
                            <Card.Header style={{ marginLeft: 10, marginTop: 5 }}><h3>{username}{userVerified && (<><span> </span><Icon name='check circle outline' color='blue'/></>)}</h3></Card.Header>
                            <Card.Meta style={{ marginLeft: 10 }}>{moment(createdAt).fromNow()}</Card.Meta>
                            <Card.Description style={{ marginLeft: 10, marginTop: 5 }}>{body}</Card.Description>
                            <hr/>
                            <Card.Content extra>
                                <LikeButton user={user} post={{ id, likeCount, likes }}/>
                                {user ? (
                                    <Modal
                                        basic
                                        onClose={() => setConfirmOpen(false)}
                                        onOpen={() => setConfirmOpen(true)}
                                        open={confirmOpen}
                                        size='tiny'
                                        className='create-comment-form'
                                        trigger={
                                            <Button
                                                basic
                                                color='blue'
                                                size='mini'
                                                className='comment-button'
                                            >
                                                <Icon name='comment' /> {commentCount}
                                            </Button>
                                        }>
                                        <Form onSubmit={submitComment}>
                                            <h2 style={{ margin: 20 }}>Comment on post:</h2>
                                            <Form.Field style={{ margin: 20 }}>
                                                <Form.TextArea
                                                    placeholder='Type something'
                                                    name='body'
                                                    onChange={event => setComment(event.target.value)}
                                                    value={comment}
                                                    rows='6'
                                                />
                                                <Button disabled={comment.trim() === ''} basic type='submit' color='blue' className='create-post-button'>
                                                    Create
                                                </Button>
                                                <Button basic color='red' onClick={() => cancelCreateComment()}>
                                                    Cancel
                                                </Button>
                                            </Form.Field>
                                        </Form>
                                    </Modal>
                                ) : (
                                    <Button
                                        basic
                                        color='blue'
                                        size='mini'
                                        as={Link} to='/login'
                                        className='comment-button'
                                    >
                                        <Icon name='comment' /> {commentCount}
                                    </Button>
                                )}
                                {user && user.username === username && (
                                    <DeleteButton size='mini' postId={id} callback={deleteButtonCallback}/>
                                )}
                            </Card.Content>
                        </Card>
                        {comments.map(comment =>
                            <Comment.Group>
                                <Comment style={{ marginBottom: -10 }} key={comment.id} className={comment.userVerified ? 'comment-border-verified' : 'comment-border'}>
                                    <Comment.Avatar style={{ margin: 5 }} as='a' src='https://www.flaticon.com/svg/static/icons/svg/3135/3135715.svg' />
                                    <Comment.Content>
                                        <Comment.Author style={{ marginTop: 5 }} as='a'>{comment.username}{comment.userVerified && (<><span> </span><Icon name='check circle outline' color='blue'/></>)}</Comment.Author>
                                        <Comment.Metadata style={{ marginTop: 5 }} as='a'><div>{moment(comment.createdAt).fromNow()}</div></Comment.Metadata>
                                        <Comment.Text>{comment.body}</Comment.Text>
                                        <Comment.Actions style={{marginLeft: -15}}>
                                            <Comment.Action style={{marginTop: -10}}>{user && user.username === comment.username && (
                                                <DeleteButton postId={id} commentId={comment.id} size='mini'/>
                                            )}</Comment.Action>
                                        </Comment.Actions>
                                    </Comment.Content>
                                </Comment>
                            </Comment.Group>
                            // possible to expand for replies
                        )}
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }

    return postMarkup;
}

export default SinglePost;