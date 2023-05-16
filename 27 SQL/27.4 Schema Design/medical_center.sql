DROP TABLE IF EXISTS visits;
DROP TABLE IF EXISTS patients;
DROP TABLE IF EXISTS doctors;
DROP TABLE IF EXISTS diseases;

DROP DATABASE IF EXISTS medical_center;

CREATE DATABASE medical_center;
\c medical_center


CREATE TABLE doctors (
  doctor_id SERIAL PRIMARY KEY,
  doctor_name VARCHAR(50),
  specialization VARCHAR(50)
);

CREATE TABLE patients (
  patient_id SERIAL PRIMARY KEY,
  patient_name VARCHAR(50),
  date_of_birth DATE,
  gender VARCHAR(10)
);

CREATE TABLE diseases (
  disease_id SERIAL PRIMARY KEY,
  disease_name VARCHAR(50)
);

CREATE TABLE visits (
  visit_id SERIAL PRIMARY KEY,
  doctor_id INT,
  patient_id INT,
  disease_id INT,
  visit_date DATE,
  FOREIGN KEY (doctor_id) REFERENCES doctors(doctor_id),
  FOREIGN KEY (patient_id) REFERENCES patients(patient_id),
  FOREIGN KEY (disease_id) REFERENCES diseases(disease_id)
);