using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace Nojdrepo.Controllers
{
    [Route("kategorier")]
    public class CategoriesController : Controller
    {
        // visar underkategorier
        [HttpGet("")]
        public IActionResult Index()
        {
            var subCategories = new List<string>
            {
                "wellådor", "tejplådor", "varubrev", "dubbelwellådor", "kuvertbottenlådor",
                "snabbottenlådor", "stansade lådor", "modullådor", "affischlådor",
                "Containers, lock", "Omslag", "Wellskiva, svep", "Flyttlådor", "Chanér",
                "Farligt gods", "Wellkuvert", "Kartongkuvert"
            };
            return View(subCategories); // Views/Categories/Index.cshtml
        }

        // /categories/{subcategory}
        [HttpGet("{subcategory}")]
        public IActionResult Products(string subcategory)
        {
            ViewBag.SubCategoryName = subcategory;
            return View(); // Views/Categories/Products.cshtml
        }

        // /categories/{subcategory}/{productSlug} eller /categories/product/{productSlug}
        [HttpGet("{subcategory}/{productSlug}")]
        [HttpGet("product/{productSlug}", Name = "CategoriesProductBySlug")]
        public IActionResult SingleProduct(string? productSlug, string? subcategory = null)
        {
            ViewBag.SubCategory = subcategory;
            ViewBag.ProductSlug = productSlug;

            return View("SingleProduct"); // Views/Categories/SingleProduct.cshtml
        }
    }
}