# Easy vanity urls

I've made a simple vanity URL service for myself (wpb.is) using the following:

* [API Gateway](https://aws.amazon.com/api-gateway/)
* [AWS Lambda](https://aws.amazon.com/lambda/)
* [DynamoDB](https://aws.amazon.com/dynamodb/)
* [Route53](https://aws.amazon.com/route53/)
* [The Serverless Develpment Framework](https://serverless.com/)

##Make it easy

I deploy like this: ```sls deploy```

I manage vanity URLs with the DynamoDB portal like this:

![image](https://cloud.githubusercontent.com/assets/11197026/21528379/173305dc-cd00-11e6-8475-4d9fdcba0387.png)

##Examples

* [wpb.is/linkedin](https://wpb.is/linkedin)
* [wpb.is/github](https://wpb.is/github)
* [wpb.is/this](https://wpb.is/this)
