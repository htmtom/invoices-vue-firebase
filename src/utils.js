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
