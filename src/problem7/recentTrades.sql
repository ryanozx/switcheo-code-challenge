WITH 
	usdc AS (VALUES(0.000001)),
    swth AS (VALUES(0.00000005)),
    tmz AS (VALUES(0.003))
SELECT address FROM
      (SELECT
           balances.address,
           SUM(CASE 
           WHEN balances.denom = 'usdc' THEN (select * from usdc) * balances.amount 
           WHEN balances.denom = 'swth' THEN (select * from swth) * balances.amount 
           WHEN balances.denom = 'tmz' THEN (select * from tmz) * balances.amount 
           ELSE 0 END) AS bal,
           MAX(trades.block_height) AS mostRecentBH 
      FROM balances 
      INNER JOIN trades ON balances.address = trades.address 
      GROUP BY
      balances.address) AS validAcct
WHERE bal >= 500 AND mostRecentBH > 730000;