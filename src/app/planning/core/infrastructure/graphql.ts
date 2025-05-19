import { gql } from "@apollo/client";


export const GET_PLANNING_DETAIL_LIVE = gql`
query GetPlanning($planningId: String) {
  getPlanning(planningId: $planningId) {
    _id
    userId
     user {
      name
      email
      rol
      _id
    }
    title
    description
    planningId
    typePlanning
    typeVisibility
    systemCard
    storyPoint
    status
    resourceId
    access_token
    controlPlanning
    celebrationEmoji
    protectPlanning
    protectPassword
    teams {
      _id
      name
    }
    guests {
      _id
      email
      name
      teamId
    }
    teampoints {
      storyPoint
      team {
        _id
        name
      }
    }
    task {
      ... on Issues {
        __typename
        _id
        id
        key
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
        storyPoint
        stimatePoint
        planningId
        userId
        statusStimate

        subtasks {
         __typename
        _id
        id
        key
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
        storyPoint
        stimatePoint
        planningId
        userId
        statusStimate
        }
        
      }
      ... on Task {
        _id
        __typename
        key
        title
        description
        storyPoint
        stimatePoint
        planningId
        statusStimate
      }
    }
  }
}`

export const CREATE_GUEST_TEMPORAL = gql`
mutation CreateGuestTemporal($data: InputGuestTemporal) {
  createGuestTemporal(data: $data) {
    ... on GuestTemporal {
      __typename
      _id
      name
      email
      avatar
      planningId
       team {
        _id
        name
      }
      active
      modeObserver
    }
    ... on Error {
      message
      __typename
    }
  }
}`

export const GET_GUEST_PLANNING = gql`
query Query($planningId: String) {
  getGuestPlanning(planningId: $planningId)
}`

export const ADD_VOTO = gql`
mutation AddVoto($data: InputVoto) {
  addVoto(data: $data)
}`

export const SHOW_CARD = gql`
mutation HandleShowCard($data: InputShowCard) {
  handleShowCard(data: $data)
}`

export const PLANING_RESULT = gql`
mutation ResultPlanning($data: InputResult) {
  resultPlanning(data: $data)
}`

export const NEW_VOTO = gql`
mutation NewVoto($planningId: ID) {
  newVoto(planningId: $planningId)
}`

export const SEND_RESTORE_DATA = gql`
mutation Mutation($data: InputRestoreData) {
  restoreData(data: $data)
}`

export const REMOVE_GUEST_PLANNING = gql`
mutation RemoveGuest($guestId: ID, $planningId: String) {
  removeGuest(guestId: $guestId, planningId: $planningId)
}`

export const UPDATE_GUEST_TEMPORAL = gql`
mutation UpdateGuestTemporal($data: InputGuestTemporal, $guestId: String) {
  updateGuestTemporal(data: $data, guestId: $guestId)
}`

export const SELECT_TASK = gql`
mutation SelectTask($taskId: String, $subtaskId: String, $planningId: String) {
  selectTask(taskId: $taskId, subtaskId: $subtaskId, planningId: $planningId)
}`

export const UPDATE_TASK = gql`
mutation UpdateTaskPlanning($taskId: String, $subtaskId: String, $planningId: String, $stimatePoint: Int, $newVoto: Boolean, $votos: [VotosGuest]) {
  updateTaskPlanning(taskId: $taskId, subtaskId: $subtaskId, planningId: $planningId, stimatePoint: $stimatePoint, newVoto: $newVoto, votos: $votos)
}`

export const UPDATE_PERFIL_GUEST = gql`
mutation UpdatePerfilGuest($data: InputUpdatePerfilGuest) {
  updatePerfilGuest(data: $data)
}`

export const DELETE_TASK = gql`
mutation DeleteTask($taskId: String, $typePlanning: typePlanning, $planningId: String) {
  deleteTask(taskId: $taskId, typePlanning: $typePlanning, planningId: $planningId)
}`

export const CREATE_FEEDBACK = gql`
mutation CreateFeedBack($data: InputCreateFeedback) {
  createFeedBack(data: $data)
}
`

export const SEND_EMOJI = gql`
mutation SendEmoji($emoji: String, $planningId: String, $name: String) {
  sendEmoji(emoji: $emoji, planningId: $planningId, name: $name)
}`

export const LANZAR_EMOJI = gql`
mutation LanzarEmoji($emoji: String, $planningId: String, $userId: String) {
  lanzarEmoji(emoji: $emoji, planningId: $planningId, userId: $userId)
}`

export const SEND_CONTROL_PLANNING = gql`
mutation SendControlPlanning($planningId: String, $control: Boolean) {
  sendControlPlanning(planningId: $planningId, control: $control)
}
`
export const SUSCRIPTION_CONTROL_PLANNING = gql`
subscription ControlPlanning($planningId: String) {
  controlPlanning(planningId: $planningId) {
    control
  }
}
`

