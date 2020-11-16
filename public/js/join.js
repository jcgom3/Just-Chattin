const join = document.getElementById('form-input');

join.addEventListener('submit', e =>{
    e.preventDefault();
    const username = document.getElementById('username').value;
    const room = document.getElementById('room').value;
    fetch('/api/join', {
        method: 'post',
        body: JSON.stringify({
          username: username
        }),
        headers: { 'Content-Type': 'application/json' }
      }).then(
          window.location.replace(`/chat/${room}`)
      )
    
});