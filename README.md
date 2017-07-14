booklr:
-  a webpage that lets the user enter a book title and will give them other book suggestions based on their search
-  written using angularjs and php
- uses php to access MySQL database and return data in .json format
- data obtained from database - located in bookdata.php
- web scraping using Python BeautifulSoup library to get book information for database

MAIN FEATURES:
- navi bar: links to home page, favourites, and about
  - has search bar that can be toggled
  - uses Angular Routing to navigate between pages
- home page: has main search function
  - provides user with title suggestions based on similarity to user input
- suggestions: filters out similar titles based on genre
  - when hover on suggestion - can get links to amazon and chapters product pages
  - can click on heart icon to add book to favourites
- favourites: saves books that users like
  - can remove from favourites list
  - also has access to amazon and chapters product pages

MAIN FILES:
- book_demo.php: used to access MySQL database on personal computer
- booktest.py: uses BeautifulSoup and web scraping to add records to database
- addisbn13.py: converts 10 digit isbn to 13 digit isbn and adds values to table
  - needed for chapters product page links
