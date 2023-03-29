import { Construct } from 'constructs';
import { Stack, StackProps, NestedStack, NestedStackProps } from 'aws-cdk-lib';
import { aws_codebuild as codebuild } from 'aws-cdk-lib';
import { aws_codecommit as codecommit } from 'aws-cdk-lib';

import * as lambda from 'aws-cdk-lib/aws-lambda';

import * as amplify from '@aws-cdk/aws-amplify-alpha'

export class SiteInfraStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // Part 1 [Optional] - Creation of the source control repository
    const EvonyTKRTipsRepo = new codecommit.Repository(
      this,
      "EvonyTKRTipsRepo",
      {
        repositoryName: "EvonyTKRTips",
        description:
          "Code for both the infrastructure and site for EvonyTKRTips",
      }
    );

		const amplifyApp = new amplify.App(this, "EvonyTKRTips", {
			sourceCodeProvider: new amplify.CodeCommitSourceCodeProvider({
				repository: EvonyTKRTipsRepo,
			}),
		});
		const masterBranch = amplifyApp.addBranch("master");

		const domain = amplifyApp.addDomain('evonytkrtips.net', {
			enableAutoSubdomain: true,
			autoSubdomainCreationPatterns: ['*', 'pr*'],
		});
		domain.mapRoot(masterBranch);
		domain.mapSubDomain(masterBranch, 'www');

		new lambda.Function(this, 'MyFunction', {
      runtime: lambda.Runtime.PYTHON_3_7,
      handler: 'app.lambda_handler',
      code: lambda.Code.fromAsset('./my_function'),
    });


  }
}
