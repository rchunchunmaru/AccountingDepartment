document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("confirmationModal");

  function filterConfirmationDisplay() {
    if (!modal.classList.contains("show")) return;

    const applyingFor =
      document.getElementById("applyingForDisplay")?.value?.toLowerCase().trim() || "";

    // === Get element groups ===
    const termGroup = document.getElementById("academicTermDisplay")?.closest(".ADD_input-group2");
    const studentTypeGroup = document.getElementById("student_typeDisplay")?.closest(".ADD_input-group2");
    const programGroup = document.getElementById("academicProgramDisplay")?.closest(".ADD_input-group2");
    const strandGroup = document.getElementById("programStrandDisplay")?.closest(".ADD_input-group2");
    const yearLevelGroup = document.getElementById("yearLevelDisplay")?.closest(".ADD_input-group1");
    const lrnGroup = document.getElementById("lrnDisplay")?.closest(".ADD_input-group1");
    const additionalSubjects = document.getElementById("dpAdditional_subject");

    const groups = [termGroup, studentTypeGroup, programGroup, strandGroup, yearLevelGroup, lrnGroup];

    // === RESET ALL TO DEFAULT (visible + clear old N/A) ===
    groups.forEach(group => {
      if (group) {
        group.style.display = "flex";
        const input = group.querySelector("input[readonly], select[readonly]");
        if (input && input.value === "N/A") input.value = "";
      }
    });

    // === Define keywords for each category (all lowercase) ===
    const collegeKeywords = [
      "freshmen (1st year)",
      "2nd year",
      "3rd year",
      "4th year"
    ];

    const seniorKeywords = [
      "senior high school grade 11",
      "senior high school grade 12"
    ];

    const basicKeywords = [
      "nursery",
      "kinder",
      "preparatory",
      "grade 1",
      "grade 2",
      "grade 3",
      "grade 4",
      "grade 5",
      "grade 6",
      "junior high school grade 7",
      "junior high school grade 8",
      "junior high school grade 9",
      "junior high school grade 10"
    ];

    // === Check which category applies ===
    const isCollege = collegeKeywords.some(keyword => applyingFor.includes(keyword));
    const isSenior = seniorKeywords.some(keyword => applyingFor.includes(keyword));
    const isBasic  = basicKeywords.some(keyword => applyingFor.includes(keyword));

    // === FILTER RULES (Show/Hide sections per applicant type) ===
    if (isCollege || isSenior) {
      // College and Senior High → Show everything
      groups.forEach(group => group && (group.style.display = "flex"));
      
      // Show Additional Subjects table
      if (additionalSubjects) additionalSubjects.style.display = "block";

    } else if (isBasic) {
      // Nursery to Junior High → Hide some groups
      if (termGroup) termGroup.style.display = "none";
      if (studentTypeGroup) studentTypeGroup.style.display = "none";
      if (programGroup) programGroup.style.display = "none";

      // Hide Additional Subjects table
      if (additionalSubjects) additionalSubjects.style.display = "none";
    }

    // === SET "N/A" FOR EMPTY FIELDS (no hiding) ===
    modal.querySelectorAll("input[readonly], select[readonly]").forEach(input => {
      if (!input.value || input.value.trim() === "") {
        input.value = "N/A";
      }
    });
  }

  // === Detect when modal is shown or hidden ===
  const observer = new MutationObserver(() => {
    if (modal.classList.contains("show")) {
      setTimeout(filterConfirmationDisplay, 300); // delay ensures values load first
    } else {
      // Reset all groups when modal closes
      const allGroups = modal.querySelectorAll(".ADD_input-group1, .ADD_input-group2");
      allGroups.forEach(group => {
        group.style.display = "flex";
        const input = group.querySelector("input[readonly], select[readonly]");
        if (input && input.value === "N/A") input.value = "";
      });
    }
  });

  observer.observe(modal, { attributes: true, attributeFilter: ["class"] });
});
