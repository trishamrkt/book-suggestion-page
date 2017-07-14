import MySQLdb

# Converts isbn 10 to isbn 13
def convertISBN(isbn):
    isbn10 = list(isbn);

    # Remove check digit of isbn 10
    del isbn10[len(isbn) - 1];

    prefix = '978'

    # Convert isbn10 to a string
    isbn10 = ''.join(isbn10);

    isbn13 = prefix + isbn10;

    evenSum = 0;
    oddSum = 0;

    # Get check digit
    for i in range(0, len(isbn13)):
        # Convert str to integer vale
        curr = int(isbn13[i]);
        if i % 2 == 0:
            oddSum += curr;

        else:
            evenSum += curr * 3;

    # Final calculation of check digit
    total = evenSum + oddSum;
    check = (10 - (total % 10)) % 10;
    check = str(check);

    # Concatenate strings to get final isbn 13 number
    isbn13 = isbn13 + check;

    return isbn13;

# Connect to database
db = MySQLdb.connect(host="localhost",
                    user="root",
                    passwd="pw",
                    db="db");

cursor = db.cursor();

# Create ISBN13 table
sql = "alter table Books add ISBN13 varchar(20)";
cursor.execute(sql);
db.commit();

# Get all records in ISBN column
sql = "SELECT ISBN FROM Books";
cursor.execute(sql);
isbnTable = cursor.fetchall();

for row in isbnTable:
    isbn13 = convertISBN(row[0]);

    # SQL statement to execute - update ISBN13 column in Books table
    sql = "UPDATE Books SET ISBN13 = \'" +  isbn13 + "\' WHERE ISBN = \'" + row[0] + "\'";
    cursor.execute(sql);
    db.commit();

db.close();
