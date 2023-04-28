const btn_add = document.querySelector(".btn-add");
const btn_drop = document.querySelector(".btn-drop");
const add = document.querySelector(".add");
const drop = document.querySelector(".drop");
const message = document.querySelector(".message");
const list = document.querySelector(".list");
const table = document.querySelector(".addtable");
const alreadytable = document.querySelector(".alreadytable");
const number = document.querySelector(".number");
const title = table.innerHTML;
const alreadytitle = alreadytable.innerHTML;

let lesson = [];
const select = document.querySelector("#select");
let courseList = [];

// 取得課程資料並放入select裡面
fetch("http://localhost:8080/allCourse")
   .then(function (response) {
      return response.json();
   })
   .then(function (data) {
      lesson = data;
      lesson.forEach((i) => {
         select.options.add(
            new Option(
               "課程名稱：" + i.courseName + "　課程代碼：" + i.courseCode,
               i.courseCode
            )
         );
      });
   })
   .catch((err) => console.log(err));

//  加入課程至加退選清單
btn_add.addEventListener("click", function () {
   if (select.value === "defualt") {
      message.innerHTML = "請選擇課程";
      return;
   }
   let course;
   lesson.forEach((i) => {
      if (i.courseCode === select.value) {
         course = i;
         return;
      }
   });

   if (courseList.length > 0 && courseList.indexOf(course.courseCode) >= 0) {
      message.innerHTML = `${course.courseCode}已在清單中`;
      return;
   }
   //  console.log(course.courseCode);
   table.innerHTML +=
      `<tr class=${course.courseCode}><td>` +
      course.courseCode +
      "</td><td>" +
      course.courseName +
      "</td><td>" +
      course.credit +
      "</td><td>" +
      course.week +
      "</td><td>" +
      course.startTime +
      "</td><td>" +
      course.endTime +
      "</td><td>" +
      `<input type="button" name=${course.courseCode} value="移除" onclick="deleteRow(this)">` +
      "</td></tr>";

   courseList.push(course.courseCode);
   console.log(courseList);
});

function deleteRow(r) {
   var i = r.parentNode.parentNode.rowIndex;
   console.log(r.name);
   courseList.remove(r.name);
   document.getElementById("table").deleteRow(i);
}

// 加選
add.addEventListener("click", () => {
   fetch("http://localhost:8080/pick_And_Drop_Course", {
      method: "POST",
      headers: {
         // 告訴後端這是JSON
         "Content-Type": "application/json",
      },
      // body是想傳送的資料
      body: JSON.stringify({
         "學號": number.value,
         "加選或退選": "加選",
         "課程代碼": courseList,
      }),
      //    先包資料再轉乘JSON
      //    body:JSON.stringify(testStudent);
   })
      .then(function (response) {
         return response.json();
      })
      .then(function (data) {
         console.log(data);
         if (data.系統訊息 === "修課人數已滿") {
            console.log(data.課程);
            message.innerHTML = data.課程 + "修課人數已滿";
            table.innerHTML = title;
            courseList = [];
            return;
         }

         message.innerHTML = data.系統訊息;
         table.innerHTML = title;
         courseList = [];
      })
      .catch((err) => console.log(err));
});

// 退選
drop.addEventListener("click", () => {
   fetch("http://localhost:8080/pick_And_Drop_Course", {
      method: "POST",
      headers: {
         // 告訴後端這是JSON
         "Content-Type": "application/json",
      },
      // body是想傳送的資料
      body: JSON.stringify({
         "學號": number.value,
         "加選或退選": "退選",
         "課程代碼": courseList,
      }),
      //    先包資料再轉乘JSON
      //    body:JSON.stringify(testStudent);
   })
      .then(function (response) {
         return response.json();
      })
      .then(function (data) {
         console.log(data);
         message.innerHTML = data.系統訊息;
         table.innerHTML = title;
         courseList = [];
      })
      .catch((err) => console.log(err));
});

// 課程清單
list.addEventListener("click", () => {
   console.log(number.value);
   fetch("http://localhost:8080/search_Student_Course", {
      method: "POST",
      headers: {
         // 告訴後端這是JSON
         "Content-Type": "application/json",
      },
      // body是想傳送的資料
      body: JSON.stringify({
         "學號": number.value,
      }),
      //    先包資料再轉乘JSON
      //    body:JSON.stringify(testStudent);
   })
      .then(function (response) {
         return response.json();
      })
      .then(function (data) {
         console.log(data);
         message.innerHTML = data.系統訊息;
         alreadytable.innerHTML = alreadytitle;

         data.您查詢的所有課程資料.forEach((i) => {
            console.log(i);
            alreadytable.innerHTML +=
               "<td>" +
               i.courseCode +
               "</td><td>" +
               i.courseName +
               "</td><td>" +
               i.credit +
               "</td><td>" +
               i.week +
               "</td><td>" +
               i.startTime +
               "</td><td>" +
               i.endTime +
               "</td>";
         });
      })
      .catch((err) => console.log(err));
});
// 移除陣列
Array.prototype.remove = function (value) {
   this.splice(this.indexOf(value), 1);
};
