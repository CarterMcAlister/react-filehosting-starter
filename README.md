#### Usage

This project is created using [Create React App](https://github.com/facebookincubator/create-react-app).

To use this repo locally, start by cloning it and installing the NPM packages.

``` bash
$ npm install
```

Run it locally.

``` bash
$ npm run start
```

To deploy, replace the following in the [`package.json`](package.json) with your S3 bucket and CloudFront distributions.

```
"deploy": "aws s3 sync build/ s3://serverless-filehosting-starter",
"postdeploy": "aws cloudfront create-invalidation --distribution-id E1KTCKT9SOAHBW --paths '/*' && aws cloudfront create-invalidation --distribution-id E3MQXGQ47VCJB0 --paths '/*'",
```

And run.

``` bash
$ npm run deploy
```

