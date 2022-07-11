var bcrypt = require('bcryptjs');
const salt = 10;

const users = [
    {
        userName: 'admin',
        email: 'admin@example.com',
        imageUrl:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/User_font_awesome.svg/2048px-User_font_awesome.svg.png',
        hash: bcrypt.hashSync('admin', salt),
        isAdmin: true,
    },
    {
        userName: 'user',
        email: 'user@example.com',
        imageUrl:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/User_font_awesome.svg/2048px-User_font_awesome.svg.png',
        hash: bcrypt.hashSync('user', salt),
        isAdmin: false,
    },
];

module.exports = users;
