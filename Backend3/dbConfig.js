import sql from 'mssql';
import dotenv from 'dotenv';

dotenv.config();

const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_NAME,
    options: {
        encrypt: true,
        trustServerCertificate: true
    }
};

const connectDB = async () => {
    try {
        await sql.connect(dbConfig);
        console.log('Connected to MSSQL Database');
    } catch (error) {
        console.error('Database connection failed:', error);
    }
};

export { connectDB, sql };