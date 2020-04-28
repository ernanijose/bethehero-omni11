const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONG', () => {
    beforeEach(async () => {
        await connection.migrate.rollback(); //antes de executar o migrate, é sempre bom executar o rollback
        await connection.migrate.latest();
    });

    //caso precise der erro no banco de dados, pois ainda continua executando, então função abaixo fecha conexão com BD
    afterAll(async () => {
        await connection.destroy();
    });
    it('Should be able to create a new ONG', async () => {
        const response = await request(app)
        .post('/ongs')
        //.set('Authorization', '670948a6') //caso precise fazer um teste para quando um headers
        .send({
            name: "APAD 4",
            email: "contato@apad.com.br",
            whatsapp: "61992518587",
            city: "Brasilia",
            uf: "DF"
        });

        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
    })
});