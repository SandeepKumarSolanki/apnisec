const mongoose = require('mongoose');

class Database {
    constructor() {
        this.uri = `${process.env.ATLAS_MONGODB_URI}/apnisec` || 'mongodb://localhost:27017/apnisec';
        this.isConnected = false;
    }

    async connect() {
        if (this.isConnected) {
            console.log('Using existing database connection');
            return;
        }

        try {
            const connection = await mongoose.connect(this.uri);
            this.isConnected = true;
            console.log(`MongoDB connected: ${connection.connection.host}`);
        } catch (error) {
            console.error('Database connection error:', error.message);
            throw error;
        }
    }

    async disconnect() {
        if (!this.isConnected) {
            return;
        }

        try {
            await mongoose.disconnect();
            this.isConnected = false;
            console.log('Database disconnected');
        } catch (error) {
            console.error('Error disconnecting from database:', error.message);
            throw error;
        }
    }
}

module.exports = Database;
