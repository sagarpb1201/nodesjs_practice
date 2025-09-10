/**
 * Simulates a non-blocking I/O task using setTimeout.
 * This function returns immediately, allowing the main thread to continue.
 * The provided callback is executed later when the timer completes.
 * @param durationMilliseconds The number of milliseconds to wait.
 * @param callback The function to execute after the wait.
 */
const nonBlockingTask = (
  durationMilliseconds: number,
  callback: () => void,
) => {
  setTimeout(() => {
    callback();
  }, durationMilliseconds);
};

console.log('--- Non-Blocking I/O Simulation ---');

console.log(`[${new Date().toISOString()}] Dispatching User 1's request...`);
nonBlockingTask(3000, () => {
  console.log(`[${new Date().toISOString()}] >>> User 1's request processed.`);
});

console.log(`[${new Date().toISOString()}] Dispatching User 2's request...`);
nonBlockingTask(3000, () => {
  console.log(`[${new Date().toISOString()}] >>> User 2's request processed.`);
});

console.log(
  `[${new Date().toISOString()}] All requests dispatched. Main thread is free.`,
);
console.log('--- Simulation will complete in approximately 3 seconds ---');

