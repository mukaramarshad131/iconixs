export default function ChargeBeeWrapper() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <script src="https://js.chargebee.com/v2/chargebee.js" data-cb-site="iconix-test" />

      <a
        className="bg-blue-500 hover:bg-blue-700 text-white rounded font-bold"
        // href="https://iconix-test.chargebee.com/hosted_pages/checkout?subscription_items[item_price_id][0]=ico-trt-cypionate-inj-USD-Monthly&subscription_items[quantity][0]=1&customer[first_name]=Jose&customer[last_name]=Diaz"
        href="https://iconix-test.chargebee.com/hosted_pages/checkout?subscription_items[item_price_id][0]=ico-trt-kyzatrex-oral-USD-Monthly&subscription_items[quantity][0]=1&customer[first_name]=Jose&customer[last_name]=Diaz&&customer[email]=diaz@gmail.com&billing_address[first_name]=Maira&billing_address[last_name]=Maqbool&billing_address[line1]=AddressLine1&billing_address[line2]=AddressLine2&billing_address[city]=Maxico&billing_address[zip]=123242&billing_address[state_code]=AS&billing_address[country]=US"
      >
        <button> Subscribe using href link</button>
      </a>
    </div>
  );
}
