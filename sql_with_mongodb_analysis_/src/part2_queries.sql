--1. Show the possible values of the year column in the country_stats table sorted by most recent year first.
SELECT year FROM country_stats GROUP BY year ORDER BY year DESC;

--2.Show the names of the first 5 countries in the database when sorted in alphabetical order by name.
SELECT name FROM countries ORDER BY name limit 5;

--3.Adjust the previous query to show both the country name and the gdp from 2018, but this time show the top 5 countries by gdp.
WITH info AS (
    SELECT country_id, gdp
    FROM country_stats
    WHERE year = 2018
    ORDER BY gdp DESC limit 5
)
SELECT name, gdp FROM countries, info where countries.country_id=info.country_id order by info.gdp DESC;

--4 How many countries are associated with each region id?
SELECT region_id, count(*) FROM countries GROUP BY region_id ORDER BY count(*) DESC;

--5. What is the average area of countries in each region id?
SELECT region_id, round(avg(area),0) FROM countries GROUP BY region_id ORDER BY avg(area);

--6. Use the same query as above, but only show the groups with an average country area less than 1000
SELECT region_id, round(avg(area),0) FROM countries GROUP BY region_id HAVING avg(area)< 1000 ORDER BY avg(area);

--7 Create a report displaying the name and population of every continent in the database from the year 2018 in millions.
WITH report as (
    WITH continent AS (
        WITH region__id AS (
            WITH id AS (
                SELECT country_id, population
                FROM country_stats
                WHERE year = 2018)
            SELECT region_id, population
            FROM id,countries
            WHERE id.country_id = countries.country_id
        )
        SELECT continent_id, population
        FROM region__id,regions
        WHERE regions.region_id = region__id.region_id
    )
    SELECT continent_id, sum(population) as tot_pop
    FROM continent
    GROUP BY continent_id
)
SELECT name, round(tot_pop/10000,2)  FROM report, continents where report.continent_id=continents.continent_id ORDER BY tot_pop DESC;

--8 List the names of all of the countries that do not have a language.
WITH combine AS (
    WITH language AS (
        SELECT country_id FROM country_languages GROUP BY country_id
    )
    SELECT name, language.country_id FROM countries FULL OUTER JOIN language on language.country_id = countries.country_id
)
SELECT name FROM combine WHERE country_id IS NULL;

--9 Show the country name and number of associated languages of the top 10 countries with most languages
WITH language AS (
    SELECT country_id, count(*) AS lang_count FROM country_languages GROUP BY country_id
)
SELECT name, lang_count FROM countries, language WHERE countries.country_id=language.country_id ORDER BY lang_count DESC, name LIMIT 10;

--10 Repeat your previous query, but display a comma separated list of spoken languages rather than a count
WITH result AS (
    WITH names AS (
        WITH id AS (
            WITH lang AS(
                SELECT country_id, count(*) as lang_count FROM country_languages GROUP BY country_id ORDER BY lang_count DESC, country_id LIMIT 10
            )
            SELECT country_languages.country_id, language_id
            FROM lang,country_languages WHERE country_languages.country_id=lang.country_id
        )
        SELECT country_id, language
        FROM id, languages WHERE id.language_id = languages.language_id
    )
    SELECT country_id, string_agg(language, ',') AS string_agg  FROM names GROUP BY country_id
)
SELECT name, string_agg FROM countries,result WHERE countries.country_id=result.country_id ;


--11 What's the average number of languages in every country in a region in the dataset?

WITH result AS (
    WITH region_num AS (
        WITH country_num AS(
            SELECT country_id, count(*) AS lang_count FROM country_languages GROUP BY country_id
        )
        SELECT region_id, lang_count
        FROM countries LEFT OUTER JOIN country_num on country_num.country_id = countries.country_id
    )
    SELECT region_id, round(avg(lang_count), 1) AS avg_lang_count_per_country FROM region_num
    GROUP BY region_id HAVING avg(lang_count) is not null
)
SELECT name, avg_lang_count_per_country FROM regions, result
WHERE regions.region_id=result.region_id
ORDER BY avg_lang_count_per_country desc;

--12 Show the country name and its "national day" for the country with the most recent national day and the country with the oldest national day.
SELECT name, national_day FROM countries WHERE national_day= (SELECT max(national_day) FROM countries)
UNION SELECT name, national_day FROM countries WHERE national_day= (SELECT min(national_day) FROM countries)
