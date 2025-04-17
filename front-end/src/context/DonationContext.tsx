// // context/DonationContext.tsx
// "use client";

// import React, { createContext, useContext, useEffect, useState } from "react";
// import { useAuth } from "./AuthContext";

// type Donation = {
//   id: number;
//   amount: number;
//   specialMessage: string;
//   socialURLOrBuyMeACoffee: string;
//   donorId: number;
//   recipientId: number;
//   createdAt: string;
// };

// type DonationContextType = {
//   donationsGiven: Donation[];
//   donationsReceived: Donation[];
//   isLoading: boolean;
//   fetchDonations: () => Promise<void>;
//   sendDonation: (donation: Omit<Donation, "id" | "createdAt">) => Promise<void>;
// };

// const DonationContext = createContext<DonationContextType | undefined>(
//   undefined
// );

// export const DonationProvider = ({
//   children,
// }: {
//   children: React.ReactNode;
// }) => {
//   const { user } = useAuth();
//   const [donationsGiven, setDonationsGiven] = useState<Donation[]>([]);
//   const [donationsReceived, setDonationsReceived] = useState<Donation[]>([]);
//   const [isLoading, setIsLoading] = useState(false);

//   const fetchDonations = async () => {
//     if (!user?.id) return;
//     setIsLoading(true);
//     try {
//       const [givenRes, receivedRes] = await Promise.all([
//         fetch(`http://localhost:3000/donation/given/${user.id}`),
//         fetch(`http://localhost:3000/donation/received/${user.id}`),
//       ]);

//       const givenData = await givenRes.json();
//       const receivedData = await receivedRes.json();

//       setDonationsGiven(givenData);
//       setDonationsReceived(receivedData);
//     } catch (err) {
//       console.error("Error fetching donations:", err);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const sendDonation = async (donation: Omit<Donation, "id" | "createdAt">) => {
//     setIsLoading(true);
//     try {
//       const res = await fetch("http://localhost:3000/donation", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(donation),
//       });

//       const newDonation = await res.json();
//       setDonationsGiven((prev) => [...prev, newDonation]);
//     } catch (err) {
//       console.error("Error sending donation:", err);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (user?.id) fetchDonations();
//   }, [user]);

//   return (
//     <DonationContext.Provider
//       value={{
//         donationsGiven,
//         donationsReceived,
//         isLoading,
//         fetchDonations,
//         sendDonation,
//       }}
//     >
//       {children}
//     </DonationContext.Provider>
//   );
// };

// export const useDonations = () => {
//   const context = useContext(DonationContext);
//   if (!context) {
//     throw new Error("useDonations must be used within a DonationProvider");
//   }
//   return context;
// };
