module.exports = (req, res, next) => {
  if (req.method === 'POST' && req.url === '/login') {
    console.log('1');
    if (req.body.username === 'jack' && req.body.password === '123456') {
      console.log('2');
      return res.status(200).json({
        user: {
          token: '123',
        },
      });
    } else {
      console.log('3');
      return res.status(400).json({
        message: '用户名或者密码错误',
      });
    }
  }
  console.log('4');
  next();
};
