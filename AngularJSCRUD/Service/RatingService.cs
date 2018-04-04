using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using AngularJSCRUD.Data.Repository.BaseRepository;
using AngularJSCRUD.Models;
using System.Data.SqlClient;

namespace AngularJSCRUD.Service
{
    public partial class RatingService
    {
        private GenericRepository<EMPLOYEE_RATING> RatingRepository;
        private GenericRepository<AvgScore> avgRepository;
        private GenericRepository<RankingDept> rankingdeptRepository;
        public RatingService()
        {
            this.RatingRepository = new GenericRepository<EMPLOYEE_RATING>(new CRUD_SampleEntities());
            this.avgRepository = new GenericRepository<AvgScore>(new CRUD_SampleEntities());
            this.rankingdeptRepository = new GenericRepository<RankingDept>(new CRUD_SampleEntities());
        }
        public int Insert(object[] parameters)
        {
            string spQuery = "Insert_Rating  @EmployeeName, @SAP_Module, @Basic_Operation, @Priority_Daily_Work, @Document_Resource, @SAP_Environment, @Dept_Colleagues_SAP_ERP, @Line_Manager_SAP_ERP, @Overall_Rating, @SAP_Question1, @SAP_Question2, @SAP_Question3, @SAP_Question4, @SAP_Question5, @SAP_Idea1, @SAP_Idea2, @SAP_Idea3, @SAP_Idea4, @SAP_Idea5";
            object[] newparas = {new SqlParameter("@EmployeeName", parameters[0]),
                                   new SqlParameter("@SAP_Module", parameters[1]),
                                   new SqlParameter("@Basic_Operation", parameters[2]),
                                   new SqlParameter("@Priority_Daily_Work", parameters[3]),
                                   new SqlParameter("@Document_Resource", parameters[4]),
                                   new SqlParameter("@SAP_Environment", parameters[5]),
                                   new SqlParameter("@Dept_Colleagues_SAP_ERP", parameters[6]),
                                   new SqlParameter("@Line_Manager_SAP_ERP", parameters[7]),
                                   new SqlParameter("@Overall_Rating", parameters[8]),
                                   new SqlParameter("@SAP_Question1", parameters[9]),
                                   new SqlParameter("@SAP_Question2", parameters[10]),
                                   new SqlParameter("@SAP_Question3", parameters[11]),
                                   new SqlParameter("@SAP_Question4", parameters[12]),
                                   new SqlParameter("@SAP_Question5", parameters[13]),
                                   new SqlParameter("@SAP_Idea1", parameters[14]),
                                   new SqlParameter("@SAP_Idea2", parameters[15]),
                                   new SqlParameter("@SAP_Idea3", parameters[16]),
                                   new SqlParameter("@SAP_Idea4", parameters[17]),
                                   new SqlParameter("@SAP_Idea5", parameters[18])};
            return RatingRepository.ExecuteCommand(spQuery, newparas);
        }
        public IEnumerable<AvgScore> getAvgScore() {

            string spQuery = "[getAvgScoreofEachQuestion]";
            return avgRepository.ExecuteQuery(spQuery);

        }
        public RankingDept getRankingbyDept(object[] dept) {
            string spquery = "[Calaultetherankingbydept] {0}";
            return rankingdeptRepository.ExecuteQuerySingle (spquery, dept);
        }
        public IEnumerable<EMPLOYEE_RATING> getAllRankings()
        {
            string spquery = "[Get_AllEmployeeRankings]";
            return RatingRepository.ExecuteQuery(spquery);
        }
    }
} 