const addDateTime = (message) => {
  const dateTime = new Date();
  const dateString = dateTime.toLocaleDateString();
  const timeString = dateTime.toLocaleTimeString();

  return `${dateString} ${timeString} ${message}`;
};

const string = addDateTime("Bienvenue sur cette page web d'exercices !");

console.log(string);

alert(string);
