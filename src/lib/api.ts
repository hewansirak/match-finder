import { supabase } from '../lib/supabaseClient';
import type { Question, Option } from '../types/qa';

export async function getQuestions(): Promise<Question[]> {
  const { data: questions, error: questionsError } = await supabase
    .from('questions')
    .select('*');

  if (questionsError) throw questionsError;

  const { data: options, error: optionsError } = await supabase
    .from('options')
    .select('*');

  if (optionsError) throw optionsError;

  const grouped: Record<string, Option[]> = {};
  options.forEach(opt => {
    if (!grouped[opt.question_id]) grouped[opt.question_id] = [];
    grouped[opt.question_id].push(opt);
  });

  return questions.map(q => ({
    ...q,
    options: grouped[q.id] || []
  }));
}

export async function saveUserAnswers(userId: string, answers: { questionId: string, optionId: string }[]) {
  const rows = answers.map(a => ({
    user_id: userId,
    question_id: a.questionId,
    option_id: a.optionId
  }));

  const { data, error } = await supabase.from('answers').insert(rows);

  if (error) throw error;

  return data;
}
