import React, { useContext, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Loader, Grid, Card, Button, Icon, Modal, Form } from 'semantic-ui-react';
import moment from 'moment';
import { useMutation } from '@apollo/react-hooks';
import { Link } from 'react-router-dom';

import PostComment from '../components/PostComment';
import ProfileImage from '../components/ProfileImage';
import { AuthContext } from '../context/auth';
import LikeButton from '../components/LikeButton';
import DeleteButton from '../components/DeleteButton';
import { FETCH_POST_QUERY, SUBMIT_COMMENT_MUTATION, GET_PROFILE_QUERY } from '../util/graphql';

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
        update() {
            setComment('');
            setConfirmOpen(false);
        },
        variables: {
            postId,
            body: comment
        },
        refetchQueries: [{
            query: FETCH_POST_QUERY,
            variables: {
                postId
            }
        }]
    });

    function cancelCreateComment(){
        setConfirmOpen(false);
        setComment('');
    }

    function deleteButtonCallback(){
        props.history.push('/');
    }

    let postMarkup;

    const path = window.location.pathname;
    const username = path.split('/')[2];

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

    if(!getPost){
        postMarkup = <Loader active inline='centered' size="large"/>
    } else {
        const { id, body, createdAt, username, likes, likeCount, commentCount, comments, userVerified } = getPost;

        var commentReplyCount = commentCount;
        comments.map((comment) => (
            commentReplyCount = commentReplyCount + comment.replyCount
        ))

        postMarkup = (
            <Grid>
                <Grid.Row>
                    <Grid.Column width={2}>
                        <ProfileImage profile={profile} size='big'/>
                    </Grid.Column>
                    <Grid.Column width={10}>
                        <Card fluid className={userVerified ? 'post-card-verified' : 'post-card'}>
                            <Card.Header className='singlepost-header' as={Link} to={`/user/${username}`} style={{ marginLeft: 10, marginTop: 5 }}><h3>{username}{userVerified && (<><span> </span><Icon name='check circle outline' color='blue'/></>)}</h3></Card.Header>
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
                                                <Icon name='comment' /> {commentReplyCount}
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
                                        <Icon name='comment' /> {commentReplyCount}
                                    </Button>
                                )}
                                {user && user.username === username && (
                                    <DeleteButton size='mini' postId={id} callback={deleteButtonCallback}/>
                                )}
                            </Card.Content>
                        </Card>
                        {comments && comments.map(comment => 
                            <PostComment comment={comment} user={user} id={id}/>
                        )}
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }

    return postMarkup;
}

export default SinglePost;