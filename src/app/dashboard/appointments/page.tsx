import Appointment from '@/components/pages/appointment'
import { Metadata } from 'next';


export const metadata:Metadata={title: "Appointment | Iconix Medical"};
export const dynamic = 'force-dynamic';

const AppointmentsPage = () => {
  return (
    <Appointment/>
  )
}

export default AppointmentsPage