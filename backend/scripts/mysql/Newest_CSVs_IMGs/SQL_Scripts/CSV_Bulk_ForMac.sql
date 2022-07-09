LOAD DATA LOCAL INFILE "/Users/rhahansarwar/Documents/GitHub/Capstone/backend/scripts/mysql/Table CSVs/state_tax.csv"	 
INTO TABLE state_tax
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\n'	
IGNORE 1 ROWS;

LOAD DATA LOCAL INFILE "/Users/rhahansarwar/Documents/GitHub/Capstone/backend/scripts/mysql/Table CSVs/location.csv"
INTO TABLE location
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\n'	
IGNORE 1 ROWS;

LOAD DATA LOCAL INFILE "/Users/rhahansarwar/Documents/GitHub/Capstone/backend/scripts/mysql/Table CSVs/product_category.csv"	 
INTO TABLE product_category
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\n'	
IGNORE 1 ROWS;

LOAD DATA LOCAL INFILE "/Users/rhahansarwar/Documents/GitHub/Capstone/backend/scripts/mysql/Table CSVs/supplier.csv"	 
INTO TABLE supplier
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\n'	
IGNORE 1 ROWS;

LOAD DATA  LOCAL INFILE "/Users/rhahansarwar/Documents/GitHub/Capstone/backend/scripts/mysql/Table CSVs/material.csv"	 
INTO TABLE material
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\n'	
IGNORE 1 ROWS;

LOAD DATA LOCAL INFILE "/Users/rhahansarwar/Documents/GitHub/Capstone/backend/scripts/mysql/Table CSVs/customer.csv"	 
INTO TABLE customer
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\n'	
IGNORE 1 ROWS;

LOAD DATA LOCAL INFILE "/Users/rhahansarwar/Documents/GitHub/Capstone/backend/scripts/mysql/Table CSVs/product.csv"	 
INTO TABLE product
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\n'	
IGNORE 1 ROWS;

LOAD DATA LOCAL INFILE "/Users/rhahansarwar/Documents/GitHub/Capstone/backend/scripts/mysql/Table CSVs/c_order.csv"	 
INTO TABLE c_order
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\n'	
IGNORE 1 ROWS;


LOAD DATA LOCAL INFILE "/Users/rhahansarwar/Documents/GitHub/Capstone/backend/scripts/mysql/Table CSVs/review.csv"	 
INTO TABLE review
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\n'	
IGNORE 1 ROWS;

LOAD DATA LOCAL INFILE "/Users/rhahansarwar/Documents/GitHub/Capstone/backend/scripts/mysql/Table CSVs/event.csv"	 
INTO TABLE event
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\n'	
IGNORE 1 ROWS;

LOAD DATA LOCAL INFILE "/Users/rhahansarwar/Documents/GitHub/Capstone/backend/scripts/mysql/Table CSVs/visit_history.csv"	 
INTO TABLE visit_history
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\n'	
IGNORE 1 ROWS;

LOAD DATA LOCAL INFILE "/Users/rhahansarwar/Documents/GitHub/Capstone/backend/scripts/mysql/Table CSVs/c_order_line_item.csv"	 
INTO TABLE c_order_line_item
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\n'	
IGNORE 1 ROWS;

LOAD DATA  LOCAL INFILE "/Users/rhahansarwar/Documents/GitHub/Capstone/backend/scripts/mysql/Table CSVs/supply_order.csv"	 
INTO TABLE supply_order
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\n'	
IGNORE 1 ROWS;

LOAD DATA LOCAL INFILE "/Users/rhahansarwar/Documents/GitHub/Capstone/backend/scripts/mysql/Table CSVs/supply_order_line_item.csv"	 
INTO TABLE supply_order_line_item
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\n'	
IGNORE 1 ROWS;

LOAD DATA LOCAL INFILE "/Users/rhahansarwar/Documents/GitHub/Capstone/backend/scripts/mysql/Table CSVs/supplier_item.csv"	 
INTO TABLE supplier_item
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\n'	
IGNORE 1 ROWS;

