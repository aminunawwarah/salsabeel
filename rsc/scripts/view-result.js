function retrieveResult() {
    const studentName = nameOfStudentField.value.toLowerCase();
    const examinationYear = yearOfExaminationField.value;
    const examinationTerm = termOfExaminationField.value;

    fetch('view_results', {
        method: 'POST',
        body: JSON.stringify({ studentName, examinationYear, examinationTerm }),
        headers: { 'Content-Type': 'application/json' }
    }).then(res => res.json()).then(({ obtained, resultData }) => {
        if (!obtained)
            alert('The result is not found.');
        else {
            displayInformation(resultData);
            resultInformation = resultData;
        }
    }).catch(err => alert(err.message));
}

function displayInformation(data) {
    nameOfStudentText.textContent = data.studentName.toUpperCase();
    yearOfExaminationText.textContent = data.examinationYear;
    termOfExaminationText.textContent = data.examinationTerm;
    examinationTotalText.textContent = data.total;
    examinationAverageText.textContent = data.average;
    resultView.style.display = 'block';
    resultViewTable.innerHTML = data.selectedSubjects.map((subject, index) => {
        return `
            <tr>
                <td>${subject}</td>
                <td>${data.testScores[index]}</td>
                <td>${data.examScores[index]}</td>
                <td>${data.totalScores[index]}</td>
                <td>${data.grades[index]}</td>
            </tr>`
    }).join('');
}

const retrieveResultButton = document.querySelector('[retrieve-result]');
const resultView = document.querySelector('.result-view');
const resultViewTable = document.querySelector('[result-view-table]');
const nameOfStudentText = document.querySelector('[name-of-student]');
const yearOfExaminationText = document.querySelector('[year-of-examination]');
const termOfExaminationText = document.querySelector('[term-of-examination]');
const examinationAverageText = document.querySelector('[examination-average]');
const examinationTotalText = document.querySelector('[examination-total]');
const nameOfStudentField = document.getElementById('student-name-field');
const yearOfExaminationField = document.getElementById('year-of-exam');
const termOfExaminationField = document.getElementById('term-of-exam');
var resultInformation = [];

retrieveResultButton.addEventListener('click', () => {
    retrieveResultButton.style.pointerEvents = 'none';
    retrieveResult();
    retrieveResultButton.style.pointerEvents = 'all';
});