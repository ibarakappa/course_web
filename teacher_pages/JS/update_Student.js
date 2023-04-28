const number = document.querySelector(".number");
const studentName = document.querySelector(".name");
const credit = document.querySelector(".credit");
const submit = document.querySelector(".submit");
const message = document.querySelector(".message");

submit.addEventListener("click", () => {
   fetch("http://localhost:8080/update_Student", {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify({
         "學生資料": {
            "number": number.value,
            "name": studentName.value,
            "credit": credit.value,
         },
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
