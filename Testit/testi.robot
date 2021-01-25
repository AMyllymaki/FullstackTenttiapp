*** Settings ***
Resource          resource.robot
Library           SeleniumLibrary

*** Test Cases ***
Valid Login
    Open Browser    localhost:3000  chrome
    Input Username  Admin
    Input Password  Admin
    Submit Credentials
