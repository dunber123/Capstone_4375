CREATE TABLE c_order(
  c_order_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  c_order_date DATE NOT NULL,
  c_order_paid TINYINT NOT NULL,
  customer_id INT NOT NULL,
  review_id INT NULL DEFAULT NULL,
  c_order_payment_method VARCHAR(45) NOT NULL,
  c_order_ship BOOLEAN NOT NULL,
  c_order_ship_status BOOLEAN NULL DEFAULT NULL,
  c_order_ship_cost DECIMAL(10,2) NULL DEFAULT NULL,
  c_order_subtotal DECIMAL(10,2) NULL DEFAULT NULL,
  c_order_tax DECIMAL(10,2) NULL DEFAULT NULL,
  c_order_total DECIMAL(10,2) NULL DEFAULT NULL
);

CREATE TABLE c_order_line_item(
  c_order_id INT NOT NULL,
  product_id INT NOT NULL,
  c_oli_count INT NOT NULL DEFAULT 1,
  c_oli_discount DECIMAL(10,2) NULL DEFAULT NULL,
  PRIMARY KEY(c_order_id, product_id)
);

CREATE TABLE product(
  product_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL ,
  product_name varchar(250) NOT NULL,
  product_category INT NOT NULL,
  product_desc TEXT NOT NULL,
  product_cost DECIMAL(10,2) NOT NULL,
  product_image LONGBLOB NULL DEFAULT NULL
);

CREATE TABLE product_category(
	prod_cat_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    prod_cat_name varchar(250) NOT NULL
);

CREATE TABLE product_specification(
ps_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
product_id INT NOT NULL,
prod_cat_id INT NOT NULL,
product_main BOOLEAN DEFAULT NULL
);



CREATE TABLE supply_order(
  so_id INT AUTO_INCREMENT NOT NULL,
  so_date DATE NOT NULL,
  supplier_id INT NOT NULL,
  so_payment_methods VARCHAR(45) NOT NULL,
  so_subtotal DECIMAL(10,2) NOT NULL,
  so_shipping DECIMAL(10,2) NOT NULL,
  so_tax DECIMAL(10,2) NOT NULL,
  so_total DECIMAL(10,2) NOT NULL,
  CONSTRAINT SO_PK primary key (so_id)
);

CREATE TABLE supply_order_line_item(
  so_id INT NOT NULL,
  material_id INT NOT NULL,
  soli_count INT NOT NULL,
  soli_discount DECIMAL(10,2) NULL DEFAULT NULL,
  PRIMARY KEY(so_id, material_id)
);

CREATE TABLE material(
  material_id INT  AUTO_INCREMENT NOT NULL,
  material_name VARCHAR(255) NOT NULL,
  material_desc VARCHAR(255) NOT NULL,
  material_cost DECIMAL(10,2) NOT NULL,
CONSTRAINT Material_PK primary key (material_id)
);

CREATE TABLE supplier_item(
  supplier_id INT NOT NULL,
  material_id INT NOT NULL,
  si_name VARCHAR(255) NOT NULL,
  PRIMARY KEY(supplier_id, material_id)
);

CREATE TABLE supplier(
  supplier_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  supplier_name VARCHAR(255) NOT NULL,
  supplier_address VARCHAR(255) DEFAULT NULL,
  supplier_address_two VARCHAR(255) DEFAULT NULL,
  supplier_city VARCHAR(255) DEFAULT NULL,
  supplier_state VARCHAR(2) DEFAULT NULL,
  supplier_zip INT  DEFAULT NULL,
  supplier_contact_f_name VARCHAR(255) NOT NULL,
  supplier_contact_l_name VARCHAR(255) NOT NULL,
  supplier_contact_email VARCHAR(255) NOT NULL,
  supplier_notes VARCHAR(255) DEFAULT NULL
);


CREATE TABLE customer(
  customer_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  customer_f_name VARCHAR(45) NOT NULL,
  customer_l_name VARCHAR(45) NOT NULL,
  customer_ship_address VARCHAR(45) DEFAULT NULL,
  customer_ship_address_two VARCHAR(45) DEFAULT NULL,
  customer_ship_city VARCHAR(45) DEFAULT NULL,
  customer_ship_state CHAR(2) DEFAULT NULL,
  customer_ship_zip INT UNSIGNED ZEROFILL DEFAULT NULL,
  customer_bill_address VARCHAR(45) NOT NULL,
  customer_bill_address_two VARCHAR(45) DEFAULT NULL,
  customer_bill_city VARCHAR(45) NOT NULL,
  customer_bill_state CHAR(2) NOT NULL,
  customer_bill_zip INT UNSIGNED ZEROFILL NOT NULL,
  customer_email VARCHAR(45) NOT NULL,
  customer_point_total INT NOT NULL
);

CREATE TABLE location(
  location_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  location_name VARCHAR(45) NOT NULL,
  location_address VARCHAR(45) NOT NULL,
  location_address_two VARCHAR(45) DEFAULT NULL,
  location_city VARCHAR(45) NOT NULL,
  location_state CHAR(2) NOT NULL,
  location_zip INT UNSIGNED ZEROFILL NOT NULL
);

