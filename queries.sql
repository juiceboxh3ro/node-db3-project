-- Multi-Table Query Practice

-- Display the ProductName and CategoryName for all products in the database. Shows 77 records.
SELECT Product.ProductName, Category.CategoryName
FROM Product
JOIN Category ON Category.Id = Product.CategoryId;

-- Display the order Id and shipper CompanyName for all orders placed before August 9 2012. Shows 429 records.
SELECT o.id, o.orderdate, o.shipvia
FROM [Order] as o
JOIN [Shipper] AS s
ON o.shipvia = s.id
WHERE o.orderdate < '2012-08-09';

-- Display the name and quantity of the products ordered in order with Id 10251. Sort by ProductName. Shows 3 records.
SELECT o.OrderId, p.ProductName, o.Quantity
FROM OrderDetail as o
JOIN Product AS p ON o.OrderId = 10251
WHERE o.ProductId = p.id
ORDER BY p.ProductName

-- Display the OrderID, Customer's Company Name and the employee's LastName for every order. All columns should be labeled clearly. Displays 16,789 records.

SELECT o.id AS 'OrderId', c.CompanyName, e.LastName AS 'EmployeeLastName'
FROM [Order] AS o
JOIN Customer AS c ON o.CustomerId = c.id
JOIN Employee AS e ON o.EmployeeId = e.id