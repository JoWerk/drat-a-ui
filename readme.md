# Drata UI demo

## Summary
The task here was to create a UI test suite for the Drata website.  I chose to use playwright and typescript, though I have never really used playwright 
I thought it would be fun to get to know it a little better as I know that is what is used at Drata.  The AC is as follows...navigate to the Drata 
website and perform the following actions.

1. Check for each page on this website
2. Assert a page element exists on each page
3. Assert that there are no browser console errors on page load
4. Add a Report when the test is completed to show the number of Passing/Failing cases.

## Implementation
I did follow the outlined AC above however i did take some liberties.  First off instead of doing some page object modeling here and defining all pages 
and explicitly visiting each page.  Instead I used the navigation menu to grab all the hrefs for the pages.  From there I created a single tests
that would go to each page.  Check for any console errors and if there is one soft fail.  And from there it goes and checks for the "hero" element which 
I took as the banner to the page.  I also threw out some logging for the total number of pages hit and how many of those pages failed the console error 
or element check.  Seeing as this is Playwright and it has a really nice report I didn't get to fancy with it.

As a note I did also set this up to run in parallel and run in Firefox, Chormium and Safar.

## RUN
- You will need to have npm installed on your machine.  You can do this with something like Brew or Scoop.  
- Use git to pull down the code from the repository (which if you are reading this you probably did pull it down already)
- run `npm` i to install all dependencies
- run `npx playwright test` to run the tests
- if desired you can also run `npx playwright show-report` to show the detailed Playwright report for the tests

FYI since there are quite a few pages and checks going on the tests can take upto or over 1 minute.  If it looks like nothing is happening there is something happening.  
I could have added logging to show that it was going through it page but didn't want to spam the console.







... Thanks for coming to my Ted Talk