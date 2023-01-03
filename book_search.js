/** 
 * RECOMMENDATION
 * 
 * To test your code, you should open "tester.html" in a web browser.
 * You can then use the "Developer Tools" to see the JavaScript console.
 * There, you will see the results unit test execution. You are welcome
 * to run the code any way you like, but this is similar to how we will
 * run your code submission.
 * 
 * The Developer Tools in Chrome are available under the "..." menu, 
 * futher hidden under the option "More Tools." In Firefox, they are 
 * under the hamburger (three horizontal lines), also hidden under "More Tools." 
 */

/**
 * Searches for matches in scanned text.
 * @param {string} searchTerm - The word or term we're searching for. 
 * @param {JSON} scannedTextObj - A JSON object representing the scanned text.
 * @returns {JSON} - Search results.
 * */ 
 function findSearchTermInBooks(searchTerm, scannedTextObj) {
    /** You will need to implement your search and 
     * return the appropriate object here. */
    /** Treat hyphens at the end as special cases and combine the word on both ends */
    for (book in scannedTextObj) {
        var numLines = scannedTextObj[book]["Content"].length
        for (line in scannedTextObj[book]["Content"]) {
            if (scannedTextObj[book]["Content"][line]["Text"].slice(-1) == "-" && line < numLines - 1) {
                /** Get both lines with no whitespace */
                hyphenLine = scannedTextObj[book]["Content"][line]["Text"].replace(/-/g, "").split(" ")
                underHyphenLine = scannedTextObj[book]["Content"][parseInt(line)+1]["Text"].split(" ")
                /** Get the end of the hyphen line */
                endOfHyphenLine = hyphenLine.pop()
                /** Get the beginning of the line under the hyphen line */
                beginningOfUnderHyphenLine = underHyphenLine[0]
                /** Combine for the full word */
                fullWord = endOfHyphenLine + beginningOfUnderHyphenLine
                hyphenLine.push(fullWord)
                scannedTextObj[book]["Content"][line]["Text"] = hyphenLine.join(" ")
                underHyphenLine[0] = fullWord
                scannedTextObj[book]["Content"][parseInt(line)+1]["Text"] = underHyphenLine.join(" ")
            }
        }
    }

    var results = []
    for (book in scannedTextObj) {
        for (line in scannedTextObj[book]["Content"]) {
            if (scannedTextObj[book]["Content"][line]["Text"].search(searchTerm) != -1) {
                results.push({
                    "ISBN": scannedTextObj[book]["ISBN"],
                    "Page": scannedTextObj[book]["Content"][line]["Page"],
                    "Line": scannedTextObj[book]["Content"][line]["Line"]
                })
            }
        }
    }

    var result = {
        "SearchTerm": searchTerm,
        "Results": results
    };
    
    return result; 
}

/** Example input object. */
const twentyLeaguesIn = [
    {
        "Title": "Twenty Thousand Leagues Under the Sea",
        "ISBN": "9780000528531",
        "Content": [
            {
                "Page": 31,
                "Line": 8,
                "Text": "now simply went on by her own momentum.  The dark-"
            },
            {
                "Page": 31,
                "Line": 9,
                "Text": "ness was then profound; and however good the Canadian\'s"
            },
            {
                "Page": 31,
                "Line": 10,
                "Text": "eyes were, I asked myself how he had managed to see, and"
            } 
        ] 
    }
]

/** Example input object. */
const twoBooksIn = [
    {
        "Title": "Twenty Thousand Leagues Under the Sea",
        "ISBN": "9780000528531",
        "Content": [
            {
                "Page": 31,
                "Line": 8,
                "Text": "now simply went on by her own momentum.  The dark-"
            },
            {
                "Page": 31,
                "Line": 9,
                "Text": "ness was then profound; and however good the Canadian\'s"
            },
            {
                "Page": 31,
                "Line": 10,
                "Text": "eyes were, I asked myself how he had managed to see, and"
            } 
        ] 
    },
    {
        "Title": "Other Book",
        "ISBN": "2",
        "Content": [
            {
                "Page": 31,
                "Line": 8,
                "Text": "now simply went on by her own momentum.  The dark-"
            },
            {
                "Page": 31,
                "Line": 9,
                "Text": "ness was then profound; and however good the Canadian\'s"
            },
            {
                "Page": 31,
                "Line": 10,
                "Text": "eyes were, I asked myself how he had managed to see, and"
            } 
        ] 
    }
]
    
