const btn = document.querySelector(".btn");

btn.addEventListener("click", function () {
   fetch("http://localhost:8080/add_New_Student", {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify({
         "學生資料": {
            "number": "999",
            "name": "測試",
            "credit": "0",
         },
      }),
   })
      .then(function (response) {
         return response.json();
      })
      .then(function (data) {
         // console.log(data);
      })
      .catch((err) => console.log(err));
});
