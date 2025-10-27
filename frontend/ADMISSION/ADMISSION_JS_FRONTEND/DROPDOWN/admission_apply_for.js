document.addEventListener('DOMContentLoaded', function () {
  const applyForOptions = [
    { header: "BASIC EDUCATION", items: ["Nursery","Kinder","Preparatory"] }, 
    { header: "ELEMENTARY", items: ["Grade 1","Grade 2","Grade 3","Grade 4","Grade 5","Grade 6"] }, 
    { header: "HIGH SCHOOL", items: ["Junior High School Grade 7", "Junior High School Grade 8","Junior High School Grade 9", "Junior High School Grade 10"]}, 
    { header: "SENIOR HIGH SCHOOL", items: ["Senior High School Grade 11", "Senior High School Grade 12"] },
    { header: "HIGHER EDUCATION", items: ["Freshmen (1st Year)","2nd year","3rd year","4th year"] }
  ];

  const applyWrapper = document.querySelector('.applyfor-wrapper');
  const applyInput = document.getElementById('mqcqc_applying_for');
  const programInput = document.getElementById('mqcqc_academic_program');
  const studentTypeSelect = document.getElementById('mqcqc_student_type');
  const termSelect = document.getElementById('mqcqc_academic_term');
  const subjectsGroup = document.getElementById('ADD_SUBJECTS'); 
  const addSubjectBtn = document.getElementById('ADD_BTN_SUB'); // <-- Add Subject button

  const applyDropdown = document.createElement('ul');
  applyDropdown.className = 'applyfor-dropdown';
  applyWrapper.appendChild(applyDropdown);

  let currentIndex = -1;

  // --- Reset all dependent fields ---
  function resetDependentFields() {
    // Reset Program
    programInput.value = '';

    // Reset Student Type
    if (studentTypeSelect) studentTypeSelect.selectedIndex = 0;

    // Reset Term
    if (termSelect) termSelect.selectedIndex = 0;

    // Hide Subjects
    if (subjectsGroup) subjectsGroup.style.display = 'none';

    // Hide Add Subject Button
    if (addSubjectBtn) addSubjectBtn.style.display = 'none';
  }

  function updateApplyDropdown(filter = '') {
    applyDropdown.innerHTML = '';
    currentIndex = -1;

    let hasResults = false;

    applyForOptions.forEach(group => {
      const filteredItems = group.items.filter(option =>
        option.toLowerCase().includes(filter.toLowerCase())
      );

      if (filteredItems.length > 0) {
        hasResults = true;

        const header = document.createElement('li');
        header.textContent = group.header;
        header.classList.add('dropdown-header');
        applyDropdown.appendChild(header);

        filteredItems.forEach(option => {
          const li = document.createElement('li');
          li.textContent = option;

          li.addEventListener('mousedown', (e) => {
            e.preventDefault();
            applyInput.value = option;
            applyDropdown.style.display = 'none';

            // Reset all dependent fields whenever Apply For changes
            resetDependentFields();

            // Show/hide other fields
            const termGroup = document.getElementById("ADD_TERM");
            const studentTypeGroup = document.getElementById("ADD_STUDENT_TYPE");
            const programGroup = document.getElementById("ADD_PROGRAMS");

            const SHS = ["Senior High School Grade 11", "Senior High School Grade 12"];
            const HE = ["Freshmen (1st Year)", "2nd year", "3rd year", "4th year"];

            if (SHS.includes(option) || HE.includes(option)) {
              termGroup.style.display = "flex";
              studentTypeGroup.style.display = "flex";
              programGroup.style.display = "flex";

              termSelect.required = true;
              studentTypeSelect.required = true;
              programInput.required = true;
            } else {
              termGroup.style.display = "none";
              studentTypeGroup.style.display = "none";
              programGroup.style.display = "none";

              termSelect.required = false;
              studentTypeSelect.required = false;
              programInput.required = false;
            }
          });

          applyDropdown.appendChild(li);
        });
      }
    });

    applyDropdown.style.display = hasResults ? 'block' : 'none';
  }

  applyInput.addEventListener('focus', () => updateApplyDropdown(''));
  applyInput.addEventListener('input', () => updateApplyDropdown(applyInput.value));

  document.addEventListener('click', (e) => {
    if (!applyWrapper.contains(e.target)) applyDropdown.style.display = 'none';
  });
});
