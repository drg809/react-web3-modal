import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import external from 'rollup-plugin-peer-deps-external'
import postcss from 'rollup-plugin-postcss'
import images from 'rollup-plugin-image-files'
import json from '@rollup/plugin-json'
import svgr from '@svgr/rollup'
import dynamicImportVars from '@rollup/plugin-dynamic-import-vars'
import polyfills from 'rollup-plugin-node-polyfills'
import replace from 'rollup-plugin-replace'

import pkg from './package.json'

export default {
  input: 'src/index.js',
  output: [
    {
      file: pkg.main,
      format: 'cjs'
    },
    {
      file: pkg.module,
      format: 'es'
    }
  ],
  external: [
    'ws',
    '@web3-react/core',
    'ethers',
    '@web3-react/walletconnect-connector',
    'react-device-detect',
    'polished',
    'rebass',
    '@web3-react/fortmatic-connector',
    '@web3-react/injected-connector',
    '@web3-react/walletlink-connector',
    '@web3-react/portis-connector',
    '@ethersproject/address',
    'react-spring',
    '@reach/dialog',
    '@reach/dialog/styles.css',
    'react-use-gesture',
    'react-feather',
    'copy-to-clipboard',
    'fortmatic',
    'jazzicon'
  ],
  inlineDynamicImports: true,
  plugins: [
    external(),
    babel({
      exclude: 'node_modules/**',
      presets: ['@babel/env', '@babel/preset-react']
    }),
    commonjs(),
    polyfills({ process: true }),
    postcss({ modules: true }),
    // url(),
    json(),
    images(),
    svgr(),
    dynamicImportVars(),
    replace({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ]
}
