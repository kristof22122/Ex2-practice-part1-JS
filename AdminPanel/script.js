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

table.addEventListener('click', (event) => {
  if ((!event.target.matches('.destroy'))
    && (!event.target.matches('.update'))
    && (!event.target.matches('.save'))) {
    return;
  }
  const item = event.target.closest('.adminPanel__table-item');
  const userForQuestion = currentUsers.find(user => user.id === +item.dataset.userId);
  const changeUserName = item.querySelector('.adminPanel__changeUserName');
  const showUserName = item.querySelector('.adminPanel__showUserName');
  const updateButton = item.querySelector('.update');
  const saveButton = item.querySelector('.save');
  const dateOfChangeField = item.querySelector('.adminPanel__dateOfChange');
  const dateOfCreationField = item.querySelector('.adminPanel__dateOfCreation');
  const showUserDepartment = item.querySelector('.adminPanel__showUserDepartment');
  const changeUserDepartment = item.querySelector('.adminPanel__changeUserDepartment')

  if ((event.target.matches('.destroy'))) {
    const result = confirm(`are you sure you want to delete user ${userForQuestion.userName}?`);

    if (!result) {
      return;
    }

    item.remove();

    currentUsers = currentUsers.filter(user => user.id !== +item.dataset.userId);

    localStorage.removeItem(`${userForQuestion.id}`);
  }

  if ((event.target.matches('.update'))) {
    changeUserName.classList.toggle('hidden');
    showUserName.classList.toggle('hidden');
    updateButton.classList.toggle('hidden');
    saveButton.classList.toggle('hidden');
    showUserDepartment.classList.toggle('hidden');
    changeUserDepartment.classList.toggle('hidden');
  }

  if ((event.target.matches('.save'))) {
    changeUserName.classList.toggle('hidden');
    showUserName.classList.toggle('hidden');
    updateButton.classList.toggle('hidden');
    saveButton.classList.toggle('hidden');
    showUserDepartment.classList.toggle('hidden');
    changeUserDepartment.classList.toggle('hidden');

    showUserName.textContent = changeUserName.value;
    showUserDepartment.textContent = changeUserDepartment.value;
    dateOfChangeField.textContent = dateBuilder(new Date());

    localStorage.setItem(`${userForQuestion.id}`,
      `${changeUserName.value}#${changeUserDepartment.value}#${dateOfCreationField.textContent}#${dateBuilder(new Date())}`
    )
  }
  
});
