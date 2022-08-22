import { db } from "./index.js";
import { doc, setDoc, collection, deleteDoc } from "firebase/firestore";

export async function createInvoice({ invoice }) {
  const invoiceRef = doc(db, "invoices", invoice.id);
  return await setDoc(invoiceRef, invoice);
}

export async function markInvoiceAsPaid({ id }) {
  const invoiceRef = doc(db, "invoices", id);
  return await setDoc(invoiceRef, { status: "paid" }, { merge: true });
}

export async function deleteInvoice({ id }) {
  const invoiceRef = doc(db, "invoices", id);
  return await deleteDoc(invoiceRef);
}

export const invCol = collection(db, "invoices");
