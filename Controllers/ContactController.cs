using Microsoft.AspNetCore.Mvc;

namespace Nojdrepo.Controllers
{
    [Route("kontakta-oss")]
    public class ContactController : Controller
    {
        [HttpGet("")]
        public IActionResult Index()
        {
            return View();
        }
    }
}