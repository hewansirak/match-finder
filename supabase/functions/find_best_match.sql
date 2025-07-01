create or replace function find_best_match(current_user_id int)
returns table (
  user_id int,
  match_count int
)
as $$
  select
    a2.user_id,
    count(*) as match_count
  from
    answers a1
    join answers a2
      on a1.question_id = a2.question_id
     and a1.option_id = a2.option_id
  where
    a1.user_id = current_user_id
    and a2.user_id != current_user_id
  group by
    a2.user_id
  order by
    match_count desc
  limit 1;
$$ language sql;
