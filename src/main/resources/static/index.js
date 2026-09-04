var courseId;
let id = 0;
function createCourseField(containerType, title, className) {
  const courseContainer = document.getElementById(containerType);
  courseId = courseContainer.childElementCount;

  if (courseId > 10) {
    alert("สามารถใส่ได้ 10 วิชาเท่านั้น");
    return;
  }

  const courseField = document.createElement("div");
  courseField.classList.add(className);
  courseField.innerHTML = `
        <div class="card p-3 rounded my-4">
          <h4 class="my-3">${title}</h4>
          <div class="row">
            <div class="col-md-4">
              <div class="form-group">
                <label for="subjectCode">รหัสวิชา</label>
                <input type="text" id ="${className}subjectCode${id}" name="subjectCode" class="form-control" required />
              </div>
            </div>
            <div class="col-md-4">
              <div class="form-group">
                <label for="subjectName">ชื่อวิชา</label>
                <input type="text" id="${className}subjectName${id}" name="subjectName" class="form-control" required />
              </div>
            </div>
            <div class="col-md-4">
              <div class="form-group">
                <label for="subjectSection">เซค</label>
                <input type="text" id="${className}subjectSection${id}" name="subjectSection" class="form-control" required />
              </div>
            </div>
            <div class="col-md-4">
              <div class="form-group">
                <label for="subjectDate">วันและเวลาที่เรียน</label>
                <input type="text" id="${className}subjectDate${id}" name="subjectDate" class="form-control" required />
              </div>
            </div>
            <div class="col-md-4">
              <div class="form-group">
                <label for="subjectCredit">เครดิต</label>
                <input type="text" id="${className}subjectCredit${id}" name="subjectCredit" class="form-control" required />
              </div>
            </div>
            <div class="col-md-4">
              <div class="form-group">
                <label for="subjectTeacher">อาจารย์ผู้สอน</label>
                <input type="text" id="${className}subjectTeacher${id}" name="subjectTeacher" class="form-control" required />
              </div>
            </div>
            <div class="col-md-4">
              <div class="form-check">
                <label for="subjectTeacherCheck" class="form-check-label">อาจารย์อนุญาต</label>
                <input type="checkbox" id="${className}subjectTeacherCheck${id}" name="subjectTeacherCheck" class="form-check-input" value="false" />
              </div>
            </div>
          </div>
          <button class="btn btn-danger remove-course mt-3" type="button" id="remove-${className}-${id}">ลบวิชา</button>
        </div>
      `;


  courseContainer.appendChild(courseField);
  const removeButton = document.getElementById(`remove-${className}-${id}`);
  removeButton.addEventListener("click", function () {
    courseContainer.removeChild(courseField);
  });

  id++;
}
function addCourseField() {
  createCourseField("course-fields-container", "การเพิ่มรายวิชา", "Add");
}

function withDrawCourseField() {
  createCourseField("course-fields-container-withdraw", "การถอนรายวิชา", "Withdraw");
}
var jsData;


async function collectData() {

  const data = {
    cause: document.getElementById("cause").value,
    date: document.getElementById("date").value,
    studentTitle: document.getElementById("studentTitle").value,
    studentFirstName: document.getElementById("studentFirstName").value,
    studentLastName: document.getElementById("studentLastName").value,
    studentID: document.getElementById("studentID").value,
    studentYear: document.getElementById("studentYear").value,
    studyField: document.getElementById("studyField").value,
    advisor: document.getElementById("advisor").value,
    moo: document.getElementById("moo").value,
    tumbol: document.getElementById("tumbol").value,
    amphur: document.getElementById("amphur").value,
    province: document.getElementById("province").value,
    postalCode: document.getElementById("postalCode").value,
    mobilePhone: document.getElementById("mobilePhone").value,
    phone: document.getElementById("phone").value,
    addSubjectList: [

    ],
    dropSubjectList: [

    ]
  };
  let addcount = document.getElementById("course-fields-container").childElementCount;
  let wdcount = document.getElementById("course-fields-container-withdraw").childElementCount;
  console.log(addcount);
  console.log(wdcount);

  for (let i = 0; i < id; i++) {
    let checkElm = document.getElementById(`AddsubjectCode${i}`);
    if(!checkElm) continue;
    
      let subjectCode = document.getElementById(`AddsubjectCode${i}`).value;
      console.log(subjectCode);
      let subjectName = document.getElementById(`AddsubjectName${i}`).value;
      let subjectSection = document.getElementById(`AddsubjectSection${i}`).value;
      let subjectDate = document.getElementById(`AddsubjectDate${i}`).value;
      let subjectCredit = document.getElementById(`AddsubjectCredit${i}`).value;
      let subjectTeacher = document.getElementById(`AddsubjectTeacher${i}`).value;
      let subjectTeacherCheck = document.getElementById(`AddsubjectTeacherCheck${i}`).checked;
  
      let subjectAdd = {
        subjectCode: subjectCode,
        subjectName: subjectName,
        subjectSection: subjectSection,
        subjectDate: subjectDate,
        subjectCredit: subjectCredit,
        subjectTeacher: subjectTeacher,
        subjectTeacherCheck: subjectTeacherCheck
      };
      data.addSubjectList.push(subjectAdd);
  
    
 

  }
  for (let i = 0; i < id; i++) {
    let checkElm = document.getElementById(`WithdrawsubjectCode${i}`);
    if(!checkElm) continue;
   
      let subjectCode = document.getElementById(`WithdrawsubjectCode${i}`).value;
    let subjectName = document.getElementById(`WithdrawsubjectName${i}`).value;
    let subjectSection = document.getElementById(`WithdrawsubjectSection${i}`).value;
    let subjectDate = document.getElementById(`WithdrawsubjectDate${i}`).value;
    let subjectCredit = document.getElementById(`WithdrawsubjectCredit${i}`).value;
    let subjectTeacher = document.getElementById(`WithdrawsubjectTeacher${i}`).value;
    let subjectTeacherCheck = document.getElementById(`WithdrawsubjectTeacherCheck${i}`).checked;

    const subjectWithdraw = {
      subjectCode: subjectCode,
      subjectName: subjectName,
      subjectSection: subjectSection,
      subjectDate: subjectDate,
      subjectCredit: subjectCredit,
      subjectTeacher: subjectTeacher,
      subjectTeacherCheck: subjectTeacherCheck
    };
    data.dropSubjectList.push(subjectWithdraw);

    
  }

  jsData = JSON.stringify(data);
  console.log(jsData);
  //console.log(data);

  await fetch('/api/reg/createStudent', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: jsData

  })
    .then(response => {
      if (response.ok) {
        // Request was successful
        window.alert("Record Success");
        return response.json();

      } else {
        // Handle errors
        window.alert("Record Fail");
        return null;
      }
    })
    .catch(error => {
      console.error(error);
    });
}





