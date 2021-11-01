'use strict';

const root = document.querySelector('.adminPanel');
const userNameField = root.querySelector('.adminPanel__userName');
const form = root.querySelector('.adminPanel__form');
const table = root.querySelector('.adminPanel__table');
let userUpdateId = null;

// localStorage.clear();

const setLocalStorageUsers = (newLocalStorageUsers) => {
  try {
    const stringifyNewLocalStorageUsers = JSON.stringify(newLocalStorageUsers);
    localStorage.setItem('localStorageUsers', stringifyNewLocalStorageUsers);
  } catch(error) {
    console.log('Error set Local Storage!');
    console.log(error);
  }
}

const getLocalStorageUsers = () => {
  const retrievedObject = localStorage.getItem('localStorageUsers');

  try {
    const parseRetrievedObject = JSON.parse(retrievedObject);

    if (Array.isArray(parseRetrievedObject)) {
      return parseRetrievedObject;
    }

    return [];
  } catch(error) {
    console.log('Error get Local Storage!');
    console.log(error);
    return [];
  }
};

let localStorageUsers = getLocalStorageUsers();

initUsers();

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

function initUsers() {
  if (!localStorageUsers) return;
  if (!Array.isArray(localStorageUsers)) {
    return;
  }
  const tableBody = table.querySelector('.adminPanel__tableBody');

  if (tableBody) {
    tableBody.remove();
  }

  const newTableBody = document.createElement('tbody');
  newTableBody.className = 'adminPanel__tableBody';

  table.append(newTableBody);

  localStorageUsers.forEach(user => {
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
  });
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const dateAdd = dateBuilder(new Date());
  const id = +new Date();
  form.elements.userName.value = '';
  form.elements.userDepartment.value = '';

  if (userUpdateId) {
    localStorageUsers = localStorageUsers.map(user => {
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
    });

    userUpdateId = null;
  } else {
    const userForLocalStorage = {
      id: id,
      userName: data.get('userName'),
      userDepartment: data.get('userDepartment'),
      DateOfCreation: dateAdd,
      DateOfChange: dateAdd,
    }

    // localStorageUsers.push(userForLocalStorage);
    localStorageUsers = [...localStorageUsers, userForLocalStorage];
  };

  setLocalStorageUsers(localStorageUsers);

  initUsers();
});

table.addEventListener('click', (event) => {
  if ((!event.target.matches('#deleteItem'))
    && (!event.target.matches('#updateItem'))) {
    return;
  }
  const item = event.target.closest('.adminPanel__table-item');
  const itemUserId = +item.dataset.userId;
  const userForQuestion = localStorageUsers.find(user => user.id === itemUserId);

  if ((event.target.matches('#deleteItem'))) {
    const result = confirm(`are you sure you want to delete user ${userForQuestion.userName}?`);

    if (!result) {
      return;
    }

    item.remove();

    localStorageUsers = localStorageUsers.filter(user => user.id !== itemUserId);

    setLocalStorageUsers(localStorageUsers);
  }

  if ((event.target.matches('#updateItem'))) {
    userUpdateId = userForQuestion.id;
    form.elements.userName.value = userForQuestion.userName;
    form.elements.userDepartment.value = userForQuestion.userDepartment;
  }
});
