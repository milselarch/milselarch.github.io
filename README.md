This project is built on top of [https://github.com/bchiang7/v4](https://github.com/bchiang7/v4)
by [Brittany Chiang](https://brittanychiang.com/). The original project is
licensed under the MIT license (retained in this project in `BASE_LICENSE`).
Modifications and new code are licensed under GPLv3.

## 🛠 Installation & Set Up

1. Install and use the correct version of Node using [NVM](https://github.com/nvm-sh/nvm)

   ```sh
   nvm install
   ```

2. Install dependencies

   ```sh
   npm install
   ```

3. Start the development server

   ```sh
   npm run dev
   ```

## 🚀 Building and Running for Production

1. Generate a production build (static export in `out/`)

   ```sh
   npm run build
   ```

2. Run the production server

   ```sh
   npm run start
   ```

## Notes

- Markdown content lives in `content/`.
- `npm run sync-content` mirrors `content/` to `public/content/` so markdown-linked assets render correctly.
