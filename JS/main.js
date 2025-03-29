var bookMarkName = document.getElementById("bookMarkName");
var websiteUrl = document.getElementById("websiteUrl");
var submitBtn = document.getElementById("submitBtn");
var searchInput = document.getElementById("searchInput");
var updateBtn = document.getElementById("updateBtn");
var bookMarks = [];
if (localStorage.getItem("bookMarks")) {
  bookMarks = JSON.parse(localStorage.getItem("bookMarks"));
  display();
}
submitBtn.addEventListener("click", function () {
  if (validation("bookMarkName") && validation("websiteUrl")) {
    for(var i=0;i<bookMarks.length;i++){
      var isDuplicate=false;
      if(bookMarks[i].bookMarkName.toLowerCase()===bookMarkName.value.toLowerCase()){
        isDuplicate=true
        Swal.fire({
          icon: "info",
          html: `
            <h4 class="fw-bold">You've added this book mark before, please add a new one </h4>
          `,
          showCloseButton: true,
        });
        clearData()
        break
      }
    }
    if(!isDuplicate){
      var bookMark = {
        bookMarkName: bookMarkName.value,
        websiteUrl: websiteUrl.value,
      };
      bookMarks.push(bookMark);
      localStorage.setItem("bookMarks", JSON.stringify(bookMarks));
      display();
      clearData();
    }
  } else {
    Swal.fire({
      padding: "15px",
      html: `
        <div class="d-flex">
            <div><i class=" fa-solid fa-circle text-danger me-2"></i></div>
            <div><i class=" fa-solid fa-circle text-warning me-2"></i></div>
            <div><i class=" fa-solid fa-circle text-success me-2"></i></div>
        </div>
        <div class="pt-4 pb-3">
          <h5 class="fw-bold text-start mt-2">Site Name or URL is not valid. Please follow the rules below:</h5>
          <div class="text-start mt-4">
            <div class="mb-3">
              <span class="fa-stack small text-danger me-1">
                <i class="fa-regular fa-circle fa-stack-2x"></i>
                <i class="fa-solid fa-arrow-right fa-stack-1x "></i>
              </span>
              <span class="fs-6 text-black">Site name must contain at least 3 characters</span>
            </div>
            <div>
            <div>
              <span class="fa-stack small text-danger me-1">
                <i class="fa-regular fa-circle fa-stack-2x"></i>
                <i class="fa-solid fa-arrow-right fa-stack-1x "></i>
              </span>
            <span class="fs-6 text-black">Site URL must be a valid one, like :</span>
            <ul class="fs-6 text-black mt-3 list-unstyled ps-4 ms-2"> 
            <li class="mb-2">https://www.google.com </li> 
            <li class="mb-2">http://facebook.com </li>  
            <li class="mb-2">getbootstrap.com/ </li> 
            <li class="mb-2">https://my-site.org/news</li> 
            <li class="mb-2">abc.com</li>  
            </ul>
          </div>
        </div>
        `,
      showConfirmButton: false,
      showCloseButton: true,
    });
  }
});
updateBtn.addEventListener("click", function () {
  updateBookMark(indexBookMark);
});
bookMarkName.addEventListener("input", function () {
  validation("bookMarkName");
});
websiteUrl.addEventListener("input", function () {
  validation("websiteUrl");
});
searchInput.addEventListener("input",searchBookMark);

