import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://dviqrjwnuexlgsmvkxoa.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR2aXFyandudWV4bGdzbXZreG9hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE0NTUwMDAsImV4cCI6MjA5NzAzMTAwMH0.K9A9uCXWMLpa1xs4Hj_zJiuoxepd8vuZPgrkQeR2984";

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
);