import { db, auth } from "./index.js";
import {
  doc,
  setDoc,
  collection,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { uid } from "uid";
import { getDemoInvoice } from "../utils.js";

const provider = new GoogleAuthProvider();

export async function signInRequest() {
  return await signInWithPopup(auth, provider);
}

export async function logoutRequest() {
  return await signOut(auth);
}

export async function createInvoice({ invoice }) {
  const invoiceRef = doc(db, "invoices", invoice.id);
  return await setDoc(invoiceRef, invoice); 
}

export async function createDemoInvoice({ userId }) {
  const invoiceRef = doc(db, "invoices", uid(6));
  return await setDoc(invoiceRef, getDemoInvoice(userId));
}

export async function updateInvoice({ invoice, id }) {
  const invoiceRef = doc(db, "invoices", id);
  return await updateDoc(invoiceRef, invoice);
}

export async function markInvoiceAsPaid({ id }) {
  const invoiceRef = doc(db, "invoices", id);
  return await updateDoc(invoiceRef, { status: "paid" });
}

export async function markInvoiceAsQQQY({ id }) {
  const invoiceRef = doc(db, "invoices", id);
  return await updateDoc(invoiceRef, { status: "QQQY" });
}

export async function markInvoiceAsIWMY({ id }) {
  const invoiceRef = doc(db, "invoices", id);
  return await updateDoc(invoiceRef, { status: "IWMY" });
}

export async function markInvoiceAsJEPY({ id }) {
  const invoiceRef = doc(db, "invoices", id);
  return await updateDoc(invoiceRef, { status: "JEPY" });
}
export async function deleteInvoice({ id }) {
  const invoiceRef = doc(db, "invoices", id);
  return await deleteDoc(invoiceRef);
}

export const invCol = collection(db, "invoices");
