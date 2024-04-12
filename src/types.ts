export interface AWS_IAM_Role_Policy {
    PolicyDocument: PolicyDocument;
    PolicyName: string;
}

export interface PolicyDocument {
    Version: '2012-10-17' | '2008-10-17';
    Id?: string;
    Statement: StatementElement | StatementElement[];
}

export interface StatementElement {
    Sid?: string; 
    Effect: 'Allow' | 'Deny';
    Principal?: object;
    NotPrincipal?: object;
    Action: string | string[];
    NotAction?: string | string[];
    Resource: string | string[];
    NotResource?: string | string[];
    Condition?: object;
}