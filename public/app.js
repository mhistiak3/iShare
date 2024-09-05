const dropzone = document.getElementById("dropzone");
const fileInput = document.getElementById("fileInput");
const uploadButton = document.getElementById("uploadButton");
const fileList = document.getElementById("fileList");

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

fileInput.addEventListener("change", () => {
  //   handleFiles(fileInput.files);
});

uploadButton.addEventListener("click", () => {
  handleFiles(fileInput.files);
});

function handleFiles(files) {
  for (const file of files) {
    const fileItem = document.createElement("li");
    fileItem.className = "flex justify-between items-center p-2 border-b";
    fileItem.innerHTML = `
          <span class="truncate text-gray-700">${file.name}</span>
          <button class="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 transition">Download</button>
        `;
    fileList.appendChild(fileItem);
  }
  // Clear file input after handling files
  fileInput.value = "";
}