CREATE TABLE visit_history(
  customer_id INT NOT NULL,
  location_id INT NOT NULL,
  PRIMARY KEY(customer_id, location_id)
);

CREATE TABLE event(
  event_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  location_id INT NOT NULL,
  event_name VARCHAR(255) NOT NULL,
  event_desc TEXT NOT NULL,
  event_date DATE DEFAULT NULL
);

CREATE TABLE state_tax(
  state_abbr CHAR(2) PRIMARY KEY NOT NULL,
  state_tax_rate FLOAT NOT NULL
);

CREATE TABLE review(
  review_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  c_order_id INT NOT NULL,
  product_id INT NOT NULL,
  review_rating INT NOT NULL,
  review_desc VARCHAR(255) NOT NULL
);

CREATE TABLE user(
  user_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  user_name VARCHAR(45),
  user_pass VARCHAR(45)
);



-- Alter Statements For C_Order
ALTER TABLE c_order
ADD CONSTRAINT FK_CustomerOrder
FOREIGN KEY (customer_id) REFERENCES customer(customer_id) on delete cascade;

-- Alter Statements For C_Order_Line_Item

ALTER TABLE c_order_line_item
ADD CONSTRAINT FK_C_Order_ID
FOREIGN KEY (c_order_id) REFERENCES c_order(c_order_id) on delete cascade;

ALTER TABLE c_order_line_item
ADD CONSTRAINT FK_ProductOrderID
FOREIGN KEY (product_id) REFERENCES product(product_id) on delete cascade;

-- Alter Statements for Product Specification

ALTER TABLE product_specification
ADD CONSTRAINT FK_Product_Spec
FOREIGN KEY (product_id) REFERENCES product(product_id) on delete cascade;

ALTER TABLE product_specification
ADD CONSTRAINT FK_Product_Category
FOREIGN KEY (prod_cat_id) REFERENCES product_category(prod_cat_id) on delete cascade;


-- Alter Statements For Supply_Order

ALTER TABLE supply_order
ADD CONSTRAINT FK_Supplier_Order_ID
FOREIGN KEY (supplier_id) REFERENCES supplier(supplier_id) on delete cascade;

-- Alter Statements For Supply_Order_Line_Item

ALTER TABLE supply_order_line_item
ADD CONSTRAINT FK_SupplyOrder_ID
FOREIGN KEY (so_id) REFERENCES supply_order(so_id) on delete cascade;

ALTER TABLE supply_order_line_item
ADD CONSTRAINT FK_SupplyMaterial_ID
FOREIGN KEY (material_id) REFERENCES material(material_id) on delete cascade;

-- Alter Statements For Supplier_Item

ALTER TABLE supplier_item
ADD CONSTRAINT FK_SupplierItem_ID
FOREIGN KEY (supplier_id) REFERENCES supplier(supplier_id) on delete cascade;

ALTER TABLE supplier_item
ADD CONSTRAINT FK_SupplierMaterial_ID
FOREIGN KEY (material_id) REFERENCES material(material_id) on delete cascade;

-- Alter Statements for Supplier

ALTER TABLE supplier
ADD CONSTRAINT FK_SupplierState
FOREIGN KEY(supplier_state) REFERENCES state_tax(state_abbr);


-- Alter Statements for Customer

ALTER TABLE customer
ADD CONSTRAINT FK_CustomerShip_ID
FOREIGN KEY (customer_ship_state) REFERENCES state_tax(state_abbr);
ALTER TABLE customer
ADD CONSTRAINT FK_CustomerBill_ID
FOREIGN KEY(customer_bill_state) REFERENCES state_tax(state_abbr);


-- Alter Statements for Location

ALTER TABLE location
ADD CONSTRAINT FK_LocationState_ID
FOREIGN KEY(location_state) REFERENCES state_tax(state_abbr);

-- Alter Statements For Visit_History

ALTER TABLE visit_history
ADD CONSTRAINT FK_CustomerVisit_ID
FOREIGN KEY (customer_id) REFERENCES customer(customer_id) on delete cascade;

ALTER TABLE visit_history
ADD CONSTRAINT FK_LocationVisit_ID
FOREIGN KEY (location_id) REFERENCES location(location_id) on delete cascade;

-- Alter Statements For Event

ALTER TABLE event
ADD CONSTRAINT FK_EventLocation_ID
FOREIGN KEY (location_id) REFERENCES location(location_id) on delete cascade;

-- Alter Statements For Review

ALTER TABLE review
ADD CONSTRAINT FK_C_Order_Review_ID
FOREIGN KEY (c_order_id) REFERENCES c_order(c_order_id) on delete cascade;

ALTER TABLE review
ADD CONSTRAINT FK_Product_Review_ID
FOREIGN KEY(product_id) REFERENCES product(product_id) on delete cascade;


