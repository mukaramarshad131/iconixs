import { useMutation } from '@apollo/client';
import { Select, Form, Input, Button } from 'antd';
import React from 'react';

import Card from '@/components/card';
import { INTAKE_FORM } from '@/graphql/query';
import { useUserInfo } from '@/store/userStore';

const { TextArea } = Input;
// type FieldType = {
//   name?: string;
//   email?: string;
//   phone?: string;
//   address?: string;
//   city?: string;
//   code?: string;
//   about: string;
// };
const { Option } = Select;
const questions = [
  {
    name: 'q1',
    label: 'Do any of the following apply to you?',
    options: [
      'Past, current, or suspected prostate cancer',
      'Breast cancer',
      'Untreated and/or severe heart failure or other heart disease',
      'Uncontrolled blood pressure (average systolic/top number ≥ 140 or average diastolic/bottom number ≥ 90)',
      'Hematocrit > 50% (polycythemia) on prior lab tests or history of blood donation due to high blood counts',
      'Untreated and/or severe sleep apnea',
      'Desire to preserve fertility or have more children',
      'Known hypersensitivity to Kyzatrex (testosterone undecanoate) or any of its ingredients',
      'None of the above',
    ],
  },
  {
    name: 'q2',
    label: 'Do any of the following apply to you?',
    options: [
      'Decreased sexual vigor and libido ',
      'Decreased energy or increased fatigue',
      'Depressed mood or depression',
      'Decreased muscle mass ',
      'Decreased body hair',
      'Erectile dysfunction ',
      'Hot flashes ',
      'Low bone density ',
      'None of the above',
    ],
  },
  {
    name: 'q3',
    label: 'Do any of the following conditions or situations apply to you?',
    options: [
      'Liver disease',
      'Kidney disease',
      'Elevated cholesterol levels',
      'Controlled and treated heart failure or other heart disease',
      'Controlled and treated sleep apnea',
      'History of a blood clot ',
      'Testicular cancer',
      'Tumor in the pituitary gland',
      'Estrogen-dependent tumor ',
      'Early puberty ',
      'Gynecomastia (breast enlargement in men due to benign or non-cancerous breast tissue growth)',
      'Shrinking testicles or small testes',
      'Signs and symptoms of an enlarged prostate (increased urination at night, trouble starting urinary stream, urinating many times daily, urinary urgency, inability to pass urine, or weak urine flow)',
      'None of the above ',
    ],
  },
  {
    name: 'q4',
    label: 'Do any of the following conditions or situations apply to you?',
    options: [
      'Low levels of testosterone on prior labs',
      'Current or prior diagnosis of hypogonadism or low testosterone',
      'Prior use of testosterone replacement therapy',
      'Current use of testosterone replacement therapy ',
      'None of the above',
    ],
  },
  {
    name: 'q5',
    label:
      'If you have previously been or currently are on testosterone (or related) replacement therapy, which form were or are you on?',
    options: [
      'Gel',
      'Cream',
      'Injection',
      'Pellet',
      'Pill',
      'hCG (human chorionic gonadotropin) ',
      'Clomiphene',
      'None of the above ',
    ],
  },
];

export function SelectSizesDemo({ options, label, name }: any) {
  const children = [];
  for (let i = 0; i < options.length; i++) {
    children.push(<Option key={i.toString(36) + i}>{options[i]}</Option>);
  }

  const [
    intakeFormFunction,
    { data: intakeFormtData, loading: intakeFormLoading, error: intakeFormError },
  ] = useMutation(INTAKE_FORM);

  // function handleChange(value) {
  //   console.log(`Selected: ${value}`);
  // }

  const handleQuestionerForm = () => {
    // intakeFormFunction({ variables: { ...intakeFormPayload } });
  };
  // const intakeFormPayload = {
  //   input: {
  //     custom_module_form_id: '1499919', // Form id for staging
  //     form_answers: [
  //       {
  //         custom_module_id: '12880693',
  //         label: 'Do any of the following apply to you?',
  //         answer: 'qwerty', // HTML format for the intake
  //       },
  //       {
  //         custom_module_id: '12880694',
  //         label: 'Do any of the following apply to you?',
  //         answer: '<value here>',
  //       },
  //       {
  //         custom_module_id: '12880695',
  //         label: 'Do any of the following conditions or situations apply to you?',
  //         answer: 'jksdrei',
  //       },
  //       {
  //         custom_module_id: '12880696',
  //         label: 'Do any of the following conditions or situations apply to you?',
  //         answer: 'jksdrei',
  //       },
  //       {
  //         custom_module_id: '12880697',
  //         label:
  //           'If you have previously been or currently are on testosterone (or related) replacement therapy, which form were or are you on?',
  //         answer: 'jksdrei',
  //       },
  //     ],
  //     name: 'Iconix SOAP Note',
  //     set_initial_answers: true,
  //     user_id: '1322391', // Patiend ID from CreatePatient mutation response
  //   },
  // };

  return (
    <div>
      <Form.Item label={label} name={name}>
        <Select
          mode="multiple"
          placeholder="Please select"
          defaultValue={[]}
          // onChange={handleChange}
          style={{ width: '100%' }}
        >
          {children}
        </Select>
        <Button onClick={handleQuestionerForm}>BBBB</Button>
      </Form.Item>
      <br />
    </div>
  );
}

