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
        public TCSContext Context { get; set; }

        public EmpresaController(TCSContext context)
        {
            Context = context;
        }

        [HttpPost]
        [Route("Insert")]
        public async Task<ActionResult<Empresa>> Insert(Empresa empresa)
        {
            new EmpresaFacade().CadastroIsValid(empresa);
            await Context.AddAsync(empresa);
            Context.SaveChanges();

            return Ok(empresa);
        }

        [HttpGet]
        [Route("All")]
        public async Task<List<Empresa>> GetAll()
        {
            return await Context.Empresas.ToListAsync();
        }

        [HttpGet]
        [Route("{ID}")]
        public async Task<Empresa> GetById(int id)
        {
            return await Context.FindAsync<Empresa>(id);
        }

        [HttpPut]
        [Route("{ID}")]
        public async Task<ActionResult<Empresa>> Update([FromBody] Empresa empresa)
        {
            var empresaToUpdate = await Context.FindAsync<Empresa>(empresa);
            var validation = new EmpresaFacade().CadastroIsValid(empresa);
            if (empresaToUpdate != null && validation == "Cadastro Valido")
            {
                empresaToUpdate.NomeFantasia = empresa.NomeFantasia;
                empresaToUpdate.CNPJ = empresa.CNPJ;
                empresaToUpdate.UF = empresa.UF;
                await Context.SaveChangesAsync();
                return Ok(empresaToUpdate);
            }

            return NotFound();
        }

        [HttpDelete]
        [Route("{ID}")]
        public async Task<ActionResult<Empresa>> Delete(int id)
        {
            var empresaToDelete = await Context.FindAsync<Empresa>(id);
            if (empresaToDelete == null)
            {
                return NotFound();
            }
            Context.Remove(empresaToDelete);
            await Context.SaveChangesAsync();
            return Ok(empresaToDelete);
        }
    }
}
