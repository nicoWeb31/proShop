import bcryptjs from 'bcryptjs';

const users = [
    {
        name : "Admin User",
        email: "admin@ex.com",
        password: bcryptjs.hashSync('test1234',10),
        admin: true
    },
    {
        name : "nico",
        email: "nico@ex.com",
        password: bcryptjs.hashSync('test1234',10),
        

    },
    {
        name : "mamou",
        email: "mamou@ex.com",
        password: bcryptjs.hashSync('test1234',10),
        

    }
];

export default users;