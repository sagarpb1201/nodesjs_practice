/**
 * Simulates a CPU-intensive task that blocks the main thread.
 * @param durationMilliseconds The number of milliseconds to block for.
 */
const blockingTask = (durationMilliseconds: number) => {
  const startTime = Date.now();
  while (Date.now() - startTime < durationMilliseconds) {
    // This loop does nothing but consume CPU cycles, blocking the event loop.
  }
};

console.log('--- Blocking I/O Simulation ---');

console.log(`[${new Date().toISOString()}] User 1's request received. Processing...`);
blockingTask(3000); // Simulate a 3-second task
console.log(`[${new Date().toISOString()}] User 1's request processed.`);

console.log('---------------------------------');

console.log(`[${new Date().toISOString()}] User 2's request received. Processing...`);
blockingTask(3000); // Simulate another 3-second task
console.log(`[${new Date().toISOString()}] User 2's request processed.`);

console.log('--- Simulation Complete ---');