export const SUSCRIPTION_DELETE_TASK = gql`
subscription DeleteTaskSuscription($planningId: String) {
  deleteTaskSuscription(planningId: $planningId) {
    idTask
  }
}
`


export const SEND_CONTROL_CELEBRATION_PLANNING = gql`
mutation SendControlCelebration($planningId: String, $control: Boolean) {
  sendControlCelebration(planningId: $planningId, control: $control)
}
`

export const SUSCRIPTION_CONTROL_CELEBRATION_PLANNING = gql`
subscription ControlCelebration($planningId: String) {
  controlCelebration(planningId: $planningId) {
    control
  }
}
`

export const SUSCRIPTION_UPDATE_PLANNING = gql`
subscription Subscription($planningId: String) {
  updatePlanning(planningId: $planningId)
}
`

export const SUSCRIPTION_LIST_GUEST = gql`
subscription GuestsPlanning($planningId: String) {
  guestsPlanning(planningId: $planningId) {
    guests {
      _id
      name
      email
      avatar
       team {
        _id
        name
      }
      planningId
      active
      modeObserver
    }
    planningId
  }
}`

export const SUSCRIPTION_ADD_VOTO = gql`
subscription Subscription($planningId: String) {
  votoGuest(planningId: $planningId) {
    guestId
    value
  }
}`

export const SUSCRIPTION_SHOW_CARD = gql`
subscription ShowCard($planningId: String) {
  showCard(planningId: $planningId) {
    value
  }
}`

export const SUSCRIPTION_RESULT_PLANNING = gql`
subscription ResultPlanning($planningId: String) {
  resultPlanning(planningId: $planningId) {
    average
    recommendation
    highest
    lowest
    estimationCount
    mostVoted
    estimatedValues {
      key
      value
    }
  }
}`

export const SUSCRIPTION_NEW_VOTO = gql`
subscription Subscription($planningId: String) {
  newVoto(planningId: $planningId)
}`

export const SUSCRIPTION_ACTIVATE_RESTORE_DATA = gql`
subscription Subscription($planningId: String) {
  activateRestoreData(planningId: $planningId)
}
`

export const SUSCRIPTION_RESTORE_DATA = gql`subscription RestoreData($planningId: String) {
  restoreData(planningId: $planningId) {
    votos
    showCard
    result {
      average
      recommendation
      highest
      lowest
      estimationCount
      mostVoted
      estimatedValues {
        key
        value
      }
    }
  }
}
`

export const SUSCRIPTION_DESCONECTED_GUEST = gql`
subscription DesconectedGuest($planningId: String) {
  desconectedGuest(planningId: $planningId) {
    _id
    name
    email
    avatar
    planningId
    teamId
    active
  }
}`

export const SUSCRIPTION_REMOVE_GUEST = gql`
subscription Subscription($planningId: String) {
  removeGuest(planningId: $planningId) {
    guestId
  }
}`



export const SUSCRIPTION_SELECT_TASK = gql`
subscription SelectTask($planningId: String) {
  selectTask(planningId: $planningId) {
    taskId
    subtaskId
  }
}`


export const SUSCRIPTION_UPDATE_TASK = gql`
subscription Subscription($planningId: String) {
  updateTask(planningId: $planningId) {
    stimatePoint
    taskId
    newVoto,
    votos {
        taskId
        guestId
        planningId
        teamId
        voto
    }
  }
}
`

export const SUSCRIPTION_UPATED_PERFIL_GUEST = gql`
subscription Subscription($planningId: String) {
  updatePerfil(planningId: $planningId) {
    id
    name
    planningId
    team{
      _id
      name
    }
    avatar
  }
}
`

export const SUSCRIPTION_EMOJI_FLY = gql`
subscription EmojiFly($planningId: String) {
  emojiFly(planningId: $planningId) {
    emoji
    name
  }
}`

export const SUSCRIPTION_LANZAR_EMOJI = gql`
subscription LanzarEmojiFly($planningId: String) {
  lanzarEmojiFly(planningId: $planningId) {
    emoji
    userId
  }
}`

export const SUSCRIPTION_DONE_PLANNING = gql`
subscription DonePLanning($planningId: String) {
  donePLanning(planningId: $planningId) {
    status
  }
}
`

export const GET_FIELDS_RESOURCES = gql`
query GetFieldsJira($planningId: String) {
  getFieldsJira(planningId: $planningId) {
    id
    key
    name
    custom
    orderable
    navigable
    searchable
    clauseNames
  }
}
`

export const DONE_PLANNING = gql`
  mutation DonePlanning($data: InputDonePlanning) {
  donePlanning(data: $data)
}
`

export const VALIDATE_PASSWORD_PLANNING = gql`
mutation ValidatePasswordPlanning($planningId: ID, $password: String) {
  validatePasswordPlanning(planningId: $planningId, password: $password)
}
`