import { useQuery } from '@apollo/client';

import { APPOINTMENT_QUERY, APPOINTMENTS_QUERY } from '@/graphql/query';
// import ChargeBeeWrapper from '@/pages/components/chagebee/ChargeBeeWrapper';
import { useUserInfo } from '@/store/userStore';

function Appointment() {
  const { firstName, lastName, phoneNumber, email, id } = useUserInfo();
  const {
    // loading: userLoading,
    // error,
    data: appointmentData,
  } = useQuery(APPOINTMENT_QUERY, {
    variables: { id: '664304' },
  });
  const { data: appointmentListing } = useQuery(APPOINTMENTS_QUERY, {
    variables: {
      user_id: id,
      filter: 'all',
      order_by: 'DATE_DESC',
      should_paginate: false,
      is_active: true,
      with_all_statuses: true,
    },
  });
  console.log('id12345: ', id);
  console.log('appointmentData: ', appointmentData);
  console.log('appointmentListing: ', appointmentListing);

  return (
    <div className="p-2">
      {/* <ChargeBeeWrapper /> */}
      <iframe
        style={{ width: '100%', height: '100vh' }}
        src={`https://express.care-staging.openloophealth.com/book-appointment?appointmentTypeId=156071&providerId=1322376&email=${email}&firstName=${firstName}&lastName=${lastName}&phoneNumber=${phoneNumber}`}
        title="W3Schools Free Online Web Tutorials"
      />
    </div>
  );
}

export default Appointment;
