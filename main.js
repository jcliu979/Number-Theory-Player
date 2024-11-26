var mostRecent = null;
// a = b
// a + c = b + c
// ( ( a ) * ( a ) ) = b
// ( ( a ) * ( a ) ) + c = b + c

// 

function addStatement(expression) {

    expression = expression.replace(/ {2}/g, ' ');

    let newStatement = {
        id : statements.length,
        statement : expression,
    }


    const workList = document.getElementById('currentWork');
    workList.innerHTML = '';

    statements.push(newStatement);
    
    currentStatements();
}

function addParenthesisL() {
    let expressionId = document.getElementById('addParenthesisL').value;
    expression = null;
    for (let i = 0; i < statements.length; i++) {
        if (statements[i].id == expressionId) {
            expression = statements[i].statement;
            break;
        }
    }
    if (expression == null) {
        return;
    }
    expressionSplit = expression.split(" = ").filter(Boolean);
    addStatement("( "+expressionSplit[0]+" )" + " = " + expressionSplit[1]);

    document.getElementById('addParenthesisL').value = '';
}

function addParenthesisR() {
    let expressionId = document.getElementById('addParenthesisR').value;
    expression = null;
    for (let i = 0; i < statements.length; i++) {
        if (statements[i].id == expressionId) {
            expression = statements[i].statement;
            break;
        }
    }
    if (expression == null) {
        return;
    }
    expressionSplit = expression.split(" = ").filter(Boolean);
    addStatement(expressionSplit[0] + " = " + "( "+expressionSplit[1]+" )");

    document.getElementById('addParenthesisR').value = '';
}
function takeParenthesisL() {
    let expressionId = document.getElementById('takeParenthesisL').value;
    expression = null;
    for (let i = 0; i < statements.length; i++) {
        if (statements[i].id == expressionId) {
            expression = statements[i].statement;
            break;
        }
    }
    if (expression == null) {
        return;
    }

    expressionSplit = expression.split(" = ").filter(Boolean);

    console.log(expressionSplit[0][0])
    console.log(expressionSplit[0][expressionSplit[0].length - 1])

    if (expressionSplit[0][0] == "(" && expressionSplit[0][expressionSplit[0].length - 1] == ")") {
        addStatement(expressionSplit[0].substring(2, expressionSplit[0].length - 2) + " = " + expressionSplit[1]);
    }

    document.getElementById('takeParenthesisL').value = '';
}
function takeParenthesisR() {
    let expressionId = document.getElementById('takeParenthesisR').value;
    expression = null;
    for (let i = 0; i < statements.length; i++) {
        if (statements[i].id == expressionId) {
            expression = statements[i].statement;
            break;
        }
    }
    if (expression == null) {
        return;
    }

    expressionSplit = expression.split(" = ").filter(Boolean);


    if (expressionSplit[1][0] == "(" && expressionSplit[1][expressionSplit[1].length - 1] == ")") {
        addStatement(expressionSplit[0] + " = " + expressionSplit[1].substring(2, expressionSplit[1].length - 2));
    }

    document.getElementById('takeParenthesisR').value = '';
}

function substitute() {
    let expressionId = document.getElementById('substituteID').value;
    let equationID = document.getElementById('substituteEQ').value;
    expression = null;
    for (let i = 0; i < statements.length; i++) {
        if (statements[i].id == expressionId) {
            
            expression = statements[i].statement;
            break;
        }
    }
    if (expression == null) {
        return;
    }

    equation = null;
    for (let i = 0; i < statements.length; i++) {
        if (statements[i].id == equationID) {
            equation = statements[i].statement;
            break;
        }
    }
    if (equation == null) {
        return;
    }

    let splits = equation.split(" = ").filter(Boolean);
    if (splits.length > 2) {
        return;
    }
    console.log (splits[0])
    console.log (splits[1])
    console.log (expression)
    let length1 = splits[0].length1;
    let length2 = splits[1].length2;
    let result = '';
    let i = 0;
    while (i < expression.length) {
        if (expression.substring(i, i + splits[0].length) == splits[0]) {
            if (splits[1].length > 2)
                result += "( " + splits[1] + " )";
            else {
                result += splits[1];
            }
            i += splits[0].length;
        } else {
            result += expression[i];
            i++;
        }
    }

    addStatement(result);




    // compareStatements(newTheorem, null, null);

    // return result;
    
}

function arraysAreEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) {
        return false;
    }

    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) {
            return false;
        }
    }

    return true;
}

// Thm structure matches antecedent -> consequent
// THM: a = b => a * c = b * c
// ATC: x = y
// CSQ: x + p = y + p
// CSQ: x + p = y + l XXXXXX


