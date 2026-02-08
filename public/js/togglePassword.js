function togglePassword(regPassword){
    const input = document.getElementById('regPassword')
    const type = input.getAttribute('type')
    if(type === 'password'){
        input.setAttribute('type','text') 
    }else{
       input.setAttribute('type','password') 
    } 
}