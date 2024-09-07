"use client";
import { useQuery, useMutation } from "@apollo/client";
import {
  Col,
  Form,
  Input,
  Row,
  Radio,
  Button,
  DatePicker,
  Card,
  notification
} from "antd";
import { useEffect, useState } from "react";
import {
  USER_QUERY,
  UPDATE_WEIGHT,
  UPDATE_PATIENT,
  INTAKE_FORM_QUERY,
} from "@/graphql/query";
import {
  useIntakeForm,
  useUserActions,
  useUserInfo,
  useUserPermissions,
} from "@/store/userStore";
// import { useRouter } from 'next/navigation';
import { FieldType } from "@/types/types";
import dayjs from "dayjs";

export default function GeneralTab() {
  const [loading, setLoading] = useState(false);
  const { setUserPermissions ,setUserInfo} = useUserActions();
  const intakeForm = useIntakeForm();
  // const router = useRouter();
  const user = useUserInfo();
  const permissions = useUserPermissions();
  const { data: intakeFormData } = useQuery(INTAKE_FORM_QUERY, {
    variables: {
      custom_module_form_id: "1524146",
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
      (intakeFormData?.formAnswerGroups?.length > 0 || intakeForm) &&
      !permissions.includes("/dashboard/packages")
    ) {
      setUserPermissions([...permissions, "/dashboard/packages"]);
    }
  }, [intakeFormData, user, permissions, setUserPermissions, intakeForm]);

    console.log(user, !permissions.includes("/dashboard/packages"))
  const initFormValues = {
    first_name: userData?.user.first_name,
    last_name: userData?.user.last_name,
    email: userData?.user.email,
    phone_number: userData?.user.phone_number,
    dob: dayjs(userData?.user.dob),
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
      role: "patient",
      next_appt_date: null,
      provider_type: "openloop",
      dietitian_id: "1322376",
    };

    const updatePayload = {
      input: {
        id: user.id,
        dietitian_id: "1322376",
        dob: dayjs(values.dob).format("DD/MM/YYYY"),
        first_name: payload.first_name,
        last_name: payload.last_name,
        height: `${payload.height}`,
        phone_number: payload.phone,
        additional_record_identifier: "",
        gender: payload.gender,
        location: {
          state: payload.state,
          city: payload.city,
          zip: payload.zip,
          line1: payload.line1,
          country: payload?.country,
        },
      },
    };
    setLoading(true);
    try {
      const updateWeightPayload = {
        category: "Weight",
        type: "MetricEntry",
        metric_stat: payload.metric_stat,
        user_id: user.id,
        created_at: dayjs().format("DD/MM/YYYY"),
      };
      await updateWeightFunction({ variables: { ...updateWeightPayload } });
      const res=await updateFunction({ variables: { ...updatePayload } });
      setUserInfo(res?.data?.updateClient?.user);
      notification.success({
        message: "Update success!",
        duration: 3,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex justify-center mt-2">
      <Row gutter={[16, 16]}>
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
                <Col md={12} sm={24}>
                  <Form.Item<FieldType>
                    label="First Name"
                    name="first_name"
                    rules={[
                      { required: true, message: "Please input First Name" },
                    ]}
                  >
                    <Input
                      placeholder="Enter First Name"
                    />
                  </Form.Item>
                </Col>

                <Col md={12} sm={24}>
                  <Form.Item<FieldType>
                    label="Last Name"
                    name="last_name"
                    rules={[
                      { required: true, message: "Please input Last Name" },
                    ]}
                  >
                    <Input
                      placeholder="Enter Last Name"
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col md={12} sm={24}>
                  <Form.Item<FieldType>
                    label="Email:"
                    name="email"
                    rules={[
                      {
                        required: true,
                        type: "email",
                        message: "Please input email",
                      },
                    ]}
                  >
                    <Input
                      type="email"
                      placeholder="Email"
                    />
                  </Form.Item>
                </Col>
                <Col md={12} sm={24}>
                  <Form.Item
                    label="Phone"
                    name="phone_number"
                    rules={[ { required: true,  message: "Please input Phone Number" }]}>
                    <Input  placeholder="Phone Number"/>
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col md={12} sm={24}>
                  <Form.Item
                    label="Date of Birth:"
                    name="dob"
                    className="!w-full"
                    rules={[{ required: true, message: "Please input date of birth" }]}>
                    <DatePicker
                      placeholder="Date of Birth"
                      format="DD/MM/YYYY"
                      className={"w-full"}
                    />
                  </Form.Item>
                </Col>
                <Col md={12} sm={24}>
                  <Form.Item
                    label="Gender"
                    name="gender"
                    rules={[
                      { required: true, message: "Please select gender" },
                    ]}
                  >
                    <Radio.Group >
                      <Radio value="Female"> Female </Radio>
                      <Radio value="Male"> Male </Radio>
                    </Radio.Group>
                  </Form.Item>
                </Col>
                <Col md={12} sm={24}>
                  <Form.Item<FieldType>
                    label="Height"
                    name="height"
                    rules={[{ required: true, message: "Please input Height" }]}
                  >
                    <Input
                      type="number"
                      placeholder="Height"
                    />
                  </Form.Item>
                </Col>

                <Col md={12} sm={24}>
                  <Form.Item<FieldType>
                    label="Weight"
                    name="metric_stat"
                    rules={[{ required: true, message: "Please input Weight" }]}
                  >
                    <Input placeholder="Weight" />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col md={12} sm={24}>
                  <Form.Item<FieldType>
                    label="Street:"
                    name="line1"
                    rules={[
                      { required: true, message: "Please input Address" },
                    ]}
                  >
                    <Input  placeholder="Street" />
                  </Form.Item>
                </Col>

                <Col md={12} sm={24}>
                  <Form.Item<FieldType>
                    label="City:"
                    name="city"
                    rules={[{ required: true, message: "Please input city" }]}
                  >
                    <Input  placeholder="City" />
                  </Form.Item>
                </Col>
                <Col md={12} sm={24}>
                  <Form.Item<FieldType>
                    label="State:"
                    name="state"
                    rules={[{ required: true, message: "Please input state" }]}
                  >
                    <Input  placeholder="State" />
                  </Form.Item>
                </Col>
                <Col md={12} sm={24}>
                  <Form.Item<FieldType>
                    label="Zip Code:"
                    name="zip"
                    rules={[
                      { required: true, message: "Please input postal code" },
                    ]}
                  >
                    <Input
                      placeholder="Postal/Zip code"
                    />
                  </Form.Item>
                </Col>
                <Col md={12} sm={24}>
                  <Form.Item<FieldType>
                    label="Country:"
                    name="country"
                    rules={[
                      { required: true, message: "Please input country" },
                    ]}
                  >
                    <Input placeholder="Country" />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="w-full !bg-[#0c2345]"
                  loading={loading}
                >
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Card>
        )}
      </Row>
    </div>
  );
}
