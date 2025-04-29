<!DOCTYPE html>
<html lang="uk">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>404 - Сторінку не знайдено</title>
    <link rel="stylesheet" />
    <style>
      :root {
        --white: #ffffff;
      }

      body {
        font-family: "Poppins", sans-serif;
        font-weight: 400;
        font-size: 14px;
        line-height: 1.3;
        letter-spacing: 0.03em;
        color: var(--white);
        background-color: var(--bg);
        min-width: 320px;
        font-synthesis: none;
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        -webkit-text-size-adjust: 100%;
        scroll-behavior: smooth;
        background-image: url("../images/gradients/Gradient_2.png");
        background-repeat: no-repeat;
        background-size: cover;
        background-attachment: fixed;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        height: 100vh;
        padding: 20px;
      }

      h1 {
        font-size: 64px;
        margin: 0 0 20px;
      }

      p {
        font-size: 24px;
        margin: 0 0 30px;
      }

      a {
        display: inline-block;
        padding: 12px 24px;
        background: var(--white);
        color: var(--bg);
        text-decoration: none;
        border-radius: 8px;
        font-size: 18px;
        transition: background-color 0.3s;
      }

      a:hover {
        background-color: #eeeeee;
      }

      @media (-webkit-min-device-pixel-ratio: 2),
        (min-resolution: 192dpi),
        (min-resolution: 2dppx) {
        body {
          background-image: url("../images/gradients/Gradient_2-2x.png");
        }
      }

      @media (min-width: 768px) {
        body {
          background-image: url("../images/gradients/Gradient_5.png");
        }
      }

      @media (min-width: 768px) and (-webkit-min-device-pixel-ratio: 2),
        (min-width: 768px) and (min-resolution: 192dpi),
        (min-width: 768px) and (min-resolution: 2dppx) {
        body {
          background-image: url("../images/gradients/Gradient_5-2x.png");
        }
      }

      @media (min-width: 1280px) {
        body {
          background-image: url("../images/gradients/Gradient_3.png");
        }
      }

      @media (min-width: 1280px) and (-webkit-min-device-pixel-ratio: 2),
        (min-width: 1280px) and (min-resolution: 192dpi),
        (min-width: 1280px) and (min-resolution: 2dppx) {
        body {
          background-image: url("../images/gradients/Gradient_3-2x.png");
        }
      }
    </style>
  </head>
  <body>
    <h1>404</h1>
    <p>На жаль, сторінку не знайдено.</p>
    <a href="/">Повернутися на головну</a>
  </body>
</html>