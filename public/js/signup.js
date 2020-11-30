const successMess = document.querySelector('.success');
const failMess = document.querySelector('.fail');
            

async function signupFormHandler(event) {
    event.preventDefault();

    if (successMess.style.display === "block"){
        // Only send if the success message is being displayed
        const username = document.querySelector('#username-signup').value.trim();
        const password = document.querySelector('#password-signup').value.trim();
    
        if (username && password) {
            const response = await fetch('/api/users', {
                method: 'post',
                body: JSON.stringify({
                    username,
                    password
                }),
                headers: {'Content-Type': 'application/json'}
            });
            if (response.ok) {
                document.location.replace('/login');
            } else {
                alert(response.statusText)
            }
        }
    }
}

async function checkUser(){
    const username = document.querySelector('#username-signup').value.trim();
    if (username){
        // Uses fetch to get server response
        const response = await fetch(`/api/users/${username}`);
        const data = await response.json();

        if (data.canCreate){
            // if user can create, show success message
            successMess.style.display = "block";
            failMess.style.display = "none";
        } else {
            // if user can't, show fail message
            successMess.style.display = "none";
            failMess.style.display = "block";
            
        }
    }
}

document.getElementById('username-signup').addEventListener('blur',checkUser);
document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);