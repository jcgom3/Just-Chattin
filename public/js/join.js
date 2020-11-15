const join = document.getElementById('form-input');

join.addEventListener('submit', e =>{
    e.preventDefault();
    const username = document.getElementById('username').value;
    const room = document.getElementById('room').value;
    // For our webpage, we just need to send the user to the chat room for join, this is for the page where user select the room, after log in
    fetch('/api/join', {
        // THis is like login, post the username and password so that the server can look up
        // This fetch method is not needed, since the user needs to log in first before seeing this page
        method: 'post',
        body: JSON.stringify({
          username: username
        }),
        headers: { 'Content-Type': 'application/json' }
      }).then(
          window.location.replace(`/${room}`)
      )
    
});