function compareStatements(theorem, antecedent, consequent) {
    if (theorem.id == "symmetry") {
        s1 = consequent.split(" = ").filter(Boolean);
        s2 = antecedent.split(" = ").filter(Boolean);
        console.log(s1);
        console.log(s2);
        if (s1[0] == s2[1] && s1[1] == s2[0]) {
            return true;
        }
        return false;
    }

    let splitT = (theorem.antecedent + " ~ " + theorem.consequent).split(' ').filter(Boolean);
    let split = (antecedent + " ~ " + consequent).split(' ').filter(Boolean);

    console.log(splitT);
    console.log(split);
    
    if (split.length != splitT.length) {
        return false;
    }

    let curNum = 2;
    for (let i = 0; i < splitT.length; i++) {
        if (split[i] != splitT[i]) {
            if ((Number.isInteger(splitT[i]) && !Number.isInteger(split[i])) || (!Number.isInteger(splitT[i]) && Number.isInteger(split[i]))) {
                return false;
            }
            curNum += 1;
            cur = split[i];
            curT = splitT[i];
            for (let j = i; j < splitT.length; j++) {
                
                // let changed = false;
                // console.log(j)
                // console.log(split[j])
                // console.log(splitT[j])
                let temp = split[j];
                if (split[j] == cur) {
                    if (splitT[j] != curT)
                        return false;
                    split[j] = curNum;
                }
                if (splitT[j] == curT) {
                    if (temp != cur)
                        return false;
                    splitT[j] = curNum;
                }

            }
        }
        else if (!Number.isInteger(split[i])){
            curNum += 1;
            cur = split[i];
            for (let j = i; j < splitT.length; j++) {
                
                let temp = split[j];
                if (split[j] == cur) {
                    if (splitT[j] != cur)
                        return false;
                    split[j] = curNum;
                }
                if (splitT[j] == cur) {
                    if (temp != cur)
                        return false;
                    splitT[j] = curNum;
                }

            }
        }
    }
    return arraysAreEqual(split, splitT);
    
}

function findTheorem(theoremString) {
    for (let i = 0; i < theorems.length; i++) {
        if (theorems[i].id == theoremString) {
            
            return theorems[i];
        }
    }
    return null
}

function addVars(string) {
    let split = (string).split(' ').filter(Boolean);

    for (let i = 0; i < split.length; i++) {
        if (!(split[i] != "=" && split[i] != "+" && split[i] != "*" && 
            split[i] != "-" && split[i] != "(" && split[i] != ")" && 
            Number.isInteger(split[i]))) {
                variables.add(split[i]);
            }
    }

}

function submitVariable() {
    var string = document.getElementById('variableInput').value;
    var def = (string).split("=").filter(Boolean);
    def = (def[0]).split(' ').filter(Boolean);
    def = def[0];
    if (def.length > 1) {
        return;
    }
    if (variables.has(def)) {
        return;
    }

    console.log(variables.has(def));

    variables.add(def);

    addStatement(string);

    document.getElementById('variableInput').value = '';
}


function submitEntry() {
    var antecedent = document.getElementById('antecedentInput').value;
    console.log(antecedent)
    if (antecedent.length == 0) {
        antecedent = "ALWAYS";
    }
    else {
        let exists = false;
        for (let i = 0; i < statements.length; i++) {
            if (antecedent == statements[i].statement) {
                exists = true;
                break;
            }
        }
        if (!exists) {
            for (let i = 0; i < preconds.length; i++) {
                if (antecedent == preconds) {
                    exists = true;
                    break;
                }
            }
        }
        if (!exists) {
            return;
        }
    }

    var consequent =  document.getElementById('consequentInput').value;
    var theoremString = document.getElementById('theoremIdInput').value;

    theorem = findTheorem(theoremString);

    console.log(theorem)
    console.log(antecedent)
    console.log(consequent)

    if (!compareStatements(theorem, antecedent, consequent)) {
        return;
    }

    mostRecent = consequent;
    let newStatement = {
        id: statements.length,
        statement: consequent,
    };
    

    addVars(consequent);
    statements.push(newStatement);

    document.getElementById('antecedentInput').value = '';
    document.getElementById('consequentInput').value = '';
    document.getElementById('theoremIdInput').value = '';
    const workList = document.getElementById('currentWork');
    workList.innerHTML = ''; // Clear the content of the currentWork div
  currentStatements();
}

