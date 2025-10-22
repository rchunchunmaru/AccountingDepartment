document.addEventListener('DOMContentLoaded', function () {
  const programOptions = [
    
  
    { header: "CHOOSE N/A IF NOT APPLICABLE", items: ["N/A"]},
 
     
    { header: "SENIOR HIGHSCHOOL", items: ["Accountancy Business and Management (ABM) Strand",
                                            "Humanities and Social Science (HUMSS) Strand",
                                            "General Academic (GAS) Strand",
                                            "Technical Vocational Track Information and Technology (ICT) Strand",
                                            "Technical Vocational Track Home Economics (HE) Strand"]},

    { header: "COLLEGE", items: ["Bachelor of Science in Accountancy",
                                 "Bachelor of Science in Business Administration (Major in Financial Management)",
                                 "Bachelor of Science in Business Administration (Major in Marketing Management)",
                                 "Bachelor of Science in Business Administration (Major in Human Resources Development Management)",
                                 "Bachelor of Science in Criminology",
                                 "Bachelor of Science in Psychology",
                                 "Bachelor of Science in Hospitality Management",
                                 "Bachelor of Science in Tourism Management",
                                 "Bachelor of Science in Information Technology", 
                                 "Bachelor of Science in Elementary Education",
                                 "Bachelor of Science in Secondary Education Major in English"]},
  ];

  const programWrapper = document.querySelector('.program-wrapper');
  const programInput = document.getElementById('mqcqc_academic_program'); // Input field

  const programDropdown = document.createElement('ul');
  programDropdown.className = 'program-dropdown';
  programWrapper.appendChild(programDropdown);

  let currentIndex = -1;

  function updateProgramDropdown(filter = '') {
    programDropdown.innerHTML = '';
    currentIndex = -1;

    let hasResults = false;

    programOptions.forEach(group => {
      const filteredItems = group.items.filter(option =>
        option.toLowerCase().includes(filter.toLowerCase())
      );

      if (filteredItems.length > 0) {
        hasResults = true;

        // Add group header
        const header = document.createElement('li');
        header.textContent = group.header;
        header.classList.add('dropdown-header');
        programDropdown.appendChild(header);

        // Add items
        filteredItems.forEach(option => {
          const li = document.createElement('li');
          li.textContent = option;

          // Prevent blur closing
          li.addEventListener('mousedown', (e) => {
            e.preventDefault();
            programInput.value = option;
            programDropdown.style.display = 'none';
          });

          programDropdown.appendChild(li);
        });
      }
    });

    programDropdown.style.display = hasResults ? 'block' : 'none';
  }

  // Show dropdown on focus or typing
  programInput.addEventListener('focus', () => updateProgramDropdown(''));
  programInput.addEventListener('input', () => updateProgramDropdown(programInput.value));

  // Close dropdown when clicking outside
  document.addEventListener('mousedown', (e) => {
    if (!programWrapper.contains(e.target)) {
      programDropdown.style.display = 'none';
    }
  });
});
