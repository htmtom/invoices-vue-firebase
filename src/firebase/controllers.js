import { db } from "./index.js";
import {
  doc,
  setDoc,
  collection,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";

export async function createInvoice({ invoice }) {
  const invoiceRef = doc(db, "invoices", invoice.id);
  return await setDoc(invoiceRef, invoice);
}

export async function updateInvoice({ invoice, id }) {
  const invoiceRef = doc(db, "invoices", id);
  return await updateDoc(invoiceRef, invoice);
}

export async function markInvoiceAsPaid({ id }) {
  const invoiceRef = doc(db, "invoices", id);
  return await updateDoc(invoiceRef, { status: "paid" });
}

export async function deleteInvoice({ id }) {
  const invoiceRef = doc(db, "invoices", id);
  return await deleteDoc(invoiceRef);
}

export const invCol = collection(db, "invoices");
