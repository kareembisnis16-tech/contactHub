///////////////////////////////////////////////////////////////////

// regex بيحدد ميع الاي ديز ثم ينضه الايديز الي بين الكوتيشنز
// id="([^"]*)"      >>>>>>>>  alt+r to sellect all
// (?<=id=")[^"]+   >>>>>>>>  alt+r to sellect all

///////////////////////////////////////////////////////////////////
//   localStorage.setItem("contactStorage", JSON.stringify(contactList));
// i stringfy to read it >>   string > read an norm string
// i parse to display it >>  parse > display an obj
///////////////////////////////////////////////////////////////////
//DOCUMENTATIONS
//         <i class="${contactList[i].userEmergency ? " fa-heart text-danger" : "far"} fa-heart"></i>
// THE CORRECTION IS >>
//         <i class="${contactList[i].userEmergency ? "FAS fa-heart text-danger" : "far fa-heart"} fa-heart"></i>
// SO THAT 'FA-HEART' the class is always exist ,, the CHANGINGis in 'fas' to get colored 'far' to decolored

///////////////////////////////////////////////////////////////////

var addContactBtn = document.getElementById("addContactBtn");
var totalContacts = document.getElementById("totalContacts");
var totalFavContacts = document.getElementById("totalFavContacts");
var totalEmergencyContacts = document.getElementById("totalEmergencyContacts");
var totalContactsSpan = document.getElementById("totalContactsSpan");
var searchInput = document.getElementById("searchInput");
var contactCardContainer = document.getElementById("contactCardContainer");
var callBtn = document.getElementById("callBtn");
var emailBtn = document.getElementById("emailBtn");
var favBtn = document.getElementById("favBtn");
var emergncyBtn = document.getElementById("emergncyBtn");
var editBtn = document.getElementById("editBtn");
var deleteBtn = document.getElementById("deleteBtn");
var bigFavItem = document.getElementById("bigFavItem");
var emptyStateFav = document.getElementById("emptyStateFav");
var smallFavItem = document.getElementById("smallFavItem");
var bigEmergencyItem = document.getElementById("bigEmergencyItem");
var emptyStateEmergency = document.getElementById("emptyStateEmergency");
var smallEmergncyItem = document.getElementById("smallEmergncyItem");
var contactModal = document.getElementById("contactModal");
var modalTitle = document.getElementById("modalTitle");
var closeModalBtn = document.getElementById("closeModalBtn");
var contactForm = document.getElementById("contactForm");
var avatarPreview = document.getElementById("avatarPreview");
var avatarInput = document.getElementById("avatarInput");
var avatarPath = document.getElementById("avatarPath");
var contactName = document.getElementById("contactName");
var contactNameError = document.getElementById("contactNameError");
var contactPhone = document.getElementById("contactPhone");
var contactPhoneError = document.getElementById("contactPhoneError");
var contactEmail = document.getElementById("contactEmail");
var contactEmailError = document.getElementById("contactEmailError");
var contactAddress = document.getElementById("contactAddress");
var contactGroup = document.getElementById("contactGroup");
var contactNotes = document.getElementById("contactNotes");
var contactFavorite = document.getElementById("contactFavorite");
var contactEmergency = document.getElementById("contactEmergency");
var contactId = document.getElementById("contactId");
var cancelModalBtn = document.getElementById("cancelModalBtn");
var submitModalBtn = document.getElementById("submitModalBtn");
var currentIndex = null;
//////////////////////////////////////////////////////////////

