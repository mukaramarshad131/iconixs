"use client";
import CountryStateForm from "@/components/countryStatePhone";

import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  notification,
  Radio,
  Row,
} from "antd";
import axios from "axios";
import { useState } from "react";
import moment, {Moment} from "moment";


const SignUp = ({ setIsLogin }: { setIsLogin: (value: boolean) => void }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [form] = Form.useForm();

  // Custom date validation rule
  const validateDate = (_: any, value: Moment | null) => {
    if (!value) {
      return Promise.reject(new Error('Please select a date'));
    }
    // Calculate the minimum valid date (25 years from today)
    const minDate = moment().subtract(25, 'years').startOf('day');
    if (value.isAfter(minDate)) {
      return Promise.reject(new Error('Date must be at least 25 years from today.'));
    }
    return Promise.resolve();
  };
  const handleDateChange = (dob: Moment | null) => {
    // Update the date in form state
    form.setFieldsValue({ dob });
    
    // Validate the date field
    if (dob) {
      form.validateFields(['dob']).catch((err) => {
        // If there's a validation error, you can handle it here if needed
        console.log(err);
      });
    }
  };

  const onFinish = async (values: any) => {
    try {      
      setIsLoading(true)
     const response:any = await axios.post("api/sign-up", values, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response)
      if(response.status===200){
        notification.success({
          message: response.data.message,
          duration: 3,
        });
      }
      setIsLoading(false)
      setIsLogin(true);
    } catch (error:any) {
      notification.error({
        message: error.response.data.message,
        duration: 3,
      });
      setIsLoading(false)
    }
  };

  return (
    <section className="overflow-y-auto overflow-x-hidden w-full px-[16px] lg:px-[64px]">
      <div className="mb-4 text-2xl font-bold xl:text-3xl">Sign up</div>
      <Form
        name="normal_login"
        form={form}
        size="large"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Row gutter={10}>
          <Col span={12}>
            <Form.Item
              name="first_name"
              rules={[{ required: true, message: "Please input First Name" },
                { pattern: /^[a-zA-Z]+$/, message: 'Input must be alphabet' }
              ]}
            >
              <Input placeholder="Enter First Name" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="last_name"
              rules={[{ required: true, message: "Please input Last Name" },
                { pattern: /^[a-zA-Z]+$/, message: 'Input must be alphabet' }
              ]}
            >
              <Input placeholder="Enter Last Name" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  type: "email",
                  message: "Please input email",
                },
              ]}
            >
              <Input placeholder="Email" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="dob"
              rules={[
                { required: true, message: "Please input date of birth" },
                {validator: validateDate}
              ]}
            >
              <DatePicker
                placeholder="Date of Birth"
                format="YYYY-MM-DD"
                onChange={handleDateChange}
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="gender"
              rules={[{ required: true, message: "Please select gender" }]}
            >
              <Radio.Group>
                <Radio value="Female"> Female </Radio>
                <Radio value="Male"> Male </Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="height"
              rules={[
                { required: true, message: "Please input Height" },
                {
                  pattern: /^(\d+)ft\s(\d+)in$/,
                  message: 'Height should be in the format Xft Yin (e.g., 7ft 7in)',
                },
              ]}
            >
              <Input placeholder="Height" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="metric_stat"
              rules={[{ required: true, message: "Please input Weight" }
              ]}
            >
              <Input type="number" placeholder="Weight" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="password"
              rules={[
                { required: true },
                {
                  validator: (rule, value) => {
                    const hasUppercase = /[A-Z]/.test(value);
                    const hasLowercase = /[a-z]/.test(value);
                    const hasNumber = /[0-9]/.test(value);
                    const hasSpecialChar = /[^a-zA-Z0-9 ]/.test(value);
                    if (
                      !hasUppercase ||
                      !hasLowercase ||
                      !hasNumber ||
                      !hasSpecialChar
                    ) {
                      return Promise.reject(
                        "Password must be 8 characters long contains 1 upercase, 1 special character, 1 number"
                      );
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <Input.Password type="password" placeholder={"Password"} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="confirmPassword"
              rules={[
                { required: true, message: "Please input confirm password" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("The two passwords are inconsistent.")
                    );
                  },
                }),
              ]}
            >
              <Input.Password type="password" placeholder="Confirm password" />
            </Form.Item>
          </Col>
        </Row>
        <CountryStateForm noLabel />
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="w-full !bg-[#0c2345]"
            loading={isLoading}
          >
            Sign Up
          </Button>
        </Form.Item>
        <div className="mb-2 text-xs text-gray">
          <span>By signing up, I agree to </span>
          <a
            href="https://openloophealth.com/terms-of-use"
            target="_blank"
            className="text-sm !underline text-blue-600"
          >
              Terms of Service
          </a>
          {", "}
          <a
            href="https://openloophealth.com/privacy-policy"
            target="_blank"
            className="text-sm !underline text-blue-600"
          >
             Privacy Policy  
          </a>
          <span> and </span>
          <a
            href="https://openloophealth.com/telehealth-consent"
            target="_blank"
            className="text-sm !underline text-blue-600"
          >
             Telehealth Consent
          </a>
        </div>
        <Button block type="link" onClick={() => setIsLogin(true)}>
          <div className="flex items-center justify-center hover:underline">
            {/* <MdArrowBackIosNew /> */}
            <span className="text-sm">Back to Sign In</span>
          </div>
        </Button>
      </Form>
      {/* <Button onClick={handleUpdateWeight}>BBBB</Button> */}
    </section>
  );
};

export default SignUp;
