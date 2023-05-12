-- write your queries here
SELECT * FROM owners LEFT JOIN vehicles ON owners.id = vehicles.owner_id;

SELECT first_name, last_name, COUNT(vehicles.owner_id) AS car_count
FROM owners
LEFT JOIN vehicles ON owners.id = vehicles.owner_id
GROUP BY first_name, last_name
ORDER BY first_name ASC;

SELECT first_name, last_name, ROUND(AVG(vehicles.price)) AS avg_price, COUNT(vehicles.owner_id) AS count
FROM owners
LEFT JOIN vehicles ON owners.id = vehicles.owner_id
GROUP BY first_name, last_name
HAVING COUNT(vehicles.owner_id) > 1 AND ROUND(AVG(vehicles.price)) > 10000
ORDER BY first_name DESC;