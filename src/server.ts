import app from './app';
import mongoose from 'mongoose';
import config from './app/config';

main().catch(err => console.log(err));

async function main() {
  const mongoUrl = config.db_url;
  if (!mongoUrl) {
    throw new Error('Mongodb url environment variable is not defined');
  }
  await mongoose.connect(mongoUrl as string);
}

app.listen(config.port, () => {
  console.log(`The app listening on port ${config.port}`);
});
