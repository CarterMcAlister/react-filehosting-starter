const dev = {
  s3: {
    REGION: 'us-east-1',
    BUCKET: 'serverless-filehosting-starter-attachmentsbucket-rmzzow0ykvj6'
  },
  apiGateway: {
    REGION: 'us-east-1',
    URL: 'https://dvnhmadm6h.execute-api.us-east-1.amazonaws.com/dev'
  },
  cognito: {
    REGION: 'us-east-1',
    USER_POOL_ID: 'us-east-1_2iED5ewUY',
    APP_CLIENT_ID: '68v1loh6m6afe17vut3hep5pvu',
    IDENTITY_POOL_ID: 'us-east-1:f90d7827-5c7d-4de9-ba5d-ae16900726f0'
  }
}

const prod = {
  s3: {
    REGION: 'YOUR_PROD_S3_UPLOADS_BUCKET_REGION',
    BUCKET: 'YOUR_PROD_S3_UPLOADS_BUCKET_NAME'
  },
  apiGateway: {
    REGION: 'YOUR_PROD_API_GATEWAY_REGION',
    URL: 'YOUR_PROD_API_GATEWAY_URL'
  },
  cognito: {
    REGION: 'YOUR_PROD_COGNITO_REGION',
    USER_POOL_ID: 'YOUR_PROD_COGNITO_USER_POOL_ID',
    APP_CLIENT_ID: 'YOUR_PROD_COGNITO_APP_CLIENT_ID',
    IDENTITY_POOL_ID: 'YOUR_PROD_IDENTITY_POOL_ID'
  }
}

// Default to dev if not set
const config = process.env.REACT_APP_STAGE === 'prod' ? prod : dev

export default {
  // Add common config values here
  MAX_ATTACHMENT_SIZE: 5000000,
  ...config
}
