import urllib2
from BeautifulSoup import BeautifulSoup
import requests
import MySQLdb

# Connect to database
db = MySQLdb.connect(host="localhost",
                    user="root",
                    passwd="pw",
                    db="dbname");

# Create cursor for database
cursor = db.cursor()

# Get HTML from wikipedia page
url = "https://www.theguardian.com/news/datablog/2012/aug/09/best-selling-books-all-time-fifty-shades-grey-compare"
response = requests.get(url);
html = response.content;

soup = BeautifulSoup(html);

table = soup.findAll('table', attrs={'class' : 'in-article sortable'});
table = table[0].findAll('tbody');
table = table[0];

list_of_rows = [];
for row in table.findAll('tr'):
    list_of_cells = [];
    for cell in row.findAll('td'):
        text = cell.text.replace('&nbsp;', '');
        text = text.replace("'", '');
        text = text.replace("&amp;", ",");
        list_of_cells.append(text);
    list_of_rows.append(list_of_cells);
    if len(list_of_cells) != 0:
        author = list_of_cells[2].replace(',', '');
        author = author.split(' ');
        author = author[::-1];
        author = ' '.join(author);
        sql = "INSERT INTO Books (Title, Author, Description) VALUES (\'" +  list_of_cells[1] + "\', \'" + author + "\' , \'" + list_of_cells[5] + "\')";
        print sql;
        cursor.execute(sql);
        db.commit();

db.close()
