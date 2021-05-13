# **NEON HANGMAN**

![Landing page](documentation/design/mockup.png)

[View live project here](https://lemocla.github.io/neon-hangman)

This website - an online version of the classic pen and paper game Hangman - was created for educational purposes only as part of the Code Institute’s full stack development course. 

Using the principles of UX design and concepts learnt during the Interactive frontend module, this fully responsive and interactive website was developed using HTML, CSS and javascript. 
 

## **TABLE OF CONTENT** 

  - [UX Design](#ux-design)
    - [Strategy](#strategy)
    - [User stories](#user-stories)
    - [Scope](#scope)
    - [Structure](#structure)
    - [Skeleton](#skeleton)
    - [Design](#design)
  - [Features](#features)
    - [Features implemented](#features-implemented)
    - [Features left to implement](#Features-left-to_implement)
  - [Technologies Used](#technology-used)
    - [Languages](#languages)
    - [Libraries, framework and other technologies](#libraries-framework-and-other-technologies)
  - [Testing](#testing)
  - [Deployment](#deployment)
    - [Deployment of the page](#deployment-of-the-page)
    - [How to run the code locally](#how-to-run-the-code-locally)
   - [Credits](#credits)
     - [Code](#code)
     - [Content](#content)
     - [Media](#media)
     - [Acknowledgments](#acknowledgments)
    
# **UX DESIGN**

- ## **Strategy**

    This website is an online version of the classic word game Hangman, where the player needs to guess a word from the dictionary before time runs out, with the principal aim of providing entertainment to all ages, with the added bonus of offering some educational value to younger players. 

	- ### **For the site owner:**
        - To explore the different features of a game 
        - To create a simple, yet well designed and intuitive website 
        - To put into practice and expand on javascript, jquery libraries and API 
        - To provide an enjoyable and stimulating experience for users of the website 
        - To encourage players to play again and new users to visit the website

    - ### **For the players:** 
        - To access the game across different devices 
        - To have a clear understanding of the rules
        - To have a fun and engaging game experience
        - To feel rewarded for and whilst playing the game 
        - To have a visually pleasing and intuitive interface 
        - To be able to play the game multiple times 
        - To contact the website owner

- ## **User stories**

    - ### **As new player:** 
        - I want a responsive website so that I can access the game on different devices. 
        - I want to easily navigate across the site so that I can find the information I need. 
        - I want the game to upload quickly so that I can start playing as soon as possible. 
        - I want to read the instructions so that I can understand how to play.
        - I want to select a difficulty level so that I can play the game according to my abilities. 
        - I want to be able to turn the sound on and off so that I can enjoy the game according to my preferences.

    - ### **As a player playing the game:**
        - I want to see how many letters there are in the hidden word so that I can plan my guesses.
        - I want to easily click on a letter so that I can find out if it is in the hidden word.
        - I want to see the letters guessed correctly displayed on the screen so that I can find the hidden word.
        - I want to see the letters I’ve already clicked so that I don’t make incorrect guesses again.
        - I want to see the hangman parts so that I know how many attempts I’ve got left. 
        - I want to see the timer so that I know how much time I’ve got left to win the game. 
        - I want to see my score so that I feel rewarded when I am playing.
        - I want the option to exit the game so that I can leave without losing. 
        - I want the option to play again once I finish a game so that I can keep having fun and challenge myself.

    - ### **As a frequent / returning player:**
        - I want to see my leaderboard/statistics so that I can check my progress and achievements. 
        - I want to select a different level so that I can challenge myself/ play according to my ability.
        - I want to contact the company so that I can offer suggestions on how to improve the website.

- ## **Scope**

  - ### **Feature trade off**

    ![feature_trade_off](documentation/scope/feature_tradeoff.png)

    This game will be developed as a minimal viable product with room for future improvement and releases incorporating additional features.

  - ### **Functional requirements**

    - Responsive interface 
    - Collapsible menu 
    - To display instructions and settings
    - To give users ability to choose from different categories and levels of difficulty for the game 
    - To be able to turn sounds on and off 
    - To get random words according the selected level via [WordsAPI](https://www.wordsapi.com/)
    - To get random words from local file according to the selected level and category
    - To get a backup word array stored locally should the API call fails 
    - To display a functional interactive keyboard 
    - To generate and display letter placeholders for the hidden word 
    - The reveal letter from hidden word when the correct key is clicked 
    - To show relevant hangman part when the incorrect letter is clicked 
    - To update scores according to the scoring policy 
    - To inform user when new high score is reached 
    - To run a countdown timer that reset when a new game starts 
    - To identify when a game is finished & inform player of the outcome - win or lose 
    - Give the player the ability to continue playing if a game was won or play again if a game was lost
    - Contact form with mailjs API
    - Error messages if Email API fails 
    - Error messages is all backups fail for generating random word
    - Web storage API to store game information for when players return to website 
  
  - ### **Content requirements**

    - Clear and concise instruction on how to play the game
    - Background images to provide visually appealing and engaging interface 
    - Sounds to provide instant feedback when:
        - Correct / incorrect attempt is made
        - Points are scored 
        - Hangman being drawn 
    - Dynamically / animated hangman image
    - Icons for settings and interactive elements 
    - Headings  for interactive elements that cannot be represented by icons
    - Letters for keyboard

  - ### **Constraints**

    - Technical skills: The site owner is new to Javascript, Jquery and API calls. 
    - Game design skills: The is owner has never designed an online game before.
    - Time: Implementing features using new technical skills will most certainly require a lot of time.

- ## **Structure**

  - ### **Information architecture**

    This game is built on a single webpage with dynamic content displayed according to user interaction and a modal page for the contact form. 

  - ### **Organisation of functionality and content**

    - Header: Logo and collapsible menu
    - Collapsible menu: instructions, settings and leaderboard 
    - Settings: sounds on/off, categories and difficulty levels 
	- Footer: Contact form and links to social media 
	- Game information container: Scores, sounds and timer
	- Game area container: 
		- Play button, congratulation & game over message
        - Hidden word, interactive keyboard and Hangman
    
     **Difference to organisation of functionality and content**   

     Settings also include categories. Since the functional requirements included a backup list of the words, this feature made sense to be implemented at this stage.  

  - ### **Interaction design** 

    - Modal form for contact us page 
    - Buttons & social media icons with hovering effects 
    - Interactive keyboard with:
        - Hovering effect 
        - Actions on click 
        - Disabled once clicked
	- Collapsible menu 
	- Animated hangman

- ## **Skeleton**

    - ### **[Landing page](documentation/wireframes/landing_page.png)** 
        ![Landing page](documentation/wireframes/landing_page.png)

    - ### **Additional wireframes:**
        - [Navigation](documentation/wireframes/navigation.png)
        - [Playing hangman](documentation/wireframes/playing_hangman.png)
        - [Game outcomes](documentation/wireframes/game_outcomes.png)
        - [Contact us](documentation/wireframes/contact_us.png)
        - [Returning users](documentation/wireframes/returning_user.png)

        Wireframes for this project are also available in pdf format and can be found [here](documentation/wireframes/hangman_wireframes.pdf). 

    - ### **Difference:**

      - **Game info:** category is displayed instead of levels.
      - **Menu:** The "close" button has been removed as not necessary.
      - **Settings:** categories have been added to settings in addition to levels.
      - **Popup points:** not implemented.
      - **Win message:** A leave button has been added as well as a line about in-game statistics.
      - **Game over message:** A leave button has been added and content is laid out differently. 

- ### **Design**

  Inspired by nostalgia, the design of the game aims to recreate the spirit of the 80s retro arcade era with a modern twist. 

  - #### **Imagery**

    - Bricked navy background is designed using css only 
    - Neon hangman was designed as a svg (scalable vector graphic), styled with filters and animated using css & javascript.

  - #### **Colour scheme**

    The website uses bright colours and neon effects throughout, as well as gradients to add contrast and make elements blend more together.
    All texts on the website are white, except for the logo.

    Background colour | Color palette
    ------------------ | -----------------
    ![background_color](documentation/design/background_color.png) | ![color_palette](documentation/design/color_palette.jpeg)

  - #### **Typography**

    As part of the arcade theme, the website uses:
    -  [Pixel-operator](https://www.dafont.com/pixel-operator.font) font from Dafont for general text due to its pixel finish.
    -  [Monoton](https://fonts.google.com/specimen/Monoton) from Google Font for the logo as it suits neon effect perfectly.

  - #### **Icons**

    SVG icons from [iconmonstr](https://iconmonstr.com/) and [IcMoon](https://icomoon.io) are used to:
    -  Illustrate interactive elements and game information such as scoring and the timer. 
    -  Bring attention to social media accounts.   

    The icons with their smooth finish also add contrast and complement the pixel font nicely. 

  - #### **Styling**

    - Borders and buttons have slight rounded corners to add a softer and modern feeling to the website.
    - Borders, buttons and hangman are styled with a neon effect as part of the overall theme of the website.


# **FEATURES**

- ## **Features implemented**

   - ### **Responsive layout**
      The website will resize according to the device used for better user experience. 
      The game area should also be fully visible on most screen sizes. As the website design is seeking to emulate a mobile app, the header, game information and game area sections should be fully visible on all mobile devices. 

      > As new player, I want a responsive website so that I can access the game on different devices.
 
    - ### **Collapsible navigation and interactive design**

      The game features a collapsible menu at the top of the page with a dynamic icon that changes when the menu is toggled, to allow users to select their preferences, view the instructions and the leaderboard. 
      
      All interactive elements - including icons and buttons - feature hovering effects and all modals include closing icons. 
      
      > As new player, I want to easily navigate across the site so that I can find the information I need.
 
      ![menu collapsed](documentation/screenshots/menu-collapsed.png)

      ![menu displayed](documentation/screenshots/menu.png)

    - ### **How to play**

      This section offers concise instructions on how to play the game. 

       > - As new player, I want to read the instructions so that I can understand how to play.

       ![how to play](documentation/screenshots/menu_instruction.png)
      
    - ### **Settings**

      In this section, users will be able to select their level and category, as well as their sound preferences.
      Only one item in each section can be selected at any one time and the selected option will be highlighted in bright pink. 
      
      The default settings on the first visit are easy for level, dictionary for category and on for sounds. 
       
       > - As new player, I want to select a difficulty level so that I can play the game according to my abilities.
       > - As new player, I want to be able to turn the sound on and off so that I can enjoy the game according to my preferences.
       > - As a frequent / returning player, I want to select a different level so that I can challenge myself/ play according to my ability.
       
       ![settings](documentation/screenshots/menu_settings.png)

    - ### **Game information**
    
      The game information section features:
       - **Sounds preference:** The sound can also be turned on/off from this section and will be updated in settings.
       - **Categories:** updated dynamically when a new category is selected in settings.
       - **Best score:** displays the best score achieved, regardless of it being recorded or not.
       - **Score:** Incremented dynamically when a game is played and reset to 0 when a game is over.
       - **Timer:** Initially set at zero, the countdown timer will be set at 2 min when the player clicks play/continue.       

      Each element in this section is recorded in the local storage for when the user next visits & plays the game.                                                                                       

      > - As a player playing the game, I want to see the timer so that I know how much time I’ve got left to win the game.
      > - As a player playing the game, I want to see my score so that I feel rewarded when I am playing.
      > - As a returning player, I want to see my leaderboard/statistics so that I can check my progress and achievements.

      ![game info](documentation/screenshots/game-info.png)

    - ### **Play & continue buttons**
      
      To quickly upload the game, the user can click play (or continue if a returning user) to display the hidden word, set the countdown timer and hide all of the hangman parts.

      > As new player, I want the game to upload quickly so that I can start playing as soon as possible.
 
      ![play button](documentation/screenshots/play_button.png)

      ![continue button](documentation/screenshots/continue_button.png)

    - ### **Hidden word section and hint**
      
      When a player starts a game, the hidden word will be dynamically populated according to the level and the category selected. 
      The hidden word will feature as many letter boxes as there are letters in the word. 

       > - As a player playing the game, I want to see how many letters there are in the hidden word so that I can plan my guesses.
       > - As a player playing the game, I want to see the letters guessed correctly displayed on the screen so that I can find the hidden word.  
     
      ![hidden word](documentation/screenshots/hidden_word.png)

       The hidden word is randomly generated as follows:
       - **Selected category -> dictionary:**  
         The "dictionary" category will fetch a random word from [wordsApi](https://www.wordsapi.com/) according to the level selected. The level are set according the words' [zipf](https://simple.wikipedia.org/wiki/Zipf%27s_law) frequency.
       - **Selected category -> animals, food and transport:**  
         These categories will fetch a random word from the local words list according to the level selected.
         The levels have been defined within the list. 
       
       In addition, a limit on the number of characters in a word has been set according to the width of the word container, so that the words are displayed in a user friendly way at all times. 
      
       **Hint**

       This is an additional feature that gives users clues about the hidden word. The clue will toggle when the lightbulb is clicked and, by default, will be displayed for a few seconds before closing again, saving the users the additional task of closing the modal whilst concentrating on finding the hidden word. 
       
       For words generated via the API, hints will be generated at random from a collection of definitions for that word (as some definitions may appear quite odd). 

       ![hint](documentation/screenshots/hint.png) 

    - ### **Interactive keyboard**
 
      The game features an interactive keyboard that allows users to click on letters to guess the hidden word, prompting the letter to be revealed if correct or the relevant hangman part to be displayed if incorrect. 
      
      If the sounds preference are on, a happy sound will play if the letter is correct and a negative one if incorrect.

      Once clicked, the letter will be disabled until the game is finished. 
      
       > - As a player playing the game, I want to easily click on a letter so that I can find out if it is in the hidden word.
       > - As a player playing the game, I want to see the letters I’ve already clicked so that I don’t make incorrect guesses again.

       ![Interactive keyboard](documentation/screenshots/interactive_keyboard.png)
    
    - ### **Scoring**

      The in-game scoring is incremented every time a correct letter is clicked as follows:

      - Default scoring is 10 points per letter.
      - If a player guesses more than one letter consecutively, it's a streak. The default point for that letter is then multiplied by the streak before being added to the score.

      The streak is reset to 0 when an incorrect guess is made. 
      
    - ### **Hangman**

      The game features an svg animated hangman, split in 10 different parts, each being displayed when an incorrect letter is clicked. 

       > - As a player playing the game, I want to see the hangman parts so that I know how many attempts I’ve got left.

      ![hangman](documentation/screenshots/hangman.png)

    - ### **Game win**
      
        When a player has revealed all the letters in the hidden word, a win message will display together with a happy music (if sound preferences are on).

        The player will be offered the option to continue or leave the game. Information will be recorded in the local storage, so that the player can leave the game without losing his score. 
        
        ![game win](documentation/screenshots/game_win.png)

        > - As a player playing the game, I want the option to exit the game so that I can leave without losing.
        > - As a player playing the game, I want the option to play again once I finish a game so that I can keep having fun and challenge myself.
      
    - ### **Game over**

        When all the hangman parts are revealed, the game over message will display (together with a sad music if sounds preferences are on) offering the player the option to play again or leave the game. 
        
        Score will be reset to 0 and, and if a player achieves a new best score, he will be prompted to save his score by entering his name in the designated field. 

        ![game over](documentation/screenshots/gameover.png)

        Game over best score | Game over best score saved
        -------------------- | -------------------
        ![game over best score](documentation/screenshots/gameover_bestscore.png) | ![game over best score saved](documentation/screenshots/gameover_bestscoresaved.png)

        > - As a player playing the game, I want the option to exit the game so that I can leave without losing.
        > - As a player playing the game, I want the option to play again once I finish a game so that I can keep having fun and challenge myself.

    - ### **Leaderboard**

      When players have entered their name to save their best score, the leaderboard will be updated with their details and the date the best score was achieved.

       > - As a returning player, I want to see my leaderboard/statistics so that I can check my progress and achievements.

       ![leaderboard](documentation/screenshots/menu_leaderboard.png) 

    - ### **Local storage**
     
      Local storage will store and retrieve the following data for the player's next visit or for when the page is refreshed.
       - Selected level
       - Selected categories 
       - Sound preferences 
       - Best score
       - Leaderboard 
       - Score   
       - Word count

      In addition, local storage will save and update data for round in progress:
       - Word 
       - Hint
       - Key pressed 
       - Matched letters
       - Incremented score 
       - Count streaks (number of correct letters found in a row)
       - Incorrect count 
       - Timer

    - ### **Footer**
 
      The footer displays a “contact us” button, opening a modal contact form, as well as social media icons with links opening onto a new tab, so that users can browse these without losing access to the website.  

      > As a frequent / returning player, I want to contact the company so that I can offer suggestions on how to improve the website.

      ![footer](documentation/screenshots/footer.png)

      The modal contact form features a closing icon if the user decides not to contact the developer.

      ![modal_form](documentation/screenshots/modal_form.png)

      Upon submitting the form, an email should be sent to the site owner via emailjs and the modal window should close. 
      
      A modal message confirming that the message has been sent successfully should display and, should the emailjs fails, a modal message should inform the user of alternative ways to contact the site owner.  

      ![success_message](documentation/screenshots/success_message.png)

- ## **Features left to implement**

  - Add a feature to allow users to leave a review 
  - Add a database to add and manage words and categories  
  - Add a feature to allow users to challenge a friend with a word by email or social medias.
  - Add a multiplayer mode
  - Convert the website as a Progressive Web Application (PWA) and re-develop the game as an app for ios and android


# **TECHNOLOGY USED**

- ## **Languages**
  - [HTML](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/HTML_basics)
  - [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)
  - [Javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

- ## **Libraries framework and other technologies**
  - [Jquery](https://api.jquery.com/): to simplify Ajax, DOM manipulation and event handling 
  - [Scalable Vector Graphics](https://www.w3.org/TR/SVG11/intro.html) (SVG): for the animated hangman
  - [JavaScript Object Notation](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/JSON) (JSON): for the local words list & array in local storage
  - [wordsAPI](https://www.wordsapi.com/): To generate random words from the dictionary category
  - [Email JS](https://www.emailjs.com/): To send email via the website
  - [Google fonts](https://fonts.google.com/): For the Hangman logo
  - [BeautifyTools](https://beautifytools.com/excel-to-json-converter.php): To convert excel word list into a json file


# **TESTING**

- ## **Introduction**
  
  The website was tested extensively as it was developed with the implementation of new features, using:
  - console.log() and google developer tools
  - testing scenarios manually

- ## **Bugs and solution**

    - ### **The A - for asynchronimous - in the Ajax methods**
      
      At first and due to be relatively new to API and jquery, the developer did not realise that the requests were asynchronimous, meaning that the rest of the code didn't wait for the response to run.  
      
      Therefore all functions related to the hidden word were handled from the callback function within the response, which also added a bit of complexity to the code, as there are two methods to get random words - one of which is a fallback in case the API call fails.

    - ### **SVG hangman and safari**
      
      The animation on safari mobile were a bit jerky and the svg hangman ended up being completely out of place on safari desktop. 
      
      The solution was to set the hangman container display as a flex and to align the content centrally.

    - ### **Local storage and JSON array**
      
      Building and iterating the JSON array for key pressed, letter matchted and best scores -  which includes the date, name and score - proved quite complex and challenging.
      
      The developer used console.log() for every single steps to build, set and retrieve the data. The Code Institute API walkthrough exercise - [working with external resources](https://github.com/Code-Institute-Solutions/WorkingWithExternalResources) - was also used to help build the table. 

    - ### **WordAPI and words with apostrophe**
      
      The interactive keyboard doesn't include symbols, therefore words returned by API should not contain any symbols, such as apostrophes. WordsAPI doesn't have a parameter to exclude these characters, so - to solve this issue - the URL string was amended with "hasDetails=definitions", as words with symbols don't have definitions attached to them.

    - ### **Sounds**
      
      Initially when the same sound was due to be played twice consecutively, the second one would not play. The issue was resolved by setting the sound current time at 0. 

      Upon further testing, the console displayed an error message as follows: "uncaught-in-promise-domexception-while-playing-audio". This error only happened when a page was refreshed and when the timer ran out whilst a game was in progress but the player did not interact with the game.

      To fix this issue, the solution was to:
      - add the attribute muted to the html audio elements and,
      - return a promise playing the sound if successful and handling the error if the promise failed, as suggested by this [Stack overflow post](https://stackoverflow.com/questions/54719283/google-chrome-uncaught-in-promise-domexception-while-playing-audio) and backed by [Google documentation](https://developers.google.com/web/updates/2017/09/autoplay-policy-changes) on autoplay.

      The consequence of the implementation of this solution is that the game over sound will not play if the page has been refreshed whilst a game is in progress but left unattended until the timer runs out.

    - ### **Javascript variable and multiple datatypes**

      The "isPlaying" variable was initially set as a boolean, but when retrieved from the Local Storage it was returned as a string. This created an error in the console when a key was pressed but the game was not yet started, as isPlaying was not taken into consideration. 
      
      The easiest way to fix this was to set all the "isPlaying" as a string with the values "true" or "false" for consistency across the board. 


- ## **User stories**

    The testing of user stories were done manually and can be found in this [section](documentation/testing/user_stories_testing.md).

- ## **Testing fall back for API calls**

    - ### **WordsAPI**

        - **Scenario tested - category: dictionary** 
            - API call fails - tested by adding an additional character in the key
            - Result: the word is fetched at random from the local file - as expected
        
        - **Scenario tested  - category: dictionary**
            - API call fails - tested as above
            - Local file call fails - tested by adding an extra character to the link
            - Result: the word is fetched from the inline array of words
        
        - **Scenario tested - category: animals, food, transport**
            - Local file call fails - tested by adding an extra character to the link
            - Result: the word is fetched from the inline word array.

    - ### **EmailJS** 

        - **Scenario tested**
            - Emailjs call fails - tested by adding an extra character to the service id.
            - Result: the error advising alternative contact is displayed in a a modal.

- ## **Responsiveness and compatibility**

    The website was tested on the following devices and browsers. All tests were successful, except for the sounds being slightly delayed on Firefox and Edge for iPhone X. 

    ![compatibility test](documentation/testing/browser_testing.png) 

    The website was also tested on the following devices: iMac, iPhone 6s and Samsung S10.

    The website was not tested and is not expected to be compatible with Internet Explorer. 

- ## **W3C HTML Code Validator**

    [W3C Markup Validation Service](https://validator.w3.org/) by direct input for index.html and page 404 returned no errors 

    **Report for index.html**
    ![w3c html validator for html](documentation/testing/html_w3c_validator_index.png)

    **Report for page 404**
    ![w3c css validator for page 404](documentation/testing/html_w3c_validator_page404.png)

- ## **W3C CSS Jigsaw Validator**

   [W3C CSS Validator](https://jigsaw.w3.org/css-validator/) by direct input returned no error.

    ![w3c css validator](documentation/testing/css_w3c_validator.png)

- ## **JSHint javascript**

    [JSHint](https://jshint.com) was also installed in gitpod workspace (hence the code comments on top of each page). 

    **Report for game.js** 
    ![jsHint report game js](documentation/testing/jshint_gamejs.png)

    **Report for navigation.js**
    ![jsHint navigation js](documentation/testing/jshint_navigationjs.png)

    **Report for emailjs.js** 
    ![jsHint email js](documentation/testing/jshint_emailjs.png)

    The report shows an indefined variable emailjs, but this is part of the official email js documentation. 

- ## **Testing accessibility - [Wave](https://wave.webaim.org/) report**
 
  The 4 warnings are related to the audio tages but having looked at the documentation, the developer is not quite sure how to meet the criteria successfully. 

  ![wave accessibility report](documentation/testing/wave_report.png)

- ## **Testing performance with [Google Lighthouse](https://developers.google.com/web/tools/lighthouse)**
  
  ![google lighthouse report](documentation/testing/google_lighthouse_report.png)

- ## **Peer code review**

    The website was also submitted for peer code review, which proved extremely useful, as it helped identify that wordsAPI could return words containing special characters (see bugs and solutioon section above).

- ## **Known bugs**

  - Random function may provide the same word consecutively.

  - As the best score is added to the leaderboard when a player enters their name in the input field, the score may be recorded before the player has finished typing their name (this would happen if a player was idling as they type their name).

  - An issue remains on Safari Desktops (MacBook Air) with the hangman svg image. When a player decides to leave the game after he won, the svg image doesn't display properly (but just momentarily).

# **DEPLOYMENT**

- ## **Interface used to develop the website**

    This website was developed on Gitpod using the Code Institute student template with changes frequently committed to git then pushed onto GitHub from the Gitpod terminal.
    
    Several branches were created and merged onto the master when implementing new features. All branches should be updated with the latest version of the website. 
    
    The deployed version of the website is the master. 

- ## **Deployment of the page**
  
    The website was deployed on GitHub using the following steps: 
    - Log onto GitHub 
    - Go to the “repositories” section 
    - Click on the repository:  [lemocla/neon-hangman](https://github.com/lemocla/neon-hangman)
    - Once in the repository, click on "settings" located in the right handside of the menu on top of the repository
    - Click on “Pages” located in the left handside menu
    - Under “Source”, select “Master” in the first tab
    - In the next tab, select “/root” if not already selected by default
    - Click “Save” and the url should be displayed above the "source" section
    - Now that the link is displayed, the website is deployed and can be accessed in the browser by clicking on the url

     ![deployment](documentation/screenshots/deployment.png)

- ## **How to run the code locally**

    To use this project, you can either fork or clone the local repository on gitHug as follows:

  - ### **Forking local repository**

    You can make a copy of the GitHub Repository by "forking" the original repository onto your own account, where changes can be made without affecting the original repository by following the following steps: 
    - Log onto Github
    - Navigate to the GitHub repository : [lemocla/neon-hangman](https://github.com/lemocla/neon-hangman)
    - Click on the fork icon (located on top right of the page at the same level of repository name)
    - You should now have a copy of this repository into your GitHub account.
	- To make a change changes, clone the file into your local IDE.

    ![forking](documentation/screenshots/forking.png)

    For more information on how to fork a repository, please check this [github documentation](https://docs.github.com/en/github/getting-started-with-github/fork-a-repo).

  - ### **Cloning local repository**

    - Log into GitHub and navigate to the GitHub repository: [lemocla/neon-hangman](https://github.com/lemocla/neon-hangman)
    - Above the repository folder and file content, click “Code”
    - Select from one of the following options:
        - **Clone the files using url** 
            -  Copy the url
            -  Create a repository in GitHub and a workspace in your IDE
	        -  Open the terminal and type: $ git clone https://github.com/lemocla/neon-hangman.git
            -  All the files should have been imported in your workspace
	    - **Download zip files**
            - Create a repository in GitHub and a workspace in your IDE
            - Unzip the folder
            - Upload the files into your workspace
    ![cloning](documentation/screenshots/cloning.png)

    You can find all the steps to follow according to your chosen method in this [GitHub documentation](https://docs.github.com/en/github/creating-cloning-and-archiving-repositories/cloning-a-repository) on how to clone a repository.

# **CREDITS**

- ## **Code**

    - [Brick Background Pattern Using Pure CSS](https://www.youtube.com/watch?v=o_hNQQBYpeE) youtube tutorial was used and adapted to build the background.

    - **SVG Hangman**
      - SVG circle path was adapted from the code in this [smashing magazine](https://www.smashingmagazine.com/2019/03/svg-circle-decomposition-paths/) article.
      - SVG drawing animation was styled following the principles in this [codepen post](https://codepen.io/MyXoToD/post/howto-self-drawing-svg-animation).
      - The glow filter for the hangman is from this [stackoverflow post](https://stackoverflow.com/questions/54112231/is-it-possible-to-create-a-glow-effect-in-svg)
    
    - **Changing SVG icons colors**
      - Applying a filter to svg icons were inspired by this [css-Tricks](https://css-tricks.com/change-color-of-svg-on-hover) post.
    
    - **Buttons hovering effect**
      - Hovering effect on button were adapted using this [w3schools tutorial](https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_buttons_fade3).

    - **Form and modals** 
      - Modals were created and adapted using this [w3schools tutorial](https://www.w3schools.com/howto/howto_css_modals.asp).
      - Adapting jsmail api documentation to jquery for prevent submit is from this [w3schools](https://www.w3schools.com/jquery/tryit.asp?filename=tryjquery_event_submit_prevent) article.
    
    - **JSON array** 
      - Sort json array from [c-sharpcorner](https://www.c-sharpcorner.com/UploadFile/fc34aa/sort-json-object-array-based-on-a-key-attribute-in-javascrip/) post.
       ![sorting array](documentation/credit/sorting_array.png)
      - Filtering json array is adapted from this [stack overflow](https://stackoverflow.com/questions/2722159/how-to-filter-object-array-based-on-attributes) post.
      
    - **Timer**
      - Code for the countdown timer is adapted from this [stackoverflow post](https://stackoverflow.com/questions/31106189/create-a-simple-10-second-countdown).
      - Code to turn seconds into a 2 digit number when less than 10 is from this [stackoverflow post](https://stackoverflow.com/questions/3605214/javascript-add-leading-zeroes-to-date).
      ![seconds in 2 digits](documentation/credit/two_digitseconds.png)
    
    - **Sounds**
      - Playing sound with jquery was taken from this [medium blogpost](https://medium.com/@ericschwartz7/adding-audio-to-your-app-with-jquery-fa96b99dfa97).
    
    - **Trigger event on input**
      - The function to trigger adding best score to leadboard is from [this stack overflow post](https://stackoverflow.com/questions/14042193/how-to-trigger-an-event-in-input-text-after-i-stop-typing-writing).
        ![trigger event on input](documentation/credit/trigger_event_input.png)
    
    - **The sound play() promise**
      - The function to handle the promise on sound play() was taken from this [stackoverflow post](https://stackoverflow.com/questions/54719283/google-chrome-uncaught-in-promise-domexception-while-playing-audio).
        ![promise sound play](documentation/credit/promise_soundplay.png) 

    - **Additional**
      - How to to create an array of definitions from api results used [jquery documentation](https://api.jquery.com/jquery.map/). 
      - Solution to target toggled elements was found in [stack overflow post](https://stackoverflow.com/questions/1616006/jquery-select-all-br-with-displaynone/15373670).
   
- ## **Content**

    The content was created by the developer. Some of the words in the transport category were taken from [Enchanted Learning](https://www.enchantedlearning.com/wordlist/transportation.shtml) vehicles and transportation word list. 

- ## **Media**

  -  ### **Images**

     The hangman svg was coded by myself, other icons used on this website were from:  
      - [iconmonstr](https://iconmonstr.com/) for all icons in image folder, except the trophy.  
      - [icomoon](https://icomoon.io/app/#/select) for the trophy svg.  

  -  ### **Sounds**
     
     All sounds are from [mixkit](https://mixkit.co/free-sound-effects/) free online sound library.

  -  ### **Fonts**
     
     The Pixel-operator font used for the text is from [dafont](https://www.dafont.com/pixel-operator.font).

- ## **Acknowledgments**

  - My mentor Can Sucullu for his advice and guidance during this project,
  - My peers from the November What's App Group for their support and guidance,
  - Code Institute tutor support for their brillant advice, 
  - The Code Institute slack community for general advices and solution to problems that others encountered,

   **And a special thank you to my family who helped me design some very creative hints for the local words and test the game.** 
  



