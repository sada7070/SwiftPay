import { useEffect, useState } from "react";
import axios from "axios";

export const Balance = () => {
    const [balance, setBalance] = useState("");

    useEffect(() => {
        const fetchBalance = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/v1/account/balance", {
                    headers: {
                        Authorization: localStorage.getItem("token")
                      }
                }); 
                console.log("API Response:", response.data); // Debug log
                setBalance(response.data.balance);
            } catch (error) {
                console.error("Error fetching balance:", error);
                setBalance("Error");
            }
        };
        fetchBalance();
    }, []);

    return <div className="flex mt-8 pl-8">
        <div className="font-bold text-lg">
        Your balance
        </div>
        <div className="font-semibold ml-4 text-lg">
            Rs {balance}
        </div>
    </div>
}