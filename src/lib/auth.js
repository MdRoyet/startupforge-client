import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

// 1. Removed the quotes around process.env variables
const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db(process.env.MONGODB_DB_NAME);

export const auth = betterAuth({
  // 2. The database adapter goes at the root level
  database: mongodbAdapter(db, {
    client, // Passing the client enables database transactions
  }),

  // 3. Properly closed the emailAndPassword object
  emailAndPassword: {
    enabled: true,
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },
});
