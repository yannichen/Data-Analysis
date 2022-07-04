DROP TABLE IF EXISTS medical_situation CASCADE;
CREATE TABLE medical_situation
(
    term text,
    outcomes text,
    PRIMARY KEY (term)
);
DROP TABLE IF EXISTS event_info CASCADE;
CREATE TABLE  event_info
(
    patient_age integer,
    age_units character varying,
    sex character varying,
    caers_event_id serial,
    event_date date,
    PRIMARY KEY (caers_event_id),
    term text REFERENCES medical_situation (term),
    product text REFERENCES product(product_type),
    report_id text REFERENCES report_date(report_id)
);
DROP TABLE IF EXISTS product CASCADE;
CREATE TABLE product
(
    product_code text,
    product text,
    product_type text,
    product_description text,
    PRIMARY KEY (product)
);
DROP TABLE IF EXISTS report_date CASCADE;
CREATE TABLE  report_date
(
    report_id text,
    created_date date,
    PRIMARY KEY (report_id)
);
