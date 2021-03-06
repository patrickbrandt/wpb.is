# Easy vanity urls

I've made a simple vanity URL service for myself (wpb.is) using the following:

* [API Gateway](https://aws.amazon.com/api-gateway/)
* [AWS Lambda](https://aws.amazon.com/lambda/)
* [DynamoDB](https://aws.amazon.com/dynamodb/)
* [Route53](https://aws.amazon.com/route53/)
* [The Serverless Framework](https://serverless.com/)

## Examples

* [wpb.is/linkedin](https://wpb.is/linkedin)
* [wpb.is/github](https://wpb.is/github)
* [wpb.is/resume](https://wpb.is/resume)
* [wpb.is/this](https://wpb.is/this)

## Make it easy

First I ```npm install``` and then I deploy like this: ```sls deploy```

I manage vanity URLs with the DynamoDB portal like this:

![image](https://cloud.githubusercontent.com/assets/11197026/21528379/173305dc-cd00-11e6-8475-4d9fdcba0387.png)

## A little more info

I registered wpb.is with [ISNIC](https://www.isnic.is/en/) and then delegated DNS resolution to Route53 (Route53 has the SOA record - the AWS Name Servers are mapped to the DNS entry at ISNIC). Once done, I used API Gateway [Custom Domains](http://docs.aws.amazon.com/apigateway/latest/developerguide/how-to-custom-domains.html) and Route53 to create an Alias record.
