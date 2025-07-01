import { supabase } from './supabaseClient';

export async function addUser(fullName: string, email: string, age: number) {
  const { data, error } = await supabase
    .from('users')
    .insert([{ full_name: fullName, email, age }]);

  if (error) throw error;
  return data;
}

export async function getUsers() {
  const { data, error } = await supabase.from('users').select('*');
  if (error) throw error;
  return data;
}

export async function updateUser(id: string, updates: Partial<{ full_name: string; email: string; age: number }>) {
  const { data, error } = await supabase
    .from('users')
    .update(updates)
    .eq('id', id);

  if (error) throw error;
  return data;
}

export async function deleteUser(id: string) {
  const { data, error } = await supabase
    .from('users')
    .delete()
    .eq('id', id);

  if (error) throw error;
  return data;
}
