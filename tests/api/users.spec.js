// describe() - metodo para organizar los test
// it() - metodo para hacer las pruebas
// expect() - se coloca lo que se quiere validar y la comprobación que quiero hacer los metodos disponibles. toBe es el más simple
// toBe () es toContain() contiene tobeInstanceOff(tipo de dato) comprobar el tipo de dato

const request = require('supertest'); //peticiones sin necesidad de levantar el servidor
const mongoose = require('mongoose');
const app = require('../../app'); // importamos la app de express a la que vamos a lanzar los test
const User = require('../../models/users.model');

describe('Api Users', () => {
    beforeAll(async () => {
        mongoose.set('strictQuery', false);
        await mongoose.connect('mongodb://127.0.0.1:27017/shop');
    });
    afterAll(async () => { await mongoose.disconnect() });
    // para que se conecte y desconecte a la base de datos cada vez
    describe('GET /api/users', () => {

        let response;
        // metodos para hacer cosas antes o despuñes de las pruebas afterall aftereach beforeall beforeeaach
        beforeAll(async () => {
            response = await request(app).get('/api/users').send();
        })
        it('debería responder con status 200', () => {
            expect(response.statusCode).toBe(200);
        });

        it('deberia devolver la respuesta en formato json', () => {
            expect(response.headers['content-type']).toContain('json');
        });
        it('deberia responder con un array', () => {
            expect(response.body).toBeInstanceOf(Array);
        })
    });

    describe('POST /api/users', () => {
        let response;
        const body = { username: 'prueba', email: 'prueba@no.com', password: '12345', age: 34 }
        beforeAll(async () => {
            response = await request(app).post('/api/users').send(body);
        });
        afterAll(async () => {
            await User.deleteMany({ email: 'prueba@no.com' })
        })
        it('deberia responder correctamente status:200 + json', () => {
            expect(response.statusCode).toBe(200);
            expect(response.headers['content-type']).toContain('json');
        });
        it('debería insertar el usuario en la base de datos', () => {
            expect(response.body._id).toBeDefined();
        });
        it('Los datos insertados deberían ser correctos', () => {
            expect(response.body.username).toBe(body.username)
        });

    });

    describe('PUT /api/users/userId', () => {
        let response, user;
        const body = { username: 'prueba', email: 'prueba@no.com', password: '12345', age: 34 };
        beforeAll(async () => {
            user = await User.create(body);
            response = await request(app).put(`/api/users/${user._id}`).send({ email: 'email@email.com', age: 59 });
        });
        afterAll(async () => {
            await User.findByIdAndDelete(user._id);
        });
        it('deberia responder correctamente', () => {
            expect(response.statusCode).toBe(200);
            expect(response.headers['content-type']).toContain('json');
        });
        it('deberia editar el usuario', () => {
            expect(response.body.email).toBe('email@email.com');
            expect(response.body.age).toBe(59);
        });
    })

    describe('DELETE /api/users/userId', () => {
        let response, user;
        const body = { username: 'prueba', email: 'prueba@no.com', password: '12345', age: 34 };

        beforeAll(async () => {
            user = await User.create(body);
            response = await request(app).delete(`/api/users/${user._id}`);
        });
        afterAll(async () => {
            await User.findByIdAndDelete(user._id);
        });
        it('deberia responder correctamente', () => {
            expect(response.statusCode).toBe(200);
            expect(response.headers['content-type']).toContain('json');
        });
        it('debería borrar el usuario', async () => {
            const userFound = await User.findById(user._id);
            expect(userFound).toBeNull();
        });

    })

});