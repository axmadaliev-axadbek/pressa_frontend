let username = document.getElementById('usernameInput')
let password = document.getElementById('passwordInput')
let loginForm = document.getElementById('login-form')



const API = 'https://pressaback.herokuapp.com'
// const API = 'http://localhost:7000'



loginForm.onsubmit = async function (event){
    event.preventDefault()
    
    try {        

        let obj = JSON.stringify({
            username : username.value,
            password : password.value
        })
        let options = {
            method: 'POST',
            body : obj,
            headers : {
                "Content-Type": "application/json"
            }
        }
        let res = await fetch(`${API}/register`, options)
        res = await res.json()
        
        if(res.status == 200){
            localStorage.setItem('token', res.token)
            localStorage.setItem('user', JSON.stringify(res.data))
            window.location.replace('admin.html')
        } else {
            alert(res.message)
        }

    } catch (error) {
        console.log(error);
    }
}