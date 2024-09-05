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
            custom_module_id: '13579507',
            label: 'Intake',
          },
          {
            custom_module_id: '13579508',
            label: 'Hormone Type',
            answer: 'TRT', // HTML format for the intake
          },
          {
            custom_module_id: '13579509',
            label: 'Patient Intake',
            user_id: user.id,
            answer: `<p>${Object.values(values)
              .map(
                (item: any, index: number) =>
                  `<b>Question:${questions[index].label}</b><br/>${item.map(
                    (key: any, idx: number) => `${idx + 1}:${key}`,
                  )}<br/>`,
              )
              .join('')}<b>Shipping Address</b>
<br/>Address:${user.line1}, ${user.country}, ${user.state} ${user.zip}</p>`, // HTML format for the intake
          },
          {
            custom_module_id: '13579510',
            label: 'Photo Upload',
            answer: 'photo',
            user_id: user.id, // HTML format for the intake
          },
          {
            custom_module_id: '13579511',
            label: 'Labs will be ordered through',
            answer: 'At Home Labs ( at_home_labs_vital )',
            user_id: user.id,
          },
          {
            custom_module_id: '13085533',
            label: 'Sync/Async Visit',
            mod_type: 'dropdown',
            answer: 'Async ( async_visit )',
            user_id: user.id,
          },
          {
            custom_module_id: '13579512',
            label: 'Charting',
            answer: 'Charting',
            user_id: user.id,
          },
          {
            custom_module_id: '13085531',
            label: 'Note Type',
            answer: 'Test Note Type',
            user_id: user.id,
          },
          {
            custom_module_id: '13085532',
            label: 'Visit Type',
            answer: 'Initial Visit ( visit_type_1 )',
            user_id: user.id,
          },
          {
            custom_module_id: '13085561',
            label: 'Patient Consent (Sync)',
            answer: 'Patient Consent (Sync)',
            user_id: user.id,
          },
          {
            custom_module_id: '13085559',
            label: 'Patient Consent (Async)',
            answer: 'Patient Consent (Async)',
            user_id: user.id,
          },
          {
            custom_module_id: '13085543',
            label: 'Visit Modality',
            answer: 'Test Visit Modality',
            user_id: user.id,
          },
          {
            custom_module_id: '13085567',
            label: 'What state is the patient located in at time of visit?',
            answer: 'Test',
            user_id: user.id,
          },
          {
            custom_module_id: '13085566',
            label: null,
            answer: 'Test',
            user_id: user.id,
          },
          {
            custom_module_id: '13085569',
            label: null,
            answer: 'Test',
            user_id: user.id,
          },
          {
            custom_module_id: '13085535',
            label: 'Name of Patient',
            answer: 'Test ABC',
            user_id: user.id,
          },
          {
            custom_module_id: '13085537',
            label: 'Date of Birth',
            answer: '',
            user_id: user.id,
          },
          {
            custom_module_id: '13085538',
            label: 'Gender',
            answer: 'Gender',
            user_id: user.id,
          },
          {
            custom_module_id: '13085562',
            label: 'Physical Location of Patient ',
            answer: '',
            user_id: user.id,
          },
          {
            custom_module_id: '13085571',
            label: 'If Other, please explain:',
            answer: '',
            user_id: user.id,
          },
          {
            custom_module_id: '13085586',
            label: 'BMI',
            answer: '',
            user_id: user.id,
          },
          {
            custom_module_id: '13085539',
            label: 'Any known allergies? (Medication, Environmental, or Food)',
            mod_type: 'radio',
            answer: '',
            user_id: user.id,
          },
          {
            custom_module_id: '13085572',
            label: 'Allergy',
            answer: '',
            user_id: user.id,
          },
          {
            custom_module_id: '13085540',
            label: 'Is patient currently taking any medications (prescription or over-the-counter)',
            answer: '',
            user_id: user.id,
          },
          {
            custom_module_id: '13085573',
            label: 'List any medications you are taking',
            answer: '',
            user_id: user.id,
          },
          {
            custom_module_id: '13085563',
            label: 'Chief Complaint',
            answer: '',
            user_id: user.id,
          },
          {
            custom_module_id: '13085555',
            answer: '',
            user_id: user.id,
          },
          {
            custom_module_id: '13085556',
            answer: '',
            user_id: user.id,
          },
          {
            custom_module_id: '13085574',
            answer: '',
            user_id: user.id,
          },
          {
            custom_module_id: '13085560',
            answer: '',
            user_id: user.id,
          },
          {
            custom_module_id: '13085565',
            answer: '',
            user_id: user.id,
          },
          {
            custom_module_id: '13085553',
            answer: '',
            user_id: user.id,
          },
          {
            custom_module_id: '13085575',
            answer: '',
            user_id: user.id,
          },
          {
            custom_module_id: '13085547',
            answer: '',
            user_id: user.id,
          },
          {
            custom_module_id: '13085554',
            answer: '',
            user_id: user.id,
          },
          {
            custom_module_id: '13085576',
            answer: '',
            user_id: user.id,
          },
          {
            custom_module_id: '13085568',
            answer: '',
            user_id: user.id,
          },
          {
            custom_module_id: '13085548',
            answer: '',
            user_id: user.id,
          },
          {
            custom_module_id: '13085577',
            answer: '',
            user_id: user.id,
          },
          {
            custom_module_id: '13085578',
            answer: '',
            user_id: user.id,
          },
          {
            custom_module_id: '13085557',
            answer: '',
            user_id: user.id,
          },
          {
            custom_module_id: '13085558',
            answer: '',
            user_id: user.id,
          },
          {
            custom_module_id: '13085564',
            answer: '',
            user_id: user.id,
          },
          {
            custom_module_id: '13085549',
            answer: '',
            user_id: user.id,
          },
          {
            custom_module_id: '13085579',
            answer: '',
            user_id: user.id,
          },
          {
            custom_module_id: '13085580',
            answer: '',
            user_id: user.id,
          },
          {
            custom_module_id: '13085581',
          },
          {
            custom_module_id: '13085545',
            answer: '',
            user_id: user.id,
          },
          {
            custom_module_id: '13886268',
            answer: '',
            user_id: user.id,
          },
          {
            custom_module_id: '13886261',
            answer: '',
            user_id: user.id,
          },
          {
            custom_module_id: '13886262',
            answer: '',
            user_id: user.id,
          },
          {
            custom_module_id: '13886263',
            answer: '',
            user_id: user.id,
          },
          {
            custom_module_id: '13085584',
            answer: '',
            user_id: user.id,
          },
          {
            custom_module_id: '13886264',
            answer: '',
            user_id: user.id,
          },
          {
            custom_module_id: '13886265',
            answer: '',
            user_id: user.id,
          },
          {
            custom_module_id: '13886266',
            answer: '',
            user_id: user.id,
          },
          {
            custom_module_id: '13886267',
            answer: '',
            user_id: user.id,
          },
          {
            custom_module_id: '13085570',
            answer: '',
            user_id: user.id,
          },
          {
            custom_module_id: '13085541',
            answer: '',
            user_id: user.id,
          },
          {
            custom_module_id: '13085550',
            answer: '',
            user_id: user.id,
          },
          {
            custom_module_id: '13085551',
            answer: '',
            user_id: user.id,
          },
          {
            custom_module_id: '13085552',
            answer: '',
            user_id: user.id,
          },
          {
            custom_module_id: '13085530',
            answer: '',
            user_id: user.id,
          },
          {
            custom_module_id: '13085542',
            answer: '',
            user_id: user.id,
          },
          {
            custom_module_id: '13085544',
            label: 'CPT Codes',
            answer: '',
            user_id: user.id,
          },
          {
            custom_module_id: '13085546',
            label: 'Visit Status',
            answer: '',
            user_id: user.id,
          },
          {
            custom_module_id: '13085585',
            label: 'PF - Patient Education & Patient Plan (Patient Facing) - Not Prescribed DQ',
            answer: '',
            user_id: user.id,
          },
          {
            custom_module_id: '13085534',
            label: 'DQ/No-Show/ReScheduled/Cancellation Status',
            answer: '',
            user_id: user.id,
          },
          {
            custom_module_id: '13085536',
            label: 'Additional No-Show/Cancellation/Declined Care Information:',
            answer: '',
            user_id: user.id,
          },
        ],
        name: 'SP - Hormone SOAP Intake',
        finished: true,
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
// loading={intakeFormLoading}
// {
//   'data': {
//     'customModuleForm': {
//       custom_module_id: '1524146',
//       'has_matrix_field': false,
//       'has_non_readonly_modules': true,
//       'is_video': false,
//       'name': 'Hormone SOAP Intake',
//       'prefill': false,
//       'use_for_charting': true,
//       'use_for_program': false,
//       'custom_modules': [
//         {
//           custom_module_id: '13579507',
//           Label: 'Intake',
//           'hipaa_name': '',
//           'mod_type': Label,
//           'options': ''
//         },
//         {
//           custom_module_id: '13579508',
//           Label: 'Hormone Type',
//           'hipaa_name': 'TRT',
//           'mod_type': 'text',
//           'options': 'TRT'
//         },
//         {
//           custom_module_id: '13579509',
//           Label: 'Patient Intake',
//           'hipaa_name': '<p>Q/A</p>',
//           'mod_type': 'textarea',
//           'options': '<p>Q/A</p>'
//         },
//         {
//           custom_module_id: '13579510',
//           Label: 'Photo Upload',
//           'hipaa_name': '',
//           'mod_type': 'textarea',
//           'options': ''
//         },
//         {
//           custom_module_id: '13579511',
//           Label: 'Labs will be ordered through',
//           'hipaa_name': 'At Home Labs ( at_home_labs_vital )',
//           'mod_type': 'text',
//           'options': 'At Home Labs ( at_home_labs_vital )'
//         },
//         {
//           custom_module_id: '13085533',
//           Label: 'Sync/Async Visit',
//           'hipaa_name': 'Sync ( sync_visit )\nAsync ( async_visit )',
//           'mod_type': 'dropdown',
//           'options': 'Sync ( sync_visit )\nAsync ( async_visit )'
//         },
//         {
//           custom_module_id: '13579512',
//           Label: 'Charting',
//           'hipaa_name': '',
//           'mod_type': Label,
//           'options': ''
//         },
//         {
//           custom_module_id: '13085531',
//           Label: 'Note Type',
//           'hipaa_name': '1. Visit Charting + Prescription Note\n2. Prescription Note ONLY\n3. DQ/No-Show/ReScheduled/Cancellation Note',
//           'mod_type': 'dropdown',
//           'options': '1. Visit Charting + Prescription Note\n2. Prescription Note ONLY\n3. DQ/No-Show/ReScheduled/Cancellation Note'
//         },
//         {
//           custom_module_id: '13085532',
//           Label: 'Visit Type',
//           'hipaa_name': 'Initial Visit ( visit_type_1 )\nFollow Up ( visit_type_2 )',
//           'mod_type': 'dropdown',
//           'options': 'Initial Visit ( visit_type_1 )\nFollow Up ( visit_type_2 )'
//         },
//         {
//           custom_module_id: '13085561',
//           Label: 'Patient Consent (Sync)',
//           'hipaa_name': 'I obtained consent and agreement for this video encounter from the patient/co-participant.',
//           'mod_type': 'text',
//           'options': 'I obtained consent and agreement for this video encounter from the patient/co-participant.'
//         },
//         {
//           custom_module_id: '13085559',
//           Label: 'Patient Consent (Async)',
//           'hipaa_name': 'I obtained consent and agreement for this encounter from the patient/co-participant.',
//           'mod_type': 'text',
//           'options': 'I obtained consent and agreement for this encounter from the patient/co-participant.'
//         },
//         {
//           custom_module_id: '13085543',
//           Label: 'Visit Modality',
//           'hipaa_name': 'Video\nAudio Only\nAsync ( async_visit )',
//           'mod_type': 'dropdown',
//           'options': 'Video\nAudio Only\nAsync ( async_visit )'
//         },
//         {
//           custom_module_id: '13085567',
//           Label: 'What state is the patient located in at time of visit?',
//           'hipaa_name': '',
//           'mod_type': 'text',
//           'options': ''
//         },
//         {
//           custom_module_id: '13085566',
//           Label: null,
//           'hipaa_name': '<p style=\'text-align: center;\'><span style=\'font-size: 18pt;\'><strong>Hormone Treatment Care Coordination Note</strong></span></p>',
//           'mod_type': 'read_only',
//           'options': '<p style=\'text-align: center;\'><span style=\'font-size: 18pt;\'><strong>Hormone Treatment Care Coordination Note</strong></span></p>'
//         },
//         {
//           custom_module_id: '13085569',
//           Label: null,
//           'hipaa_name': '<p style=\'text-align: center;\'><span style=\'font-size: 18pt;\'><strong>Hormone Treatment&nbsp;</strong></span><span style=\'font-size: 18pt;\'><strong>SOAP Note</strong></span></p>',
//           'mod_type': 'read_only',
//           'options': '<p style=\'text-align: center;\'><span style=\'font-size: 18pt;\'><strong>Hormone Treatment&nbsp;</strong></span><span style=\'font-size: 18pt;\'><strong>SOAP Note</strong></span></p>'
//         },
//         {
//           custom_module_id: '13085535',
//           Label: 'Name of Patient',
//           'hipaa_name': '',
//           'mod_type': 'name',
//           'options': ''
//         },
//         {
//           custom_module_id: '13085537',
//           Label: 'Date of Birth',
//           'hipaa_name': '',
//           'mod_type': 'dob',
//           'options': ''
//         },
//         {
//           custom_module_id: '13085538',
//           Label: 'Gender',
//           'hipaa_name': '',
//           'mod_type': 'gender',
//           'options': ''
//         },
//         {
//           custom_module_id: '13085562',
//           Label: 'Physical Location of Patient ',
//           'hipaa_name': 'Home\nOffice\nCar\nOther',
//           'mod_type': 'radio',
//           'options': 'Home\nOffice\nCar\nOther'
//         },
//         {
//           custom_module_id: '13085571',
//           Label: 'If Other, please explain:',
//           'hipaa_name': '',
//           'mod_type': 'text',
//           'options': ''
//         },
//         {
//           custom_module_id: '13085586',
//           Label: 'BMI',
//           'hipaa_name': '',
//           'mod_type': 'BMI(in.)',
//           'options': ''
//         },
//         {
//           custom_module_id: '13085539',
//           Label: 'Any known allergies? (Medication, Environmental, or Food)',
//           'hipaa_name': 'Yes\nNo',
//           'mod_type': 'radio',
//           'options': 'Yes\nNo'
//         },
//         {
//           custom_module_id: '13085572',
//           Label: 'Allergy',
//           'hipaa_name': '',
//           'mod_type': 'synced_allergy',
//           'options': ''
//         },
//         {
//           custom_module_id: '13085540',
//           Label: 'Is patient currently taking any medications (prescription or over-the-counter)',
//           'hipaa_name': 'Yes\nNo',
//           'mod_type': 'radio',
//           'options': 'Yes\nNo'
//         },
//         {
//           custom_module_id: '13085573',
//           Label: 'List any medications you are taking',
//           'hipaa_name': '',
//           'mod_type': 'medications',
//           'options': ''
//         },
//         {
//           custom_module_id: '13085563',
//           Label: 'Chief Complaint',
//           'hipaa_name': '',
//           'mod_type': 'text',
//           'options': ''
//         },
//         {
//           custom_module_id: '13085555',
//           Label: 'Over the last 2 weeks, how often have you been bothered by the following problem: Little interest or pleasure in doing things',
//           'hipaa_name': '(0) Not at all\n(1) Several days\n(2) More than half the days\n(3) Nearly every day\nN/A -- patient not asked',
//           'mod_type': 'dropdown',
//           'options': '(0) Not at all\n(1) Several days\n(2) More than half the days\n(3) Nearly every day\nN/A -- patient not asked'
//         },
//         {
//           custom_module_id: '13085556',
//           Label: 'Over the last 2 weeks, how often have you been bothered by the following problem: Feeling down, depressed or hopeless',
//           'hipaa_name': '(0) Not at all\n(1) Several days\n(2) More than half the days\n(3) Nearly every day\nN/A -- patient not asked',
//           'mod_type': 'dropdown',
//           'options': '(0) Not at all\n(1) Several days\n(2) More than half the days\n(3) Nearly every day\nN/A -- patient not asked'
//         },
//         {
//           custom_module_id: '13085574',
//           Label: 'Total: PHQ-2',
//           'hipaa_name': '0\n1\n2\n3\n4\n5\n6\n7',
//           'mod_type': 'dropdown',
//           'options': '0\n1\n2\n3\n4\n5\n6\n7'
//         },
//         {
//           custom_module_id: '13085560',
//           Label: 'History of Present Illness (HPI)',
//           'hipaa_name': '',
//           'mod_type': 'textarea',
//           'options': ''
//         },
//         {
//           custom_module_id: '13085565',
//           Label: 'Review of Systems (ROS)',
//           'hipaa_name': '<p>CONSTITUTIONAL: Denies fever and chills<br>RES: Denies SOB and cough<br>CV: Denies palpitations and CP<br>GI: Denies abdominal pain, nausea, vomiting and diarrhea<br>GU: Denies dysuria and urinary frequency</p>',
//           'mod_type': 'textarea',
//           'options': '<p>CONSTITUTIONAL: Denies fever and chills<br>RES: Denies SOB and cough<br>CV: Denies palpitations and CP<br>GI: Denies abdominal pain, nausea, vomiting and diarrhea<br>GU: Denies dysuria and urinary frequency</p>'
//         },
//         {
//           custom_module_id: '13085553',
//           Label: 'Is the patient experiencing any side effects from the medication?',
//           'hipaa_name': 'Yes\nNo',
//           'mod_type': 'radio',
//           'options': 'Yes\nNo'
//         },
//         {
//           custom_module_id: '13085575',
//           Label: 'If yes, please record patient's side effects:',
//           'hipaa_name': '',
//           'mod_type': 'text',
//           'options': ''
//         },
//         {
//           custom_module_id: '13085547',
//           Label: 'Medical History',
//           'hipaa_name': '',
//           'mod_type': 'textarea',
//           'options': ''
//         },
//         {
//           custom_module_id: '13085554',
//           Label: 'Has the patient had any changes to their medical history since last visit?',
//           'hipaa_name': 'Yes\nNo',
//           'mod_type': 'radio',
//           'options': 'Yes\nNo'
//         },
//         {
//           custom_module_id: '13085576',
//           Label: 'If yes, please record changes to their medical history since last visit: ',
//           'hipaa_name': '',
//           'mod_type': 'textarea',
//           'options': ''
//         },
//         {
//           custom_module_id: '13085568',
//           Label: 'Vital Signs and Physical Exam',
//           'hipaa_name': '<div class=\'page\' title=\'Page 4\'>\n<div class=\'layoutArea\'>\n<div class=\'column\'>\n<p style=\'text-align: left;\'>Vital Signs:</p>\n<p style=\'text-align: left;\'>&nbsp;</p>\n<p style=\'text-align: left;\'>Physical Exam:</p>\n</div>\n</div>\n</div>',
//           'mod_type': 'textarea',
//           'options': '<div class=\'page\' title=\'Page 4\'>\n<div class=\'layoutArea\'>\n<div class=\'column\'>\n<p style=\'text-align: left;\'>Vital Signs:</p>\n<p style=\'text-align: left;\'>&nbsp;</p>\n<p style=\'text-align: left;\'>Physical Exam:</p>\n</div>\n</div>\n</div>'
//         },
//         {
//           custom_module_id: '13085548',
//           Label: 'Does the patient have labs uploaded?',
//           'hipaa_name': 'Yes\nNo',
//           'mod_type': 'radio',
//           'options': 'Yes\nNo'
//         },
//         {
//           custom_module_id: '13085577',
//           Label: 'Lab Results:',
//           'hipaa_name': '<p>Labs Collected Date:<br><br></p>\n<p>Labs for review:</p>',
//           'mod_type': 'textarea',
//           'options': '<p>Labs Collected Date:<br><br></p>\n<p>Labs for review:</p>'
//         },
//         {
//           custom_module_id: '13085578',
//           Label: 'Reason Patient has no labs:',
//           'hipaa_name': 'No labs on file\nPatient has not completed labs',
//           'mod_type': 'radio',
//           'options': 'No labs on file\nPatient has not completed labs'
//         },
//         {
//           custom_module_id: '13085557',
//           Label: 'Assessment & Plan - Initial Visit',
//           'hipaa_name': '',
//           'mod_type': 'textarea',
//           'options': ''
//         },
//         {
//           custom_module_id: '13085558',
//           Label: 'Assessment & Plan - Follow-Up Visit',
//           'hipaa_name': '',
//           'mod_type': 'textarea',
//           'options': ''
//         },
//         {
//           custom_module_id: '13085564',
//           Label: 'Provider Order:',
//           'hipaa_name': '',
//           'mod_type': Label,
//           'options': ''
//         },
//         {
//           custom_module_id: '13085549',
//           Label: 'Are labs needing to be ordered for the patient?',
//           'hipaa_name': 'Yes ( cma_order_labs ) ( order_labs )\nNo',
//           'mod_type': 'radio',
//           'options': 'Yes ( cma_order_labs ) ( order_labs )\nNo'
//         },
//         {
//           custom_module_id: '13085579',
//           Label: 'Labs will be ordered through:',
//           'hipaa_name': 'At Home Labs ( at_home_labs_vital )\nGeneral Lab Req ( general_lab_req )',
//           'mod_type': 'radio',
//           'options': 'At Home Labs ( at_home_labs_vital )\nGeneral Lab Req ( general_lab_req )'
//         },
//         {
//           custom_module_id: '13085580',
//           Label: null,
//           'hipaa_name': '<p>Please complete the additional charting note based on your selection asap:</p>\n<ul>\n<li style=\'font-weight: bold;\'><strong>General Lab Referral Form</strong></li>\n</ul>\n<p>After completing this additional charting note, the CMAs will upload the file to the patients documents section so that the patient can take the form to their lab.</p>',
//           'mod_type': 'read_only',
//           'options': '<p>Please complete the additional charting note based on your selection asap:</p>\n<ul>\n<li style=\'font-weight: bold;\'><strong>General Lab Referral Form</strong></li>\n</ul>\n<p>After completing this additional charting note, the CMAs will upload the file to the patients documents section so that the patient can take the form to their lab.</p>'
//         },
//         {
//           custom_module_id: '13085581',
//           Label: 'Labs to be ordered via Vital portal by the CMA',
//           'hipaa_name': 'To be confirmed',
//           'mod_type': 'checkbox',
//           'options': 'To be confirmed'
//         },
//         {
//           custom_module_id: '13085545',
//           Label: 'Was medication ordered in this consult?',
//           'hipaa_name': 'Yes - Testosterone Cypionate Injection + Anastrozole\nYes - Branded Kyzatrex Oral Testosterone\nYes - Enclomiphene\nNo',
//           'mod_type': 'dropdown',
//           'options': 'Yes - Testosterone Cypionate Injection + Anastrozole\nYes - Branded Kyzatrex Oral Testosterone\nYes - Enclomiphene\nNo'
//         },
//         {
//           custom_module_id: '13886268',
//           Label: 'Reason for no medication ordered:',
//           'hipaa_name': 'Disqualified - Patient Didn't Meet Eligibility Criteria\nCancelled - Patient Ineligible - Labs Not Done\nCancelled - Provider Out Unexpectedly\nCancelled - Rescheduled\nCancelled - Patient Requested\nCancelled - No Intake Rescheduled\nCancelled - Other Reason',
//           'mod_type': 'checkbox',
//           'options': 'Disqualified - Patient Didn't Meet Eligibility Criteria\nCancelled - Patient Ineligible - Labs Not Done\nCancelled - Provider Out Unexpectedly\nCancelled - Rescheduled\nCancelled - Patient Requested\nCancelled - No Intake Rescheduled\nCancelled - Other Reason'
//         },
//         {
//           custom_module_id: '13886261',
//           Label: 'What level of Testosterone Cypionate Injection + Anastrozole is being ordered? ( medication_order ) ',
//           'hipaa_name': '30 day supply: Testosterone transdermal gel 1.62% Gel Pump 75g ( HWH-TRTG-L1-W04 )\n90 day supply: Testosterone transdermal gel 1.62% Gel Pump 75g  ( HWH-TRTG-L1-W12 )\n30 day supply: Testosterone cypionate solution (200 mg/mL 10 mL vial) ??\n90 day supply: Testosterone cypionate solution (200 mg/mL 10 mL vial) ??\n30 day supply: Anastrozole tablet or capsule ??\n90 day supply: Anastrozole tablet or capsule ??',
//           'mod_type': 'dropdown',
//           'options': '30 day supply: Testosterone transdermal gel 1.62% Gel Pump 75g ( HWH-TRTG-L1-W04 )\n90 day supply: Testosterone transdermal gel 1.62% Gel Pump 75g  ( HWH-TRTG-L1-W12 )\n30 day supply: Testosterone cypionate solution (200 mg/mL 10 mL vial) ??\n90 day supply: Testosterone cypionate solution (200 mg/mL 10 mL vial) ??\n30 day supply: Anastrozole tablet or capsule ??\n90 day supply: Anastrozole tablet or capsule ??'
//         },
//         {
//           custom_module_id: '13886262',
//           Label: 'What level of Kyzatrex is being ordered? ( medication_order ) ',
//           'hipaa_name': '30 day supply: Branded Kyzatrex Oral Testosterone 100/150/200mg ( HWH-KYZ-L1-W04 )\n90 day supply: Branded Kyzatrex Oral Testosterone 100/150/200mg ( HWH-KYZ-L1-W12 )',
//           'mod_type': 'dropdown',
//           'options': '30 day supply: Branded Kyzatrex Oral Testosterone 100/150/200mg ( HWH-KYZ-L1-W04 )\n90 day supply: Branded Kyzatrex Oral Testosterone 100/150/200mg ( HWH-KYZ-L1-W12 )'
//         },
//         {
//           custom_module_id: '13886263',
//           Label: 'What level of Enclomiphene is being ordered? ( medication_order ) ',
//           'hipaa_name': '30 day supply: Enclomiphene 12.5-25mg ( STR-ENC-L1-W04 )\n90 day supply: Enclomiphene 12.5-25mg ( STR-ENC-L1-W12 ) ??\n30 day supply: Clomiphene 25-50 mg ??\n90 day supply: Clomiphene 25-50 mg ??',
//           'mod_type': 'dropdown',
//           'options': '30 day supply: Enclomiphene 12.5-25mg ( STR-ENC-L1-W04 )\n90 day supply: Enclomiphene 12.5-25mg ( STR-ENC-L1-W12 ) ??\n30 day supply: Clomiphene 25-50 mg ??\n90 day supply: Clomiphene 25-50 mg ??'
//         },
//         {
//           custom_module_id: '13085584',
//           Label: 'Prescribing Reminder',
//           'hipaa_name': '<table style=\'border-collapse: collapse; width: 100%; border: 1px solid rgb(52, 73, 94); height: 88px;\' border=\'1\'><colgroup><col style=\'width: 99.8442%;\'></colgroup>\n<tbody>\n<tr style=\'height: 22px;\'>\n<td style=\'border-width: 1px; border-color: rgb(52, 73, 94); height: 22px;\'>\n<p style=\'text-align: center;\'><span style=\'text-decoration: underline; font-size: 14pt;\'><strong>Prescribing and Medication Info Section</strong></span></p>\n</td>\n</tr>\n<tr style=\'height: 22px; text-align: center;\'>\n<td style=\'border-width: 1px; border-color: rgb(52, 73, 94); height: 22px;\'>\n<p><span style=\'font-size: 14pt;\'>You are prescribing medication for this consult. </span><br><br><span style=\'font-size: 14pt;\'>Please do the prescription in </span><strong><em><span style=\'font-size: 14pt;\'>Dosespot</span></em></strong><span style=\'font-size: 14pt;\'>, select <strong>Healthwarehouse.com</strong></span></p>\n</td>\n</tr>\n</tbody>\n</table>',
//           'mod_type': 'read_only',
//           'options': '<table style=\'border-collapse: collapse; width: 100%; border: 1px solid rgb(52, 73, 94); height: 88px;\' border=\'1\'><colgroup><col style=\'width: 99.8442%;\'></colgroup>\n<tbody>\n<tr style=\'height: 22px;\'>\n<td style=\'border-width: 1px; border-color: rgb(52, 73, 94); height: 22px;\'>\n<p style=\'text-align: center;\'><span style=\'text-decoration: underline; font-size: 14pt;\'><strong>Prescribing and Medication Info Section</strong></span></p>\n</td>\n</tr>\n<tr style=\'height: 22px; text-align: center;\'>\n<td style=\'border-width: 1px; border-color: rgb(52, 73, 94); height: 22px;\'>\n<p><span style=\'font-size: 14pt;\'>You are prescribing medication for this consult. </span><br><br><span style=\'font-size: 14pt;\'>Please do the prescription in </span><strong><em><span style=\'font-size: 14pt;\'>Dosespot</span></em></strong><span style=\'font-size: 14pt;\'>, select <strong>Healthwarehouse.com</strong></span></p>\n</td>\n</tr>\n</tbody>\n</table>'
//         },
//         {
//           custom_module_id: '13886264',
//           Label: 'Prescribing Reminder',
//           'hipaa_name': '<table style=\'border-collapse: collapse; width: 100%; border: 1px solid rgb(52, 73, 94); height: 88px;\' border=\'1\'><colgroup><col style=\'width: 99.8442%;\'></colgroup>\n<tbody>\n<tr style=\'height: 22px;\'>\n<td style=\'border-width: 1px; border-color: rgb(52, 73, 94); height: 22px;\'>\n<p style=\'text-align: center;\'><span style=\'text-decoration: underline; font-size: 14pt;\'><strong>Prescribing and Medication Info Section</strong></span></p>\n</td>\n</tr>\n<tr style=\'height: 22px; text-align: center;\'>\n<td style=\'border-width: 1px; border-color: rgb(52, 73, 94); height: 22px;\'>\n<p><span style=\'font-size: 14pt;\'>You are prescribing medication for this consult. </span><br><br><span style=\'font-size: 14pt;\'>Please do the prescription in </span><strong><em><span style=\'font-size: 14pt;\'>Dosespot, </span></em></strong><span style=\'font-size: 14pt;\'>select&nbsp;<strong>Strive Pharmacy</strong></span></p>\n</td>\n</tr>\n</tbody>\n</table>\n<p style=\'text-align: center;\'>&nbsp;</p>',
//           'mod_type': 'read_only',
//           'options': '<table style=\'border-collapse: collapse; width: 100%; border: 1px solid rgb(52, 73, 94); height: 88px;\' border=\'1\'><colgroup><col style=\'width: 99.8442%;\'></colgroup>\n<tbody>\n<tr style=\'height: 22px;\'>\n<td style=\'border-width: 1px; border-color: rgb(52, 73, 94); height: 22px;\'>\n<p style=\'text-align: center;\'><span style=\'text-decoration: underline; font-size: 14pt;\'><strong>Prescribing and Medication Info Section</strong></span></p>\n</td>\n</tr>\n<tr style=\'height: 22px; text-align: center;\'>\n<td style=\'border-width: 1px; border-color: rgb(52, 73, 94); height: 22px;\'>\n<p><span style=\'font-size: 14pt;\'>You are prescribing medication for this consult. </span><br><br><span style=\'font-size: 14pt;\'>Please do the prescription in </span><strong><em><span style=\'font-size: 14pt;\'>Dosespot, </span></em></strong><span style=\'font-size: 14pt;\'>select&nbsp;<strong>Strive Pharmacy</strong></span></p>\n</td>\n</tr>\n</tbody>\n</table>\n<p style=\'text-align: center;\'>&nbsp;</p>'
//         },
//         {
//           custom_module_id: '13886265',
//           Label: 'PF - Patient Education & Patient Plan for Testosterone Cypionate Injection + Anastrozole',
//           'hipaa_name': '<p>To be included</p>',
//           'mod_type': 'textarea',
//           'options': '<p>To be included</p>'
//         },
//         {
//           custom_module_id: '13886266',
//           Label: 'PF - Patient Education & Patient Plan for Branded Kyzatrex Oral Testosterone',
//           'hipaa_name': '<p>To be included</p>',
//           'mod_type': 'textarea',
//           'options': '<p>To be included</p>'
//         },
//         {
//           custom_module_id: '13886267',
//           Label: 'PF - Patient Education & Patient Plan for Enclomiphene',
//           'hipaa_name': '<p>To be included</p>',
//           'mod_type': 'textarea',
//           'options': '<p>To be included</p>'
//         },
//         {
//           custom_module_id: '13085570',
//           Label: 'Does PA Need to be Filed?',
//           'hipaa_name': 'No',
//           'mod_type': 'radio',
//           'options': 'No'
//         },
//         {
//           custom_module_id: '13085541',
//           Label: 'Diagnosis',
//           'hipaa_name': '',
//           'mod_type': 'diagnosis',
//           'options': ''
//         },
//         {
//           custom_module_id: '13085550',
//           Label: 'Diagnosis',
//           'hipaa_name': '',
//           'mod_type': 'diagnosis',
//           'options': ''
//         },
//         {
//           custom_module_id: '13085551',
//           Label: 'Diagnosis',
//           'hipaa_name': '',
//           'mod_type': 'diagnosis',
//           'options': ''
//         },
//         {
//           custom_module_id: '13085552',
//           Label: 'Diagnosis',
//           'hipaa_name': '',
//           'mod_type': 'diagnosis',
//           'options': ''
//         },
//         {
//           custom_module_id: '13085530',
//           Label: 'Diagnosis',
//           'hipaa_name': '',
//           'mod_type': 'diagnosis',
//           'options': ''
//         },
//         {
//           custom_module_id: '13085542',
//           Label: 'Diagnosis',
//           'hipaa_name': '',
//           'mod_type': 'diagnosis',
//           'options': ''
//         },
//         {
//           custom_module_id: '13085544',
//           Label: 'CPT Codes',
//           'hipaa_name': '99202 - New Patient - medically appropriate history and/or examination and straightforward medical decision making.\n99203 - New Patient - medically appropriate history and/or examination and low level medical decision making.\n99204 - New Patient - medically appropriate history and/or examination and moderate level medical decision making.\n99205 - New Patient - medically appropriate history and/or examination and high level medical decision making.\n99212 - Established patient - medically appropriate history and/or examination and straightforward medical decision making.\n99213 - Established patient - medically appropriate history and/or examination and low level medical decision making.\n99214 - Established patient - medically appropriate history and/or examination and moderate level medical decision making.\n99215 - Established patient - medically appropriate history and/or examination and high level medical decision making.',
//           'mod_type': 'dropdown',
//           'options': '99202 - New Patient - medically appropriate history and/or examination and straightforward medical decision making.\n99203 - New Patient - medically appropriate history and/or examination and low level medical decision making.\n99204 - New Patient - medically appropriate history and/or examination and moderate level medical decision making.\n99205 - New Patient - medically appropriate history and/or examination and high level medical decision making.\n99212 - Established patient - medically appropriate history and/or examination and straightforward medical decision making.\n99213 - Established patient - medically appropriate history and/or examination and low level medical decision making.\n99214 - Established patient - medically appropriate history and/or examination and moderate level medical decision making.\n99215 - Established patient - medically appropriate history and/or examination and high level medical decision making.'
//         },
//         {
//           custom_module_id: '13085546',
//           Label: 'Visit Status',
//           'hipaa_name': 'Visit Completed ( visit_completed_status_1 )\nVisit Completed Not Eligible for Program - DQ ( visit_completed_status_3 )',
//           'mod_type': 'dropdown',
//           'options': 'Visit Completed ( visit_completed_status_1 )\nVisit Completed Not Eligible for Program - DQ ( visit_completed_status_3 )'
//         },
//         {
//           custom_module_id: '13085585',
//           Label: 'PF - Patient Education & Patient Plan (Patient Facing) - Not Prescribed DQ',
//           'hipaa_name': '<p>Hello,</p>\n<p>&nbsp;</p>\n<p>Based on our conversation today and my review of your medical history, we have identified that you are not a candidate for a TRT medication due to the following reason:</p>\n<p>&nbsp;</p>\n<p><span style=\'color: rgb(224, 62, 45);\'>- (Insert reason why) -</span></p>\n<p>&nbsp;</p>\n<p>In the interim, we discussed ways to help with [to be completed].</p>\n<p>&nbsp;</p>\n<p>Customer service will handle the billing with you directly. Please reach out to customer support for further information. It was a pleasure speaking with you today and I wish you the best on your hormone journey.</p>',
//           'mod_type': 'textarea',
//           'options': '<p>Hello,</p>\n<p>&nbsp;</p>\n<p>Based on our conversation today and my review of your medical history, we have identified that you are not a candidate for a TRT medication due to the following reason:</p>\n<p>&nbsp;</p>\n<p><span style=\'color: rgb(224, 62, 45);\'>- (Insert reason why) -</span></p>\n<p>&nbsp;</p>\n<p>In the interim, we discussed ways to help with [to be completed].</p>\n<p>&nbsp;</p>\n<p>Customer service will handle the billing with you directly. Please reach out to customer support for further information. It was a pleasure speaking with you today and I wish you the best on your hormone journey.</p>'
//         },
//         {
//           custom_module_id: '13085534',
//           Label: 'DQ/No-Show/ReScheduled/Cancellation Status',
//           'hipaa_name': 'No-Show - Patient No-Showed for Visit\nDisqualified - Patient Didn't Meet Eligibility Criteria  ( visit_completed_status_3 )\nCancelled - Patient Ineligible - Labs Not Done\nCancelled - Provider Out Unexpectedly ( cancelled_-_provider_out_unexpectedly )\nCancelled - Rescheduled  ( cancelled_-_rescheduled )\nCancelled - Patient Requested ( cancelled_-_patient_requested )\nCancelled - No Intake Rescheduled ( no_intake_-_rescheduled )\nCancelled - Other Reason ( no_reason )',
//           'mod_type': 'dropdown',
//           'options': 'No-Show - Patient No-Showed for Visit\nDisqualified - Patient Didn't Meet Eligibility Criteria  ( visit_completed_status_3 )\nCancelled - Patient Ineligible - Labs Not Done\nCancelled - Provider Out Unexpectedly ( cancelled_-_provider_out_unexpectedly )\nCancelled - Rescheduled  ( cancelled_-_rescheduled )\nCancelled - Patient Requested ( cancelled_-_patient_requested )\nCancelled - No Intake Rescheduled ( no_intake_-_rescheduled )\nCancelled - Other Reason ( no_reason )'
//         },
//         {
//           custom_module_id: '13085536',
//           Label: 'Additional No-Show/Cancellation/Declined Care Information:',
//           'hipaa_name': '',
//           'mod_type': 'textarea',
//           'options': ''
//         }
//       ]
//     }
//   }
// }
