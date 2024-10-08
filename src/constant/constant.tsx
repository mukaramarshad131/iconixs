import { UserOutlined } from "@ant-design/icons";
import Link from "next/link";

export const defaultMenu = [
  {
    key: "1",
    icon: <UserOutlined />,
    label: <Link href="/dashboard">Dashboard</Link>,
  },
  {
    key: "2",
    icon: <UserOutlined />,
    label: <Link href="/dashboard/intakeForm">IntakeForm</Link>,
  },
];

export const siderStyle: React.CSSProperties = {
  height: "100vh",
  position: "fixed",
  top: 0,
  bottom: 0,
  // background: "#001529",
  boxShadow: "3px 3px 5px #f0f0f0",
};

export const logoStyle: React.CSSProperties = {
  margin: '10px 0 0',
  padding: '0 10px',
  objectFit: 'scale-down',
};