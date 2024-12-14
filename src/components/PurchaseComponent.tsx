'use client'
// Import necessary modules
import { useEffect } from 'react';
import Script from 'next/script';

const PurchaseComponent = () => {
    useEffect(() => {
        // Initialize Google Analytics when the component mounts
        if (typeof window !== 'undefined') {
            window.dataLayer = window.dataLayer || [];
            function gtag(...args: unknown[]) {
                window.dataLayer!.push(args);
            }
            gtag('js', new Date());
            gtag('config', 'G-9E5P1YMYMY'); // Replace with your GA4 Measurement ID
        }
    }, []);

    const handlePurchase = () => {
        // Define the purchase data
        const purchaseData = {
            transaction_id: 'T12345',
            value: 199.99,
            currency: 'USD',
            items: [
                {
                    item_id: 'P001',
                    item_name: 'Comfy-Back Chair',
                    item_category: 'Furniture',
                    price: 199.99,
                    quantity: 1,
                },
            ],
        };

        // Trigger the purchase event using gtag
        if (typeof window !== 'undefined' && Array.isArray(window.dataLayer)) {
            if (typeof window.gtag === 'function') {
                window.gtag('event', 'purchase', purchaseData);
                console.log('Purchase event triggered:', purchaseData);
            } else {
                console.error('Google Analytics is not initialized.');
            }
        } else {
            console.error('Data layer is not defined or not an array.');
        }
    };

    return (
        <div>
            {/* Google Analytics Scripts */}
            <Script
                src="https://www.googletagmanager.com/gtag/js?id=G-9E5P1YMYMY"
                strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
                {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', 'G-9E5P1YMYMY');
                `}
            </Script>

            {/* Purchase Button */}
            <h1>Purchase Component</h1>
            <button onClick={handlePurchase} style={{ padding: '10px 20px', fontSize: '16px' }}>
                Complete Purchase
            </button>
        </div>
    );
};

export default PurchaseComponent;
