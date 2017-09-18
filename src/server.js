const express = require('express');
const ejs = require('ejs');
const path = require('path')
const session = require('cookie-session');

const routes = require('./server/routes');
const errorHandler = require('./server/errorHandler');
const notFound = require('./server/notFound');

const app = express();

app.set('view engine', 'ejs');
app.set('views', './src/views');
// app.set('views', path.join(__dirname, 'views'))

app.use(express.static('public'));

app.use(session({
  name: 'session',
  keys: ['sdlfjLSDKFJ', 'O#U*$OSDJF']
}));

// app.get('/albums/:albumID', (req, res) => {
//   const { albumID } = req.params;
//
//   database.getAlbumsByID(albumID, (error, albums) => {
//     if (error) {
//       res.status(500).render('error', { error: error })
//     } else {
//       const album = albums[0]
//       res.render('album', { album: album })
//     }
//   })
// })

app.use(routes);
app.use(errorHandler);
app.use(notFound);

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}...`)
})
