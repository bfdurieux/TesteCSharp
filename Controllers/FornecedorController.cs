using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using TesteCSharp.Models;

namespace TesteCSharp.Controllers
{
    [ApiController]
    [Route("[Controller]")]
    public class FornecedorController : ControllerBase
    {
        private TCSContext _context { get; set; }
        public FornecedorController(TCSContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<ActionResult<Fornecedor>> Insert([FromBody] Fornecedor fornecedor)
        {
            fornecedor.Empresa = await _context.Empresas.FindAsync(fornecedor.EmpresaID);
            FornecedorFacade.CadastroIsValid(fornecedor);

            await _context.AddAsync(fornecedor);

            await _context.SaveChangesAsync();
            if (fornecedor.Telefone != null)
            {
                foreach (var item in fornecedor.Telefone)
                {
                    item.FornecedorID = fornecedor.ID;
                    await _context.Telefones.AddAsync(item);
                }
                await _context.SaveChangesAsync();
            }

            return Ok(fornecedor);
        }

        [HttpGet]
        [Route("{ID}")]
        public async Task<Fornecedor> GetByID(int id)
        {
            return await _context.FindAsync<Fornecedor>(id);
        }

        [HttpGet]
        [Route("All")]
        public async Task<List<Fornecedor>> GetAll()
        {
            return await _context.Fornecedores.Include(f => f.Telefone).Include(f => f.Empresa).ToListAsync();
        }


        [HttpPut]
        public async Task<ActionResult<Fornecedor>> Update([FromBody] Fornecedor fornecedor)
        {
            Fornecedor fornecedorToUpdate = await _context.Fornecedores.FindAsync(fornecedor.ID);
            fornecedorToUpdate.Empresa = await _context.Empresas.FindAsync(fornecedor.EmpresaID) ?? fornecedorToUpdate.Empresa;
            fornecedorToUpdate.Nome = fornecedor.Nome ?? fornecedorToUpdate.Nome;
            fornecedorToUpdate.NumeroRegistro = fornecedor.NumeroRegistro ?? fornecedorToUpdate.NumeroRegistro;

            if (FornecedorFacade.IsPessoaFisica(fornecedorToUpdate))
            {
                fornecedorToUpdate.DataNascimento = fornecedor.DataNascimento ?? fornecedorToUpdate.DataNascimento;
                fornecedorToUpdate.RG = fornecedor.RG ?? fornecedorToUpdate.RG;
            }
            FornecedorFacade.CadastroIsValid(fornecedorToUpdate);

            Telefone currTel = new Telefone();
            if (fornecedor.Telefone != null)
            {
                foreach (var item in fornecedor.Telefone)
                {
                    currTel = await _context.Telefones.FindAsync(item.ID);
                    if (currTel != null)
                    {
                        currTel.NumeroTelefone = item.NumeroTelefone;
                    }
                    else
                    {
                        item.FornecedorID = fornecedorToUpdate.ID;
                        await _context.Telefones.AddAsync(item);
                    }
                }
            }
            await _context.SaveChangesAsync();
            return Ok(fornecedorToUpdate);
        }

        [HttpDelete]
        [Route("{ID}")]
        public async Task<ActionResult<Fornecedor>> Delete(int id)
        {
            Fornecedor fornecedorToDelete = await _context.Fornecedores.FindAsync(id);
            if (fornecedorToDelete != null)
            {
                List<Telefone> telefonesToDelete = await _context.Telefones.Where(f => f.FornecedorID == id).ToListAsync();
                if (telefonesToDelete != null)
                {
                    _context.RemoveRange(telefonesToDelete);
                }
                _context.Fornecedores.Remove(fornecedorToDelete);
                await _context.SaveChangesAsync();
                return Ok(fornecedorToDelete);
            }
            return NotFound();
        }
    }
}
