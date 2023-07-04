// Student data
const students = [
  {
    ID: 1,
    name: "Alice",
    age: 21,
    grade: "A",
    degree: "Btech",
    email: "alice@example.com",
  },
  {
    ID: 2,
    name: "Bob",
    age: 22,
    grade: "B",
    degree: "MBA",
    email: "bob@example.com",
  },
  {
    ID: 3,
    name: "Charlie",
    age: 20,
    grade: "C",
    degree: "Arts",
    email: "charlie@example.com",
  },
];

// Function to render the student list
function renderStudentList(studentData) {
  const tableBody = document.querySelector("#studentList tbody");
  tableBody.innerHTML = "";

  if (studentData && studentData.length > 0) {
    studentData.forEach((student) => {
      const row = document.createElement("tr");
      row.innerHTML = `
                <td>${student.ID}</td>
                <td>${student.name}</td>
                <td>${student.email}</td>
                <td>${student.age}</td>
                <td>${student.grade}</td>
                <td>${student.degree}</td>
                <td>
                  <button class="editButton" data-id="${student.ID}">&#9998;</button>
                  <button class="deleteButton" data-id="${student.ID}">&#128465;</button>
                </td>
              `;
      tableBody.appendChild(row);
    });
  } else {
    const row = document.createElement("tr");
    row.innerHTML = '<td colspan="7">No students found</td>';
    tableBody.appendChild(row);
  }
}

// Function to handle form submission
function handleSubmit(event) {
  event.preventDefault();

  const studentId = document.getElementById("studentId").value;
  const name = document.getElementById("nameInput").value;
  const email = document.getElementById("emailInput").value;
  const age = document.getElementById("ageInput").value;
  const grade = document.getElementById("gradeInput").value;
  const degree = document.getElementById("degreeInput").value;

  if (studentId) {
    // Edit student
    const student = students.find((s) => s.ID === parseInt(studentId));
    if (student) {
      student.name = name;
      student.email = email;
      student.age = age;
      student.grade = grade;
      student.degree = degree;
    }
  } else {
    // Add student
    const newStudent = {
      ID: students.length + 1,
      name,
      email,
      age,
      grade,
      degree,
    };
    students.push(newStudent);
  }

  document.getElementById("studentForm").reset();
  document.getElementById("submitButton").textContent = "Add Student";
  renderStudentList(students);
}

// Function to handle edit button click
function handleEdit(event) {
  const studentId = event.target.dataset.id;
  const student = students.find((s) => s.ID === parseInt(studentId));

  if (student) {
    document.getElementById("studentId").value = student.ID;
    document.getElementById("nameInput").value = student.name;
    document.getElementById("emailInput").value = student.email;
    document.getElementById("ageInput").value = student.age;
    document.getElementById("gradeInput").value = student.grade;
    document.getElementById("degreeInput").value = student.degree;
    document.getElementById("submitButton").textContent = "Edit Student";
  }
}

// Function to handle delete button click
function handleDelete(event) {
  const studentId = event.target.dataset.id;
  const studentIndex = students.findIndex((s) => s.ID === parseInt(studentId));

  if (studentIndex !== -1) {
    students.splice(studentIndex, 1);
    renderStudentList(students);
  }
}

// Function to handle search input
function handleSearch(event) {
  const searchTerm = event.target.value.toLowerCase();

  const filteredStudents = students.filter((student) => {
    const { name, email, degree } = student;
    return (
      name.toLowerCase().includes(searchTerm) ||
      email.toLowerCase().includes(searchTerm) ||
      degree.toLowerCase().includes(searchTerm)
    );
  });

  renderStudentList(filteredStudents);
}

// Add event listeners
document.getElementById("studentForm").addEventListener("submit", handleSubmit);
document
  .getElementById("studentList")
  .addEventListener("click", function (event) {
    if (event.target.classList.contains("editButton")) {
      handleEdit(event);
    } else if (event.target.classList.contains("deleteButton")) {
      handleDelete(event);
    }
  });
document.getElementById("searchInput").addEventListener("input", handleSearch);

// Initial rendering of student list
renderStudentList(students);
