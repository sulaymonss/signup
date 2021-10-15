const logOutBtn = document.querySelector('#logout');

const token = JSON.parse(window.localStorage.getItem('__auth_token__'))

// html elements
let elTemplate = document.querySelector('#template').content;
let elList = document.querySelector('.list');

if(!token?.token){
    window.location.replace('login.html')
}

logOutBtn.addEventListener('click', () =>{
    window.localStorage.removeItem('__auth_token__');
    location.reload();
});

// pagecount
let pageCount = 1;

// render users
function renderUsers(arr, element){
    element.innerHTML = null;
    arr.forEach((user) =>{
        let cloneTemaplate = elTemplate.cloneNode(true);

        cloneTemaplate.querySelector('.img').src = user.avatar;
        cloneTemaplate.querySelector('.first_name').textContent = user.first_name;
        cloneTemaplate.querySelector('.last_name').textContent = user.last_name;
        cloneTemaplate.querySelector('.email').textContent = user.email;

        element.appendChild(cloneTemaplate);
    })

    if(pageCount <= 1){
        prev.disabled = true
    }else{
        prev.disabled = false
    }

    if(pageCount == 2){
        next.disabled = true
    }else{
        next.disabled = false
    }
}

next.addEventListener('click', () =>{
    pageCount++
    
    fetchUsers()
});

prev.addEventListener('click', () =>{
    pageCount--
    
    fetchUsers()
});

// fetch users
async function fetchUsers(){
    let response = await fetch(`https://reqres.in/api/users?page=${pageCount}`)
    let data = await response.json()

    renderUsers(data.data, elList);
}

fetchUsers();