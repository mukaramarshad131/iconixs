import{aa as e,aF as t,aG as i,aH as n,aI as r,aJ as a,aK as s}from"./index-a09fe141.js";function o(n){var r=e.useContext(t()),a=n||r.client;return i(!!a,50),a}var d,u;function _(e){var t;switch(e){case d.Query:t="Query";break;case d.Mutation:t="Mutation";break;case d.Subscription:t="Subscription"}return t}function l(e){u||(u=new r(a.parser||1e3));var t,n,s=u.get(e);if(s)return s;i(!!e&&!!e.kind,62,e);for(var o=[],_=[],l=[],m=[],p=0,g=e.definitions;p<g.length;p++){var c=g[p];if("FragmentDefinition"!==c.kind){if("OperationDefinition"===c.kind)switch(c.operation){case"query":_.push(c);break;case"mutation":l.push(c);break;case"subscription":m.push(c)}}else o.push(c)}i(!o.length||_.length||l.length||m.length,63),i(_.length+l.length+m.length<=1,64,e,_.length,m.length,l.length),n=_.length?d.Query:d.Mutation,_.length||l.length||(n=d.Subscription);var $=_.length?_:l.length?l:m;i(1===$.length,65,e,$.length);var f=$[0];t=f.variableDefinitions||[];var y={name:f.name&&"Name"===f.name.kind?f.name.value:"data",type:n,variables:t};return u.set(e,y),y}function m(e,t){var n=l(e),r=_(t),a=_(n.type);i(n.type===t,66,r,r,a)}!function(e){e[e.Query=0]="Query",e[e.Mutation=1]="Mutation",e[e.Subscription=2]="Subscription"}(d||(d={})),l.resetCache=function(){u=void 0},!1!==globalThis.__DEV__&&n("parser",(function(){return u?u.size:0}));const p=s`
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
`,g=s`
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
`,c=s`
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
`,$=s`
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
`,f=s`
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
`,y=s`
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
`,h=s`
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
`;s`
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
`;const b=s`
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
`;s`
  query requestedFormCompletions($userId: ID, $keywords: String, $status: String) {
    requestedFormCompletions(user_id: $userId, keywords: $keywords, status: $status) {
      id
      item_type
    }
  }
`;const w=s`
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
`,v=s`
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
`,S=s`
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
`;s`
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
`,s`
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
`;export{c as A,v as C,d as D,b as I,$ as L,S as O,f as S,p as U,y as a,h as b,g as c,w as d,o as u,m as v};
