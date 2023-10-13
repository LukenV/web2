import movieImage from '../../img/movie.png';

const Footer = () => {
  const footer = document.querySelector('footer');
  footer.innerHTML = `<h3 class="text-center">
  MyMovies project made in JS
</h3>`;

  renderSmallImage(footer, movieImage, 'movieImage');
};

export default Footer;

function renderSmallImage(wrapper, url, id) {
  const image = document.createElement('img');
  image.src = url;
  image.height = 50;
  image.style.display = 'block';
  image.style.margin = 'auto';
  if (id) image.id = id;
  wrapper.appendChild(image);
}
