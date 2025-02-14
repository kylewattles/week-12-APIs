
/*const userContainer = document.getElementById("users");
let users = [];

const fetchUsers = async () => {
    
    
    try{
    const URL = "https://reqres.in/api/users/";
    const response = await fetch(URL);
    const data = await response.json();
    users = data.data;
   
} catch (error) {
    console.log("failed to catch pokemon :(", error);
    userContainer.innerHTML = "<li>Failed to load :(</li>";
    return;
    }
    let template = "";
    users.forEach((user, index) => {
        template += `<li>${index + 1} ${user.first_name}</li>`;
        
    });

    userContainer.innerHTML = template;
    
}
fetchUsers();*/

(() => {
    const cardContainer = document.querySelector('#cardsContainer');
    const addUser = document.querySelector('#addUser');
  
    async function getUserData() {
      const response = await fetch('https://reqres.in/api/users?page=2');
      const users = await response.json();
  
      users.data.forEach((user) => {
        const card = document.createElement('div');
        card.classList.add('card', 'm-2');
        card.style.width = '18rem';
        card.innerHTML = ` 
       <div class="card" style="width: 18rem">
       <img
         src="${user.avatar}"
         class="card-img-top"
         alt="..."
       />
       <div class="card-body">
         <h5 class="card-title">${user.first_name} ${user.last_name}</h5>
         <p class="card-text">
           Some quick example text to build on the card title and make up the
           bulk of the card's content.
         </p>
         
         <button type="button" class="btn btn-danger" data-id=${user.id}>Delete</button>
       </div>
     </div>`;
        const deleteButton = card.querySelector('.btn-danger');
        deleteButton.addEventListener('click', (event) => {
          card.remove();
          deleteUser(event.target.dataset.id);
        });
        cardContainer.appendChild(card);
      });
    }
    getUserData();
    async function deleteUser(id) {
      const response = await fetch(`https://reqres.in/api/posts/${id}`, {
        method: 'DELETE',
      });
  
      
      //getUserData();
    }
  
    async function createUser() {
        const cardContainer = document.getElementById('cardsContainer');
      const response = await fetch('https://reqres.in/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: 'Joe Black', job: 'Developer' }),
      });
  
      const result = await response.json();
      console.log(result);
      const card = document.createElement('div');
      card.classList.add('card', 'm-2');
      card.style.width = '18rem';
      card.innerHTML = ` 
       <div class="card" style="width: 18rem">
       <img class="card-img-top"
         alt="..."
       />
       <div class="card-body">
         <h5 class="card-title">${result.name}</h5>
         <p class="card-text">
           Some quick example text to build on the card title and make up the
           bulk of the card's content.
         </p>
         
         <button type="button" class="btn btn-danger" data-id="${result.id}">Delete</button>
       </div>
     </div>`;
      cardContainer.appendChild(card);
    }
  
    addUser.addEventListener('click', () => {
      console.log('here');
      createUser();
    });
  })();
  

