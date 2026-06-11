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

  // Copy icons (skip dotfiles like .DS_Store)
  const iconsDir = path.resolve(__dirname, 'public', 'icons');
  const distIconsDir = path.resolve(distDir, 'icons');
  if (!fs.existsSync(distIconsDir)) fs.mkdirSync(distIconsDir, { recursive: true });
  if (fs.existsSync(iconsDir)) {
    for (const file of fs.readdirSync(iconsDir)) {
      if (file.startsWith('.')) continue;
      fs.copyFileSync(
        path.resolve(iconsDir, file),
        path.resolve(distIconsDir, file)
      );
    }
  }

  // Copy options.html next to its bundle (dist/options/options.js),
  // so its relative <script src="options.js"> resolves
  const optionsHtml = path.resolve(__dirname, 'src', 'options', 'options.html');
  if (fs.existsSync(optionsHtml)) {
    const distOptionsDir = path.resolve(distDir, 'options');
    if (!fs.existsSync(distOptionsDir)) fs.mkdirSync(distOptionsDir, { recursive: true });
    fs.copyFileSync(optionsHtml, path.resolve(distOptionsDir, 'options.html'));
  }
}

const buildOptions = {
  // Note: popup is intentionally not bundled — the manifest has no
  // default_popup (the toolbar icon opens the palette directly)
  entryPoints: [
    'src/background/service-worker.ts',
    'src/content/index.ts',
    'src/options/options.ts',
  ],
  bundle: true,
  outdir: 'dist',
  outbase: 'src',
  format: 'iife',
  target: 'chrome110',
  sourcemap: isWatch,
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
