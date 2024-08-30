import { useQuery, useMutation } from '@apollo/client';
import { Col, Form, Input, Row, Radio, Button, DatePicker, App } from 'antd';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { PACKAGES } from '@/_mock/assets';
import Card from '@/components/card';
import { USER_QUERY, UPDATE_WEIGHT, UPDATE_PATIENT, INTAKE_FORM_QUERY } from '@/graphql/query';
import { useUserActions, useUserInfo } from '@/store/userStore';

// const onCheckBoxChange: CheckboxProps['onChange'] = (e) => {
//   console.log(`checked = ${e.target.checked}`);
// };

type FieldType = {
  first_name?: string;
  last_name?: string;
  email?: string;
  phone_number?: string;
  gender?: string;
  height?: string;
  dob?: string;
  weight?: string;
  city: string;
  zip?: string;
  state?: string;
  country?: string;
  line1?: string;
};
export default function GeneralTab() {
  const { notification } = App.useApp();

  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const { setUserInfo } = useUserActions();
  const user = useUserInfo();
  const { data: intakeFormData } = useQuery(INTAKE_FORM_QUERY, {
    variables: {
      custom_module_form_id: '1524146',
      user_id: user.id,
      filler_id: user.id,
    },
  });
  const { loading: userLoading, data: userData } = useQuery(USER_QUERY, {
    variables: { id: user.id },
  });
  const [updateFunction] = useMutation(UPDATE_PATIENT);
  const [updateWeightFunction] = useMutation(UPDATE_WEIGHT);

  useEffect(() => {
    if (
      intakeFormData?.formAnswerGroups?.length > 0 &&
      user?.permissions &&
      user.permissions[0]?.children?.some((key) => key.label !== 'sys.menu.packages')
    ) {
      // Creating the new permissions object with conditional update
      const updatedPermissions = user.permissions.map((permission, index) =>
        index === 0
          ? {
              ...permission,
              children: [
                ...permission.children!,
                ...(permission.children!.some((key) => key.label === 'sys.menu.packages')
                  ? []
                  : [PACKAGES]),
              ],
            }
          : permission,
      );

      // Only update the user if the permissions have changed
      const newUser = { ...user, permissions: updatedPermissions } as any;

      // Check if the user object is different to avoid infinite loops
      if (JSON.stringify(user.permissions) !== JSON.stringify(updatedPermissions)) {
        setUserInfo(newUser);
      }
    }
  }, [intakeFormData, user, setUserInfo]);

  const initFormValues = {
    first_name: userData?.user.first_name,
    last_name: userData?.user.last_name,
    email: userData?.user.email,
    phone_number: userData?.user.phone_number,
    gender: userData?.user.gender,
    height: userData?.user.height,
    city: userData?.user?.location?.city,
    weight: userData?.user?.weight,
    zip: userData?.user?.location?.zip,
    state: userData?.user?.location?.state,
    country: userData?.user?.location?.country,
    line1: userData?.user?.location?.line1,
  };

  const onFinish = async (values: any) => {
    const payload = {
      ...values,
      dob: '2024-10-12',
      role: 'patient',
      next_appt_date: null,
      provider_type: 'openloop',
      dietitian_id: '1322376',
    };
    const updatePayload = {
      input: {
        id: user.id,
        dietitian_id: '1322376',
        dob: payload.dob,
        first_name: payload.first_name,
        last_name: payload.last_name,
        height: `${payload.height}`,
        phone_number: payload.phone,
        additional_record_identifier: '',
        gender: payload.gender,
        location: {
          state: payload.state,
          city: payload.city,
          zip: payload.zip,
          line1: payload.line1,
          line2: 'ria zee',
          country: payload?.country,
        },
      },
    };
    setLoading(true);
    try {
      const updateWeightPayload = {
        category: 'Weight',
        type: 'MetricEntry',
        metric_stat: payload.weight,
        user_id: user.id,
        created_at: '1/7/2024',
      };
      await updateFunction({ variables: { ...updatePayload } });
      await updateWeightFunction({ variables: { ...updateWeightPayload } });
      notification.success({
        message: 'Update success!',
        duration: 3,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Row gutter={[16, 16]}>
      <Col span={24} lg={24}>
        {!userLoading && (
          <Card>
            <Form
              layout="vertical"
              initialValues={{ ...initFormValues }}
              labelCol={{ span: 8 }}
              className="w-full"
              onFinish={onFinish}
            >
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item<FieldType>
                    label="First Name"
                    name="first_name"
                    rules={[{ required: true, message: t('sys.login.firstNamePlaceholder') }]}
                  >
                    <Input value={initFormValues.first_name} />
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item<FieldType>
                    label="Last Name"
                    name="last_name"
                    rules={[{ required: true, message: t('sys.login.lastNamePlaceholder') }]}
                  >
                    <Input value={initFormValues.last_name} />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item<FieldType>
                    label="Email:"
                    name="email"
                    rules={[
                      { required: true, type: 'email', message: t('sys.login.emaildPlaceholder') },
                    ]}
                  >
                    <Input value={initFormValues.email} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item<FieldType>
                    label="Phone"
                    name="phone_number"
                    rules={[{ required: true, message: t('sys.login.mobilePlaceholder') }]}
                  >
                    <Input value={initFormValues.phone_number} />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    label="Date of Birth:"
                    name="dob"
                    rules={[{ message: t('sys.login.dobPlaceholder') }]}
                  >
                    <DatePicker />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Gender"
                    name="gender"
                    rules={[{ required: true, message: t('sys.login.genderPlaceholder') }]}
                  >
                    <Radio.Group value={initFormValues.gender}>
                      <Radio value="Female"> Female </Radio>
                      <Radio value="Male"> Male </Radio>
                    </Radio.Group>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item<FieldType>
                    label="Height"
                    name="height"
                    rules={[{ required: true, message: t('sys.login.heightPlaceholder') }]}
                  >
                    <Input name="height" value={initFormValues.height} />
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item<FieldType>
                    label="Weight"
                    name="weight"
                    rules={[{ required: true, message: t('sys.login.weightPlaceholder') }]}
                  >
                    <Input value={initFormValues.weight} />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item<FieldType>
                    label="Street:"
                    name="line1"
                    rules={[{ required: true, message: t('sys.login.streetPlaceholder') }]}
                  >
                    <Input value={initFormValues.line1} />
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item<FieldType>
                    label="City:"
                    name="city"
                    rules={[{ required: true, message: t('sys.login.cityPlaceholder') }]}
                  >
                    <Input value={initFormValues.city} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item<FieldType>
                    label="State:"
                    name="state"
                    rules={[{ required: true, message: t('sys.login.statePlaceholder') }]}
                  >
                    <Input value={initFormValues.state} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item<FieldType>
                    label="Zip Code:"
                    name="zip"
                    rules={[{ required: true, message: t('sys.login.zipPlaceholder') }]}
                  >
                    <Input value={initFormValues.zip} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item<FieldType>
                    label="Country:"
                    name="country"
                    rules={[{ required: true, message: t('sys.login.countryPlaceholder') }]}
                  >
                    <Input value={initFormValues.country} />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item>
                <Button type="primary" htmlType="submit" className="w-full" loading={loading}>
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Card>
        )}
      </Col>
    </Row>
  );
}
