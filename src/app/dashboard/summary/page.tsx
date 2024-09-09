import Medication from '@/components/pages/dashboard/medication';
import NewSummary from '@/components/pages/dashboard/new-summary';
import { Metadata } from 'next';


export const metadata:Metadata={title: "Appointment | Iconix Medical"};
export const dynamic = 'force-dynamic';

const Summary = () => {
  return (
    <div>
      <NewSummary />
      <Medication />
    </div>
  )
}

export default Summary