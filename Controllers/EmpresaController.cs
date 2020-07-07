using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TesteCSharp.Models;

namespace TesteCSharp.Controllers
{
    [ApiController]
    [Route("[Controller]")]
    public class EmpresaController : ControllerBase
    {
        private TCSContext _context { get; set; }

        public EmpresaController(TCSContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<ActionResult<Empresa>> Insert([FromBody]Empresa empresa)
        {
            EmpresaFacade.CadastroIsValid(empresa);
            await _context.AddAsync(empresa);
            await _context.SaveChangesAsync();

            return Ok(empresa);
        }

        [HttpGet]
        [Route("All")]
        public async Task<List<Empresa>> GetAll()
        {
            return await _context.Empresas.ToListAsync();
        }

        [HttpGet]
        [Route("{ID}")]
        public async Task<Empresa> GetById(int ID)
        {
            return await _context.FindAsync<Empresa>(ID);
        }

        [HttpPut]
        public async Task<ActionResult<Empresa>> Update([FromBody] Empresa empresa)
        {
            var empresaToUpdate = await GetById(empresa.ID);
            if (empresaToUpdate != null)
            {
                empresaToUpdate.NomeFantasia = empresa.NomeFantasia ?? empresaToUpdate.NomeFantasia;
                empresaToUpdate.CNPJ = empresa.CNPJ ?? empresaToUpdate.CNPJ;
                empresaToUpdate.UF = empresa.UF ?? empresaToUpdate.UF;
                EmpresaFacade.CadastroIsValid(empresaToUpdate);
                await _context.SaveChangesAsync();
                return Ok(empresaToUpdate);
            }
            return NotFound();
        }

        [HttpDelete]
        [Route("{ID}")]
        public async Task<ActionResult<Empresa>> Delete(int ID)
        {
            var empresaToDelete = await _context.FindAsync<Empresa>(ID);
            if (empresaToDelete != null)
            {
                _context.Remove(empresaToDelete);
                await _context.SaveChangesAsync();
                return Ok(empresaToDelete);
            }
            return NotFound();
        }
    }
}
