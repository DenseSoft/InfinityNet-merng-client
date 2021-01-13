import gql from 'graphql-tag';

export const FETCH_POSTS_QUERY = gql`
    {
        getPosts{
            id
            body
            createdAt
            username
            likeCount
            userVerified
            likes{
                username
            }
            commentCount
            comments{
                id
                username
                createdAt
                userVerified
            }
        }
    }
`

export const REGISTER_USER = gql`
mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
) {
    register(
        registerInput: {
            username: $username
            email: $email
            password: $password
            confirmPassword: $confirmPassword
        }
    ){
        id
        email
        createdAt
        username
        token
    }
}
`

export const LOGIN_USER = gql`
mutation login(
    $username: String!
    $password: String!
) {
    login(
        username: $username
        password: $password
    ){
        id
        email
        createdAt
        username
        token
    }
}
`

export const CREATE_POST_MUTATION = gql`
mutation createPost($body: String!){
    createPost(body: $body){
        id
        body
        createdAt
        username
        userVerified
        likes{
            id
            username
            createdAt
        }
        likeCount
        comments{
            id
            body
            username
            createdAt
            userVerified
        }
        commentCount
    }
}
`

export const FETCH_POST_QUERY = gql`
    query($postId: ID!){
        getPost(postId: $postId){
            id
            body
            createdAt
            username
            likeCount
            likes {
                username
            }
            commentCount
            comments {
                id
                username
                createdAt
                body
                userVerified
            }
            userVerified
        }
    }
`

export const DELETE_COMMENT_MUTATION = gql`
    mutation deleteComment($postId: ID!, $commentId: ID!) {
        deleteComment(postId: $postId, commentId: $commentId) {
            id
            comments {
                id
                username
                createdAt
                body
                userVerified
            }
            commentCount
        }
    }
`;


export const DELETE_POST_MUTATION = gql`
mutation deletePost($postId: ID!){
    deletePost(postId: $postId)
}
`

export const SUBMIT_COMMENT_MUTATION = gql`
    mutation($postId: ID!, $body: String!){
        createComment(postId: $postId, body: $body){
            id
            comments{
                id
                body
                createdAt
                username
                userVerified
            }
            commentCount
        }
    }
`