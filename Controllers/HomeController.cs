using Microsoft.AspNetCore.Mvc;

namespace Nojdrepo.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}