import { format } from "date-fns";

export async function asyncHandler(func, params) {
  try {
    const result = await func(params);
    return [result, null];
  } catch (err) {
    return [null, err];
  }
}

export function formatFirebaseRecord(record) {
  return {
    id: record.id,
    ...record.data(),
  };
}

export function formatFirebaseError(err) {
  return err.message;
}

export function formatDate({ curInSeconds, allowedInDays }) {
  if (!curInSeconds || !allowedInDays) return {};
  return {
    currentDate: format(new Date(curInSeconds * 1000), "yyyy/MM/dd"),
    dueDate: format(
      new Date((curInSeconds + allowedInDays * 24 * 60 * 60) * 1000),
      "yyyy/MM/dd"
    ),
  };
}

export function isNewUser(user) {
  return user.metadata.creationTime === user.metadata.lastSignInTime;
}

export function getDemoInvoice(userId) {
  return {
    from: {
      streetAddress: "Demo Street 1",
      city: "Demo City",
      postcode: "33333",
      country: "Demo country",
    },
    to: {
      clientName: "Demo name",
      clientEmail: "Demo email",
      streetAddress: "Demo Street 2",
      city: "Demo City 2",
      postcode: "3333",
      country: "Demo country 2",
    },
    date: new Date(),
    user: userId,
    status: "pending",
    allowedPeriod: 1, //In days
    items: [
      {
        name: "Demo item 1",
        quantity: 2,
        price: 5,
        id: Date.now(),
      },
      {
        name: "Demo item 2",
        quantity: 3,
        price: 3,
        id: Date.now(),
      },
    ],

    total: 19,
  };
}
