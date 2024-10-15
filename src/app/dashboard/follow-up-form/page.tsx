import FollowUpForm from '@/components/pages/followUpForm';
import { Metadata } from 'next';
import React from 'react'

export const metadata:Metadata={title: "Intake Form| Iconix Medical"};
export const dynamic = 'force-dynamic';

const IntakeFormPage = () => {
  return (
    <FollowUpForm />
  )
}

export default IntakeFormPage