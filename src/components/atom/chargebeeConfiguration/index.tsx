import Script from 'next/script';
export default function ChargebeeConfiguration() {
  return (
    <>
      {/* <h1>Your Next.js Page</h1> */}
      <Script
        src="https://js.chargebee.com/v2/chargebee.js"
        data-cb-site="https://iconix-test.chargebee.com"
        data-cb-ga-enabled="true"
        strategy="lazyOnload"
      />
    </>
  );
}