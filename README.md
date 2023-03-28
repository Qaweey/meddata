MED-DATA
This is Defi allow patients to store their medical record and grant access to doctors or any other person to view their medical record. It was built using React and Solidity.

GETTING STARTED
Prerequisites
To run this smart contract, you will need to have tool such as hardhat command.

Installing

Clone the repository.
Install dependencies using npm install both in frontend and back end folder.
Running the Contract
Compile the smart contract using npx hardhat compile.
Deploy the smart contract using npx hardhat run --network polygon_mumbai scripts/deploy.js.

Start the React app using npm start.

APP FEATURE
-Register user-This feature registers the user.
-Upload Record- This allows you to upload your medical record image
-View Record- This allows you to view your medical record
-Authorize Users-This allows you to grant another user(e.g doctors) permission to view your medical record using his or her address.
-Get Patient Record - allows the authorized user to view your medical records

Testing
To run the tests for this smart contract, use npx hardhat test.

Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

License
SPDX-License-Identifier: MIT.
