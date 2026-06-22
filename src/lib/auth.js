import dns from "dns";
import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

// 1. DNS Firewall Bypass
if (typeof window === "undefined") {
  dns.setServers(["8.8.8.8", "8.8.4.4"]);
}

const uri = process.env.MONGODB_URI;
if (!uri) throw new Error("Missing MONGODB_URI");

// 2. The Pure Singleton Pattern (DO NOT CLOSE THE CLIENT)
let client;
if (process.env.NODE_ENV === "development") {
  if (!globalThis._mongoClient) {
    globalThis._mongoClient = new MongoClient(uri);
  }
  client = globalThis._mongoClient;
} else {
  client = new MongoClient(uri);
}

const db = client.db(process.env.MONGODB_DB_NAME);

export const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET || process.env.JWT_SECRET,
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",

  database: mongodbAdapter(db),

  emailAndPassword: {
    enabled: true,
  },

  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        defaultValue: "Collaborator",
      },
    },
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },
});
