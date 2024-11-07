import { gql } from '@apollo/client';

// Define your GraphQL query to get products
export const GET_PRODUCTS = gql`
  query {
    products {
      name
      price
    }
  }
`;

export const GET_USERS = gql`
  query {
    users {
      name
      email
      city
      age
      m_status
    }
  }
`;


export const CREATE_USER = gql`
    mutation CreateUser($name: String!, $email: String!, $age: String, $city: String) {
        createUser(name: $name, email: $email, age: $age, city: $city) {
            _id
            name
            email
            city
            age
        }
    }
`;

