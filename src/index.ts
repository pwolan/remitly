import fs from 'fs';
import { AWS_IAM_Role_Policy, StatementElement } from './types';

function checkStatement(statement: StatementElement):boolean {
    if (statement.Resource instanceof Array) {
        if(statement.Resource.includes('*')) {
            return false;
        }
    } else if (statement.Resource === '*') {
        return false;
    }
    return true;
}

export function hasAsterisk(path: string): boolean {

    let policy: AWS_IAM_Role_Policy;
    try {
        const data: string = fs.readFileSync(path, 'utf8');
        policy = JSON.parse(data);
    } catch (error: any) {
        if (error.code === 'ENOENT') {
            console.error(`File not found: ${path}`);
        } else if (error instanceof SyntaxError) {
            console.error(`Syntax Error in JSON file: ${path}`);
        } else {
            console.error(`Unknown error: ${error}`);
        }
        return true;
    }

    const statements = policy.PolicyDocument.Statement;
    if (statements instanceof Array) {
        for (const statement of statements) {
            if(checkStatement(statement) === false) {
                return false;
            }
        }
    } else if (statements instanceof Object) {
        if(checkStatement(statements) === false) {
            return false;
        }
    }
    return true;
}

// execute only if run as a script
if(require.main === module) {
    const path = process.argv[2] || 'resources/data.json';
    console.log(hasAsterisk(path));
}