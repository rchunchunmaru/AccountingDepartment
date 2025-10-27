// === Element References ===
const addButton = document.getElementById('add-subject-btn');
const deleteButton = document.getElementById('delete-dlt-subject-btn');
const addContainer = document.getElementById('ADD_SUBJECTS');
const btnContainer = document.getElementById('ADD_BTN_SUB');
const subjectWrapper = document.getElementById('subject-wrapper');
const originalSelect = document.getElementById('mqcqc_subjects_list');
const studentType = document.getElementById('mqcqc_student_type');
const applyingFor = document.getElementById('mqcqc_applying_for');
const program = document.getElementById('mqcqc_academic_program');
const term = document.getElementById('mqcqc_academic_term');
const dpAdditionalSubject = document.getElementById('dpAdditional_subject');

const allSelects = [];

// === Initial State ===
subjectWrapper.style.display = 'none';
btnContainer.style.display = 'none';


// === Helper: Detect Basic / Elementary / High School ===
function checkIsBasicOrElemOrHigh(value) {
  const val = value.trim().toLowerCase();

  return (
    val.includes("nursery") ||
    val.includes("kinder") ||
    val.includes("preparatory") ||
    val.includes("grade 1") ||
    val.includes("grade 2") ||
    val.includes("grade 3") ||
    val.includes("grade 4") ||
    val.includes("grade 5") ||
    val.includes("grade 6") ||
    val.includes("junior high") ||
    val.includes("high school grade 7") ||
    val.includes("high school grade 8") ||
    val.includes("high school grade 9") ||
    val.includes("high school grade 10")
  );
}


// === Helper: Selected Values ===
function getSelectedValues(excludeSelect = null) {
  return allSelects
    .filter(sel => sel !== excludeSelect)
    .map(sel => sel.value)
    .filter(val => val);
}

function getMaxClones() {
  return originalSelect.options.length;
}


// === Populate Subjects ===
function populateOriginalOptions() {
  if (!window.subjectsData) return;

  const applyVal = applyingFor.value.trim();
  const programVal = program.value.trim();
  const termVal = term.value.trim();

  if (!applyVal || !programVal || !termVal) return;

  const applyData = subjectsData[applyVal];
  if (!applyData) return;

  const programData = applyData[programVal];
  if (!programData) return;

  const termData = programData[termVal];
  if (!termData) return;

  // Clear and add new subjects
  originalSelect.innerHTML = '';
  termData.forEach(subject => {
    const option = document.createElement('option');
    option.value = subject;
    option.textContent = subject;
    originalSelect.appendChild(option);
  });
}


// === Add Subject Field ===
function addSubjectField() {
  const maxClones = getMaxClones();
  if (allSelects.length >= maxClones) {
    alert("No Subjects Available");
    return;
  }

  let newSelect;
  const selectedValues = getSelectedValues();

  if (allSelects.length === 0) {
    subjectWrapper.style.display = 'block';
    originalSelect.style.display = 'block';
    originalSelect.style.marginBottom = '15px';

    for (let opt of originalSelect.options) {
      if (!selectedValues.includes(opt.value)) {
        originalSelect.value = opt.value;
        break;
      }
    }
    newSelect = originalSelect;
  } else {
    const wrapper = document.createElement('div');
    newSelect = originalSelect.cloneNode(false);
    newSelect.name = 'mqcqc_subjects_list[]';
    newSelect.className = 'form-value1';
    newSelect.style.width = '100%';
    newSelect.style.marginBottom = '15px';

    let firstOptionSet = false;
    Array.from(originalSelect.options).forEach(opt => {
      if (!selectedValues.includes(opt.value)) {
        const newOption = document.createElement('option');
        newOption.value = opt.value;
        newOption.textContent = opt.textContent;
        newSelect.appendChild(newOption);

        if (!firstOptionSet) {
          newSelect.value = opt.value;
          firstOptionSet = true;
        }
      }
    });

    wrapper.appendChild(newSelect);
    addContainer.appendChild(wrapper);
  }

  allSelects.push(newSelect);
  btnContainer.style.display = 'flex';
}


// === Update All Clones ===
function updateAllClones() {
  allSelects.forEach(sel => {
    if (sel !== originalSelect) {
      const selectedValues = getSelectedValues(sel);
      sel.innerHTML = '';
      let firstOptionSet = false;

      Array.from(originalSelect.options).forEach(opt => {
        if (!selectedValues.includes(opt.value)) {
          const newOption = document.createElement('option');
          newOption.value = opt.value;
          newOption.textContent = opt.textContent;
          sel.appendChild(newOption);

          if (!firstOptionSet) {
            sel.value = opt.value;
            firstOptionSet = true;
          }
        }
      });
    }
  });
}


// === Delete Subject Field ===
function deleteSubjectField() {
  if (allSelects.length === 0) return;

  const lastSelect = allSelects[allSelects.length - 1];

  if (lastSelect !== originalSelect) {
    lastSelect.parentElement.remove();
    allSelects.pop();
  } else {
    originalSelect.value = '';
    subjectWrapper.style.display = 'none';
    allSelects.pop();
  }
}


// === Clear All Subjects ===
function clearAllSubjects() {
  allSelects.slice(1).forEach(sel => sel.parentElement.remove());
  allSelects.length = 0;
  allSelects.push(originalSelect);

  originalSelect.value = '';
  populateOriginalOptions();
  subjectWrapper.style.display = 'block';
  btnContainer.style.display = 'flex';
}


// === Event Listeners ===
addButton.addEventListener('click', addSubjectField);
deleteButton.addEventListener('click', deleteSubjectField);

const observer = new MutationObserver(updateAllClones);
observer.observe(originalSelect, { childList: true, subtree: true });

studentType.addEventListener('change', () => {
  if (studentType.value === 'Regular') clearAllSubjects();
});


// === Handle “Applying For” Change ===
applyingFor.addEventListener("change", () => {
  const val = applyingFor.value.trim().toLowerCase();
  const isBasic = checkIsBasicOrElemOrHigh(val);

  if (isBasic) {
 
    allSelects.forEach((sel, i) => {
      if (i > 0 && sel.parentElement) sel.parentElement.remove();
    });
    allSelects.length = 0;
    allSelects.push(originalSelect);


    originalSelect.innerHTML = "";
    const naOption = document.createElement("option");
    naOption.value = "N/A";
    naOption.textContent = "N/A";
    originalSelect.appendChild(naOption);
    originalSelect.value = "N/A";


    btnContainer.style.display = "none";
    addContainer.innerHTML = "";

    
    if (dpAdditionalSubject) {
      dpAdditionalSubject.style.display = "none";
      dpAdditionalSubject.value = "N/A";
    }


    subjectWrapper.style.display = "block";

  } else {

    populateOriginalOptions();
    subjectWrapper.style.display = "block";

    if (studentType.value === "Irregular") {
      btnContainer.style.display = "flex";
    } else {
      btnContainer.style.display = "none";
    }

    if (dpAdditionalSubject) dpAdditionalSubject.style.display = "block";
  }
});
