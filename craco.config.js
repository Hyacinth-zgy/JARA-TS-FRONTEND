const CracoLessPlugin = require('craco-less');
// 安装crop才能定制主题，在ant-d官网有有详细介绍
module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              // 改变ant-默认配置颜色
              '@primary-color': 'rgb(0,82,204)',
              '@font-size-base': '16px',
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
