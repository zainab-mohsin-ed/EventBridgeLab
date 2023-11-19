import { useState, useEffect } from 'react';
import AWS from 'aws-sdk';

export default function useFetch(queryField, queryAttributesStr) {
  // Declaring the essential state variables for data and checking
  // if the request is loading or succeeded
  const [data, setData] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true);

  const sample_labs = {
    data : [
      {
        CourseName: 'The Detailed Workings of AWS S3',
        CourseURL: 'https://www.educative.io/courses/detailed-workings-aws-s3',
        ImageURL:
          'https://www.educative.io/cdn-cgi/image/format=auto,width=950,quality=75/v2api/collection/10370001/6071752037236736/image/6458556865314816',
      },
      {
        CourseName: 'The Good Parts of AWS: Cutting Through the Clutter',
        CourseURL: 'https://www.educative.io/courses/good-parts-of-aws',
        ImageURL:
          'https://www.educative.io/cdn-cgi/image/format=auto,width=950,quality=75/v2api/collection/10370001/5943367834796032/image/4534786195456000',
      },
      {
        CourseName: 'Create an EKS Cluster and Deploy an Application',
        CourseURL:
          'https://www.educative.io/cloudlabs/create-an-eks-cluster-and-deploy-an-application',
        ImageURL:
          'https://www.educative.io/cdn-cgi/image/format=auto,width=750,quality=75/v2api/collection/10370001/5268241073831936/image/6466459398832128',
      },
      {
        CourseName: 'Educative Bot with Lambda Function Fulfillment using AWS LEX',
        CourseURL:
          'https://www.educative.io/cloudlabs/educative-bot-with-lambda-function-fulfillment-using-aws-lex',
        ImageURL:
          'https://www.educative.io/cdn-cgi/image/format=auto,width=750,quality=75/v2api/collection/10370001/6744845660717056/image/6171933378609152',
      },
      {
        CourseName: 'Building Private APIs Using API Gateway',
        CourseURL:
          'https://www.educative.io/cloudlabs/building-private-apis-using-api-gateway',
        ImageURL:
          'https://www.educative.io/cdn-cgi/image/format=auto,width=750,quality=75/v2api/collection/10370001/4638899933282304/image/4769111965696000',
      },
      {
        CourseName: 'Securing AWS Resources: Managing Access with IAM',
        CourseURL:
          'https://www.educative.io/cloudlabs/securing-aws-resources-managing-access-with-iam',
        ImageURL:
          'https://www.educative.io/cdn-cgi/image/format=auto,width=750,quality=75/v2api/collection/10370001/5100221100195840/image/6398980309909504',
      },
      {
        CourseName: 'Building a CI/CD Pipeline with AWS CodePipeline',
        CourseURL:
          'https://www.educative.io/cloudlabs/building-a-ci-cd-pipeline-with-aws-codepipeline',
        ImageURL:
          'https://www.educative.io/cdn-cgi/image/format=auto,width=750,quality=75/v2api/collection/10370001/4619863233658880/image/5800135905509376',
      },
      {
        CourseName: 'A Programmer’s Guide to AWS S3',
        CourseURL: 'https://www.educative.io/courses/programmers-guide-aws-s3',
        ImageURL:
          'https://www.educative.io/cdn-cgi/image/format=auto,width=950,quality=75/v2api/collection/6586453712175104/6069778877251584/image/6355722015342592',
      },
    ]
  };

  useEffect(() => {
    // Changing loading and success state to true whenever there's an effect
    setLoading(true);
    setSuccess(false);

    // Extracting data from queryAttributesStr
    const queryAttributes = JSON.parse(queryAttributesStr);

    // asynchronous function to make API call
    async function fetchData() {
      setData(sample_labs)
      setLoading(false)
      setSuccess(true)
    }

    // Making sure that a null field is not passed
    if (queryField) {
      fetchData();
    } else {
      setLoading(false);
      setSuccess(true);
    }


    // Defining variables that trigger useFetch
  }, [queryField, queryAttributesStr]);

  // Returning useFetch response
  return { data, success, loading };
}