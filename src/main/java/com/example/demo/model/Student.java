package com.example.demo.model;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Student {

    private String  date;
    private String  cause;
    private String  studentTitle;
    private String  studentFirstName;
    private String  studentLastName ;
    private String  studentID;
    private String  studentYear;
    private String  studyField;
    private String  advisor;
    private String  moo;
    private String  tumbol;
    private String  amphur;
    private String  province;
    private String  postalCode;
    private String  mobilePhone;
    private String  phone ;
    private List<Subject>  addSubjectList;
    private List<Subject>  dropSubjectList;
}
