import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://nmxiuudlbhlnqbggtkwy.supabase.co"; // project URL
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5teGl1dWRsYmhsbnFiZ2d0a3d5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc0MjQ2NzYsImV4cCI6MjA4MzAwMDY3Nn0.lwfDqttguAjCFUTtN0c2OKWCqkO_lkEOmQdxKDklxdQ"; // anon/public key

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
