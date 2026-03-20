/**
 * TECHNOVA - SCRIPT DE SETUP DE AMBIENTE
 * Objetivo: Criar ficheiros .env básicos caso não existam, garantindo que o 
 * Backend e Frontend saibam para onde olhar sem intervenção manual.
 */

const fs = require('fs');
const path = require('path');

const environments = [
    {
        name: 'Backend',
        path: path.join(__dirname, '../backend/.env'),
        content: `PORT=5000\nDB_USER=admin\nDB_PASSWORD=technovapass\nDB_HOST=localhost\nDB_NAME=technova_db\nDB_PORT=5432`
    },
    {
        name: 'Frontend',
        path: path.join(__dirname, '../frontend/.env'),
        content: `API_URL=http://localhost:5000/api/v1`
    }
];

console.log('🚀 [TECHNOVA] Iniciando configuração de ambiente...');

environments.forEach(env => {
    if (!fs.existsSync(env.path)) {
        try {
            fs.writeFileSync(env.path, env.content);
            console.log(`✅ [${env.name}] Ficheiro .env criado com sucesso.`);
        } catch (err) {
            console.error(`❌ [${env.name}] Erro ao criar ficheiro:`, err.message);
        }
    } else {
        console.log(`ℹ️ [${env.name}] Ficheiro .env já existe. Saltando...`);
    }
});

console.log('🏁 [TECHNOVA] Setup concluído. Pronto para o npm run dev.');