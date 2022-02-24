# Follower Comparison
Compares two CSV lists of followers for changes

### Installation:
The .exe works as-is on Windows.
To use the BATCH File:
1. Extract the contents of the release ZIP-file
2. Make sure https://nodejs.org/ is installed
3. Open PowerShell or regular command prompt
4. Enter `npm install csv-parser` - this will install the necessary node module
5. Run the BATCH File or use `node follower-comparison.js`

### Usage:
The follower list can be generated using CommanderRoot's tools: https://twitch-tools.rootonline.de/followerlist_viewer.php

Entering `compare FileA.csv FileB.csv` will compare the two files, this can be a file in the same folder as the .exe or a relative or even absolute path on the system.

Entering `quit` will close the program.

### Features:
- Parse two (2) .CSV files, currently only proper single comma ',' separator are supported
- Show differences between both lists, including how many and which followers are new and lost
- List users that renamed 
