import { gql } from '@apollo/client';



// Mutation

export const CREATE_PALNNING_MANUAL = gql`
mutation CreatePlanningManual($data: InputPlanningManual) {
  createPlanningManual(data: $data) {
    planningId
    status
  }
}
`

export const CREATE_PALNNING_JIRA = gql`
mutation CreatePlanningJira($data: InputPlanningJira) {
  createPlanningJira(data: $data) {
    status
    planningId
  }
}
`

export const LIST_PPLANNING = gql`
	query listPlanning($filter: FilterPlanning, $page: Int, $itemsPerPage: Int) {
  listPlanning(filter: $filter, page: $page, itemsPerPage: $itemsPerPage) {
    data {
      _id
      title
      description
      planningId
      typePlanning
      storyPoint
      status
      systemCard
      protectPlanning
      guests {
        _id
        avatar
        email
        name
      }
    }
    currentPage
    numberOfPages
    total
  }
}
`

export const LIST_TEAM = gql`
query ListTeams {
  listTeams {
    _id
    name
    status
    createdAt
    guests {
      _id
      email
      name
      avatar
      teamId
    }
  }
}
`

export const GET_ACCESS_TOKEN = gql`
query GetAccessToken($code: String) {
  getAccessToken(code: $code) {
    
    access_token
    refresh_token
  }
}
`

export const GET_RESOURCES_JIRA = gql`
query GetResources($accessToken: String) {
  getResources(accessToken: $accessToken) {
    id
    url
    name
    avatarUrl
  }
}
`

export const GET_LIST_PROJECT_JIRA = gql`
query GetProjectsJira($resourceId: String, $accessToken: String) {
  getProjectsJira(resourceId: $resourceId, accessToken: $accessToken) {
    id
    key
    name
    avatarUrls
    projectTypeKey
  }
}
`

export const GET_LIST_BOARD_JIRA = gql`
query GetBoardsJira($resourceId: String, $accessToken: String, $projectId: String) {
  getBoardsJira(resourceId: $resourceId, accessToken: $accessToken, projectId: $projectId) {
    id
    name
  }
}
`
export const GET_LIST_SPRINT_JIRA = gql`
query GetSprintsJira($resourceId: String, $accessToken: String, $boardId: Int) {
  getSprintsJira(resourceId: $resourceId, accessToken: $accessToken, boardId: $boardId) {
    id
    name
    startDate
    endDate
    originBoardId
  }
}
`

export const GET_LIST_TASK_JIRA = gql`
query GetBoardsIssuesJira($resourceId: String, $accessToken: String, $boardId: Int, $sprintId: Int) {
  getBoardsIssuesJira(resourceId: $resourceId, accessToken: $accessToken, boardId: $boardId, sprintId: $sprintId) {
    boardId
    sprintId
    title
    id
    key
    description
    project {
      id
      name
      key
      avatarUrls
      projectTypeKey
    }
    issuetype {
      id
      name
      description
      iconUrl
    }
    status {
      id
      name
      iconUrl
    }
    creator {
      accountId
      emailAddress
      avatarUrls
      displayName
    }
    assignee {
      accountId
      emailAddress
      avatarUrls
      displayName
      active
    }
    subtasks {
      boardId
      sprintId
      title
      id
      key
      description
      project {
        id
        name
        key
        avatarUrls
        projectTypeKey
      }
      issuetype {
        id
        name
        description
        iconUrl
      }
      status {
        id
        name
        iconUrl
      }
      creator {
        accountId
        emailAddress
        avatarUrls
        displayName
      }
      assignee {
        accountId
        emailAddress
        avatarUrls
        displayName
        active
      }
  
      storyPoint
      stimatePoint
      planningId
      userId
      statusStimate
      order
    }
    storyPoint
    stimatePoint
    planningId
    userId
    statusStimate
    order
  }
}
`


export const LIST_GUEST_TEAM_ID = gql`
query listGuest($itemsPerPage: Int, $filter: FilterGuest) {
  listGuest(itemsPerPage: $itemsPerPage, filter: $filter) {
    data {
      _id
      email
      name
      team {
        _id
        name
      }
    }
  }
}
`

export const DELETE_PLANNING = gql`
mutation DeletePlanning($planningId: ID) {
  deletePlanning(planningId: $planningId)
}
`

export const GET_PLANNING_ID = gql`
query GetPlanning($planningId: String) {
  getPlanning(planningId: $planningId) {
    _id
    title
    description
    planningId
    typePlanning
    systemCard
    storyPoint
    protectPlanning
    protectPassword
    guests {
      _id
      name
      email
      status
      createdAt
      avatar
      teamId
    }
    task {
      ... on Issues {
        id
        key
        boardId
        sprintId
        title
        description
        project {
          id
          name
          key
          avatarUrls
          projectTypeKey
        }
        issuetype {
          id
          name
          description
          iconUrl
        }
        status {
          id
          name
          iconUrl
        }
        creator {
          accountId
          emailAddress
          avatarUrls
          displayName
        }
        assignee {
          accountId
          emailAddress
          avatarUrls
          displayName
          active
        }
        storyPoint
        stimatePoint
        planningId
        userId
        statusStimate
        order
        subtasks {
         id
        key
        boardId
        sprintId
        title
        description
        project {
          id
          name
          key
          avatarUrls
          projectTypeKey
        }
        issuetype {
          id
          name
          description
          iconUrl
        }
        status {
          id
          name
          iconUrl
        }
        creator {
          accountId
          emailAddress
          avatarUrls
          displayName
        }
        assignee {
          accountId
          emailAddress
          avatarUrls
          displayName
          active
        }
        storyPoint
        stimatePoint
        planningId
        userId
        statusStimate
        
        order
        }
      }
      ... on Task {
        key
        title
        description
        storyPoint
        stimatePoint
        planningId
        statusStimate
      }
    }
    sendMail
    status
    access_token
    refresh_token
    typeVisibility
  }
}
`


export const NOTIFICATION_FEED = gql`
subscription Subscription {
  addForm
}
`

export const UPDATE_PLANNING = gql`
mutation UpdatePlanningData($data: InputPlanningJira, $planningId: String) {
  updatePlanningData(data: $data, planningId: $planningId)
}
`
