USE [CRUD_Sample]
GO
/****** Object:  StoredProcedure [dbo].[getAvgScoreofEachQuestion]    Script Date: 04/04/2018 10:56:36 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		betty
-- Create date: 2018/Apr/2
-- Description:	calculate the ranking point by different department
-- =============================================
--exec [getAvgScoreofEachQuestion]
CREATE PROCEDURE [dbo].[getAvgScoreofEachQuestion]
AS
BEGIN 
  DECLARE @QuesScore TABLE(
      Basic_Oper DECIMAL(18,2),
      Priority_Daily DECIMAL(18,2),
      Document DECIMAL(18,2),
      SAP_Environment DECIMAL(18,2),
      Dept_Colleagues DECIMAL(18,2),
      Line_Manager DECIMAL(18,2)
  );
  
    DECLARE @AvgScore TABLE(
      Basic_Operation DECIMAL(18,2),
      Priority_Daily_Work DECIMAL(18,2),
      Document_Resource DECIMAL(18,2),
      SAP_Environment DECIMAL(18,2),
      Dept_Colleagues_SAP_ERP DECIMAL(18,2),
      Line_Manager_SAP_ERP DECIMAL(18,2)
  );

   INSERT INTO @QuesScore(
      Basic_Oper ,
      Priority_Daily ,
      Document ,
      SAP_Environment ,
      Dept_Colleagues ,
      Line_Manager )
    SELECT [Basic_Operation]
      ,[Priority_Daily_Work]
      ,[Document_Resource]
      ,[SAP_Environment]
      ,[Dept_Colleagues_SAP_ERP]
      ,[Line_Manager_SAP_ERP]
     From dbo.EMPLOYEE_RATING
     

      INSERT INTO @AvgScore(
		  Basic_Operation ,
		  Priority_Daily_Work ,
		  Document_Resource ,
		  SAP_Environment ,
		  Dept_Colleagues_SAP_ERP ,
		  Line_Manager_SAP_ERP 
      )
      SELECT CAST( AVG(Basic_Oper) AS Decimal(18,2)) ,CAST(AVG(Priority_Daily) AS Decimal(18,2)),
             CAST(AVG(Document) AS Decimal(18,2)) AS Document_Resource,  CAST(AVG(SAP_Environment) AS Decimal(18,2)),
             CAST(AVG(Dept_Colleagues) AS Decimal(18,2)),CAST(AVG(Line_Manager) AS Decimal(18,2))
      FROM @QuesScore
 
      SELECT * FROM  @AvgScore
END
GO
