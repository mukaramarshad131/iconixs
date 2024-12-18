"use client";
import {
  useUserActions,
  useUserInfo,
  useUserPermissions,
} from "@/store/userStore";
import { Button } from "antd";
import { useRouter } from "next/navigation";
import React from "react";

const SubscribeBtn = ({data}: {data:any}) => {
  const { setUserPlan, setUserPermissions } = useUserActions();
  const permissions = useUserPermissions();
  const { email, first_name, last_name, location } = useUserInfo();
  const router = useRouter();
  const handleCart = (planId: string) => {
    setUserPlan(planId);
    if (!permissions.includes("/dashboard/create-invoice")) {
      setUserPermissions([...new Set([...permissions, "/dashboard/create-invoice"])]);
    }
    // https://iconix-test.chargebee.com/hosted_pages/checkout?subscription_items[item_price_id][0]=ico-trt-kyzatrex-oral-28-USD-Every-28-days&utm_source=cb-app-copy
    router.replace(
      process.env.CHARGEBEE_URL +
        `?subscription_items[item_price_id][0]=${planId}&subscription_items[quantity][0]=1&customer[first_name]=${first_name}&customer[last_name]=${last_name}&&customer[email]=${email}&billing_address[first_name]=${first_name}&billing_address[last_name]=${last_name}&billing_address[line1]=${location.line1}&billing_address[city]=${location.city}&billing_address[zip]=${location.zip}&billing_address[state_code]=${location.state}&billing_address[country]=US`
    );
  };
  // https://iconix.chargebee.com/hosted_pages/checkout?subscription_items%5Bitem_price_id%5D%5B0%5D=ico-trt-initial-labs-consult-fee-USD&layout=full_page

  return (
    <Button
      onClick={() => handleCart(data.id)}
      style={{
        background:  "#1B3352",
        borderRadius: 10,
        color: "white",
        fontSize: "18px",
        padding: "20px 0px",
      }}
      className="w-3/4"
    >
      Subscribe
    </Button>
  );
};

export default SubscribeBtn;
