#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";

//Bank account interface

interface BankAccount {
    accountNumber : number;
    balance : number;
    withdraw(amount : number):void;
    deposit(amount : number):void;
    checkBalance():void;
}

//Bank account class
class BankAccount implements BankAccount{
    accountNumber: number;
    balance: number;

    constructor(accountNumber: number , balance: number){
        this.accountNumber = accountNumber;
        this.balance = balance;
    }

    //Debit Money
    withdraw(amount: number): void {
        if(this.balance >= amount){
            this.balance -= amount
            console.log(chalk.green(`Withdraw $${amount} successfully.\n Your remaining balance is $${this.balance}`));   
        }else {
            console.log(chalk.red("Insufficient Balance Soory!"))
        }
    }

    // Deposit Money
    deposit(amount: number): void {
        if(amount > 100){
            amount -= 1;   // if more tha 100$ deposit fee charged 1$
        } this.balance += amount;
            console.log(chalk.green(`Deposit $${amount} successfully. \n Now your balance is: $${this.balance}`));
    }

    // Check Balance 
    checkBalance(): void {
        console.log(chalk.green(`Current Balance is : $${this.balance}`));
    }
}


// customer class
class Customer{
    firstName : string;
    lastName : string;
    gender : string;
    age: number;
    mobileNumber : number;
    account : BankAccount;

    
    constructor(    firstName : string, lastName : string, gender : string,  age: number, mobileNumber : number, account : BankAccount)
    {
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.age = age;
        this.mobileNumber = mobileNumber;
        this.account = account;
    }
}

// create bank account object
let accounts: BankAccount[] = [
    new BankAccount(1001 ,500), 
    new BankAccount(1002 , 1000), 
    new BankAccount(1003 , 5000), 
]

// create customer object
let customers: Customer[] = [
    new Customer("Shahzaib", "Khan", "Male",21, 3323819058, accounts[0]),
    new Customer("Muhammad", "Naeem", "Male",57, 3332503716, accounts[1]),
    new Customer("Amna", "Adeel", "Female",26, 3272493931, accounts[2])
]

// Function to interact with bank account

async function service(){
    do{
        let accountNumberInput = await inquirer.prompt([{
            name : "accountNumber",
            type : "number",
            message : chalk.yellow("Enter your account number:")
        }])
        
        let customer = customers.find(customer => customer.account.accountNumber === accountNumberInput.accountNumber)
        if(customer){
            console.log(chalk.bold.italic.bgBlue(`\n \t\t\t Welcome ${customer.firstName} ${customer.lastName}! \n`))
            let ans = await inquirer.prompt([{
                name : "select",
                type : "list",
                message : chalk.yellow("Select an operation"),
                choices : ["Deposit","Withdraw", "Check Balance" , "Exit"]
            }])
            switch(ans.select){
                case "Deposit":
                    const depositAmount = await inquirer.prompt([{
                        name : "amount",
                        type : "number",
                        message : chalk.yellow("Enter deposit amount:") 
                    }])
                    customer.account.deposit(depositAmount.amount);
                    break;
                case "Withdraw":
                        const withdrawAmount = await inquirer.prompt([{
                            name : "amount",
                            type : "number",
                            message : chalk.yellow("Enter withdraw amount:") 
                        }])
                        customer.account.withdraw(withdrawAmount.amount);
                        break;
                case "Check Balance":
                            customer.account.checkBalance();
                            break;
                case "Exit":
                    console.log(chalk.yellow("Exit Bank Account."));
                    console.log(chalk.green("\n Thank.u for using our bank services. Have a great day!"))
                    return;    // user exit jesy hi kry ga tou return key word usy bahr ly aii ga loop k        
            }
        } else {
            console.log(chalk.red("Invalid account number! Please Try again..!"))
        }
    } while(true)
}

service()