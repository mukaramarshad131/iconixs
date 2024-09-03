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
            answer: Object.values(values)
              .flatMap((item: any) => item)
              .join(', '), // HTML format for the intake
          },
          {
            custom_module_id: '13579510',
            label: 'Photo Upload',
            answer: '', // HTML format for the intake
          },
          {
            custom_module_id: '13579511',
            label: 'Labs will be ordered through',
            answer: 'At Home Labs', // HTML format for the intake
          },
          {
            custom_module_id: '13085533',
            label: 'Sync/Async Visit',
            answer: 'async_visit', // HTML format for the intake
          },
        ],
        name: 'SP - Hormone SOAP Intake',
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

// {
//   "data": {
//     "customModuleForm": {
//       "id": "1524146",
//       "has_matrix_field": false,
//       "has_non_readonly_modules": true,
//       "is_video": false,
//       "name": "Hormone SOAP Intake",
//       "prefill": false,
//       "use_for_charting": true,
//       "use_for_program": false,
//       "custom_modules": [
//         {
//           "id": "13579507",
//           "label": "Intake",
//           "hipaa_name": "",
//           "mod_type": "label",
//           "options": ""
//         },
//         {
//           "id": "13579508",
//           "label": "Hormone Type",
//           "hipaa_name": "TRT",
//           "mod_type": "text",
//           "options": "TRT"
//         },
//         {
//           "id": "13579509",
//           "label": "Patient Intake",
//           "hipaa_name": "<p>Q/A</p>",
//           "mod_type": "textarea",
//           "options": "<p>Q/A</p>"
//         },
//         {
//           "id": "13579510",
//           "label": "Photo Upload",
//           "hipaa_name": "",
//           "mod_type": "textarea",
//           "options": ""
//         },
//         {
//           "id": "13579511",
//           "label": "Labs will be ordered through",
//           "hipaa_name": "At Home Labs ( at_home_labs_vital )",
//           "mod_type": "text",
//           "options": "At Home Labs ( at_home_labs_vital )"
//         },
//         {
//           "id": "13085533",
//           "label": "Sync/Async Visit",
//           "hipaa_name": "Sync ( sync_visit )\nAsync ( async_visit )",
//           "mod_type": "dropdown",
//           "options": "Sync ( sync_visit )\nAsync ( async_visit )"
//         },
//         {
//           "id": "13579512",
//           "label": "Charting",
//           "hipaa_name": "",
//           "mod_type": "label",
//           "options": ""
//         },
//         {
//           "id": "13085531",
//           "label": "Note Type",
//           "hipaa_name": "1. Visit Charting + Prescription Note\n2. Prescription Note ONLY\n3. DQ/No-Show/ReScheduled/Cancellation Note",
//           "mod_type": "dropdown",
//           "options": "1. Visit Charting + Prescription Note\n2. Prescription Note ONLY\n3. DQ/No-Show/ReScheduled/Cancellation Note"
//         },
//         {
//           "id": "13085532",
//           "label": "Visit Type",
//           "hipaa_name": "Initial Visit ( visit_type_1 )\nFollow Up ( visit_type_2 )",
//           "mod_type": "dropdown",
//           "options": "Initial Visit ( visit_type_1 )\nFollow Up ( visit_type_2 )"
//         },
//         {
//           "id": "13085561",
//           "label": "Patient Consent (Sync)",
//           "hipaa_name": "I obtained consent and agreement for this video encounter from the patient/co-participant.",
//           "mod_type": "text",
//           "options": "I obtained consent and agreement for this video encounter from the patient/co-participant."
//         },
//         {
//           "id": "13085559",
//           "label": "Patient Consent (Async)",
//           "hipaa_name": "I obtained consent and agreement for this encounter from the patient/co-participant.",
//           "mod_type": "text",
//           "options": "I obtained consent and agreement for this encounter from the patient/co-participant."
//         },
//         {
//           "id": "13085543",
//           "label": "Visit Modality",
//           "hipaa_name": "Video\nAudio Only\nAsync ( async_visit )",
//           "mod_type": "dropdown",
//           "options": "Video\nAudio Only\nAsync ( async_visit )"
//         },
//         {
//           "id": "13085567",
//           "label": "What state is the patient located in at time of visit?",
//           "hipaa_name": "",
//           "mod_type": "text",
//           "options": ""
//         },
//         {
//           "id": "13085566",
//           "label": null,
//           "hipaa_name": "<p style=\"text-align: center;\"><span style=\"font-size: 18pt;\"><strong>Hormone Treatment Care Coordination Note</strong></span></p>",
//           "mod_type": "read_only",
//           "options": "<p style=\"text-align: center;\"><span style=\"font-size: 18pt;\"><strong>Hormone Treatment Care Coordination Note</strong></span></p>"
//         },
//         {
//           "id": "13085569",
//           "label": null,
//           "hipaa_name": "<p style=\"text-align: center;\"><span style=\"font-size: 18pt;\"><strong>Hormone Treatment&nbsp;</strong></span><span style=\"font-size: 18pt;\"><strong>SOAP Note</strong></span></p>",
//           "mod_type": "read_only",
//           "options": "<p style=\"text-align: center;\"><span style=\"font-size: 18pt;\"><strong>Hormone Treatment&nbsp;</strong></span><span style=\"font-size: 18pt;\"><strong>SOAP Note</strong></span></p>"
//         },
//         {
//           "id": "13085535",
//           "label": "Name of Patient",
//           "hipaa_name": "",
//           "mod_type": "name",
//           "options": ""
//         },
//         {
//           "id": "13085537",
//           "label": "Date of Birth",
//           "hipaa_name": "",
//           "mod_type": "dob",
//           "options": ""
//         },
//         {
//           "id": "13085538",
//           "label": "Gender",
//           "hipaa_name": "",
//           "mod_type": "gender",
//           "options": ""
//         },
//         {
//           "id": "13085562",
//           "label": "Physical Location of Patient ",
//           "hipaa_name": "Home\nOffice\nCar\nOther",
//           "mod_type": "radio",
//           "options": "Home\nOffice\nCar\nOther"
//         },
//         {
//           "id": "13085571",
//           "label": "If Other, please explain:",
//           "hipaa_name": "",
//           "mod_type": "text",
//           "options": ""
//         },
//         {
//           "id": "13085586",
//           "label": "BMI",
//           "hipaa_name": "",
//           "mod_type": "BMI(in.)",
//           "options": ""
//         },
//         {
//           "id": "13085539",
//           "label": "Any known allergies? (Medication, Environmental, or Food)",
//           "hipaa_name": "Yes\nNo",
//           "mod_type": "radio",
//           "options": "Yes\nNo"
//         },
//         {
//           "id": "13085572",
//           "label": "Allergy",
//           "hipaa_name": "",
//           "mod_type": "synced_allergy",
//           "options": ""
//         },
//         {
//           "id": "13085540",
//           "label": "Is patient currently taking any medications (prescription or over-the-counter)",
//           "hipaa_name": "Yes\nNo",
//           "mod_type": "radio",
//           "options": "Yes\nNo"
//         },
//         {
//           "id": "13085573",
//           "label": "List any medications you are taking",
//           "hipaa_name": "",
//           "mod_type": "medications",
//           "options": ""
//         },
//         {
//           "id": "13085563",
//           "label": "Chief Complaint",
//           "hipaa_name": "",
//           "mod_type": "text",
//           "options": ""
//         },
//         {
//           "id": "13085555",
//           "label": "Over the last 2 weeks, how often have you been bothered by the following problem: Little interest or pleasure in doing things",
//           "hipaa_name": "(0) Not at all\n(1) Several days\n(2) More than half the days\n(3) Nearly every day\nN/A -- patient not asked",
//           "mod_type": "dropdown",
//           "options": "(0) Not at all\n(1) Several days\n(2) More than half the days\n(3) Nearly every day\nN/A -- patient not asked"
//         },
//         {
//           "id": "13085556",
//           "label": "Over the last 2 weeks, how often have you been bothered by the following problem: Feeling down, depressed or hopeless",
//           "hipaa_name": "(0) Not at all\n(1) Several days\n(2) More than half the days\n(3) Nearly every day\nN/A -- patient not asked",
//           "mod_type": "dropdown",
//           "options": "(0) Not at all\n(1) Several days\n(2) More than half the days\n(3) Nearly every day\nN/A -- patient not asked"
//         },
//         {
//           "id": "13085574",
//           "label": "Total: PHQ-2",
//           "hipaa_name": "0\n1\n2\n3\n4\n5\n6\n7",
//           "mod_type": "dropdown",
//           "options": "0\n1\n2\n3\n4\n5\n6\n7"
//         },
//         {
//           "id": "13085560",
//           "label": "History of Present Illness (HPI)",
//           "hipaa_name": "",
//           "mod_type": "textarea",
//           "options": ""
//         },
//         {
//           "id": "13085565",
//           "label": "Review of Systems (ROS)",
//           "hipaa_name": "<p>CONSTITUTIONAL: Denies fever and chills<br>RES: Denies SOB and cough<br>CV: Denies palpitations and CP<br>GI: Denies abdominal pain, nausea, vomiting and diarrhea<br>GU: Denies dysuria and urinary frequency</p>",
//           "mod_type": "textarea",
//           "options": "<p>CONSTITUTIONAL: Denies fever and chills<br>RES: Denies SOB and cough<br>CV: Denies palpitations and CP<br>GI: Denies abdominal pain, nausea, vomiting and diarrhea<br>GU: Denies dysuria and urinary frequency</p>"
//         },
//         {
//           "id": "13085553",
//           "label": "Is the patient experiencing any side effects from the medication?",
//           "hipaa_name": "Yes\nNo",
//           "mod_type": "radio",
//           "options": "Yes\nNo"
//         },
//         {
//           "id": "13085575",
//           "label": "If yes, please record patient's side effects:",
//           "hipaa_name": "",
//           "mod_type": "text",
//           "options": ""
//         },
//         {
//           "id": "13085547",
//           "label": "Medical History",
//           "hipaa_name": "",
//           "mod_type": "textarea",
//           "options": ""
//         },
//         {
//           "id": "13085554",
//           "label": "Has the patient had any changes to their medical history since last visit?",
//           "hipaa_name": "Yes\nNo",
//           "mod_type": "radio",
//           "options": "Yes\nNo"
//         },
//         {
//           "id": "13085576",
//           "label": "If yes, please record changes to their medical history since last visit: ",
//           "hipaa_name": "",
//           "mod_type": "textarea",
//           "options": ""
//         },
//         {
//           "id": "13085568",
//           "label": "Vital Signs and Physical Exam",
//           "hipaa_name": "<div class=\"page\" title=\"Page 4\">\n<div class=\"layoutArea\">\n<div class=\"column\">\n<p style=\"text-align: left;\">Vital Signs:</p>\n<p style=\"text-align: left;\">&nbsp;</p>\n<p style=\"text-align: left;\">Physical Exam:</p>\n</div>\n</div>\n</div>",
//           "mod_type": "textarea",
//           "options": "<div class=\"page\" title=\"Page 4\">\n<div class=\"layoutArea\">\n<div class=\"column\">\n<p style=\"text-align: left;\">Vital Signs:</p>\n<p style=\"text-align: left;\">&nbsp;</p>\n<p style=\"text-align: left;\">Physical Exam:</p>\n</div>\n</div>\n</div>"
//         },
//         {
//           "id": "13085548",
//           "label": "Does the patient have labs uploaded?",
//           "hipaa_name": "Yes\nNo",
//           "mod_type": "radio",
//           "options": "Yes\nNo"
//         },
//         {
//           "id": "13085577",
//           "label": "Lab Results:",
//           "hipaa_name": "<p>Labs Collected Date:<br><br></p>\n<p>Labs for review:</p>",
//           "mod_type": "textarea",
//           "options": "<p>Labs Collected Date:<br><br></p>\n<p>Labs for review:</p>"
//         },
//         {
//           "id": "13085578",
//           "label": "Reason Patient has no labs:",
//           "hipaa_name": "No labs on file\nPatient has not completed labs",
//           "mod_type": "radio",
//           "options": "No labs on file\nPatient has not completed labs"
//         },
//         {
//           "id": "13085557",
//           "label": "Assessment & Plan - Initial Visit",
//           "hipaa_name": "",
//           "mod_type": "textarea",
//           "options": ""
//         },
//         {
//           "id": "13085558",
//           "label": "Assessment & Plan - Follow-Up Visit",
//           "hipaa_name": "",
//           "mod_type": "textarea",
//           "options": ""
//         },
//         {
//           "id": "13085564",
//           "label": "Provider Order:",
//           "hipaa_name": "",
//           "mod_type": "label",
//           "options": ""
//         },
//         {
//           "id": "13085549",
//           "label": "Are labs needing to be ordered for the patient?",
//           "hipaa_name": "Yes ( cma_order_labs ) ( order_labs )\nNo",
//           "mod_type": "radio",
//           "options": "Yes ( cma_order_labs ) ( order_labs )\nNo"
//         },
//         {
//           "id": "13085579",
//           "label": "Labs will be ordered through:",
//           "hipaa_name": "At Home Labs ( at_home_labs_vital )\nGeneral Lab Req ( general_lab_req )",
//           "mod_type": "radio",
//           "options": "At Home Labs ( at_home_labs_vital )\nGeneral Lab Req ( general_lab_req )"
//         },
//         {
//           "id": "13085580",
//           "label": null,
//           "hipaa_name": "<p>Please complete the additional charting note based on your selection asap:</p>\n<ul>\n<li style=\"font-weight: bold;\"><strong>General Lab Referral Form</strong></li>\n</ul>\n<p>After completing this additional charting note, the CMAs will upload the file to the patients documents section so that the patient can take the form to their lab.</p>",
//           "mod_type": "read_only",
//           "options": "<p>Please complete the additional charting note based on your selection asap:</p>\n<ul>\n<li style=\"font-weight: bold;\"><strong>General Lab Referral Form</strong></li>\n</ul>\n<p>After completing this additional charting note, the CMAs will upload the file to the patients documents section so that the patient can take the form to their lab.</p>"
//         },
//         {
//           "id": "13085581",
//           "label": "Labs to be ordered via Vital portal by the CMA",
//           "hipaa_name": "To be confirmed",
//           "mod_type": "checkbox",
//           "options": "To be confirmed"
//         },
//         {
//           "id": "13085545",
//           "label": "Was medication ordered in this consult?",
//           "hipaa_name": "Yes - Testosterone Cypionate Injection + Anastrozole\nYes - Branded Kyzatrex Oral Testosterone\nYes - Enclomiphene\nNo",
//           "mod_type": "dropdown",
//           "options": "Yes - Testosterone Cypionate Injection + Anastrozole\nYes - Branded Kyzatrex Oral Testosterone\nYes - Enclomiphene\nNo"
//         },
//         {
//           "id": "13886268",
//           "label": "Reason for no medication ordered:",
//           "hipaa_name": "Disqualified - Patient Didn't Meet Eligibility Criteria\nCancelled - Patient Ineligible - Labs Not Done\nCancelled - Provider Out Unexpectedly\nCancelled - Rescheduled\nCancelled - Patient Requested\nCancelled - No Intake Rescheduled\nCancelled - Other Reason",
//           "mod_type": "checkbox",
//           "options": "Disqualified - Patient Didn't Meet Eligibility Criteria\nCancelled - Patient Ineligible - Labs Not Done\nCancelled - Provider Out Unexpectedly\nCancelled - Rescheduled\nCancelled - Patient Requested\nCancelled - No Intake Rescheduled\nCancelled - Other Reason"
//         },
//         {
//           "id": "13886261",
//           "label": "What level of Testosterone Cypionate Injection + Anastrozole is being ordered? ( medication_order ) ",
//           "hipaa_name": "30 day supply: Testosterone transdermal gel 1.62% Gel Pump 75g ( HWH-TRTG-L1-W04 )\n90 day supply: Testosterone transdermal gel 1.62% Gel Pump 75g  ( HWH-TRTG-L1-W12 )\n30 day supply: Testosterone cypionate solution (200 mg/mL 10 mL vial) ??\n90 day supply: Testosterone cypionate solution (200 mg/mL 10 mL vial) ??\n30 day supply: Anastrozole tablet or capsule ??\n90 day supply: Anastrozole tablet or capsule ??",
//           "mod_type": "dropdown",
//           "options": "30 day supply: Testosterone transdermal gel 1.62% Gel Pump 75g ( HWH-TRTG-L1-W04 )\n90 day supply: Testosterone transdermal gel 1.62% Gel Pump 75g  ( HWH-TRTG-L1-W12 )\n30 day supply: Testosterone cypionate solution (200 mg/mL 10 mL vial) ??\n90 day supply: Testosterone cypionate solution (200 mg/mL 10 mL vial) ??\n30 day supply: Anastrozole tablet or capsule ??\n90 day supply: Anastrozole tablet or capsule ??"
//         },
//         {
//           "id": "13886262",
//           "label": "What level of Kyzatrex is being ordered? ( medication_order ) ",
//           "hipaa_name": "30 day supply: Branded Kyzatrex Oral Testosterone 100/150/200mg ( HWH-KYZ-L1-W04 )\n90 day supply: Branded Kyzatrex Oral Testosterone 100/150/200mg ( HWH-KYZ-L1-W12 )",
//           "mod_type": "dropdown",
//           "options": "30 day supply: Branded Kyzatrex Oral Testosterone 100/150/200mg ( HWH-KYZ-L1-W04 )\n90 day supply: Branded Kyzatrex Oral Testosterone 100/150/200mg ( HWH-KYZ-L1-W12 )"
//         },
//         {
//           "id": "13886263",
//           "label": "What level of Enclomiphene is being ordered? ( medication_order ) ",
//           "hipaa_name": "30 day supply: Enclomiphene 12.5-25mg ( STR-ENC-L1-W04 )\n90 day supply: Enclomiphene 12.5-25mg ( STR-ENC-L1-W12 ) ??\n30 day supply: Clomiphene 25-50 mg ??\n90 day supply: Clomiphene 25-50 mg ??",
//           "mod_type": "dropdown",
//           "options": "30 day supply: Enclomiphene 12.5-25mg ( STR-ENC-L1-W04 )\n90 day supply: Enclomiphene 12.5-25mg ( STR-ENC-L1-W12 ) ??\n30 day supply: Clomiphene 25-50 mg ??\n90 day supply: Clomiphene 25-50 mg ??"
//         },
//         {
//           "id": "13085584",
//           "label": "Prescribing Reminder",
//           "hipaa_name": "<table style=\"border-collapse: collapse; width: 100%; border: 1px solid rgb(52, 73, 94); height: 88px;\" border=\"1\"><colgroup><col style=\"width: 99.8442%;\"></colgroup>\n<tbody>\n<tr style=\"height: 22px;\">\n<td style=\"border-width: 1px; border-color: rgb(52, 73, 94); height: 22px;\">\n<p style=\"text-align: center;\"><span style=\"text-decoration: underline; font-size: 14pt;\"><strong>Prescribing and Medication Info Section</strong></span></p>\n</td>\n</tr>\n<tr style=\"height: 22px; text-align: center;\">\n<td style=\"border-width: 1px; border-color: rgb(52, 73, 94); height: 22px;\">\n<p><span style=\"font-size: 14pt;\">You are prescribing medication for this consult. </span><br><br><span style=\"font-size: 14pt;\">Please do the prescription in </span><strong><em><span style=\"font-size: 14pt;\">Dosespot</span></em></strong><span style=\"font-size: 14pt;\">, select <strong>Healthwarehouse.com</strong></span></p>\n</td>\n</tr>\n</tbody>\n</table>",
//           "mod_type": "read_only",
//           "options": "<table style=\"border-collapse: collapse; width: 100%; border: 1px solid rgb(52, 73, 94); height: 88px;\" border=\"1\"><colgroup><col style=\"width: 99.8442%;\"></colgroup>\n<tbody>\n<tr style=\"height: 22px;\">\n<td style=\"border-width: 1px; border-color: rgb(52, 73, 94); height: 22px;\">\n<p style=\"text-align: center;\"><span style=\"text-decoration: underline; font-size: 14pt;\"><strong>Prescribing and Medication Info Section</strong></span></p>\n</td>\n</tr>\n<tr style=\"height: 22px; text-align: center;\">\n<td style=\"border-width: 1px; border-color: rgb(52, 73, 94); height: 22px;\">\n<p><span style=\"font-size: 14pt;\">You are prescribing medication for this consult. </span><br><br><span style=\"font-size: 14pt;\">Please do the prescription in </span><strong><em><span style=\"font-size: 14pt;\">Dosespot</span></em></strong><span style=\"font-size: 14pt;\">, select <strong>Healthwarehouse.com</strong></span></p>\n</td>\n</tr>\n</tbody>\n</table>"
//         },
//         {
//           "id": "13886264",
//           "label": "Prescribing Reminder",
//           "hipaa_name": "<table style=\"border-collapse: collapse; width: 100%; border: 1px solid rgb(52, 73, 94); height: 88px;\" border=\"1\"><colgroup><col style=\"width: 99.8442%;\"></colgroup>\n<tbody>\n<tr style=\"height: 22px;\">\n<td style=\"border-width: 1px; border-color: rgb(52, 73, 94); height: 22px;\">\n<p style=\"text-align: center;\"><span style=\"text-decoration: underline; font-size: 14pt;\"><strong>Prescribing and Medication Info Section</strong></span></p>\n</td>\n</tr>\n<tr style=\"height: 22px; text-align: center;\">\n<td style=\"border-width: 1px; border-color: rgb(52, 73, 94); height: 22px;\">\n<p><span style=\"font-size: 14pt;\">You are prescribing medication for this consult. </span><br><br><span style=\"font-size: 14pt;\">Please do the prescription in </span><strong><em><span style=\"font-size: 14pt;\">Dosespot, </span></em></strong><span style=\"font-size: 14pt;\">select&nbsp;<strong>Strive Pharmacy</strong></span></p>\n</td>\n</tr>\n</tbody>\n</table>\n<p style=\"text-align: center;\">&nbsp;</p>",
//           "mod_type": "read_only",
//           "options": "<table style=\"border-collapse: collapse; width: 100%; border: 1px solid rgb(52, 73, 94); height: 88px;\" border=\"1\"><colgroup><col style=\"width: 99.8442%;\"></colgroup>\n<tbody>\n<tr style=\"height: 22px;\">\n<td style=\"border-width: 1px; border-color: rgb(52, 73, 94); height: 22px;\">\n<p style=\"text-align: center;\"><span style=\"text-decoration: underline; font-size: 14pt;\"><strong>Prescribing and Medication Info Section</strong></span></p>\n</td>\n</tr>\n<tr style=\"height: 22px; text-align: center;\">\n<td style=\"border-width: 1px; border-color: rgb(52, 73, 94); height: 22px;\">\n<p><span style=\"font-size: 14pt;\">You are prescribing medication for this consult. </span><br><br><span style=\"font-size: 14pt;\">Please do the prescription in </span><strong><em><span style=\"font-size: 14pt;\">Dosespot, </span></em></strong><span style=\"font-size: 14pt;\">select&nbsp;<strong>Strive Pharmacy</strong></span></p>\n</td>\n</tr>\n</tbody>\n</table>\n<p style=\"text-align: center;\">&nbsp;</p>"
//         },
//         {
//           "id": "13886265",
//           "label": "PF - Patient Education & Patient Plan for Testosterone Cypionate Injection + Anastrozole",
//           "hipaa_name": "<p>To be included</p>",
//           "mod_type": "textarea",
//           "options": "<p>To be included</p>"
//         },
//         {
//           "id": "13886266",
//           "label": "PF - Patient Education & Patient Plan for Branded Kyzatrex Oral Testosterone",
//           "hipaa_name": "<p>To be included</p>",
//           "mod_type": "textarea",
//           "options": "<p>To be included</p>"
//         },
//         {
//           "id": "13886267",
//           "label": "PF - Patient Education & Patient Plan for Enclomiphene",
//           "hipaa_name": "<p>To be included</p>",
//           "mod_type": "textarea",
//           "options": "<p>To be included</p>"
//         },
//         {
//           "id": "13085570",
//           "label": "Does PA Need to be Filed?",
//           "hipaa_name": "No",
//           "mod_type": "radio",
//           "options": "No"
//         },
//         {
//           "id": "13085541",
//           "label": "Diagnosis",
//           "hipaa_name": "",
//           "mod_type": "diagnosis",
//           "options": ""
//         },
//         {
//           "id": "13085550",
//           "label": "Diagnosis",
//           "hipaa_name": "",
//           "mod_type": "diagnosis",
//           "options": ""
//         },
//         {
//           "id": "13085551",
//           "label": "Diagnosis",
//           "hipaa_name": "",
//           "mod_type": "diagnosis",
//           "options": ""
//         },
//         {
//           "id": "13085552",
//           "label": "Diagnosis",
//           "hipaa_name": "",
//           "mod_type": "diagnosis",
//           "options": ""
//         },
//         {
//           "id": "13085530",
//           "label": "Diagnosis",
//           "hipaa_name": "",
//           "mod_type": "diagnosis",
//           "options": ""
//         },
//         {
//           "id": "13085542",
//           "label": "Diagnosis",
//           "hipaa_name": "",
//           "mod_type": "diagnosis",
//           "options": ""
//         },
//         {
//           "id": "13085544",
//           "label": "CPT Codes",
//           "hipaa_name": "99202 - New Patient - medically appropriate history and/or examination and straightforward medical decision making.\n99203 - New Patient - medically appropriate history and/or examination and low level medical decision making.\n99204 - New Patient - medically appropriate history and/or examination and moderate level medical decision making.\n99205 - New Patient - medically appropriate history and/or examination and high level medical decision making.\n99212 - Established patient - medically appropriate history and/or examination and straightforward medical decision making.\n99213 - Established patient - medically appropriate history and/or examination and low level medical decision making.\n99214 - Established patient - medically appropriate history and/or examination and moderate level medical decision making.\n99215 - Established patient - medically appropriate history and/or examination and high level medical decision making.",
//           "mod_type": "dropdown",
//           "options": "99202 - New Patient - medically appropriate history and/or examination and straightforward medical decision making.\n99203 - New Patient - medically appropriate history and/or examination and low level medical decision making.\n99204 - New Patient - medically appropriate history and/or examination and moderate level medical decision making.\n99205 - New Patient - medically appropriate history and/or examination and high level medical decision making.\n99212 - Established patient - medically appropriate history and/or examination and straightforward medical decision making.\n99213 - Established patient - medically appropriate history and/or examination and low level medical decision making.\n99214 - Established patient - medically appropriate history and/or examination and moderate level medical decision making.\n99215 - Established patient - medically appropriate history and/or examination and high level medical decision making."
//         },
//         {
//           "id": "13085546",
//           "label": "Visit Status",
//           "hipaa_name": "Visit Completed ( visit_completed_status_1 )\nVisit Completed Not Eligible for Program - DQ ( visit_completed_status_3 )",
//           "mod_type": "dropdown",
//           "options": "Visit Completed ( visit_completed_status_1 )\nVisit Completed Not Eligible for Program - DQ ( visit_completed_status_3 )"
//         },
//         {
//           "id": "13085585",
//           "label": "PF - Patient Education & Patient Plan (Patient Facing) - Not Prescribed DQ",
//           "hipaa_name": "<p>Hello,</p>\n<p>&nbsp;</p>\n<p>Based on our conversation today and my review of your medical history, we have identified that you are not a candidate for a TRT medication due to the following reason:</p>\n<p>&nbsp;</p>\n<p><span style=\"color: rgb(224, 62, 45);\">- (Insert reason why) -</span></p>\n<p>&nbsp;</p>\n<p>In the interim, we discussed ways to help with [to be completed].</p>\n<p>&nbsp;</p>\n<p>Customer service will handle the billing with you directly. Please reach out to customer support for further information. It was a pleasure speaking with you today and I wish you the best on your hormone journey.</p>",
//           "mod_type": "textarea",
//           "options": "<p>Hello,</p>\n<p>&nbsp;</p>\n<p>Based on our conversation today and my review of your medical history, we have identified that you are not a candidate for a TRT medication due to the following reason:</p>\n<p>&nbsp;</p>\n<p><span style=\"color: rgb(224, 62, 45);\">- (Insert reason why) -</span></p>\n<p>&nbsp;</p>\n<p>In the interim, we discussed ways to help with [to be completed].</p>\n<p>&nbsp;</p>\n<p>Customer service will handle the billing with you directly. Please reach out to customer support for further information. It was a pleasure speaking with you today and I wish you the best on your hormone journey.</p>"
//         },
//         {
//           "id": "13085534",
//           "label": "DQ/No-Show/ReScheduled/Cancellation Status",
//           "hipaa_name": "No-Show - Patient No-Showed for Visit\nDisqualified - Patient Didn't Meet Eligibility Criteria  ( visit_completed_status_3 )\nCancelled - Patient Ineligible - Labs Not Done\nCancelled - Provider Out Unexpectedly ( cancelled_-_provider_out_unexpectedly )\nCancelled - Rescheduled  ( cancelled_-_rescheduled )\nCancelled - Patient Requested ( cancelled_-_patient_requested )\nCancelled - No Intake Rescheduled ( no_intake_-_rescheduled )\nCancelled - Other Reason ( no_reason )",
//           "mod_type": "dropdown",
//           "options": "No-Show - Patient No-Showed for Visit\nDisqualified - Patient Didn't Meet Eligibility Criteria  ( visit_completed_status_3 )\nCancelled - Patient Ineligible - Labs Not Done\nCancelled - Provider Out Unexpectedly ( cancelled_-_provider_out_unexpectedly )\nCancelled - Rescheduled  ( cancelled_-_rescheduled )\nCancelled - Patient Requested ( cancelled_-_patient_requested )\nCancelled - No Intake Rescheduled ( no_intake_-_rescheduled )\nCancelled - Other Reason ( no_reason )"
//         },
//         {
//           "id": "13085536",
//           "label": "Additional No-Show/Cancellation/Declined Care Information:",
//           "hipaa_name": "",
//           "mod_type": "textarea",
//           "options": ""
//         }
//       ]
//     }
//   }
// }
