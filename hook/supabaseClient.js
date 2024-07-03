import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://oumshxpusclfympuhbzi.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im91bXNoeHB1c2NsZnltcHVoYnppIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDU5NDk3MTksImV4cCI6MjAyMTUyNTcxOX0.ZrmLGyR1AYMfEdEq-F75C3B23gGwpfGIN8NeC_JKsJE';

export const supabase = createClient(supabaseUrl, supabaseKey);