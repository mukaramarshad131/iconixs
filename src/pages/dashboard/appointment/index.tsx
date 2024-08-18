import { useUserInfo } from '@/store/userStore';

function Appointment() {
  const {
    firstName = 'muhammad',
    lastName = 'Ismail',
    phoneNumber = '0234235343',
    email = 'ismail@gmail.com',
  } = useUserInfo();

  return (
    <div className="p-2">
      {firstName} - {lastName} - {phoneNumber}
      <iframe
        style={{ width: '100%', height: '120vh' }}
        src={`https://express.care-staging.openloophealth.com/book-appointment?appointmentTypeId=156071&providerId=1322376&email=${email}&firstName=${firstName}&lastName=${lastName}&phoneNumber=${phoneNumber}`}
        title="W3Schools Free Online Web Tutorials"
      />
    </div>
  );
}

export default Appointment;
