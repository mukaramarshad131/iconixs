import GenrateInvoice from '@/components/pages/createInvoice'
import { Metadata } from 'next';
import React from 'react'

export const metadata:Metadata={title: "Invoices | Iconix Medical"};
export const dynamic = 'force-dynamic';

const CreateInvoicePage = () => {
  return (
    <GenrateInvoice/>
  )
}

export default CreateInvoicePage