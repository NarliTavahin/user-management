var form = document.getElementById('myForm'),
  file = document.getElementById('imgInput'),
  id = document.getElementById('id'),
  email = document.getElementById('email'),
  first_name = document.getElementById('first_name'),
  last_name = document.getElementById('last_name'),
  avatar = document.getElementById('avatar'),
  submitBtn = document.querySelector('.submit'),
  userInfo = document.getElementById('data'),
  modal = document.getElementById('userForm'),
  modalTitle = document.querySelector('#userForm .modal-title'),
  modalcreate = document.querySelector('#createForm .modal-title'),
  username = document.getElementById('createUsername'),
  createEmail = document.getElementById('createEmail'),
  passsword = document.getElementById('createPassword'),
  newUserBtn = document.querySelector('.newUser')

// --------------------------------Pagination & Entries & GET Method-----------------------------

async function getData (page, perPage) {
  const response = await fetch(
    `https://reqres.in/api/users/?page=${page}&per_page=${perPage}`,
    {
      method: 'GET'
    }
  )
  const data = await response.json()
  if (response.status != 200) {
    createToast('error')
  } else {
    createToast('success')
  }
  const user = await data.data

  createUser(user)
  createPages(data.total_pages)
}

createPerPage()

const select = document.querySelector('select')
select.value = 3

select.addEventListener('input', e => {
  getData(1, e.target.value)
})

function createUser (user) {
  let el = `
    <tr>
      <th>Picture</th>
      <th>ID</th>
      <th>First Name</th>
      <th>Last Name</th>
      <th>E-mail</th>
      <th>Actions</th>
    </tr>
  `

  user.forEach(item => {
    el += `
      <tr class="employeeDetails">
        <td><img src="${item.avatar}" width="90" height="80"></td>
        <td>${item.id}</td>
        <td>${item.first_name}</td>
        <td>${item.last_name}</td>
        <td>${item.email}</td>
        <td>
          <button class="btn btn-success" onclick="readInfo('${item.avatar}', '${item.id}', '${item.first_name}', '${item.last_name}', '${item.email}')" 
          data-bs-toggle="modal" data-bs-target="#readData">
            <i class="bi bi-eye"></i>
          </button>

          <button class="btn btn-primary" onclick="editInfo('${item.id}', '${item.first_name}', '${item.last_name}', '${item.email}')" 
          data-bs-toggle="modal" data-bs-target="#userForm">
            <i class="bi bi-pencil-square"></i>
          </button>
    
          <button class="btn btn-danger" onclick="deleteInfo(${item.id})">
            <i class="bi bi-trash"></i>
          </button>
        </td>
      </tr>
    `
  })

  document.querySelector('.users').innerHTML = el
}

function createPerPage () {
  let el = ''
  for (let i = 1; i <= 12; i++) {
    el += `<option value="${i}">${i}</option>`
  }
  document.querySelector('select').innerHTML = el
}

function createPages (total) {
  let page = ''
  for (let i = 1; i <= total; i++) {
    page += `<div onclick="getData(innerHTML,select.value)" class="page">${i}</div>`
  }

  document.querySelector('.pages').innerHTML = page
}

function createPages (total) {
  let page = ''
  for (let i = 1; i <= total; i++) {
    page += `<div onclick="getData(${i}, ${
      document.querySelector('select').value
    })" class="page">${i}</div>`
  }

  document.querySelector('.pages').innerHTML = page
}
getData(1, select.value)

// -------------------------------POST--(create) METHOD------------------------

