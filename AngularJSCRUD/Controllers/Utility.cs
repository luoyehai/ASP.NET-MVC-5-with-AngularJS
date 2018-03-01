using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AngularJSCRUD.Controllers
{
    public class Utility
    {
        public static string GetCurrentLoginName()
        {
            string loginName = string.Empty;
            //if (SPContext.Current == null)
            //    return loginName;
            //SPUser currentSpUser = SPContext.Current.Web.CurrentUser;
            //if (currentSpUser == null)
            //    return loginName;
            //loginName = currentSpUser.LoginName;
            //if (loginName.ToLower() == "sharepoint\\system")
            //{
            //loginName = System.Security.Principal.WindowsIdentity.GetCurrent().Name.ToString();
            Boolean  isauth= HttpContext.Current.User.Identity.IsAuthenticated;
            loginName = HttpContext.Current.User.Identity.Name;
            //}
            if (loginName.Contains("|"))
            {
                loginName = loginName.Split('|')[1];
            }

            return loginName.ToLower();
        }

    }
}