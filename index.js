const app = require('express')();
const { default: axios } = require('axios');
const { v4 } = require('uuid');

var todos = null;

app.get('/', async (req, res) => {

  if (!todos) {
    const { data } = await axios.get(`https://jsonplaceholder.typicode.com/todos`);
    todos = data;
  }
  res.json(todos);
})


app.get('/api', (req, res) => {
  const path = `/api/item/${v4()}`;
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
  res.end(`Hello! Go to item: <a href="${path}">${path}</a>`);
});



app.get('/api/item/:slug', (req, res) => {
  const { slug } = req.params;
  res.end(`Item: ${slug}`);
});

app.listen(5000, () => {
  console.log(`server running on 5000 `);
})

module.exports = app;