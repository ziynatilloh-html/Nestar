import { Module } from '@nestjs/common';
import { InjectConnection, MongooseModule } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
@Module({
	imports: [
		MongooseModule.forRootAsync({
			useFactory: () => ({
				uri: process.env.NODE_ENV === 'production' ? process.env.MONGO_PROD : process.env.MONGO_DEV,
			}),
		}),
	],
	exports: [MongooseModule],
})
export class DatabaseModule {
	constructor(@InjectConnection() private readonly connection: Connection) {
		if (connection.readyState === 1) {
			console.log(`MongoDB connected into ${process.env.NODE_ENV === 'production' ? 'production' : 'development'} DB`);
		} else {
			console.log('MongoDb connection failed');
		}
	}
}
// This module is responsible for connecting to the database.
// It uses the MongooseModule to establish a connection to the MongoDB database.
// The connection string is determined by the NODE_ENV environment variable.
// If the environment is production, it uses the MONGO_PROD connection string.
// Otherwise, it uses the MONGO_DEV connection string.
// The module exports the MongooseModule so that it can be used in other parts of the application.
// The constructor injects the connection and logs the connection status.
// If the connection is successful, it logs a message indicating the environment.
// If the connection fails, it logs a message indicating the failure.
// This module is used to manage the database connection in the application.
// It is imported into the main application module to establish the connection when the application starts.
// The connection is established asynchronously using the forRootAsync method.
// This allows for dynamic configuration of the connection options based on the environment.
// The connection is established using the Mongoose library, which is a popular ODM (Object Document Mapper) for MongoDB.
// The MongooseModule provides a convenient way to connect to MongoDB and manage the connection lifecycle.
// The connection is established using the connection string provided in the environment variables.
