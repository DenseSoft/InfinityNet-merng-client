import React, { useContext, useState } from 'react';
import { Header, Form, Button, Icon, Grid } from 'semantic-ui-react';
import { useMutation } from '@apollo/react-hooks';

import { AuthContext } from '../context/auth';
import profileIconIndex from '../util/profileIconIndex';
import profileColorIndex from '../util/profileColorIndex';
import { CHANGE_PROFILE_ICON, CHANGE_PROFILE_COLOR, GET_PROFILE_QUERY } from '../util/graphql';

function ProfileSettings(props){
    const { user } = useContext(AuthContext);
    const username = user.username;

    const [profileIcon, setProfileIcon] = useState(0);
    const [profileColor, setProfileColor] = useState(0);

    const [changeProfileIcon] = useMutation(CHANGE_PROFILE_ICON, {
        variables: {
            icon: profileIcon
        },
        update() {
            props.history.push('/');
        },
        refetchQueries: [{
            query: GET_PROFILE_QUERY,
            variables: {
                username
            }
        }]
    });

    const [changeProfileColor] = useMutation(CHANGE_PROFILE_COLOR, {
        variables: {
            color: profileColor
        },
        update() {
            props.history.push('/');
        },
        refetchQueries: [{
            query: GET_PROFILE_QUERY,
            variables: {
                username
            }
        }]
    });

    const path = window.location.pathname.split('/')[2];
    if(username !== path) {
        props.history.push('/');
    }

    function previousIcon(){
        if (profileIcon === 0) {
            setProfileIcon(profileIconIndex.length - 1);
        } else {
            setProfileIcon(profileIcon - 1);
        }
    }

    function nextIcon(){
        if (profileIcon === profileIconIndex.length - 1) {
            setProfileIcon(0);
        } else {
            setProfileIcon(profileIcon + 1);
        }
    }

    function previousColor(){
        if (profileColor === 0) {
            setProfileColor(profileColorIndex.length - 1);
        } else {
            setProfileColor(profileColor - 1);
        }
    }

    function nextColor(){
        if (profileColor === profileColorIndex.length - 1) {
            setProfileColor(0);
        } else {
            setProfileColor(profileColor + 1);
        }
    }

    return (
        <div>
            <Header as='h1' color='blue'>Profile settings</Header>
            <Form>
                <Header style={{marginTop: 30}} as='h4'>Profile Icon</Header>
                    <Form.Field width='6'>
                    <Grid columns={3}>
                        <Grid.Column>
                            <Button
                                className='previous-icon-button'
                                color='blue'
                                basic
                                onClick={previousIcon}
                                size='tiny'>
                                <Icon name='chevron left' style={{marginLeft: -8 }}/>
                            </Button>
                        </Grid.Column>
                        <Grid.Column>
                            <Icon style={{marginLeft: -40}} name={profileIconIndex[profileIcon]} size='big'/>
                        </Grid.Column>
                        <Grid.Column>
                            <Button
                                style={{marginLeft: -80}}
                                className='next-icon-button'
                                color='blue'
                                basic
                                onClick={nextIcon}
                                size='tiny'>
                                <Icon name='chevron right' style={{ marginLeft: -6 }}/>
                            </Button>
                        </Grid.Column>
                    </Grid>
                </Form.Field>
                <Button basic type='submit' size='small' color='blue' style={{marginTop: 20}} onClick={changeProfileIcon}>
                    Save
                </Button>
            <Header style={{marginTop: 20}} as='h4'>Profile Color</Header>
                <Form.Field width='6'>
                    <Grid columns={3}>
                        <Grid.Column>
                            <Button
                                className='previous-icon-button'
                                color='blue'
                                basic
                                onClick={previousColor}
                                size='tiny'>
                                <Icon name='chevron left' style={{marginLeft: -8 }}/>
                            </Button>
                        </Grid.Column>
                        <Grid.Column>
                            <Icon style={{marginLeft: -40}} name='user' color={profileColorIndex[profileColor]} size='big'/>
                        </Grid.Column>
                        <Grid.Column>
                            <Button
                                style={{marginLeft: -80}}
                                className='next-icon-button'
                                color='blue'
                                basic
                                onClick={nextColor}
                                size='tiny'>
                                <Icon name='chevron right' style={{ marginLeft: -6 }}/>
                            </Button>
                        </Grid.Column>
                    </Grid>
                </Form.Field>
                <Button basic type='submit' size='small' color='blue' style={{marginTop: 20}} onClick={changeProfileColor}>
                    Save
                </Button>
            </Form>
        </div>
    )
}

export default ProfileSettings;