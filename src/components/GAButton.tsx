'use client'
import React from 'react'
import { sendGAEvent } from '@next/third-parties/google'

const GAButton = () => {

const handlePurchase = () => {
    // Prepare purchase data
    const purchaseData = {
        transaction_id: 'T12345', // Unique transaction ID
        value: 199.99, // Total order value
        currency: 'USD', // Currency
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

    console.log('Purchase event sent before:', purchaseData);

    // Trigger the purchase event
    sendGAEvent('purchase', purchaseData);

    console.log('Purchase event sent:', purchaseData);
};

return (
    <button onClick={handlePurchase}>
        Complete Purchase
    </button>
);

}

export default GAButton



// 'use client'
// import React from 'react'
// import { sendGAEvent } from '@next/third-parties/google'

// const GAButton = () => {
//   return (
//     <button onClick={() => sendGAEvent({event:'buttonClicked', value:'xyz' })}>Send Event</button>
//   )
// }

// export default GAButton
