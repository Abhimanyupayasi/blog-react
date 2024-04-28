import conf from '../conf/conf.js';
import { Client, Account, ID } from "appwrite";


export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint("https://cloud.appwrite.io/v1")
      .setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(ID.unique(), email, password, name);
      if (userAccount) {
        // call another method
        return { message: "Account created successfully", user: userAccount };
      } else {
        return { error: "Failed to create account" }; // More specific error message could be helpful
      }
    } catch (error) {
      console.error("Error creating account:", error);
      throw error; // Re-throw for handling at a higher level
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailSession(email, password);
    } catch (error) {
      console.error("Error logging in:", error);
      throw error; // Re-throw for handling at a higher level
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.error("Error getting current user:", error);
      // Consider returning null or a default user object here
      return null; // Example: return null;
    }
  }

  async logout() {
    try {
      await this.account.deleteSessions();
      return { message: "Logged out successfully" };
    } catch (error) {
      console.error("Error logging out:", error);
      return { error: "Failed to log out" }; // Example: return { error: "Failed to log out" };
    }
  }
}

const authService = new AuthService();

export default authService;
