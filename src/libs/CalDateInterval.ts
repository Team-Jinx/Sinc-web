const CalDateInterval = (timestamp: number): number => {
  const today = new Date();
  const createdAt = new Date(timestamp);
  const diff = Math.ceil(
    (today.getTime() - createdAt.getTime()) / (1000 * 3600 * 24),
  );
  return diff;
};

export default CalDateInterval;
