// --- Helper Functions (copied from promises.ts) ---

type UserData = { name: string; age: number };
type UserPosts = { id: number; post: string };

const fetchUserData = (): Promise<UserData> => {
  console.log('[~2s] Fetching user data...');
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ name: 'Sagar', age: 28 });
    }, 2000);
  });
};

const fetchUserPosts = (username: string): Promise<UserPosts> => {
  console.log(`[~2s] Fetching posts for ${username}...`);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate a potential failure
      if (Math.random() > 0.1) {
        resolve({ id: 1, post: 'My first post!' });
      } else {
        reject(new Error('Failed to fetch user posts.'));
      }
    }, 2000);
  });
};

// --- Main Logic using async/await ---

const executeSequentialTasks = async () => {
  try {
    console.log(`[${new Date().toISOString()}] --- Async/Await Execution Started ---`);

    const userData = await fetchUserData();
    console.log(`[${new Date().toISOString()}] User data received:`, userData);

    const userPosts = await fetchUserPosts(userData.name);
    console.log(`[${new Date().toISOString()}] User posts received:`, userPosts);

    console.log(`[${new Date().toISOString()}] --- All data fetched successfully ---`);
  } catch (error) {
    console.error(`[${new Date().toISOString()}] !!! An error occurred:`, error);
  }
};

executeSequentialTasks();