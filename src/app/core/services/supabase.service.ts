import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      'https://mtlejqcwqucclcanglkh.supabase.co', // Replace with your Supabase URL
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im10bGVqcWN3cXVjY2xjYW5nbGtoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM3ODUyMTQsImV4cCI6MjA0OTM2MTIxNH0.s12g0jqYYwi9UrMIpqp4yirR0iI00xE9XKmzO7OMrtY'  // Replace with your Supabase API key
    );
  }

  get client() {
    return this.supabase;
  }
}
