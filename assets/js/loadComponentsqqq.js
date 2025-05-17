// Função para carregar componentes
function loadComponents() {
  // Carrega a navbar
  fetch('src/partials/navbar.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('header').innerHTML = data;
      initNavbar(); // Chama a função que ativa o menu hamburger
    })
    .catch(error => console.error('Error loading navbar:', error));

  // Carrega o footer
  fetch('src/partials/footer.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('footer').innerHTML = data;
    })
    .catch(error => console.error('Error loading footer:', error));
}

// Função de inicialização do menu hamburger
/**
 * Inicializa o menu hamburger e dropdowns
 */
function initNavbar() {
  // Elementos do menu mobile
  const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
  const navmenu = document.getElementById('navmenu');
  
  // Dropdowns do menu
  const dropdowns = document.querySelectorAll('.navmenu .dropdown');
  
  // Toggle do menu mobile
  if (mobileNavToggle && navmenu) {
    mobileNavToggle.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Alterna classes no ícone (hamburger/x)
      this.classList.toggle('bi-list');
      this.classList.toggle('bi-x');
      
      // Alterna visibilidade do menu
      navmenu.classList.toggle('mobile-menu-active');
    });
  }
  
  // Inicializa dropdowns
  dropdowns.forEach(dropdown => {
    const toggle = dropdown.querySelector('.toggle-dropdown');
    const dropdownMenu = dropdown.querySelector('ul');
    
    if (toggle && dropdownMenu) {
      toggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        // Fecha outros dropdowns abertos
        dropdowns.forEach(otherDropdown => {
          if (otherDropdown !== dropdown) {
            otherDropdown.querySelector('ul').classList.remove('dropdown-active');
            otherDropdown.querySelector('.toggle-dropdown').classList.remove('bi-chevron-up');
            otherDropdown.querySelector('.toggle-dropdown').classList.add('bi-chevron-down');
          }
        });
        
        // Alterna o dropdown atual
        dropdownMenu.classList.toggle('dropdown-active');
        this.classList.toggle('bi-chevron-down');
        this.classList.toggle('bi-chevron-up');
      });
    }
  });
  
  // Fecha o menu quando clicar em um link
  const navLinks = document.querySelectorAll('.navmenu a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      // Se for mobile, fecha o menu
      if (window.innerWidth <= 1200) { // Ajuste conforme seu breakpoint
        navmenu.classList.remove('mobile-menu-active');
        mobileNavToggle.classList.remove('bi-x');
        mobileNavToggle.classList.add('bi-list');
      }
      
      // Fecha todos os dropdowns
      dropdowns.forEach(dropdown => {
        dropdown.querySelector('ul').classList.remove('dropdown-active');
        dropdown.querySelector('.toggle-dropdown').classList.remove('bi-chevron-up');
        dropdown.querySelector('.toggle-dropdown').classList.add('bi-chevron-down');
      });
    });
  });
}

// Executa quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', loadComponents);