function openModal() {
  contactModal.classList.remove("d-none");
  contactModal.classList.add("d-flex");
}
addContactBtn.addEventListener("click", openModal);
function closeModal() {
  contactModal.classList.add("d-none");
  contactModal.classList.remove("d-flex");
  clearInputs();
}
closeModalBtn.addEventListener("click", closeModal);
cancelModalBtn.addEventListener("click", closeModal);
//it close the modal if u click out overlay layer
contactModal.addEventListener("click", function (event) {
  if (event.target === contactModal) {
    closeModal();
  }
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
var contactList;
// *setup one*

var contactList = JSON.parse(localStorage.getItem("contactsStorage")) || [];
// displayContactUser();

// *setup two*

if (JSON.parse(localStorage.getItem("contactsStorage"))) {
  contactList = JSON.parse(localStorage.getItem("contactsStorage"));
  displayContactUser();
} else {
  contactList = [];
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

function addContact() {
  // event.preventDefault();

  contactUser = {
    userName: contactName.value,
    userEmail: contactEmail.value,
    userNumber: contactPhone.value,
    groupsvalue: getGroupColor(contactGroup.value),
    userAdress: contactAddress.value,
    userGroup: contactGroup.value,
    userNote: contactNotes.value,
    userFav: contactFavorite.checked,
    userEmergency: contactEmergency.checked,
    userImage: avatarPath.value ? avatarPath.value : "",
  };
}

function clearInputs() {
  contactName.value = "";
  contactEmail.value = "";
  contactPhone.value = "";
  contactAddress.value = "";
  contactGroup.value = "";
  contactNotes.value = "";
  contactFavorite.checked = false;
  contactEmergency.checked = false;
  avatarPath.value = "";
  avatarInput.value = "";
  currentIndex = null;
  avatarPreview.innerHTML = renderAvatar();
}

function displayContactUser() {
  var cartona = "";
  for (var i = 0; i < contactList.length; i++) {
    var colors = getGroupColor(contactList[i].userGroup);
    cartona += ` <div class="col-md-6 col-lg-12 col-xl-6 mb-4">
                            <div class="contact-card">

                                <div class="contact-card-header">
                                    <div class="d-flex align-items-start justify-content-start gap-3">
                                        <div class="position-relative flex-shrink-0  ">
                                       
                                        ${renderAvatar(contactList[i].userName, contactList[i].userImage)}


                                           ${
                                             contactList[i].userEmergency
                                               ? ` <div
                                                 class="badge-icon badge-heart d-flex justify-content-center align-items-center rounded-circle">
                                                 <i class="fas fa-heart-pulse"></i>
                                             </div>`
                                               : ""
                                           }
                                           ${
                                             contactList[i].userFav
                                               ? ` <div
                                                 class="badge-icon badge-star d-flex justify-content-center align-items-center rounded-circle">
                                                 <i class="fas fa-star"></i>
                                             </div>`
                                               : ""
                                           }
                                        </div>
                                        <div class="flex-1 min-w-0 pt-1">
                                            <h3 class="contact-card-name truncate m-0 ">${contactList[i].userName}</h3>
                                            <div class="d-flex align-items-center gap-2 mt-1">
                                                <div class="contact-card-phone-container flex-shrink-0">
                                                    <i class="contact-card-phone-icon fas fa-phone"></i>
                                                </div>
                                                <span class="contact-card-phone truncate">${contactList[i].userNumber}</span>
                                            </div>
                                        </div>
                                    </div>


                                    <div class="contact-details">
                                        <div class="contact-detail-item">
                                            <div
                                                class="contact-detail-icon-container d-flex align-items-center justify-content-center violet">
                                                <i class="contact-detail-icon violet fas fa-envelope"></i>
                                            </div>
                                            <span class="contact-detail-text truncate">${contactList[i].userEmail}</span>
                                        </div>

                                        <div class="contact-detail-item">
                                            <div
                                                class="contact-detail-icon-container d-flex align-items-center justify-content-center emerald">
                                                <i class="contact-detail-icon emerald fas fa-location-dot"></i>
                                            </div>
                                            <span class="contact-detail-text truncate">${contactList[i].userAdress}</span>
                                        </div>
                                    </div>

                                     ${
                                       contactList[i].userGroup
                                         ? `
                                      <div class="contact-tags">
                                        <span class="contact-tag d-inline-flex align-items-center" style="background-color:${colors.bg} ; color:${colors.text} ;  border: ${colors.border};">${contactList[i].userGroup}</span>
                                        </div>
                                        
                                        `
                                         : ""
                                     }
                                  
                                </div>


                                <div class="contact-card-actions">
                                    <div class="action-buttons-left">
                                        <a href="tel:${contactList[i].userNumber}" id="callBtn" class="action-button call" title="Call">
                                            <i class="fas fa-phone"></i>
                                        </a>

                                        <a href="mailto:${contactList[i].userEmail}" class="action-button email" id="emailBtn" title="Email">
                                            <i class="fas fa-envelope"></i>
                                        </a>
                                    </div>
                                    <div class="action-buttons-right">
                                        <button class="action-button favorite" id="favBtn" onclick="togleFavBtn(${[i]})" title="Favorite">
                                           
                                        <i class="${contactList[i].userFav ? " fas text-warning" : "far"} fa-star"></i>
                                        </button>
                                        <button class="action-button emergency" id="emergncyBtn"  onclick="togleEmergencyBtn(${[i]})" title="Emergency">
                                        <i class="${contactList[i].userEmergency ? "fas fa-heart text-danger" : "far fa-heart"} fa-heart"></i>
                                            


                                        </button>
                                        <button class="action-button edit" id="editBtn" onclick="prepForUpdateContact(${i})"title="Edit">
                                            <i class="fas fa-pen"></i>
                                        </button>
                                        <button class="action-button delete" onclick="deleteContact(${i})" id="deleteBtn" title="Delete">
                                            <i class="fas fa-trash"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>

                        </div>`;
  }
  contactCardContainer.innerHTML = cartona;
  totalContactc();
  updateFavoriteSidebar();
  updateEmergencySidebar();
}
function deleteContact(index) {
  // console.log(index);

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-danger me-3",
      cancelButton: "btn btn-secondary ",
    },
    buttonsStyling: false,
  });
  swalWithBootstrapButtons
    .fire({
      title: ` Delete Contact?`,
      text: `Are you sure you want to delete ${contactList[index].userName}? This action cannot be undone.`,
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "cancel",
      confirmButtonText: "Yes , delete it!",
      reverseButtons: false,
    })
    .then((result) => {
      if (result.isConfirmed) {
        //???
        // 1- delete
        contactList.splice(index, 1);
        //2- set data last update
        localStorage.setItem("contactsStorage", JSON.stringify(contactList));
        // 3- update display
        displayContactUser();
        ///

        swalWithBootstrapButtons.fire({
          title: "Deleted!",
          text: "Contact has been deleted.",
          icon: "success",
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false,
        });
      }
    });
}

