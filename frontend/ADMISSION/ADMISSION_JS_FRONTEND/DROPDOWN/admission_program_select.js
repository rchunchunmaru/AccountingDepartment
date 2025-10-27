document.addEventListener('DOMContentLoaded', function () {
  const programOptions = [
    { header: "SENIOR HIGHSCHOOL", items: [
        "Accountancy Business and Management (ABM) Strand",
        "Humanities and Social Science (HUMSS) Strand",
        "General Academic (GAS) Strand",
        "Technical Vocational Track Information and Technology (ICT) Strand",
        "Technical Vocational Track Home Economics (HE) Strand"
    ]},
    { header: "COLLEGE", items: [
        "Bachelor of Science in Accountancy",
        "Bachelor of Science in Business Administration (Major in Financial Management)",
        "Bachelor of Science in Business Administration (Major in Marketing Management)",
        "Bachelor of Science in Business Administration (Major in Human Resources Development Management)",
        "Bachelor of Science in Criminology",
        "Bachelor of Science in Psychology",
        "Bachelor of Science in Hospitality Management",
        "Bachelor of Science in Tourism Management",
        "Bachelor of Science in Information Technology", 
        "Bachelor of Science in Elementary Education",
        "Bachelor of Science in Secondary Education Major in English"
    ]}
  ];

  const programWrapper = document.querySelector('.program-wrapper');
  const programInput = document.getElementById('mqcqc_academic_program');
  const applyInput = document.getElementById('mqcqc_applying_for');
  const termSelect = document.getElementById('mqcqc_academic_term');
  const subjectsSelect = document.getElementById('mqcqc_subjects_list');

  const programDropdown = document.createElement('ul');
  programDropdown.className = 'program-dropdown';
  programWrapper.appendChild(programDropdown);

  let currentIndex = -1;

  // --- Reset Program ---
  function resetProgram() {
    programInput.value = '';
    programDropdown.innerHTML = '';
    programDropdown.style.display = 'none';
    if (subjectsSelect) subjectsSelect.innerHTML = '';
  }

  // --- Update Program Dropdown ---
  function updateProgramDropdown(filter = '') {
    const applyVal = applyInput.value.trim();
    programDropdown.innerHTML = '';
    currentIndex = -1;

    let allowedHeaders = [];
    const SHS = ["Senior High School Grade 11", "Senior High School Grade 12"];
    const HE = ["Freshmen (1st Year)", "2nd year", "3rd year", "4th year"];

    if (SHS.includes(applyVal)) allowedHeaders = ["SENIOR HIGHSCHOOL"];
    else if (HE.includes(applyVal)) allowedHeaders = ["COLLEGE"];
    else allowedHeaders = [];

    let hasResults = false;

    programOptions.forEach(group => {
      if (!allowedHeaders.includes(group.header)) return;

      const filteredItems = group.items.filter(option =>
        option.toLowerCase().includes(filter.toLowerCase())
      );

      if (filteredItems.length > 0) {
        hasResults = true;

        const header = document.createElement('li');
        header.textContent = group.header;
        header.classList.add('dropdown-header');
        programDropdown.appendChild(header);

        filteredItems.forEach(option => {
          const li = document.createElement('li');
          li.textContent = option;

          li.addEventListener('mousedown', e => {
            e.preventDefault();
            programInput.value = option; // Update input value
            programDropdown.style.display = 'none';
            updateSubjects(); // Update subjects but do NOT show field
          });

          programDropdown.appendChild(li);
        });
      }
    });

    programDropdown.style.display = hasResults ? 'block' : 'none';
  }

  // --- Update Subjects WITHOUT showing field ---
  function updateSubjects() {
    const applyVal = applyInput.value.trim();
    const programVal = programInput.value.trim();
    const termVal = termSelect?.value || "1st Semester";

    if (!applyVal || !programVal || !subjectsSelect) return;

    const subjects = window.subjectsData?.[applyVal]?.[programVal]?.[termVal] || [];

    subjectsSelect.innerHTML = subjects.map(s => `<option>${s}</option>`).join('');
  }

  // --- Event Listeners ---
  applyInput.addEventListener('change', () => {
    resetProgram();
    updateProgramDropdown();
  });

  applyInput.addEventListener('input', () => {
    resetProgram();
    updateProgramDropdown();
  });

  programInput.addEventListener('focus', () => updateProgramDropdown(''));
  programInput.addEventListener('input', () => updateProgramDropdown(programInput.value));

  termSelect?.addEventListener('change', updateSubjects);

  document.addEventListener('mousedown', e => {
    if (!programWrapper.contains(e.target)) {
      programDropdown.style.display = 'none';
    }
  });

  // Auto show programs on page load if applyInput has value
  if (applyInput.value) {
    updateProgramDropdown('');
  }
});
