

(() => {

    document.getElementById("userForm").addEventListener("submit", async function(event) {
        event.preventDefault();
        await createUser();
    });

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
           Join us
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
        const name = document.getElementById("name").value;
        const pledge = document.getElementById("pledge").value;
        const cardContainer = document.getElementById('cardsContainer');

      const response = await fetch('https://reqres.in/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, pledge }),
      });
  
      const result = await response.json();
      
      const card = document.createElement('div');
      card.classList.add('card', 'm-2');
      card.style.width = '18rem';
      card.innerHTML = ` 
       <div class="card" style="width: 18rem">
       <img class="card-img-top" src="https://motionarray.imgix.net/preview-463821-I5nqhhQ32qY3zehe-large.jpg?w=3840&q=60&fit=max&auto=format" alt="..."/>
       <div class="card-body">
         <h5 class="card-title">${result.name}</h5>
         <p class="card-text">${result.pledge}</p>
          <button type="button" class="delete-user btn btn-danger" data-id="${result.id}">Delete</button>
       </div>
     </div>`;
      cardContainer.appendChild(card);

      const deleteButton = card.querySelector('.btn-danger');
    deleteButton.addEventListener('click', async (event) => {
        await deleteUser(event.target.dataset.id);
        card.remove();
    });
    }
  
    addUser.addEventListener('click', () => {
      console.log('here');
      createUser();
    });
  })();
  

