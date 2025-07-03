import { supabase } from './supabaseClient';

interface BestMatchResult {
    match_id: number; 
    match_count: number;
    total_current_user_answers: number; 
}

/**
 * Find the best match for a given user.
 * Calls Supabase function.
 */
export async function findBestMatch(userId: number): Promise<BestMatchResult | null> {
    const { data: matchData, error: matchError } = await supabase
        .rpc('find_best_match', { current_user_id: userId });

    if (matchError) {
        console.error('Error finding match:', matchError);
        throw matchError;
    }

    const bestMatch: BestMatchResult | undefined = matchData?.[0];

    if (bestMatch && bestMatch.match_count >= 8) {
        return bestMatch; // Found!
    } else {
        return null; // No match found 
    }
}