USE [CRUD_Sample]
GO
/****** Object:  StoredProcedure [dbo].[Get_AllEmployeeRankings]    Script Date: 04/04/2018 11:55:43 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
-- EXEC [Get_AllEmployeeRankings]
CREATE PROCEDURE [dbo].[Get_AllEmployeeRankings] 
AS
BEGIN
	SET NOCOUNT ON;
	SELECT [EmployeeName]
      ,[SAP_Module]
      ,[Basic_Operation]
      ,[Priority_Daily_Work]
      ,[Document_Resource]
      ,[SAP_Environment]
      ,[Dept_Colleagues_SAP_ERP]
      ,[Line_Manager_SAP_ERP]
      ,[Overall_Rating]
      ,[CreateOn]
      ,[SAP_Question1]
      ,[SAP_Question2]
      ,[SAP_Question3]
      ,[SAP_Question4]
      ,[SAP_Question5]
      ,[SAP_Idea1]
      ,[SAP_Idea2]
      ,[SAP_Idea3]
      ,[SAP_Idea4]
      ,[SAP_Idea5]
      ,[EmployeeID] 
      FROM EMPLOYEE_RATING
END
GO
