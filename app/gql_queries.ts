export const listAllSessions = `query ListSessions($input: ListSessionsInput!) {
  listSessions(input: $input) {
    results {
      ...SessionFieldFragment
      isConflicting {
        reserved {
          eventId
          sessionId
          isPaidSession
          __typename
        }
        waitlisted {
          eventId
          sessionId
          isPaidSession
          __typename
        }
        __typename
      }
      __typename
    }
    totalCount
    nextToken
    __typename
  }
}

fragment SessionFieldFragment on Session {
  action
  alias
  createdAt
  description
  duration
  endTime
  eventId
  isConflicting {
    reserved {
      alias
      createdAt
      eventId
      name
      sessionId
      type
      __typename
    }
    waitlisted {
      alias
      createdAt
      eventId
      name
      sessionId
      type
      __typename
    }
    __typename
  }
  isEmbargoed
  isFavoritedByMe
  isPaidSession
  isPaidSession
  level
  location
  myReservationStatus
  name
  sessionId
  startTime
  status
  type
  capacities {
    reservableRemaining
    waitlistRemaining
    __typename
  }
  customFieldDetails {
    name
    type
    visibility
    fieldId
    ... on CustomFieldValueFlag {
      enabled
      __typename
    }
    ... on CustomFieldValueSingleSelect {
      value {
        fieldOptionId
        name
        __typename
      }
      __typename
    }
    ... on CustomFieldValueMultiSelect {
      values {
        fieldOptionId
        name
        __typename
      }
      __typename
    }
    ... on CustomFieldValueHyperlink {
      text
      url
      __typename
    }
    __typename
  }
  package {
    itemId
    __typename
  }
  price {
    currency
    value
    __typename
  }
  room {
    name
    venue {
      name
      __typename
    }
    __typename
  }
  sessionType {
    name
    __typename
  }
  tracks {
    name
    __typename
  }
  __typename
}
`;

export const listUserSessions = `query MySessions($eventId: ID!, $limit: Int, $nextToken: String) {
  event(id: $eventId) {
    eventId
    name
    mySessions(limit: $limit, nextToken: $nextToken) {
      items {
        ...SessionFieldFragment
        __typename
      }
      nextToken
      __typename
    }
    __typename
  }
}

fragment SessionFieldFragment on Session {
  action
  alias
  createdAt
  description
  duration
  endTime
  eventId
  isConflicting {
    reserved {
      alias
      createdAt
      eventId
      name
      sessionId
      type
      __typename
    }
    waitlisted {
      alias
      createdAt
      eventId
      name
      sessionId
      type
      __typename
    }
    __typename
  }
  isEmbargoed
  isFavoritedByMe
  isPaidSession
  isPaidSession
  level
  location
  myReservationStatus
  name
  sessionId
  startTime
  status
  type
  capacities {
    reservableRemaining
    waitlistRemaining
    __typename
  }
  customFieldDetails {
    name
    type
    visibility
    fieldId
    ... on CustomFieldValueFlag {
      enabled
      __typename
    }
    ... on CustomFieldValueSingleSelect {
      value {
        fieldOptionId
        name
        __typename
      }
      __typename
    }
    ... on CustomFieldValueMultiSelect {
      values {
        fieldOptionId
        name
        __typename
      }
      __typename
    }
    ... on CustomFieldValueHyperlink {
      text
      url
      __typename
    }
    __typename
  }
  package {
    itemId
    __typename
  }
  price {
    currency
    value
    __typename
  }
  room {
    name
    venue {
      name
      __typename
    }
    __typename
  }
  sessionType {
    name
    __typename
  }
  tracks {
    name
    __typename
  }
  __typename
}
`;

export const listAttendeeCalendarSessions = `query AttendeeCalendar($eventId: ID!, $limit: Int, $nextToken: String) {
  event(id: $eventId) {
    id
    mySessions(limit: $limit, nextToken: $nextToken) {
      items {
        ...SessionCalendar
        __typename
      }
      __typename
    }
    myFavorites(limit: $limit, nextToken: $nextToken) {
      items {
        ...SessionCalendar
        __typename
      }
      __typename
    }
    myUserSessions {
      items {
        ...UserCalendar
        __typename
      }
      __typename
    }
    __typename
  }
}

fragment SessionCalendar on Session {
  eventId
  sessionId
  name
  description
  startTime
  endTime
  duration
  isBlocking
  alias
  status
  isEmbargoed
  location
  type
  level
  package {
    itemId
    __typename
  }
  sessionType {
    name
    __typename
  }
  tracks {
    name
    __typename
  }
  venue {
    name
    __typename
  }
  room {
    name
    __typename
  }
  capacities {
    total
    reservableRemaining
    waitlistRemaining
    __typename
  }
  price {
    currency
    value
    __typename
  }
  isPaidSession
  isFavoritedByMe
  myReservationStatus
  action
  __typename
}

fragment UserCalendar on UserSession {
  eventId
  sessionId
  name
  description
  startTime
  endTime
  duration
  isBlocking
  location
  __typename
}
`;
