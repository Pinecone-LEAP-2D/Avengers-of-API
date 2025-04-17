// // context/BankCardContext.tsx
// "use client";

// import React, { createContext, useContext, useEffect, useState } from "react";
// import { useAuth } from "./AuthContext";

// type BankCard = {
//   id: number;
//   country: string;
//   firstName: string;
//   lastName: string;
//   cardNumber: string;
//   expiryDate: string; // ISO format
// };

// type BankCardContextType = {
//   cards: BankCard[];
//   isLoading: boolean;
//   fetchCards: () => Promise<void>;
//   addCard: (newCard: Omit<BankCard, "id">) => Promise<void>;
//   deleteCard: (cardId: number) => Promise<void>;
//   updateCard: (cardId: number, updatedCard: Partial<BankCard>) => Promise<void>;
// };

// const BankCardContext = createContext<BankCardContextType | undefined>(
//   undefined
// );

// export const BankCardProvider = ({
//   children,
// }: {
//   children: React.ReactNode;
// }) => {
//   const { user } = useAuth();
//   const [cards, setCards] = useState<BankCard[]>([]);
//   const [isLoading, setIsLoading] = useState(false);

//   const fetchCards = async () => {
//     if (!user?.id) return;
//     setIsLoading(true);
//     try {
//       const res = await fetch(`http://localhost:3000/bankcard/${user.id}`);
//       const data = await res.json();
//       setCards(data);
//     } catch (err) {
//       console.error("Error fetching bank cards:", err);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const addCard = async (newCard: Omit<BankCard, "id">) => {
//     if (!user?.id) return;
//     setIsLoading(true);
//     try {
//       const res = await fetch(`http://localhost:3000/bankcard`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ ...newCard, userId: user.id }),
//       });
//       const data = await res.json();
//       setCards((prev) => [...prev, data]);
//     } catch (err) {
//       console.error("Error adding bank card:", err);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const deleteCard = async (cardId: number) => {
//     setIsLoading(true);
//     try {
//       await fetch(`http://localhost:3000/bankcard/${cardId}`, {
//         method: "DELETE",
//       });
//       setCards((prev) => prev.filter((card) => card.id !== cardId));
//     } catch (err) {
//       console.error("Error deleting card:", err);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const updateCard = async (cardId: number, updatedCard: Partial<BankCard>) => {
//     setIsLoading(true);
//     try {
//       const res = await fetch(`http://localhost:3000/bankcard/${cardId}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(updatedCard),
//       });
//       const data = await res.json();
//       setCards((prev) =>
//         prev.map((card) => (card.id === cardId ? data : card))
//       );
//     } catch (err) {
//       console.error("Error updating card:", err);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (user?.id) fetchCards();
//   }, [user]);

//   return (
//     <BankCardContext.Provider
//       value={{ cards, isLoading, fetchCards, addCard, deleteCard, updateCard }}
//     >
//       {children}
//     </BankCardContext.Provider>
//   );
// };

// export const useBankCards = () => {
//   const context = useContext(BankCardContext);
//   if (!context)
//     throw new Error("useBankCards must be used within a BankCardProvider");
//   return context;
// };
