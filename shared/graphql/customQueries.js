export const getClientCustom = /* GraphQL */ `
  query GetClient($id: ID!) {
    getClient(id: $id) {
      id
      firstName
      lastName
      company
      phone
      email
      notes
      favorite
      clientStreet
      clientCity
      clientState
      clientZip
      connectionHistory {
        items {
          id
          title
          date
          clientId
          owner
          createdAt
          updatedAt
        }
        nextToken
      }
      properties {
        items {
          id
          street
          city
          state
          zip
          price
          note
          clientId
          owner
          createdAt
          updatedAt
        }
        nextToken
      }
      tasks {
        items {
          id
          clientId
          propertyId
          title
          content
          completed
          date
          notificationId
          owner
          createdAt
          updatedAt
        }
        nextToken
      }
      group {
        items {
          id
          clientID
          clientGroupID
          createdAt
          updatedAt
          owner
          clientGroup {
            title
          }
        }
        nextToken
      }
      reminder {
        items {
          id
          date
          recurring
          recurDate
          notificationId
          clientId
          owner
          createdAt
          updatedAt
        }
        nextToken
      }
      owner
      createdAt
      updatedAt
    }
  }
`;

export const getPropertyCustom = /* GraphQL */ `
  query GetProperty($id: ID!) {
    getProperty(id: $id) {
      id
      street
      city
      state
      zip
      price
      note
      tasks {
        items {
          id
          clientId
          propertyId
          title
          content
          completed
          date
          notificationId
          owner
          createdAt
          updatedAt
        }
        nextToken
      }
      group {
        items {
          id
          propertyID
          propertyGroupID
          createdAt
          updatedAt
          owner
          propertyGroup {
            title
          }
        }
        nextToken
      }
      clientId
      owner
      createdAt
      updatedAt
    }
  }
`;


export const getClientGroups = /* GraphQL */ `
  query GetClient($id: ID!) {
    getClient(id: $id) {
      id
      firstName
      lastName
      group {
        items {
          id
          clientGroupID
          owner
        }
        nextToken
      }
    }
  }
`;

export const listClientGroupsWithClients = /* GraphQL */ `
  query ListClientGroups(
    $filter: ModelClientGroupFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listClientGroups(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        clients {
          items {
            id
            clientID
            clientGroupID
            createdAt
              client {
                id
                firstName
                lastName
                phone
                email
                company
              }
          }
          nextToken
        }
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;

export const getClientGroupWithClientDetails = /* GraphQL */ `
  query GetClientGroup($id: ID!) {
    getClientGroup(id: $id) {
      id
      title
      clients {
        items {
          id
          clientID
          clientGroupID
          createdAt
          updatedAt
          owner
            client {
              id
              firstName
              lastName
              phone
              email
              company
            }
        }
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`;

export const createReminder = /* GraphQL */ `
  mutation CreateReminder(
    $input: CreateReminderInput!
    $condition: ModelReminderConditionInput
  ) {
    createReminder(input: $input, condition: $condition) {
      id
      date
      recurring
      recurDate
      clientId
      client {
        id
        firstName
        lastName
        reminder {
          id
          date
          recurring
          recurDate
          clientId
          createdAt
          updatedAt
          owner
        }
        createdAt
        updatedAt
        clientReminderId
        owner
      }
      createdAt
      updatedAt
      owner
    }
  }
`;

export const listReminders = /* GraphQL */ `
  query ListReminders(
    $filter: ModelReminderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listReminders(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        date
        recurring
        recurDate
        clientId
        client {
          id
          firstName
          lastName
          company
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;

export const listPropertyGroupsWithProperties = /* GraphQL */ `
  query ListPropertyGroups(
    $filter: ModelPropertyGroupFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPropertyGroups(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        description
        properties {
          items {
            id
            propertyID
            propertyGroupID
            createdAt
              property {
                id
                street
              }
          }
          nextToken
        }
        owner
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;

export const getPropertyWithGroups = /* GraphQL */ `
  query GetProperty($id: ID!) {
    getProperty(id: $id) {
      id
      street
      city
      state
      zip
      price
      note
      tasks {
        items {
          id
          clientId
          propertyId
          title
          content
          completed
          date
          notificationId
          owner
          createdAt
          updatedAt
        }
        nextToken
      }
      group {
        items {
          id
          propertyID
          propertyGroupID
          createdAt
          updatedAt
          owner
          propertyGroup {
            id
            title
          }
        }
        nextToken
      }
      clientId
      owner
      createdAt
      updatedAt
    }
  }
`;