function prepForUpdateContact(index) {
  currentIndex = index;
  updateContact = contactList[currentIndex];
  // console.log(updateContact);
  // 1- 3ayz ageeb el values = inputs
  contactName.value = updateContact.userName;
  contactEmail.value = updateContact.userEmail;
  contactPhone.value = updateContact.userNumber;
  contactAddress.value = updateContact.userAdress;
  contactGroup.value = updateContact.userGroup;
  contactNotes.value = updateContact.userNote;
  contactFavorite.checked = updateContact.userFav;
  contactEmergency.checked = updateContact.userEmergency;
  avatarPath.value = updateContact.userImage || "";

  if (updateContact.userImage) {
    avatarPreview.innerHTML = `
      <img src="./imgs/${updateContact.userImage}" class="w-100 h-100 rounded-circle object-fit-cover" alt="">
    `;
  } else {
    avatarPreview.innerHTML = renderAvatar(updateContact.userName, "");
  }
  openModal();
}

function sendDataUpdated() {
  contactList[currentIndex] = {
    userName: contactName.value,
    userEmail: contactEmail.value,
    userNumber: contactPhone.value,
    userAdress: contactAddress.value,
    userGroup: contactGroup.value,
    userNote: contactNotes.value,
    userFav: contactFavorite.checked,
    userEmergency: contactEmergency.checked,
    userImage: avatarPath.value
      ? avatarPath.value
      : contactList[currentIndex].userImage || "",
  };
}

