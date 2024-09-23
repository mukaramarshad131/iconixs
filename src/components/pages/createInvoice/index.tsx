'use client'
import { useMutation } from '@apollo/client';
import { useEffect } from 'react';
import { CREATE_OPEN_LOOP_INVOICE, INTAKE_FORM, UPLOAD_DOCS } from '@/graphql/query';
import { useIntakeForm, useIntakeDoc, useUserActions, useUserInfo, useUserPlan, useUserPermissions } from '@/store/userStore';
import { useRouter } from 'next/navigation';
import { Modal } from 'antd';


function GenrateInvoice() {
  const [createInvoice] = useMutation(CREATE_OPEN_LOOP_INVOICE);
  const [intakeFormFunction] = useMutation(INTAKE_FORM);
  const permissions = useUserPermissions();
  const planId = useUserPlan();
  const { setUserPlan, setUserPermissions } = useUserActions();
  const user = useUserInfo();
  const intakeForm = useIntakeForm();
  const intakeDoc = useIntakeDoc();
  const router = useRouter();

  const [mutateFunction] = useMutation(UPLOAD_DOCS);

  const onFileChange = async (value: string, fieldType: boolean) => {
    const updatePayload = {
      input: {
        "file_string": value,
        "display_name": fieldType ? "File Driving Liscense" : "File Social Security Number",
        "rel_user_id": user.id,
        "include_in_charting": true
      },
    };
    await mutateFunction({ variables: { ...updatePayload } });
  };

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
        intakeDoc && await onFileChange(intakeDoc.upload_driving_liscense, true);
        intakeDoc && await onFileChange(intakeDoc.upload_social_security, false);
        intakeForm && await intakeFormFunction({ variables: { ...intakeForm } });
        
        if (res) {
          setUserPlan('');
          if (res && res.data.createRequestedPayment.messages === null) {
            setUserPermissions([...permissions.filter(x => x !== '/dashboard/packages')]);
            Modal.success({ content: "Your request is submitted successfully." })
            router.replace('/dashboard');
          }
        }
      }
    };
    genInvoice();
    //eslint-disable-next-line
  }, []);
  return (
    <div className="flex h-[70vh]  items-center justify-center">
      <div className="max-w-2xl text-center">
        <h1 className="text-2xl font-extrabold text-slate-900 sm:text-3xl"> Thank you for trusting us</h1>
        <div className="mt-6 text-base leading-7 text-slate-600"> We are pleased to inform you that we will be processing your <strong className="font-semibold text-slate-900">at-home lab order shortly. </strong> You will receive an email soon with detailed instructions on the next steps, including how to complete the process and any additional information you may need.</div>
      </div>
    </div>
  );
}

export default GenrateInvoice;
