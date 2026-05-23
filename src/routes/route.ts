import { config } from '../config';
import { productController } from '../controller/product.controller';
import type { Handler } from '../types';
import { sendResponse } from '../utils/utils';

const homePage = `
<!DOCTYPE html>
<html>
<head>
<style>
.container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    height: 100%;
    width: 100%;
    color: blue;
}
</style>
</head>
  <body>
<div class="container">
    <h1>
      Server is running on port <span id="port"></span>
    </h1>
</div>

    <script>
      document.getElementById('port').innerText = '${config.port}';
    </script>
  </body>
</html>
`;

const errorPage = `
<!DOCTYPE html>
<html>
<head>
<style>
.container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    min-height: 100vh;
    color: red;
}
</style>
</head>
<body>
<div class="container">
    <h1>There is an error</h1>
</div>
</body>
</html>
`;

export const routeHandler: Handler = (req, res) => {
  const url = req.url ?? '/';
  const method = req.method ?? 'GET';

  if (url === '/' && method === 'GET') {
    sendResponse(res, 200, 'text/html', homePage);
  } else if (url.startsWith('/products')) {
    productController(req, res);
  } else {
    sendResponse(res, 404, 'text/html', errorPage);
  }
};
