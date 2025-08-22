using Microsoft.AspNetCore.Mvc;

namespace Nojdrepo.Controllers
{
    [Route("om-oss")]
    public class AboutController : Controller
    {
        [HttpGet("")]
        public IActionResult Index()
        {
            return View();
        }
    }
}