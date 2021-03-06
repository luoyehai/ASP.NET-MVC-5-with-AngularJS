USE [CRUD_Sample]
GO
/****** Object:  StoredProcedure [dbo].[Calaultetherankingbydept]    Script Date: 04/04/2018 10:56:36 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		betty
-- Create date: 2018/Mar/30
-- Description:	calculate the ranking point by different department
-- =============================================
--EXEC Calaultetherankingbydept  'MM'
CREATE PROCEDURE [dbo].[Calaultetherankingbydept]
	 @module nvarchar(50)	 
AS
BEGIN 
  DECLARE @deptRanking  TABLE(
      module nvarchar(50) NOT NULL,
      Basic_Oper DECIMAL(18,2),
      Priority_Daily DECIMAL(18,2),
      Document DECIMAL(18,2),
      SAP_Environment DECIMAL(18,2),
      Dept_Colleagues DECIMAL(18,2),
      Line_Manager DECIMAL(18,2)
  );
	INSERT INTO @deptRanking(
	  module ,
      Basic_Oper ,
      Priority_Daily ,
      Document ,
      SAP_Environment ,
      Dept_Colleagues ,
      Line_Manager )
      SELECT @module AS Module,Basic_Operation ,Priority_Daily_Work,
             Document_Resource, SAP_Environment,
             Dept_Colleagues_SAP_ERP,Line_Manager_SAP_ERP
      FROM dbo.EMPLOYEE_RATING
      WHERE SAP_Module LIKE '%'+@module+'%'
      
	  SELECT Module,CAST( AVG(Basic_Oper) AS Decimal(18,2)) AS Basic_Operation,CAST(AVG(Priority_Daily) AS Decimal(18,2)) AS Priority_Daily_Work,
             CAST(AVG(Document) AS Decimal(18,2)) AS Document_Resource, CAST(AVG(SAP_Environment) AS Decimal(18,2)) AS SAP_Environment,
             CAST(AVG(Dept_Colleagues) AS Decimal(18,2)) AS Dept_Colleagues_SAP_ERP,CAST(AVG(Line_Manager) AS Decimal(18,2)) AS Line_Manager_SAP_ERP
     From @deptRanking
     GROUP BY Module 
	
  --DECLARE @Basic_Operation decimal(3,2);
  --DECLARE @Priority_Daily_Work decimal(3,2);
  --DECLARE @Document_Resource decimal(3,2);
  --DECLARE @SAP_Environment decimal(3,2);
  --DECLARE @Dept_Colleagues_SAP_ERP decimal(3,2);
  --DECLARE @Line_Manager_SAP_ERP decimal(3,2);
  --WITH deptRanking 
  --   (SELECT @module AS Module,Basic_Operation ,Priority_Daily_Work,
  --           Document_Resource, SAP_Environment,
  --           Dept_Colleagues_SAP_ERP,Line_Manager_SAP_ERP
  --   FROM dbo.EMPLOYEE_RATING
  --   WHERE SAP_Module LIKE '%'+@module+'%')
     
       

END
GO
