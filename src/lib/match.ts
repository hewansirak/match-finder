import { supabase } from './supabaseClient';

/**
 * Find the best match for a given user.
 * Checks user's answers + calls Supabase function.
 */
export async function findBestMatch(userId: number) {
  const { data: answers, error: answersError } = await supabase
    .from('answers')
    .select('question_id, option_id')
    .eq('user_id', userId);

  if (answersError) {
    console.error('Error fetching user answers:', answersError);
    throw answersError;
  }

  console.log('Current user answers:', answers);

  // Call the Postgres function to find the best match.
  const { data: matchData, error: matchError } = await supabase
    .rpc('find_best_match', { current_user_id: userId });

  if (matchError) {
    console.error('Error finding match:', matchError);
    throw matchError;
  }

  const bestMatch = matchData?.[0];

  if (bestMatch && bestMatch.match_count >= 6) {
    return bestMatch; // Found!
  } else {
    return null; // No match found
  }
}
