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
    public class FornecedorController : ControllerBase
    {
        public TCSContext Context { get; set; }
        public FornecedorController(TCSContext context)
        {
            Context = context;
        }

        [HttpPost]
        [Route("Insert")]
        public async Task<ActionResult<Fornecedor>> Insert([FromBody]Fornecedor fornecedor)
        {
            fornecedor.Empresa = await Context.Empresas.FindAsync(fornecedor.EmpresaID);
            await Context.AddAsync(fornecedor);
            foreach (var item in fornecedor.Telefone)
            {
                await Context.Telefones.AddAsync(item);
            }
            await Context.SaveChangesAsync();
              
            return Ok(fornecedor);
        }

        [HttpGet]
        [Route("{ID}")]
        public async Task<Fornecedor> GetByID(int id)
        {
            return await Context.FindAsync<Fornecedor>(id);
        }

        [HttpGet]
        [Route("All")]
        public async Task<List<Fornecedor>> GetAll()
        {
            return await Context.Fornecedores.ToListAsync();
        }


        [HttpPut]
        [Route("{ID}")]
        public async Task<ActionResult<Fornecedor>> Update(Fornecedor fornecedor)
        {
            Fornecedor fornecedorToUpdate = await Context.Fornecedores.FindAsync(fornecedor.ID);
            fornecedorToUpdate = fornecedor;
            fornecedorToUpdate.Empresa = await Context.Empresas.FindAsync(fornecedor.EmpresaID);
            
            await Context.SaveChangesAsync();

            Telefone currTel = new Telefone();
            foreach (var item in fornecedorToUpdate.Telefone)
            {
                currTel = await Context.Telefones.FindAsync(item.ID);
                if (currTel == null)
                {
                    currTel = item;
                }
                else
                {
                    item.FornecedorID = fornecedorToUpdate.ID;
                    await Context.Telefones.AddAsync(item);
                }
            }
            return Ok(fornecedorToUpdate);
        }

        [HttpDelete]
        [Route("{ID}")]
        public async Task<ActionResult<Fornecedor>> Delete(int id)
        {
            Fornecedor fornecedorToDelete = await Context.Fornecedores.FindAsync(id);
            Context.Fornecedores.Remove(fornecedorToDelete);
            List<Telefone> telefonesToDelete = (List<Telefone>)Context.Telefones.Where(tel => tel.FornecedorID == id);
            Context.RemoveRange(telefonesToDelete);
            await Context.SaveChangesAsync();
            return Ok(fornecedorToDelete);
        }
    }

    public class FornecedorTemp
    {
        public int IDFornecedor { get; set; }
        public List<Telefone> Telefones { get; set; }
        public int IDEmpresa { get; set; }
        public string Nome { get; set; }
        public string RG { get; set; }
        public string Timestamp { get; set; }
        public string DataNascimento { get; set; }
        public string Registro { get; set; }
    }
}
