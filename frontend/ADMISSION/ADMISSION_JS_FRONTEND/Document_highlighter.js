document.addEventListener("DOMContentLoaded", () => {
  const dropzones = document.querySelectorAll('.Admission_dropzone');

  dropzones.forEach(dropzone => {
    const input = dropzone.querySelector('input[type="file"]');
    const placeholderText = dropzone.querySelector('span.placeholder-text');
    const helperText = dropzone.querySelector('small.Admission_text');

    // Create loading bars if not present (optional, or you can keep them in HTML)
    let loadingTop = dropzone.querySelector('.loading-top');
    let loadingRight = dropzone.querySelector('.loading-right');
    let loadingBottom = dropzone.querySelector('.loading-bottom');
    let loadingLeft = dropzone.querySelector('.loading-left');

    if (!loadingTop) {
      loadingTop = document.createElement('div');
      loadingTop.className = 'loading-top';
      dropzone.appendChild(loadingTop);
    }
    if (!loadingRight) {
      loadingRight = document.createElement('div');
      loadingRight.className = 'loading-right';
      dropzone.appendChild(loadingRight);
    }
    if (!loadingBottom) {
      loadingBottom = document.createElement('div');
      loadingBottom.className = 'loading-bottom';
      dropzone.appendChild(loadingBottom);
    }
    if (!loadingLeft) {
      loadingLeft = document.createElement('div');
      loadingLeft.className = 'loading-left';
      dropzone.appendChild(loadingLeft);
    }

    // Create file info container dynamically
    const fileInfoContainer = document.createElement('span');
    fileInfoContainer.className = 'file-info';
    fileInfoContainer.style.display = 'none';
    fileInfoContainer.style.alignItems = 'center';
    fileInfoContainer.style.gap = '5px';
    fileInfoContainer.style.fontSize = 'var(--text-xxsmall)';
    fileInfoContainer.style.color = 'var(--primary-color)';
    fileInfoContainer.style.userSelect = 'none'; // prevent selection

    const fileNameElem = document.createElement('span');
    fileNameElem.className = 'file-name';

    const fileSizeElem = document.createElement('span');
    fileSizeElem.className = 'file-size';
    fileSizeElem.style.color = 'gray';

    const removeBtn = document.createElement('button');
    removeBtn.type = 'button';
    removeBtn.className = 'remove-file';
    removeBtn.title = 'Remove file';
    removeBtn.textContent = '×';
    removeBtn.style.cursor = 'pointer';
    removeBtn.style.background = 'transparent';
    removeBtn.style.border = 'none';
    removeBtn.style.fontWeight = 'bold';
    removeBtn.style.fontSize = '18px';
    removeBtn.style.lineHeight = '1';
    removeBtn.style.color = 'red';
    removeBtn.style.padding = '0';

    fileInfoContainer.appendChild(fileNameElem);
    fileInfoContainer.appendChild(fileSizeElem);
    fileInfoContainer.appendChild(removeBtn);

    dropzone.appendChild(fileInfoContainer);

    // Remove file button functionality
    removeBtn.addEventListener('click', () => {
      input.value = '';
      if (placeholderText) placeholderText.textContent = 'Browse Files';
      if (helperText) helperText.textContent = 'Drag and Drop Files Here';
      fileInfoContainer.style.display = 'none';
    });

    input.addEventListener('change', () => {
      const file = input.files[0];
      if (!file) return;

      // Add loading class to disable hover if needed
      dropzone.classList.add('loading');

      // Reset loading bars
      loadingTop.style.width = '0';
      loadingRight.style.height = '0';
      loadingBottom.style.width = '0';
      loadingLeft.style.height = '0';

      // Show loading bars
      [loadingTop, loadingRight, loadingBottom, loadingLeft].forEach(el => el.style.display = 'block');

      // Hide file info during loading
      fileInfoContainer.style.display = 'none';

      // Animate loading bars in sequence
      requestAnimationFrame(() => { loadingTop.style.width = '100%'; });
      setTimeout(() => { loadingRight.style.height = '100%'; }, 400);
      setTimeout(() => { loadingBottom.style.width = '100%'; }, 800);
      setTimeout(() => { loadingLeft.style.height = '100%'; }, 1200);

      setTimeout(() => {
        [loadingTop, loadingRight, loadingBottom, loadingLeft].forEach(el => el.style.display = 'none');
        dropzone.classList.remove('loading');

        fileNameElem.textContent = file.name;
        fileSizeElem.textContent = `(${formatFileSize(file.size)})`;
        fileInfoContainer.style.display = 'inline-flex';

        if (placeholderText) placeholderText.textContent = '';
        if (helperText) helperText.textContent = '';
      }, 1600);
    });
  });

  function formatFileSize(bytes) {
    if (bytes < 1024) return `${bytes} B`;
    else if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
    else return `${(bytes / 1048576).toFixed(1)} MB`;
  }
});
