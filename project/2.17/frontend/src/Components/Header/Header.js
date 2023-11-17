const Header = () => {
  renderTitleAndWrapper();
};

function renderTitleAndWrapper() {
  const header = document.querySelector('header');
  header.style.backgroundColor = '#28282B'
  header.innerHTML = `<h1 style="text-align:center;margin:20px;color:#FAF9F6;">
  MyMovies</h1>
  <div id="navbarWrapper">
  </div>
  `;
}

export default Header;
