// main.js
document.addEventListener("DOMContentLoaded", function () {
  const studentType = document.getElementById("mqcqc_student_type");
  const subjectsGroup = document.getElementById("ADD_SUBJECTS");
  const subjectsSelect = document.getElementById("mqcqc_subjects_list");
  const addBtnWrapper = document.getElementById("ADD_BTN_SUB"); // Add/Delete buttons wrapper

  const applyingFor = document.getElementById("mqcqc_applying_for");
  const program = document.getElementById("mqcqc_academic_program");
  const term = document.getElementById("mqcqc_academic_term");
  const studentBackground = document.getElementById("mqcqc_student_background");
  const dpAdditionalSubject = document.getElementById("dpAdditional_subject");

  // --- Default student type ---
  if (studentType) studentType.value = "Regular";

  function resetSubjects() {
    subjectsSelect.innerHTML = "";
  }

  function populateSubjects() {
    const isIrregular = studentType.value === "Irregular";

    // Hide subjects group and clear subjects if Regular
    if (!isIrregular) {
      if (subjectsGroup) subjectsGroup.style.display = "none";
      resetSubjects();
      if (addBtnWrapper) addBtnWrapper.style.display = "none";
      return;
    }

    // Show Add/Delete buttons for Irregular students
    if (addBtnWrapper) addBtnWrapper.style.display = "flex";
    if (subjectsGroup) subjectsGroup.style.display = "flex";

    const applyVal = applyingFor.value.trim();
    const programVal = program.value.trim();
    const termVal = term.value.trim();

    if (termVal !== "1st Semester" && termVal !== "2nd Semester") {
      resetSubjects();
      return;
    }

    if (!window.subjectsData) return;

    const applyData = subjectsData[applyVal];
    if (!applyData) return;
    const programData = applyData[programVal];
    if (!programData) return;
    const termData = programData[termVal];
    if (!termData) return;

    resetSubjects();
    termData.forEach(subject => {
      const option = document.createElement("option");
      option.value = subject;
      option.textContent = subject;
      subjectsSelect.appendChild(option);
    });
  }

  // Show subjects group on clicking Add Subjects
  if (addBtnWrapper) {
    addBtnWrapper.addEventListener("click", function () {
      if (subjectsGroup) subjectsGroup.style.display = "flex";
    });
  }

  // Handle Apply For changes
  applyingFor.addEventListener("change", () => {
    const val = applyingFor.value.trim().toLowerCase().replace(/\s+/g, " ");

    const isBasicOrElemOrHigh =
      val.includes("nursery") ||
      val.includes("kinder") ||
      val.includes("preparatory") ||
      val.includes("grade 1") ||
      val.includes("grade 2") ||
      val.includes("grade 3") ||
      val.includes("grade 4") ||
      val.includes("grade 5") ||
      val.includes("grade 6") ||
      val.includes("junior high school grade 7") ||
      val.includes("junior high school grade 8") ||
      val.includes("junior high school grade 9") ||
      val.includes("junior high school grade 10");

    // Always hide buttons first when Apply For changes
    if (addBtnWrapper) addBtnWrapper.style.display = "none";

    if (isBasicOrElemOrHigh) {
      // Disable fields and set values
// Re-enable fields for SHS/HE
[program, term, studentType, studentBackground].forEach(el => {
  if (el) {
    if (el.tagName === "SELECT") el.selectedIndex = 0;
    else el.value = "";
    el.disabled = false;
    el.required = true;
    el.style.display = "none";
  }
});




      // Hide subjects group
      if (subjectsGroup) subjectsGroup.style.display = "none";

      // Clear subjects
      resetSubjects();
    } else {
      // Re-enable fields for SHS/HE
      [program, term, studentType, studentBackground].forEach(el => {
        if (el) {
          if (el.tagName === "SELECT") el.selectedIndex = 0;
          else el.value = "";
          el.disabled = false;
          el.required = true;
          el.style.display = "block";
        }
      });

      // Show Add/Delete buttons only if Irregular
      if (studentType.value === "Irregular" && addBtnWrapper) {
        addBtnWrapper.style.display = "flex";
      }
    }

    // Refresh subjects
    populateSubjects();
  });

  // Watch changes for dynamic population
  [studentType, applyingFor, program, term].forEach(el => {
    el.addEventListener("change", populateSubjects);
    el.addEventListener("input", populateSubjects);
  });

// Safe populate only if not basic/elem/high
const val = applyingFor.value.trim().toLowerCase();
const isBasic = val.includes("nursery") || val.includes("kinder") || val.includes("grade");
if (!isBasic) populateSubjects();

});
