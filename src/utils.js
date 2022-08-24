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
