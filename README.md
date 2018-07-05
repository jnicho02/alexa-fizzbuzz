# Alexa Fizz Buzz

A simple Amazon Alexa number game. This is a demonstration of using Amazon's  [Alexa Skills Kit SDK for nodejs](https://github.com/alexa/alexa-skills-kit-sdk-for-nodejs).

## Launch
```
"Alexa, open Fizz Buzz"
```
or
```
"Alex, play Fizz Buzz"
```

## Play
Count upwards from 1 taking turns with Alexa. If a number is divisible by 3 then say, "fizz". If a number is divisible by 5 say, "buzz". And if it is divisible by both 3 and 5 then say, "fizz buzz".

e.g. "1", "2", "fizz", "4", "buzz", etc.

You lose after you get it wrong for the second time.

## Installation
* Install nodejs
* Register for an [AWS Account](https://aws.amazon.com/)
* Register for an [Amazon Developer Account](https://developer.amazon.com)
* Install and Setup [Serverless Framework](https://serverless.com/framework/docs/getting-started/)

Fork this repository to submit pull requests *OR* use it as a template project for building your own Alexa App. I believe that the easiest way to do this is to use the Serverless Framework.

1. Get the latest version of Serverless:

```bash
npm update -g serverless
```

2. Install from the repository:

```bash
serverless install -u https://github.com/jnicho02/alexa-fizzbuzz/tree/master -n [your_project_name]
```

4. Install npm dependencies:

```bash
cd [your_project_name]/lambda/custom
npm
```

# Setup the language model
Alexa language models are set up in their own special web panel. As of 2018, this is being updated constantly so these instructions may have aged.

1. Open the [Alexa Console](https://developer.amazon.com/alexa/console/ask/)

2. Create a new skill

3. Open your skill

4. Scroll down and select the 'JSON Editor' in the left-hand menu

5. Drag and drop /models/en-GB.json to the editor's 'drag and drop a .json file' panel

# Deploy from Serverless

```bash
sls deploy
```

Use the [AWS Console](https://console.aws.amazon.com/console/home) to see the Lamdba programs created

# Monitor
See the inputs and outputs via the [Alexa web page](https://alexa.amazon.co.uk/spa/)
