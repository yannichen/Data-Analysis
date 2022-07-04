DROP TABLE IF EXISTS staging_caers_events;
CREATE TABLE staging_caers_events(

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

\copy staging_caers_events(report_id, created_date, event_date,product_type, product, product_code,description, patient_age, age_units,sex, terms, outcomes) from 'yannichen-homework07/CAERS_ASCII_11_14_to_12_17.csv' WITH csv HEADER encoding 'LATIN1';

--1.
select report_id, upper(product) from staging_caers_events where patient_age = 75 order by report_id;

--2.
explain analyze select report_id, upper(product) from staging_caers_events where patient_age = 75 order by report_id;
/*
                                                         QUERY PLAN
----------------------------------------------------------------------------------------------------------------------------
 Sort  (cost=1384.58..1384.64 rows=26 width=548) (actual time=7.501..7.539 rows=561 loops=1)
   Sort Key: report_id
   Sort Method: quicksort  Memory: 76kB
   ->  Seq Scan on staging_caers_events  (cost=0.00..1383.97 rows=26 width=548) (actual time=0.066..7.270 rows=561 loops=1)
         Filter: (patient_age = 75)
         Rows Removed by Filter: 49879
 Planning Time: 0.081 ms
 Execution Time: 7.613 ms
(8 rows)
 */

--3. 
--the index name is column_index
create index column_index on staging_caers_events(patient_age);
explain analyze select report_id, upper(product)  from staging_caers_events where patient_age = 75 order by report_id;
/*
                                                             QUERY PLAN
------------------------------------------------------------------------------------------------------------------------------------
 Sort  (cost=653.95..654.58 rows=252 width=548) (actual time=0.653..0.693 rows=561 loops=1)
   Sort Key: report_id
   Sort Method: quicksort  Memory: 76kB
   ->  Bitmap Heap Scan on staging_caers_events  (cost=6.24..643.90 rows=252 width=548) (actual time=0.093..0.449 rows=561 loops=1)
         Recheck Cond: (patient_age = 75)
         Heap Blocks: exact=226
         ->  Bitmap Index Scan on column_index  (cost=0.00..6.18 rows=252 width=0) (actual time=0.064..0.064 rows=561 loops=1)
               Index Cond: (patient_age = 75)
 Planning Time: 2.126 ms
 Execution Time: 1.830 ms
(10 rows)
*/

--do a sequential scan rather than use the created index:
explain analyze select report_id from staging_caers_events where patient_age>70;

/*
                                                             QUERY PLAN
------------------------------------------------------------------------------------------------------------------------------------
 Bitmap Heap Scan on staging_caers_events  (cost=194.59..1722.75 rows=16813 width=516) (actual time=0.530..2.300 rows=6999 loops=1)
   Recheck Cond: (patient_age > 70)
   Heap Blocks: exact=1155
   ->  Bitmap Index Scan on column_index  (cost=0.00..190.39 rows=16813 width=0) (actual time=0.383..0.383 rows=6999 loops=1)
         Index Cond: (patient_age > 70)
 Planning Time: 0.072 ms
 Execution Time: 2.748 ms
(7 rows)
*/