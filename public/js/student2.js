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
  });
  