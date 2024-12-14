'use server';

// Replace with your API URL and credentials
const apiUrl = "https://iconix-test.chargebee.com/api/v2/coupons";
const username = "test_Ub6uIGDUEq36cdORYcuOHoVnVOZHqJ9VVa";
const password = "@Junaid@2025";
// Encode credentials in Base64
const basicAuth = `Basic ${btoa(`${username}:${password}`)}`;
export async function FetchAllCoupons() {
    try {
        const response = await fetch(apiUrl, {
            method: "GET",
            headers: {
                "Authorization": basicAuth,
                "Content-Type": "application/json", // Optional, depending on the API
            },
        });
        // Check if the response is OK
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        // Parse the JSON response
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    } finally {
        // await prisma.$disconnect();
        console.error("Error fetching users: 333");
    }
}