function submitTheorem() {
    var theoremName = document.getElementById('create theorem').value;
    precond = preconds
    if (preconds.length == 0) {
        precond = "ALWAYS";
    }
    let newTheorem = {
        id: theoremName,
        antecedent: precond,
        consequent: mostRecent,
    };
    

    // Add the new statement to the statements array
    theorems.push(newTheorem);

    // Clear input fields after submission if needed
    document.getElementById('create theorem').value = '';
    const workList = document.getElementById('theoremList');
    workList.innerHTML = '';
    displayTheorems();
    populateTheoremDropdown();
}


function submitPrecond() {
    var precond = document.getElementById('precondInput').value;
    
    let newStatement = precond;

    preconds.push(newStatement);
    addVars(newStatement);

    document.getElementById('precondInput').value = '';
    const workList = document.getElementById('preconds');
    workList.innerHTML = ''; 
    currentPreconds();
}

function clearStatements() {
    const workList = document.getElementById('currentWork');
    workList.innerHTML = ''; 
    const workListP = document.getElementById('preconds');
    workListP.innerHTML = '';
    statements = [

    ];
    preconds = [

    ];
    variables = new Set();
    mostRecent = null;
    
    // currentStatements();
}

function displayTheorems() {
  const theoremListDiv = document.getElementById('theoremList');
  const table = document.createElement('table');
  table.innerHTML = `
    <thead>
      <tr>
        <th>ID</th>
        <th>Statement</th>
      </tr>
    </thead>
    <tbody>
      ${theorems.map(theorem => `
        <tr>
          <td>${theorem.id}</td>
          <td>${theorem.antecedent} => ${theorem.consequent}</td>
        </tr>
      `).join('')}
    </tbody>
  `;
  theoremListDiv.appendChild(table);
}

function currentPreconds() {
  const workList = document.getElementById('preconds');
  const table = document.createElement('table');
  table.innerHTML = `
    <thead>
      <tr>
        <th>Preconditions</th>
      </tr>
    </thead>
    <tbody>
      ${preconds.map(statement => `
        <tr>
          <td>${statement}</td>
        </tr>
      `).join('')}
    </tbody>
  `;
  workList.appendChild(table);
}


function currentStatements() {
  const workList = document.getElementById('currentWork');
  const table = document.createElement('table');
  table.innerHTML = `
    <thead>
      <tr>
        <th>Current Workspace</th>
      </tr>
    </thead>
    <tbody>
      ${statements.map(statement => `
        <tr>
          <td>${statement.id}</td>
          <td>${statement.statement}</td>
        </tr>
      `).join('')}
    </tbody>
  `;
  workList.appendChild(table);
}

let preconds = [
//   {
//     statement: "holder",
//   },
];

let statements = [
//   {
//     id: "0",
//     statement: "a = a",
//   },
];
let theorems = [
  {
    id: "reflexivity",
    antecedent: "ALWAYS",
    consequent: "a = a",
  },
  {
    id: "symmetry",
    antecedent: "a = b",
    consequent: "b = a",
  },
  {
    id: "transitivity",
    antecedent: ["a = b", "b = c"],
    consequent: "a = c",
  },
  {
    id: "multiplication",
    antecedent: "a = b",
    consequent: "a * c = b * c",
  },
  {
    id: "addition",
    antecedent: "a = b",
    consequent: "a + c = b + c",
  },
  {
    id: "mult identity",
    antecedent: "ALWAYS",
    consequent: "a * 1 = a",
  },
  {
    id: "add identity",
    antecedent: "ALWAYS",
    consequent: "a + 0 = a",
  },
  {
    id: "mult commutativity",
    antecedent: "ALWAYS",
    consequent: "a * b = b * a",
  },
  {
    id: "add commutativity",
    antecedent: "ALWAYS",
    consequent: "a + b = b + a",
  },
  {
    id: "mult associativity",
    antecedent: "ALWAYS",
    consequent: "( a * b ) * c = a * ( b * c )",
  },
  {
    id: "add associativity",
    antecedent: "ALWAYS",
    consequent: "( a + b ) + c = a + ( b + c )",
  },
  {
    id: "add inverse",
    antecedent: "ALWAYS",
    consequent: "a + ( - a ) = 0",
  },
  {
    id: "distributivity",
    antecedent: "ALWAYS",
    consequent: "a * ( b + c ) = a * b + a * c",
  },
];

function populateTheoremDropdown() {
    let selectElement = document.getElementById("theoremIdInput");

    theorems.forEach(theorem => {
        let option = document.createElement("option");
        option.value = theorem.id;
        option.text = theorem.id;
        selectElement.appendChild(option);
    });
}
populateTheoremDropdown();
let variables = new Set();

// Display the list of theorems on page load
currentPreconds();
displayTheorems();
currentStatements();