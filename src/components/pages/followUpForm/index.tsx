"use client";
import { useMutation } from '@apollo/client';
import React, { useState } from "react";
import { extractQuestionsAndAnswers } from "@/components/funcitons";
import { followUpQuestions } from "@/data/projectData";
import { INTAKE_FORM_QUERY, INTAKE_FORM } from "@/graphql/query";

import { useUserInfo } from "@/store/userStore";
import { useQuery } from "@apollo/client";

import { Select, Form, Input, Button, Card } from "antd";
import IntakeListing from "../dashboard/intake-Listing";
import { useRouter } from "next/navigation";

const useGetFieldValue = (fieldName:any, form:any) => {
  return Form.useWatch(fieldName, form);
};
export default function FollowUpForm() {
  const user = useUserInfo();
  const [form] = Form.useForm();
  const router = useRouter();
  const [formData, setFormData] = useState<any>(
    followUpQuestions.reduce((acc: any, q: any) => {
      acc[q.name] = {
        options: q.options,
        isDisable: false,
        selectedValues: [],
      };
      return acc;
    }, {})
  );
  const questionValue1 = useGetFieldValue('question1', form);
  const questionValue2 = useGetFieldValue('question2', form);
  const [intakeFormFunction, { loading }] = useMutation(INTAKE_FORM);
  const { data: intakeFormData } = useQuery(INTAKE_FORM_QUERY, {
    variables: {
      custom_module_form_id: process.env.FORM_ID,
      user_id: user.id,
      filler_id: user.id,
    },
  });
  const result = extractQuestionsAndAnswers(
    intakeFormData?.formAnswerGroups[0]?.form_answers[2]?.displayed_answer
  );
  const OnFinish = async (values: any) => {
    const { question1, question2, explain1, explain2, ...questionValues } = values;
    const intakeFormPayload = process.env.FORM_ID === "2174074" ? {
      input: {
        custom_module_form_id: "2174074", // Form id for staging
        form_answers: [
          {
            custom_module_id: "29460116",
            label: "Patient Info",
          },
          // {
          //   custom_module_id: "14669228",
          //   label: "Upload Social Driving Liscense",
          //   mod_type: "textarea",
          //   answer: upload_driving_liscense,
          // },
          // {
          //   custom_module_id: "14669229",
          //   label: "Upload Social Security Number",
          //   mod_type: "textarea",
          //   answer: upload_social_security,
          // },
          {
            custom_module_id: "28756629",
            label: "Intake",
          },
          {
            custom_module_id: "28756630",
            label: "Hormone Type",
            answer: "TRT", // HTML format for the intake
          },
          {
            custom_module_id: "28756631",
            label: "Patient Intake",
            user_id: user.id,
            answer: `<p>${Object.values(questionValues)
              .map(
                (item: any, index: number) =>
                  `<b>Question:${followUpQuestions[index].label}</b><br/>${Array.isArray(item)
                    ? item?.map(
                      (key: any, idx: number) => `${idx + 1}:${key}`
                    )
                    : item
                  }<br/>`
              )
              .join("")}
              <b>Question:Since your last visit, are you taking the prescribed medication as scheduled?</b><br/>
              ${question1}<br/>
              ${explain1 && `<b>Explain</b><br/> ${explain1}<br/>`}
              <b>How have your symptoms changed since your last visit?</b><br/>
              ${question2}<br/>
              ${explain2 && `<b>Explain</b><br/> ${explain2}<br/>`}
            </p>`, // HTML format for the intake
          },
          {
            custom_module_id: "28756632",
            label: "Photo Upload",
            answer: "photo",
            user_id: user.id, // HTML format for the intake
          },
          {
            custom_module_id: "28756633",
            label: "Labs will be ordered through",
            answer: "At Home Labs ( at_home_labs_vital )",
            user_id: user.id,
          },
          {
            custom_module_id: "28565764",
            label: "Sync/Async Visit",
            mod_type: "dropdown",
            answer: "Async ( async_visit )",
            user_id: user.id,
          },
          {
            custom_module_id: "28756634",
            label: "Charting",
            answer: "Charting",
            user_id: user.id,
          },
          {
            custom_module_id: "28565762",
            label: "Note Type",
            answer: "Test Note Type",
            user_id: user.id,
          },
          {
            custom_module_id: "29460121",
            label: "Visit Type",
            answer: "Follow Up ( visit_type_2 )",
            user_id: user.id,
          },
          {
            custom_module_id: "28565792",
            label: "Patient Consent (Sync)",
            answer: "Patient Consent (Sync)",
            user_id: user.id,
          },
          {
            custom_module_id: "28565790",
            label: "Patient Consent (Async)",
            answer: "Patient Consent (Async)",
            user_id: user.id,
          },
          {
            custom_module_id: "28565774",
            label: "Visit Modality",
            answer: "Test Visit Modality",
            user_id: user.id,
          },
          {
            custom_module_id: "28565798",
            label: "What state is the patient located in at time of visit?",
            answer: "Test",
            user_id: user.id,
          },
          {
            custom_module_id: "28565797",
            label: null,
            answer: "Test",
            user_id: user.id,
          },
          {
            custom_module_id: "28565811",
            label: null,
            answer: "Test",
            user_id: user.id,
          },
          {
            custom_module_id: "28565766",
            label: "Name of Patient",
            answer: "",
            user_id: user.id,
          },
          {
            custom_module_id: "28565768",
            label: "Date of Birth",
            answer: "",
            user_id: user.id,
          },
          {
            custom_module_id: "28565769",
            label: "Gender",
            answer: "Gender",
            user_id: user.id,
          },
          {
            custom_module_id: "28565793",
            label: "Physical Location of Patient ",
            answer: "",
            user_id: user.id,
          },
          {
            custom_module_id: "28565802",
            label: "If Other, please explain:",
            answer: "",
            user_id: user.id,
          },
          {
            custom_module_id: "28565817",
            label: "BMI",
            answer: "",
            user_id: user.id,
          },
          {
            custom_module_id: "28565770",
            label: "Any known allergies? (Medication, Environmental, or Food)",
            mod_type: "radio",
            answer: "",
            user_id: user.id,
          },
          {
            custom_module_id: "28565803",
            label: "Allergy",
            answer: "",
            user_id: user.id,
          },
          {
            custom_module_id: "28565771",
            label:
              "Is patient currently taking any medications (prescription or over-the-counter)",
            answer: "",
            user_id: user.id,
          },
          {
            custom_module_id: "28565804",
            label: "List any medications you are taking",
            answer: "",
            user_id: user.id,
          },
          {
            custom_module_id: "28565794",
            label: "Chief Complaint",
            answer: "",
            user_id: user.id,
          },
          {
            custom_module_id: "28565775",
            label: "CPT Codes",
            answer: "",
            user_id: user.id,
          },
          {
            custom_module_id: "28565777",
            label: "Visit Status",
            answer: "",
            user_id: user.id,
          },
          {
            custom_module_id: "29576651",
            label:
              "PF - Patient Education & Patient Plan (Patient Facing) - Not Prescribed DQ",
            answer: "",
            user_id: user.id,
          },
          {
            custom_module_id: "28565765",
            label: "DQ/No-Show/ReScheduled/Cancellation Status",
            answer: "",
            user_id: user.id,
          },
          {
            custom_module_id: "28565767",
            label: "Additional No-Show/Cancellation/Declined Care Information:",
            answer: "",
            user_id: user.id,
          },
        ],
        name: "Hormone SOAP Intake",
        finished: true,
        user_id: user.id, // Patiend ID from CreatePatient mutation response
      },
    } : {
      input: {
        custom_module_form_id: "1524146", // Form id for staging
        form_answers: [
          {
            custom_module_id: "14669225",
            label: "Patient Info",
          },
          // {
          //   custom_module_id: "14669228",
          //   label: "Upload Social Driving Liscense",
          //   mod_type: "textarea",
          //   answer: upload_driving_liscense,
          // },
          // {
          //   custom_module_id: "14669229",
          //   label: "Upload Social Security Number",
          //   mod_type: "textarea",
          //   answer: upload_social_security,
          // },
          {
            custom_module_id: "13579507",
            label: "Intake",
          },
          {
            custom_module_id: "13579508",
            label: "Hormone Type",
            answer: "TRT", // HTML format for the intake
          },
          {
            custom_module_id: "13579509",
            label: "Patient Intake",
            user_id: user.id,
            answer: `<p>${Object.values(questionValues)
              .map(
                (item: any, index: number) =>
                  `<b>Question:${followUpQuestions[index].label}</b><br/>${Array.isArray(item)
                    ? item?.map(
                      (key: any, idx: number) => `${idx + 1}:${key}`
                    )
                    : item
                  }<br/>`
              )
              .join("")}
              <b>Question:Since your last visit, are you taking the prescribed medication as scheduled?</b><br/>
              ${question1}<br/>
              ${explain1 && `<b>Explain</b> ${explain1}<br/>`}
              <b>How have your symptoms changed since your last visit?</b><br/>
              ${question2}<br/>
              ${explain2 && `<b>Explain</b> ${explain2}<br/>`}
            </p>`, // HTML format for the intake
          },
          {
            custom_module_id: "13579510",
            label: "Photo Upload",
            answer: "photo",
            user_id: user.id, // HTML format for the intake
          },
          {
            custom_module_id: "13579511",
            label: "Labs will be ordered through",
            answer: "At Home Labs ( at_home_labs_vital )",
            user_id: user.id,
          },
          {
            custom_module_id: "13085533",
            label: "Sync/Async Visit",
            mod_type: "dropdown",
            answer: "Async ( async_visit )",
            user_id: user.id,
          },
          {
            custom_module_id: "13579512",
            label: "Charting",
            answer: "Charting",
            user_id: user.id,
          },
          {
            custom_module_id: "13085531",
            label: "Note Type",
            answer: "Test Note Type",
            user_id: user.id,
          },
          {
            custom_module_id: "13085532",
            label: "Visit Type",
            answer: "Follow Up ( visit_type_2 )",
            user_id: user.id,
          },
          {
            custom_module_id: "13085561",
            label: "Patient Consent (Sync)",
            answer: "Patient Consent (Sync)",
            user_id: user.id,
          },
          {
            custom_module_id: "13085559",
            label: "Patient Consent (Async)",
            answer: "Patient Consent (Async)",
            user_id: user.id,
          },
          {
            custom_module_id: "13085543",
            label: "Visit Modality",
            answer: "Test Visit Modality",
            user_id: user.id,
          },
          {
            custom_module_id: "13085567",
            label: "What state is the patient located in at time of visit?",
            answer: "Test",
            user_id: user.id,
          },
          {
            custom_module_id: "13085566",
            label: null,
            answer: "Test",
            user_id: user.id,
          },
          {
            custom_module_id: "13085569",
            label: null,
            answer: "Test",
            user_id: user.id,
          },
          {
            custom_module_id: "13085535",
            label: "Name of Patient",
            answer: "",
            user_id: user.id,
          },
          {
            custom_module_id: "13085537",
            label: "Date of Birth",
            answer: "",
            user_id: user.id,
          },
          {
            custom_module_id: "13085538",
            label: "Gender",
            answer: "Gender",
            user_id: user.id,
          },
          {
            custom_module_id: "13085562",
            label: "Physical Location of Patient ",
            answer: "",
            user_id: user.id,
          },
          {
            custom_module_id: "13085571",
            label: "If Other, please explain:",
            answer: "",
            user_id: user.id,
          },
          {
            custom_module_id: "13085586",
            label: "BMI",
            answer: "",
            user_id: user.id,
          },
          {
            custom_module_id: "13085539",
            label: "Any known allergies? (Medication, Environmental, or Food)",
            mod_type: "radio",
            answer: "",
            user_id: user.id,
          },
          {
            custom_module_id: "13085572",
            label: "Allergy",
            answer: "",
            user_id: user.id,
          },
          {
            custom_module_id: "13085540",
            label:
              "Is patient currently taking any medications (prescription or over-the-counter)",
            answer: "",
            user_id: user.id,
          },
          {
            custom_module_id: "13085573",
            label: "List any medications you are taking",
            answer: "",
            user_id: user.id,
          },
          {
            custom_module_id: "13085563",
            label: "Chief Complaint",
            answer: "",
            user_id: user.id,
          },
          {
            custom_module_id: "13085555",
            answer: "",
            user_id: user.id,
          },
          {
            custom_module_id: "13085556",
            answer: "",
            user_id: user.id,
          },
          {
            custom_module_id: "13085574",
            answer: "",
            user_id: user.id,
          },
          {
            custom_module_id: "13085560",
            answer: "",
            user_id: user.id,
          },
          {
            custom_module_id: "13085565",
            answer: "",
            user_id: user.id,
          },
          {
            custom_module_id: "13085553",
            answer: "",
            user_id: user.id,
          },
          {
            custom_module_id: "13085575",
            answer: "",
            user_id: user.id,
          },
          {
            custom_module_id: "13085547",
            answer: "",
            user_id: user.id,
          },
          {
            custom_module_id: "13085554",
            answer: "",
            user_id: user.id,
          },
          {
            custom_module_id: "13085576",
            answer: "",
            user_id: user.id,
          },
          {
            custom_module_id: "13085568",
            answer: "",
            user_id: user.id,
          },
          {
            custom_module_id: "13085548",
            answer: "",
            user_id: user.id,
          },
          {
            custom_module_id: "13085577",
            answer: "",
            user_id: user.id,
          },
          {
            custom_module_id: "13085578",
            answer: "",
            user_id: user.id,
          },
          {
            custom_module_id: "13085557",
            answer: "",
            user_id: user.id,
          },
          {
            custom_module_id: "13085558",
            answer: "",
            user_id: user.id,
          },
          {
            custom_module_id: "13085564",
            answer: "",
            user_id: user.id,
          },
          {
            custom_module_id: "13085549",
            answer: "",
            user_id: user.id,
          },
          {
            custom_module_id: "13085579",
            answer: "",
            user_id: user.id,
          },
          {
            custom_module_id: "13085580",
            answer: "",
            user_id: user.id,
          },
          {
            custom_module_id: "13085581",
          },
          {
            custom_module_id: "13085545",
            answer: "",
            user_id: user.id,
          },
          {
            custom_module_id: "13886268",
            answer: "",
            user_id: user.id,
          },
          {
            custom_module_id: "13886261",
            answer: "",
            user_id: user.id,
          },
          {
            custom_module_id: "13886262",
            answer: "",
            user_id: user.id,
          },
          {
            custom_module_id: "13886263",
            answer: "",
            user_id: user.id,
          },
          {
            custom_module_id: "13085584",
            answer: "",
            user_id: user.id,
          },
          {
            custom_module_id: "13886264",
            answer: "",
            user_id: user.id,
          },
          {
            custom_module_id: "13886265",
            answer: "",
            user_id: user.id,
          },
          {
            custom_module_id: "13886266",
            answer: "",
            user_id: user.id,
          },
          {
            custom_module_id: "13886267",
            answer: "",
            user_id: user.id,
          },
          {
            custom_module_id: "13085570",
            answer: "",
            user_id: user.id,
          },
          {
            custom_module_id: "13085541",
            answer: "",
            user_id: user.id,
          },
          {
            custom_module_id: "13085550",
            answer: "",
            user_id: user.id,
          },
          {
            custom_module_id: "13085551",
            answer: "",
            user_id: user.id,
          },
          {
            custom_module_id: "13085552",
            answer: "",
            user_id: user.id,
          },
          {
            custom_module_id: "13085530",
            answer: "",
            user_id: user.id,
          },
          {
            custom_module_id: "13085542",
            answer: "",
            user_id: user.id,
          },
          {
            custom_module_id: "13085544",
            label: "CPT Codes",
            answer: "",
            user_id: user.id,
          },
          {
            custom_module_id: "13085546",
            label: "Visit Status",
            answer: "",
            user_id: user.id,
          },
          {
            custom_module_id: "13085585",
            label:
              "PF - Patient Education & Patient Plan (Patient Facing) - Not Prescribed DQ",
            answer: "",
            user_id: user.id,
          },
          {
            custom_module_id: "13085534",
            label: "DQ/No-Show/ReScheduled/Cancellation Status",
            answer: "",
            user_id: user.id,
          },
          {
            custom_module_id: "13085536",
            label: "Additional No-Show/Cancellation/Declined Care Information:",
            answer: "",
            user_id: user.id,
          },
        ],
        name: "SP - Hormone SOAP Intake",
        finished: true,
        user_id: user.id, // Patiend ID from CreatePatient mutation response
      },
    };
    await intakeFormFunction({ variables: { ...intakeFormPayload } });
  };


  const { Option } = Select;

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

  return (
    <div>
      {intakeFormData?.formAnswerGroups?.length > 0 ? (
        <IntakeListing />
      ) : (
        <div className="w-full flex flex-col justify-center items-center mt-10">
          <Card bodyStyle={{ padding: "15px 24px" }} style={{width: "100%"}}>
            <h1 className="text-left text-lg font-semibold text-[#0092B3] mb-5">
              Follow Up Form
            </h1>
            <Form
              layout="vertical"
              form={form}
              onFinish={OnFinish}
              className="container"
            >
              <Form.Item name="question1" label="Since your last visit, are you taking the prescribed medication as scheduled?" rules={[{ required: true }]}>
                <Select
                  placeholder="Select a option and change input text above"
                  onChange={onGenderChange}
                  allowClear
                >
                  <Option value="Yes">Yes</Option>
                  <Option value="No">No</Option>
                  <Option value="I was not prescribed medication at my last visit">I was not prescribed medication at my last visit</Option>
                </Select>
              </Form.Item>
              {questionValue1 ==="No" && 
                <Form.Item name="explain1" label="Explain" rules={[{ required: true }]}>
                  <Input.TextArea
                    showCount
                    maxLength={100}
                    placeholder="Type here"
                  />
                </Form.Item>
              }
              <Form.Item name="question2" label="How have your symptoms changed since your last visit?" rules={[{ required: true }]}>
                <Select
                  placeholder="Select a option and change input text above"
                  onChange={onGenderChange}
                  allowClear
                >
                  <Option value="Improved">Improved</Option>
                  <Option value="Resolved">Resolved</Option>
                  <Option value="Unchanged">Unchanged</Option>
                  <Option value="Worsened">Worsened</Option>
                </Select>
              </Form.Item>
              {["Improved", "Resolved","Unchanged","Worsened"].includes(questionValue2) && 
                <Form.Item name="explain2" label="Explain" rules={[{ required: true }]}>
                  <Input.TextArea
                    showCount
                    maxLength={100}
                    placeholder="Type here"
                  />
                </Form.Item>
              }
              {followUpQuestions.map((question: any, index: any) => (
                <Form.Item
                  key={index}
                  name={question.name}
                  label={question.label}
                  rules={[{ required: true, message: `${question.label} is required` }]}
                >
                  {question.options && question.options.length > 0 ? (
                    <Select
                      mode="multiple"
                      placeholder="Select options"
                      value={formData[question.name].selectedValues}
                      disabled={formData[question.name].isDisable}
                    // onChange={(values) =>
                    //   handleSelectChange(question.name, values)
                    // }
                    >
                      {question.options.map((option: any, i: any) => (
                        <Select.Option
                          key={i}
                          value={option}
                          disabled={
                            option !== "None of the above" &&
                            formData[question.name].selectedValues.includes(
                              "None of the above"
                            )
                          }
                        >
                          {option}
                        </Select.Option>
                      ))}
                    </Select>
                  ) : (
                    <Input.TextArea
                      showCount
                      maxLength={100}
                      disabled={formData[question.name].isDisable}
                      placeholder="Type here"
                    />
                  )}
                </Form.Item>
              ))}
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                >
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </div>
      )}
    </div>
  );
}
