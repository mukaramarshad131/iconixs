import ItakeForm from '@/components/pages/intakeForm'
import { Metadata } from 'next';
import React from 'react'

export const metadata:Metadata={title: "Intake Form| Iconix Medical"};
export const dynamic = 'force-dynamic';

const IntakeFormPage = () => {
  return (
    <ItakeForm/>
  )
}

export default IntakeFormPage