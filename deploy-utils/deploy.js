const deploy = require('aliyun-oss-deploy');
const path = require('path');

deploy(path.resolve(__dirname, '../public'), {
  accessKeyId: process.env.ACCESS_KEY_ID,
  accessKeySecret: process.env.ACCESS_KEY_SECRET,
  region: 'oss-ap-northeast-1',
  bucket: 'lenconda-blog-site',
});
