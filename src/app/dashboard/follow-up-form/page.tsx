import FollowUpForm from '@/components/pages/followUpForm';
import { Metadata } from 'next';
import React from 'react'

export const metadata:Metadata={title: "Follow Up Form| Iconix Medical"};
export const dynamic = 'force-dynamic';

const FollowUpFormPage = () => {
  return (
    <FollowUpForm />
  )
}

export default FollowUpFormPage