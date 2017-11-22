webpackJsonp([0xd469fd7863db],{415:function(t,n){t.exports={data:{post:{html:'<h1 id="testing-and-specifying-the-api"><a href="#testing-and-specifying-the-api" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Testing and Specifying the API</h1>\n<p>A set of useful tools to specify and test your API are pre-configured in the API Platform distribution:</p>\n<ul>\n<li><a href="https://phpunit.de/" target="_blank" rel="nofollow noopener noreferrer">PHPUnit</a> allows to cover your classes with unit tests and to write functional tests thanks to his\nSymfony integration.</li>\n<li><a href="http://docs.behat.org/" target="_blank" rel="nofollow noopener noreferrer">Behat</a> (a <a href="http://en.wikipedia.org/wiki/Behavior-driven_development" target="_blank" rel="nofollow noopener noreferrer">Behavior-driven development</a>\nframework) and its <a href="https://github.com/Behatch/contexts" target="_blank" rel="nofollow noopener noreferrer">Behatch extension</a> (a set of contexts dedicated to REST API and\nJSON documents) are convenient to specify and test your API: write the API specification as user stories and in natural\nlanguage then execute these scenarios against the application to validate its behavior.</li>\n</ul>\n<p>Take a look at <a href="https://symfony.com/doc/current/testing.html" target="_blank" rel="nofollow noopener noreferrer">the Symfony documentation about testing</a> to learn how to use\nPHPUnit in your API Platform project.</p>\n<p>Here is an example of a <a href="http://docs.behat.org/en/latest/user_guide/gherkin.html" target="_blank" rel="nofollow noopener noreferrer">Gherkin</a> feature file specifying the behavior\nof <a href="/docs/distribution/index">the bookstore API we created in the tutorial</a>. Thanks to Behatch, this feature file can be executed against\nthe API without having to write a single line of PHP.</p>\n<div class="gatsby-highlight">\n      <pre class="language-gherkin"><code><span class="token comment"># features/books.feature</span>\n<span class="token feature"><span class="token keyword">Feature:</span><span class="token important"> Manage books and their reviews</span>\n  In order to manage books and their reviews\n  As a client software developer\n  I need to be able to retrieve, create, update and delete them through the API.\n\n  </span><span class="token comment"># the "@createSchema" annotation provided by API Platform creates a temporary SQLite database for testing the API</span>\n  <span class="token tag">@createSchema</span>\n  <span class="token scenario"><span class="token keyword">Scenario:</span><span class="token important"> Create a book</span></span>\n    <span class="token atrule">When</span> I add <span class="token string">"Content-Type"</span> header equal to <span class="token string">"application/ld+json"</span>\n    <span class="token atrule">And</span> I add <span class="token string">"Accept"</span> header equal to <span class="token string">"application/ld+json"</span>\n    <span class="token atrule">And</span> I send a <span class="token string">"POST"</span> request to <span class="token string">"/books"</span> with body:\n    <span class="token pystring string">"""\n    {\n      "isbn": "9781782164104",\n      "title": "Persistence in PHP with the Doctrine ORM",\n      "description": "This book is designed for PHP developers and architects who want to modernize their skills through better understanding of Persistence and ORM.",\n      "author": "Kévin Dunglas",\n      "publicationDate": "2013-12-01"\n    }\n    """</span>\n    <span class="token atrule">Then</span> the response status code should be 201\n    <span class="token atrule">And</span> the response should be in JSON\n    <span class="token atrule">And</span> the header <span class="token string">"Content-Type"</span> should be equal to <span class="token string">"application/ld+json; charset=utf-8"</span>\n    <span class="token atrule">And</span> the JSON should be equal to:\n    <span class="token pystring string">"""\n    {\n      "@context": "/contexts/Book",\n      "@id": "/books/1",\n      "@type": "Book",\n      "id": 1,\n      "isbn": "9781782164104",\n      "title": "Persistence in PHP with the Doctrine ORM",\n      "description": "This book is designed for PHP developers and architects who want to modernize their skills through better understanding of Persistence and ORM.",\n      "author": "K\\u00e9vin Dunglas",\n      "publicationDate": "2013-12-01T00:00:00+00:00",\n      "reviews": []\n    }\n    """</span>\n\n  <span class="token scenario"><span class="token keyword">Scenario:</span><span class="token important"> Retrieve the book list</span></span>\n    <span class="token atrule">When</span> I add <span class="token string">"Accept"</span> header equal to <span class="token string">"application/ld+json"</span>\n    <span class="token atrule">And</span> I send a <span class="token string">"GET"</span> request to <span class="token string">"/books"</span>\n    <span class="token atrule">Then</span> the response status code should be 200\n    <span class="token atrule">And</span> the response should be in JSON\n    <span class="token atrule">And</span> the header <span class="token string">"Content-Type"</span> should be equal to <span class="token string">"application/ld+json; charset=utf-8"</span>\n    <span class="token atrule">And</span> the JSON should be equal to:\n    <span class="token pystring string">"""\n    {\n      "@context": "/contexts/Book",\n      "@id": "/books",\n      "@type": "hydra:Collection",\n      "hydra:member": [\n        {\n          "@id": "/books/1",\n          "@type": "Book",\n          "id": 1,\n          "isbn": "9781782164104",\n          "title": "Persistence in PHP with the Doctrine ORM",\n          "description": "This book is designed for PHP developers and architects who want to modernize their skills through better understanding of Persistence and ORM.",\n          "author": "K\\u00e9vin Dunglas",\n          "publicationDate": "2013-12-01T00:00:00+00:00",\n          "reviews": []\n        }\n      ],\n      "hydra:totalItems": 1\n    }\n    """</span>\n\n  <span class="token scenario"><span class="token keyword">Scenario:</span><span class="token important"> Throw errors when a post is invalid</span></span>\n    <span class="token atrule">When</span> I add <span class="token string">"Content-Type"</span> header equal to <span class="token string">"application/ld+json"</span>\n    <span class="token atrule">And</span> I add <span class="token string">"Accept"</span> header equal to <span class="token string">"application/ld+json"</span>\n    <span class="token atrule">And</span> I send a <span class="token string">"POST"</span> request to <span class="token string">"/books"</span> with body:\n    <span class="token pystring string">"""\n    {\n      "isbn": "1312",\n      "title": "",\n      "description": "Yo!",\n      "author": "Me!",\n      "publicationDate": "2016-01-01"\n    }\n    """</span>\n    <span class="token atrule">Then</span> the response status code should be 400\n    <span class="token atrule">And</span> the response should be in JSON\n    <span class="token atrule">And</span> the header <span class="token string">"Content-Type"</span> should be equal to <span class="token string">"application/ld+json; charset=utf-8"</span>\n    <span class="token atrule">And</span> the JSON should be equal to:\n    <span class="token pystring string">"""\n    {\n      "@context": "/contexts/ConstraintViolationList",\n      "@type": "ConstraintViolationList",\n      "hydra:title": "An error occurred",\n      "hydra:description": "isbn: This value is neither a valid ISBN-10 nor a valid ISBN-13.\\ntitle: This value should not be blank.",\n      "violations": [\n        {\n          "propertyPath": "isbn",\n          "message": "This value is neither a valid ISBN-10 nor a valid ISBN-13."\n        },\n        {\n          "propertyPath": "title",\n          "message": "This value should not be blank."\n        }\n      ]\n    }\n    """</span>\n\n  <span class="token comment"># The "@dropSchema" annotation must be added on the last scenario of the feature file to drop the temporary SQLite database</span>\n  <span class="token tag">@dropSchema</span>\n    <span class="token scenario"><span class="token keyword">Scenario:</span><span class="token important"> Add a review</span></span>\n    <span class="token atrule">When</span> I add <span class="token string">"Content-Type"</span> header equal to <span class="token string">"application/ld+json"</span>\n    <span class="token atrule">When</span> I add <span class="token string">"Accept"</span> header equal to <span class="token string">"application/ld+json"</span>\n    <span class="token atrule">And</span> I send a <span class="token string">"POST"</span> request to <span class="token string">"/reviews"</span> with body:\n    <span class="token pystring string">"""\n    {\n      "rating": 5,\n      "body": "Must have!",\n      "author": "Foo Bar",\n      "publicationDate": "2016-01-01",\n      "book": "/books/1"\n    }\n    """</span>\n    <span class="token atrule">Then</span> the response status code should be 201\n    <span class="token atrule">And</span> the response should be in JSON\n    <span class="token atrule">And</span> the header <span class="token string">"Content-Type"</span> should be equal to <span class="token string">"application/ld+json; charset=utf-8"</span>\n    <span class="token atrule">And</span> the JSON should be equal to:\n    <span class="token pystring string">"""\n    {\n      "@context": "/contexts/Review",\n      "@id": "/reviews/1",\n      "@type": "Review",\n      "id": 1,\n      "rating": 5,\n      "body": "Must have!",\n      "author": "Foo Bar",\n      "publicationDate": "2016-01-01T00:00:00+00:00",\n      "book": "/books/1"\n    }\n    """</span>\n</code></pre>\n      </div>\n<p>The API Platform flavor of Behat also comes with a temporary SQLite database dedicated to tests. It works out of the box.</p>\n<p>Clear the cache of the <code>test</code> environment:</p>\n<div class="gatsby-highlight">\n      <pre class="language-none"><code>$ docker-compose exec app bin/console cache:clear --env=test</code></pre>\n      </div>\n<p>Then run:</p>\n<div class="gatsby-highlight">\n      <pre class="language-none"><code>$ docker-compose exec app vendor/bin/behat</code></pre>\n      </div>\n<p>Everything should be green now. Your Linked Data API is now specified and tested thanks to Behat!</p>\n<p>You may also be interested in these alternative testing tools (not included in the API Platform distribution):</p>\n<ul>\n<li><a href="https://www.getpostman.com/docs/writing_tests" target="_blank" rel="nofollow noopener noreferrer">Postman tests</a> (proprietary): create functional test for your API Platform project\nusing a nice UI, benefit from <a href="https://www.getpostman.com/docs/importing_swagger" target="_blank" rel="nofollow noopener noreferrer">the Swagger integration</a> and run tests\ntest in the CI using <a href="https://github.com/postmanlabs/newman" target="_blank" rel="nofollow noopener noreferrer">newman</a>.</li>\n<li><a href="https://github.com/coduo/php-matcher" target="_blank" rel="nofollow noopener noreferrer">PHP Matcher</a>: the Swiss Army knife of JSON document testing.</li>\n</ul>'},navDoc:{edges:[{node:{title:"The Distribution",path:"distribution",items:[{id:"index",title:"Creating a Fully Featured API in 5 Minutes",anchors:null},{id:"testing",title:"Testing and Specifying the API",anchors:null}]}},{node:{title:"The API Component",path:"core",items:[{id:"index",title:"Introduction",anchors:null},{id:"getting-started",title:"Getting Started",anchors:[{id:"installing-api-platform-core",title:"Installing API Platform Core"},{id:"before-reading-this-documentation",title:"Before Reading this Documentation"},{id:"mapping-the-entities",title:"Mapping the Entities"}]},{id:"configuration",title:"Configuration",anchors:null},{id:"operations",title:"Operations",anchors:[{id:"enabling-and-disabling-operations",title:"Enabling and Disabling Operations"},{id:"configuring-operations",title:"Configuring Operations"},{id:"subresources",title:"Subresources"},{id:"creating-custom-operations-and-controllers",title:"Creating Custom Operations and Controllers"}]},{id:"default-order",title:"Overriding Default Order",anchors:null},{id:"filters",title:"Filters",anchors:[{id:"doctrine-orm-filters",title:"Doctrine ORM Filters"},{id:"serializer-filters",title:"Serializer Filters"},{id:"creating-custom-filters",title:"Creating Custom Filters"}]},{id:"serialization",title:"The Serialization Process",anchors:[{id:"overall-process",title:"Overall Process"},{id:"available-serializers",title:"Available Serializers"},{id:"the-serialization-context-groups-and-relations",title:"The Serialization Context, Groups and Relations"},{id:"embedding-relations",title:"Using Different Serialization Groups per Operation"},{id:"embedding-relations",title:"Embedding Relations"},{id:"changing-the-serialization-context-dynamically",title:"Changing the Serialization Context Dynamically"},{id:"name-conversion",title:"Name Conversion"},{id:"entity-identifier-case",title:"Entity Identifier Case"},{id:"writable-entity-identifier",title:"Writable Entity Identifier"},{id:"embedding-the-json-ld-context",title:"Embedding the JSON-LD Context"},{id:"decorating-a-serializer-and-add-extra-data",title:"Decorating a Serializer and Add Extra Data"}]},{id:"content-negotiation",title:"Content Negotiation",anchors:[{id:"enabling-several-formats",title:"Enabling Several Formats"},{id:"registering-a-custom-serializer",title:"Registering a Custom Serializer"},{id:"creating-a-responder",title:"Creating a Responder"},{id:"writing-a-custom-normalizer",title:"Writing a Custom Normalizer"}]},{id:"validation",title:"Validation",anchors:[{id:"using-validation-groups",title:"Using Validation Groups"},{id:"dynamic-validation-groups",title:"Dynamic Validation Groups"}]},{id:"pagination",title:"Pagination",anchors:[{id:"disabling-the-pagination",title:"Disabling the Pagination"},{id:"changing-the-number-of-items-per-page",title:"Changing the Number of Items per Page"}]},{id:"events",title:"The Event System",anchors:null},{id:"data-providers",title:"Data Providers",anchors:[{id:"creating-a-custom-data-provider",title:"Custom Collection Data Provider"},{id:"returning-a-paged-collection",title:"Custom Item Data Provider"}]},{id:"extensions",title:"Extensions",anchors:[{id:"custom-extension",title:"Custom Extension"},{id:"example",title:"Filter upon the current user"}]},{id:"jwt",title:"JWT Authentification",anchors:[{id:"installing-lexikjwtauthenticationnundle",title:"Installing LexikJWTAuthenticationBundle"},{id:"documenting-the-authentication-mechanism-with-swagger-open-api",title:"Documenting the Authentication Mechanism with Swagger/Open API"},{id:"testing-with-behat",title:"Testing with Behat"}]},{id:"security",title:"Security",anchors:null},{id:"swagger",title:"Swagger Support",anchors:[{id:"overriding-the-swagger-documentation",title:"Overriding the Swagger documentation"},{id:"using-the-swagger-context",title:"Using the Swagger Context"}]},{id:"performance",title:"Performance",anchors:[{id:"enabling-the-builtin-http-cache-invalidation-system",title:"Enabling the Builtin HTTP Cache Invalidation System"},{id:"enabling-the-metadata-cache",title:"Enabling the Metadata Cache"},{id:"using-ppm-php-pm",title:"Using PPM (PHP-PM)"},{id:"doctrine-queries-and-indexes",title:"Doctrine Queries and Indexes"}]},{id:"operation-path-naming",title:"Operation Path Naming",anchors:[{id:"configuration",title:"Configuration"},{id:"create-a-custom-operation-path-resolver",title:"Create a Custom Operation Path Naming"}]},{id:"form-data",title:'Accept "application/x-www-form-urlencoded" Form Data',anchors:null},{id:"external-vocabularies",title:"Using External Vocabularies",anchors:null},{id:"extending-jsonld-context",title:"Extending the JSON-LD context",anchors:null},{id:"fosuser-bundle",title:"FOSUserBundle Integration",anchors:[{id:"installing-the-bundle",title:"Installing the Bundle"},{id:"enabling-the-bridge",title:"Enabling the Bridge"},{id:"creating-a-user-entity-with-serialization-groups",title:'Creating a "User" Entity with Serialization Groups'}]},{id:"nelmio-api-doc",title:"NelmioApiDocBundle integration",anchors:null},{id:"angularjs-integration",title:"AngularJS Integration",anchors:[{id:"restangular",title:"Restangular"},{id:"ng-admin",title:"ng-admin"}]}]}},{node:{title:"The Schema Generator Component",path:"schema-generator",items:[{id:"index",title:"Introduction",anchors:null},{id:"getting-started",title:"Getting Started",anchors:null},{id:"configuration",title:"Configuration",anchors:null}]}},{node:{title:"The Admin Component",path:"admin",items:[{id:"index",title:"Introduction",anchors:[{id:"features",title:"Features"}]},{id:"getting-started",title:"Getting Started",anchors:[{id:"installation",title:"Installation"},{id:"creating-the-admin",title:"Creating the Admin"},{id:"customizing-the-admin",title:"Customizing the Admin"}]},{id:"authentication-support",title:"Authentication Support",anchors:null},{id:"handling-relations-to-collections",title:"Handling Relations to Collections",anchors:[{id:"using-an-autocomplete-input-for-relations",title:"Using an Autocomplete Input for Relations"}]}]}},{node:{title:"The Client Generator Component",path:"client-generator",items:[{id:"index",title:"Introduction",anchors:[{id:"features",title:"Features"}]},{id:"react",title:"React generator",anchors:null},{id:"vuejs",title:"Vue.js generator",anchors:null},{id:"troubleshooting",title:"Troubleshooting",anchors:null}]}},{node:{title:"Deployment",path:"deployment",items:[{id:"index",title:"Introduction",anchors:null},{id:"heroku",title:"Deploying an API Platform App on Heroku",anchors:null},{id:"docker",title:"Using API Platform with Docker",anchors:[{id:"services",title:"Services"},{id:"installation",title:"Installation"}]}]}},{node:{title:"Extra",path:"extra",items:[{id:"philosophy",title:"The Project's Philosophy",anchors:null},{id:"troubleshooting",title:"Troubleshooting",anchors:null},{id:"contribution-guides",title:"Contribution Guides",anchors:null},{id:"conduct",title:"Contributor Code Of Conduct",anchors:null}]}}]}},pathContext:{path:"docs/distribution/testing",current:{path:"docs/distribution/testing",title:"The Distribution - Testing and Specifying the API"},prev:{path:"docs/distribution/index",title:"Creating a Fully Featured API in 5 Minutes",rootPath:"The Distribution"},next:{path:"docs/core/index",title:"The API Component - Introduction"}}}}});
//# sourceMappingURL=path---docs-distribution-testing-8f1b8cfcaae711266c32.js.map