/** Example output object */
const twentyLeaguesOut = {
    "SearchTerm": "the",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 9
        }
    ]
}

/*
 _   _ _   _ ___ _____   _____ _____ ____ _____ ____  
| | | | \ | |_ _|_   _| |_   _| ____/ ___|_   _/ ___| 
| | | |  \| || |  | |     | | |  _| \___ \ | | \___ \ 
| |_| | |\  || |  | |     | | | |___ ___) || |  ___) |
 \___/|_| \_|___| |_|     |_| |_____|____/ |_| |____/ 
                                                      
 */

/* We have provided two unit tests. They're really just `if` statements that 
 * output to the console. We've provided two tests as examples, and 
 * they should pass with a correct implementation of `findSearchTermInBooks`. 
 * 
 * Please add your unit tests below.
 * */

/** We can check that, given a known input, we get a known output. */
const test1result = findSearchTermInBooks("the", twentyLeaguesIn);
if (JSON.stringify(twentyLeaguesOut) === JSON.stringify(test1result)) {
    console.log("PASS: Test 1");
} else {
    console.log("FAIL: Test 1");
    console.log("Expected:", twentyLeaguesOut);
    console.log("Received:", test1result);
}

/** We could choose to check that we get the right number of results. */
const test2result = findSearchTermInBooks("the", twentyLeaguesIn); 
if (test2result.Results.length == 1) {
    console.log("PASS: Test 2");
} else {
    console.log("FAIL: Test 2");
    console.log("Expected:", twentyLeaguesOut.Results.length);
    console.log("Received:", test2result.Results.length);
}

/** Unit Tests */

/** Positive Tests */
/** Known input, one known output */
/** Output object */
const twentyLeaguesHer = {
    "SearchTerm": "her",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 8
        }
    ]
}
const test3result = findSearchTermInBooks("her", twentyLeaguesIn);
if (JSON.stringify(twentyLeaguesHer) === JSON.stringify(test3result)) {
    console.log("PASS: Test 3");
} else {
    console.log("FAIL: Test 3");
    console.log("Expected:", twentyLeaguesHer);
    console.log("Received:", test3result);
}

/** Known input, two known outputs */
/** Output object */
const twentyLeaguesAnd = {
    "SearchTerm": "and",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 9
        },
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 10
        }
    ]
}
const test4result = findSearchTermInBooks("and", twentyLeaguesIn);
if (JSON.stringify(twentyLeaguesAnd) === JSON.stringify(test4result)) {
    console.log("PASS: Test 4");
} else {
    console.log("FAIL: Test 4");
    console.log("Expected:", twentyLeaguesAnd);
    console.log("Received:", test4result);
}


/** Negative Tests */
/** No match */
/** Output object */
const twentyLeaguesWashed = {
    "SearchTerm": "washed",
    "Results": [
        
    ]
}
const test5result = findSearchTermInBooks("washed", twentyLeaguesIn);
if (JSON.stringify(twentyLeaguesWashed) === JSON.stringify(test5result)) {
    console.log("PASS: Test 5");
} else {
    console.log("FAIL: Test 5");
    console.log("Expected:", twentyLeaguesWashed);
    console.log("Received:", test5result);
}

/** No match */
/** Output object */
const twentyLeaguesManager = {
    "SearchTerm": "manager",
    "Results": [
        
    ]
}
const test6result = findSearchTermInBooks("manager", twentyLeaguesIn);
if (JSON.stringify(twentyLeaguesManager) === JSON.stringify(test6result)) {
    console.log("PASS: Test 6");
} else {
    console.log("FAIL: Test 6");
    console.log("Expected:", twentyLeaguesManager);
    console.log("Received:", test6result);
}

