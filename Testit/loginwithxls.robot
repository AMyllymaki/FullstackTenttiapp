*** Settings ***
Resource          resource.robot
Library           SeleniumLibrary
Library           DataDriver                 ./testi.xls    sheet_name=Taulukko1
Suite Setup       Create Exam Setup
Suite Teardown    Create Exam Teardown
Test Template     Create Exams From Excel

*** Tasks ***
Create Exams From Excel ${TentinNimi}    ${Kysymysnimi}    ${VastausvaihtoehtoNimi}


*** Keywords ***
Create Exams From Excel
    [Arguments]    ${TentinNimi}    ${Kysymysnimi}    ${VastausvaihtoehtoNimi}

    Set Selenium speed    1s
    Add Exam
    Select Exam
    Add Question

    FOR                          ${nimi}    IN    @{VastausvaihtoehtoNimi}
    Add Answer Option
    Change Answer Option Name    ${nimi}
    END

    Change Question Name    ${Kysymysnimi}
    Change Exam Name        ${TentinNimi}


Create Exam Setup
    Open Browser               ${URL}    ${BROWSER}
    Maximize Browser Window
    Input Username             Admin
    Input Password             Admin
    Submit Credentials
    Sleep                      2s
    Change User

Create Exam Teardown
    Sleep            3s
    Close Browser



