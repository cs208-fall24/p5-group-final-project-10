document.addEventListener("DOMContentLoaded", () => {
  // Handle Edit Button Click
  document.querySelectorAll(".edit-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const parentLi = button.closest("li");
      const editForm = parentLi.querySelector(".edit-form");
      const reviewText = parentLi.querySelector(".review-text");

      // Toggle the display of the form and review text
      editForm.classList.toggle("active");
      reviewText.style.display = editForm.classList.contains("active") ? "none" : "block";
    });
  });

  // Handle Add Review Form Submission
  const addForm = document.querySelector(".add-review-form");
  if (addForm) {
    addForm.addEventListener("submit", (e) => {
      const input = addForm.querySelector(".review-input");
      if (!input.value.trim()) {
        e.preventDefault();
        alert("Review cannot be empty!");
      }
    });
  }

  // Handle Edit Form Submission
  document.querySelectorAll(".edit-form").forEach((form) => {
    form.addEventListener("submit", (e) => {
      const input = form.querySelector(".edit-input");
      if (!input.value.trim()) {
        e.preventDefault();
        alert("Edited review cannot be empty!");
      }
    });
  });
});
