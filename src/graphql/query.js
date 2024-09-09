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
        line1
        line2
        state
        zip
        country
      }
    }
  }
`;
export const APPOINTMENTS_QUERY = gql`
  query appointments(
    $user_id: ID
    $filter: String
    $order_by: AppointmentOrderKeys
    $should_paginate: Boolean
    $offset: Int
    $is_active: Boolean
    $with_all_statuses: Boolean
  ) {
    appointmentsCount(user_id: $user_id, filter: $filter, is_org: true, is_active: $is_active)
    appointments(
      is_active: $is_active
      user_id: $user_id
      filter: $filter
      is_org: true
      order_by: $order_by
      should_paginate: $should_paginate
      offset: $offset
      with_all_statuses: $with_all_statuses
    ) {
      id
      date
      contact_type
      length
      location
      provider {
        id
        full_name
      }

      appointment_type {
        name
        id
      }

      attendees {
        id
        full_name
        first_name
        avatar_url
        phone_number
      }
    }
  }
`;
export const APPOINTMENT_QUERY = gql`
  query Appointment($id: ID!) {
    appointment(id: $id, include_deleted: true) {
      appointment_type {
        id
        name
      }
      created_at
      end
      external_videochat_url
      id
      initiator_id
      pm_status
      pm_status_changed_at
      pm_status_last_changed_by_id
      provider {
        id
        name
        organization {
          id
        }
      }
      start
      user {
        active_tags {
          id
          name
        }
        id
        email
        first_name
        last_name
        sex
        dob
        location {
          city
          country
          line1
          line2
          state
          zip
        }
        phone_number
      }
      user_id
      zoom_join_url
      zoom_start_url
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
          line1
          line2
          state
          zip
          country
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

export const INTAKE_FORM2 = gql`
  mutation CreateFormAnswerGroup($input: createFormAnswerGroupInput!) {
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
export const INTAKE_FORM_QUERY2 = gql`
  query requestedFormCompletions($userId: ID, $keywords: String, $status: String) {
    requestedFormCompletions(user_id: $userId, keywords: $keywords, status: $status) {
      id
      item_type
    }
  }
`;
export const INTAKE_FORM_QUERY = gql`
  query formAnswerGroups($custom_module_form_id: ID, $user_id: String) {
    formAnswerGroups(custom_module_form_id: $custom_module_form_id, user_id: $user_id) {
      id
      name
      created_at
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
  }
`;

export const CREATE_OPEN_LOOP_INVOICE = gql`
  mutation createRequestedPayment(
    $recipient_id: ID # e.g "61"
    $offering_id: ID # e.g "11"
    $price: String # can be left blank since it will default to the price of the package
    $invoice_type: String # "offering"
  ) {
    createRequestedPayment(
      input: {
        recipient_id: $recipient_id
        offering_id: $offering_id
        price: $price
        invoice_type: $invoice_type
      }
    ) {
      requestedPayment {
        id
      }
      messages {
        field
        message
      }
    }
  }
`;
export const OPEN_LOOP_INVOICES_LIST = gql`
  query requestedPayments(
    $offset: Int
    $keywords: String
    $sort_by: String
    $only_unpaid: Boolean
    $sender_id: ID
    $status_filter: String
    $preview: Boolean
  ) {
    requestedPayments(
      offset: $offset
      keywords: $keywords
      sort_by: $sort_by
      only_unpaid: $only_unpaid
      sender_id: $sender_id
      status_filter: $status_filter
      preview: $preview
    ) {
      id
      price
      status
      invoice_id
      recipient {
        id
      }
      sender {
        id
      }
    }
  }
`;
export const GET_INTAKE_FORM = gql`
  query form($id: ID) {
    customModuleForm(id: $id) {
      id
      has_matrix_field
      has_non_readonly_modules
      is_video
      name
      prefill
      use_for_charting
      use_for_program

      custom_modules {
        id
        label
        hipaa_name
        mod_type
        options
      }
    }
  }
`;
export const CREATE_CUSTOM_FORM = gql`
  mutation createCustomModuleForm(
    $name: String
    $use_for_charting: Boolean
    $use_for_program: Boolean
  ) {
    createCustomModuleForm(
      input: { name: $name, use_for_charting: $use_for_charting, use_for_program: $use_for_program }
    ) {
      customModuleForm {
        id
      }
      messages {
        field
        message
      }
    }
  }
`;
export const GET_CARE_PLAN = gql`
  query carePlan(
  $id: ID
) {
  carePlan(
    id: $id
  ) {
    id
    name
    patient {
      id
    }
  }
}
`;

export const GET_MEDICATION_LIST = gql`
  query medications(
  $active: Boolean,
  $patient_id: ID
) {
  medications(
    active: $active,
    patient_id: $patient_id
  ) {
    id
    name
    active
    directions
    dosage
    code
    start_date
    end_date
  }
}
`;
