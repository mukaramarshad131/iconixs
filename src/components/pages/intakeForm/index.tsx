"use client";
// import { INTAKE_FORM } from '@/graphql/query';
import { questions } from "@/data/projectData";
import {
  useUserActions,
  useUserInfo,
  useUserPermissions,
} from "@/store/userStore";

import { Select, Form, Input, Button} from "antd";
import { useRouter } from "next/navigation";

export default function ItakeForm() {
  const permissions = useUserPermissions();
  const { setUserPermissions, setUserIntakeForm } = useUserActions();
  const user = useUserInfo();
  const router = useRouter();
  const [form] = Form.useForm();

  const OnFinish = async (values: any) => {
    const intakeFormPayload = {
      input: {
        custom_module_form_id: "1524146", // Form id for staging
        form_answers: [
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
            answer: `<p>${Object.values(values)
              .map(
                (item: any, index: number) =>
                  `<b>Question:${questions[index].label}</b><br/>${
                    Array.isArray(item)
                      ? item?.map(
                          (key: any, idx: number) => `${idx + 1}:${key}`
                        )
                      : item
                  }<br/>`
              )
              .join("")}<b>Shipping Address</b>
<br/>Address:${user.location?.line1}, ${user.location?.country}, ${
              user.location?.state
            } ${user.location?.zip}</p>`, // HTML format for the intake
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
            answer: "Initial Visit ( visit_type_1 )",
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
            answer: "Test ABC",
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
    // const res = await intakeFormFunction({ variables: { ...intakeFormPayload } });
    setUserIntakeForm(intakeFormPayload);
    if (!permissions.includes("/dashboard/packages")) {
      setUserPermissions([...new Set([...permissions, "/dashboard/packages"])]);
    }
    router.replace("/dashboard/packages");
  };
  return (
    <div className="w-full flex flex-col justify-center items-center mt-10">
       <h1 className="p-5 text-center text-3xl font-semibold text-[#0092B3] mb-5">
       Patient Intake Form
      </h1>
      <Form
        layout="vertical"
        form={form}
        onFinish={OnFinish}
        className="container"
      >
        {questions.map((field, index) => (
          <Form.Item
            key={index}
            name={field.name}
            label={field.label}
            rules={[{ required: true, message: `${field.label} is required` }]}
          >
            {index > 4 ? (
              <Input.TextArea
                showCount
                maxLength={100}
                placeholder="Type here"
              />
            ) : (
              <Select
                mode="multiple"
                placeholder={`Select ${field.label}`}
                allowClear
              >
                {field?.options!.map((option, idx) => (
                  <Select.Option key={idx} value={option}>
                    {option}
                  </Select.Option>
                ))}
              </Select>
            )}
          </Form.Item>
        ))}
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="w-full !bg-[#0c2345]"
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
