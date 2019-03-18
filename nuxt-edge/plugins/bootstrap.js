// Include bootstrap JS only

if (process.browser) {
  require('bootstrap')
}

// пока не знаю будет ли работать jquery и propper, мне они пока что не нужны, может нужно будет добавить что-то в конфиг, или может нужно будет вынести в отдельный плагин-файл

// if (process.browser) {
//   require('jquery/dist/jquery');
//   require('popper.js/dist/umd/popper');
//   require('bootstrap/dist/js/bootstrap');
// }

// if (process.browser) {
//   require('jquery');
//   require('popper');
//   require('bootstrap');
// }
