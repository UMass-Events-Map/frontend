import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://gdacboczcpnnnqfxkjsj.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdkYWNib2N6Y3Bubm5xZnhranNqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk2MjQwMzIsImV4cCI6MjA0NTIwMDAzMn0.z9pvzajPfB_qPYmFMD-U-_hcdfarXF3Kq7WHG3OPz5c'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});