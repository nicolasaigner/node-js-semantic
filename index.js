const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// get Version in package.json
const pkg = require('./package.json');

app.get('/', (req, res) => {

  res.send(`
  <body style="margin: 0;">
    <div style="height: 100%; width: 100%; background-color: #303030; color: #ffffffb3;">
      <div style="height: auto; width: auto; padding: 10px;">
        <h1>Hello World</h1>
        <h3>My Version is: ${pkg.version}</h3>
      </div>  
    </div>
  </body>
  `);
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})
