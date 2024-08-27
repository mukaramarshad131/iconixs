import { faker } from '@faker-js/faker';

export const fakeAvatars = (count) => {
  const result = [];
  for (let index = 0; index < count; index += 1) {
    result.push(faker.image.avatarLegacy());
  }
  return result;
};
// export const fakeRole = (count) => {
export const result = {
  id: '4281707933534332',
  name: 'Admin',
  label: 'admin',
  status: 1,
  order: 1,
  desc: 'Super Admin',
  permission: [

    {
      id: '9100714781927703',
      parentId: '',
      label: 'sys.menu.dashboard',
      name: 'Dashboard',
      icon: 'ic-analysis',
      type: 0,
      route: 'dashboard',
      order: 1,
      children: [
        {
          id: '8426999229400979',
          parentId: '9100714781927703',
          label: 'sys.menu.patientDetails',
          name: 'Patient Details',
          type: 1,
          route: 'patientDetails',
          component: '/dashboard/patientDetails/index.tsx',
        },
        {
          id: '9710971640510357',
          parentId: '9100714781927703',
          label: 'sys.menu.intakeForm',
          name: 'Intake Form',
          type: 1,
          route: 'intakeForm',
          component: '/dashboard/intakeForm/index.tsx',
        },
        {
          id: '9710971640510357',
          parentId: '9100714781927703',
          label: 'sys.menu.appointment',
          name: 'appointment',
          type: 1,
          route: 'appointment',
          component: '/dashboard/appointment/index.tsx',
        },
      ],
    },
    // {
    //   id: '0901673425580518',
    //   parentId: '',
    //   label: 'sys.menu.management',
    //   name: 'Management',
    //   icon: 'ic-management',
    //   type: 0,
    //   route: 'management',
    //   order: 2,
    //   children: [
    //     {
    //       id: '2781684678535711',
    //       parentId: '0901673425580518',
    //       label: 'sys.menu.user.index',
    //       name: 'User',
    //       type: 0,
    //       route: 'user',
    //       children: [
    //         {
    //           id: '4754063958766648',
    //           parentId: '2781684678535711',
    //           label: 'sys.menu.user.profile',
    //           name: 'Profile',
    //           type: 1,
    //           route: 'profile',
    //           component: '/management/user/profile/index.tsx',
    //         },
    //       ],
    //     },
    //   ],
    // },
  ],
};
//   return result;
// };

export const UserPermissions = () => {
  const result = [
    {
      id: '9100714781927703',
      parentId: '',
      label: 'sys.menu.dashboard',
      name: 'Dashboard',
      icon: 'ic-analysis',
      type: 0,
      route: 'dashboard',
      order: 1,
      children: [
        {
          id: '8426999229400979',
          parentId: '9100714781927703',
          label: 'sys.menu.patientDetails',
          name: 'Patient Details',
          type: 1,
          route: 'patientDetails',
          component: '/dashboard/patientDetails/index.tsx',
        },
        {
          id: '9710971640510357',
          parentId: '9100714781927703',
          label: 'sys.menu.intakeForm',
          name: 'Intake Form',
          type: 1,
          route: 'intakeForm',
          component: '/dashboard/intakeForm/index.tsx',
        },
        // {
        //   id: '9710971640510357',
        //   parentId: '9100714781927703',
        //   label: 'sys.menu.appointment',
        //   name: 'Appointment',
        //   type: 1,
        //   hide:true,
        //   route: 'appointment',
        //   component: '/dashboard/appointment/index.tsx',
        // },
        // {
        //   id: '9710971640510357',
        //   parentId: '9100714781927703',
        //   label: 'sys.menu.packages',
        //   name: 'Packages',
        //   type: 1,
        //   // hide:true,
        //   route: 'packages',
        //   component: '/dashboard/packages/index.tsx',
        // },
        {
          id: '9710971640510357',
          parentId: '9100714781927703',
          label: 'sys.menu.checkout',
          name: 'Check Out',
          type: 1,
          hide:true,
          route: 'checkout',
          component: '/dashboard/checkout/index.tsx',
        },
      ],
    },
    // {
    //   id: '0901673425580518',
    //   parentId: '',
    //   label: 'sys.menu.management',
    //   name: 'Management',
    //   icon: 'ic-management',
    //   type: 0,
    //   route: 'management',
    //   order: 2,
    //   children: [
    //     {
    //       id: '2781684678535711',
    //       parentId: '0901673425580518',
    //       label: 'sys.menu.user.index',
    //       name: 'User',
    //       type: 0,
    //       route: 'user',
    //       children: [
    //         {
    //           id: '4754063958766648',
    //           parentId: '2781684678535711',
    //           label: 'sys.menu.user.profile',
    //           name: 'Profile',
    //           type: 1,
    //           route: 'profile',
    //           component: '/management/user/profile/index.tsx',
    //         },
    //       ],
    //     },
    //   ],
    // },
  ];
  return result;
};
