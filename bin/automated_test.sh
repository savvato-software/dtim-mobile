#!/bin/bash
PATH=/home/quizki/apps/node/current/bin:/home/quizki/apps/java/bin:/home/quizki/bin:/home/quizki/.local/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin

# This script runs a test of the app from a user's perspective. It should test everything a user can do. Then it should send an email with the results.
#
# We do this because we never want to be in front of a client, thinking, it was working yesterday, I don't have to check it, it'll be alright, or..
#  That API change I made passed all the unit tests, I can push it no worries.
#
# No. We need to know that shit is working very recently at all times. That's why we do this.

cd /home/quizki/src/eog-mobile
#npx cypress run  --spec "cypress/integration/create-user-spec.js" > cy.out

{
    echo From: easyahinfo@gmail.com
    echo Subject: $HAX_APP_NAME $HAX_APP_ENVIRONMENT test results
    echo
    echo $(date)
    npx cypress run  --spec "cypress/integration/create-user-spec.js" 
} | ssmtp -vvv haxwell@gmail.com


