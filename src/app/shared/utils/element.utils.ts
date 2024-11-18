export function scrollToSection(id: string) {
  console.log('scrollToSection', id);
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
}
export function scrollToTop() {
  console.log('scrollToTop');
  window.scrollTo(0, 0);
}
