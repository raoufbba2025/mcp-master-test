import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://drknwxtuafunwczzhzan.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRya253eHR1YWZ1bndjenpoemFuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI3MjE3NzIsImV4cCI6MjA4ODI5Nzc3Mn0.cxvw40WuCsfCludGMAnj6QycRYp8Vo8jWGJNU5oCaOw'

export const supabase = createClient(supabaseUrl, supabaseKey)