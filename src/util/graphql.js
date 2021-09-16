import gql from 'graphql-tag';

export const FETCH_POSTS_QUERY = gql`
    query($sortType: Int){
        getPosts(sortType: $sortType){
            id
            body
            createdAt
            username
            likeCount
            likes{
                username
            }
            commentCount
            comments{
                id
                username
                createdAt
                replyCount
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
                likes {
                    id
                    username
                    createdAt
                }
                replies {
                    id
                    username
                    createdAt
                    body
                    likes{
                        id
                        username
                        createdAt
                    }
                    likeCount
                }
                likeCount
                replyCount
            }
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
            }
            commentCount
        }
    }
`

export const LIKE_COMMENT_MUTATION = gql`
    mutation($postId: ID!, $commentId: ID!){
        likeComment(postId: $postId, commentId: $commentId){
            id
            comments{
                id
                likes{
                    id
                    username
                }
                likeCount
            }
        }
    }
`

export const LIKE_POST_MUTATION = gql`
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

export const SUBMIT_REPLY_MUTATION = gql`
    mutation($postId: ID!, $commentId: ID!, $body: String!){
        createReply(postId: $postId, commentId: $commentId, body: $body){
            id
            comments{
                id
                replies{
                    id
                    username
                    createdAt
                    body
                    likes {
                        id
                        username
                        createdAt
                    }
                    likeCount
                }
                replyCount
            }
        }
    }
`

export const DELETE_REPLY_MUTATION = gql`
    mutation deleteReply($postId: ID!, $commentId: ID!, $replyId: ID!) {
        deleteReply(postId: $postId, commentId: $commentId, replyId: $replyId) {
            id
            comments {
                id
                replies {
                    id
                    username
                    createdAt
                    body
                    likes {
                        id
                        username
                        createdAt
                    }
                    likeCount
                }
                replyCount
            }
        }
    }
`;

export const LIKE_REPLY_MUTATION = gql`
    mutation($postId: ID!, $commentId: ID!, $replyId: ID!){
        likeReply(postId: $postId, commentId: $commentId, replyId: $replyId){
            id
            comments{
                id
                replies{
                    id
                    likes{
                        id
                        username
                        createdAt
                    }
                    likeCount
                }
            }
        }
    }
`

export const GET_USER_SETTINGS = gql`
    {
        getUserSettings{
            profileIcon
            profileColor
        }
    }
`

export const GET_PROFILE_QUERY = gql`
    query($username: String!){
        getProfile(username: $username){
            id
            username
            profileIcon
            profileColor
            verified
            permission
            balanceHidden
            balance
            posts 
        }
    }
`

export const CHANGE_PROFILE_ICON = gql`
    mutation($icon: Int!){
        changeProfileIcon(icon: $icon){
            id
            profileIcon
        }
    }
`

export const CHANGE_PROFILE_COLOR = gql`
    mutation($color: Int!){
        changeProfileColor(color: $color){
            id
            profileColor
        }
    }
`

export const UPLOAD_FILE = gql`
    mutation($file: Upload!) {
        uploadFile(file: $file) {
            id
            fileName
        }
    }
`;