function extractSelectedSubjects(checkboxesContainer) {
    var tempSubjects = []
    for (var i = 0; i < checkboxesContainer.length; i++) {
        if (checkboxesContainer[i].checked)
            tempSubjects[i] = checkboxesLabels[i].innerText;
    }
    selectedSubjects = tempSubjects.filter(subject => subject !== undefined);
    
    if (selectedSubjects.length < 1)
        alert('Please select the subjects.')
    else if (selectedSubjects.length < 5)
        alert('Please select a minimum of 5 subjects.');
    else {
        subjectScoresTable.style.display = 'block';
        insertTableContent(selectedSubjects);
    }
}

function insertTableContent(subjects) {
    scoresTableBody.innerHTML = subjects.map(subject => {
        return `
            <tr>
                <td>${subject}</td>
                <td><input min="0" max="100" type="number" placeholder="CA score for ${subject}" ca></td>
                <td><input min="0" max="100" type="number" placeholder="Exam score for ${subject}" exam></td>
            </tr>`
    }).join('');
}

function extractScores() {
    const testScoresFields = document.querySelectorAll('[ca]');
    const examScoresFields = document.querySelectorAll('[exam]');
    
    for (var i = 0; i < testScoresFields.length; i++) {
        testScores[i] = Number(testScoresFields[i].value);
        examScores[i] = Number(examScoresFields[i].value);
    }
}

function previewResult() {
    previewTableBody.innerHTML = selectedSubjects.map((subject, index) => {
        return `
            <tr>
                <td>${subject}</td>
                <td>${testScores[i]}
            </tr>`
    });
}

const navigationSide = document.querySelector('.navigations-side');
const unhideNavigationSideIcon = document.querySelector('.unhide-navigation-icon');
const hideNavigationSideIcon = document.querySelector('.hide-navigation-icon');
const sideNavigationLinks = document.querySelectorAll('.side-link');
const checkboxes = document.querySelectorAll('input[type="checkbox"]');
const checkboxesLabels = document.querySelectorAll('[subject]');
const selectSubjectsButton = document.querySelector('[select-subjects]');
const scoresTableBody = document.querySelector('[scores-table-body]');
const previewTableBody = document.querySelector('[preview-table-body]');
const subjectScoresTable = document.querySelector('.subjects-scores-table');
const processResultButton = document.querySelector('[process-result]');
const resultPreview = document.querySelector('.result-preview');
var selectedSubjects = [];
var testScores = [];
var examScores = [];

processResultButton.addEventListener('click', () => {
    extractScores();
});

selectSubjectsButton.addEventListener('click', () => {
    extractSelectedSubjects(checkboxes);
});

unhideNavigationSideIcon.addEventListener('click', () => {
    navigationSide.style.left = '0';
});

hideNavigationSideIcon.addEventListener('click', () => {
    navigationSide.style.left = '-20rem';
});

sideNavigationLinks.forEach(link => {
    link.addEventListener('click', () => {
        navigationSide.style.left = '-20rem';
    });
});