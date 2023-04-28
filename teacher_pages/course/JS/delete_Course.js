const courseCode = document.querySelector(".courseCode");
const submit = document.querySelector(".submit");
const message = document.querySelector(".message");

submit.addEventListener("click", () => {
   fetch("http://localhost:8080/delete_Course", {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify({
         "課程代碼": [courseCode.value],
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