export default function GeneralTab() {
  const [form] = Form.useForm();
  const { id } = useUserInfo();
  const onGenderChange = (value: string) => {
    switch (value) {
      case 'male':
        form.setFieldsValue({ note: 'Hi, man!' });
        break;
      case 'female':
        form.setFieldsValue({ note: 'Hi, lady!' });
        break;
      case 'other':
        form.setFieldsValue({ note: 'Hi there!' });
        break;
      default:
    }
  };
  // const { notification } = App.useApp();
  // const { username, email } = useUserInfo();
  // const initFormValues = {
  //   name: username,
  //   email,
  //   phone: faker.phone.number(),
  //   address: faker.location.county(),
  //   city: faker.location.city(),
  //   code: faker.location.zipCode(),
  //   about: faker.lorem.paragraphs(),
  // };
  // const handleClick = () => {
  //   notification.success({
  //     message: 'Update success!',
  //     duration: 3,
  //   });
  // };

  // interface DataType {
  //   key: string;
  //   name: string;
  //   money: string;
  //   address: string;
  // }

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    console.log('Change:', e.target.value);
  };
  const onFinish = async (values: any) => {
    console.log('values: ', values);
    const intakeFormPayload = {
      input: {
        custom_module_form_id: '1499919', // Form id for staging
        form_answers: [
          {
            custom_module_id: '12880693',
            label: 'Do any of the following apply to you?',
            answer: values.q1[0], // HTML format for the intake
          },
          {
            custom_module_id: '12880694',
            label: 'Do any of the following apply to you?',
            answer: values.q2[0],
          },
          {
            custom_module_id: '12880695',
            label: 'Do any of the following conditions or situations apply to you?',
            answer: values.q3[0],
          },
          {
            custom_module_id: '12880696',
            label: 'Do any of the following conditions or situations apply to you?',
            answer: values.q4[0],
          },
          {
            custom_module_id: '12880697',
            label:
              'If you have previously been or currently are on testosterone (or related) replacement therapy, which form were or are you on?',
            answer: values.q5[0],
          },
        ],
        name: 'Iconix SOAP Note',
        set_initial_answers: true,
        user_id: id, // Patiend ID from CreatePatient mutation response
      },
    };
    console.log('intakeFormPayload: ', intakeFormPayload);
  };

  return (
    <Card>
      <Form layout="vertical" form={form} onFinish={onFinish}>
        {questions.map((field, index) => (
          <Form.Item
            key={index}
            name={field.name}
            label={field.label}
            rules={[{ required: true, message: `${field.label} is required` }]}
          >
            <Select mode="multiple" placeholder={`Select ${field.label}`} allowClear>
              {field.options.map((option, idx) => (
                <Option key={idx} value={option}>
                  {option}
                </Option>
              ))}
            </Select>
          </Form.Item>
        ))}
        {/* <Row gutter={[16, 16]}>
          {questions.map((question, index) => (
            <Col span={12} lg={12}>
              <SelectSizesDemo key={index} {...question} />
            </Col>
          ))}
        </Row>
        <Row>
          <Col span={24} lg={24}>
            <Form.Item label="TextArea">
              <TextArea showCount maxLength={100} onChange={onChange} placeholder="Type here" />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item name="gender" label="Gender" rules={[{ required: true }]}>
          <Select
            mode="multiple"
            placeholder="Select a option and change input text above"
            onChange={onGenderChange}
            allowClear
          >
            <Option value="male">male</Option>
            <Option value="female">female</Option>
            <Option value="other">other</Option>
          </Select>
        </Form.Item> */}
        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}
