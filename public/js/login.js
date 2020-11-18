async function loginFormHandler(event) {
    event.preventDefault();

    const username = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    if (username && password) {
        const response = await fetch('/api/users/login', {
            method: 'post',
            body: JSON.stringify({
                username,
                password
            }),
            headers: {'Content-Type': 'application/json'}
        });
        if (response.ok) {
            // Some delay is needed so that the server can update the session cookie
            setTimeout(()=>{
                document.location.replace('/')
            },1000);
        } else {
            let result = await response.json()
            alert(result.message)
        }
    }
}

document.querySelector('.login-form').addEventListener('submit', loginFormHandler);