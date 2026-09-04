package com.example.demo.repository;

import com.example.demo.model.Student;
import com.example.demo.model.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository


public class StudentRepository implements StudentRepositoryInterface {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public void createStudent(Student student) {
        String sql = "INSERT INTO student (date,cause, student_title, student_firstname, student_lastname, student_id, student_year, study_field, advisor, moo, tumbol, amphur, province, postal_code, mobile_phone, phone) " +
                "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        jdbcTemplate.update(sql,
                student.getDate(),
                student.getCause(),
                student.getStudentTitle(),
                student.getStudentFirstName(),
                student.getStudentLastName(),
                student.getStudentID(),
                student.getStudentYear(),
                student.getStudyField(),
                student.getAdvisor(),
                student.getMoo(),
                student.getTumbol(),
                student.getAmphur(),
                student.getProvince(),
                student.getPostalCode(),
                student.getMobilePhone(),
                student.getPhone());
        for(Subject s : student.getAddSubjectList()){
            String spl_1 =  "INSERT INTO registered_subject (student_id,subject_code,subject_name,subject_section,subject_date,subject_credit,subject_teacher,subject_teacher_check,type)" +
                    "VALUES (?,?,?,?,?,?,?,?,?)";
            jdbcTemplate.update(spl_1,student.getStudentID(),s.getSubjectCode(),s.getSubjectName(),s.getSubjectSection(),s.getSubjectDate(),s.getSubjectCredit(),s.getSubjectTeacher(),s.getSubjectTeacherCheck(),"Register");
        }
        for(Subject s : student.getDropSubjectList()){
            String spl_1 =  "INSERT INTO registered_subject student_id,subject_code,subject_name,subject_section,subject_date,subject_credit,subject_teacher,subject_teacher_check,type)" +
                    "VALUES (?,?,?,?,?,?,?,?,?)";
            jdbcTemplate.update(spl_1,student.getStudentID(),s.getSubjectCode(),s.getSubjectName(),s.getSubjectSection(),s.getSubjectDate(),s.getSubjectCredit(),s.getSubjectTeacher(),s.getSubjectTeacherCheck(),"Withdraw");
        }
    }

    @Override
    public List<Student> getStudentById(String studentId){
        String sql = "SELECT * FROM student WHERE student_id = ?";
        List<Student> st;
        st = jdbcTemplate.query(sql,new BeanPropertyRowMapper<>(Student.class),studentId);
        String sql_2 = "SELECT * FROM registered_subject WHERE student_id = ? AND Type = ?";
        for(Student s : st){
            List<Subject> subj = jdbcTemplate.query(sql_2, new BeanPropertyRowMapper<>(Subject.class), s.getStudentID(),"Register");
            s.setAddSubjectList(subj);
        }
        for(Student s : st){
            List<Subject> subj = jdbcTemplate.query(sql_2, new BeanPropertyRowMapper<>(Subject.class), s.getStudentID(),"Withdraw");
            s.setDropSubjectList(subj);
        }
        return st;
    }

    @Override
    public void updateStudentNameById(String studentId, String studentName){
        String sql = "UPDATE student SET student_firstname = ? WHERE student_id = ?";
        jdbcTemplate.update(sql,studentName,studentId);
    }
    @Override
    public void deleteStudentById(String studentId){
        String delStuByID = "DELETE FROM students WHERE student_id = ?";
        jdbcTemplate.update(delStuByID,studentId);
    }
}
