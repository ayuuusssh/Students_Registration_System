
document.addEventListener("DOMContentLoaded", function() {
    const studentForm = document.getElementById("studentForm");

    const studentsTable = document.getElementById("studentsTable").getElementsByTagName("tbody")[0];
    const students = JSON.parse(localStorage.getItem("students")) || [];

    function renderStudents() {
        studentsTable.innerHTML = '';
        students.forEach((student, index) => {
            const row = studentsTable.insertRow();

            row.innerHTML = `
                <td>${student.name}</td>
                <td>${student.id}</td>
                <td>${student.email}</td>
                <td>${student.contact}</td>
                <td>
                    <button onclick="editStudent(${index})">Edit</button>
                    <button onclick="deleteStudent(${index})">Delete</button>
                </td>
            `;
        });
    }



    window.editStudent = function(index) {
        const student = students[index];

        document.getElementById("studentName").value = student.name;
        document.getElementById("studentId").value = student.id;

        document.getElementById("emailId").value = student.email;
        document.getElementById("contactNo").value = student.contact;
        studentForm.dataset.editIndex = index;
    };

    window.deleteStudent = function(index) {
        students.splice(index, 1);
        localStorage.setItem("students", JSON.stringify(students));
        renderStudents();
    };

    studentForm.addEventListener("submit", function(e) {
        e.preventDefault();

        const name = document.getElementById("studentName").value.trim();
        const id = document.getElementById("studentId").value.trim();

        const email = document.getElementById("emailId").value.trim();
        const contact = document.getElementById("contactNo").value.trim();

        if (!name || !id || !email || !contact) {
            alert("All fields are required.");
            return;
        }

        const student = { name, id, email, contact };
        const editIndex = studentForm.dataset.editIndex;

        if (editIndex) {
            students[editIndex] = student;
            delete studentForm.dataset.editIndex;
        } else {
            students.push(student);
        }

        localStorage.setItem("students", JSON.stringify(students));
        studentForm.reset();
        renderStudents();
    });

    renderStudents();
});