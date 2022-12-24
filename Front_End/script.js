var userdetail = null;

// signup

function signup(event) {
  event.preventDefault();
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let number = document.getElementById("number").value;
  let password = document.getElementById("password").value;

  let obj = {
    name: name,
    email: email,
    number: number,
    password: password,
  };
  axios
    .post("http://localhost:3000/signup", obj)
    .then((result) => {
      if (result.status == 201) {
        alert("Successfully Signed up");
        window.location.href = "./login.html";
      } else {
        throw new Error("Failed to Signup");
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

// login
function login(event) {
  event.preventDefault();
  let email = document.getElementById("logemail").value;
  let password = document.getElementById("logpassword").value;

  let details = {
    email: email,
    password: password,
  };
  axios
    .post("http://localhost:3000/login", details)
    .then((response) => {
      // console.log(response.data.data.data);

      console.log(response);
      localStorage.setItem('userId',JSON.stringify(response.data.userId))
      alert("Successfully Logged in");
      
      window.location.href = "./chat.html";
    })
    .catch((err) => console.log(err));
}

function sendmsg(event) {
  event.preventDefault()
  let userId = localStorage.getItem('userId')
  let obj = {
    message:document.getElementById('message').value,
    userId:userId
  }
  axios.post('http://localhost:3000/message', obj)
  .then(response=>{
    document.getElementById('message').value = ''
    if(response.status == 201) {
      alert('Message Successfully Sent')
      getMessages()
    }
  })
  .catch(err=>{
    document.getElementById('message').value = ''
    console.log(err)
    alert('Something went wrong')
  })
}


function getMessages() {
  axios.get('http://localhost:3000/message')
  .then(response=>{
    console.log(response)
    let parentDiv = document.getElementById('inbox')
    let childSpan = ''
    for(let i=0;i<response.data.data.length;i++) {
     childSpan += `${response.data.data[i].user.name} : ${response.data.data[i].message}`
    }
    parentDiv.innerHTML = childSpan
  })
  .catch(err=>{
    console.log(err)
  })
}

window.addEventListener('DOMContentLoaded',getMessages())











