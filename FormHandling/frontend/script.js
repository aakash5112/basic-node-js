const form = document.querySelector('.student-form');
const tableBody = document.getElementById('student-table-body');
const storageKey = 'studentRecords';

function loadStudents() {
    const students = JSON.parse(localStorage.getItem(storageKey)) || [];

    tableBody.innerHTML = '';

    students.forEach(student => {
        const row = document.createElement('tr');

        const fields = [
            'studentId', 'admissionNo', 'firstName', 'middleName', 'lastName', 'dob', 'gender',
            'nationality', 'bloodGroup', 'photo', 'email', 'mobile', 'phone', 'address',
            'city', 'state', 'country', 'postalCode', 'program', 'department', 'course',
            'year', 'semester', 'section', 'rollNo', 'batch', 'advisor', 'guardianName',
            'guardianRelation', 'guardianPhone', 'guardianEmail', 'admissionDate',
            'studentStatus', 'hostel', 'scholarship', 'medicalInfo'
        ];

        fields.forEach(field => {
            const cell = document.createElement('td');
            cell.textContent = student[field] || '';
            row.appendChild(cell);
        });

        tableBody.appendChild(row);
    });
}

form.addEventListener('submit', function (event) {
    event.preventDefault();

    const student = {};

    const fields = [
        'studentId', 'admissionNo', 'firstName', 'middleName', 'lastName', 'dob', 'gender',
        'nationality', 'bloodGroup', 'photo', 'email', 'mobile', 'phone', 'address',
        'city', 'state', 'country', 'postalCode', 'program', 'department', 'course',
        'year', 'semester', 'section', 'rollNo', 'batch', 'advisor', 'guardianName',
        'guardianRelation', 'guardianPhone', 'guardianEmail', 'admissionDate',
        'studentStatus', 'hostel', 'scholarship', 'medicalInfo'
    ];

    fields.forEach(field => {
        const input = form.elements[field];
        student[field] = input ? input.value : '';
    });

    const students = JSON.parse(localStorage.getItem(storageKey)) || [];
    students.push(student);
    localStorage.setItem(storageKey, JSON.stringify(students));

    form.reset();
    loadStudents();
});

loadStudents();
