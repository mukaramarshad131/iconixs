import { gql } from '@apollo/client';

export const USER_QUERY = gql`
  query User($id: ID!) {
    user(id: $id) {
      id
      email
      first_name
      last_name
      phone_number
      dob
      gender
      height
      weight
      location {
        city
      }
    }
  }
`;
export const LOGIN_MUTATION = gql`
  mutation signIn($email: String, $password: String, $tokenAPI: Boolean, $multipleAPI: Boolean) {
    signIn(
      input: {
        email: $email
        password: $password
        generate_api_token: $tokenAPI
        allow_multiple_api_keys: $multipleAPI
      }
    ) {
      user {
        id
        email
        first_name
        last_name
        phone_number
        dob
        gender
        height
        location {
          city
        }
      }

      messages {
        field
        message
      }
      token
    }
  }
`;

export const SIGNUP_MUTATION = gql`
  mutation signUp(
    $timezone: String
    $first_name: String
    $last_name: String
    $email: String
    $password: String
    $phone_number: String
    $invite_code: String
    $role: String
    $dietitian_id: String
  ) {
    signUp(
      input: {
        first_name: $first_name
        last_name: $last_name
        email: $email
        password: $password
        phone_number: $phone_number
        invite_code: $invite_code
        role: $role
        dietitian_id: $dietitian_id
        timezone: $timezone
      }
    ) {
      user {
        id
      }
      messages {
        field
        message
      }
    }
  }
`;

export const UPDATE_PATIENT = gql`
  mutation UpdateClient($input: updateClientInput!) {
    updateClient(input: $input) {
      user {
        id
        dob
        gender
        height
        additional_record_identifier
        location {
          city
          line1
          line2
          state
          zip
          country
        }
      }
    }
  }
`;

export const UPDATE_WEIGHT = gql`
  mutation createEntry(
    $metric_stat: String # e.g "182"
    $category: String # e.g "Weight"
    $type: String # "MetricEntry"
    $user_id: String # e.g "61"
    $created_at: String # e.g "2021-09-23 15:27:01 -0400"
  ) {
    createEntry(
      input: {
        category: $category
        type: $type
        metric_stat: $metric_stat
        user_id: $user_id
        created_at: $created_at
      }
    ) {
      entry {
        id
      }
      messages {
        field
        message
      }
    }
  }
`;

export const INTAKE_FORM = gql`
  mutation CreateFormAnswerGroup($input: createFormAnswerGroupInput) {
    createFormAnswerGroup(input: $input) {
      form_answer_group {
        id
        name

        form_answers {
          label
          displayed_answer
          id
          custom_module {
            required
            id
            mod_type
            label
          }
        }
      }
      messages {
        field
        message
      }
    }
  }
`;