submitModalBtn.addEventListener("click", function () {
  if (!validateInputsWhenSubmit()) return;

  if (currentIndex == null) {
    addContact();
    contactList.push(contactUser);
    localStorage.setItem("contactsStorage", JSON.stringify(contactList));
    displayContactUser();
    clearInputs();
    closeModal();
    Swal.fire({
      title: "Added!",
      text: "Contact sucessfully added!",
      icon: "success",
      timer: 2000,
      timerProgressBar: true,
      showConfirmButton: false,
    });
  } else {
    sendDataUpdated();
    localStorage.setItem("contactsStorage", JSON.stringify(contactList));
    closeModal();
    editedAlert();
    displayContactUser();
  }
});

// Glopalalerts groupe

function editedAlert() {
  Swal.fire({
    title: "Edited!",
    text: "Contact sucessfully Edited!",
    icon: "success",
    timer: 2000,
    timerProgressBar: true,
    showConfirmButton: false,
  });
}
function totalContactc() {
  totalContacts.innerHTML = contactList.length;
  totalContactsSpan.innerHTML = contactList.length;
}

function updateFavoriteSidebar() {
  bigFavItem.innerHTML = "";
  var hadFav = false;
  var favCounter = 0;
  for (var i = 0; i < contactList.length; i++) {
    var currentContact = contactList[i];
    if (currentContact.userFav) {
      hadFav = true;
      favCounter++;
      var cartona = `
                            <div class="col-12">
                                <div id="smallFavItem"
                                    class="contact-item d-flex justify-content-between align-items-center gap-3 p-2 rounded-3 mb-3">
                                    <div class="flex-shrink-0">
                                    ${renderAvatar(contactList[i].userName, contactList[i].userImage)}
                                    </div>
                                    <div class="flex-grow-1 text-truncate">
                                        <h4 class="mb-0 fw-medium text-dark small text-truncate">${currentContact.userName}</h4>
                                        <p class="mb-0 text-muted small text-truncate">${currentContact.userNumber}</p>
                                    </div>
                                    <a href="tel:${currentContact.userNumber}"
                                        class="call-btn d-flex align-items-center justify-content-center flex-shrink-0">
                                        <i class="fas fa-phone"></i>
                                    </a>
                                </div>
                            </div>
  `;
      bigFavItem.innerHTML += cartona;
    }
  }
  totalFavContacts.innerHTML = favCounter;
  if (hadFav == false) {
    bigFavItem.innerHTML = `
    <div class="col-12">
                                <div id="emptyStateFav" class="empty-state">
                                    <p class="text-muted mb-0">No favorites yet</p>
                                </div>
                            </div>
    `;
  }
}
////////////////////////////////////////////////////////////////////////////////////////////////////
function updateEmergencySidebar() {
  bigEmergencyItem.innerHTML = "";
  var hadEmergency = false;
  var emergencyCounter = 0;
  for (var i = 0; i < contactList.length; i++) {
    var currentContact = contactList[i];
    if (currentContact.userEmergency) {
      hadEmergency = true;
      emergencyCounter++;
      var cartona = `
                                <div class="col-12">
                                    <div id="smallEmergncyItem"
                                        class="contact-item-emergency  d-flex align-items-center gap-3 p-2 rounded-3">
                                        <div class="flex-shrink-0">
                                        ${renderAvatar(contactList[i].userName, contactList[i].userImage)}
                                        </div>
                                        <div class="flex-grow-1 text-truncate">
                                            <h4 class="mb-0 fw-medium text-dark small text-truncate">${currentContact.userName}</h4>
                                            <p class="mb-0 text-muted small text-truncate">${currentContact.userNumber}</p>
                                        </div>
                                        <a href="tel:${currentContact.userNumber}"
                                            class="call-btn-emergency call-btn-rose d-flex align-items-center justify-content-center flex-shrink-0">
                                            <i class="fas fa-phone"></i>
                                        </a>
                                    </div>
                                </div>
  `;
      bigEmergencyItem.innerHTML += cartona;
    }
  }
  totalEmergencyContacts.innerHTML = emergencyCounter;
  if (hadEmergency == false) {
    bigEmergencyItem.innerHTML = `
                               <div class="col-12">
                                    <div id="emptyStateEmergency" class="empty-state">
                                        <p class="text-muted mb-0">No emergency contacts</p>
                                    </div>
                               </div>
    `;
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////
function togleFavBtn(index) {
  // console.log(index);
  contactList[index].userFav = !contactList[index].userFav;
  localStorage.setItem("contactsStorage", JSON.stringify(contactList));
  displayContactUser();
  updateFavoriteSidebar();
}
////////////////////////////////////////////////////////////////////////////////////////////////////
function togleEmergencyBtn(index) {
  // console.log(index);
  contactList[index].userEmergency = !contactList[index].userEmergency;
  localStorage.setItem("contactsStorage", JSON.stringify(contactList));
  displayContactUser();
  updateEmergencySidebar();
}

searchInput.addEventListener("input", function () {
  var term = searchInput.value.trim().toLowerCase();
  var cartona = "";
  for (var i = 0; i < contactList.length; i++) {
    if (
      contactList[i].userName.toLowerCase().includes(term) ||
      contactList[i].userNumber.toLowerCase().includes(term) ||
      contactList[i].userEmail.toLowerCase().includes(term) ||
      contactList[i].userAdress.toLowerCase().includes(term)
    ) {
      var highlightedName = highlightSerach(contactList[i].userName, term);
      var highlightedPhone = highlightSerach(contactList[i].userNumber, term);
      var highlightedEmail = highlightSerach(contactList[i].userEmail, term);
      var highlightedAdress = highlightSerach(contactList[i].userAdress, term);
      var highlightedGroup = highlightSerach(contactList[i].userGroup, term);
      cartona += ` <div class="col-md-6 col-lg-12 col-xl-6 mb-4">
                            <div class="contact-card">

                                <div class="contact-card-header">
                                    <div class="d-flex align-items-start justify-content-start gap-3">
                                        <div class="position-relative flex-shrink-0  ">
                                            ${renderAvatar(contactList[i].userName, contactList[i].userImage)}
                                           ${
                                             contactList[i].userEmergency
                                               ? ` <div
                                                 class="badge-icon badge-heart d-flex justify-content-center align-items-center rounded-circle">
                                                 <i class="fas fa-heart-pulse"></i>
                                             </div>`
                                               : ""
                                           }
                                           ${
                                             contactList[i].userFav
                                               ? ` <div
                                                 class="badge-icon badge-star d-flex justify-content-center align-items-center rounded-circle">
                                                 <i class="fas fa-star"></i>
                                             </div>`
                                               : ""
                                           }
                                        </div>
                                        <div class="flex-1 min-w-0 pt-1">
                                            <h3 class="contact-card-name truncate m-0 ">${highlightedName}</h3>
                                            <div class="d-flex align-items-center gap-2 mt-1">
                                                <div class="contact-card-phone-container flex-shrink-0">
                                                    <i class="contact-card-phone-icon fas fa-phone"></i>
                                                </div>
                                                <span class="contact-card-phone truncate">${highlightedPhone}</span>
                                            </div>
                                        </div>
                                    </div>


                                    <div class="contact-details">
                                        <div class="contact-detail-item">
                                            <div
                                                class="contact-detail-icon-container d-flex align-items-center justify-content-center violet">
                                                <i class="contact-detail-icon violet fas fa-envelope"></i>
                                            </div>
                                            <span class="contact-detail-text truncate">${highlightedEmail}</span>
                                        </div>

                                        <div class="contact-detail-item">
                                            <div
                                                class="contact-detail-icon-container d-flex align-items-center justify-content-center emerald">
                                                <i class="contact-detail-icon emerald fas fa-location-dot"></i>
                                            </div>
                                            <span class="contact-detail-text truncate">${highlightedAdress}</span>
                                        </div>
                                    </div>


                                    <div class="contact-tags">
                                        <span class="contact-tag d-inline-flex align-items-center">${highlightedGroup}</span>
                                    </div>
                                </div>


                                <div class="contact-card-actions">
                                    <div class="action-buttons-left">
                                        <a href="tel:${contactList[i].userNumber}" id="callBtn" class="action-button call" title="Call">
                                            <i class="fas fa-phone"></i>
                                        </a>

                                        <a href="mailto:${contactList[i].userEmail}" class="action-button email" id="emailBtn" title="Email">
                                            <i class="fas fa-envelope"></i>
                                        </a>
                                    </div>
                                    <div class="action-buttons-right">
                                        <button class="action-button favorite" id="favBtn" onclick="togleFavBtn(${[i]})" title="Favorite">
                                           
                                        <i class="${contactList[i].userFav ? " fas text-warning" : "far"} fa-star"></i>
                                        </button>
                                        <button class="action-button emergency" id="emergncyBtn"  onclick="togleEmergencyBtn(${[i]})" title="Emergency">
                                        <i class="${contactList[i].userEmergency ? "fas fa-heart text-danger" : "far fa-heart"} fa-heart"></i>
                                            


                                        </button>
                                        <button class="action-button edit" id="editBtn" onclick="prepForUpdateContact(${i})"title="Edit">
                                            <i class="fas fa-pen"></i>
                                        </button>
                                        <button class="action-button delete" onclick="deleteContact(${i})" id="deleteBtn" title="Delete">
                                            <i class="fas fa-trash"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>

                        </div>`;
    }
  }
  contactCardContainer.innerHTML = cartona;
});

function highlightSerach(text, term) {
  if (term == false) {
    return text;
  }
  var regex = new RegExp(`(${term})`, "gi");
  return text.replace(
    regex,
    `<mark class="bg-warning text-dark p-0 rounded-1">${term}</mark>`,
  );
}
function getGroupColor(groupName) {
  var groupColors = {
    family: { bg: "#cfe8ff", text: "#1e40af", border: "#93c5fd" },
    friends: { bg: "#d1fae5", text: "#065f46", border: "#6ee7b7" },
    work: { bg: "#ede9fe", text: "#5b21b6", border: "#c4b5fd" },
    school: { bg: "#fef3c7", text: "#b45309", border: "#fde68a" },
    other: { bg: "#f3f4f6", text: "#374151", border: "#d1d5db" },
  };
  return groupColors[groupName] || groupColors["other"];
}

avatarInput.addEventListener("change", function () {
  var file = avatarInput.files[0];
  avatarPath.value = file.name;
  avatarPreview.innerHTML = `
    <img src="./imgs/${file.name}" class="w-100 h-100 rounded-circle object-fit-cover" alt="">
  `;
});

function getAvatarColors() {
  return [
    { from: "#3b82f6", to: "#2563eb" }, // blue
    { from: "#8b5cf6", to: "#6d28d9" }, // violet
    { from: "#10b981", to: "#0d9488" }, // emerald
    { from: "#f43f5e", to: "#db2777" }, // rose
    { from: "#f59e0b", to: "#ea580c" }, // amber
    { from: "#06b6d4", to: "#2563eb" }, // cyan
    { from: "#6366f1", to: "#8b5cf6" }, // indigo
    { from: "#d946ef", to: "#ec4899" }, // fuchsia
  ];
}

function getColorByName(name) {
  var colorAvatar = getAvatarColors();
  var index = name.length % colorAvatar.length;
  return colorAvatar[index];
}

function renderAvatar(name = "", imagePath = "") {
  if (imagePath && imagePath !== "imgs/" && imagePath !== "") {
    return `
      <img src="imgs/${imagePath}" alt="avatar" class="contact-card-avatar object-fit-cover">  
    `;
  }

  if (name && name.trim() !== "") {
    var initials = name
      .trim()
      .split(" ")
      .map((w) => w[0].toUpperCase())
      .slice(0, 2)
      .join("");

    var colorAvatar = getColorByName(name);
    return `
      <div class="contact-card-avatar object-fit-cover d-flex justify-content-center align-items-center text-white fw-bold" style="background: linear-gradient(135deg, ${colorAvatar.from}, ${colorAvatar.to});">
        ${initials}
      </div>
    `;
  } else {
    var defaultColor = getAvatarColors()[0];
    return `
      <div class="contact-card-avatar object-fit-cover d-flex justify-content-center align-items-center text-white" style="background: linear-gradient(135deg, ${defaultColor.from}, ${defaultColor.to});">
        <i class="fas fa-users text-white"></i>
      </div>
    `;
  }
}

// validation

// contactName.addEventListener("input", function () {
//   var value = contactName.value.trim();
//   var nameRegex = /^[a-zA-Z\u0600-\u06FF\s]{2,50}$/;
//   if (!value || !nameRegex.test(value)) {
//     showInvalid(contactName, contactNameError);
//   } else {
//     clearInvalid(contactName, contactNameError);
//   }
// });

// contactPhone.addEventListener("input", function () {
//   var value = contactPhone.value.trim();
//   var phoneRegex = /^(01|(\+20|0020|20)1)[0125][0-9]{8}$/;
//   if (!value || !phoneRegex.test(value)) {
//     showInvalid(contactPhone, contactPhoneError);
//   } else {
//     clearInvalid(contactPhone, contactPhoneError);
//   }
// });

// contactEmail.addEventListener("input", function () {
//   var value = contactEmail.value.trim();
//   var emailRegex = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;
//   if (!value || !emailRegex.test(value)) {
//     // lw el value msh true >> show invalid
//     showInvalid(contactEmail, contactEmailError);
//   } else if (value || emailRegex.test(value)) {
//     clearInvalid(contactEmail, contactEmailError);
//   } else {
//     contactEmail.classList.remove("is-valid", "is-invalid");
//   }
// });

// function validateInputsWhenSubmit() {
//   var nameValue = contactName.value.trim();
//   var phoneValue = contactPhone.value.trim();
//   var emailValue = contactEmail.value.trim();

//   var nameRegex = /^[a-zA-Z\u0600-\u06FF\s]{2,50}$/;
//   var phoneRegex = /^(01|(\+20|0020|20)1)[0125][0-9]{8}$/;
//   var emailRegex = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;

//   // clears frist ???
//   clearInvalid(contactName, contactNameError);
//   clearInvalid(contactEmail, contactEmailError);
//   clearInvalid(contactPhone, contactPhoneError);

//   if (!nameValue || !nameRegex.test(nameValue)) {
//     showInvalid(contactName, contactNameError);
//     Swal.fire({
//       text: "Pleas enter a name!",
//       icon: "error",
//       showConfirmButton: true,
//       customClass: {
//         container: "swal-container",
//         confirmButton: "btn btn-danger me-3",
//       },
//     });
//     contactName.focus();
//     return false;
//   }
// // لو المستخدم كتب فاليو ف الرقم فعلا بس هي مش مطابقه للرجيكس رجعلي false
//   if (phoneValue && !phoneRegex.test(phoneValue)) {
//     showInvalid(contactPhone, contactPhoneError);
//     Swal.fire({
//       text: "Pleas enter a valid phone number!",
//       icon: "error",
//       showConfirmButton: true,
//       customClass: {
//         container: "swal-container",
//         confirmButton: "btn btn-danger me-3",
//       },
//     });
//     contactPhone.focus();
//     return false;
//   }

//   if (emailValue && !emailRegex.test(emailValue)) {
//     showInvalid(contactEmail, contactEmailError);
//     Swal.fire({
//       text: "Pleas enter a valid email !",
//       icon: "error",
//       showConfirmButton: true,
//       customClass: {
//         container: "swal-container",
//         confirmButton: "btn btn-danger me-3",
//       },
//     });
//     contactEmail.focus();
//     return false;
//   }

//   return true;
// }

/////////////////////////////////////////////////////////////////////

// validation

var validationRules = {
  name: {
    regex: /^[a-zA-Z\u0600-\u06FF\s]{2,50}$/,
    errorId: "contactNameError",
    message: "Name should contain only letters (2–50 characters)",
  },
  phone: {
    regex: /^(01|(\+20|0020|20)1)[0125][0-9]{8}$/,
    errorId: "contactPhoneError",
    message: "Please enter a valid Egyptian phone number",
  },
  email: {
    regex: /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/,
    errorId: "contactEmailError",
    message: "Please enter a valid email address",
    optional: true,
  },
};

function showInvalid(input, errorId) {
  input.classList.add("is-invalid");
  input.classList.remove("is-valid");
  document.getElementById(errorId).classList.remove("d-none");
}

function clearInvalid(input, errorId) {
  input.classList.remove("is-invalid");
  input.classList.add("is-valid");
  document.getElementById(errorId).classList.add("d-none");
}

function validaitionFileds(input, rule) {
  var value = input.value.trim();
  var errorEl = document.getElementById(rule.errorId);

  if (!value || !rule.regex.test(value)) {
    showInvalid(input, rule.errorId);
    return false;
  }

  /// لو دي (!value) و التانية true  حققلي الي جوا الدالة
  if (!value && rule.optional) {
    input.classList.remove("is-invalid", "is-valid");
    errorEl.classList.remove("d-none");
  }

  clearInvalid(input, rule.errorId);
  return true;
}

contactName.addEventListener("input", function () {
  validaitionFileds(contactName, validationRules.name);
});
contactEmail.addEventListener("input", function () {
  validaitionFileds(contactEmail, validationRules.email);
});
contactPhone.addEventListener("input", function () {
  validaitionFileds(contactPhone, validationRules.phone);
});
function normalizeEgyptionPhoneNum(phone) {
  if (!phone || typeof phone !== "string") {
    return "";
  }
  // 1. Fixed Regex: Added backslash to \D
  var cleanedPhone = phone.replace(/\D/g, "");
  
  if (cleanedPhone.startsWith("0020")) {
    cleanedPhone = "0" + cleanedPhone.slice(4);
  } else if (cleanedPhone.startsWith("20")) {
    cleanedPhone = "0" + cleanedPhone.slice(2);
  }
  
  return cleanedPhone;
}

function isPhoneDuplicated(phone, index) {
  var normalizeInput = normalizeEgyptionPhoneNum(phone);
  
  for (var i = 0; i < contactList.length; i++) {
    if (i === index) continue;
    
    // 2. Define normalizedStored FIRST before comparison
    var normalizedStored = normalizeEgyptionPhoneNum(
      contactList[i].contactPhone || contactList[i].userNumber // حسب اسم الـ Property عندك في الأوبجكت
    );
    
    if (normalizedStored === normalizeInput) {
      return true; // الرقم متكرر فعلاً
    }
  }
  return false; // الرقم مش متكرر
}

function validateInputsWhenSubmit() {
  var isNameValid = validaitionFileds(contactName, validationRules.name);
  var isEmailValid = validaitionFileds(contactEmail, validationRules.email);
  var isPhoneValid = validaitionFileds(contactPhone, validationRules.phone);

  if (!isNameValid) {
    Swal.fire({
      text: validationRules.name.message,
      icon: "error",
      showConfirmButton: true,
      customClass: { container: "swal-container", confirmButton: "btn btn-danger me-3" }
    });
    contactName.focus();
    return false;
  }

  if (!isPhoneValid) {
    Swal.fire({
      text: validationRules.phone.message,
      icon: "error",
      showConfirmButton: true,
      customClass: { container: "swal-container", confirmButton: "btn btn-danger me-3" }
    });
    contactPhone.focus();
    return false;
  }

  if (!isEmailValid) {
    Swal.fire({
      text: validationRules.email.message,
      icon: "error",
      showConfirmButton: true,
      customClass: { container: "swal-container", confirmButton: "btn btn-danger me-3" }
    });
    contactEmail.focus();
    return false;
  }

  // 3. Fixed: Check if it returns true (meaning it IS duplicated)
  if (isPhoneDuplicated(contactPhone.value, currentIndex)) {
    showInvalid(contactPhone, "contactPhoneError");
    Swal.fire({
      text: "Phone number is duplicated", // تصحيح الإملاء أيضاً
      icon: "error",
      showConfirmButton: true,
      customClass: { container: "swal-container", confirmButton: "btn btn-danger me-3" }
    });
    contactPhone.focus();
    return false;
  }

  return true;
}