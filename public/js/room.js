document.getElementById('join-btn').addEventListener('click',e=>{
    e.preventDefault
    const room = document.getElementById('room').value;
          window.location.replace(`/chat/${room}`)
    
});