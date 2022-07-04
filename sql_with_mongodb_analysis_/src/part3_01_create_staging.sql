DROP TABLE IF EXISTS staging_caers_events;
CREATE TABLE staging_caers_events(
  -- artificial primary key
  caers_event_id serial primary key,
-- note that there are dup report_id's
  report_id varchar(255),
  created_date date,
  event_date date,
  product_type text,
  product text,
  product_code text,
  description text,
  patient_age integer,
  age_units varchar(255),
  sex varchar(255),
  terms text,
  outcomes text
);
