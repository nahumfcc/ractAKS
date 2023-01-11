using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CatalogsAPI.Models;

namespace CatalogsAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly CatalogContext _context;

        public ProductController(CatalogContext context)
        {
            _context = context;
        }

        // GET: api/Product
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductItem>>> GetProductItems()
        {
          if (_context.ProductItems == null)
          {
              return NotFound();
          }
            return await _context.ProductItems.ToListAsync();
        }

        // GET: api/Product/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ProductItem>> GetProductItem(Guid id)
        {
          if (_context.ProductItems == null)
          {
              return NotFound();
          }
            var productItem = await _context.ProductItems.FindAsync(id);

            if (productItem == null)
            {
                return NotFound();
            }

            return productItem;
        }

        // PUT: api/Product/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProductItem(Guid id, ProductItem productItem)
        {
            if (id != productItem.Id)
            {
                return BadRequest();
            }

            _context.Entry(productItem).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductItemExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Product
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ProductItem>> PostProductItem(RequestProductItem productItem)
        {
          if (_context.ProductItems == null)
          {
              return Problem("Entity set 'CatalogContext.ProductItems'  is null.");
          }

            var newProduct = new ProductItem
            {
                Id = new Guid(),
                Description = productItem.Description,
                Name = productItem.Name,
                Price = productItem.Price
            };
            _context.ProductItems.Add(newProduct);
            await _context.SaveChangesAsync();

            //return CreatedAtAction("GetProductItem", new { id = productItem.Id }, productItem);
            return CreatedAtAction(nameof(GetProductItem), new { id = newProduct.Id }, productItem);

        }

        // DELETE: api/Product/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProductItem(Guid id)
        {
            if (_context.ProductItems == null)
            {
                return NotFound();
            }
            var productItem = await _context.ProductItems.FindAsync(id);
            if (productItem == null)
            {
                return NotFound();
            }

            _context.ProductItems.Remove(productItem);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ProductItemExists(Guid id)
        {
            return (_context.ProductItems?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
