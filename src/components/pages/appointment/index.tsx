import { useQuery } from '@apollo/client';

import { APPOINTMENT_QUERY, APPOINTMENTS_QUERY } from '@/graphql/query';
import { useUserInfo } from '@/store/userStore';
import Loader from '@/components/atom/Loader/Loader';

function Appointment() {
  const { first_name, last_name, phoneNumber, email, id } = useUserInfo();
  const {
    loading,
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
      {loading?<Loader/>:<iframe
        style={{ width: '100%', height: '100vh' }}
        src={process.env.OPEN_LOOP_Create_APPOINTMENT_LINK+`?appointmentTypeId=156071&providerId=1322376&email=${email}&firstName=${first_name}&lastName=${last_name}&phoneNumber=${phoneNumber}`}
        title="W3Schools Free Online Web Tutorials"
      />}
    </div>
  );
}

export default Appointment;
