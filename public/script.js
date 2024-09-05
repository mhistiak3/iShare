// socket
const socket = io();
socket.on("updateFileList", (files) => {
  console.log(files);
});

// selection
const dropzone = document.getElementById("dropzone");
const fileInput = document.getElementById("fileInput");
const uploadButton = document.getElementById("uploadButton");
const fileList = document.getElementById("fileList");

// For Drag and Drop
dropzone.addEventListener("dragover", (e) => {
  e.preventDefault();
  dropzone.classList.add("hover");
});
dropzone.addEventListener("dragleave", () => {
  dropzone.classList.remove("hover");
});

dropzone.addEventListener("drop", (e) => {
  e.preventDefault();
  dropzone.classList.remove("hover");
  fileInput.files = e.dataTransfer.files;
});

dropzone.addEventListener("click", () => {
  fileInput.click();
});

// upload Files
uploadButton.addEventListener("click", () => {
  handleFiles(fileInput.files[0]);
});

// Handle Uploded Files
async function handleFiles(file) {
  if (file) {
    try {
      // If file is vailable
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/v1/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      console.log(result);

      showAlert(result.message);
    } catch (error) {
      console.log(error);

      return showAlert(error, "error");
    }
  } else {
    // file not upload
    showAlert("Please select a file", "error");
  }
  // Clear file input after handling files
  fileInput.value = "";
}

// Uploaded FileList
function uploadedFileList(files) {
  fileList.innerHTML = "";
  for (const file of files) {
    const fileItem = document.createElement("li");
    fileItem.className = "flex justify-between items-center p-2 border-b";
    fileItem.innerHTML = `
          <span class="truncate text-gray-700">${file.filename}</span>
          <button class="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 transition" onclick="fileDownload('${file.filename}')">Download</button>
        `;
    fileList.appendChild(fileItem);
  }
}
async function fileDownload(filename) {
  try {
    const response = await fetch(`/api/v1/download/${filename}`);

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);

    // create ancer
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    showAlert(error);
  }
}

// Socket
socket.on("updateFileList", (files) => {
  uploadedFileList(files);
  console.log(files);
});

// Alert Funtion
function showAlert(message, type = "success", duration = 3000) {
  const alertContainer = document.getElementById("alertContainer");

  // Create alert div
  const alertDiv = document.createElement("div");
  alertDiv.className = `flex items-center p-4 mb-4 w-full max-w-xs mx-auto text-sm rounded-lg shadow-md transition-transform duration-300 transform translate-x-full ${
    type === "success"
      ? "bg-green-50 border-l-4 border-green-500 text-green-700"
      : "bg-red-50 border-l-4 border-red-500 text-red-700"
  }`;

  alertDiv.innerHTML = `
    <div class="flex-shrink-0">
      ${
        type === "success"
          ? `<svg class="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 00-1.414 0L9 11.586l-2.293-2.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l7-7a1 1 0 000-1.414z" clip-rule="evenodd"></path></svg>`
          : `<svg class="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M8.257 3.099c.366-.446.985-.513 1.431-.148l.097.083 3.864 3.864a1 1 0 01.083 1.32l-.083.094-7.778 7.778a1 1 0 01-1.497-1.32l.083-.094L8.257 3.1zm2.478-.94a2 2 0 00-2.819.126l-.126.144-7.778 7.778a2 2 0 002.829 2.829l7.778-7.778a2 2 0 00.11-2.82l-.11-.126-.14-.144-.14-.127z" clip-rule="evenodd"></path></svg>`
      }
    </div>
    <div class="ml-3 text-sm font-medium">${message}</div>
    <button class="ml-auto p-1.5 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300" onclick="this.parentElement.remove()" aria-label="Close">
      <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 8.586l-4.95-4.95a1 1 0 10-1.414 1.414L8.586 10l-4.95 4.95a1 1 0 101.414 1.414L10 11.414l4.95 4.95a1 1 0 001.414-1.414L11.414 10l4.95-4.95a1 1 0 10-1.414-1.414L10 8.586z" clip-rule="evenodd"></path></svg>
    </button>
  `;

  // Append alert to the container
  alertContainer.appendChild(alertDiv);

  // Slide-in animation
  setTimeout(() => {
    alertDiv.classList.remove("translate-x-full");
  }, 100);

  // Automatically remove alert after the duration
  setTimeout(() => {
    alertDiv.classList.add("translate-x-full");
    setTimeout(() => {
      alertDiv.remove();
    }, 300);
  }, duration);
}
