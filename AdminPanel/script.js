'use strict';

const root = document.querySelector('.adminPanel');
const userNameField = root.querySelector('.adminPanel__userName');
const form = root.querySelector('.adminPanel__form');
const table = root.querySelector('.adminPanel__table');
let userUpdateId = null; 

// localStorage.clear();

let localStorageUsers = [

];

const setLocalStorageUsers = (newLocalStorageUsers) => {
  localStorage.setItem('localStorageUsers', JSON.stringify(newLocalStorageUsers));
}

const getLocalStorageUsers = () => {
  const retrievedObject = localStorage.getItem('localStorageUsers');
  
  return JSON.parse(retrievedObject);
};

let UsersFromLocalStorage = getLocalStorageUsers();

if (UsersFromLocalStorage) {
  localStorageUsers = [...UsersFromLocalStorage.map(user => user)];
};

initUsers(UsersFromLocalStorage);

const timeFormat = (time) => {
  if (time < 10) {
    return `0${time}`;
  } 
  return `${time}`;
};

const dateBuilder = (currentDate) => {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const day = days[currentDate.getDay()];
  const date = currentDate.getDate();
  const month = months[currentDate.getMonth()];
  const year = currentDate.getFullYear();
  const hr = currentDate.getHours();
  const min = currentDate.getMinutes();
  const hours = timeFormat(hr);
  const minutes = timeFormat(min);

  return `${day}, ${date} ${month} ${year}, ${hours}:${minutes}`;
};

function initUsers(Users) {
  const tableBody = table.querySelector('.adminPanel__tableBody');

  if (tableBody) {
    tableBody.remove();
  }  

  const newTableBody = document.createElement('tbody');
  newTableBody.className = 'adminPanel__tableBody';

  table.append(newTableBody);

  if (!Users) return;

  for (const user of Users) {
    newTableBody.insertAdjacentHTML('beforeend', `
      <tr
        class="adminPanel__table-item"
        data-user-id="${user.id}"
      >
        <td>
          <label 
            class="adminPanel__showUserName"
          >
            ${user.userName}
          </label>
        </td>
        <td>
          <label 
            class="adminPanel__showUserDepartment"
          >
            ${user.userDepartment}
          </label>
        </td>
        <td>
          <label 
            class="adminPanel__dateOfCreation"
          >
            ${user.DateOfCreation}
          </label>
        </td>
        <td>
          <label 
            class="adminPanel__dateOfChange"
          >
            ${user.DateOfChange}
          </label>
        </td>
        <td>
          <button
            type="button"
            class="update"
            id="updateItem"
          >
            Update
          </button>
        </td>
        <td>
          <button
            type="button"
            class="destroy"
            id="deleteItem"
          >
            delete
          </button>
        </td>
      </tr>
    `);
  };
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const dateAdd = dateBuilder(new Date());
  const id = +new Date();
  form.elements.userName.value = '';
  form.elements.userDepartment.value = '';

  if (userUpdateId) {
    localStorageUsers = [...localStorageUsers.map(user => {
      const {
        id,
        DateOfCreation,
      } = user;

      if (user.id === userUpdateId) {
        user = {
          id: id,
          userName: data.get('userName'),
          userDepartment: data.get('userDepartment'),
          DateOfCreation: DateOfCreation,
          DateOfChange: dateAdd,
        }
        return user;
      }

      return user;
    })];

    userUpdateId = null;
  } else {
    const userForLocalStorage = {
      id: id,
      userName: data.get('userName'),
      userDepartment: data.get('userDepartment'),
      DateOfCreation: dateAdd,
      DateOfChange: dateAdd,
    }

    localStorageUsers.push(userForLocalStorage);
  };  

  setLocalStorageUsers(localStorageUsers);

  initUsers(localStorageUsers);
});

table.addEventListener('click', (event) => {
  if ((!event.target.matches('#deleteItem'))
    && (!event.target.matches('#updateItem'))) {
    return;
  }
  const item = event.target.closest('.adminPanel__table-item');
  const userForQuestion = localStorageUsers.find(user => user.id === +item.dataset.userId);

  if ((event.target.matches('#deleteItem'))) {
    const result = confirm(`are you sure you want to delete user ${userForQuestion.userName}?`);

    if (!result) {
      return;
    }

    item.remove();

    localStorageUsers = localStorageUsers.filter(user => user.id !== +item.dataset.userId);

    setLocalStorageUsers(localStorageUsers);
  }

  if ((event.target.matches('#updateItem'))) {
    userUpdateId = userForQuestion.id;
    form.elements.userName.value = userForQuestion.userName;
    form.elements.userDepartment.value = userForQuestion.userDepartment;
  }
});
