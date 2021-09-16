import React, { useContext, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { useMutation } from '@apollo/react-hooks';

import { useForm } from '../util/hooks';
import { AuthContext } from '../context/auth';
import { Grid, Loader, Transition, Button, Icon, Modal, Form, Dropdown, Header } from 'semantic-ui-react';
import PostCard from '../components/postCard';
import { FETCH_POSTS_QUERY, CREATE_POST_MUTATION } from '../util/graphql';


function Home(){
    // home page
    const { user } = useContext(AuthContext);

    const [sortType, setSortType] = useState(0);

    const { 
        loading,
        data: { getPosts: posts } = {},
        refetch
    } = useQuery(FETCH_POSTS_QUERY, {
        variables: {
            sortType
        },
        fetchPolicy: 'cache-first'
    });
    
    // post form

    const [confirmOpen, setConfirmOpen] = useState(false);

    const{ values, onChange, onSubmit } = useForm(createPostCallback, {
        body:''
    });

    const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
        update(){
            values.body = '';
            setConfirmOpen(false);
        },
        variables: values,
        refetchQueries: [{
            query: FETCH_POSTS_QUERY,
            variables: {
                sortType
            }
        }]
    });

    function cancelCreatePost(){
        setConfirmOpen(false);
        values.body = '';
    }

    function createPostCallback(){
        createPost();
        refetch();
    };

    function dropdownChange(event, {value}) {
        console.log(value);
        setSortType(value);
        refetch();
    }

    const dropdownItems = [
        {
            key: 'Best',
            text: 'Best',
            value: 2,
            icon: { name:'fire', color:'orange' }
        },
        {
            key: 'Top',
            text: 'Top',
            value: 1,
            icon: { name:'sort amount up', color:'red' }
        },
        {
            key: 'Recent',
            text: 'Recent',
            value: 0,
            icon: { name:'redo', color:'blue' }
        }
    ]

    return (
        <Grid columns={3}>
            <Grid.Row className='page-title'>
                <Grid.Column>
                    {user && (
                        <Modal
                            basic
                            onClose={() => setConfirmOpen(false)}
                            onOpen={() => setConfirmOpen(true)}
                            open={confirmOpen}
                            size='tiny'
                            className='create-post-form'
                            trigger={
                                <Button floated='left' basic color='blue' className='create-post-bottom' style={{ marginTop: 5 }}>
                                    <Icon name='plus'/> Create Post
                                </Button>
                            }>
                            <Form onSubmit={onSubmit}>
                                <h2 style={{ margin: 20 }}>Create a post:</h2>
                                <Form.Field style={{ margin: 20 }}>
                                    <Form.TextArea
                                        placeholder='Type something'
                                        name='body'
                                        onChange={onChange}
                                        value={values.body}
                                        rows='6'
                                        error={error ? true : false}
                                    />
                                    <Button basic type='submit' color='blue' className='create-post-button'>
                                        Create
                                    </Button>
                                    <Button basic color='red' onClick={() => cancelCreatePost()}>
                                        Cancel
                                    </Button>
                                </Form.Field>
                            </Form>
                            {error && (
                                <div className='ui error message' style={{margin: 20}}>
                                    <ul className='list'>
                                        <li>{error.graphQLErrors[0].message}</li>
                                    </ul>
                                </div>
                            )}
                        </Modal>
                    )}
                </Grid.Column>
                <Grid.Column>
                    <h1>Recent Posts</h1>
                </Grid.Column>
                <Grid.Column>
                    <Header as='h3' className='sort-header' floated='right'>
                        <Header.Content>
                            Sort by: {' '}
                            <Dropdown
                                inline
                                className='sort-dropdown'
                                floated='right'
                                options={dropdownItems}
                                defaultValue={0}
                                onChange={dropdownChange}
                            />
                        </Header.Content>
                    </Header>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                {loading ? (
                    <Loader active inline='centered' size="large"/>
                ) : (
                    <Transition.Group>
                        {posts && posts.map((post) => (
                            <Grid.Column key={post.id} style={{ marginBottom: 20}}>
                                <PostCard post={post}/>
                            </Grid.Column>
                        ))}
                    </Transition.Group>
                )}
            </Grid.Row>
        </Grid>
    )
}

export default Home;