using Microsoft.AspNetCore.Mvc;

namespace Nojdrepo.Controllers
{
    [Route("mina-sidor")]
    public class LoginController : Controller
    {
        [HttpGet("")]
        public IActionResult Index()
        {
            return View();
        }

        [HttpGet("orderhistorik")]
        public IActionResult OrderHistory()
        {
            return View();
        }
    }
}