import { useMutation } from '@apollo/client';
import { useEffect, useState } from 'react';

import { APPOINTMENT } from '@/_mock/assets';
import { CREATE_OPEN_LOOP_INVOICE } from '@/graphql/query';
import { useRouter } from '@/router/hooks';
import { useUserActions, useUserInfo, useUserPlan } from '@/store/userStore';

import { UserInfo } from '#/entity';

function CreateInvoice() {
  const [result, setResult] = useState<any>(null);
  const [createInvoice] = useMutation(CREATE_OPEN_LOOP_INVOICE);
  const { planId } = useUserPlan();
  const { setUserInfo } = useUserActions();
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
      if (!result) {
        const res = await createInvoice({ variables: { ...input } });
        console.log(res);
        if (res) {
          setResult(res?.data);
          if (res && res.data.createFormAnswerGroup.messages === null) {
            const newUser: UserInfo = {
              ...user,
              permissions: user.permissions!.map((permission: any, index: number) =>
                index === 0
                  ? {
                      ...permission,
                      children: [
                        ...permission.children!,
                        ...(permission.children.some(
                          (key: any) => key.label === 'sys.menu.appointment',
                        )
                          ? []
                          : [APPOINTMENT]),
                      ],
                    }
                  : permission,
              ),
            } as any;
            setUserInfo(newUser);
            console.log(user, newUser);
            router.replace('/dashboard/appointment');
          }
        }
      }
    };
    genInvoice();
  }, [result, createInvoice, planId, router, setUserInfo, user]);
  return (
    <div className="flex h-screen w-screen items-center justify-center text-[32px] font-bold italic">
      Please Wait....
    </div>
  );
}

export default CreateInvoice;
