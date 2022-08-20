import { db } from "./index.js";
import { doc, setDoc, collection } from "firebase/firestore";

export async function createInvoice({ invoice }) {
  const invoiceRef = doc(db, "invoices", invoice.id);
  return await setDoc(invoiceRef, invoice);
}

export const invCol = collection(db, "invoices");
