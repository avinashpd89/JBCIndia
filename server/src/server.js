import 'dotenv/config';
import app from './app.js';

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log('AWS Configuration:');
  console.log('Region:', process.env.AWS_REGION);
  console.log('Access Key ID:', process.env.AWS_ACCESS_KEY_ID ? 'Present' : 'Missing');
  console.log('Cognito User Pool ID:', process.env.AWS_COGNITO_USER_POOL_ID);
  console.log('Cognito Client ID:', process.env.AWS_COGNITO_CLIENT_ID);
  console.log('Cognito Client Secret:', process.env.AWS_COGNITO_CLIENT_SECRET);
});
