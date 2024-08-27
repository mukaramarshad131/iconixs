import CreateInvoice from '@/components/createInvoice';
import { useSearchParams } from '@/router/hooks';
import { useUserInfo, useUserPlan } from '@/store/userStore';

function CheckOut() {
  const { firstName, lastName, zip, state } = useUserInfo();
  const searchParams = useSearchParams();
  const { planId } = useUserPlan();

  return (
    <div>
      {searchParams.get('sub_id') ? (
        <CreateInvoice />
      ) : (
        <iframe
          id="checkoutIframe"
          style={{ width: '100%', height: '190vh' }}
          src={`https://iconix-test.chargebee.com/hosted_pages/checkout?subscription_items[item_price_id][0]=${planId}-USD-Monthly&subscription_items[quantity][0]=1&customer[first_name]=Jose&customer[last_name]=Diaz&&customer[email]=diaz@gmail.com&billing_address[first_name]=${firstName}&billing_address[last_name]=${lastName}&billing_address[line1]=AddressLine1&billing_address[line2]=AddressLine2&billing_address[city]=Maxico&billing_address[zip]=${zip}&billing_address[state_code]=${state}&billing_address[country]=US`}
          title="W3Schools Free Online Web Tutorials"
        />
      )}
    </div>
  );
}

export default CheckOut;
