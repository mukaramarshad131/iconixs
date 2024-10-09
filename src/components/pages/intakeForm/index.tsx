"use client";
// import { useMutation } from '@apollo/client';
import React, { useState } from "react";
import { extractQuestionsAndAnswers } from "@/components/funcitons";
import { questions } from "@/data/projectData";
import { INTAKE_FORM_QUERY } from "@/graphql/query";

import {
  useUserActions,
  useUserInfo,
  useUserPermissions,
} from "@/store/userStore";
import { useQuery } from "@apollo/client";

import { Select, Form, Input, Button, Card } from "antd";
import IntakeListing from "../dashboard/intake-Listing";
import UploadDocs from "@/components/atom/uploadDoc";
import { useRouter } from "next/navigation";


export default function ItakeForm() {
  const permissions = useUserPermissions();
  const { setUserPermissions, setUserIntakeForm, setUserIntakeDoc } = useUserActions();
  const user = useUserInfo();
  const [form] = Form.useForm();
  const router = useRouter()
  const [formData, setFormData] = useState<any>(
    questions.reduce((acc: any, q: any) => {
      acc[q.name] = {
        options: q.options,
        selectedValues: [],
      };
      return acc;
    }, {})
  );

  // const [ mutateFunction, { loading } ] = useMutation(UPLOAD_DOCS);
  // const [intakeFormFunction] = useMutation(INTAKE_FORM);
  const handleSelectChange = (questionName: any, values: any) => {
    const isNoneSelected = values.includes("None of the above");
    if (isNoneSelected) {
      form.setFieldsValue({ [questionName]: ["None of the above"] });
    }
    setFormData((prevFormData: any) => ({
      ...prevFormData,
      [questionName]: {
        options: isNoneSelected
          ? ["None of the above"]
          : questions?.find((q: any) => q.name === questionName).options,
        selectedValues: isNoneSelected ? ["None of the above"] : values,
      },
    }));
  };

  const { data: intakeFormData } = useQuery(INTAKE_FORM_QUERY, {
    variables: {
      custom_module_form_id: "2174074",
      user_id: user.id,
      filler_id: user.id,
    },
  });
  console.log('intakeFormData:', intakeFormData);
  const result = extractQuestionsAndAnswers(
    intakeFormData?.formAnswerGroups[0]?.form_answers[2]?.displayed_answer
  );
  const OnFinish = async (values: any) => {
    const {security_number,upload_driving_liscense, license_number, upload_social_security, ...questionValues} = values;
    console.log('upload_driving_liscense: ', upload_driving_liscense);
    console.log('upload_social_security: ', upload_social_security);
    const intakeFormPayload = {
      input: {
        custom_module_form_id: "2174074", // Form id for staging
        form_answers: [
          {
            custom_module_id: "29460116",
            label: "Patient Info",
          },
          {
            custom_module_id: "29460117",
            label: "Driver License Number (DL)",
            user_id: user.id,
            answer: license_number,
          },
          {
            custom_module_id: "29460118",
            label: "Social Security Number (SSN)",
            answer: security_number,
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
                  `<b>Question:${questions[index].label}</b><br/>${Array.isArray(item)
                    ? item?.map(
                      (key: any, idx: number) => `${idx + 1}:${key}`
                    )
                    : item
                  }<br/>`
              )
              .join("")}<b>Shipping Address</b>
<br/>Address:${user.location?.line1}, ${user.location?.country}, ${user.location?.state
              } ${user.location?.zip}</p>`, // HTML format for the intake
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
            answer: "Initial Visit ( visit_type_1 )",
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
    };


    // await intakeFormFunction({ variables: { ...intakeFormPayload } });
    setUserIntakeDoc({ upload_driving_liscense, upload_social_security });
    setUserIntakeForm(intakeFormPayload);
    if (!permissions.includes("/dashboard/packages")) {
      setUserPermissions([...new Set([...permissions, "/dashboard/packages"])]);
    }
    router.replace("/dashboard/packages");
  };
  const onFileChange = async (value: string, fieldType: boolean) => {
    // const updatePayload = {
    //   input: {
    //     "file_string": value,
    //     "display_name": fieldType ? "File Driving Liscense" : "File Social Security Number",
    //     "rel_user_id": user.id,
    //     "include_in_charting": true
    //   },
    // };
    if(fieldType) {
      form?.setFieldsValue({
        'upload_driving_liscense': value,
      });      
    } else {
      form?.setFieldsValue({
        'upload_social_security': value,
      });
    }
    // await mutateFunction({ variables: { ...updatePayload } });
  };
  return (
    <div>
      {intakeFormData?.formAnswerGroups?.length > 0 ? (
        <IntakeListing />
      ) : (
        <div className="w-full flex flex-col justify-center items-center mt-10">
          <Card bodyStyle={{ padding: "15px 24px" }}>
            <h1 className="text-left text-lg font-semibold text-[#0092B3] mb-5">
              Patient Intake Form
            </h1>
            <Form
              layout="vertical"
              form={form}
              initialValues={result}
              onFinish={OnFinish}
              className="container"
            >
              {questions.map((question: any, index: any) => (
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
                      onChange={(values) =>
                        handleSelectChange(question.name, values)
                      }
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
                      placeholder="Type here"
                    />
                  )}
                </Form.Item>
              ))}
              <Form.Item
                key={12}
                name="security_number"
                label="Social Security Number"
                rules={[{ required: true, message: `Social Security Number is required` }]}
              >
                <Input placeholder="Social Security Number" />
              </Form.Item>
              <Form.Item
                key={13}
                name="license_number"
                label="Driving License Number"
                rules={[{ required: true, message: `Driving License Number is required` }]}
              >
                <Input placeholder="Driving License Number" />
              </Form.Item>
              <Form.Item
                key={14}
                name="upload_social_security"
                label="Upload Social Security Number"
                rules={[{ required: true, message: `Social Security Number is required` }]}
              >
                <UploadDocs onHandleChange={(value: string)=> onFileChange(value, false)}  title="Upload Social Security Number" />
              </Form.Item>
              <Form.Item
                key={15}
                name="upload_driving_liscense"
                label="Upload Social Driving Liscense"
                rules={[{ required: true, message: `Driving Liscense is required` }]}
              >
                <UploadDocs onHandleChange={(value: string)=> onFileChange(value, true)}  title="Upload Social Driving Liscense" />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="w-full !bg-[#0c2345] mt-3"
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
