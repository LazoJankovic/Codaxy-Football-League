import { createClient } from '@supabase/supabase-js';

// const supabaseUrl = REACT_APP_SUPABASE_URL;
// const supabaseAnonKey = REACT_APP_SUPABASE_ANON_KEY;
const supabaseUrl = 'https://cnhugsvccvcwxgsjyzpc.supabase.co';
const supabaseAnonKey =
   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNuaHVnc3ZjY3Zjd3hnc2p5enBjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTc3MTgxNzEsImV4cCI6MTk3MzI5NDE3MX0.gMiprhFSUwoZXim-9Tc1RmvU3k_8VL1CzAjyHLedJOw';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
