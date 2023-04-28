const courseCode = document.querySelector(".courseCode");
const courseName = document.querySelector(".courseName");
const week = document.querySelector(".week");
const startTime = document.querySelector(".startTime");
const endTime = document.querySelector(".endTime");
const credit = document.querySelector(".credit");
const submit = document.querySelector(".submit");
const message = document.querySelector(".message");

submit.addEventListener("click", () => {
   fetch("http://localhost:8080/add_New_Course", {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify({
         "課程內容": [
            {
               "courseCode": courseCode.value,
               "courseName": courseName.value,
               "week": week.value,
               "startTime": startTime.value,
               "endTime": endTime.value,
               "credit": credit.value,
            },
         ],
      }),
   })
      .then(function (response) {
         return response.json();
      })
      .then(function (data) {
         console.log(data);
         message.innerHTML = data.系統訊息;
      })
      .catch((err) => console.log(err));
});