function display() {
  var cartona = ``;
  for (var i = 0; i < bookMarks.length; i++) {
    cartona += `
          <tr>
            <th scope="row">${i + 1}</th>
            <td class="">${bookMarks[i].bookMarkName}</td>
            <td><a href="${
              bookMarks[i].websiteUrl
            }" target="_blank" class="text-decoration-none"><button class="btn visit text-white"><i class="fa-solid fa-eye me-2"></i>Visit</button></a></td>
            <td><button onclick="setInputValue(${i})" class="btn update text-white"><i class="fa-solid fa-pen-to-square me-2"></i>Update</button></td>
            <td><button onclick="deleteBookMark(${i})" class="btn btn-danger"><i class="fa-solid fa-trash-can me-2"></i>Delete</button></td>
          </tr>
    
    `;
  }
  document.querySelector("tbody").innerHTML = cartona;
}
function clearData() {
  bookMarkName.value = null;
  websiteUrl.value = null;
  bookMarkName.classList.remove("is-valid");
  websiteUrl.classList.remove("is-valid");
}
function validation(idInput) {
  var regex;
  var currentInput = document.getElementById(idInput);
  switch (idInput) {
    case "bookMarkName":
      regex = /^\w{3,}(\s*\w+)*$/;
      break;
    case "websiteUrl":
      regex =
        /^(https:\/\/|http:\/\/)?(www\.)?[a-zA-Z0-9\-]{2,}\.[a-zA-Z]{2,}(\/[a-zA-Z0-9\-]*)?$/;
      break;
  }
  var testString = currentInput.value;
  if (regex.test(testString)) {
    currentInput.classList.add("is-valid");
    currentInput.classList.remove("is-invalid");
    return true;
  } else {
    currentInput.classList.add("is-invalid");
    currentInput.classList.remove("is-valid");
    return false;
  }
}
function deleteBookMark(indexBookMark) {
  bookMarks.splice(indexBookMark, 1);
  localStorage.setItem("bookMarks", JSON.stringify(bookMarks));
  display();
}
function searchBookMark() {
  var term = searchInput.value;
  var cartona = ``;
  for (var i = 0; i < bookMarks.length; i++) {
    if (bookMarks[i].bookMarkName.toLowerCase().includes(term.toLowerCase())) {
      cartona += `
          <tr>
            <th scope="row">${i + 1}</th>
            <td class="">${bookMarks[i].bookMarkName}</td>
            <td><a href="${
              bookMarks[i].websiteUrl
            }" target=_blank><button class="btn visit text-white"><i class="fa-solid fa-eye me-2"></i>Visit</button></a></td>
            <td><button onclick="setInputValue(${i})" class="btn update text-white"><i class="fa-solid fa-pen-to-square me-2"></i>Update</button></td>
            <td><button onclick="deleteBookMark(${i})" class="btn btn-danger"><i class="fa-solid fa-trash-can me-2"></i>Delete</button></td>
          </tr>
    
    `;
    }
  }
  if (cartona === ``) {
    cartona = `<tr>
            <td colspan="5" class="text-center">
              <div class="alert alert-secondary" role="alert">
                No bookmarks found matching your search.
              </div>
            </td>
          </tr>`;
  }
  document.querySelector("tbody").innerHTML = cartona;
}
var indexBookMark;
function setInputValue(index) {
  indexBookMark = index;
  bookMarkName.value = bookMarks[indexBookMark].bookMarkName;
  websiteUrl.value = bookMarks[indexBookMark].websiteUrl;
  updateBtn.classList.remove("d-none");
  submitBtn.classList.add("d-none");
}
function updateBookMark(indexBookMark) {
  bookMarks[indexBookMark].bookMarkName = bookMarkName.value;
  bookMarks[indexBookMark].websiteUrl = websiteUrl.value;
  localStorage.setItem("bookMarks", JSON.stringify(bookMarks));
  display();
  updateBtn.classList.add("d-none");
  submitBtn.classList.remove("d-none");
  clearData();
}
function updateViewPort(){
  const viewPort=document.getElementById("viewPort")
  const width=window.innerWidth
  if(width<=768){
    viewPort.setAttribute('content', 'width=device-width, initial-scale=0.7');
  }else{
    viewPort.setAttribute('content', 'width=device-width, initial-scale=1.0');
  }
}
window.addEventListener('load', updateViewPort);
window.addEventListener('resize', updateViewPort);