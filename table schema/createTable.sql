CREATE TABLE IF NOT EXISTS student(
    student_id varchar(10) primary key ,
    student_title varchar(50) not null,
    student_firstname text not null,
    student_lastname text not null,
    student_year int4 not null,
    study_field text not null,
    advisor text not null,
    moo text not null,
    tumbol text not null,
    amphur text not null,
    province text not null,
    postal_code varchar(5) not null,
    phone varchar(10) not null,
    mobile_phone varchar(10) not null,
    "date" text not null,
    cause text not null
);

CREATE TABLE IF NOT EXISTS registered_subject(
    student_id varchar(10) not null references student(student_id) on delete cascade on update cascade,
    subject_code text not null,
    subject_name text not null,
    subject_section text not null,
    subject_date text not null,
    subject_credit text not null,
    subject_teacher text not null,
    subject_teacher_check boolean not null,
    type text not null,
    primary key (student_id , subject_code)
)
