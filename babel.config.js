module.exports = function(api) {
  api.cache(false);

  return {
    presets: [
      ['@babel/preset-env', { useBuiltIns: 'usage' }]
    ],
    plugins: [
      [
        'prismjs',
        {
          languages: [
            'bash',
            'clike',
            'css',
            'diff',
            'handlebars',
            'javascript',
            'json',
            'jsx',
            'less',
            'markdown',
            'markup',
            'rust',
            'sass',
            'scss',
          ],
          plugins: ['line-numbers']
        }
      ]
    ]
  }
};
