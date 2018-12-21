import babel from 'rollup-plugin-babel';
// import nodeResolve from 'rollup-plugin-node-resolve';
// import commonjs from 'rollup-plugin-commonjs';

const input = 'src/index.js';

const cjs = [
  {
    input,
    output: { file: 'dist/cjs/index.js', format: 'cjs' },
    plugins: [
      // Note: rollup-plugin-babel automatically set modules:false with babel 7
      babel({
        // Pick up our root babel.config.js
        rootMode: 'upward',
      }),
    ],
  },
];

const esm = [
  {
    input,
    output: { file: 'dist/esm/index.js', format: 'esm' },
    plugins: [
      // Note: rollup-plugin-babel automatically set modules:false with babel 7
      babel({
        // Pick up our root babel.config.js
        rootMode: 'upward',
        exclude: /node_modules/,
      }),
    ],
  },
];

export default cjs.concat(esm);
