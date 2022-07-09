LOAD DATA LOCAL INFILE "C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/state_tax.csv"	 
INTO TABLE state_tax
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\n'	
IGNORE 1 ROWS;

LOAD DATA LOCAL INFILE "C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/location.csv"	 
INTO TABLE location
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\n'	
IGNORE 1 ROWS;

LOAD DATA LOCAL INFILE "C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/product_category.csv"	 
INTO TABLE product_category
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\n'	
IGNORE 1 ROWS;

LOAD DATA LOCAL INFILE "C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/supplier.csv"	 
INTO TABLE supplier
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\n'	
IGNORE 1 ROWS;

LOAD DATA LOCAL INFILE "C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/material.csv"	 
INTO TABLE material
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\n'	
IGNORE 1 ROWS;

LOAD DATA LOCAL INFILE "C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/customer.csv"	 
INTO TABLE customer
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\n'	
IGNORE 1 ROWS;

LOAD DATA LOCAL INFILE "C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/product.csv"	 
INTO TABLE product
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\r\n'	
IGNORE 1 ROWS;

LOAD DATA LOCAL INFILE "C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/c_order.csv"	 
INTO TABLE c_order
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\n'	
IGNORE 1 ROWS;

LOAD DATA LOCAL INFILE "C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/review.csv"	 
INTO TABLE review
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\r\n'	
IGNORE 1 ROWS;

LOAD DATA LOCAL INFILE "C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/event.csv"	 
INTO TABLE event
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\n'	
IGNORE 1 ROWS;

LOAD DATA LOCAL INFILE "C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/visit_history.csv"	 
INTO TABLE visit_history
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\n'	
IGNORE 1 ROWS;
	
LOAD DATA LOCAL INFILE "C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/c_order_line_item.csv"	 
INTO TABLE c_order_line_item
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\n'	
IGNORE 1 ROWS;

LOAD DATA LOCAL INFILE "C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/supply_order.csv"	 
INTO TABLE supply_order
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\n'	
IGNORE 1 ROWS;

LOAD DATA LOCAL INFILE "C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/supply_order_line_item.csv"	 
INTO TABLE supply_order_line_item
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\n'	
IGNORE 1 ROWS;

LOAD DATA LOCAL INFILE "C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/supplier_item.csv"	 
INTO TABLE supplier_item
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\n'	
IGNORE 1 ROWS;

/* ------------- UPLOADING PRODUCT IMAGES ------------------ */
Update product SET product_image = (LOAD_FILE('C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/JPG/1.jpg'))
WHERE product_id = '1';

Update product SET product_image = (LOAD_FILE('C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/JPG/2.jpg'))
WHERE product_id = '2';

Update product SET product_image = (LOAD_FILE('C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/JPG/3.jpg'))
WHERE product_id = '3';

Update product SET product_image = (LOAD_FILE('C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/JPG/4.jpg'))
WHERE product_id = '4';

Update product SET product_image = (LOAD_FILE('C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/JPG/5.jpg'))
WHERE product_id = '5';

Update product SET product_image = (LOAD_FILE('C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/JPG/6.jpg'))
WHERE product_id = '6';

Update product SET product_image = (LOAD_FILE('C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/JPG/7.jpg'))
WHERE product_id = '7';

Update product SET product_image = (LOAD_FILE('C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/JPG/8.jpg'))
WHERE product_id = '8';

Update product SET product_image = (LOAD_FILE('C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/JPG/9.jpg'))
WHERE product_id = '9';

Update product SET product_image = (LOAD_FILE('C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/JPG/10.jpg'))
WHERE product_id = '10';

Update product SET product_image = (LOAD_FILE('C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/JPG/11.jpg'))
WHERE product_id = '11';

Update product SET product_image = (LOAD_FILE('C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/JPG/12.jpg'))
WHERE product_id = '12';

Update product SET product_image = (LOAD_FILE('C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/JPG/13.jpg'))
WHERE product_id = '13';

Update product SET product_image = (LOAD_FILE('C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/JPG/14.jpg'))
WHERE product_id = '14';

Update product SET product_image = (LOAD_FILE('C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/JPG/15.jpg'))
WHERE product_id = '15';



