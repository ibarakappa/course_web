const find = document.querySelector(".find");
const lesson = document.querySelector(".lesson");
const list = document.querySelector(".list");
const message = document.querySelector(".message");

find.addEventListener("click", function () {
   fetch("http://localhost:8080/search_Course_By_Code", {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify({
         "課程代碼": lesson.value,
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
         console.log(message);
         let course = data.課程資料;
         console.log(course);
         list.innerHTML +=
            "<tr><td>" +
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
            "</td></tr>";
      })

      .catch((err) => console.log(err));
});
