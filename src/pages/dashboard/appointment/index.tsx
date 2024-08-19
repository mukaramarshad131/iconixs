import { useQuery } from '@apollo/client';

import { APPOINTMENT_QUERY } from '@/graphql/query';
import { useUserInfo } from '@/store/userStore';

function Appointment() {
  const { firstName, lastName, phoneNumber, email, id } = useUserInfo();
  const {
    // loading: userLoading,
    // error,
    data: appointmentData,
  } = useQuery(APPOINTMENT_QUERY, {
    variables: { id },
  });
  console.log('appointmentData: ', appointmentData);

  return (
    <div className="p-2">
      <iframe
        style={{ width: '100%', height: '100vh' }}
        src={`https://express.care-staging.openloophealth.com/book-appointment?appointmentTypeId=156071&providerId=1322376&email=${email}&firstName=${firstName}&lastName=${lastName}&phoneNumber=${phoneNumber}`}
        title="W3Schools Free Online Web Tutorials"
      />
    </div>
  );
}

export default Appointment;
