'use strict';

const root = document.querySelector('.adminPanel');
const userNameField = root.querySelector('.adminPanel__userName');
const form = root.querySelector('.adminPanel__form');
const table = root.querySelector('.adminPanel__table');
const localStorageLength = localStorage.length;

let currentUsers = [
  
];

for (let i = 0; i < localStorageLength; i++) {
  const key = localStorage.key(i);
  const value = localStorage.getItem(`${key}`);
  const userValue = value.split('#');
  currentUsers.push({
    id: +key,
    userName: userValue[0],
    userDepartment: userValue[1],
    DateOfCreation: userValue[2],
    DateOfChange: userValue[3],
  });
};

initUsers(currentUsers);

const dateBuilder = (currentDate) => {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const day = days[currentDate.getDay()];
  const date = currentDate.getDate();
  const month = months[currentDate.getMonth()];
  const hours = currentDate.getHours();
  const min = currentDate.getMinutes();
  const year = currentDate.getFullYear();
  let minutes = '';

  if (min < 10) {
    minutes = `0${min}`;
  } else {
    minutes = `${min}`;
  }

  return `${day}, ${date} ${month} ${year}, ${hours}:${minutes}`;
};

function initUsers(users) {
  for (const user of users) {
    table.insertAdjacentHTML('beforeend', `
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
          <input
            type="text"
            class="adminPanel__changeUserName hidden"
            value="${user.userName}"
          >
        </td>
        <td>
          <label 
            class="adminPanel__showUserDepartment"
          >
            ${user.userDepartment}
          </label>
          <select
            name="userDepartment"
            class="adminPanel__changeUserDepartment hidden"
            id="userDepartment"
          >
            <option 
              value="development"
            >
              development
            </option>
            <option 
              value="bookkeeping"
            >
              bookkeeping
            </option>
            <option 
              value="management"
            >
              management
            </option>
          </select>
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
          >
            Update
          </button>
          <button
            type="button"
            class="save hidden"
          >
            Save
          </button>
        </td>
        <td>
          <button
            type="button"
            class="destroy"
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
  const id = +new Date();
  console.log(id);
  form.elements.userName.value = '';
  form.elements.userDepartment.value = '';

  currentUsers.push({
    id: id,
    userName: data.get('userName'),
    userDepartment: data.get('userDepartment'),
    DateOfCreation: dateBuilder(new Date()),
    DateOfChange: dateBuilder(new Date()),
  });

  localStorage.setItem(`${id}`,
    `${data.get('userName')}#${data.get('userDepartment')}#${dateBuilder(new Date())}#${dateBuilder(new Date())}`);

  console.log(currentUsers);

  table.insertAdjacentHTML('beforeend', `
  <tr
    class="adminPanel__table-item"
    data-user-id="${id}"
  >
    <td>
      <label 
        class="adminPanel__showUserName"
      >
        ${data.get('userName')}
      </label>
      <input
        type="text"
        class="adminPanel__changeUserName hidden"
        value="${data.get('userName')}"
      >
    </td>
    <td>
      <label 
        class="adminPanel__showUserDepartment"
      >
        ${data.get('userDepartment')}
      </label>
      <select
        name="userDepartment"
        class="adminPanel__changeUserDepartment hidden"
        id="userDepartment"
      >
        <option 
          value="development"
        >
          development
        </option>
        <option 
          value="bookkeeping"
        >
          bookkeeping
        </option>
        <option 
          value="management"
        >
          management
        </option>
      </select>
    </td>
    <td>
      <label 
        class="adminPanel__dateOfCreation"
      >
        ${dateBuilder(new Date())}
      </label>
    </td>
    <td>
      <label 
        class="adminPanel__dateOfChange"
      >
        ${dateBuilder(new Date())}
      </label>
    </td>
    <td>
      <button
        type="button"
        class="update"
      >
        Update
      </button>
      <button
        type="button"
        class="save hidden"
      >
        Save
      </button>
    </td>
    <td>
      <button
        type="button"
        class="destroy"
      >
        delete
      </button>
    </td>
  </tr>
  `)
});
