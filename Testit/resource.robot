*** Settings ***
Documentation    A resource file with reusable keywords and variables.
...
...        The system specific keywords created here form our own
...        domain specific language. They utilize keywords provided
...        by the imported SeleniumLibrary.
Library    SeleniumLibrary

*** Variables ***
${URL}        localhost:3000
${BROWSER}    Chrome
${DELAY}      0

*** Keywords ***

Input Username
    [Arguments]    ${username}
    Input Text     username_field    ${username}

Input Password
    [Arguments]    ${password}
    Input Text     password_field    ${password}

Submit Credentials
    Click Button    login_button

Change User
    Click Button    VaihdaKäyttäjääButton

Add Exam
    Click Button    LisääTenttiButton

Change Exam Name
    [Arguments]    ${TentinNimi}    
    Input Text     tyhjä_tentti     ${TentinNimi}    

Select Exam
    Click Element    tyhjä_tentti    

Add Question
    Click Button    LisääKysymysButton

Change Question Name
    [Arguments]    ${KysymyksenNimi}    
    Input Text     tyhjä_kysymys        ${KysymyksenNimi}

Select Question
    Click Element    tyhjä_kysymys    

Add Answer Option
    Click Button    LisääVastausvaihtoehto

Change Answer Option Name 
    [Arguments]    ${VastausvaihtoehdonNimi}    
    Input Text     tyhjä_vastausvaihtoehto      ${VastausvaihtoehdonNimi}    


