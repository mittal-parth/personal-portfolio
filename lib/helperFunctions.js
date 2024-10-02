export const scrollToSection = (id) => {
  const element = document.getElementById(id);
  const yOffset = -70; // Adjust this value based on your header height
  const y = element.getBoundingClientRect().top + window.scrollY + yOffset;

  window.scrollTo({ top: y, behavior: "smooth" });
};
