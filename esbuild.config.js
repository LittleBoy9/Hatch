const esbuild = require('esbuild');
const path = require('path');
const fs = require('fs');

const isWatch = process.argv.includes('--watch');

// Copy static files to dist
function copyStaticFiles() {
  const distDir = path.resolve(__dirname, 'dist');
  if (!fs.existsSync(distDir)) fs.mkdirSync(distDir, { recursive: true });

  // Copy manifest.json
  fs.copyFileSync(
    path.resolve(__dirname, 'manifest.json'),
    path.resolve(distDir, 'manifest.json')
  );

  // Copy icons
  const iconsDir = path.resolve(__dirname, 'public', 'icons');
  const distIconsDir = path.resolve(distDir, 'icons');
  if (!fs.existsSync(distIconsDir)) fs.mkdirSync(distIconsDir, { recursive: true });
  if (fs.existsSync(iconsDir)) {
    for (const file of fs.readdirSync(iconsDir)) {
      fs.copyFileSync(
        path.resolve(iconsDir, file),
        path.resolve(distIconsDir, file)
      );
    }
  }

  // Copy popup.html
  const popupHtml = path.resolve(__dirname, 'src', 'popup', 'popup.html');
  if (fs.existsSync(popupHtml)) {
    fs.copyFileSync(popupHtml, path.resolve(distDir, 'popup.html'));
  }
}

const buildOptions = {
  entryPoints: [
    'src/background/service-worker.ts',
    'src/content/index.ts',
  ],
  bundle: true,
  outdir: 'dist',
  format: 'iife',
  target: 'chrome110',
  sourcemap: true,
  minify: !isWatch,
  entryNames: '[dir]/[name]',
  plugins: [
    {
      name: 'copy-static',
      setup(build) {
        build.onEnd(() => {
          copyStaticFiles();
          console.log(`[Hatch] Build complete at ${new Date().toLocaleTimeString()}`);
        });
      },
    },
  ],
};

async function run() {
  if (isWatch) {
    const ctx = await esbuild.context(buildOptions);
    await ctx.watch();
    console.log('[Hatch] Watching for changes...');
  } else {
    await esbuild.build(buildOptions);
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
