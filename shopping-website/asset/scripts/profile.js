const $ = document;
const userFullName = $.querySelector(".user__name--box");
const userEmail = $.querySelector(".user__email--box");
const userPhoneNumber = $.querySelector(".user__phone--box");
const userName = $.querySelector(".nav__user-name");
const welcomeText = $.querySelector(".welcome");
const token = localStorage.getItem("token");

const findUser = (users) => {
  let mainUser = users.filter((user) => user.token === token);
  userFullName.innerHTML = mainUser[0].firstname + " " + mainUser[0].lastname;
  userEmail.innerHTML = mainUser[0].email;
  userPhoneNumber.innerHTML = mainUser[0].phone_number;
  userName.innerHTML = mainUser[0].firstname + " " + mainUser[0].lastname;
  welcomeText.innerHTML = `Hello ${mainUser[0].firstname} 🍕`;
};

const gettingUserData = () => {
  fetch("http://localhost/task-4/get-api.php")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      findUser(data);
    });
};

window.addEventListener("load", gettingUserData);
