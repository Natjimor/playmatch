import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://kbkljkxypthbtafchvxz.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtia2xqa3h5cHRoYnRhZmNodnh6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDczMjgxMTUsImV4cCI6MjA2MjkwNDExNX0.9wlxJcd8XEXN7t2bL5xbmtdG2Eyy3O9qvDdZ4Lt9aSk';

export const supabase = createClient(supabaseUrl, supabaseKey);
