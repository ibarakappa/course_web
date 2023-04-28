const number = document.querySelector(".number");
const submit = document.querySelector(".submit");
const message = document.querySelector(".message");

submit.addEventListener("click", () => {
   console.log(number.value);
   fetch("http://localhost:8080/delete_Student", {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify({
         "學號": number.value,
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
