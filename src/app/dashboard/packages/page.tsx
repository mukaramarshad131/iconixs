import Packages from '@/components/pages/packages'
import { Metadata } from 'next';


export const metadata:Metadata={title: "Packages | Iconix Medical"};
export const dynamic = 'force-dynamic';

const PackagesPage = () => {
  return (
    <Packages/>
  )
}

export default PackagesPage