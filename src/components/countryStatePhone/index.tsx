import React, { useState } from "react";
import { Country, State, ICountry, IState } from "country-state-city";
import { CountryCode, getCountryCallingCode } from "libphonenumber-js";
import { Form, Select, Input, Col, Row } from "antd";
import { FieldType } from "@/types/types";

const { Option } = Select;

interface CountrySelectProps {
  noLabel?: boolean; // Define noLabel prop
}
const CountryStateForm: React.FC<CountrySelectProps> = ({noLabel=false}) => {
  // State hooks for form data
  const [countries] = useState<ICountry[]>(Country.getAllCountries());
  const [states, setStates] = useState<IState[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [selectedState, setSelectedState] = useState<string>("");
  const [phoneCode, setPhoneCode] = useState<string>("");

  // Handler for country change
  const handleCountryChange = (value: string) => {
    setSelectedCountry(value);

    // Fetch states for the selected country
    const countryStates = State.getStatesOfCountry(value);
    setStates(countryStates);

    // Fetch and set the country calling code
    const countryCallingCode = getCountryCallingCode(value as CountryCode);
    setPhoneCode(`+${countryCallingCode}`);
  };

  // Handler for state change
  const handleStateChange = (value: string) => {
    setSelectedState(value);
  };

  return (
    <Row gutter={16}>
      <Col md={12} sm={24}>
        <Form.Item
          label={!noLabel ? "Country" : undefined}
          name="country"
          rules={[{ required: true, message: "Please input country" }]}
        >
          <Select
            showSearch
            placeholder="Select Country"
            value={selectedCountry}
            onChange={handleCountryChange}
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.children as unknown as string)
                .toLowerCase()
                .includes(input.toLowerCase())
            }
          >
            {countries.map((country) => (
              <Option key={country.isoCode} value={country.isoCode}>
                {country.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Col>
      <Col md={12} sm={24}>
        <Form.Item
        label={!noLabel ? "State" : undefined}
          name="state"
          rules={[{ required: true, message: "Please input state" }]}
        >
          <Select
            showSearch
            placeholder="Select State"
            value={selectedState}
            onChange={handleStateChange}
            disabled={!states.length}
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.children as unknown as string)
                .toLowerCase()
                .includes(input.toLowerCase())
            }
          >
            {states.map((state) => (
              <Option key={state.isoCode} value={state.isoCode}>
                {state.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Col>
      <Col md={12} sm={24}>
        <Form.Item<FieldType>
          label={!noLabel ? "City" : undefined}
          name="city"
          rules={[{ required: true, message: "Please input city" }]}
        >
          <Input placeholder="City" />
        </Form.Item>
      </Col>
      <Col md={12} sm={24}>
        <Form.Item<FieldType>
          label={!noLabel ? "Street:" : undefined}
          name="line1"
          rules={[{ required: true, message: "Please input Address" }]}
        >
          <Input placeholder="Street" />
        </Form.Item>
      </Col>
      <Col md={12} sm={24}>
        <Form.Item<FieldType>
          label={!noLabel ? "Zip Code:" : undefined}
          name="zip"
          rules={[{ required: true, message: "Please input postal code" }]}
        >
          <Input placeholder="Postal/Zip code" />
        </Form.Item>
      </Col>
      <Col md={12} sm={24}>
        <Form.Item
        label={!noLabel ? "Phone Number" : undefined}
          name="phone_number"
          rules={[{ required: true, message: "Please input Phone Number" },
            {
              pattern: /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/, // Generic pattern allowing +, spaces, and dashes
              message: 'Invalid phone number format',
            },
          ]}
        >
          <Input
            type="number"
            placeholder={
              phoneCode ? `e.g., ${phoneCode} 123456789` : "Enter phone number"
            }
            prefix={phoneCode}
          />
        </Form.Item>
      </Col>
    </Row>
  );
};

export default CountryStateForm;
