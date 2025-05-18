import { gql } from '@apollo/client';

// Mutation
export const LOGIN = gql`
	mutation Login($data: inputLogin) {
  login(data: $data) {
    ... on User {
      _id
      name
      email
      rol
      verified_account
      accessToken
      avatar
    }
    ... on Error {
      message
    }
  }
}
`