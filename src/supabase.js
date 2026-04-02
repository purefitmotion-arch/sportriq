import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  'https://xnrcognyyudbubtpfrga.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhucmNvZ255eXVkYnVidHBmcmdhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ4OTg3MTksImV4cCI6MjA5MDQ3NDcxOX0.GGL9fnO0zbGJ6j0_If4sJmr6lfIktDc8QTClrgNbz0Y',
  { auth: { autoRefreshToken: true, persistSession: true, detectSessionInUrl: true } }
)