async function post_method (createUsername, createEmail, createPassword) {
  const response = await fetch(`https://reqres.in/api/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json'
    },
    body: JSON.stringify({
      username: createUsername,
      email: createEmail,
      password: createPassword
    })
  })

  const data = await response.json()

  if (response.status == 400) {
    createToast('success')
  } else {
    createToast('error')
  }
}

newUserBtn.addEventListener('click', () => {
  const createUsername = document.getElementById('createUsername').value
  const createEmail = document.getElementById('createEmail').value
  const createPassword = document.getElementById('createPassword').value
  modalcreate.innerText = 'Fill the New Form'
  ;(submitBtn.innerText = 'Submit'),
    post_method(createUsername, createEmail, createPassword)
})

file.onchange = function () {
  if (file.files[0].size < 1000000) {
    // 1MB = 1000000
    var fileReader = new FileReader()
    fileReader.onload = function (e) {
      imgUrl = e.target.result
      imgInput.src = imgUrl
    }
    fileReader.readAsDataURL(file.files[0])
  } else {
    alert('This file is too large!')
  }
}

function showInfo () {
  document.querySelectorAll('.employeeDetails').forEach(info => info.remove())
  data.forEach((element, index) => {
    let createElement = `<tr class="employeeDetails">
            <td><img src="${element.employeeavatar}" width="50" height="50"></td>
            <td>${element.employeeid}</td>
            <td>${element.employeefirst_name}</td>
            <td>${element.employeelast_name}</td>
            <td>${element.employeeemail}</td>
        </tr>`

    userInfo.innerHTML += createElementfirst_name
  })
}

function readInfo (avatar, id, First_Name, Last_Name, email) {
  ;(document.querySelector('#showid').value = id),
    (document.getElementById('avatar1').src = avatar),
    (document.querySelector('#showfirst_name').value = First_Name),
    (document.querySelector('#showlast_name').value = Last_Name),
    (document.querySelector('#showEmail').value = email)

  createToast('success')

  console.log(id)
}

form.addEventListener('submit', e => {
  e.preventDefault()

  function create () {
    post_method(
      document.getElementById('createUsername').value,
      document.getElementById('createEmail').value,
      document.getElementById('createPassword').value
    )
    submitBtn.innerText = 'Submit'
    modalcreate.innerText = 'Fill the New Form'
  }

  function put () {
    put_method(
      (document.querySelector('#editID').value = id),
      (document.querySelector('#editFirstName').value = first_name),
      (document.querySelector('#editLastName').value = last_name),
      (document.querySelector('#editEmail').value = email)
    )

    submitBtn.innerText = 'Submit'
    modalTitle.innerHTML = 'Fill The Form'
  }

  form.reset()

  imgInput.src = `./image/3135715.png`
})

// -------------------------------PUT--(update) METHOD------------------------

async function put_method (id, first_name, last_name, email) {
  const response = await fetch(`https://reqres.in/api/users/${id}`, {
    method: 'PUT',
    headers: {
      accept: 'application/json',
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      id_no: id,
      firstName: first_name,
      lastName: last_name,
      userEmail: email
    })
  })
  if (response.status != 200) {
    createToast('error')
  } else {
    createToast('success')
  }
}

function editInfo (id_no, firstName, lastName, userEmail) {
  id.value = id_no
  avatar.src = `https://reqres.in/img/faces/${id_no}-image.jpg`
  first_name.value = firstName
  last_name.value = lastName
  email.value = userEmail

  submitBtn.innerText = 'Update'
  modalTitle.innerText = 'Update The Form'

  put_method(id_no, firstName, lastName, userEmail)
  console.log(id_no)
  console.log(firstName)
}

// -------------------------------DELETE METHOD-------------------------------

async function delete_method (id) {
  const response = await fetch(`https://reqres.in/api/users/${id}}`, {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json'
    }
  })

  if (response.status == 204) {
    createToast('success')
  } else {
    createToast('error')
  }
}

function deleteInfo (index) {
  if (confirm('Are you sure want to delete?')) {
    delete_method()
  }
}

// ----------------------------------Toast----------------------------------

const notifications = document.querySelector('.notifications'),
  buttons = document.querySelectorAll('.buttons .btn')

const toastDetails = {
  timer: 2500,
  success: {
    icon: 'fa-circle-check',
    text: 'Success: This is a success toast.'
  },
  error: {
    icon: 'fa-circle-xmark',
    text: 'Error: This is an error toast.'
  }
}

const removeToast = toast => {
  toast.classList.add('hide')
  if (toast.timeoutId) clearTimeout(toast.timeoutId)
  setTimeout(() => toast.remove(), 500)
}

const createToast = id => {
  const { icon, text } = toastDetails[id]
  const toast = document.createElement('li')
  toast.className = `toast ${id}`

  toast.innerHTML = `<div class="column">
                        <i class="fa-solid ${icon}"></i>
                        <span>${text}</span>
                      </div>
                      <i class="fa-solid fa-xmark" onclick="removeToast(this.parentElement)"></i>`
  notifications.appendChild(toast)

  toast.timeoutId = setTimeout(() => removeToast(toast), toastDetails.timer)
}
