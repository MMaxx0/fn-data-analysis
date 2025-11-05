-- 1: Percentage of Incidents between 2017-01-01 and 2020-12-31 grouped by category
select
  category,
  ROUND(
    100.0 * COUNT(*) / (
      select
        COUNT(*)
      from
        incidents
      where
        date between '2017-01-01' and '2020-12-31'
    ),
    2
  ) as percent_in_range
from
  incidents
where
  date between '2017-01-01' and '2020-12-31'
group by
  category
order by
  percent_in_range desc;

-- 2: Top 3 transport methods used by "Intelligence" detection
select
  transport_mode,
  count(*)
from
  details
where
  detection = 'Intelligence'
  and transport_mode != ''
group by
  transport_mode
order by
  count desc
limit
  3;

-- 3: Detection methods with the highest average value of arrests
select
  detection,
  avg(num_ppl_arrested) arrests_avg
from
  details
  join outcomes on details.report_id = outcomes.report_id
group by
  detection
order by
  arrests_avg desc;

-- 4: Categories with the largest prison sentences
select
  incidents.category,
  SUM(
    case
      when prison_time_unit = 'Months' then prison_time * 30
      when prison_time_unit = 'Years' then prison_time * 365
      else prison_time
    end
  ) as prison_days
from
  outcomes
  join incidents on outcomes.report_id = incidents.report_id
where
  prison_time > 0
group by
  category
order by
  prison_days desc;

-- 5: Annual time series of total fines imposed for each year
select
  sum(fine) total_fines,
  extract(
    year
    from
      incidents.date
  ) as year
from
  incidents
  join outcomes on incidents.report_id = outcomes.report_id
group by
  year
order by
  year asc;