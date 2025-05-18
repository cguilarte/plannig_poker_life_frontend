import { gql } from '@apollo/client';

export const CREATE_TEAM = gql`
mutation CreateTeam($data: InputTeam) {
  createTeam(data: $data) {
    ... on Team {
      _id
      name
      status
      createdAt
    }
    ... on Error {
      message
    }
  }
}
`

export const UPDATE_TEAM = gql`
mutation UpdateTeam($data: InputTeam, $teamId: ID) {
  updateTeam(data: $data, teamId: $teamId) {
    ... on Team {
      _id
      name
      status
      createdAt
    }
    ... on Error {
      message
    }
  }
}
`

export const DELETE_TEAM = gql`
mutation DeleteTeam($teamId: ID) {
  deleteTeam(teamId: $teamId)
}
`

export const GET_TEAMS = gql`
query ListTeamsPrivate($page: Int, $itemsPerPage: Int, $filter: FilterTeam) {
  listTeamsPrivate(page: $page, itemsPerPage: $itemsPerPage, filter: $filter) {
    currentPage
    numberOfPages
    total
    data {
      _id
      name
      status
      guests {
        email
      }
      createdAt
    }
  }
}
`

export const DETAIL_TEAM = gql`
query DetailTeam($teamId: ID) {
  detailTeam(teamId: $teamId) {
    _id
    name
    status
    createdAt
  }
}
`


export const LIST_GUEST_TEAM = gql`
query ListGuestTeam($teamId: ID) {
  listGuestTeam(teamId: $teamId) {
    _id
    name
    email
    status
    createdAt
    avatar
    teamId
  }
}
`


export const ADD_INVITE_GUEST_TEAM = gql`
  mutation AddInvite($data: InputInvite) {
  addInvite(data: $data)
}
`

export const DELETE_GUEST_TEAM = gql`
  mutation DeleteGuest($deleteGuestId: ID) {
  deleteGuest(id: $deleteGuestId)
}
`

export const UPDATE_GUEST = gql`
mutation UpdateGuest($updateGuestId: ID, $data: InputGuest) {
  updateGuest(id: $updateGuestId, data: $data)
}
`