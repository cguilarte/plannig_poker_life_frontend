import { gql } from '@apollo/client';

export const CREATE_USER = gql`
mutation CreateAccount($data: inputCreateAccount) {
  createAccount(data: $data) {
    ... on User {
      _id
      name
      email
      rol
      verified_account
      status
    }
    ... on Error {
      message
    }
  }
}
`

export const UPDATE_USER = gql`
mutation UpdateAccount($userId: ID, $data: inputUpdateAccount) {
  updateAccount(userId: $userId, data: $data) {
    ... on User {
      _id
      name
      email
      rol
      verified_account
      status
    }
    ... on Error {
      message
    }
  }
}
`

export const DELETE_USER = gql`
mutation DeleteAccount($userId: ID) {
  deleteAccount(userId: $userId)
}
`

export const GET_USERS = gql`
query ListUsers($itemsPerPage: Int, $page: Int, $filter: FilterUsers) {
  listUsers(itemsPerPage: $itemsPerPage, page: $page, filter: $filter) {
    data {
      _id
      name
      email
      rol
      verified_account
      status
    }
    currentPage
    numberOfPages
    total
  }
}
`

export const DETAIL_USER = gql`
query DetailAccount($userId: ID) {
  detailAccount(userId: $userId) {
    _id
    name
    email
    rol
    verified_account
    status
  }
}
`




