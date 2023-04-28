const find = document.querySelector(".find");
const lesson = document.querySelector(".lesson");
const list = document.querySelector(".list");
const message = document.querySelector(".message");

lesson.addEventListener("keypress", function (e) {
   if (e.key === "Enter") {
      seacrch();
   }
});

find.addEventListener("click", function () {
   seacrch();
});

function seacrch() {
   fetch("http://localhost:8080/search_Course_By_Name", {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify({
         "課程名稱": lesson.value,
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
         data.您查詢的所有課程資料.forEach((i) => {
            console.log(i);
            list.innerHTML +=
               "<tr><td>" +
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
               "</td></tr>";
         });
      })
      .catch((err) => console.log(err));
}
