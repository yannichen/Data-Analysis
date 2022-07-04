-- 1. this query tries to determine whether or not report id is unique
SELECT report_id, count(*) FROM staging_caers_events  GROUP BY report_id ORDER BY count(*) desc limit 10;

--report_id    | count
-------------------+-------
--179852          |    44
--174049          |    39
--210074          |    35
--190041          |    35
--190166          |    30
--198546          |    28
--2017-CFS-002608 |    27
--192894          |    27
--194925          |    25
--2017-CFS-000086 |    25
--(10 rows)

-- 2. this query tries to determine whether or not report id & creation date together is unique
SELECT report_id, created_date, count(*) FROM staging_caers_events GROUP BY report_id, created_date ORDER BY count(*) DESC limit 5;
--report_id | created_date | count
-------------+--------------+-------
--179852    | 2014-10-07   |    44
--174049    | 2014-02-19   |    39
--190041    | 2015-09-28   |    35
--210074    | 2017-04-10   |    35
--190166    | 2015-10-01   |    30
--(5 rows)

-- 3. this query tries to determine whether or not product code and report_id together is unique
SELECT report_id, product_code, count(*) FROM staging_caers_events GROUP BY report_id, product_code ORDER BY count(*) DESC limit 5;
--report_id | product_code | count
-------------+--------------+-------
--179852    | 54           |    44
--174049    | 54           |    39
--190041    | 54           |    34
--190166    | 54           |    30
--210074    | 54           |    29
--(5 rows)

-- 4. this query tries to determine whether or not product code, product_type, product and report_id all together is unique
SELECT report_id, product_code, product_type,product, count(*) FROM staging_caers_events
GROUP BY report_id, product, product_code,product_type ORDER BY count(*) DESC limit 5;
--report_id | product_code | product_type |                             product                             | count
-------------+--------------+--------------+-----------------------------------------------------------------+-------
--188661    | 54           | SUSPECT      | SPARK ENERGY DRINK MANGO STRAWBERRY 14 CT                       |     1
--187241    | 53           | SUSPECT      | EXEMPTION 4                                                     |     1
--182532    | 54           | SUSPECT      | BIO CLEANSE                                                     |     1
--178246    | 7            | SUSPECT      | FRITO LAY DORITOS, COOL RANCH                                   |     1
--178029    | 54           | SUSPECT      | ONE A DAY WOMEN'S (MULTIVITAMINS + MINERALS) FILM COATED TABLET |     1
--(5 rows)
