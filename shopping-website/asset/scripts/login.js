const form = document.querySelector(".form");
const phone=document.querySelector(".phone")
const password=document.querySelector(".password")

const checkValidation = () => {
  fetch("http://localhost/task-4/get-api.php")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      let mainUser=data.find(user=>user.phone_number===phone.value && user.password===password.value)
      if(mainUser){
        window.location.href = `http://localhost/task-4/profile.php?token=${mainUser.token}`;
      }else{
        window.location.href = `http://localhost/task-4/index.php`;
      }
    });
};

const submitForm = (event) => {
    event.preventDefault()
    checkValidation()
};

form.addEventListener("submit", submitForm);
console.log("hello")