/** Case Sensitive Tests */
/** Known input, no known output */
/** Output object */
const twentyLeaguesOn = {
    "SearchTerm": "On",
    "Results": [
        
    ]
}
const test7result = findSearchTermInBooks("On", twentyLeaguesIn);
if (JSON.stringify(twentyLeaguesOn) === JSON.stringify(test7result)) {
    console.log("PASS: Test 7");
} else {
    console.log("FAIL: Test 7");
    console.log("Expected:", twentyLeaguesOn);
    console.log("Received:", test7result);
}

/** Known input, no known output */
/** Output object */
const twentyLeaguesThe = {
    "SearchTerm": "The",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 8
        }
    ]
}
const test8result = findSearchTermInBooks("The", twentyLeaguesIn);
if (JSON.stringify(twentyLeaguesThe) === JSON.stringify(test8result)) {
    console.log("PASS: Test 8");
} else {
    console.log("FAIL: Test 8");
    console.log("Expected:", twentyLeaguesThe);
    console.log("Received:", test8result);
}

/** Edge Tests */
/** Input object no content */
const noContentIn = [
    {
        "Title": "No Content",
        "ISBN": "1",
        "Content": [
            
        ] 
    }
]
/** Known input, no known output */
/** Output object */
const noContentAny = {
    "SearchTerm": "any",
    "Results": [
        
    ]
}
const test9result = findSearchTermInBooks("any", noContentIn);
if (JSON.stringify(noContentAny) === JSON.stringify(test9result)) {
    console.log("PASS: Test 9");
} else {
    console.log("FAIL: Test 9");
    console.log("Expected:", noContentAny);
    console.log("Received:", test9result);
}

/** No input string */
/** Output object */
const twentyLeaguesNone = {
    "SearchTerm": "",
    "Results": [
        
    ]
}
const test10result = findSearchTermInBooks("", twentyLeaguesIn);
if (JSON.stringify(twentyLeaguesNone) === JSON.stringify(test10result)) {
    console.log("PASS: Test 10");
} else {
    console.log("FAIL: Test 10");
    console.log("Expected:", twentyLeaguesNone);
    console.log("Received:", test10result);
}

/** Input object empty */
const emptyIn = [
    
]
/** Known input, no known output */
/** Output object */
const emptyAny = {
    "SearchTerm": "any",
    "Results": [
        
    ]
}
const test11result = findSearchTermInBooks("any", emptyIn);
if (JSON.stringify(emptyAny) === JSON.stringify(test11result)) {
    console.log("PASS: Test 11");
} else {
    console.log("FAIL: Test 11");
    console.log("Expected:", emptyAny);
    console.log("Received:", test11result);
}

/** Two book input */
/** Output object */
const twoBooksAnd = {
    "SearchTerm": "and",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 9
        },
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 10
        },
        {
            "ISBN": "2",
            "Page": 31,
            "Line": 9
        },
        {
            "ISBN": "2",
            "Page": 31,
            "Line": 10
        }
    ]
}
const test12result = findSearchTermInBooks("and", twoBooksIn);
if (JSON.stringify(twoBooksAnd) === JSON.stringify(test12result)) {
    console.log("PASS: Test 12");
} else {
    console.log("FAIL: Test 12");
    console.log("Expected:", twoBooksAnd);
    console.log("Received:", test12result);
}

/** Darkness hyphenated */
/** Output object */
const twentyLeaguesDarkness = {
    "SearchTerm": "darkness",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 8
        },
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 9
        }
    ]
}
const test13result = findSearchTermInBooks("darkness", twentyLeaguesIn);
if (JSON.stringify(twentyLeaguesDarkness) === JSON.stringify(test13result)) {
    console.log("PASS: Test 13");
} else {
    console.log("FAIL: Test 13");
    console.log("Expected:", twentyLeaguesDarkness);
    console.log("Received:", test13result);
}
