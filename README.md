# AIONYS_TestTask

In this project, the backend and frontend are located in the same directory, but they must be run separately.

In order to start working with Backend, you need to have a visual studio installed.

You need to open the file "AIONYS_TestTask.sln" through the visual studio.

Then wait for the Nuget packages to be automatically installed.

Then in the Solution Platform select from all options only "AIONYS_TestTask", start the project. If you have done everything correctly, a tab will start in the browser, which will be accessed by the frontend via http requests.

* The database will be created in memory, physically it will not exist on your device!

In order to start working with the Frontend part you need to have the visual studio code program installed, as well as Node .js

You need to open the ClientApp folder in the visual studio code.

In the terminal must enter - "npm install", then it will automatically download all the necessary packages.

To start the project (after installing all the required packages), enter the term in the terminal - "npm start".

This will launch Frontend, which will contact Backend via HTTP requests and the page will display the data received from Backend.

In order to run the test you need to create a new terminal, without the need to complete the work of either Backend or Fronted, and enter such a tape - "npm run test:e2e".

* If you have problems with this, then do not automatically install the library that is responsible for testing! In order to install it you need to enter the following command - "npm install cypress". After installation, repeat the previous step.

After successfully running the test in the window that will open, select the test called "homepage.spec.js" and you will see how the tests pass!
