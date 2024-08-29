import { useMutation } from '@apollo/client';
import { Select, Form, Input, Button, Row, Col } from 'antd';

import { PACKAGES } from '@/_mock/assets';
import Card from '@/components/card';
import { INTAKE_FORM } from '@/graphql/query';
import { useRouter } from '@/router/hooks';
import { useUserActions, useUserInfo } from '@/store/userStore';

import { UserInfo } from '#/entity';

const { TextArea } = Input;
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

export default function GeneralTab() {
  const router = useRouter();
  const [intakeFormFunction, { loading: intakeFormLoading }] = useMutation(INTAKE_FORM);

  const [form] = Form.useForm();
  const { setUserInfo } = useUserActions();
  const user = useUserInfo();

  const OnFinish = async (values: any) => {
    const intakeFormPayload = {
      input: {
        custom_module_form_id: '1524146', // Form id for staging
        form_answers: [
          {
            custom_module_id: '12880693',
            label: 'Do any of the following apply to you?',
            answer: values.q1.join(', '), // HTML format for the intake
          },
          {
            custom_module_id: '12880694',
            label: 'Do any of the following apply to you?',
            answer: values.q2.join(', '),
          },
          {
            custom_module_id: '12880695',
            label: 'Do any of the following conditions or situations apply to you?',
            answer: values.q3.join(', '),
          },
          {
            custom_module_id: '12880696',
            label: 'Do any of the following conditions or situations apply to you?',
            answer: values.q4.join(', '),
          },
          {
            custom_module_id: '12880697',
            label:
              'If you have previously been or currently are on testosterone (or related) replacement therapy, which form were or are you on?',
            answer: values.q5.join(', '),
          },
        ],
        name: 'Iconix SOAP Note',
        set_initial_answers: true,
        user_id: user.id, // Patiend ID from CreatePatient mutation response
      },
    };

    const res = await intakeFormFunction({ variables: { ...intakeFormPayload } });

    if (res && res.data.createFormAnswerGroup.messages === null) {
      const newUser: UserInfo = {
        ...user,
        permissions: user.permissions!.map((permission: any, index: number) =>
          index === 0
            ? {
                ...permission,
                children: [
                  ...permission.children!,
                  ...(permission.children.some((key: any) => key.label === 'sys.menu.packages')
                    ? []
                    : [PACKAGES]),
                ],
              }
            : permission,
        ),
      } as any;
      setUserInfo(newUser);
      router.replace('/dashboard/packages');
    }
  };
  return (
    <Card>
      <Form layout="vertical" form={form} onFinish={OnFinish}>
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
        <Row>
          <Col span={24} lg={24}>
            <Form.Item label="TextArea">
              <TextArea showCount maxLength={100} placeholder="Type here" />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full" loading={intakeFormLoading}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}
