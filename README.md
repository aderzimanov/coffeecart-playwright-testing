# Overview
This repository contains a test automation project for the Coffee Cart application https://coffee-cart.app/.

Test framework:<b>Playwright</b>  
Programming language: <b>TypeScript</b>  
Test reporter: <b>Allure</b>

# Getting Started

## Requirements

* Allure CommandLine (for local test report generation). 

## Project Setup (Windows)

1. Install Node.JS version 20.16 or higher.
2. Install Java version 1.8 or higher
3. Clone this repository into local folder and run 'npm install'

## Test execution

```
npx playwright test
```

## Allure report generation ( Allure Commandline required)

```
allure serve allure-results
```
