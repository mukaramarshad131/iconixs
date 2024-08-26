import { useQuery, useMutation } from '@apollo/client';
import { Col, Form, Input, Row, Radio, Button, DatePicker, App } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import Card from '@/components/card';
import { USER_QUERY, UPDATE_WEIGHT, UPDATE_PATIENT } from '@/graphql/query';
import { useUserInfo } from '@/store/userStore';

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
  const {
    //  username,
    id,
  } = useUserInfo();

  const {
    loading: userLoading,
    // error: userError,
    data: userData,
  } = useQuery(USER_QUERY, {
    variables: { id },
  });

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

  const [updateFunction] = useMutation(UPDATE_PATIENT);
  const [updateWeightFunction] = useMutation(UPDATE_WEIGHT);

  // console.log(dayjs(initFormValues.dob, dateFormat));
  // const handleClick = () => {
  //   notification.success({
  //     message: 'Update success!',
  //     duration: 3,
  //   });
  // };

  // const onChange12 = (e: RadioChangeEvent) => {
  //   console.log('radio checked', e.target.value);
  //   setValue(e.target.value);
  // };
  // const msk = dayjs(initFormValues.dob, dateFormat);
  // const onDateChange: DatePickerProps['onChange'] = (date, dateString) => {
  //   console.log(date, dateString);
  // };
  // useEffect(() => {
  //   console.log('Effact', userData);
  //   initFormValues = {
  //     ...userData?.user
  //   }
  // }, [userLoading, userData]);
  // const { TextArea } = Input;

  // interface DataType {
  //   key: string;
  //   name: string;
  //   money: string;
  //   address: string;
  // }

  const onFinish = async (values: any) => {
    const payload = {
      ...values,
      dob: '2024-10-12',
      role: 'patient',
      next_appt_date: null,
      provider_type: 'openloop',
      dietitian_id: '1322376',
    };
    console.log('payload: ', payload);
    const updatePayload = {
      input: {
        id,
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
        // 1432558
      },
    };
    setLoading(true);
    try {
      const updateWeightPayload = {
        category: 'Weight',
        type: 'MetricEntry',
        metric_stat: payload.weight,
        user_id: id,
        created_at: '1/7/2024',
      };
      await updateFunction({ variables: { ...updatePayload } });
      await updateWeightFunction({ variables: { ...updateWeightPayload } });
      notification.success({
        message: 'Update success!',
        duration: 3,
      });
      // const intakeForm = await intakeFormFunction({ variables: { ...intakeFormPayload } });
    } finally {
      // console.log('Received values of form: ', intakeForm);
      // await signUpMutation.mutateAsync(values);
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
                    {/* <DatePicker defaultValue={dayjs(initFormValues.dob).format('YYYY-MM-DD')} /> */}
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

              {/* <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Gender">
                  <Radio.Group>
                    <Radio value="Female"> Female </Radio>
                    <Radio value="Male"> Male </Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>
            </Row> */}

              <Row gutter={16}>
                {/* <Col span={12}>
                  <Form.Item<FieldType> label="Address" name="city">
                    <Input />
                  </Form.Item>
                </Col> */}
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

              <Row gutter={16}>
                {/* <Col span={12}>
                <Form.Item<FieldType> label="Mobile Phone:" name="city">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item<FieldType> label="Home Phone:" name="code">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item<FieldType> label="Work Phone:" name="code">
                  <Input />
                </Form.Item>
              </Col> */}
                {/* <Col span={12}>
                <Form.Item<FieldType> label="Email:" name="code">
                  <Input />
                </Form.Item>
              </Col> */}
                {/* <Col span={12}>
                <Form.Item label="Preferred contact method:">
                  <Radio.Group>
                    <Radio value="Mobile Phone"> Mobile Phone </Radio>
                    <Radio value="Home Phone"> Home Phone </Radio>
                    <Radio value="Work Phone">Work Phone</Radio>
                    <Radio value="Email"> Email </Radio>
                  </Radio.Group>
                </Form.Item>
              </Col> */}
              </Row>
              {/* <Row gutter={16}>
              <Col span={12}>
                <Form.Item<FieldType> label="About" name="about">
                  <Input.TextArea />
                </Form.Item>
              </Col>
            </Row> */}

              {/* <div className="flex w-full justify-end">
              <Button type="primary" onClick={handleClick}>
                Save Changes
              </Button>
            </div> */}
              <Form.Item>
                <Button type="primary" htmlType="submit" className="w-full" loading={loading}>
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Card>
        )}
      </Col>

      {/* <Col span={24} lg={24}>
        <Card>
          <Form
            layout="vertical"
            initialValues={initFormValues}
            labelCol={{ span: 8 }}
            className="w-full"
          >
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Preferred Language:">
                  <Radio.Group>
                    <Radio value="English"> English </Radio>
                    <Radio value="Spanish"> Spanish </Radio>
                    <Radio value="Other"> Other</Radio>
                  </Radio.Group>
                </Form.Item>
                <Form.Item label="TextArea">
                  <TextArea rows={4} />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
      </Col>

      <Col span={24} lg={24}>
        <Card>
          <Form
            layout="vertical"
            initialValues={initFormValues}
            labelCol={{ span: 8 }}
            className="w-full"
          >
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Race (Please check all that apply):">
                  <Checkbox>White</Checkbox>
                  <Checkbox>Black</Checkbox>
                  <Checkbox>Asian</Checkbox>
                  <Checkbox>American Indian/Native Alaskan</Checkbox>
                  <Checkbox>Native Hawaiian/Pacific Islander </Checkbox>
                  <Checkbox>Other</Checkbox>
                </Form.Item>

                <Form.Item label="TextArea">
                  <TextArea rows={4} />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
      </Col> */}

      {/* <Col span={24} lg={24}>
        <Card>
          <Form
            layout="vertical"
            initialValues={initFormValues}
            labelCol={{ span: 8 }}
            className="w-full"
          >
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Ethnicity:">
                  <Checkbox>Hispanic/Latino(a)</Checkbox>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
      </Col> */}

      {/* <Col span={24} lg={24}>
        <Card>
          <Form
            layout="vertical"
            initialValues={initFormValues}
            labelCol={{ span: 8 }}
            className="w-full"
          >
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item<FieldType> label="How did you learn about this office?" name="name">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item<FieldType> label="Who referred you?" name="name">
                  <Input />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
      </Col> */}

      {/* <Col span={24} lg={24}>
        <Card>
          <Form
            layout="vertical"
            initialValues={initFormValues}
            labelCol={{ span: 8 }}
            className="w-full"
          >
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item<FieldType> label="Emergency Contact:" name="name">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item<FieldType> label="Relationship:" name="name">
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item<FieldType> label="Address:" name="name">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item<FieldType> label="City, State & Zip:" name="name">
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item<FieldType> label="Phone:" name="name">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item<FieldType> label="Alt. Phone:" name="name">
                  <Input />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
      </Col> */}

      {/* <Col span={24} lg={24}>
        <Card>
          <Form
            layout="vertical"
            initialValues={initFormValues}
            labelCol={{ span: 8 }}
            className="w-full"
          >
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item<FieldType> label="Family Doctor:" name="name">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item<FieldType> label="Phone:" name="name">
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item<FieldType> label="Other Health Provider:" name="name">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item<FieldType> label="Phone:" name="name">
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item<FieldType> label="Pharmacy:" name="name">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item<FieldType> label="Phone:" name="name">
                  <Input />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
      </Col> */}

      {/* <Col span={24} lg={24}>
        <Card>
          <Form
            layout="vertical"
            initialValues={initFormValues}
            labelCol={{ span: 8 }}
            className="w-full"
          >
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item<FieldType> label="Family Doctor:" name="name">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item<FieldType> label="Phone:" name="name">
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item<FieldType> label="Other Health Provider:" name="name">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item<FieldType> label="Phone:" name="name">
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item<FieldType> label="Pharmacy:" name="name">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item<FieldType> label="Phone:" name="name">
                  <Input />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
      </Col> */}

      {/* <Col span={24} lg={24}>
        <Card>
          <Form
            layout="vertical"
            initialValues={initFormValues}
            labelCol={{ span: 8 }}
            className="w-full"
          >
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Do you have Medical Insurance?">
                  <Radio.Group>
                    <Radio value="Yes"> Yes </Radio>
                    <Radio value="No"> No</Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
      </Col> */}
      {/* 
      <h1>What brings you in today?</h1>
      <Col span={24} lg={24}>
        <Card>
          <Form
            layout="vertical"
            initialValues={initFormValues}
            labelCol={{ span: 8 }}
            className="w-full"
          >
            <Row gutter={16}>
              <h2>Problem 1:</h2>
              <Col span={12}>
                <Form.Item<FieldType>
                  label="Please describe the issue you're experiencing:"
                  name="name"
                >
                  <Input.TextArea />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item<FieldType> label="How long have you had this problem?" name="name">
                  <Input />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="How severe is this problem?">
                  <Radio.Group>
                    <Radio value="Mild"> Mild </Radio>
                    <Radio value="Moderate"> Moderate</Radio>
                    <Radio value="Severe"> Severe</Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item<FieldType>
                  label="Have you tried anything to treat this problem?"
                  name="name"
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
      </Col>

      <Col span={24} lg={24}>
        <Card>
          <Form
            layout="vertical"
            initialValues={initFormValues}
            labelCol={{ span: 8 }}
            className="w-full"
          >
            <Row gutter={16}>
              <h2>Problem 2:</h2>
              <Col span={12}>
                <Form.Item<FieldType>
                  label="Please describe the issue you're experiencing:"
                  name="name"
                >
                  <Input.TextArea />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item<FieldType> label="How long have you had this problem?" name="name">
                  <Input />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="How severe is this problem?">
                  <Radio.Group>
                    <Radio value="Mild"> Mild </Radio>
                    <Radio value="Moderate"> Moderate</Radio>
                    <Radio value="Severe"> Severe</Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item<FieldType>
                  label="Have you tried anything to treat this problem?"
                  name="name"
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
      </Col>

      <Col span={24} lg={24}>
        <Card>
          <Form
            layout="vertical"
            initialValues={initFormValues}
            labelCol={{ span: 8 }}
            className="w-full"
          >
            <Row gutter={16}>
              <h2>Problem 3:</h2>
              <Col span={12}>
                <Form.Item<FieldType>
                  label="Please describe the issue you're experiencing:"
                  name="name"
                >
                  <Input.TextArea />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item<FieldType> label="How long have you had this problem?" name="name">
                  <Input />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="How severe is this problem?">
                  <Radio.Group>
                    <Radio value="Mild"> Mild </Radio>
                    <Radio value="Moderate"> Moderate</Radio>
                    <Radio value="Severe"> Severe</Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item<FieldType>
                  label="Have you tried anything to treat this problem?"
                  name="name"
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
      </Col>

      <Col span={24} lg={24}>
        <Card>
          <Form
            layout="vertical"
            initialValues={initFormValues}
            labelCol={{ span: 8 }}
            className="w-full"
          >
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="How would you rate your health?">
                  <Radio.Group>
                    <Radio value="Excellent"> Excellent </Radio>
                    <Radio value="Good"> Good </Radio>
                    <Radio value="Fair"> Fair</Radio>
                    <Radio value="Poor"> Poor</Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
      </Col>

      <Col span={24} lg={24}>
        <Card>
          <Form
            layout="vertical"
            initialValues={initFormValues}
            labelCol={{ span: 8 }}
            className="w-full"
          >
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="What goal(s) do you have for your health this year?">
                  <TextArea rows={4} />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
      </Col>

      <h1>Review of Systems</h1>
      <p>Do you have any problems with the following? Please check the correct box:</p>

      <Col span={24} lg={24}>
        <Card>
          <Form
            layout="vertical"
            initialValues={initFormValues}
            labelCol={{ span: 8 }}
            className="w-full"
          >
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Constitutional">
                  <Checkbox>Lethargy</Checkbox>
                  <Checkbox>Fevers/Chills</Checkbox>
                  <Checkbox>Unexplained weight loss</Checkbox>
                  <Checkbox>Unexplained weight gain</Checkbox>
                  <Checkbox>Night Sweats</Checkbox>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
      </Col>

      <Col span={24} lg={24}>
        <Card>
          <Form
            layout="vertical"
            initialValues={initFormValues}
            labelCol={{ span: 8 }}
            className="w-full"
          >
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Neurological">
                  <Checkbox>Confusion</Checkbox>
                  <Checkbox>Dizzy/Lightheaded</Checkbox>
                  <Checkbox>Headaches</Checkbox>
                  <Checkbox>Memory problems</Checkbox>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
      </Col>

      <Col span={24} lg={24}>
        <Card>
          <Form
            layout="vertical"
            initialValues={initFormValues}
            labelCol={{ span: 8 }}
            className="w-full"
          >
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Neurological">
                  <Checkbox>Confusion</Checkbox>
                  <Checkbox>Dizzy/Lightheaded</Checkbox>
                  <Checkbox>Headaches</Checkbox>
                  <Checkbox>Memory problems</Checkbox>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
      </Col>

      <Col span={24} lg={24}>
        <Card>
          <Form
            layout="vertical"
            initialValues={initFormValues}
            labelCol={{ span: 8 }}
            className="w-full"
          >
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Eyes:">
                  <Checkbox>Blurry/Double Vision</Checkbox>
                  <Checkbox>Burning</Checkbox>
                  <Checkbox>Redness</Checkbox>
                  <Checkbox>Loss of Vision</Checkbox>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
      </Col>

      <Col span={24} lg={24}>
        <Card>
          <Form
            layout="vertical"
            initialValues={initFormValues}
            labelCol={{ span: 8 }}
            className="w-full"
          >
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Ear/Nose/Throat:">
                  <Checkbox>Congestion</Checkbox>
                  <Checkbox>Ear Pain</Checkbox>
                  <Checkbox>Facial pain/numbness</Checkbox>
                  <Checkbox>Hoarseness</Checkbox>
                  <Checkbox>Nose bleeds</Checkbox>
                  <Checkbox>Sinus pain</Checkbox>
                  <Checkbox>Ringing in the Ears</Checkbox>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
      </Col>

      <Col span={24} lg={24}>
        <Card>
          <Form
            layout="vertical"
            initialValues={initFormValues}
            labelCol={{ span: 8 }}
            className="w-full"
          >
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Respiratory">
                  <Checkbox>Blood in Sputum</Checkbox>
                  <Checkbox>Persistent Coughing</Checkbox>
                  <Checkbox>Shortness of Breath</Checkbox>
                  <Checkbox>Sleep Apnea</Checkbox>
                  <Checkbox>Snoring</Checkbox>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
      </Col>

      <Col span={24} lg={24}>
        <Card>
          <Form
            layout="vertical"
            initialValues={initFormValues}
            labelCol={{ span: 8 }}
            className="w-full"
          >
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Cardiovascular:">
                  <Checkbox>Angina/Chest Pain</Checkbox>
                  <Checkbox>Ankle Swelling</Checkbox>
                  <Checkbox>Exercise Intolerance</Checkbox>
                  <Checkbox>Sleep Apnea</Checkbox>
                  <Checkbox>Leg Pain with Walking</Checkbox>
                  <Checkbox>Wake Short of Breath</Checkbox>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
      </Col>

      <Col span={24} lg={24}>
        <Card>
          <Form
            layout="vertical"
            initialValues={initFormValues}
            labelCol={{ span: 8 }}
            className="w-full"
          >
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Gastrointestinal:">
                  <Checkbox>Abdominal Pain</Checkbox>
                  <Checkbox>Blood in Stool</Checkbox>
                  <Checkbox>Black Stool</Checkbox>
                  <Checkbox>Bloating</Checkbox>
                  <Checkbox>Constipation</Checkbox>
                  <Checkbox>Diarrhea</Checkbox>
                  <Checkbox>Food Intolerance/Sensitivity</Checkbox>
                  <Checkbox>Heartburn</Checkbox>
                  <Checkbox>Nausea/Vomiting</Checkbox>
                  <Checkbox>Stool Incontinence</Checkbox>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
      </Col>

      <Col span={24} lg={24}>
        <Card>
          <Form
            layout="vertical"
            initialValues={initFormValues}
            labelCol={{ span: 8 }}
            className="w-full"
          >
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Genitourinary:">
                  <Checkbox>Blood in urine</Checkbox>
                  <Checkbox>Nighttime urination</Checkbox>
                  <Checkbox>Heavy/Painful Menses</Checkbox>
                  <Checkbox>Infertility</Checkbox>
                  <Checkbox>Impotence</Checkbox>
                  <Checkbox>Prostate Problems</Checkbox>
                  <Checkbox>Urine Incontinence</Checkbox>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
      </Col>

      <Col span={24} lg={24}>
        <Card>
          <Form
            layout="vertical"
            initialValues={initFormValues}
            labelCol={{ span: 8 }}
            className="w-full"
          >
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Allergy/Immunology:">
                  <Checkbox>Frequent Infections</Checkbox>
                  <Checkbox>Past Anaphylaxis</Checkbox>
                  <Checkbox>Seasonal Allergies</Checkbox>
                  <Checkbox>Swollen Glands</Checkbox>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
      </Col>

      <Col span={24} lg={24}>
        <Card>
          <Form
            layout="vertical"
            initialValues={initFormValues}
            labelCol={{ span: 8 }}
            className="w-full"
          >
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Hematology:">
                  <Checkbox>Bleed/Bruise Easily</Checkbox>
                  <Checkbox>Blood Clots</Checkbox>
                  <Checkbox>Past Blood Transfusion</Checkbox>
                  <Checkbox>Leukemias</Checkbox>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
      </Col>

      <Col span={24} lg={24}>
        <Card>
          <Form
            layout="vertical"
            initialValues={initFormValues}
            labelCol={{ span: 8 }}
            className="w-full"
          >
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Musculoskeletal:">
                  <Checkbox>Bleed/Bruise EasilyJoint Pain</Checkbox>
                  <Checkbox>Joint Swelling</Checkbox>
                  <Checkbox>Muscle Pain</Checkbox>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
      </Col>

      <Col span={24} lg={24}>
        <Card>
          <Form
            layout="vertical"
            initialValues={initFormValues}
            labelCol={{ span: 8 }}
            className="w-full"
          >
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Skin/Breast::">
                  <Checkbox>Breast Lump</Checkbox>
                  <Checkbox>Skin Rash</Checkbox>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
      </Col>

      <Col span={24} lg={24}>
        <Card>
          <Form
            layout="vertical"
            initialValues={initFormValues}
            labelCol={{ span: 8 }}
            className="w-full"
          >
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Psychiatric:">
                  <Checkbox>Anxiety</Checkbox>
                  <Checkbox>Depression</Checkbox>
                  <Checkbox>Disordered Eating</Checkbox>
                  <Checkbox>Poor Sleep</Checkbox>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
      </Col>

      <Table
        columns={columns}
        dataSource={data}
        bordered
        // title={() => 'Header'}
        // footer={() => 'Footer'}
      /> */}
    </Row>
  );
}
