import { useMutation } from '@apollo/client';
import { useEffect } from 'react';

import { CREATE_OPEN_LOOP_INVOICE } from '@/graphql/query';
import { useRouter } from '@/router/hooks';
import { useUserActions, useUserInfo, useUserPlan } from '@/store/userStore';

function GenrateInvoice() {
  const [createInvoice] = useMutation(CREATE_OPEN_LOOP_INVOICE);
  // const [intakeFormFunction, { loading: intakeFormLoading }] = useMutation(INTAKE_FORM);
  const { planId } = useUserPlan();
  const { setUserPlan } = useUserActions();
  const user = useUserInfo();
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
        if (res) {
          setUserPlan({});
          if (res && res.data.createRequestedPayment.messages === null) {
            router.replace('/dashboard');
          }
        }
      }
    };
    genInvoice();
  }, [createInvoice, planId, router, user, setUserPlan]);
  return (
    <div className="flex h-screen w-screen items-center justify-center text-[32px] font-bold italic">
      Please Wait....
    </div>
  );
}

export default GenrateInvoice;
