'use client'
import { useMutation } from '@apollo/client';
import { useEffect } from 'react';
import { CREATE_OPEN_LOOP_INVOICE, INTAKE_FORM } from '@/graphql/query';
import { useIntakeForm, useUserActions, useUserInfo, useUserPlan } from '@/store/userStore';
import { useRouter } from 'next/navigation';
import { Modal } from 'antd';

function GenrateInvoice() {
  const [createInvoice] = useMutation(CREATE_OPEN_LOOP_INVOICE);
  const [intakeFormFunction] = useMutation(INTAKE_FORM);
  const  planId  = useUserPlan();
  const { setUserPlan } = useUserActions();
  const user = useUserInfo();
  const intakeForm = useIntakeForm();
  const router = useRouter();

  useEffect(() => {
    const genInvoice = async () => {
      const input = {
        recipient_id: user.id,
        offering_id: planId,
        price: '249',
        invoice_type: 'offering',
      } as any;
      if (planId) {
        const res = await createInvoice({ variables: { ...input } });
        intakeForm&& await intakeFormFunction({ variables: { ...intakeForm } });
        if (res) {
          console.log(res)
          setUserPlan('');
          if (res && res.data.createRequestedPayment.messages === null) {
            Modal.success({content:"Your request is submitted successfully."})
            router.replace('/dashboard');
          }
        }
      }
    };
    genInvoice();
    //eslint-disable-next-line
  }, []);
  return (
    <div className="flex h-screen w-screen items-center justify-center text-[32px] font-bold italic">
      Please Wait....
    </div>
  );
}

export default GenrateInvoice;
