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
```
## Query Result

| ShipperName       | NumberOfOrders |
|-------------------|----------------|
| Federal Shipping  | 68             |
| Speedy Express    | 54             |
| United Package    | 74             |

## Write a MySQL query to find the department with the highest number of employees.

To find the department with the highest number of employees, you would typically have a table for employees and a table for departments. Here is an example of how you could write such a query assuming the following table structures:

- `employees` table: `id`, `name`, `department_id`
- `departments` table: `id`, `department_name`

Here's the MySQL query to find the department with the highest number of employees:

```sql
SELECT d.department_name, COUNT(e.id) AS employee_count
FROM departments d
JOIN employees e
ON d.id = e.department_id
GROUP BY d.id, d.department_name
ORDER BY employee_count DESC
LIMIT 1;
```

### Explanation:

1. **Join tables**: The `JOIN` clause combines the `departments` and `employees` tables based on the matching `department_id`.
2. **Count employees**: The `COUNT(e.id)` function counts the number of employees in each department.
3. **Group by department**: The `GROUP BY d.id, d.department_name` clause groups the results by each department to aggregate the employee counts.
4. **Order results**: The `ORDER BY employee_count DESC` clause sorts the results in descending order by the employee count.
5. **Limit to top result**: The `LIMIT 1` clause returns only the top result, which is the department with the highest number of employees.

This query will return the name of the department and the count of employees in that department which has the highest number of employees.

# Problem Based on Date.
## Write a MySQL query to find all employees who were hired in the last 30 days.
```sql
SELECT id, name, hire_date
FROM employees
WHERE hire_date >= CURDATE() - INTERVAL 30 DAY;
```

## Write a MySQL query to update the salary of employees by 10% whose experience is more than 5 years.

```sql
UPDATE employees
SET salary = salary * 1.10
WHERE DATEDIFF(CURDATE(), hire_date) / 365 > 5;
```
***Explanation***
```sql
10 % increment = 100 + 10 / 100 = 1.10
```
The DATEDIFF() function returns the number of days between two date values.

# Explain JOINS in MySQL.
In SQL, there are several types of `JOIN` operations, each with its specific use case. Here are the primary types of joins:

1. **INNER JOIN**:
   - Returns only the rows where there is a match in both tables.
   
2. **LEFT JOIN (LEFT OUTER JOIN)**:
   - Returns all rows from the left table and the matched rows from the right table. Rows in the left table without a match in the right table will contain `NULL` for columns from the right table.

3. **RIGHT JOIN (RIGHT OUTER JOIN)**:
   - Returns all rows from the right table and the matched rows from the left table. Rows in the right table without a match in the left table will contain `NULL` for columns from the left table.

4. **FULL JOIN (FULL OUTER JOIN)**:
   - Returns all rows when there is a match in either table. Rows that do not have matches in one of the tables will have `NULL` values for the missing side.

5. **CROSS JOIN**:
   - Returns the Cartesian product of the two tables, meaning each row from the first table is combined with every row from the second table.

6. **SELF JOIN**:
   - Joins a table with itself to compare rows within the same table. This type of join requires aliasing the table to differentiate between the two instances.

To better illustrate the SQL joins with examples, here are mock tables and the corresponding join queries:

### 1. **INNER JOIN**
**Tables**:
- **`customers`**:

| id | name     |
|----|----------|
| 1  | Alice    |
| 2  | Bob      |
| 3  | Charlie  |

- **`orders`**:

| order_id | customer_id |
|----------|-------------|
| 101      | 1           |
| 102      | 2           |
| 103      | 4           |

**Query**:
```sql
SELECT orders.order_id, customers.name
FROM orders
INNER JOIN customers ON orders.customer_id = customers.id;
```
**Result**:
| order_id | name   |
|----------|--------|
| 101      | Alice  |
| 102      | Bob    |

### 2. **LEFT JOIN (LEFT OUTER JOIN)**
**Tables**:
- **`products`**:

| product_id | product_name  |
|------------|---------------|
| 1          | Laptop        |
| 2          | Smartphone    |
| 3          | Tablet        |

- **`order_details`**:

| order_id | product_id |
|----------|------------|
| 201      | 1          |
| 202      | 3          |

**Query**:
```sql
SELECT products.product_name, order_details.order_id
FROM products
LEFT JOIN order_details ON products.product_id = order_details.product_id;
```
**Result**:

| product_name | order_id |
|--------------|----------|
| Laptop       | 201      |
| Smartphone   | NULL     |
| Tablet       | 202      |

### 3. **RIGHT JOIN (RIGHT OUTER JOIN)**
**Tables**:
- **`employees`**:

| employee_id | employee_name |
|-------------|---------------|
| 1           | John          |
| 2           | Sarah         |

- **`departments`**:

| department_id | department_name |
|---------------|-----------------|
| 101           | HR              |
| 102           | IT              |
| 103           | Marketing       |

**Query**:
```sql
SELECT employees.employee_name, departments.department_name
FROM employees
RIGHT JOIN departments ON employees.employee_id = departments.department_id;
```
**Result**:

| employee_name | department_name |
|---------------|-----------------|
| NULL          | HR              |
| NULL          | IT              |
| NULL          | Marketing       |

### 4. **FULL JOIN (FULL OUTER JOIN)**
**Tables**:
- **`customers`**:

| id | name     |
|----|----------|
| 1  | Alice    |
| 2  | Bob      |

- **`orders`**:

| order_id | customer_id |
|----------|-------------|
| 101      | 1           |
| 102      | 3           |

**Query**:
```sql
SELECT customers.name, orders.order_id
FROM customers
FULL JOIN orders ON customers.id = orders.customer_id;
```
**Result**:

| name   | order_id |
|--------|----------|
| Alice  | 101      |
| Bob    | NULL     |
| NULL   | 102      |

### 5. **CROSS JOIN**
**Tables**:
- **`employees`**:

| employee_id | employee_name |
|-------------|---------------|
| 1           | John          |
| 2           | Sarah         |

- **`projects`**:

| project_id | project_name |
|------------|--------------|
| 1          | Alpha        |
| 2          | Beta         |

**Query**:
```sql
SELECT employees.employee_name, projects.project_name
FROM employees
CROSS JOIN projects;
```
**Result**:

| employee_name | project_name |
|---------------|--------------|
| John          | Alpha        |
| John          | Beta         |
| Sarah         | Alpha        |
| Sarah         | Beta         |

### 6. **SELF JOIN**
**Table**:
- **`employees`**:

| employee_id | employee_name | manager_id |
|-------------|---------------|------------|
| 1           | John          | 3          |
| 2           | Sarah         | 1          |
| 3           | Michael       | NULL       |

**Query**:
```sql
SELECT e1.employee_name AS Employee, e2.employee_name AS Manager
FROM employees e1
JOIN employees e2 ON e1.manager_id = e2.employee_id;
```
**Result**:

| Employee | Manager   |
|----------|-----------|
| John     | Michael   |
| Sarah    | John      |

These examples show how each type of `JOIN` works with actual data tables and their relationships.

# Query Based JOIN on three Tables
Here are some SQL query questions based on joins involving three tables:

1. **Three-Table INNER JOIN**:
   - Write a query to list all orders with the customer name and the product name. Use the `orders`, `customers`, and `products` tables. The `orders` table has `customer_id` that references `customers.id`, and `product_id` that references `products.id`.

2. **Three-Table LEFT JOIN**:
   - Write a query to display all customers and the products they ordered, including customers who have not placed any orders. Use the `customers`, `orders`, and `products` tables.

3. **Three-Table RIGHT JOIN**:
   - Write a query to show all products, their associated orders, and the customers who ordered them, including products that have not been ordered. Use the `products`, `orders`, and `customers` tables.

4. **Three-Table JOIN with WHERE Clause**:
   - Write a query to list all employees, their departments, and the projects they are working on. Use the `employees`, `departments`, and `projects` tables where `employees.department_id` references `departments.id`, and `projects.employee_id` references `employees.id`. Only include employees who joined after a specific date.

5. **Three-Table JOIN with Aggregate Function**:
   - Write a query to find the total revenue generated by each customer. Use the `orders`, `customers`, and `order_details` tables where `orders.customer_id` references `customers.id`, and `order_details.order_id` references `orders.id`. Sum the `order_details.amount` for each customer.

6. **Three-Table JOIN with Aliases**:
   - Write a query to display the names of employees, their managers, and the projects they are managing. Use the `employees`, `projects`, and `managers` tables where `projects.manager_id` references `managers.id`, and `managers.id` references `employees.id`.

7. **Three-Table SELF JOIN**:
   - Write a query to find pairs of employees who work in the same department and are working on the same project. Use the `employees`, `departments`, and `projects` tables, joining `employees` to itself to identify pairs.

8. **Three-Table FULL JOIN**:
   - Write a query to list all products, their related suppliers, and the orders they are involved in. Use the `products`, `suppliers`, and `orders` tables, where `products.supplier_id` references `suppliers.id` and `orders.product_id` references `products.id`. Include products or suppliers even if there are no related orders.

Here are answers to the provided SQL query questions involving three tables:

### 1. **Three-Table INNER JOIN**
**Question**: List all orders with the customer name and the product name.
**Tables**: `orders`, `customers`, `products`

**Query**:
```sql
SELECT orders.order_id, customers.name AS customer_name, products.product_name
FROM orders
INNER JOIN customers ON orders.customer_id = customers.id
INNER JOIN products ON orders.product_id = products.id;
```

### 2. **Three-Table LEFT JOIN**
**Question**: Display all customers and the products they ordered, including customers who have not placed any orders.
**Tables**: `customers`, `orders`, `products`

**Query**:
```sql
SELECT customers.name AS customer_name, products.product_name, orders.order_id
FROM customers
LEFT JOIN orders ON customers.id = orders.customer_id
LEFT JOIN products ON orders.product_id = products.id;
```

### 3. **Three-Table RIGHT JOIN**
**Question**: Show all products, their associated orders, and the customers who ordered them, including products that have not been ordered.
**Tables**: `products`, `orders`, `customers`

**Query**:
```sql
SELECT products.product_name, orders.order_id, customers.name AS customer_name
FROM products
RIGHT JOIN orders ON products.product_id = orders.product_id
RIGHT JOIN customers ON orders.customer_id = customers.id;
```

### 4. **Three-Table JOIN with WHERE Clause**
**Question**: List all employees, their departments, and the projects they are working on. Only include employees who joined after a specific date.
**Tables**: `employees`, `departments`, `projects`

**Query**:
```sql
SELECT employees.employee_name, departments.department_name, projects.project_name
FROM employees
JOIN departments ON employees.department_id = departments.id
JOIN projects ON projects.employee_id = employees.employee_id
WHERE employees.hire_date > '2022-01-01';
```

### 5. **Three-Table JOIN with Aggregate Function**
**Question**: Find the total revenue generated by each customer.
**Tables**: `orders`, `customers`, `order_details`

**Query**:
```sql
SELECT customers.name AS customer_name, SUM(order_details.amount) AS total_revenue
FROM customers
JOIN orders ON customers.id = orders.customer_id
JOIN order_details ON order_details.order_id = orders.order_id
GROUP BY customers.name;
```

### 6. **Three-Table JOIN with Aliases**
**Question**: Display the names of employees, their managers, and the projects they are managing.
**Tables**: `employees`, `projects`, `managers`

**Query**:
```sql
SELECT e.employee_name AS employee_name, m.manager_name AS manager_name, p.project_name
FROM employees e
JOIN projects p ON p.manager_id = e.employee_id
JOIN managers m ON m.id = e.employee_id;
```

### 7. **Three-Table SELF JOIN**
**Question**: Find pairs of employees who work in the same department and are working on the same project.
**Tables**: `employees`, `departments`, `projects`

**Query**:
```sql
SELECT e1.employee_name AS employee1, e2.employee_name AS employee2, d.department_name, p.project_name
FROM employees e1
JOIN employees e2 ON e1.department_id = e2.department_id AND e1.employee_id < e2.employee_id
JOIN departments d ON e1.department_id = d.id
JOIN projects p ON e1.project_id = p.project_id AND e2.project_id = p.project_id;
```

### 8. **Three-Table FULL JOIN**
**Question**: List all products, their related suppliers, and the orders they are involved in. Include products or suppliers even if there are no related orders.
**Tables**: `products`, `suppliers`, `orders`

**Query**:
```sql
SELECT products.product_name, suppliers.supplier_name, orders.order_id
FROM products
FULL JOIN suppliers ON products.supplier_id = suppliers.id
FULL JOIN orders ON products.product_id = orders.product_id;
```
*Note*: Some databases like MySQL don’t directly support `FULL JOIN`, so you may need to use `UNION`:
```sql
SELECT products.product_name, suppliers.supplier_name, orders.order_id
FROM products
LEFT JOIN suppliers ON products.supplier_id = suppliers.id
LEFT JOIN orders ON products.product_id = orders.product_id
UNION
SELECT products.product_name, suppliers.supplier_name, orders.order_id
FROM products
RIGHT JOIN suppliers ON products.supplier_id = suppliers.id
RIGHT JOIN orders ON products.product_id = orders.product_id;
```

These queries demonstrate how to perform various types of three-table joins to solve real-world data retrieval problems.

# Find and Delete Duplicate

Here are SQL queries focused on removing duplicates from a table:

### 1. **Find Duplicate Records Based on One Column**
**Question**: Write a query to find duplicate `email` addresses in a `users` table.
```sql
SELECT email, COUNT(*)
FROM users
GROUP BY email
HAVING COUNT(*) > 1;
```

### 2. **Remove Duplicate Rows While Keeping One Copy**
**Question**: Write a query to remove duplicate rows from a `users` table, keeping only the row with the lowest `id`.
```sql
DELETE u1
FROM users u1
JOIN users u2 ON u1.email = u2.email AND u1.id > u2.id;
```
- **Explanation**: This deletes duplicate rows where `email` matches but retains the row with the lowest `id`.

### 3. **Delete Duplicates Based on Multiple Columns**
**Question**: Remove duplicate rows based on the `email` and `phone_number` columns.
```sql
DELETE u1
FROM users u1
JOIN users u2 ON u1.email = u2.email AND u1.phone_number = u2.phone_number AND u1.id > u2.id;
```
- **Explanation**: This removes duplicates while retaining the row with the lowest `id`.

### 4. **Delete Duplicates Using a Subquery**
**Question**: Remove duplicates based on the `name` column.
```sql
DELETE FROM users
WHERE id NOT IN (
  SELECT MIN(id)
  FROM users
  GROUP BY name
);
```
- **Explanation**: This retains the row with the minimum `id` for each `name` and deletes the rest.

### 5. **Remove Duplicates and Keep the Latest Entry**
**Question**: Remove duplicate rows based on `email`, keeping only the most recent entry based on `created_at`.
```sql
DELETE u1
FROM users u1
JOIN users u2 ON u1.email = u2.email AND u1.created_at < u2.created_at;
```
- **Explanation**: This deletes older duplicate rows and keeps the one with the most recent `created_at` value.

These queries demonstrate various ways to identify and remove duplicate records from a database, ensuring data integrity and uniqueness.

# FAQ in MySQL

Here are some of the most commonly asked MySQL interview queries:

### 1. **Find Duplicate Records**
**Question**: Write a query to find duplicate records in a table based on a column (e.g., `email`).

```sql
SELECT email, COUNT(*)
FROM users
GROUP BY email
HAVING COUNT(*) > 1;
```

### 2. **Find the Second Highest Salary**
**Question**: Write a query to find the second-highest salary in an employee table.

```sql
SELECT MAX(salary) AS second_highest_salary
FROM employees
WHERE salary < (SELECT MAX(salary) FROM employees);
```

### 3. **Find the Maximum and Minimum Salary**
**Question**: Write a query to find the maximum and minimum salary in an employee table.

```sql
SELECT MAX(salary) AS max_salary, MIN(salary) AS min_salary
FROM employees;
```

### 4. **Join Multiple Tables**
**Question**: Write a query to find all orders along with customer names and product names.

```sql
SELECT orders.order_id, customers.name AS customer_name, products.product_name
FROM orders
JOIN customers ON orders.customer_id = customers.id
JOIN products ON orders.product_id = products.id;
```

### 5. **Count Rows in a Table**
**Question**: Write a query to count the number of rows in a table.

```sql
SELECT COUNT(*) AS total_rows
FROM employees;
```

### 6. **Group By and Aggregate Functions**
**Question**: Write a query to find the total salary of employees grouped by department.

```sql
SELECT department_id, SUM(salary) AS total_salary
FROM employees
GROUP BY department_id;
```

### 7. **Find Employees Who Joined in the Last 30 Days**
**Question**: Write a query to find employees who joined in the last 30 days.

```sql
SELECT id, name, hire_date
FROM employees
WHERE hire_date >= CURDATE() - INTERVAL 30 DAY;
```

### 8. **Self Join**
**Question**: Write a query to find employees who have the same manager.

```sql
SELECT e1.name AS employee, e2.name AS manager
FROM employees e1
JOIN employees e2 ON e1.manager_id = e2.id;
```

### 9. **Subqueries**
**Question**: Write a query to find employees who earn more than the average salary.

```sql
SELECT name, salary
FROM employees
WHERE salary > (SELECT AVG(salary) FROM employees);
```

### 10. **Find the Total Number of Products Sold**
**Question**: Write a query to find the total number of products sold in each order.

```sql
SELECT order_id, SUM(quantity) AS total_products
FROM order_details
GROUP BY order_id;
```

### 11. **Using `DISTINCT` to Eliminate Duplicates**
**Question**: Write a query to find distinct `email` addresses in the `users` table.

```sql
SELECT DISTINCT email
FROM users;
```

### 12. **Find Employees With No Department**
**Question**: Write a query to find employees who are not assigned to any department.

```sql
SELECT name
FROM employees
WHERE department_id IS NULL;
```

### 13. **Sorting Results**
**Question**: Write a query to display all employees ordered by salary in descending order.

```sql
SELECT name, salary
FROM employees
ORDER BY salary DESC;
```

### 14. **Using `LIMIT`**
**Question**: Write a query to fetch the top 5 highest-paid employees.

```sql
SELECT name, salary
FROM employees
ORDER BY salary DESC
LIMIT 5;
```

### 15. **Create Table and Insert Data**
**Question**: Write a query to create a table and insert data into it.

```sql
CREATE TABLE employees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    salary DECIMAL(10, 2),
    department_id INT
);

