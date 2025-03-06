import { Injectable } from '@angular/core';
import { SupabaseService } from '../services/supabase.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private supabase: SupabaseService) { }

  // ✅ Sign in with phone and password
  async login(credentials: { phone: string; password: string }) {
    const { data, error } = await this.supabase.client.auth.signInWithPassword({
      email: credentials.phone, 
      password: credentials.password,
    });

    if (error) throw error;
    return data.user.id;
  }

  // ✅ Register a new user
  async register(userData: { name: string; phone: string; password: string }) {
    const { data, error } = await this.supabase.client.auth.signUp({
      email: userData.phone + '@example.com',  // Workaround for Supabase requiring email
      password: userData.password,
      options: {
        data: { name: userData.name, phone: userData.phone },
      },
    });

    if (error) throw error;
    return data;
  }

  // ✅ Logout the user
  async logout() {
    await this.supabase.client.auth.signOut();
  }

  // ✅ Check if user is authenticated
  async isAuthenticated(): Promise<boolean> {
    const { data } = await this.supabase.client.auth.getSession();
    return !!data.session;
  }

  // ✅ Get current user
  async getUser() {
    const { data, error } = await this.supabase.client.auth.getUser();
    if (error) throw error;
    return data.user;
  }
}
