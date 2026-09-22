const form = document.querySelector('.student-form');
const tableBody = document.getElementById('student-table-body');

const fields = [
    'studentId', 'admissionNo', 'firstName', 'middleName', 'lastName', 'dob', 'gender',
    'nationality', 'bloodGroup', 'photo', 'email', 'mobile', 'phone', 'address',
    'city', 'state', 'country', 'postalCode', 'program', 'department', 'course',
    'year', 'semester', 'section', 'rollNo', 'batch', 'advisor', 'guardianName',
    'guardianRelation', 'guardianPhone', 'guardianEmail', 'admissionDate',
    'studentStatus', 'hostel', 'scholarship', 'medicalInfo'
];

function loadStudents() {
    tableBody.innerHTML = '';

    fetch('http://localhost:3500/students', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            const students = Array.isArray(data) ? data : (data.students || []);

            students.forEach(student => {
                const row = document.createElement('tr');

                fields.forEach(field => {
                    const cell = document.createElement('td');
                    cell.textContent = student[field] || '';
                    row.appendChild(cell);
                });

                tableBody.appendChild(row);
            });
        })
        .catch(error => {
            console.log('Error loading students:', error);
        });
}

form.addEventListener('submit', function (event) {
    event.preventDefault();

    const student = {};

    fields.forEach(field => {
        const input = form.elements[field];
        student[field] = input ? input.value : '';
    });

    fetch('http://localhost:3500/students', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(student)
    })
        .then(response => response.text())
        .then(data => {
            form.reset();
            loadStudents();
        })
        .catch(error => {
            console.log('Error saving student:', error);
        });
});

loadStudents();