INSERT INTO employees (name, salary, department_id)
VALUES ('John Doe', 50000, 1);
```

### 16. **Delete Duplicate Rows (Retain One)**
**Question**: Write a query to delete duplicate rows based on a column but keep one.

```sql
DELETE e1
FROM employees e1
JOIN employees e2 ON e1.email = e2.email AND e1.id > e2.id;
```

### 17. **Find Employees in Multiple Departments**
**Question**: Write a query to find employees who are in more than one department.

```sql
SELECT employee_id, COUNT(DISTINCT department_id)
FROM employee_departments
GROUP BY employee_id
HAVING COUNT(DISTINCT department_id) > 1;
```

### 18. **Using `IN` and `NOT IN`**
**Question**: Write a query to find employees who are not in a specific department.

```sql
SELECT name
FROM employees
WHERE department_id NOT IN (1, 2, 3);
```

### 19. **Update Records**
**Question**: Write a query to update an employee's salary.

```sql
UPDATE employees
SET salary = salary * 1.1
WHERE id = 5;
```

### 20. **Using `CASE` in SQL**
**Question**: Write a query to categorize employees based on salary.

```sql
SELECT name,
       CASE
           WHEN salary > 50000 THEN 'High Salary'
           WHEN salary BETWEEN 30000 AND 50000 THEN 'Medium Salary'
           ELSE 'Low Salary'
       END AS salary_category
FROM employees;
```

These are some of the most frequently asked SQL questions in interviews, covering a range of topics from basic operations to complex joins, subqueries, and data manipulation techniques.