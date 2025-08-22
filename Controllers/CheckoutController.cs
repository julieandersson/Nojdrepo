using Microsoft.AspNetCore.Mvc;

namespace Nojdrepo.Controllers
{
    [Route("")]
    public class CheckoutController : Controller
    {
        // /varukorg  -> cart
        [HttpGet("varukorg")]
        public IActionResult Index()
        {
            return View(); // Views/Checkout/Index.cshtml
        }
    }
}