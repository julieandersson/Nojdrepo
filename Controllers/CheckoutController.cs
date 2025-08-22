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

        // /kassa
        [HttpGet("kassa")]
        public IActionResult Kassa()
        {
            ViewBag.BodyClass = "is-checkout"; // avskalad header på kassa-sidan
            return View("CheckoutPage"); // Views/Checkout/CheckoutPage.cshtml
        }

        // /kassa/bekraftelse
        [HttpGet("kassa/bekraftelse")]
        public IActionResult Confirmation()
        {
            ViewBag.BodyClass = "is-checkout"; // behåller avskalad header även på bek-sidan
            return View(); // Views/Checkout/Confirmation.cshtml
        }
    }
}