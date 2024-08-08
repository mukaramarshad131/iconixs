// import { useMutation } from '@tanstack/react-query';
import { useMutation } from '@apollo/client';
import { Button, Form, Input, App, Radio, DatePicker, Row, Col } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { SIGNUP_MUTATION, UPDATE_PATIENT, UPDATE_WEIGHT } from '@/graphql/query';

import { ReturnButton } from './components/ReturnButton';
import { LoginStateEnum, useLoginStateContext } from './providers/LoginStateProvider';

import type { DatePickerProps } from 'antd';

function RegisterForm() {
  const { t } = useTranslation();
  const [dob, setDob] = useState('');
  const { notification } = App.useApp();
  const [mutateFunction, { data, loading: signUpLoading, error }] = useMutation(SIGNUP_MUTATION);
  const [updateFunction, { data: updateData, loading: updateLoading, error: updateError }] =
    useMutation(UPDATE_PATIENT);

  const [
    updateWeightFunction,
    { data: updateWeightData, loading: updateWeightLoading, error: updateWeightError },
  ] = useMutation(UPDATE_WEIGHT);

  // const [
  //   intakeFormFunction,
  //   { data: intakeFormtData, loading: intakeFormLoading, error: intakeFormError },
  // ] = useMutation(INTAKE_FORM);
  const [loading, setLoading] = useState(false);
  // const signUpMutation = useMutation({
  //   mutationFn: userService.signup,
  // });

  const { loginState, backToLogin } = useLoginStateContext();
  if (loginState !== LoginStateEnum.REGISTER) return null;
  const onDateChange: DatePickerProps['onChange'] = (date, dateString) => {
    setDob(`${dateString}`);
  };
  const intakeFormPayload = {
    input: {
      custom_module_form_id: '1332293', // Form id for staging
      form_answers: [
        {
          custom_module_id: '11461696',
          label: 'Intake Questionnaire',
          answer: 'qwerty', // HTML format for the intake
        },
        {
          custom_module_id: '10433680',
          label: 'Name',
          answer: '<value here>',
        },
        {
          custom_module_id: '10433695',
          label: 'Provider Name',
          answer: 'jksdrei',
        },
      ],
      name: 'Iconix SOAP Note',
      set_initial_answers: true,
      user_id: '1322391', // Patiend ID from CreatePatient mutation response
    },
  };
  // Handle update weight
  // const handleUpdateWeight = () => {
  //   intakeFormFunction({ variables: { ...intakeFormPayload } });
  // };
  const onFinish = async (values: any) => {
    const payload = {
      ...values,
      dob: values.dob.format('YYYY-MM-DD'),
      role: 'patient',
      next_appt_date: null,
      provider_type: 'openloop',
      dietitian_id: '1322376',
    };
    const updatePayload = {
      input: {
        id: '1432558',
        dob: '01/01/1980',
        height: '5.4ft',
        additional_record_identifier: '',
        gender: 'Female',
        location: {
          state: 'IA',
          city: 'Des Moines',
          zip: '50309',
          line1: '123 Hello',
          line2: 'ria zee',
        },
        // 1432558
      },
    };

    setLoading(true);
    try {
      const {
        data: {
          signUp: { user },
        },
      } = await mutateFunction({ variables: { ...payload } });
      if (user?.id) {
        const updatePayload = {
          input: {
            id: user.id,
            dietitian_id: '1322376',
            dob: payload.dob,
            height: payload.height,
            phone_number: payload.phone,
            additional_record_identifier: '',
            gender: payload.gender,
            location: {
              state: 'IA',
              city: 'Des Moines',
              zip: '50309',
              line1: payload.address,
              line2: 'ria zee',
            },
            // 1432558
          },
        };

        const updateWeightPayload = {
          category: 'Weight',
          type: 'MetricEntry',
          metric_stat: payload.metric_stat,
          user_id: user.id,
          created_at: '1/7/2024',
        };

        const dd = await updateFunction({ variables: { ...updatePayload } });
        const weight = await updateWeightFunction({ variables: { ...updateWeightPayload } });
        // const intakeForm = await intakeFormFunction({ variables: { ...intakeFormPayload } });
      }
      notification.success({
        message: 'Update success!',
        duration: 3,
      });
      // console.log('Received values of form: ', intakeForm);
      // await signUpMutation.mutateAsync(values);
      backToLogin();
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="mb-4 text-2xl font-bold xl:text-3xl">{t('sys.login.signUpFormTitle')}</div>
      <Form name="normal_login" size="large" initialValues={{ remember: true }} onFinish={onFinish}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="first_name"
              rules={[{ required: true, message: t('sys.login.accountPlaceholder') }]}
            >
              <Input placeholder="Enter First Name" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="last_name"
              rules={[{ required: true, message: t('sys.login.accountPlaceholder') }]}
            >
              <Input placeholder="Enter Last Name" />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          name="email"
          rules={[{ required: true, message: t('sys.login.emaildPlaceholder') }]}
        >
          <Input placeholder={t('sys.login.email')} />
        </Form.Item>
        <Form.Item name="dob">
          <DatePicker
            placeholder="Date of Birth"
            format="YYYY-MM-DD"
            onChange={onDateChange}
            style={{ width: '100%' }}
          />
        </Form.Item>
        <Form.Item name="gender">
          <Radio.Group>
            <Radio value="Female"> Female </Radio>
            <Radio value="Male"> Male </Radio>
          </Radio.Group>
        </Form.Item>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="height"
              rules={[{ required: true, message: t('sys.login.accountPlaceholder') }]}
            >
              <Input placeholder="Height" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="metric_stat"
              rules={[{ required: true, message: t('sys.login.accountPlaceholder') }]}
            >
              <Input placeholder="Weight" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="address"
              rules={[{ required: true, message: t('sys.login.accountPlaceholder') }]}
            >
              <Input placeholder="Address" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="phone"
              rules={[{ required: true, message: t('sys.login.accountPlaceholder') }]}
            >
              <Input placeholder="Phone Number" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="password"
              rules={[{ required: true, message: t('sys.login.passwordPlaceholder') }]}
            >
              <Input.Password type="password" placeholder={t('sys.login.password')} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="confirmPassword"
              rules={[
                { required: true, message: t('sys.login.confirmPasswordPlaceholder') },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error(t('sys.login.diffPwd')));
                  },
                }),
              ]}
            >
              <Input.Password type="password" placeholder={t('sys.login.confirmPassword')} />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full" loading={loading}>
            {t('sys.login.registerButton')}
          </Button>
        </Form.Item>

        <div className="mb-2 text-xs text-gray">
          <span>{t('sys.login.registerAndAgree')}</span>
          <a href="./" className="text-sm !underline">
            {t('sys.login.termsOfService')}
          </a>
          {' & '}
          <a href="./" className="text-sm !underline">
            {t('sys.login.privacyPolicy')}
          </a>
        </div>

        <ReturnButton onClick={backToLogin} />
      </Form>
      {/* <Button onClick={handleUpdateWeight}>BBBB</Button> */}
    </>
  );
}

export default RegisterForm;
