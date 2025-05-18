import { gql } from "@apollo/client";


export const GET_PROFILE = gql`
query Profile {
  profile {
    _id
    name
    email
    rol
    avatar
  }
}
`

export const UPDATE_PROFILE = gql`
mutation UpdateProfile($data: inputUpdateAccount) {
  updateProfile(data: $data) {
    ... on User {
			__typename
      _id
      avatar
      name
    }
    ... on Error {
			__typename
      message
    }
  }
}
`