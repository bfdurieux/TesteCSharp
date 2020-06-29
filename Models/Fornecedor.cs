using System;
using System.Collections.Generic;
using System.Text;
using System.Text.RegularExpressions;

namespace TesteCSharp.Models
{
    public class Fornecedor
    {
        public int ID { get; set; }
        public string Nome { get; set; }
        public Empresa? Empresa { get; set; }
        public int EmpresaID { get; set; }
        public string NumeroRegistro { get; set; }
        public string? RG { get; set; }
        public DateTime? DataNascimento { get; set; }
        public DateTime TimestampCadastro { get; set; }
        public List<Telefone>? Telefone { get; } = new List<Telefone>();
    }

    public class FornecedorFacade
    {
        public void CadastroIsValid(Fornecedor fornecedor)
        {
            var registro = fornecedor.NumeroRegistro.Replace(@"/\D+/g", "");
            if (registro.Length == 11)
            {
                CadastroPessoaFisicaIsValid(fornecedor);
            }
            else if (registro.Length != 14)
            {
                throw new Exception("Registro Invalido");
            }
        }

        public void CadastroPessoaFisicaIsValid(Fornecedor fornecedor)
        {
            if (fornecedor.Empresa.UF == "PR" && DateTime.Today.AddYears(-18) < fornecedor.DataNascimento)
            {
                throw new Exception("Nao e' possivel cadastrar fornecedor Pessoa Fisica menor de idade para empresas do Parana");
            }

            if (fornecedor.RG == null || fornecedor.DataNascimento == null)
            {
                throw new Exception("Fornecedor Pessoa Fisica deve conter RG e Data de Nascimento");
            }
        }
    }
}
