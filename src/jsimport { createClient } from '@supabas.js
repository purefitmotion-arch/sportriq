jsimport { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://xnrcognyudbubtpfrga.supabase.co'
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhucmNvZ255eXVkYnVidHBmcmdhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ4OTg3MTksImV4cCI6MjA5MDQ3NDcxOX0.GGL9fnO0zbGJ6j0_If4sJmr6lfIktDc8QTClrgNbz0Y'

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)
