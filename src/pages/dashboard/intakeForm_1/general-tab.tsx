import { Col, Row, Select, Form, Input } from 'antd';
import React from 'react';

import Card from '@/components/card';

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

export function SelectSizesDemo({ options, label }: any) {
  const children = [];
  for (let i = 0; i < options.length; i++) {
    children.push(<Option key={i.toString(36) + i}>{options[i]}</Option>);
  }

  // function handleChange(value) {
  //   console.log(`Selected: ${value}`);
  // }

  return (
    <div>
      <Form.Item label={label}>
        <Select
          mode="multiple"
          placeholder="Please select"
          defaultValue={[]}
          // onChange={handleChange}
          style={{ width: '100%' }}
        >
          {children}
        </Select>
      </Form.Item>
      <br />
    </div>
  );
}

export default function GeneralTab() {
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

  return (
    <Card>
      <Form layout="vertical">
        <Row gutter={[16, 16]}>
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
      </Form>
    </Card>
  );
}
