https://www.mysqltutorial.org/getting-started-with-mysql/mysql-sample-database/

# Problem based on Group By Clause

Here are some SQL questions focusing on the `GROUP BY` clause:

1. **Basic Aggregation**:
   - **Question**: Write an SQL query to find the total sales for each product from a `sales` table containing columns `product_id`, `sale_amount`, and `sale_date`.
   - **Expected Output**: A list showing `product_id` and `total_sales`.

   ```sql
   SELECT product_id, SUM(sale_amount) AS total_sales
   FROM sales
   GROUP BY product_id;
   ```

2. **Counting Occurrences**:
   - **Question**: Write an SQL query to count the number of orders placed by each customer from an `orders` table with columns `order_id`, `customer_id`, and `order_date`.
   - **Expected Output**: A list showing `customer_id` and `order_count`.

   ```sql
   SELECT customer_id, COUNT(order_id) AS order_count
   FROM orders
   GROUP BY customer_id;
   ```

3. **Filtering Grouped Results with `HAVING`**:
   - **Question**: Write an SQL query to find all employees who have made sales totaling more than 10,000 from an `employee_sales` table with columns `employee_id`, `sale_amount`, and `sale_date`.
   - **Expected Output**: `employee_id` and `total_sales` of employees exceeding 10,000 in sales.

   ```sql
   SELECT employee_id, SUM(sale_amount) AS total_sales
   FROM employee_sales
   GROUP BY employee_id
   HAVING SUM(sale_amount) > 10000;
   ```

4. **Grouping by Multiple Columns**:
   - **Question**: Write an SQL query to find the average order value per customer per year from an `orders` table with columns `order_id`, `customer_id`, `order_value`, and `order_date`.
   - **Expected Output**: A list showing `customer_id`, `year`, and `average_order_value`.

   ```sql
   SELECT customer_id, YEAR(order_date) AS order_year, AVG(order_value) AS average_order_value
   FROM orders
   GROUP BY customer_id, YEAR(order_date);
   ```

5. **Combining `GROUP BY` with Conditional Aggregation**:
   - **Question**: Write an SQL query to count the number of products sold for each category where the total number of products sold is above 50. The `sales` table contains columns `category`, `product_id`, and `quantity_sold`.
   - **Expected Output**: `category` and `total_quantity` for categories with more than 50 products sold.

   ```sql
   SELECT category, SUM(quantity_sold) AS total_quantity
   FROM sales
   GROUP BY category
   HAVING SUM(quantity_sold) > 50;
   ```

6. **Using `GROUP BY` with Date Functions**:
   - **Question**: Write an SQL query to find the total number of sales made each month from a `sales` table with columns `sale_id`, `sale_date`, and `sale_amount`.
   - **Expected Output**: `month` and `total_sales`.

   ```sql
   SELECT MONTH(sale_date) AS sale_month, SUM(sale_amount) AS total_sales
   FROM sales
   GROUP BY MONTH(sale_date);
   ```

These questions cover different aspects and use cases of the `GROUP BY` clause, including aggregation, `HAVING` filters, and multi-column grouping.


Lists the number of customers in each country, sorted high to low.

```sql
SELECT country, count(*) as Total_customers_by_country 
FROM `customers` 
GROUP BY country
ORDER BY Total_customers_by_country DESC;
```

# Demo Database

Below is a selection from the **"Orders"** table in the Northwind sample database:

| OrderID | CustomerID | EmployeeID | OrderDate   | ShipperID |
|---------|------------|------------|-------------|-----------|
| 10248   | 90         | 5          | 1996-07-04  | 3         |
| 10249   | 81         | 6          | 1996-07-05  | 1         |
| 10250   | 34         | 4          | 1996-07-08  | 2         |

And a selection from the **"Shippers"** table:

| ShipperID | ShipperName       |
|-----------|-------------------|
| 1         | Speedy Express    |
| 2         | United Package    |
| 3         | Federal Shipping  |

## GROUP BY With JOIN Example

The following SQL statement lists the number of orders sent by each shipper:

### Example
```sql
SELECT Shippers.ShipperName, COUNT(Orders.OrderID) AS NumberOfOrders
FROM Orders
LEFT JOIN Shippers ON Orders.ShipperID = Shippers.ShipperID
GROUP BY ShipperName;
